import { HelpTooltip } from '../ui/HelpTooltip'

interface Props {
  label: string
  hint?: string
  info?: string
  valueNote?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  format?: (value: number) => string
}

export function SliderInput({
  label,
  hint,
  info,
  valueNote,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: Props) {
  const display = format ? format(value) : String(value)

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {info && <HelpTooltip text={info} />}
        </div>
        <span className="text-sm font-bold text-indigo-600 tabular-nums">{display}</span>
      </div>
      {valueNote && <p className="text-xs text-gray-500">{valueNote}</p>}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-indigo-100 accent-indigo-500"
      />
      <div className="flex justify-between text-xs text-gray-300">
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </div>
    </div>
  )
}
