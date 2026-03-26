export type Language = 'nl' | 'en'

export const translations = {
  nl: {
    // Header
    appName: 'FIRECalc',
    appSubtitle: 'Financiële Onafhankelijkheid · Vroeg Pensioen',
    browserOnly: 'Alle berekeningen in je browser',

    // Nav / language
    language: 'Taal',

    // Input panel
    yourNumbers: 'Jouw Cijfers',
    realRatesNote: 'Alle rendementen zijn reëel (na inflatie)',
    annualExpenses: 'Jaarlijkse Uitgaven',
    currentPortfolio: 'Huidig Vermogen',
    annualSavings: 'Jaarlijkse Spaarbedrag',
    expectedReturn: 'Verwacht Reëel Rendement',
    expectedReturnHint: 'Europese aandelen historisch ~5–7% reëel',
    withdrawalRate: 'Veilige Onttrekkingsratio (SWR)',
    withdrawalRateHint: '4% is klassiek; 3,5% is conservatiever voor Europese gepensioneerden',

    // Fire Number
    fireNumberTitle: 'FIRE Bedrag',
    fireNumberSubtitle: (swr: string) =>
      `${swr} SWR — hoeveel je nodig hebt om met pensioen te gaan`,
    portfolioProgress: 'Vermogensvoortgang',

    // Years to FIRE
    yearsToFireTitle: 'Jaren tot FIRE',
    yearsToFireSubtitle: 'Deterministische projectie op basis van verwacht rendement',
    never: 'Nooit',
    neverHint: 'met huidige spaartempo',
    alreadyThere: 'Je bent er al!',
    years: 'jaar',

    // SWR Explorer
    swrTitle: 'SWR Verkenner',
    swrSubtitle: 'Hoe de onttrekkingsratio je FIRE-doel en pensioenzekerheid beïnvloedt',
    swrCol: 'SWR',
    fireNumberCol: 'FIRE Bedrag',
    yearsToFireCol: 'Jaren tot FIRE',
    survivesCol: 'Portefeuille houdt',
    now: 'Nu',
    yearsPlus: '100+ jaar',

    // Monte Carlo
    monteCarloTitle: 'Monte Carlo Simulatie',
    monteCarloSubtitle: (n: string, yrs: string) =>
      `${n} simulaties, lognormaal rendement (±15% std. afw.), startend bij je FIRE-bedrag, over ${yrs} jaar`,
    successRate: 'slagingspercentage',
    survives: (yrs: string) => `portefeuille overleeft ${yrs} jaar`,
    retirementHorizon: 'Pensioenperiode',
    simulations: 'Simulaties',
    portfolioDistribution: 'Vermogensverdeling over tijd',
    whenDepleted: 'Wanneer het vermogen op was',
    noDepletion: 'Geen enkel vermogen uitgeput',
    retirementYear: 'Pensioenjaar',
    depleted: 'Uitgeput',
    fractionDepleted: 'Fractie uitgeput',

    // Info section
    infoTitle: 'Wat is FIRE?',
    infoFIRE: `FIRE staat voor **Financial Independence, Retire Early** — financiële onafhankelijkheid en vroeg pensioen. Het idee is eenvoudig: bouw een vermogen op dat groot genoeg is zodat je van de beleggingsopbrengsten kunt leven, zonder ooit nog te hoeven werken.`,
    info4Percent: `**De 4%-regel** komt uit de Trinity Study (1998). Onderzoekers analyseerden historische aandelenrendementen en concludeerden dat een portefeuille van 25× je jaarlijkse uitgaven een jaarlijkse onttrekking van 4% met grote kans overleeft over een periode van 30 jaar. Voor langere periodes (40–60 jaar) is een lagere SWR van 3–3,5% veiliger.`,
    infoReturns: `**Verwacht rendement**: Historisch leverde een gespreide portefeuille van wereldwijde aandelen ~10% nominaal rendement per jaar. Na inflatie (~3%) blijft ~7% reëel rendement over. Voor Europese beleggers ligt dit iets lager (~5–6% reëel) door lagere historische rendementen op Europese markten. Obligaties voegen stabiliteit toe maar verlagen het verwachte rendement.`,
    infoMonteCarlo: `**Monte Carlo** simuleert duizenden mogelijke toekomsten door willekeurige jaarrendementen te trekken uit een lognormale verdeling. Dit geeft inzicht in de kans dat je portefeuille het volhoudt — ook in slechte scenario's. Een slagingspercentage van 90%+ wordt als veilig beschouwd.`,
    infoSequence: `**Volgorderisico**: De volgorde van rendementen is cruciaal. Grote verliezen vroeg in je pensioen zijn veel schadelijker dan dezelfde verliezen later. De Monte Carlo simulatie modelleert dit automatisch.`,

    // Chart labels
    portfolio: 'Vermogen',
    fireTarget: 'FIRE Doel',
    yr: 'Jaar',
    yearLabel: 'Jaar',
    fireNumber: 'FIRE Bedrag',
    longevity: 'Overleving (jr)',
    p1090: '10e–90e percentiel',
    p2575: '25e–75e percentiel',
    median: 'Mediaan',
    yearRangeLabel: 'Jaar uitgeput',
    yearPrefix: 'Jaar',
  },

  en: {
    appName: 'FIRECalc',
    appSubtitle: 'Financial Independence · Retire Early',
    browserOnly: 'All calculations run in your browser',
    language: 'Language',
    yourNumbers: 'Your Numbers',
    realRatesNote: 'All rates are real (inflation-adjusted)',
    annualExpenses: 'Annual Expenses',
    currentPortfolio: 'Current Portfolio',
    annualSavings: 'Annual Savings',
    expectedReturn: 'Expected Real Return',
    expectedReturnHint: 'European equities historically ~5–7% real',
    withdrawalRate: 'Safe Withdrawal Rate (SWR)',
    withdrawalRateHint: '4% is classic; 3.5% is more conservative for European retirees',
    fireNumberTitle: 'FIRE Number',
    fireNumberSubtitle: (swr: string) => `${swr} SWR — how much you need to retire`,
    portfolioProgress: 'Portfolio progress',
    yearsToFireTitle: 'Years to FIRE',
    yearsToFireSubtitle: 'Deterministic projection at your expected real return',
    never: 'Never',
    neverHint: 'with current savings rate',
    alreadyThere: 'Already there!',
    years: 'years',
    swrTitle: 'SWR Explorer',
    swrSubtitle: 'How withdrawal rate affects your FIRE target and retirement safety',
    swrCol: 'SWR',
    fireNumberCol: 'FIRE Number',
    yearsToFireCol: 'Yrs to FIRE',
    survivesCol: 'Portfolio survives',
    now: 'Now',
    yearsPlus: '100+ yrs',
    monteCarloTitle: 'Monte Carlo Simulation',
    monteCarloSubtitle: (n: string, yrs: string) =>
      `${n} simulations, log-normal returns (±15% std dev), starting from your FIRE number over ${yrs} years`,
    successRate: 'success rate',
    survives: (yrs: string) => `portfolio survives ${yrs} years`,
    retirementHorizon: 'Retirement Horizon',
    simulations: 'Simulations',
    portfolioDistribution: 'Portfolio distribution over time',
    whenDepleted: 'When portfolios ran out of money',
    noDepletion: 'No depletion in any simulation',
    retirementYear: 'Retirement Year',
    depleted: 'Depleted',
    fractionDepleted: 'Fraction depleted',
    infoTitle: 'What is FIRE?',
    infoFIRE: `**FIRE** stands for Financial Independence, Retire Early. The idea is simple: build a portfolio large enough that you can live off the investment returns indefinitely, without ever needing to work again.`,
    info4Percent: `**The 4% rule** comes from the Trinity Study (1998). Researchers analyzed historical equity returns and found that a portfolio of 25× annual expenses can sustain a 4% annual withdrawal with high probability over 30 years. For longer horizons (40–60 years), a lower SWR of 3–3.5% is safer.`,
    infoReturns: `**Expected returns**: A diversified global equity portfolio has historically returned ~10% nominal per year. After inflation (~3%), that leaves ~7% real return. For European investors, this is somewhat lower (~5–6% real) due to historically lower European market returns. Bonds add stability but reduce expected returns.`,
    infoMonteCarlo: `**Monte Carlo** simulates thousands of possible futures by drawing random annual returns from a log-normal distribution. This reveals the probability of your portfolio surviving retirement — even in bad scenarios. A success rate of 90%+ is generally considered safe.`,
    infoSequence: `**Sequence-of-returns risk**: The order of returns matters enormously. Large losses early in retirement are far more damaging than the same losses later. The Monte Carlo simulation automatically models this.`,
    portfolio: 'Portfolio',
    fireTarget: 'FIRE Target',
    yr: 'Yr',
    yearLabel: 'Year',
    fireNumber: 'FIRE Number',
    longevity: 'Longevity (yrs)',
    p1090: '10th–90th %ile',
    p2575: '25th–75th %ile',
    median: 'Median',
    yearRangeLabel: 'Year ran out',
    yearPrefix: 'Year',
  },
} satisfies Record<Language, Record<string, unknown>>

export type Translations = (typeof translations)['nl']
