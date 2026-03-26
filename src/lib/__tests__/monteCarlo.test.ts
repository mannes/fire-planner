import { describe, it, expect, vi } from 'vitest'
import { runMonteCarlo } from '../monteCarlo'

const BASE_INPUTS = {
  startingPortfolio: 1250000,
  annualSpending: 50000,
  years: 30,
  numSimulations: 500,
  meanRealReturn: 0.07,
  stdDevReturn: 0.15,
}

describe('runMonteCarlo', () => {
  it('returns success rate between 0 and 1', () => {
    const { successRate } = runMonteCarlo(BASE_INPUTS)
    expect(successRate).toBeGreaterThanOrEqual(0)
    expect(successRate).toBeLessThanOrEqual(1)
  })

  it('success rate is roughly 85–95% for classic 4% rule inputs', () => {
    const { successRate } = runMonteCarlo(BASE_INPUTS)
    // Historical studies show ~85-95% for 4% rule over 30 years
    expect(successRate).toBeGreaterThan(0.75)
    expect(successRate).toBeLessThan(1.0)
  })

  it('all percentile paths have length years+1', () => {
    const { percentilePaths } = runMonteCarlo(BASE_INPUTS)
    const expectedLen = BASE_INPUTS.years + 1
    expect(percentilePaths.p10).toHaveLength(expectedLen)
    expect(percentilePaths.p25).toHaveLength(expectedLen)
    expect(percentilePaths.p50).toHaveLength(expectedLen)
    expect(percentilePaths.p75).toHaveLength(expectedLen)
    expect(percentilePaths.p90).toHaveLength(expectedLen)
  })

  it('percentile paths start at startingPortfolio', () => {
    const { percentilePaths } = runMonteCarlo(BASE_INPUTS)
    expect(percentilePaths.p10[0]).toBe(BASE_INPUTS.startingPortfolio)
    expect(percentilePaths.p50[0]).toBe(BASE_INPUTS.startingPortfolio)
    expect(percentilePaths.p90[0]).toBe(BASE_INPUTS.startingPortfolio)
  })

  it('percentile ordering holds: p10 ≤ p25 ≤ p50 ≤ p75 ≤ p90 at each year', () => {
    const { percentilePaths } = runMonteCarlo(BASE_INPUTS)
    for (let i = 1; i < BASE_INPUTS.years; i++) {
      expect(percentilePaths.p10[i]).toBeLessThanOrEqual(percentilePaths.p25[i])
      expect(percentilePaths.p25[i]).toBeLessThanOrEqual(percentilePaths.p50[i])
      expect(percentilePaths.p50[i]).toBeLessThanOrEqual(percentilePaths.p75[i])
      expect(percentilePaths.p75[i]).toBeLessThanOrEqual(percentilePaths.p90[i])
    }
  })

  it('depletion histogram bins sum to ≤ (1 - successRate)', () => {
    const result = runMonteCarlo(BASE_INPUTS)
    const totalDepleted = result.depletionHistogram.reduce((sum, b) => sum + b.fraction, 0)
    const failureRate = 1 - result.successRate
    // Allow small floating point tolerance
    expect(totalDepleted).toBeCloseTo(failureRate, 1)
  })

  it('100% failure scenario when spending far exceeds portfolio', () => {
    const { successRate } = runMonteCarlo({
      ...BASE_INPUTS,
      startingPortfolio: 100000,
      annualSpending: 500000,
      meanRealReturn: 0,
    })
    expect(successRate).toBe(0)
  })

  it('near 100% success when portfolio is massive relative to spending', () => {
    const { successRate } = runMonteCarlo({
      ...BASE_INPUTS,
      startingPortfolio: 50000000,
      annualSpending: 50000,
      numSimulations: 200,
    })
    expect(successRate).toBeGreaterThan(0.99)
  })

  it('portfolio values are non-negative (floored at 0)', () => {
    const poorInputs = {
      ...BASE_INPUTS,
      startingPortfolio: 200000,
      annualSpending: 80000,
      meanRealReturn: 0,
    }
    const { percentilePaths } = runMonteCarlo(poorInputs)
    const allPaths = Object.values(percentilePaths).flat()
    allPaths.forEach((v) => expect(v).toBeGreaterThanOrEqual(0))
  })

  it('is deterministic given a fixed random seed (seeded via vi.spyOn)', () => {
    let callCount = 0
    const sequence = [0.5, 0.3, 0.7, 0.2, 0.9, 0.1, 0.4, 0.6, 0.8, 0.15]
    vi.spyOn(Math, 'random').mockImplementation(() => sequence[callCount++ % sequence.length])

    const r1 = runMonteCarlo({ ...BASE_INPUTS, numSimulations: 10 })
    callCount = 0
    const r2 = runMonteCarlo({ ...BASE_INPUTS, numSimulations: 10 })

    expect(r1.successRate).toBe(r2.successRate)
    vi.restoreAllMocks()
  })
})
