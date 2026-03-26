import type { SwrExplorerResult, SwrScenario } from './types'
import { calcYearsToFire, calcPortfolioLongevity } from './yearsToFire'

const SWR_STEPS = [0.03, 0.035, 0.04, 0.045, 0.05]

export function calcSwrExplorer(
  annualExpenses: number,
  currentPortfolio: number,
  annualSavings: number,
  expectedRealReturn: number,
): SwrExplorerResult {
  const scenarios: SwrScenario[] = SWR_STEPS.map((swr) => {
    const fireNumber = annualExpenses / swr
    const { yearsToFire } = calcYearsToFire(
      currentPortfolio,
      annualSavings,
      expectedRealReturn,
      fireNumber,
    )
    const longevity = calcPortfolioLongevity(fireNumber, annualExpenses, expectedRealReturn)
    return { swr, fireNumber, yearsToFire, longevity }
  })

  return { scenarios }
}
