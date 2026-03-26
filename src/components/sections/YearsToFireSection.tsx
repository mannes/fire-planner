import { useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcFireNumber } from '../../lib/fireNumber'
import { calcYearsToFire } from '../../lib/yearsToFire'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'
import { PortfolioGrowthChart } from '../charts/PortfolioGrowthChart'
import { DisclosureBox } from '../ui/DisclosureBox'

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
            <span className="text-3xl font-bold text-red-500">{t.never}</span>
            <span className="text-sm text-gray-400">{t.neverHint}</span>
          </>
        ) : yearsToFire === 0 ? (
          <span className="text-3xl font-bold text-emerald-600">{t.alreadyThere}</span>
        ) : (
          <>
            <span className="text-4xl font-bold text-indigo-600 tabular-nums">{yearsToFire}</span>
            <span className="text-lg text-gray-400">{t.years}</span>
          </>
        )}
      </div>
      <PortfolioGrowthChart
        data={projectionData}
        fireNumber={fireNumber}
        yearsToFire={yearsToFire}
      />

      <div className="mt-5">
        <DisclosureBox title={t.whatThisMeansTitle}>
          <p>{t.yearsToFireHelp}</p>
        </DisclosureBox>
      </div>
    </SectionCard>
  )
}
