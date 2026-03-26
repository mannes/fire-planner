import {
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { ProjectionPoint } from '../../lib/types'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'

interface Props {
  data: ProjectionPoint[]
  fireNumber: number
  yearsToFire: number | null
}

const DARK = { text: '#94a3b8', grid: '#ffffff10' }

export function PortfolioGrowthChart({ data, fireNumber, yearsToFire }: Props) {
  const { t } = useI18n()

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={DARK.grid} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: DARK.text }}
          label={{ value: t.yearLabel, position: 'insideBottom', offset: -8, fontSize: 11, fill: DARK.text }}
        />
        <YAxis
          tickFormatter={fmt.currencyCompact}
          tick={{ fontSize: 11, fill: DARK.text }}
          width={60}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
          labelStyle={{ color: '#94a3b8', fontSize: 12 }}
          itemStyle={{ color: '#e2e8f0', fontSize: 12 }}
          formatter={(value: number) => [fmt.currencyCompact(value)]}
          labelFormatter={(label) => `${t.yearPrefix} ${label}`}
        />
        <Legend
          verticalAlign="top"
          height={24}
          wrapperStyle={{ fontSize: 12, color: DARK.text }}
        />
        <ReferenceLine
          y={fireNumber}
          stroke="#10b981"
          strokeDasharray="6 3"
          label={{ value: 'FIRE', position: 'right', fontSize: 11, fill: '#10b981' }}
        />
        {yearsToFire !== null && (
          <ReferenceLine
            x={yearsToFire}
            stroke="#6366f1"
            strokeDasharray="4 3"
            label={{ value: `${t.yr} ${yearsToFire}`, position: 'top', fontSize: 10, fill: '#6366f1' }}
          />
        )}
        <Line
          type="monotone"
          dataKey="portfolioValue"
          name={t.portfolio}
          stroke="#818cf8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
