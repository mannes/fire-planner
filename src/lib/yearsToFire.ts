import type { YearsToFireResult, ProjectionPoint } from './types'

const MAX_YEARS = 100

export function calcYearsToFire(
  currentPortfolio: number,
  annualSavings: number,
  expectedRealReturn: number,
  fireNumber: number,
): YearsToFireResult {
  if (fireNumber <= 0) {
    return { yearsToFire: 0, projectionData: [] }
  }

  if (currentPortfolio >= fireNumber) {
    return {
      yearsToFire: 0,
      projectionData: [{ year: 0, portfolioValue: currentPortfolio, fireTarget: fireNumber }],
    }
  }

  const data: ProjectionPoint[] = [
    { year: 0, portfolioValue: currentPortfolio, fireTarget: fireNumber },
  ]

  let portfolio = currentPortfolio
  let yearsToFire: number | null = null

  for (let year = 1; year <= MAX_YEARS; year++) {
    portfolio = portfolio * (1 + expectedRealReturn) + annualSavings
    data.push({ year, portfolioValue: Math.round(portfolio), fireTarget: fireNumber })

    if (yearsToFire === null && portfolio >= fireNumber) {
      yearsToFire = year
      // Keep projecting a few more years for chart context
      if (year + 5 <= MAX_YEARS) continue
      break
    }

    // Once FIRE is found, show 5 more years then stop
    if (yearsToFire !== null && year >= yearsToFire + 5) break
  }

  return { yearsToFire, projectionData: data }
}

// How many years a retirement portfolio survives given deterministic real returns
export function calcPortfolioLongevity(
  startingPortfolio: number,
  annualSpending: number,
  realReturn: number,
): number | null {
  let portfolio = startingPortfolio
  for (let year = 1; year <= 100; year++) {
    portfolio = portfolio * (1 + realReturn) - annualSpending
    if (portfolio <= 0) return year
  }
  return null // survives 100 years
}
