import { useMemo } from 'react'
import type { GlobalInputs } from '../../lib/types'
import { calcSwrExplorer } from '../../lib/swrExplorer'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'
import { SectionCard } from '../layout/SectionCard'
import { SwrSensitivityChart } from '../charts/SwrSensitivityChart'

interface Props {
  inputs: GlobalInputs
}

export function SwrExplorerSection({ inputs }: Props) {
  const { t } = useI18n()
  const { scenarios } = useMemo(
    () =>
      calcSwrExplorer(
        inputs.annualExpenses,
        inputs.currentPortfolio,
        inputs.annualSavings,
        inputs.expectedRealReturn,
      ),
    [inputs.annualExpenses, inputs.currentPortfolio, inputs.annualSavings, inputs.expectedRealReturn],
  )

  return (
    <SectionCard title={t.swrTitle} subtitle={t.swrSubtitle}>
      <SwrSensitivityChart scenarios={scenarios} />

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/10">
              <th className="pb-2 text-xs font-medium text-slate-500">{t.swrCol}</th>
              <th className="pb-2 text-xs font-medium text-slate-500">{t.fireNumberCol}</th>
              <th className="pb-2 text-xs font-medium text-slate-500">{t.yearsToFireCol}</th>
              <th className="pb-2 text-xs font-medium text-slate-500">{t.survivesCol}</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s) => (
              <tr key={s.swr} className="border-b border-white/5 last:border-0">
                <td className="py-2 font-medium text-slate-300">{fmt.percent(s.swr)}</td>
                <td className="py-2 text-slate-400 tabular-nums">{fmt.currency(s.fireNumber)}</td>
                <td className="py-2 text-slate-400 tabular-nums">
                  {s.yearsToFire === null
                    ? t.yearsPlus
                    : s.yearsToFire === 0
                    ? t.now
                    : `${s.yearsToFire} ${t.years}`}
                </td>
                <td className="py-2 text-slate-400 tabular-nums">
                  {s.longevity === null ? t.yearsPlus : `${s.longevity} ${t.years}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}
