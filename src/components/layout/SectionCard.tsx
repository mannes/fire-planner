import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionCard({ title, subtitle, children }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/60 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
