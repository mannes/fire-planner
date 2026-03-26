interface Props {
  label: string
  hint?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  format?: (value: number) => string
}

export function SliderInput({ label, hint, min, max, step, value, onChange, format }: Props) {
  const display = format ? format(value) : String(value)

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-sm font-bold text-indigo-400 tabular-nums">{display}</span>
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-indigo-500"
      />
      <div className="flex justify-between text-xs text-slate-600">
        <span>{format ? format(min) : min}</span>
        <span>{format ? format(max) : max}</span>
      </div>
    </div>
  )
}
