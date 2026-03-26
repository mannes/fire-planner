import { useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcFireNumber } from '../../lib/fireNumber'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'

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

  return (
    <SectionCard
      title={t.fireNumberTitle}
      subtitle={t.fireNumberSubtitle(fmt.percent(inputs.withdrawalRate))}
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-1 tabular-nums">
        {fmt.currency(fireNumber)}
      </div>
      <p className="text-xs text-slate-500 mb-5">
        = {fmt.currency(inputs.annualExpenses)} ÷ {fmt.percent(inputs.withdrawalRate)}
      </p>

      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">{t.portfolioProgress}</span>
          <span className="text-slate-300 font-medium tabular-nums">{progressPct.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500 shadow-lg shadow-indigo-500/30"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>{fmt.currency(inputs.currentPortfolio)}</span>
          <span>{fmt.currency(fireNumber)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {swrVariants.map((swr) => (
          <div key={swr} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
            <div className="text-xs text-slate-500 mb-0.5">{fmt.percent(swr)}</div>
            <div className="text-sm font-semibold text-slate-200 tabular-nums">
              {fmt.currencyCompact(inputs.annualExpenses / swr)}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
