export interface GlobalInputs {
  annualExpenses: number;       // USD/year
  currentPortfolio: number;     // USD
  annualSavings: number;        // USD/year
  expectedRealReturn: number;   // decimal, e.g. 0.07
  withdrawalRate: number;       // decimal, e.g. 0.04
}

// Feature 1: FIRE Number
export interface FireNumberResult {
  fireNumber: number;
}

// Feature 2: Years to FIRE
export interface ProjectionPoint {
  year: number;
  portfolioValue: number;
  fireTarget: number;
}

export interface YearsToFireResult {
  yearsToFire: number | null;
  projectionData: ProjectionPoint[];
}

// Feature 3: SWR Explorer
export interface SwrScenario {
  swr: number;
  fireNumber: number;
  yearsToFire: number | null;
  longevity: number | null; // years portfolio survives in retirement
}

export interface SwrExplorerResult {
  scenarios: SwrScenario[];
}

// Feature 4: Monte Carlo
export interface MonteCarloInputs {
  startingPortfolio: number;
  annualSpending: number;
  years: number;
  numSimulations: number;
  meanRealReturn: number;   // arithmetic mean, e.g. 0.07
  stdDevReturn: number;     // e.g. 0.15
}

export interface PercentilePaths {
  p10: number[];
  p25: number[];
  p50: number[];
  p75: number[];
  p90: number[];
}

export interface HistogramBin {
  yearRange: string;
  fraction: number;
}

export interface MonteCarloResult {
  successRate: number;
  percentilePaths: PercentilePaths;
  depletionHistogram: HistogramBin[];
}
