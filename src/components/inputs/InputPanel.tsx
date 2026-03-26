import type { GlobalInputs } from '../../lib/types'
import { fmt } from '../../lib/format'
import { SliderInput } from './SliderInput'

interface Props {
  inputs: GlobalInputs
  onChange: (key: keyof GlobalInputs, value: number) => void
}

export function InputPanel({ inputs, onChange }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-white leading-none mb-1">Your Numbers</h2>
        <p className="text-xs text-slate-400">All rates are real (inflation-adjusted)</p>
      </div>

      <SliderInput
        label="Annual Expenses"
        min={10000}
        max={300000}
        step={5000}
        value={inputs.annualExpenses}
        onChange={(v) => onChange('annualExpenses', v)}
        format={fmt.currency}
      />

      <SliderInput
        label="Current Portfolio"
        min={0}
        max={5000000}
        step={10000}
        value={inputs.currentPortfolio}
        onChange={(v) => onChange('currentPortfolio', v)}
        format={fmt.currency}
      />

      <SliderInput
        label="Annual Savings"
        min={0}
        max={300000}
        step={5000}
        value={inputs.annualSavings}
        onChange={(v) => onChange('annualSavings', v)}
        format={fmt.currency}
      />

      <SliderInput
        label="Expected Real Return"
        hint="European equities historically ~5–7% real"
        min={0.01}
        max={0.15}
        step={0.005}
        value={inputs.expectedRealReturn}
        onChange={(v) => onChange('expectedRealReturn', v)}
        format={fmt.percent}
      />

      <SliderInput
        label="Safe Withdrawal Rate"
        hint="4% is classic; 3.5% is more conservative for European retirees"
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
