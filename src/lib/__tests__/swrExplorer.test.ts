import { describe, it, expect } from 'vitest'
import { calcSwrExplorer } from '../swrExplorer'

describe('calcSwrExplorer', () => {
  it('returns exactly 5 scenarios', () => {
    const { scenarios } = calcSwrExplorer(50000, 100000, 20000, 0.07)
    expect(scenarios).toHaveLength(5)
  })

  it('SWR values are [3%, 3.5%, 4%, 4.5%, 5%]', () => {
    const { scenarios } = calcSwrExplorer(50000, 0, 0, 0.07)
    expect(scenarios.map((s) => s.swr)).toEqual([0.03, 0.035, 0.04, 0.045, 0.05])
  })

  it('FIRE number decreases as SWR increases', () => {
    const { scenarios } = calcSwrExplorer(50000, 0, 0, 0.07)
    for (let i = 1; i < scenarios.length; i++) {
      expect(scenarios[i].fireNumber).toBeLessThan(scenarios[i - 1].fireNumber)
    }
  })

  it('years to FIRE increases as SWR decreases (higher target)', () => {
    const { scenarios } = calcSwrExplorer(50000, 0, 30000, 0.07)
    const yearsWithValues = scenarios
      .map((s) => s.yearsToFire)
      .filter((y): y is number => y !== null)
    // Lower SWR = higher FIRE number = more years needed
    for (let i = 1; i < yearsWithValues.length; i++) {
      expect(yearsWithValues[i]).toBeLessThanOrEqual(yearsWithValues[i - 1])
    }
  })

  it('4% SWR scenario matches direct calcFireNumber result', () => {
    const { scenarios } = calcSwrExplorer(50000, 0, 0, 0.07)
    const fourPercent = scenarios.find((s) => s.swr === 0.04)!
    expect(fourPercent.fireNumber).toBe(1250000)
  })
})
