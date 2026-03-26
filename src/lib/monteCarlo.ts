import type { MonteCarloInputs, MonteCarloResult, PercentilePaths, HistogramBin } from './types'

function boxMullerNormal(): number {
  const u1 = Math.random()
  const u2 = Math.random()
  return Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.cos(2 * Math.PI * u2)
}

function logNormalParams(
  arithmeticMean: number,
  stdDev: number,
): { muLn: number; sigmaLn: number } {
  const sigmaLn = Math.sqrt(Math.log(1 + (stdDev / (1 + arithmeticMean)) ** 2))
  const muLn = Math.log(1 + arithmeticMean) - 0.5 * sigmaLn * sigmaLn
  return { muLn, sigmaLn }
}

function sampleReturn(muLn: number, sigmaLn: number): number {
  return Math.exp(muLn + sigmaLn * boxMullerNormal()) - 1
}

function computePercentilePaths(paths: number[][], years: number): PercentilePaths {
  const percentiles = [10, 25, 50, 75, 90]
  const result: number[][] = percentiles.map(() => [])

  for (let t = 0; t <= years; t++) {
    const vals = paths.map((p) => p[t]).sort((a, b) => a - b)
    percentiles.forEach((pct, i) => {
      const idx = Math.floor((pct / 100) * (vals.length - 1))
      result[i].push(vals[idx])
    })
  }

  return {
    p10: result[0],
    p25: result[1],
    p50: result[2],
    p75: result[3],
    p90: result[4],
  }
}

function buildHistogram(
  depletionYears: number[],
  totalYears: number,
  total: number,
): HistogramBin[] {
  const binSize = 5
  const bins: HistogramBin[] = []

  for (let start = 0; start < totalYears; start += binSize) {
    const end = Math.min(start + binSize, totalYears)
    const count = depletionYears.filter((y) => y > start && y <= end).length
    bins.push({
      yearRange: `${start + 1}–${end}`,
      fraction: count / total,
    })
  }

  return bins
}

export function runMonteCarlo(inputs: MonteCarloInputs): MonteCarloResult {
  const { startingPortfolio, annualSpending, years, numSimulations, meanRealReturn, stdDevReturn } =
    inputs
  const { muLn, sigmaLn } = logNormalParams(meanRealReturn, stdDevReturn)

  const paths: number[][] = []
  const depletionYears: number[] = []
  let successCount = 0

  for (let sim = 0; sim < numSimulations; sim++) {
    const path: number[] = [startingPortfolio]
    let depleted = false

    for (let yr = 1; yr <= years; yr++) {
      const r = sampleReturn(muLn, sigmaLn)
      const prev = path[yr - 1]
      const next = prev * (1 + r) - annualSpending

      if (next <= 0 && !depleted) {
        depleted = true
        depletionYears.push(yr)
        path.push(0)
      } else {
        path.push(depleted ? 0 : next)
      }
    }

    if (!depleted) successCount++
    paths.push(path)
  }

  return {
    successRate: successCount / numSimulations,
    percentilePaths: computePercentilePaths(paths, years),
    depletionHistogram: buildHistogram(depletionYears, years, numSimulations),
  }
}
