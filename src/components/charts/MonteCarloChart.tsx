import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { PercentilePaths, HistogramBin } from '../../lib/types'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'

const DARK = { text: '#9ca3af', grid: '#f3f4f6' }
const TOOLTIP_STYLE = {
  backgroundColor: '#fff',
  border: '1px solid #e0e7ff',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}

interface FanChartProps {
  percentilePaths: PercentilePaths
  years: number
}

export function MonteCarloFanChart({ percentilePaths, years }: FanChartProps) {
  const { t } = useI18n()

  const data = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    band90_10: [percentilePaths.p10[i], percentilePaths.p90[i]] as [number, number],
    band75_25: [percentilePaths.p25[i], percentilePaths.p75[i]] as [number, number],
    p50: percentilePaths.p50[i],
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={DARK.grid} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: DARK.text }}
          label={{
            value: t.retirementYear,
            position: 'insideBottom',
            offset: -8,
            fontSize: 11,
            fill: DARK.text,
          }}
        />
        <YAxis
          tickFormatter={fmt.currencyCompact}
          tick={{ fontSize: 11, fill: DARK.text }}
          width={60}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          labelStyle={{ color: '#6b7280', fontSize: 12 }}
          itemStyle={{ color: '#374151', fontSize: 12 }}
          formatter={(value: number | [number, number], name: string) => {
            if (Array.isArray(value))
              return [`${fmt.currencyCompact(value[0])} – ${fmt.currencyCompact(value[1])}`, name]
            return [fmt.currencyCompact(value), name]
          }}
          labelFormatter={(label) => `${t.yearPrefix} ${label}`}
        />
        <Legend verticalAlign="top" height={24} wrapperStyle={{ fontSize: 12, color: DARK.text }} />
        <Area
          type="monotone"
          dataKey="band90_10"
          name={t.p1090}
          stroke="none"
          fill="#4f46e5"
          fillOpacity={0.15}
        />
        <Area
          type="monotone"
          dataKey="band75_25"
          name={t.p2575}
          stroke="none"
          fill="#6366f1"
          fillOpacity={0.25}
        />
        <Area
          type="monotone"
          dataKey="p50"
          name={t.median}
          stroke="#818cf8"
          strokeWidth={2}
          fill="none"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

interface HistogramProps {
  histogram: HistogramBin[]
  noDepletionLabel: string
}

export function DepletionHistogram({ histogram, noDepletionLabel }: HistogramProps) {
  const { t } = useI18n()
  const hasAnyDepletion = histogram.some((b) => b.fraction > 0)

  if (!hasAnyDepletion) {
    return (
      <div className="flex items-center justify-center h-16 text-sm text-emerald-400 font-medium">
        {noDepletionLabel}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={histogram} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={DARK.grid} />
        <XAxis
          dataKey="yearRange"
          tick={{ fontSize: 10, fill: DARK.text }}
          label={{
            value: t.yearRangeLabel,
            position: 'insideBottom',
            offset: -8,
            fontSize: 11,
            fill: DARK.text,
          }}
        />
        <YAxis
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          tick={{ fontSize: 11, fill: DARK.text }}
          width={40}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          labelStyle={{ color: '#6b7280', fontSize: 12 }}
          itemStyle={{ color: '#374151', fontSize: 12 }}
          formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, t.fractionDepleted]}
          labelFormatter={(label) => `${t.yearPrefix} ${label}`}
        />
        <Bar
          dataKey="fraction"
          name={t.depleted}
          fill="#f87171"
          radius={[4, 4, 0, 0]}
          opacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
