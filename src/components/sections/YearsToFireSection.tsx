import { useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcFireNumber } from '../../lib/fireNumber'
import { calcYearsToFire } from '../../lib/yearsToFire'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'
import { PortfolioGrowthChart } from '../charts/PortfolioGrowthChart'

interface Props {
  inputs: GlobalInputs
}

export function YearsToFireSection({ inputs }: Props) {
  const { t } = useI18n()
  const { fireNumber } = useMemo(
    () => calcFireNumber(inputs.annualExpenses, inputs.withdrawalRate),
    [inputs.annualExpenses, inputs.withdrawalRate],
  )

  const { yearsToFire, projectionData } = useMemo(
    () =>
      calcYearsToFire(
        inputs.currentPortfolio,
        inputs.annualSavings,
        inputs.expectedRealReturn,
        fireNumber,
      ),
    [inputs.currentPortfolio, inputs.annualSavings, inputs.expectedRealReturn, fireNumber],
  )

  return (
    <SectionCard title={t.yearsToFireTitle} subtitle={t.yearsToFireSubtitle}>
      <div className="flex items-baseline gap-2 mb-5">
        {yearsToFire === null ? (
          <>
            <span className="text-3xl font-bold text-red-400">{t.never}</span>
            <span className="text-sm text-slate-500">{t.neverHint}</span>
          </>
        ) : yearsToFire === 0 ? (
          <span className="text-3xl font-bold text-emerald-400">{t.alreadyThere}</span>
        ) : (
          <>
            <span className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tabular-nums">
              {yearsToFire}
            </span>
            <span className="text-lg text-slate-400">{t.years}</span>
          </>
        )}
      </div>
      <PortfolioGrowthChart
        data={projectionData}
        fireNumber={fireNumber}
        yearsToFire={yearsToFire}
      />
    </SectionCard>
  )
}
