import type { GlobalInputs } from '../../lib/types'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'
import { SliderInput } from './SliderInput'

interface Props {
  inputs: GlobalInputs
  onChange: (key: keyof GlobalInputs, value: number) => void
}

export function InputPanel({ inputs, onChange }: Props) {
  const { t } = useI18n()

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 leading-none mb-1">{t.yourNumbers}</h2>
        <p className="text-xs text-gray-400">{t.realRatesNote}</p>
      </div>

      <SliderInput
        label={t.annualExpenses}
        min={10000}
        max={300000}
        step={5000}
        value={inputs.annualExpenses}
        onChange={(v) => onChange('annualExpenses', v)}
        format={fmt.currency}
      />

      <SliderInput
        label={t.currentPortfolio}
        min={0}
        max={5000000}
        step={10000}
        value={inputs.currentPortfolio}
        onChange={(v) => onChange('currentPortfolio', v)}
        format={fmt.currency}
      />

      <SliderInput
        label={t.annualSavings}
        min={0}
        max={300000}
        step={5000}
        value={inputs.annualSavings}
        onChange={(v) => onChange('annualSavings', v)}
        format={fmt.currency}
      />

      <SliderInput
        label={t.expectedReturn}
        hint={t.expectedReturnHint}
        min={0.01}
        max={0.15}
        step={0.005}
        value={inputs.expectedRealReturn}
        onChange={(v) => onChange('expectedRealReturn', v)}
        format={fmt.percent}
      />

      <SliderInput
        label={t.withdrawalRate}
        hint={t.withdrawalRateHint}
        min={0.02}
        max={0.06}
        step={0.005}
        value={inputs.withdrawalRate}
        onChange={(v) => onChange('withdrawalRate', v)}
        format={fmt.percent}
      />
    </div>
  )
}
