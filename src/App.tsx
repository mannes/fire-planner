import { useState } from 'react'
import type { GlobalInputs } from './lib/types'
import { useI18n } from './i18n/I18nContext'
import { InputPanel } from './components/inputs/InputPanel'
import { FireNumberSection } from './components/sections/FireNumberSection'
import { YearsToFireSection } from './components/sections/YearsToFireSection'
import { SwrExplorerSection } from './components/sections/SwrExplorerSection'
import { MonteCarloSection } from './components/sections/MonteCarloSection'
import { InfoSection } from './components/sections/InfoSection'

const DEFAULT_INPUTS: GlobalInputs = {
  annualExpenses: 40000,
  currentPortfolio: 100000,
  annualSavings: 20000,
  expectedRealReturn: 0.07,
  withdrawalRate: 0.04,
}

export default function App() {
  const [inputs, setInputs] = useState<GlobalInputs>(DEFAULT_INPUTS)
  const { t, lang, setLang } = useI18n()

  function handleChange(key: keyof GlobalInputs, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white text-sm font-bold">F</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-white leading-none tracking-tight">
              {t.appName}
            </h1>
            <p className="text-xs text-slate-400">{t.appSubtitle}</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs">
              {(['nl', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === l
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300">{t.browserOnly}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Sticky input panel */}
          <div className="lg:sticky lg:top-24">
            <InputPanel inputs={inputs} onChange={handleChange} />
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FireNumberSection inputs={inputs} />
            <YearsToFireSection inputs={inputs} />
            <SwrExplorerSection inputs={inputs} />
            <MonteCarloSection inputs={inputs} />
          </div>
        </div>

        {/* Info / background */}
        <InfoSection />
      </main>
    </div>
  )
}
