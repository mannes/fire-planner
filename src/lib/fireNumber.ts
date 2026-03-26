import type { FireNumberResult } from './types'

export function calcFireNumber(annualExpenses: number, withdrawalRate: number): FireNumberResult {
  const fireNumber = withdrawalRate > 0 ? annualExpenses / withdrawalRate : 0
  return { fireNumber }
}
