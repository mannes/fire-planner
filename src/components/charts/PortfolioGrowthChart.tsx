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

const DARK = { text: '#9ca3af', grid: '#f3f4f6' }

export function PortfolioGrowthChart({ data, fireNumber, yearsToFire }: Props) {
  const { t } = useI18n()

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 16, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={DARK.grid} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 11, fill: DARK.text }}
          label={{
            value: t.yearLabel,
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
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e0e7ff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
          labelStyle={{ color: '#6b7280', fontSize: 12 }}
          itemStyle={{ color: '#374151', fontSize: 12 }}
          formatter={(value) => [fmt.currencyCompact(Number(value))]}
          labelFormatter={(label) => `${t.yearPrefix} ${label}`}
        />
        <Legend verticalAlign="top" height={24} wrapperStyle={{ fontSize: 12, color: DARK.text }} />
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
            label={{
              value: `${t.yr} ${yearsToFire}`,
              position: 'top',
              fontSize: 10,
              fill: '#6366f1',
            }}
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
