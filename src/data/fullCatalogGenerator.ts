import { TradingStrategy } from '../types';
import { USER_100_STRATEGIES_OUTLINE } from './user100StrategiesOutline';
import { getCleanStrategyContent } from './cleanStrategyFormatter';

export function buildFull100StrategiesCatalog(): TradingStrategy[] {
  return USER_100_STRATEGIES_OUTLINE.map((outline) => {
    const cleanData = getCleanStrategyContent(outline);

    return {
      id: `strat-${outline.number}`,
      number: outline.number,
      title: outline.banglaTitle,
      englishTitle: outline.englishTitle,
      module: outline.moduleNameBangla,
      difficulty: outline.defaultDifficulty,
      timeframe: outline.defaultTimeframe,
      winRateEstimate: outline.number > 90 ? '70% - 75%' : '67% - 72%',
      riskReward: cleanData.riskManagement.rrr,
      psychologyAndLogic: cleanData.psychology,
      timeframeAndSetup: cleanData.setup,
      buyEntryRules: cleanData.buyRules,
      sellEntryRules: cleanData.sellRules,
      riskManagement: cleanData.riskManagement,
      visualDiagramGuide: {
        chartDescription: cleanData.chartGuide,
        drawingSteps: [
          'কি-লেভেল ও জোন মার্ক করুন',
          'ক্যান্ডেলস্টিক রিজেকশন উইক কনফার্ম করুন',
          'এন্ট্রি পয়েন্ট ও এসএল/টিপি লেবেল দিন',
        ],
        canvaPrompt: `Minimal clean TradingView chart showing Strategy #${outline.number}: ${outline.englishTitle}. Simple price action, clear support and resistance, entry arrow with stop loss and take profit lines.`,
        setupType: outline.setupType,
      },
    };
  });
}
