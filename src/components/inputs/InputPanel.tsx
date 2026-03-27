import type { GlobalInputs } from '../../lib/types'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'
import { SliderInput } from './SliderInput'
import { DisclosureBox } from '../ui/DisclosureBox'

interface Props {
  inputs: GlobalInputs
  onChange: (key: keyof GlobalInputs, value: number) => void
}

export function InputPanel({ inputs, onChange }: Props) {
  const { t } = useI18n()
  const monthlyExpenses = inputs.annualExpenses / 12
  const monthlySavings = inputs.annualSavings / 12

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-gray-900 leading-none mb-1">{t.yourNumbers}</h2>
        <p className="text-xs text-gray-400">{t.realRatesNote}</p>
      </div>

      <DisclosureBox title={t.inputHelpTitle} defaultOpen>
        <p>{t.inputHelpBody}</p>
      </DisclosureBox>

      <SliderInput
        label={t.annualExpenses}
        info={t.annualExpensesInfo}
        valueNote={t.annualizedAmount(fmt.currency(inputs.annualExpenses))}
        min={800}
        max={10000}
        step={100}
        value={monthlyExpenses}
        onChange={(v) => onChange('annualExpenses', v * 12)}
        format={fmt.currencyMonthly}
      />

      <SliderInput
        label={t.currentPortfolio}
        info={t.currentPortfolioInfo}
        min={0}
        max={2000000}
        step={10000}
        value={inputs.currentPortfolio}
        onChange={(v) => onChange('currentPortfolio', v)}
        format={fmt.currency}
      />

      <SliderInput
        label={t.annualSavings}
        info={t.annualSavingsInfo}
        valueNote={t.annualizedAmount(fmt.currency(inputs.annualSavings))}
        min={0}
        max={10000}
        step={100}
        value={monthlySavings}
        onChange={(v) => onChange('annualSavings', v * 12)}
        format={fmt.currencyMonthly}
      />

      <SliderInput
        label={t.expectedReturn}
        hint={t.expectedReturnHint}
        info={t.expectedReturnInfo}
        min={0.01}
        max={0.15}
        step={0.005}
        value={inputs.expectedRealReturn}
        onChange={(v) => onChange('expectedRealReturn', v)}
        format={fmt.percent}
        inputScale={100}
      />

      <SliderInput
        label={t.withdrawalRate}
        hint={t.withdrawalRateHint}
        info={t.withdrawalRateInfo}
        min={0.02}
        max={0.06}
        step={0.005}
        value={inputs.withdrawalRate}
        onChange={(v) => onChange('withdrawalRate', v)}
        format={fmt.percent}
        inputScale={100}
      />
    </div>
  )
}
