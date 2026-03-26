import { useState, useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcFireNumber } from '../../lib/fireNumber'
import { runMonteCarlo } from '../../lib/monteCarlo'
import { useDebounce } from '../../hooks/useDebounce'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'
import { MonteCarloFanChart, DepletionHistogram } from '../charts/MonteCarloChart'
import { SliderInput } from '../inputs/SliderInput'
import clsx from 'clsx'
import { DisclosureBox } from '../ui/DisclosureBox'

interface Props {
  inputs: GlobalInputs
}

export function MonteCarloSection({ inputs }: Props) {
  const { t } = useI18n()
  const [retirementYears, setRetirementYears] = useState(30)
  const [numSimulations, setNumSimulations] = useState(1000)

  const { fireNumber } = useMemo(
    () => calcFireNumber(inputs.annualExpenses, inputs.withdrawalRate),
    [inputs.annualExpenses, inputs.withdrawalRate],
  )

  const debouncedState = useDebounce({ inputs, retirementYears, numSimulations, fireNumber }, 300)

  const result = useMemo(
    () =>
      runMonteCarlo({
        startingPortfolio: debouncedState.fireNumber,
        annualSpending: debouncedState.inputs.annualExpenses,
        years: debouncedState.retirementYears,
        numSimulations: debouncedState.numSimulations,
        meanRealReturn: debouncedState.inputs.expectedRealReturn,
        stdDevReturn: 0.15,
      }),
    [debouncedState],
  )

  const successPct = (result.successRate * 100).toFixed(1)
  const successColor =
    result.successRate >= 0.9
      ? 'text-emerald-600'
      : result.successRate >= 0.75
        ? 'text-amber-500'
        : 'text-red-500'

  return (
    <SectionCard
      title={t.monteCarloTitle}
      subtitle={t.monteCarloSubtitle(numSimulations.toLocaleString(), String(retirementYears))}
    >
      <div className="flex items-baseline gap-2 mb-5">
        <span className={clsx('text-4xl font-bold tabular-nums', successColor)}>{successPct}%</span>
        <span className="text-sm text-gray-400">{t.survives(String(retirementYears))}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <SliderInput
          label={t.retirementHorizon}
          min={10}
          max={60}
          step={5}
          value={retirementYears}
          onChange={setRetirementYears}
          format={(v) => `${v} ${t.years}`}
        />
        <SliderInput
          label={t.simulations}
          min={100}
          max={5000}
          step={100}
          value={numSimulations}
          onChange={setNumSimulations}
          format={(v) => v.toLocaleString()}
        />
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-400 mb-2">{t.portfolioDistribution}</p>
        <MonteCarloFanChart percentilePaths={result.percentilePaths} years={retirementYears} />
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400 mb-2">{t.whenDepleted}</p>
        <DepletionHistogram
          histogram={result.depletionHistogram}
          noDepletionLabel={t.noDepletion}
        />
      </div>

      <div className="mt-5">
        <DisclosureBox title={t.howToReadTitle}>
          <p>{t.monteCarloHelp}</p>
        </DisclosureBox>
      </div>
    </SectionCard>
  )
}
