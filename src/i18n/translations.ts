export type Language = 'nl' | 'en'

export const translations = {
  nl: {
    // Header
    appName: 'FIRE Planner',
    appSubtitle: '🔥 Financiële Onafhankelijkheid · Vroeg Pensioen',
    browserOnly: 'Alle berekeningen in je browser',

    // Nav / language
    language: 'Taal',

    // Input panel
    yourNumbers: 'Jouw Cijfers',
    realRatesNote: 'Alle rendementen zijn reëel (na inflatie)',
    inputHelpTitle: 'Hoe vul je dit in?',
    inputHelpBody:
      'Begin met je maandelijkse uitgaven in geld van vandaag. Vul daarna in hoeveel vermogen je al hebt en hoeveel je maandelijks toevoegt. De app rekent dat automatisch door naar jaarbedragen voor de berekeningen. Het verwachte rendement is ook in geld van vandaag: dus al gecorrigeerd voor inflatie.',
    annualExpenses: 'Maandelijkse Uitgaven',
    annualExpensesInfo:
      'Gebruik wat je per maand verwacht uit te geven tijdens FIRE, niet je huidige bruto salaris. Denk aan wonen, zorg, belasting en leuke dingen.',
    currentPortfolio: 'Huidig Vermogen',
    currentPortfolioInfo:
      'Tel beleggingen, pensioenpotten die je wilt meenemen en contanten die echt bedoeld zijn voor je FIRE-plan. Je eigen woning laat je meestal buiten beschouwing.',
    annualSavings: 'Maandelijkse Inleg',
    annualSavingsInfo:
      'Dit is hoeveel je per maand extra investeert. Gebruik het netto bedrag dat daadwerkelijk richting vermogen gaat.',
    annualizedAmount: (amount: string) => `${amount} per jaar`,
    expectedReturn: 'Verwacht Reëel Rendement',
    expectedReturnHint: 'Europese aandelen historisch ~5–7% reëel',
    expectedReturnInfo:
      'Reëel rendement is na inflatie. Kies liever een voorzichtige langetermijninschatting dan een optimistisch beursjaar.',
    withdrawalRate: 'Veilige Onttrekkingsratio (SWR)',
    withdrawalRateHint: '4% is klassiek; 3,5% is conservatiever voor Europese gepensioneerden',
    withdrawalRateInfo:
      'Je SWR bepaalt welk deel van je portefeuille je jaarlijks onttrekt. Lager is veiliger, maar betekent ook dat je meer vermogen moet opbouwen.',

    // Fire Number
    fireNumberTitle: 'FIRE Bedrag',
    fireNumberSubtitle: (swr: string) =>
      `${swr} SWR — hoeveel je nodig hebt om met pensioen te gaan`,
    portfolioProgress: 'Vermogensvoortgang',
    howToReadTitle: 'Hoe lees je dit?',
    whatThisMeansTitle: 'Wat betekent dit?',
    howToCompareTitle: 'Hoe vergelijk je dit?',
    fireNumberHelp:
      'Zie dit als je pensioenpot in geld van vandaag. Als jouw leven nu ongeveer dit bedrag per jaar kost, dan heb je met dit doelvermogen genoeg om datzelfde leven later te betalen, zonder eerst inflatie erbij op te tellen. Een lagere SWR maakt dit doelbedrag hoger maar veiliger.',
    fireNumberSummary: (amount: string, swr: string) =>
      `Met een SWR van ${swr} mik je op ongeveer ${amount} in koopkracht van vandaag om je jaarlijkse uitgaven te dekken.`,

    // Years to FIRE
    yearsToFireTitle: 'Jaren tot FIRE',
    yearsToFireSubtitle: 'Deterministische projectie op basis van verwacht rendement',
    never: 'Nooit',
    neverHint: 'met huidige spaartempo',
    alreadyThere: 'Je bent er al!',
    years: 'jaar',
    yearsToFireHelp:
      'Dit is een ruwe schatting van hoeveel jaar het duurt om je doel te halen als je elk jaar blijft inleggen en je gemiddelde rendement ongeveer klopt. Alles wordt getoond in geld van vandaag, dus je hoeft niet zelf na te denken over toekomstige inflatie. In werkelijkheid gaan markten op en neer, dus gebruik dit als kompas, niet als exacte datum.',

    // SWR Explorer
    swrTitle: 'SWR Verkenner',
    swrSubtitle: 'Hoe de onttrekkingsratio je FIRE-doel en pensioenzekerheid beïnvloedt',
    swrCol: 'SWR',
    fireNumberCol: 'FIRE Bedrag',
    yearsToFireCol: 'Jaren tot FIRE',
    survivesCol: 'Portefeuille houdt',
    now: 'Nu',
    yearsPlus: '100+ jaar',
    swrHelp:
      'Hier zie je de afruil tussen eerder stoppen en meer zekerheid. Een hogere SWR betekent dat je sneller kunt stoppen omdat je minder vermogen nodig hebt, maar je portefeuille wordt kwetsbaarder. Een lagere SWR vraagt meer jaren opbouw, maar geeft meer marge als rendementen tegenvallen.',

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
    monteCarloHelp:
      'Dit onderdeel test niet één toekomst, maar heel veel mogelijke toekomsten. Het percentage laat zien in hoeveel scenario’s je pensioenpot lang genoeg meegaat. Ook hier rekenen we in geld van vandaag: je uitgaven en rendement zijn dus al gecorrigeerd voor inflatie. Een lagere score betekent vooral dat slechte eerste beursjaren pijn doen.',

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
    disclaimer:
      'Deze tool is uitsluitend bedoeld voor educatieve en informatieve doeleinden. Niets hier vormt financieel, fiscaal of beleggingsadvies. Rendementen uit het verleden bieden geen garantie voor de toekomst. Raadpleeg een gekwalificeerd financieel adviseur voordat je beleggings- of pensioenbeslissingen neemt.',
  },

  en: {
    appName: 'FIRE Planner',
    appSubtitle: '🔥 Financial Independence · Retire Early',
    browserOnly: 'All calculations run in your browser',
    language: 'Language',
    yourNumbers: 'Your Numbers',
    realRatesNote: 'All rates are real (inflation-adjusted)',
    inputHelpTitle: 'How should you fill this in?',
    inputHelpBody:
      'Start with your monthly spending in today’s money. Then enter how much wealth you already have and how much you add each month. The app converts that into yearly amounts for the calculations. The expected return is also in today’s money, which means inflation is already stripped out.',
    annualExpenses: 'Monthly Expenses',
    annualExpensesInfo:
      'Use your expected monthly spending during FIRE, not your current gross salary. Include housing, healthcare, taxes, and normal lifestyle spending.',
    currentPortfolio: 'Current Portfolio',
    currentPortfolioInfo:
      'Include investments, pensions you want to count, and cash actually meant for your FIRE plan. Most people exclude their primary home.',
    annualSavings: 'Monthly Contributions',
    annualSavingsInfo:
      'This is how much you invest each month on top of growth. Use the net amount that truly goes into wealth building.',
    annualizedAmount: (amount: string) => `${amount} per year`,
    expectedReturn: 'Expected Real Return',
    expectedReturnHint: 'European equities historically ~5–7% real',
    expectedReturnInfo:
      'Real return means after inflation. A cautious long-term estimate is usually better than extrapolating a strong market year.',
    withdrawalRate: 'Safe Withdrawal Rate (SWR)',
    withdrawalRateHint: '4% is classic; 3.5% is more conservative for European retirees',
    withdrawalRateInfo:
      'Your SWR is the share of the portfolio you withdraw each year. Lower is safer, but it also means you need a larger portfolio.',
    fireNumberTitle: 'FIRE Number',
    fireNumberSubtitle: (swr: string) => `${swr} SWR — how much you need to retire`,
    portfolioProgress: 'Portfolio progress',
    howToReadTitle: 'How do you read this?',
    whatThisMeansTitle: 'What does this mean?',
    howToCompareTitle: 'How do you compare this?',
    fireNumberHelp:
      'Think of this as your retirement pot in today’s money. If your life costs roughly this much per year now, this target aims to fund that same lifestyle later without you having to manually add future inflation on top. A lower SWR raises the target, but it is also safer.',
    fireNumberSummary: (amount: string, swr: string) =>
      `At a ${swr} SWR, you are aiming for roughly ${amount} of today’s purchasing power to fund your annual spending.`,
    yearsToFireTitle: 'Years to FIRE',
    yearsToFireSubtitle: 'Deterministic projection at your expected real return',
    never: 'Never',
    neverHint: 'with current savings rate',
    alreadyThere: 'Already there!',
    years: 'years',
    yearsToFireHelp:
      'This is a rough estimate of how many years it takes to hit your target if you keep investing each year and your average return is about right. Everything is shown in today’s money, so you do not need to mentally adjust for future inflation. Real markets are bumpier than this, so use it as a compass, not a promise.',
    swrTitle: 'SWR Explorer',
    swrSubtitle: 'How withdrawal rate affects your FIRE target and retirement safety',
    swrCol: 'SWR',
    fireNumberCol: 'FIRE Number',
    yearsToFireCol: 'Yrs to FIRE',
    survivesCol: 'Portfolio survives',
    now: 'Now',
    yearsPlus: '100+ yrs',
    swrHelp:
      'This shows the tradeoff between retiring earlier and having more safety. A higher SWR lets you retire with less money, but makes the portfolio more fragile. A lower SWR takes longer to reach, but gives you more margin when returns disappoint.',
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
    monteCarloHelp:
      'This does not test one future. It tests many possible futures. The percentage shows how often the retirement portfolio lasted long enough across those scenarios. This also uses today’s money, so spending and returns are already adjusted for inflation. A lower score usually means bad early market years would hurt a lot.',
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
    disclaimer:
      'This tool is for educational and informational purposes only. Nothing here constitutes financial, tax, or investment advice. Past market returns do not guarantee future results. Consult a qualified financial adviser before making any investment or retirement decisions.',
  },
} satisfies Record<Language, Record<string, unknown>>

export type Translations = (typeof translations)['nl']
