import { useI18n } from '../../i18n/I18nContext'

function RichText({ text }: { text: string }) {
  // Render **bold** inline markdown
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="text-slate-200 font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

interface InfoCardProps {
  title: string
  body: string
}

function InfoCard({ title, body }: InfoCardProps) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-5">
      <h3 className="text-sm font-semibold text-indigo-400 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        <RichText text={body} />
      </p>
    </div>
  )
}

export function InfoSection() {
  const { t } = useI18n()

  return (
    <section>
      <h2 className="text-lg font-semibold text-white mb-4">{t.infoTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard title="FIRE" body={t.infoFIRE} />
        <InfoCard title="4% Rule" body={t.info4Percent} />
        <InfoCard title={t.expectedReturn} body={t.infoReturns} />
        <InfoCard title="Monte Carlo" body={t.infoMonteCarlo} />
      </div>
    </section>
  )
}
