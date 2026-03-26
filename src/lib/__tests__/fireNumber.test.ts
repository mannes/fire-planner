import { describe, it, expect } from 'vitest'
import { calcFireNumber } from '../fireNumber'

describe('calcFireNumber', () => {
  it('computes the classic 25× rule at 4% SWR', () => {
    const { fireNumber } = calcFireNumber(50000, 0.04)
    expect(fireNumber).toBe(1250000)
  })

  it('computes correctly at 3% SWR', () => {
    const { fireNumber } = calcFireNumber(50000, 0.03)
    expect(fireNumber).toBeCloseTo(1666666.67, 0)
  })

  it('returns 0 when SWR is 0', () => {
    const { fireNumber } = calcFireNumber(50000, 0)
    expect(fireNumber).toBe(0)
  })

  it('scales linearly with expenses', () => {
    const { fireNumber: a } = calcFireNumber(40000, 0.04)
    const { fireNumber: b } = calcFireNumber(80000, 0.04)
    expect(b).toBe(a * 2)
  })
})
