import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
}

export function HelpTooltip({ text }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <span ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-[11px] font-semibold text-indigo-600 transition-colors hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        aria-label="More information"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((open) => !open)}
      >
        ?
      </button>
      {isOpen && (
        <span
          role="dialog"
          aria-label="More information"
          className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-xs leading-relaxed text-slate-50 shadow-xl"
        >
          <span className="mb-2 flex items-start justify-between gap-3">
            <span className="block flex-1">{text}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="shrink-0 cursor-pointer rounded-md p-1 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
              aria-label="Close information popup"
            >
              ×
            </button>
          </span>
        </span>
      )}
    </span>
  )
}
