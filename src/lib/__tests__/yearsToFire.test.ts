import { describe, it, expect } from 'vitest'
import { calcYearsToFire, calcPortfolioLongevity } from '../yearsToFire'

describe('calcYearsToFire', () => {
  it('returns 0 when already at FIRE', () => {
    const { yearsToFire } = calcYearsToFire(1250000, 0, 0.07, 1000000)
    expect(yearsToFire).toBe(0)
  })

  it('returns null when savings are 0 and return is 0', () => {
    const { yearsToFire } = calcYearsToFire(0, 0, 0, 1250000)
    expect(yearsToFire).toBeNull()
  })

  it('reaches FIRE in ~18 years: 0 portfolio, €50k savings, 7% return, €1.25M target', () => {
    const { yearsToFire } = calcYearsToFire(0, 50000, 0.07, 1250000)
    // Expected: roughly 15-20 years
    expect(yearsToFire).toBeGreaterThanOrEqual(14)
    expect(yearsToFire).toBeLessThanOrEqual(20)
  })

  it('includes year 0 in projection data', () => {
    const { projectionData } = calcYearsToFire(100000, 20000, 0.07, 1250000)
    expect(projectionData[0].year).toBe(0)
    expect(projectionData[0].portfolioValue).toBe(100000)
  })

  it('projection data grows monotonically with positive return + savings', () => {
    const { projectionData } = calcYearsToFire(100000, 20000, 0.07, 1250000)
    for (let i = 1; i < projectionData.length; i++) {
      expect(projectionData[i].portfolioValue).toBeGreaterThan(projectionData[i - 1].portfolioValue)
    }
  })

  it('sets fireTarget correctly in all data points', () => {
    const fireTarget = 500000
    const { projectionData } = calcYearsToFire(100000, 30000, 0.07, fireTarget)
    projectionData.forEach((pt) => {
      expect(pt.fireTarget).toBe(fireTarget)
    })
  })
})

describe('calcPortfolioLongevity', () => {
  it('returns null (100+ years) when returns exceed spending', () => {
    // €1.25M at 7% = €87.5k/year; spending only €40k
    const longevity = calcPortfolioLongevity(1250000, 40000, 0.07)
    expect(longevity).toBeNull()
  })

  it('depletes eventually when spending exceeds growth', () => {
    // €1.25M at 0% return, €100k/year = depletes in ~12-13 years
    const longevity = calcPortfolioLongevity(1250000, 100000, 0)
    expect(longevity).not.toBeNull()
    expect(longevity!).toBeGreaterThan(10)
    expect(longevity!).toBeLessThan(15)
  })

  it('at exactly 4% SWR (classic rule) with 7% real return: does not deplete', () => {
    // 4% of €1.25M = €50k spending; 7% real return comfortably covers it
    const longevity = calcPortfolioLongevity(1250000, 50000, 0.07)
    expect(longevity).toBeNull()
  })
})
