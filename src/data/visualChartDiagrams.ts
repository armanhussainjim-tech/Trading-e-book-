import { StrategyOutline } from './user100StrategiesOutline';

export interface SvgCandle {
  id: number;
  type: 'green' | 'red';
  open: number;
  high: number;
  low: number;
  close: number;
  label?: string;
  isKeyAction?: boolean;
}

export interface SvgChartConfig {
  candles: SvgCandle[];
  supportLevel?: { y: number; label: string };
  resistanceLevel?: { y: number; label: string };
  trendLine?: { x1: number; y1: number; x2: number; y2: number; label: string };
  curveLine?: { path: string; label: string; color: string };
  smcZone?: { x: number; y: number; width: number; height: number; label: string; color: string };
  entryPoint: { candleIndex: number; price: number; type: 'buy' | 'sell'; label: string };
  stopLoss: { price: number; label: string };
  takeProfit: { price: number; label: string };
  title: string;
  subtitle: string;
}

/**
 * Generates structured, professional Mermaid.js flowchart code for any strategy
 */
export function getStrategyMermaidChart(outline: StrategyOutline): string {
  const { number, categoryNumber, banglaTitle, englishTitle } = outline;

  if (number === 1) {
    return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    C1["1. রেড বিয়ারিশ ক্যান্ডেল (ডাউনট্রেন্ড)"]:::red --> SUP["═══ হরিজন্টাল সাপোর্ট জোন (Key Support Level) ═══"]:::level
    SUP --> C2["2. রিজেকশন গ্রিন ক্যান্ডেল (সাপোর্ট টাচ ও লম্বা নিচের উইক)"]:::green
    C2 --> CONFIRM["3. গ্রিন ক্যান্ডেল ক্লোজ কনফার্মেশন"]:::green
    CONFIRM --> ENTRY["★ বাই এন্ট্রি (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): সাপোর্ট ও ক্যান্ডেল উইকের নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): পরবর্তী রেজিস্ট্যান্স (১:২.৫+ RRR)"]:::green`;
  }

  if (number === 2) {
    return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    CONSOL["1. রেঞ্জ বাউন্ড কনসলিডেশন"]:::level --> RES["═══ কী-রেজিস্ট্যান্স লেভেল ═══"]:::level
    RES --> BO["2. শক্তিশালী গ্রিন মারুবোজু ব্রেকআউট ক্যান্ডেল"]:::green
    BO --> RETEST["3. ব্রোকেন রেজিস্ট্যান্সে পুলব্যাক ও রিটেস্ট ক্যান্ডেল"]:::red
    RETEST --> BOUNCE["4. রিটেস্ট বাউন্সে শক্তিশালী গ্রিন ক্যান্ডেল ক্লোজ"]:::green
    BOUNCE --> ENTRY["★ বাই এন্ট্রি (রিটেস্ট গ্রিন ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ব্রেকআউট লেভেলের নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): ১:৩ রিস্ক-টু-রিওয়ার্ড"]:::green`;
  }

  // Generate category-tailored Mermaid charts
  switch (categoryNumber) {
    case 1: // S&R & Trendline (3-10)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    TREND["1. প্রতিষ্ঠিত ট্রেন্ড ও প্রাইস অ্যাকশন লেভেল"]:::level --> KEY["═══ প্রাইস স্ট্রাকচার লেভেল (Key Level) ═══"]:::level
    KEY --> CANDLE["2. ক্যান্ডেলস্টিক রিজেকশন বা বাউন্স ফরমেশন"]:::green
    CANDLE --> TRIGGER["3. কনফার্মেশন ক্যান্ডেল সম্পূর্ণ ক্লোজ"]:::green
    TRIGGER --> ENTRY["★ এন্ট্রি ট্রিগার (গ্রিন/রেড ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): স্ট্রাকচারাল সুইং এর বাইরে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): পরবর্তী কি-লেভেল (১:২.৫+ RRR)"]:::green`;

    case 2: // Single Candlestick (11-20)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    SWING["1. ডাউনট্রেন্ড বা আপট্রেন্ড এক্সটেনশন"]:::red --> ZONE["═══ কি-সাপোর্ট / রেজিস্ট্যান্স লেভেল ═══"]:::level
    ZONE --> PATTERN["2. বিশেষ ক্যান্ডেলস্টিক (বডির চেয়ে ২ গুণ লম্বা রিজেকশন উইক)"]:::green
    PATTERN --> CLOSE["3. লেভেলের উপরে/নিচে ক্যান্ডেলের সুস্পষ্ট ক্লোজ"]:::green
    CLOSE --> ENTRY["★ এন্ট্রি পয়েন্ট (গ্রিন/রেড ক্যান্ডেল ক্লোজ হওয়ার পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ক্যান্ডেলের সুইং উইকের বাইরে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): ১:২.৫ থেকে ১:৩ RRR"]:::green`;

    case 3: // Multiple Candlestick (21-30)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    C1["১ম ক্যান্ডেল: দীর্ঘ মোমেন্টাম ক্যান্ডেল"]:::red --> C2["২য় ক্যান্ডেল: ছোট বডি ও মোমেন্টাম ক্ষয়"]:::level
    C2 --> C3["৩য় ক্যান্ডেল: আক্রমণাত্মক রিভার্সাল ক্যান্ডেল (৫০%+ রিকভারি)"]:::green
    C3 --> ENTRY["★ ট্রেড এন্ট্রি (৩য় ক্যান্ডেল ক্লোজ হওয়ার পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): পুরো ৩-ক্যান্ডেল প্যাটার্নের এক্সট্রিম লো/হাই"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): পরবর্তী স্ট্রাকচারাল সুইং (১:৩ RRR)"]:::green`;

    case 4: // Moving Average (31-40)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    MA_CROSS["1. ফাস্ট EMA ও স্লো EMA ক্রসওভার / ট্রেন্ড বায়াস"]:::level --> PULLBACK["2. প্রাইসের স্বাস্থ্যকর পুলব্যাক মুভিং অ্যাভারেজ লাইনে"]:::red
    PULLBACK --> TOUCH["3. ডায়নামিক EMA সাপোর্ট স্পর্শ ও রিজেকশন উইক"]:::level
    TOUCH --> GREEN_BOUNCE["4. মুভিং অ্যাভারেজের ওপরে গ্রিন ক্যান্ডেল ক্লোজ"]:::green
    GREEN_BOUNCE --> ENTRY["★ বাই এন্ট্রি (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): মুভিং অ্যাভারেজ লাইনের ৩-৫ পিপ নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): ১:২.৫ থেকে ১:৩ RRR"]:::green`;

    case 5: // Oscillator & Momentum (41-50)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    PRICE_LL["1. প্রাইস চার্টে লোয়ার লো (Lower Low) রেড ক্যান্ডেল"]:::red --> OSC_HL["2. RSI / অসিলেটরে হায়ার লো (Higher Low) ডাইভারজেন্স"]:::level
    OSC_HL --> OS_EXIT["3. অসিলেটর ৩০ লেভেল অতিক্রম করে উর্ধ্বমুখী বাঁক"]:::level
    OS_EXIT --> GREEN_REV["4. সাপোর্টে রিভার্সাল গ্রিন ক্যান্ডেল ক্লোজ"]:::green
    GREEN_REV --> ENTRY["★ এন্ট্রি কনফার্মেশন (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ডাইভারজেন্স সুইং লো-এর সামান্য নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): RSI ৭০ বা পরবর্তী সুইং হাই (১:২.৮ RRR)"]:::green`;

    case 6: // Volatility & Band (51-60)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    SQUEEZE["1. বোলিঙ্গার ব্যান্ড সরু সংকোচন (Volatility Squeeze)"]:::level --> EXPAND["2. ভলিউম বৃদ্ধি ও আপার ব্যান্ডের বাইরে ব্রেকআউট"]:::green
    EXPAND --> CANDLE_OUT["3. আপার ব্যান্ডের বাইরে দীর্ঘ গ্রিন ক্যান্ডেল ফুল বডি ক্লোজ"]:::green
    CANDLE_OUT --> ENTRY["★ মোমেন্টাম বাই এন্ট্রি (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ব্যান্ডের মিডল লাইন (20 SMA)-এর নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): ব্যান্ড রাইডিং বা ১:৩+ RRR"]:::green`;

    case 7: // Chart Patterns (61-70)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    PATTERN_BASE["1. চার্ট প্যাটার্ন তৈরি (যেমন: ডাবল বটম W বা ইনভার্স H&S)"]:::level --> NECK["═══ প্যাটার্ন নেকলাইন (Neckline Resistance) ═══"]:::level
    NECK --> BREAKOUT["2. শক্তিশালী গ্রিন ক্যান্ডেল বডি দিয়ে নেকলাইন ব্রেকআউট"]:::green
    BREAKOUT --> RETEST["3. ছোট রেড ক্যান্ডেল দিয়ে নেকলাইন পুলব্যাক রিটেস্ট"]:::red
    RETEST --> BOUNCE_GREEN["4. রিটেস্টে গ্রিন রিভার্সাল ক্যান্ডেল ক্লোজ"]:::green
    BOUNCE_GREEN --> ENTRY["★ বাই এন্ট্রি (নেকলাইন রিটেস্ট গ্রিন ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ব্রোকেন নেকলাইনের নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): প্যাটার্নের সমপরিমাণ গভীরতা (১:৩ RRR)"]:::green`;

    case 8: // Trend & Breakout (71-80)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    RANGE["1. দীর্ঘ কনসলিডেশন রেঞ্জ (Support & Resistance Box)"]:::level --> HIGH["═══ রেঞ্জ হাই বা ট্রেন্ড বাউন্ডারি ═══"]:::level
    HIGH --> EXP_CANDLE["2. রেঞ্জের বাইরে শক্তিশালী বুলিশ গ্রিন ক্যান্ডেল ক্লোজ"]:::green
    EXP_CANDLE --> FOLLOW["3. পরবর্তী ক্যান্ডেলে ব্রেকআউট ক্যান্ডেলের হাই অতিক্রম"]:::green
    FOLLOW --> ENTRY["★ ব্রেকআউট এন্ট্রি (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ব্রেকআউট রেঞ্জের মিডল পয়েন্টের নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): ট্রেইলিং স্টপ-লসে ১:৩.৫+ RRR"]:::green`;

    case 9: // Multi-Indicator (81-90)
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    TREND_EMA["1. প্রাইস দীর্ঘমেয়াদী ২০০ EMA-এর ওপরে (বুলিশ বায়াস)"]:::level --> RSI_50["2. RSI মান ৫০ এর ওপরে উঠে মোমেন্টাম নিশ্চিত"]:::level
    RSI_50 --> S_TOUCH["3. প্রাইস সাপোর্ট বা ২০০ EMA স্পর্শ করে রিজেকশন"]:::level
    S_TOUCH --> GREEN_CONF["4. বাউন্সে শক্তিশালী গ্রিন ক্যান্ডেল ক্লোজ"]:::green
    GREEN_CONF --> ENTRY["★ ত্রি-মাত্রিক কনফ্লুয়েন্স এন্ট্রি (গ্রিন ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): ২০০ EMA লাইনের নিচে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): পরবর্তী রেজিস্ট্যান্স (১:২.৮ RRR)"]:::green`;

    case 10: // Advanced SMC (91-100)
    default:
      return `graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;

    SSL["1. পূর্ববর্তী সুইং লো নিচে লিকুইডিটি পুল (Sell-Side Liquidity)"]:::level --> SWEEP["2. আক্রমণাত্মক রেড ক্যান্ডেলে লিকুইডিটি সুইপ ও দীর্ঘ নিচের উইক"]:::red
    SWEEP --> MSS["3. মেগা গ্রিন ক্যান্ডেলে মার্কেট স্ট্রাকচার শিফট (MSS)"]:::green
    MSS --> OB_ZONE["═══ আনমিটিগেটেড বুলিশ অর্ডার ব্লক (OB) / FVG ═══"]:::level
    OB_ZONE --> RETEST_OB["4. অর্ডার ব্লকে পুলব্যাক ও গ্রিন রিটেস্ট ক্যান্ডেল ক্লোজ"]:::green
    RETEST_OB --> ENTRY["★ স্মার্ট মানি বাই এন্ট্রি (গ্রিন ক্যান্ডেল ক্লোজের পর)"]:::action
    ENTRY --> SL["▼ স্টপ-লস (SL): লিকুইডিটি সুইপ উইকের নিচে বাফার দিয়ে"]:::red
    ENTRY --> TP["▲ টেক-প্রফিট (TP): বিপরীত হাই লিকুইডিটি (১:৩.৫ থেকে ১:৪+ RRR)"]:::green`;
  }
}

/**
 * Returns structured visual candlestick coordinates for the SVG chart renderer
 */
export function getStrategySvgConfig(outline: StrategyOutline): SvgChartConfig {
  const { number, categoryNumber, banglaTitle, englishTitle } = outline;

  // Category 1 / Strategy 1: Support & Resistance Reversal
  if (number === 1 || categoryNumber === 1) {
    return {
      title: `${banglaTitle} (ক্যান্ডেলস্টিক চার্ট চিত্র)`,
      subtitle: `টাইমফ্রেম: ${outline.defaultTimeframe} | সাপোর্ট বাউন্স ও এন্ট্রি সেটআপ`,
      candles: [
        { id: 1, type: 'red', open: 60, high: 55, low: 90, close: 85 },
        { id: 2, type: 'red', open: 85, high: 80, low: 120, close: 115 },
        { id: 3, type: 'red', open: 115, high: 110, low: 155, close: 150 },
        { id: 4, type: 'green', open: 160, high: 140, low: 175, close: 145, isKeyAction: true, label: 'সাপোর্ট বাউন্স (Green)' },
        { id: 5, type: 'green', open: 145, high: 105, low: 148, close: 110, isKeyAction: true, label: 'এন্ট্রি ক্যান্ডেল' },
        { id: 6, type: 'green', open: 110, high: 70, low: 112, close: 75 },
      ],
      supportLevel: { y: 165, label: 'সাপোর্ট লেভেল (Support Zone)' },
      resistanceLevel: { y: 65, label: 'টার্গেট রেজিস্ট্যান্স (Take Profit Zone)' },
      entryPoint: { candleIndex: 4, price: 110, type: 'buy', label: 'বাই এন্ট্রি: ১১০ (গ্রিন ক্যান্ডেল ক্লোজে)' },
      stopLoss: { price: 180, label: 'SL: ১৮০ (সাপোর্টের নিচে)' },
      takeProfit: { price: 65, label: 'TP: ৬৫ (টার্গেট ১:২.৭ RRR)' },
    };
  }

  // Category 2: Single Candlestick (Hammer / Pinbar / Shooting Star)
  if (categoryNumber === 2) {
    return {
      title: `${banglaTitle} (একক ক্যান্ডেল চার্ট)`,
      subtitle: `লম্বা রিজেকশন উইক সহ রিভার্সাল ক্যান্ডেলস্টিক সেটআপ`,
      candles: [
        { id: 1, type: 'red', open: 50, high: 45, low: 85, close: 80 },
        { id: 2, type: 'red', open: 80, high: 75, low: 120, close: 115 },
        { id: 3, type: 'red', open: 115, high: 110, low: 150, close: 145 },
        { id: 4, type: 'green', open: 155, high: 135, low: 190, close: 140, isKeyAction: true, label: 'পিনবার / হ্যামার (দীর্ঘ উইক)' },
        { id: 5, type: 'green', open: 140, high: 95, low: 142, close: 100, isKeyAction: true, label: 'ফলো-থ্রু গ্রিন' },
        { id: 6, type: 'green', open: 100, high: 60, low: 102, close: 65 },
      ],
      supportLevel: { y: 160, label: 'কী-সাপোর্ট লেভেল (Key Support)' },
      resistanceLevel: { y: 55, label: 'টার্গেট সুইং হাই' },
      entryPoint: { candleIndex: 3, price: 140, type: 'buy', label: 'এন্ট্রি: ১৪০ (গ্রিন হ্যামার ক্লোজে)' },
      stopLoss: { price: 195, label: 'SL: ১৯৫ (হ্যামারের লো-এর নিচে)' },
      takeProfit: { price: 55, label: 'TP: ৫৫ (১:৩ RRR)' },
    };
  }

  // Category 3: Multiple Candlestick (Engulfing / Morning Star)
  if (categoryNumber === 3) {
    return {
      title: `${banglaTitle} (মাল্টিপল ক্যান্ডেলস্টিক চিত্র)`,
      subtitle: `৩-ক্যান্ডেল মোমেন্টাম রিভার্সাল সিকোয়েন্স`,
      candles: [
        { id: 1, type: 'red', open: 55, high: 50, low: 95, close: 90 },
        { id: 2, type: 'red', open: 90, high: 85, low: 145, close: 140, label: '১ম রেড ক্যান্ডেল' },
        { id: 3, type: 'green', open: 150, high: 142, low: 160, close: 145, label: '২য় ছোট দোজি' },
        { id: 4, type: 'green', open: 145, high: 80, low: 148, close: 85, isKeyAction: true, label: '৩য় লম্বা গ্রিন (এনগালফিং)' },
        { id: 5, type: 'green', open: 85, high: 45, low: 88, close: 50, label: 'আপট্রেন্ড কনফার্মেশন' },
      ],
      supportLevel: { y: 155, label: 'সাপোর্ট বাউন্স এরিয়া' },
      resistanceLevel: { y: 45, label: 'টেক-প্রফিট লেভেল' },
      entryPoint: { candleIndex: 3, price: 85, type: 'buy', label: 'বাই এন্ট্রি: ৮৫ (গ্রিন ক্যান্ডেল ক্লোজের পর)' },
      stopLoss: { price: 165, label: 'SL: ১৬৫ (প্যাটার্নের লো-এর নিচে)' },
      takeProfit: { price: 45, label: 'TP: ৪৫ (১:২.৮ RRR)' },
    };
  }

  // Category 4: Moving Average Cross & Bounce
  if (categoryNumber === 4) {
    return {
      title: `${banglaTitle} (মুভিং অ্যাভারেজ চার্ট)`,
      subtitle: `EMA ডায়নামিক সাপোর্ট টাচ ও রিবাউন্ড`,
      candles: [
        { id: 1, type: 'green', open: 140, high: 90, low: 145, close: 95 },
        { id: 2, type: 'green', open: 95, high: 60, low: 98, close: 65 },
        { id: 3, type: 'red', open: 65, high: 60, low: 95, close: 90, label: 'পুলব্যাক' },
        { id: 4, type: 'red', open: 90, high: 85, low: 125, close: 120, label: 'EMA টাচ' },
        { id: 5, type: 'green', open: 120, high: 85, low: 130, close: 90, isKeyAction: true, label: 'EMA রিজেকশন Green' },
        { id: 6, type: 'green', open: 90, high: 40, low: 92, close: 45 },
      ],
      curveLine: { path: 'M 10 150 Q 150 135, 270 125 T 500 80', label: 'ডায়নামিক 50 EMA লাইন', color: '#3b82f6' },
      entryPoint: { candleIndex: 4, price: 90, type: 'buy', label: 'বাই এন্ট্রি: ৯০ (EMA বাউন্স গ্রিন ক্লোজে)' },
      stopLoss: { price: 138, label: 'SL: ১৩৮ (EMA লাইনের নিচে)' },
      takeProfit: { price: 40, label: 'TP: ৪০ (১:৩ RRR)' },
    };
  }

  // Category 5: Oscillator & Momentum Divergence
  if (categoryNumber === 5) {
    return {
      title: `${banglaTitle} (RSI ডাইভারজেন্স চার্ট)`,
      subtitle: `লোয়ার লো প্রাইস অ্যাকশন ও হায়ার লো RSI কনফ্লুয়েন্স`,
      candles: [
        { id: 1, type: 'red', open: 60, high: 55, low: 110, close: 105 },
        { id: 2, type: 'green', open: 105, high: 75, low: 108, close: 80 },
        { id: 3, type: 'red', open: 80, high: 75, low: 135, close: 130, label: 'সুইং লো ১' },
        { id: 4, type: 'green', open: 130, high: 100, low: 132, close: 105 },
        { id: 5, type: 'red', open: 105, high: 100, low: 155, close: 150, label: 'লোয়ার লো ২' },
        { id: 6, type: 'green', open: 150, high: 115, low: 158, close: 120, isKeyAction: true, label: 'ডাইভারজেন্স গ্রিন' },
      ],
      supportLevel: { y: 160, label: 'বুলিশ ডাইভারজেন্স জোন (RSI > 30)' },
      trendLine: { x1: 180, y1: 130, x2: 340, y2: 150, label: 'Price: Lower Low' },
      entryPoint: { candleIndex: 5, price: 120, type: 'buy', label: 'বাই এন্ট্রি: ১২০ (গ্রিন রিভার্সাল ক্লোজে)' },
      stopLoss: { price: 165, label: 'SL: ১৬৫ (সুইং লো-এর নিচে)' },
      takeProfit: { price: 50, label: 'TP: ৫০ (১:২.৮ RRR)' },
    };
  }

  // Category 6: Volatility & Bollinger Band Squeeze
  if (categoryNumber === 6) {
    return {
      title: `${banglaTitle} (ব্যান্ড ব্রেকআউট চার্ট)`,
      subtitle: `বোলিঙ্গার ব্যান্ড স্কুইজের পর বিস্ফোরক গ্রিন ক্যান্ডেল ব্রেকআউট`,
      candles: [
        { id: 1, type: 'green', open: 105, high: 95, low: 115, close: 100 },
        { id: 2, type: 'red', open: 100, high: 98, low: 110, close: 105, label: 'ব্যান্ড স্কুইজ' },
        { id: 3, type: 'green', open: 105, high: 92, low: 112, close: 98, label: 'সংকোচন' },
        { id: 4, type: 'green', open: 98, high: 45, low: 100, close: 50, isKeyAction: true, label: 'আপার ব্যান্ড ব্রেকআউট Green' },
        { id: 5, type: 'green', open: 50, high: 20, low: 52, close: 25, label: 'ব্যান্ড রাইডিং' },
      ],
      curveLine: { path: 'M 10 90 Q 150 88, 250 85 T 450 30', label: 'আপার বোলিঙ্গার ব্যান্ড', color: '#059669' },
      supportLevel: { y: 105, label: 'মিডল ব্যান্ড (20 SMA)' },
      entryPoint: { candleIndex: 3, price: 50, type: 'buy', label: 'এন্ট্রি: ৫০ (আপার ব্যান্ডের বাইরে ক্লোজে)' },
      stopLoss: { price: 110, label: 'SL: ১১০ (মিডল ব্যান্ডের নিচে)' },
      takeProfit: { price: 20, label: 'TP: ২০ (১:৩ RRR)' },
    };
  }

  // Category 7: Chart Patterns (Double Bottom W / Inverted H&S)
  if (categoryNumber === 7) {
    return {
      title: `${banglaTitle} (চার্ট প্যাটার্ন ব্রেকআউট)`,
      subtitle: `ডাবল বটম (W) নেকলাইন ব্রেকআউট ও রিটেস্ট সিকোয়েন্স`,
      candles: [
        { id: 1, type: 'red', open: 50, high: 45, low: 140, close: 135, label: '১ম বটম' },
        { id: 2, type: 'green', open: 135, high: 85, low: 138, close: 90, label: 'নেকলাইন টাচ' },
        { id: 3, type: 'red', open: 90, high: 88, low: 140, close: 135, label: '২য় বটম' },
        { id: 4, type: 'green', open: 135, high: 75, low: 138, close: 80, isKeyAction: true, label: 'নেকলাইন ব্রেকআউট Green' },
        { id: 5, type: 'red', open: 80, high: 78, low: 90, close: 88, label: 'রিটেস্ট' },
        { id: 6, type: 'green', open: 88, high: 40, low: 90, close: 45, label: 'রিটেস্ট বাউন্স' },
      ],
      resistanceLevel: { y: 88, label: 'নেকলাইন লেভেল (Neckline Resistance)' },
      supportLevel: { y: 140, label: 'ডাবল বটম সাপোর্ট বেস' },
      entryPoint: { candleIndex: 3, price: 80, type: 'buy', label: 'বাই এন্ট্রি: ৮০ (নেকলাইন ব্রেকআউট গ্রিন ক্লোজে)' },
      stopLoss: { price: 100, label: 'SL: ১০০ (নেকলাইনের নিচে)' },
      takeProfit: { price: 35, label: 'TP: ৩৫ (প্যাটার্নের উচ্চতা সমপরিমাণ)' },
    };
  }

  // Category 8: Trend & Breakout
  if (categoryNumber === 8) {
    return {
      title: `${banglaTitle} (ট্রেন্ড ব্রেকআউট চার্ট)`,
      subtitle: `কনসলিডেশন রেঞ্জ হাই ব্রেকআউট ও উর্ধ্বমুখী বিস্তার`,
      candles: [
        { id: 1, type: 'red', open: 95, high: 90, low: 125, close: 120 },
        { id: 2, type: 'green', open: 120, high: 92, low: 122, close: 95, label: 'রেঞ্জ সাপোর্ট' },
        { id: 3, type: 'red', open: 95, high: 90, low: 120, close: 115 },
        { id: 4, type: 'green', open: 115, high: 92, low: 118, close: 95, label: 'রেঞ্জ হাই টেস্ট' },
        { id: 5, type: 'green', open: 95, high: 45, low: 98, close: 50, isKeyAction: true, label: 'রেঞ্জ ব্রেকআউট গ্রিন' },
        { id: 6, type: 'green', open: 50, high: 20, low: 52, close: 25, label: 'ফলো-থ্রু' },
      ],
      resistanceLevel: { y: 92, label: 'রেঞ্জ রেজিস্ট্যান্স (Consolidation High)' },
      supportLevel: { y: 125, label: 'রেঞ্জ সাপোর্ট (Consolidation Low)' },
      entryPoint: { candleIndex: 4, price: 50, type: 'buy', label: 'বাই এন্ট্রি: ৫০ (ব্রেকআউট ক্যান্ডেল ক্লোজে)' },
      stopLoss: { price: 105, label: 'SL: ১০৫ (রেঞ্জের মাঝামাঝি)' },
      takeProfit: { price: 20, label: 'TP: ২০ (১:৩.৫ RRR)' },
    };
  }

  // Category 9: Multi-Indicator Confluence
  if (categoryNumber === 9) {
    return {
      title: `${banglaTitle} (ত্রি-মাত্রিক কনফ্লুয়েন্স চার্ট)`,
      subtitle: `200 EMA + হরিজন্টাল সাপোর্ট + গ্রিন ক্যান্ডেল ট্রিপল কনফার্মেশন`,
      candles: [
        { id: 1, type: 'green', open: 140, high: 80, low: 145, close: 85 },
        { id: 2, type: 'red', open: 85, high: 80, low: 130, close: 125, label: 'ডাউনওয়ার্ড পুলব্যাক' },
        { id: 3, type: 'red', open: 125, high: 120, low: 155, close: 150, label: '200 EMA টাচ' },
        { id: 4, type: 'green', open: 150, high: 110, low: 160, close: 115, isKeyAction: true, label: '200 EMA বাউন্স Green' },
        { id: 5, type: 'green', open: 115, high: 60, low: 118, close: 65, label: 'উর্ধ্বমুখী মোমেন্টাম' },
      ],
      curveLine: { path: 'M 10 170 Q 180 155, 300 148 T 500 135', label: '২০০ EMA লং-টার্ম ট্রেন্ড লাইন', color: '#6366f1' },
      supportLevel: { y: 155, label: 'মেজর সাপোর্ট লেভেল' },
      entryPoint: { candleIndex: 3, price: 115, type: 'buy', label: 'বাই এন্ট্রি: ১১৫ (গ্রিন ক্যান্ডেল ক্লোজে)' },
      stopLoss: { price: 168, label: 'SL: ১৬৮ (২০০ EMA লাইনের নিচে)' },
      takeProfit: { price: 55, label: 'TP: ৫৫ (১:৩ RRR)' },
    };
  }

  // Category 10: Advanced SMC (Order Block, Liquidity Sweep, MSS)
  return {
    title: `${banglaTitle} (স্মার্ট মানি SMC চার্ট)`,
    subtitle: `লিকুইডিটি সুইপ (SSL) + মার্কেট স্ট্রাকচার শিফট (MSS) + অর্ডার ব্লক রিটেস্ট`,
    candles: [
      { id: 1, type: 'red', open: 60, high: 55, low: 120, close: 115 },
      { id: 2, type: 'green', open: 115, high: 80, low: 118, close: 85, label: 'পূর্ববর্তী সুইং লো' },
      { id: 3, type: 'red', open: 85, high: 80, low: 175, close: 140, isKeyAction: true, label: 'লিকুইডিটি সুইপ (SSL Sweep)' },
      { id: 4, type: 'green', open: 140, high: 50, low: 145, close: 55, isKeyAction: true, label: 'MSS শিফট গ্রিন' },
      { id: 5, type: 'red', open: 55, high: 52, low: 100, close: 95, label: 'OB রিটেস্ট' },
      { id: 6, type: 'green', open: 95, high: 35, low: 98, close: 40, isKeyAction: true, label: 'অর্ডার ব্লক বাউন্স' },
    ],
    supportLevel: { y: 125, label: 'Sell-Side Liquidity (SSL) পুল' },
    smcZone: { x: 260, y: 85, width: 140, height: 35, label: 'বুলিশ অর্ডার ব্লক (Order Block)', color: '#10b981' },
    resistanceLevel: { y: 35, label: 'Buy-Side Liquidity (BSL) টার্গেট' },
    entryPoint: { candleIndex: 5, price: 95, type: 'buy', label: 'বাই এন্ট্রি: ৯৫ (অর্ডার ব্লকে গ্রিন ক্লোজে)' },
    stopLoss: { price: 180, label: 'SL: ১৮০ (সুইপ উইকের নিচে)' },
    takeProfit: { price: 30, label: 'TP: ৩০ (১:৪.৫ RRR)' },
  };
}
