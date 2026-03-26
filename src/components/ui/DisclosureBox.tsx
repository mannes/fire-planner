import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function DisclosureBox({ title, children, defaultOpen = false }: Props) {
  return (
    <details
      open={defaultOpen}
      className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white"
    >
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-indigo-900">
        <span className="flex items-center justify-between gap-3">
          <span>{title}</span>
          <span className="text-xs text-indigo-400">▾</span>
        </span>
      </summary>
      <div className="border-t border-indigo-100 px-4 py-3 text-sm leading-relaxed text-gray-600">
        {children}
      </div>
    </details>
  )
}
