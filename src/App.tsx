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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function App() {
  const [inputs, setInputs] = useState<GlobalInputs>(DEFAULT_INPUTS)
  const { t, lang, setLang } = useI18n()

  function handleChange(key: keyof GlobalInputs, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-indigo-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 via-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-orange-200">
            <span className="text-lg leading-none" aria-hidden="true">
              🔥
            </span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none tracking-tight">
              {t.appName}
            </h1>
            <p className="text-xs text-gray-400">{t.appSubtitle}</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex rounded-lg overflow-hidden border border-indigo-200 text-xs">
              {(['nl', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === l
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-indigo-50'
                  }`}
                >
                  {l === 'nl' ? '🇳🇱 NL' : '🇬🇧 EN'}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-gray-500">{t.browserOnly}</span>
            </div>

            <a
              href="https://github.com/mannes/fire-planner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 flex-1">
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

      {/* Footer */}
      <footer className="border-t border-indigo-100 bg-white/60 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-xs text-gray-400 leading-relaxed flex-1">{t.disclaimer}</p>
          <a
            href="https://github.com/mannes/fire-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </div>
  )
}
