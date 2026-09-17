export interface TradingStrategy {
  id: string;
  number: number;
  title: string;
  englishTitle?: string;
  module: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeframe: string;
  winRateEstimate?: string;
  riskReward?: string;
  
  // The 6 exact points
  psychologyAndLogic: string; // ১. কৌশলের মূল ভাবনা
  timeframeAndSetup: string;  // ২. টাইমফ্রেম ও চার্ট সেটআপ
  buyEntryRules: string[];    // ৩. বাই এন্ট্রি নিয়মাবলী
  sellEntryRules: string[];   // ৪. সেল এন্ট্রি নিয়মাবলী
  riskManagement: {           // ৫. ঝুঁকি ব্যবস্থাপনা ও টার্গেট
    stopLoss: string;
    takeProfit: string;
    rrr: string;
    riskPerTrade: string;
  };
  visualDiagramGuide: {       // ৬. ভিজ্যুয়াল ডায়াগ্রাম গাইড
    chartDescription: string;
    drawingSteps: string[];
    canvaPrompt: string;
    setupType: 'bullish' | 'bearish' | 'reversal' | 'breakout';
  };
  
  fullMarkdownContent?: string;
  isCustom?: boolean;
}

export interface StrategyModule {
  id: string;
  number: number;
  nameBangla: string;
  nameEnglish: string;
  description: string;
  targetCount: number;
}
