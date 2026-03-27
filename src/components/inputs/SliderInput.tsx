import { useState } from 'react'
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
  /** Multiply value by this scale for the text input (e.g. 100 for percentages shown as %). */
  inputScale?: number
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
  inputScale = 1,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null)
  const display = format ? format(value) : String(value)

  const commitDraft = () => {
    if (draft !== null) {
      const parsed = parseFloat(draft.replace(',', '.'))
      if (!isNaN(parsed)) {
        const scaled = parsed / inputScale
        onChange(Math.max(min, scaled))
      }
      setDraft(null)
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {info && <HelpTooltip text={info} />}
        </div>
        {draft !== null ? (
          <input
            type="number"
            value={draft}
            step={step * inputScale}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
              if (e.key === 'Escape') setDraft(null)
            }}
            className="w-24 text-right text-sm font-bold text-indigo-600 tabular-nums border-b border-indigo-400 bg-transparent outline-none"
            autoFocus
          />
        ) : (
          <button
            type="button"
            onClick={() => setDraft(String(+(value * inputScale).toPrecision(6)))}
            className="text-sm font-bold text-indigo-600 tabular-nums hover:underline cursor-text"
            title="Click to type a value"
          >
            {display}
          </button>
        )}
      </div>
      {valueNote && <p className="text-xs text-gray-500">{valueNote}</p>}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
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
