import { useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcFireNumber } from '../../lib/fireNumber'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'
import { DisclosureBox } from '../ui/DisclosureBox'

interface Props {
  inputs: GlobalInputs
}

export function FireNumberSection({ inputs }: Props) {
  const { t } = useI18n()
  const { fireNumber } = useMemo(
    () => calcFireNumber(inputs.annualExpenses, inputs.withdrawalRate),
    [inputs.annualExpenses, inputs.withdrawalRate],
  )

  const progress = inputs.currentPortfolio / fireNumber
  const progressPct = Math.min(progress * 100, 100)
  const swrVariants = [0.03, 0.035, 0.04] as const
  const monthlyExpenses = inputs.annualExpenses / 12

  return (
    <SectionCard
      title={t.fireNumberTitle}
      subtitle={t.fireNumberSubtitle(fmt.percent(inputs.withdrawalRate))}
    >
      <div className="text-sm text-gray-500 leading-relaxed">
        {t.fireNumberSummary(fmt.currency(fireNumber), fmt.percent(inputs.withdrawalRate))}
      </div>

      <div className="text-4xl font-bold text-indigo-600 mt-5 mb-1 tabular-nums">
        {fmt.currency(fireNumber)}
      </div>
      <p className="text-xs text-gray-400 mb-5">
        = {fmt.currencyMonthly(monthlyExpenses)} × 12 ÷ {fmt.percent(inputs.withdrawalRate)}
      </p>

      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">{t.portfolioProgress}</span>
          <span className="text-gray-700 font-medium tabular-nums">{progressPct.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-indigo-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{fmt.currency(inputs.currentPortfolio)}</span>
          <span>{fmt.currency(fireNumber)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {swrVariants.map((swr) => (
          <div
            key={swr}
            className="bg-indigo-50 rounded-xl p-2.5 text-center border border-indigo-100"
          >
            <div className="text-xs text-gray-400 mb-0.5">{fmt.percent(swr)}</div>
            <div className="text-sm font-semibold text-gray-800 tabular-nums">
              {fmt.currencyCompact(inputs.annualExpenses / swr)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <DisclosureBox title={t.howToReadTitle}>
          <p>{t.fireNumberHelp}</p>
        </DisclosureBox>
      </div>
    </SectionCard>
  )
}
