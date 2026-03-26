import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { SwrScenario } from '../../lib/types'
import { fmt } from '../../lib/format'
import { useI18n } from '../../i18n/I18nContext'

interface Props {
  scenarios: SwrScenario[]
}

const DARK = { text: '#94a3b8', grid: '#ffffff10' }

export function SwrSensitivityChart({ scenarios }: Props) {
  const { t } = useI18n()

  const data = scenarios.map((s) => ({
    swr: fmt.percent(s.swr),
    [t.fireNumber]: s.fireNumber,
    [t.yearsToFireCol]: s.yearsToFire ?? 100,
    [t.longevity]: s.longevity ?? 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={data} margin={{ top: 8, right: 40, bottom: 0, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={DARK.grid} />
        <XAxis dataKey="swr" tick={{ fontSize: 11, fill: DARK.text }} />
        <YAxis
          yAxisId="left"
          tickFormatter={fmt.currencyCompact}
          tick={{ fontSize: 11, fill: DARK.text }}
          width={60}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: DARK.text }}
          width={36}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 8,
          }}
          labelStyle={{ color: '#94a3b8', fontSize: 12 }}
          itemStyle={{ color: '#e2e8f0', fontSize: 12 }}
          formatter={(value: number, name: string) =>
            name === t.fireNumber
              ? [fmt.currencyCompact(value), name]
              : [`${value === 100 ? '100+' : value} jr`, name]
          }
        />
        <Legend verticalAlign="top" height={24} wrapperStyle={{ fontSize: 12, color: DARK.text }} />
        <Bar
          yAxisId="left"
          dataKey={t.fireNumber}
          fill="#4f46e5"
          radius={[4, 4, 0, 0]}
          opacity={0.8}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={t.yearsToFireCol}
          stroke="#818cf8"
          strokeWidth={2}
          dot={{ r: 4, fill: '#818cf8' }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={t.longevity}
          stroke="#34d399"
          strokeWidth={2}
          dot={{ r: 4, fill: '#34d399' }}
          strokeDasharray="5 3"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
