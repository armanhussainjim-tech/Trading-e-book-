import { StrategyOutline } from './user100StrategiesOutline';
import { getStrategyAsciiDiagram } from './asciiDiagrams';
import {
  getStrategyAvoidRules,
  getStrategyCaseStudy,
  getStrategyChapterSummary,
  getStrategyProTip,
  getStrategyWarningTrap,
} from './strategyEnhancements';
import { getStrategyMermaidChart } from './visualChartDiagrams';

export interface CleanPaperbackStrategy {
  title: string;
  englishTitle?: string;
  number: number;
  module: string;
  chapterSummary: string;
  psychology: string;
  timeframe: string;
  candleType: string;
  indicators: string;
  buyConditions: string[];
  buyEntry: string;
  sellConditions: string[];
  sellEntry: string;
  stopLoss: string;
  takeProfit: string;
  proTip: string;
  warningTrap: string;
  avoidRules: string[];
  caseStudy: string;
  chartGuideBackground: string;
  chartGuideDrawing: string;
  asciiDiagram: string;
  mermaidChart: string;
}

export function formatStrategyAsMarkdown(strategy: CleanPaperbackStrategy): string {
  const buySteps = strategy.buyConditions
    .map((c, i) => `${i + 1}. **কন্ডিশন ${i + 1}:** ${c}`)
    .join('\n');
  const buyEntryStep = `${strategy.buyConditions.length + 1}. **এন্ট্রি পয়েন্ট:** ${strategy.buyEntry}`;

  const sellSteps = strategy.sellConditions
    .map((c, i) => `${i + 1}. **কন্ডিশন ${i + 1}:** ${c}`)
    .join('\n');
  const sellEntryStep = `${strategy.sellConditions.length + 1}. **এন্ট্রি পয়েন্ট:** ${strategy.sellEntry}`;

  return `================================================================================
CHAPTER HEADER: ${strategy.module} | STRATEGY NO. ${strategy.number}
================================================================================

# ${strategy.title}${strategy.englishTitle ? ` (${strategy.englishTitle})` : ''}

> **📘 চ্যাপ্টার সারসংক্ষেপ:** 
> ${strategy.chapterSummary}

---

## 📌 ১. মার্কেট সাইকোলজি ও মেকানিক্স (Psychology & Logic)
${strategy.psychology}

---

## ⚙️ ২. চার্ট সেটআপ ও প্যারামিটার (Chart Setup)
| প্যারামিটার (Parameter) | স্পেসিফিকেশন (Specification) |
| :--- | :--- |
| **টাইমফ্রেম** | ${strategy.timeframe} |
| **ক্যান্ডেলস্টিক প্রকার** | ${strategy.candleType || 'রেড (বিয়ারিশ) এবং গ্রিন (বুলিশ)'} |
| **ইন্ডিকেটর/লেভেল** | ${strategy.indicators} |

---

## 🎯 ৩. ট্রেড এক্সিকিউশন রুলস (Execution Rules)

### 🟢 বাই ট্রেড রুলস (Bullish Setup)
${buySteps}
${buyEntryStep}

### 🔴 সেল ট্রেড রুলস (Bearish Setup)
${sellSteps}
${sellEntryStep}

---

## 🛡️ ৪. রিস্ক ম্যানেজমেন্ট (SL, TP & Risk)
* 🛑 **স্টপ-লস (SL):** ${strategy.stopLoss}
* 🎯 **টেক-প্রফিট (TP):** ${strategy.takeProfit}

> 💡 **প্রো-টিপস (Trader's Pro-Tip):**
> ${strategy.proTip}

> ⚠️ **কখন ট্রেড এড়িয়ে চলবেন (Warning Trap):**
> ${strategy.warningTrap}

---

## 📊 ৫. ভিজ্যুয়াল ক্যান্ডেলস্টিক চার্ট (Mermaid Visual Chart)
\`\`\`mermaid
${strategy.mermaidChart}
\`\`\`
`;
}

export type StrategyBaseContent = Omit<
  CleanPaperbackStrategy,
  'asciiDiagram' | 'avoidRules' | 'caseStudy' | 'mermaidChart' | 'chapterSummary' | 'proTip' | 'warningTrap' | 'candleType'
> & {
  chapterSummary?: string;
  candleType?: string;
  proTip?: string;
  warningTrap?: string;
  avoidRules?: string[];
  caseStudy?: string;
  mermaidChart?: string;
};

export function getPaperbackStrategyContent(outline: StrategyOutline): CleanPaperbackStrategy {
  const { categoryNumber } = outline;
  let baseContent: StrategyBaseContent;

  if (categoryNumber === 1) {
    baseContent = getCategory1Strategy(outline);
  } else if (categoryNumber === 2) {
    baseContent = getCategory2Strategy(outline);
  } else if (categoryNumber === 3) {
    baseContent = getCategory3Strategy(outline);
  } else if (categoryNumber === 4) {
    baseContent = getCategory4Strategy(outline);
  } else if (categoryNumber === 5) {
    baseContent = getCategory5Strategy(outline);
  } else if (categoryNumber === 6) {
    baseContent = getCategory6Strategy(outline);
  } else if (categoryNumber === 7) {
    baseContent = getCategory7Strategy(outline);
  } else if (categoryNumber === 8) {
    baseContent = getCategory8Strategy(outline);
  } else if (categoryNumber === 9) {
    baseContent = getCategory9Strategy(outline);
  } else {
    baseContent = getCategory10Strategy(outline);
  }

  const avoidRules = baseContent.avoidRules || getStrategyAvoidRules(outline);
  const caseStudy = baseContent.caseStudy || getStrategyCaseStudy(outline);
  const mermaidChart = baseContent.mermaidChart || getStrategyMermaidChart(outline);
  const chapterSummary = baseContent.chapterSummary || getStrategyChapterSummary(outline);
  const proTip = baseContent.proTip || getStrategyProTip(outline);
  const warningTrap = baseContent.warningTrap || getStrategyWarningTrap(outline);
  const candleType = baseContent.candleType || 'রেড (বিয়ারিশ) এবং গ্রিন (বুলিশ)';

  return {
    ...baseContent,
    chapterSummary,
    candleType,
    proTip,
    warningTrap,
    avoidRules,
    caseStudy,
    mermaidChart,
    asciiDiagram: getStrategyAsciiDiagram(outline),
  };
}

function getCategory1Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;

  if (number === 1) { // Support & Resistance Reversal
    return {
      title: banglaTitle,
      englishTitle,
      number,
      module: moduleNameBangla,
      psychology: 'সাপোর্ট জোনে আগের বায়ারদের বাই লিমিট অর্ডার সক্রিয় থাকে। সেলাররা যখন রেড ক্যান্ডেল দিয়ে প্রাইস নিচে নামায়, সাপোর্টে এসে বায়ারদের বাউন্সে লম্বা নিচের উইক সহ গ্রিন ক্যান্ডেল তৈরি হয় এবং রিভার্সাল ঘটে।',
      timeframe: '১৫ মিনিট (ইন্ট্রাডে) অথবা ১ ঘণ্টা/৪ ঘণ্টা (সুইং ট্রেডিং)।',
      indicators: 'শুধুমাত্র পিওর ক্যান্ডেলস্টিক চার্ট ও হরিজন্টাল সাপোর্ট-রেজিস্ট্যান্স লেভেল।',
      buyConditions: [
        'মার্কেট একটি সুনির্দিষ্ট সাপোর্ট লেভেলে নিচে নেমে আসবে।',
        'সাপোর্ট লাইনে স্পর্শ করার পর ক্যান্ডেলের নিচে লম্বা উইক (Rejection Wick) তৈরি হতে হবে, যা প্রমাণ করে সেলাররা ব্যর্থ হয়েছে।',
        'একটি স্পষ্ট Green (বুলিশ) হ্যামার বা বুলিশ এনগালফিং ক্যান্ডেল সাপোর্ট লাইনের উপরে শক্তভাবে ক্লোজ হতে হবে।',
      ],
      buyEntry: 'গ্রিন (Green) বুলিশ ক্যান্ডেল ক্লোজ হওয়ার পর পরবর্তী ক্যান্ডেলের শুরুতে।',
      sellConditions: [
        'প্রাইস উর্ধ্বমুখী হয়ে পূর্বে টেস্টেড রেজিস্ট্যান্স লেভেলে পৌঁছাবে।',
        'রেজিস্ট্যান্স লাইনে ক্যান্ডেলের উপরের দিকে দীর্ঘ উইক তৈরি হবে (বায়াররা দুর্বল)।',
        'একটি স্পষ্ট Red (বিয়ারিশ) শুটিং স্টার বা বিয়ারিশ ক্যান্ডেল রেজিস্ট্যান্সের নিচে ক্লোজ হতে হবে।',
      ],
      sellEntry: 'রেড (Red) বিয়ারিশ ক্যান্ডেল ক্লোজ হওয়ার পর।',
      stopLoss: 'বাই ট্রেডের জন্য সাপোর্ট লেভেলের সর্বনিম্ন উইক বা লো-এর সামান্য নিচে; সেল ট্রেডের জন্য রেজিস্ট্যান্সের হাই-এর উপরে।',
      takeProfit: 'পরবর্তী রেজিস্ট্যান্স বা কি-লেভেল (রিস্ক-টু-রিওয়ার্ড ১:২.৫ বা ১:৩)।',
      chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
      chartGuideDrawing: 'চার্টের নিচে একটি অনুভূমিক নীল সাপোর্ট লাইন (Blue Horizontal Support) আঁকুন। উপর থেকে কয়েকটি রেড ক্যান্ডেল নেমে এসে সাপোর্ট লাইন স্পর্শ করবে। সাপোর্ট লাইনে লম্বা নিচের উইক সহ একটি Green হ্যামার ক্যান্ডেল আঁকুন। ঐ গ্রিন ক্যান্ডেলের ঠিক মাথার উপরে একটি সবুজ ঊর্ধ্বমুখী বাই অ্যারো (Up Arrow) দিন, ক্যান্ডেলের লো-এর নিচে লাল ড্যাশড লাইনে SL এবং উপরের পরবর্তী রেজিস্ট্যান্সে সবুজ লাইনে TP মার্ক করুন।',
    };
  }

  if (number === 2) { // Support & Resistance Breakout
    return {
      title: banglaTitle,
      englishTitle,
      number,
      module: moduleNameBangla,
      psychology: 'রেজিস্ট্যান্সে বারবার ধাক্কা খাওয়ার ফলে সেলারদের সাপ্লাই নিঃশেষ হয়ে যায়। প্রতিষ্ঠানগুলো বড় ভলিউমে বাই দিলে বড় গ্রিন ক্যান্ডেলে ব্রেকআউট হয় এবং ট্র্যাপড সেলারদের স্টপ-লস ট্রিগার হয়ে মার্কেট রকেটের মতো উপরে ছুটে যায়।',
      timeframe: '১ ঘণ্টা (ব্রেকআউট) এবং ১৫ মিনিট (রিটেস্ট এন্ট্রি)।',
      indicators: 'ক্যান্ডেলস্টিক চার্ট ও ভলিউম বার।',
      buyConditions: [
        'একটি বড় এবং শক্তিশালী Green (বুলিশ মারুবোজু) ক্যান্ডেল দিয়ে রেজিস্ট্যান্স লাইনের উপরে ক্যান্ডেলের ফুল বডি ক্লোজ হতে হবে।',
        'ব্রেকআউটের পরপরই ঝাঁপিয়ে পড়বেন না; প্রাইস ব্রোকেন রেজিস্ট্যান্স লাইনে ছোট ছোট রেড ক্যান্ডেল দিয়ে শান্তভাবে রিটেস্ট করতে নেমে আসা পর্যন্ত অপেক্ষা করুন।',
        'রিটেস্ট লেভেলে স্পর্শ করে নিচের দিকে রিজেকশন উইক সহ একটি নতুন Green রিভার্সাল ক্যান্ডেল তৈরি হতে হবে।',
      ],
      buyEntry: 'রিটেস্ট লেভেলে গঠিত Green ক্যান্ডেল ক্লোজ হওয়ার পর।',
      sellConditions: [
        'একটি দীর্ঘ বডির শক্তিশালী Red ক্যান্ডেল দ্বারা সাপোর্ট লেভেলের নিচে স্পষ্ট ব্রেকডাউন ও ক্লোজ হতে হবে।',
        'প্রাইস পুনরায় ব্রোকেন সাপোর্ট লাইনে রিটেস্ট করতে উপরে উঠবে।',
        'ব্রোকেন সাপোর্টে একটি Red বিয়ারিশ রিজেকশন ক্যান্ডেল তৈরি হয়ে নিচে ক্লোজ হতে হবে।',
      ],
      sellEntry: 'রিটেস্টে Red ক্যান্ডেল ক্লোজ হওয়ার পর।',
      stopLoss: 'বুলিশ রিটেস্ট ক্যান্ডেল বা ব্রোকেন রেজিস্ট্যান্সের সুইং লো-এর নিচে।',
      takeProfit: 'ব্রেকআউট হওয়া কনসলিডেশন রেঞ্জের সমান উচ্চতা (কমপক্ষে ১:২.৫+ RRR)।',
      chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
      chartGuideDrawing: 'চার্টের মাঝ বরাবর একটি অনুভূমিক লাল রেজিস্ট্যান্স লাইন আঁকুন। নিচ থেকে একটি শক্তিশালী দীর্ঘ বডির Green মারুবোজু ক্যান্ডেল লাইনটি ভেদ করে ওপরে ক্লোজ হয়েছে দেখান। পরবর্তী ১-২টি ছোট Red ক্যান্ডেল লাইনটিতে রিটেস্ট করতে নেমে এসে স্পর্শ করবে। রিটেস্ট বাউন্সে গঠিত নতুন Green ক্যান্ডেলের ওপরে সবুজ বাই অ্যারো এবং ব্রোকেন রেজিস্ট্যান্সের নিচে ড্যাশড লাইনে SL মার্ক করুন।',
    };
  }

  if (number === 3) { // Dynamic Support & Resistance
    return {
      title: banglaTitle,
      englishTitle,
      number,
      module: moduleNameBangla,
      psychology: 'ট্রেন্ডিং মার্কেটে প্রাতিষ্ঠানিক অ্যালগরিদমগুলো নির্দিষ্ট মুভিং অ্যাভারেজের কাছাকাছি ডিসকাউন্টে বাই করতে পছন্দ করে। প্রাইস ইএমএ স্পর্শ করলেই নতুন বাই অর্ডারের জোয়ারে গ্রিন ক্যান্ডেল তৈরি হয়।',
      timeframe: '১৫ মিনিট বা ১ ঘণ্টা।',
      indicators: '20 EMA (দ্রুত মোমেন্টাম) এবং 50 EMA (ডায়নামিক সাপোর্ট)।',
      buyConditions: [
        '20 EMA লাইনটি অবশ্যই 50 EMA লাইনের উপরে থাকবে এবং উভয় লাইন উর্ধ্বমুখী কোণে থাকবে।',
        'প্রাইস পুলব্যাক করে 20 বা 50 EMA স্পর্শ করতে নিচে নামবে।',
        'EMA লাইনে স্পর্শ করে ক্যান্ডেলের নিচে লম্বা উইক সহ একটি শক্তিশালী Green ক্যান্ডেল EMA-এর উপরে ক্লোজ হতে হবে।',
      ],
      buyEntry: 'EMA বাউন্সে Green ক্যান্ডেল ক্লোজ হওয়ার পর।',
      sellConditions: [
        '20 EMA নিচে এবং ডাউনট্রেন্ড সক্রিয় থাকবে।',
        'প্রাইস উর্ধ্বমুখী রিট্রেস করে EMA লাইনে পৌঁছাবে।',
        'EMA স্পর্শ করে উপরের দিকে লম্বা উইক সহ Red বিয়ারিশ ক্যান্ডেল নিচে ক্লোজ হবে।',
      ],
      sellEntry: 'EMA রিজেকশনে Red ক্যান্ডেল ক্লোজ হওয়ার পর।',
      stopLoss: '50 EMA লাইন বা নিকটবর্তী সুইং ক্যান্ডেলের লো/হাই এর সামান্য বাইরে।',
      takeProfit: 'পূর্ববর্তী রিসেন্ট সুইং হাই বা ট্রেইলিং স্টপ-লসের মাধ্যমে ট্রেন্ড শেষ না হওয়া পর্যন্ত।',
      chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
      chartGuideDrawing: 'চার্টে একটি উর্ধ্বমুখী বাঁকা 50 EMA নীল লাইন আঁকুন। ক্যান্ডেলগুলো লাইনের উপরে আপট্রেন্ডে সাজান। প্রাইস ডিপ করে 50 EMA স্পর্শ করবে এবং সেখানে লম্বা নিচের উইক সহ একটি Green ক্যান্ডেল তৈরি হবে। EMA স্পর্শকারী গ্রিন ক্যান্ডেলের ওপরে সবুজ বাই অ্যারো এবং EMA-এর সামান্য নিচে ড্যাশড লাইনে SL মার্ক করুন।',
    };
  }

  if (number === 4) { // Trendline Bounce
    return {
      title: banglaTitle,
      englishTitle,
      number,
      module: moduleNameBangla,
      psychology: 'আপট্রেন্ডে বায়াররা প্রতিটি ডিপে বেশি দামে কিনতে রাজি থাকে। ট্রেন্ডলাইনে প্রাইস তৃতীয়বার আসার পর টেকনিক্যাল বায়াররা লো-রিস্কে এন্ট্রি নেয়, ফলে সেখান থেকে শক্তিশালী গ্রিন ক্যান্ডেলে ঊর্ধ্বগতি দেখা যায়।',
      timeframe: '১৫ মিনিট বা ১ ঘণ্টা।',
      indicators: 'ট্রেন্ডলাইন টুল (কমপক্ষে ২টি পূর্ববর্তী সুইং লো যুক্ত করে টানা উর্ধ্বমুখী লাইন)।',
      buyConditions: [
        'কমপক্ষে দুটি সুইং লো সংযোগকারী একটি উর্ধ্বমুখী ট্রেন্ডলাইন থাকবে।',
        'প্রাইস ৩য় বারের মতো পুলব্যাক করে ট্রেন্ডলাইন স্পর্শ করবে।',
        'ট্রেন্ডলাইনে স্পর্শের পর নিচের দিকে রিজেকশন উইক সহ একটি Green হ্যামার বা বুলিশ ক্যান্ডেল লাইনটির উপরে শক্তভাবে ক্লোজ হতে হবে।',
      ],
      buyEntry: 'ট্রেন্ডলাইনের উপরে Green ক্যান্ডেল ক্লোজ হওয়ার পর।',
      sellConditions: [
        'ডাউনট্রেন্ডে দুটি সুইং হাই সংযোগ করে ডিসেন্ডিং ট্রেন্ডলাইন আঁকুন।',
        'প্রাইস ৩য় বার ট্রেন্ডলাইন স্পর্শ করে উপরের দিকে লম্বা উইক সহ Red ক্যান্ডেল গঠন করবে।',
      ],
      sellEntry: 'ট্রেন্ডলাইনে Red রিজেকশন ক্যান্ডেল ক্লোজ হওয়ার পর।',
      stopLoss: 'ট্রেন্ডলাইন স্পর্শ করা ক্যান্ডেলের সর্বনিম্ন উইক বা লো-এর নিচে।',
      takeProfit: 'পূর্ববর্তী রিসেন্ট সুইং হাই বা ১:৩ রিস্ক-টু-রিওয়ার্ড।',
      chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
      chartGuideDrawing: 'চার্টে দুটি পূর্ববর্তী সুইং লো সংযোগ করে একটি উর্ধ্বমুখী কালো ট্রেন্ডলাইন আঁকুন। প্রাইস ৩য় বারের মতো পুলব্যাক করে ট্রেন্ডলাইন স্পর্শ করবে। ট্রেন্ডলাইন স্পর্শের পর নিচের দিকে রিজেকশন উইক সহ একটি শক্ত Green ক্যান্ডেল আঁকুন। গ্রিন ক্যান্ডেলের ওপরে সবুজ বাই অ্যারো এবং ট্রেন্ডলাইনের নিচে SL চিহ্ন দিন।',
    };
  }

  if (number === 5) { // Trendline Breakout
    return {
      title: banglaTitle,
      englishTitle,
      number,
      module: moduleNameBangla,
      psychology: 'ট্রেন্ডলাইন ভেঙে যাওয়া মানে বায়ারদের দম শেষ এবং সেলাররা আক্রমণাত্মকভাবে বাজারে ঢুকে পড়েছে। ট্রেন্ডলাইন ট্রেডারদের স্টপ-লস ট্রিগার হয়ে বড় রেড ক্যান্ডেলে দ্রুত পতন ঘটে।',
      timeframe: '১ ঘণ্টা (ব্রেক) এবং ১৫ মিনিট (রিটেস্ট)।',
      indicators: 'ট্রেন্ডলাইন টুল ও ভলিউম বার।',
      buyConditions: [
        'ডাউনট্রেন্ড লাইনের উপরে একটি বড় Green ক্যান্ডেল বডি দিয়ে স্পষ্ট ব্রেকআউট হতে হবে।',
        'প্রাইস ব্রোকেন ট্রেন্ডলাইনে রিটেস্ট করতে নেমে এসে স্পর্শ করবে।',
        'রিটেস্টে একটি ছোট Green রিভার্সাল ক্যান্ডেল তৈরি হবে।',
      ],
      buyEntry: 'রিটেস্টে Green ক্যান্ডেল ক্লোজ হওয়ার পর।',
      sellConditions: [
        'আপট্রেন্ড লাইনের নিচে একটি দীর্ঘ বডির শক্তিশালী Red ক্যান্ডেল ক্লোজ হয়ে ব্রেকডাউন হবে।',
        'প্রাইস নিচ থেকে ব্রোকেন ট্রেন্ডলাইন রিটেস্ট করতে যাবে।',
        'ট্রেন্ডলাইনের নিচ থেকে একটি Red বিয়ারিশ ক্যান্ডেল গঠিত হয়ে রিজেকশন নিশ্চিত করবে।',
      ],
      sellEntry: 'রিটেস্টে Red ক্যান্ডেল ক্লোজ হওয়ার পর।',
      stopLoss: 'রিটেস্ট সুইং লো (বায়ের জন্য) বা সুইং হাই (সেলের জন্য) এর বাইরে।',
      takeProfit: 'ট্রেন্ডলাইনের সূচনাকারী মেজর সুইং লেভেল (১:৩ RRR)।',
      chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
      chartGuideDrawing: 'চার্টে উপর থেকে নিচে নামা একটি নিম্নমুখী ট্রেন্ডলাইন আঁকুন। একটি শক্তিশালী দীর্ঘ Green ক্যান্ডেল ট্রেন্ডলাইন ভেদ করে ওপরে ব্রেকআউট ক্লোজ দিয়েছে দেখান। এরপর ব্রোকেন ট্রেন্ডলাইনে রিটেস্ট করে গঠিত ছোট Green ক্যান্ডেলের মাথায় বাই অ্যারো এবং সুইং লো-এর নিচে SL মার্ক করুন।',
    };
  }

  // Generic clean structure for 6-10
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'মার্কেট স্ট্রাকচারের মূল নিয়ম হলো ক্রেতা ও বিক্রেতার ভারসাম্যহীনতা। কি-লেভেলে দুর্বল পক্ষের স্টপ-লস হান্ট করে সবল পক্ষ বড় ক্যান্ডেলে ট্রেন্ড এগিয়ে নিয়ে যায়।',
    timeframe: '১৫ মিনিট (ইন্ট্রাডে) বা ১ ঘণ্টা/৪ ঘণ্টা (সুইং)।',
    indicators: 'জাপানিজ ক্যান্ডেলস্টিক চার্ট ও কি-লেভেল মার্কিং।',
    buyConditions: [
      'প্রাইস পূর্ববর্তী সাপোর্ট বা বায়ারদের ভ্যালু জোনে নেমে আসবে।',
      'ক্যান্ডেলের নিচের দিকে দীর্ঘ রিজেকশন উইক তৈরি হবে যা বায়ারদের চাপ প্রমাণ করে।',
      'একটি স্পষ্ট Green (বুলিশ) ক্যান্ডেল লেভেলের উপরে শক্ত বডি নিয়ে ক্লোজ হতে হবে।',
    ],
    buyEntry: 'Green বুলিশ ক্যান্ডেল সম্পন্ন ও ক্লোজ হওয়ার পর।',
    sellConditions: [
      'প্রাইস রেজিস্ট্যান্স বা সাপ্লাই জোনে উর্ধ্বমুখী হবে।',
      'ক্যান্ডেলের ওপরের দিকে লম্বা উইক সহ দুর্বলতা প্রকাশ পাবে।',
      'একটি সম্পূর্ণ Red (বিয়ারিশ) ক্যান্ডেল তৈরি হয়ে নিচে ক্লোজ হবে।',
    ],
    sellEntry: 'Red বিয়ারিশ ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'রিভার্সাল ক্যান্ডেলের লো (বাই) অথবা হাই (সেল) এর ৩-৫ পিপ বাইরে।',
    takeProfit: 'পরবর্তী কি-লেভেল বা সুইং হাই/লো (ন্যূনতম ১:২.৫ থেকে ১:৩ RRR)।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'চার্টে অনুভূমিক কি-লেভেল বা চ্যানেল বাউন্ডারি আঁকুন। সাপোর্ট স্পর্শ করে লম্বা নিচের রিজেকশন উইক সহ একটি Green ক্যান্ডেল গঠন করুন। গ্রিন ক্যান্ডেলের ওপরে সবুজ বাই অ্যারো এবং ক্যান্ডেল লো-এর নিচে SL ড্যাশড লাইন দিন।',
  };
}

// Module 2: Single Candlestick (11-20)
function getCategory2Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'একক ক্যান্ডেলে ক্যান্ডেলের বডি ও উইক ক্রেতা-বিক্রেতার তাৎক্ষণিক লড়াই প্রকাশ করে। লম্বা উইক প্রমাণ করে একপক্ষ মার্কেট টেনে নিলেও বিপরীত পক্ষের বিপুল কাউন্টার অর্ডারের মুখে পিছু হটতে বাধ্য হয়েছে।',
    timeframe: '১৫ মিনিট বা ১ ঘণ্টা (সবচেয়ে নির্ভুল রিজেকশন দেখার জন্য)।',
    indicators: 'সাপোর্ট ও রেজিস্ট্যান্স জোন সহ ক্যান্ডেলস্টিক চার্ট।',
    buyConditions: [
      'ডাউনট্রেন্ডের শেষে মার্কেট একটি সুস্পষ্ট সাপোর্ট জোনে পৌঁছাবে।',
      'ক্যান্ডেলটির নিচের উইক বডির চেয়ে অন্তত দ্বিগুণ লম্বা হবে এবং ওপরের উইক খুবই ছোট বা থাকবে না।',
      'সাপোর্ট লেভেলের উপরে একটি সুস্পষ্ট Green (বুলিশ) ক্যান্ডেল হিসেবে ক্লোজ সম্পন্ন হতে হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'আপট্রেন্ডের শীর্ষে মার্কেট রেজিস্ট্যান্স লেভেলে অবস্থান করবে।',
      'ক্যান্ডেলের ওপরের উইক বডির দ্বিগুণ দীর্ঘ হবে যা সেলারদের রিজেকশন নির্দেশ করে।',
      'একটি সম্পূর্ণ Red (বিয়ারিশ) ক্যান্ডেল রেজিস্ট্যান্সের নিচে ক্লোজ হতে হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'ক্যান্ডেলের সর্বনিম্ন লো-এর নিচে (বাই) বা সর্বোচ্চ হাই-এর উপরে (সেল)।',
    takeProfit: 'পূর্ববর্তী রিসেন্ট সুইং হাই বা সুইং লো (১:২.৫ RRR)।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'একটি আনুভূমিক নীল সাপোর্ট লাইন আঁকুন। লাইনের ওপর একটি Green হ্যামার বা পিনবার ক্যান্ডেল আঁকুন যার নিচের উইক ক্যান্ডেল বডির দ্বিগুণের বেশি লম্বা। ক্যান্ডেলটির ঠিক ওপরে একটি সবুজ ঊর্ধ্বমুখী বাই অ্যারো (Up Arrow) দিন এবং ক্যান্ডেলের সর্বনিম্ন উইক বিন্দুর নিচে লাল ড্যাশড লাইনে SL মার্ক করুন। বাম পাশে ২-৩টি ছোট রেড ক্যান্ডেল দিয়ে ডাউনট্রেন্ড এবং ডানে গ্রিন ক্যান্ডেল দিয়ে আপট্রেন্ড দেখান।',
  };
}

// Module 3: Multiple Candlestick (21-30)
function getCategory3Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'একাধিক ক্যান্ডেল মার্কেটের পূর্ণাঙ্গ মানসিক রূপান্তর প্রকাশ করে। ১ম ক্যান্ডেলের আধিপত্য ২য় ক্যান্ডেলে থমকে যায় এবং ৩য় বিপরীতমুখী ক্যান্ডেলে ক্ষমতা হস্তান্তরের মাধ্যমে রিভার্সাল নিশ্চিত হয়।',
    timeframe: '১ ঘণ্টা বা ৪ ঘণ্টা।',
    indicators: 'কি-সাপোর্ট ও রেজিস্ট্যান্স লেভেল।',
    buyConditions: [
      '১ম ক্যান্ডেল: একটি দীর্ঘ লাল (Red) ডাউনট্রেন্ড ক্যান্ডেল তৈরি হবে।',
      '২য় ক্যান্ডেল: একটি ছোট বডির ক্যান্ডেল যা সেলিং মোমেন্টাম শেষ হওয়া নির্দেশ করবে।',
      '৩য় ক্যান্ডেল: একটি শক্তিশালী লম্বা সবুজ (Green) ক্যান্ডেল যা ১ম রেড ক্যান্ডেলের ৫০% এর বেশি উপরে ক্লোজ হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      '১ম ক্যান্ডেল: একটি দীর্ঘ সবুজ (Green) আপট্রেন্ড ক্যান্ডেল।',
      '২য় ক্যান্ডেল: শীর্ষে ছোট বডির দোদ্যুল্যমান ক্যান্ডেল।',
      '৩য় ক্যান্ডেল: আক্রমণাত্মক লাল (Red) ক্যান্ডেল যা ১ম ক্যান্ডেলের বডিকে বিয়ারিশভাবে ছাপিয়ে নিচে ক্লোজ হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'পুরো ৩-ক্যান্ডেল প্যাটার্নের সর্বনিম্ন বিন্দুর নিচে (বাই) বা সর্বোচ্চ বিন্দুর উপরে (সেল)।',
    takeProfit: 'পরবর্তী স্ট্রাকচারাল সুইং লেভেল বা ১:৩ RRR।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'পরপর ৩টি ক্যান্ডেল আঁকুন: ১ম টি দীর্ঘ লাল (Red) বিয়ারিশ ক্যান্ডেল, ২য় টি সাপোর্ট লাইনে ছোট বডির দোজি বা স্পিনিং টপ, এবং ৩য় টি শক্তিশালী লম্বা সবুজ (Green) ক্যান্ডেল যা ১ম ক্যান্ডেলের ৫০% এর ওপরে ক্লোজ হয়েছে। ৩য় গ্রিন ক্যান্ডেলের ঠিক ওপরে সবুজ বাই অ্যারো এবং পুরো প্যাটার্নের নিচে লাল ড্যাশড লাইনে SL আঁকুন।',
  };
}

// Module 4: Moving Average (31-40)
function getCategory4Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'মুভিং অ্যাভারেজ প্রতিষ্ঠানের গড় ক্রয়ের ভারসাম্য দেখায়। প্রাইস যখন মুভিং অ্যাভারেজে আসে বা ক্রসওভার ঘটে, তখন বড় ফান্ডগুলোর সিস্টেম্যাটিক অ্যালগো অর্ডার সক্রিয় হয়ে শক্তিশালী মুভ তৈরি করে।',
    timeframe: '১৫ মিনিট (ইন্ট্রাডে) বা ৪ ঘণ্টা/ডেইলি (সুইং)।',
    indicators: 'মুভিং অ্যাভারেজ সেটিংস (যেমন 20 EMA ও 50 EMA বা 200 SMA)।',
    buyConditions: [
      'ফাস্ট মুভিং অ্যাভারেজ লাইন স্লো মুভিং অ্যাভারেজ লাইনের উপরে ক্রস করবে।',
      'প্রাইস পুলব্যাক করে মুভিং অ্যাভারেজের কাছাকাছি আসবে।',
      'মুভিং অ্যাভারেজের ওপর থেকে নিচের উইক সহ একটি পরিষ্কার Green ক্যান্ডেল উপরে ক্লোজ হতে হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'ফাস্ট মুভিং অ্যাভারেজ স্লো মুভিং অ্যাভারেজের নিচে ক্রস করবে।',
      'প্রাইস নিচ থেকে উঠে মুভিং অ্যাভারেজ লাইনে রেজিস্ট্যান্স ফেস করবে।',
      'মুভিং অ্যাভারেজের নিচ থেকে রিজেকশন উইক সহ Red ক্যান্ডেল তৈরি হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'মুভিং অ্যাভারেজ লাইন বা নিকটবর্তী সুইং লো/হাই-এর বাইরে।',
    takeProfit: 'বিপরীত ক্রসওভার বা নির্ধারিত ১:২.৫+ রিস্ক-টু-রিওয়ার্ড।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'চার্টে দুটি মুভিং অ্যাভারেজ লাইন আঁকুন: একটি সবুজ 20 EMA (দ্রুত) এবং একটি নীল 50 EMA (ধীর)। সবুজ লাইনটি নীল লাইনের ওপরে ক্রসওভার করেছে। ক্রসওভারের পর প্রাইস নেমে এসে নীল 50 EMA স্পর্শ করে একটি লম্বা নিচের উইক সহ Green ক্যান্ডেল তৈরি করবে। ক্যান্ডেলের ওপরে সবুজ বাই অ্যারো এবং মুভিং অ্যাভারেজের নিচে লাল লাইনে SL আঁকুন।',
  };
}

// Module 5: Oscillator & Momentum (41-50)
function getCategory5Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'অসিলেটর প্রাইসের বাহ্যিক ট্রেন্ডের আড়ালে মোমেন্টামের ক্লান্তি পরিমাপ করে। প্রাইস নতুন লো বানালেও অসিলেটর উর্ধ্বমুখী হলে সেলারদের শেষ নিঃশ্বাস এবং বায়ারদের অনুপ্রবেশ স্পষ্ট হয়।',
    timeframe: '১৫ মিনিট বা ১ ঘণ্টা।',
    indicators: 'RSI (14) বা MACD ডিফল্ট সেটিংস।',
    buyConditions: [
      'প্রাইস চার্টে রেড ক্যান্ডেলগুলো লোয়ার লো তৈরি করবে কিন্তু RSI বা অসিলেটর হায়ার লো তৈরি করবে (বুলিশ ডাইভারজেন্স)।',
      'অসিলেটর ওভারসোল্ড অঞ্চল (৩০ এর নিচে) থেকে উপরের দিকে বাঁক নেবে।',
      'সাপোর্ট জোনে একটি পরিষ্কার Green ক্যান্ডেল দৃঢ়ভাবে ক্লোজ হতে হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'প্রাইস চার্ট হায়ার হাই বানালেও অসিলেটর লোয়ার হাই তৈরি করবে (বিয়ারিশ ডাইভারজেন্স)।',
      'অসিলেটর ওভারবট জোন (৭০ এর উপরে) থেকে নিচে নামতে শুরু করবে।',
      'রেজিস্ট্যান্সে একটি স্পষ্ট Red ক্যান্ডেল নিচে ক্লোজ হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'ডাইভারজেন্স সুইং ক্যান্ডেলের লো (বাই) বা হাই (সেল) এর সামান্য বাইরে।',
    takeProfit: 'অসিলেটরের বিপরীত চরম সীমানা বা ১:২.৫ RRR।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'উপরের প্রাইস চার্টের নিচে একটি সাব-প্যানেলে RSI ইন্ডিকেটর উইন্ডো আঁকুন। প্রাইস চার্টে ক্যান্ডেলগুলো নিচে নেমে লোয়ার লো (Lower Low) বানাচ্ছে কিন্তু RSI-তে হায়ার লো (Higher Low) তৈরি হচ্ছে—উভয় দিকে ডাইভারজেন্স ট্রেন্ডলাইন টানুন। প্রাইস চার্টে গঠিত Green রিভার্সাল ক্যান্ডেলের মাথায় বাই অ্যারো এবং নিচে SL দেখান।',
  };
}

// Module 6: Volatility & Band (51-60)
function getCategory6Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'সংকোচন সর্বদা সম্প্রসারণের জন্ম দেয়। ব্যান্ডের সংকোচন রিটেল ট্রেডারদের অলস করে দেয়; ঠিক তখনই স্মার্ট মানি আক্রমণাত্মক ভলিউমে ব্রেকআউট ঘটিয়ে বাজারকে বিস্ফোরণের মতো টেনে নেয়।',
    timeframe: '১৫ মিনিট বা ১ ঘণ্টা।',
    indicators: 'Bollinger Bands (20, 2) বা Keltner Channel।',
    buyConditions: [
      'বোলিঙ্গার ব্যান্ডের দুই লাইন কাছাকাছি এসে দীর্ঘক্ষণ সরু বা স্কুইজ অবস্থায় থাকবে।',
      'একটি দীর্ঘ এবং শক্তিশালী Green ক্যান্ডেল আপার ব্যান্ডের বাইরে ফুল বডি সহ ক্লোজ হতে হবে।',
      'ক্যান্ডেলের সাথে ভলিউম বারে লক্ষণীয় বৃদ্ধি থাকতে হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'ব্যান্ড স্কুইজের পর একটি বড় Red ক্যান্ডেল লোয়ার ব্যান্ডের নিচে ক্লোজ হবে।',
      'ডাউনট্রেন্ড মোমেন্টামে অতিরিক্ত সেলিং ভলিউম নিশ্চিত হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'বোলিঙ্গার ব্যান্ডের মিডল লাইন (20 SMA) এর বাইরে।',
    takeProfit: 'ব্যান্ডের গতি স্তিমিত হওয়া পর্যন্ত বা ১:৩ RRR।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'প্রাইসের চারপাশে আপার, মিডল ও লোয়ার বোলিঙ্গার ব্যান্ড আঁকুন। ব্যান্ডটি প্রথমে অত্যন্ত সরু (Squeeze) অবস্থায় দেখান। এরপর একটি বড় দীর্ঘ বডির Green ক্যান্ডেল আপার ব্যান্ডের বাইরে ব্রেকআউট করে ক্লোজ হয়েছে। ব্যান্ডের ব্রেকআউট গ্রিন ক্যান্ডেলের মাথায় সবুজ বাই অ্যারো এবং মিডল ব্যান্ডের নিচে SL মার্ক করুন।',
  };
}

// Module 7: Chart Patterns (61-70)
function getCategory7Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'চার্ট প্যাটার্নের নেকলাইনের ওপারে রিটেল ট্রেডারদের হাজার হাজার স্টপ-লস পুঞ্জীভূত থাকে। নেকলাইন ব্রেক হওয়ার পর ঐ স্টপ-লস ট্রিগার হয়ে ফুয়েল হিসেবে কাজ করে এবং প্রাইসকে দ্রুত টার্গেটে নিয়ে যায়।',
    timeframe: '১ ঘণ্টা বা ৪ ঘণ্টা।',
    indicators: 'হরিজন্টাল নেকলাইন বা ট্রেন্ডলাইন বাউন্ডারি।',
    buyConditions: [
      'একটি সম্পূর্ণ চার্ট প্যাটার্ন (যেমন ডাবল বটম বা ইনভার্স হেড অ্যান্ড শোল্ডারস) গঠিত হবে।',
      'নেকলাইনের উপরে একটি বড় Green ক্যান্ডেল বডি দিয়ে স্পষ্ট ব্রেকআউট হতে হবে।',
      'প্রাইস ছোট রেড ক্যান্ডেল দিয়ে নেকলাইনে পুলব্যাক করে রিটেস্ট বাউন্সে নতুন Green ক্যান্ডেল তৈরি করবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'প্যাটার্নের নেকলাইন ভেঙে বড় Red ক্যান্ডেল নিচে ক্লোজ হবে।',
      'নিচ থেকে নেকলাইন রিটেস্টে Red রিজেকশন ক্যান্ডেল নিশ্চিত হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'ব্রেকআউট নেকলাইনের ঠিক নিচে বা সাম্প্রতিক রিটেস্ট লো/হাই এর বাইরে।',
    takeProfit: 'প্যাটার্নের মোট উচ্চতার সমান দূরত্ব (কমপক্ষে ১:৩ RRR)।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'দুটি সমান তলদেশ বিশিষ্ট ডাবল বটম ("W" প্যাটার্ন) অথবা ইনভার্স হেড অ্যান্ড শোল্ডারস আঁকুন। প্যাটার্নের ওপরে আনুভূমিক নেকলাইন টানুন। একটি বড় Green মারুবোজু ক্যান্ডেল নেকলাইন ব্রেকআউট করেছে এবং পরবর্তী পুলব্যাকে গ্রিন রিটেস্ট ক্যান্ডেল গঠিত হলে তার ওপরে বাই অ্যারো ও প্যাটার্নের গভীরতা সমপরিমাণ উর্ধ্বমুখী TP বক্স আঁকুন।',
  };
}

// Module 8: Trend & Breakout (71-80)
function getCategory8Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'আর্থিক বাজারে সবচেয়ে বেশি লাভ হয় প্রতিষ্ঠিত ট্রেন্ডকে অনুসরণ করে। ফেকআউট ও ফলস মুভ ফিল্টার করে বড় প্রাতিষ্ঠানিক ক্যান্ডেলস্টিক মোমেন্টামের সাথে যাত্রা করাই মূল কৌশল।',
    timeframe: '১৫ মিনিট (এন্ট্রি) এবং ৪ ঘণ্টা (ট্রেন্ড বায়াস)।',
    indicators: 'সাপোর্ট/রেজিস্ট্যান্স ও ট্রেন্ড চ্যানেল।',
    buyConditions: [
      'হায়ার টাইমফ্রেমে ট্রেন্ড স্পষ্টভাবে উর্ধ্বমুখী (Higher Highs & Higher Lows) থাকবে।',
      'কনসলিডেশন রেঞ্জের হাই ব্রেক করে একটি পূর্ণাঙ্গ Green ক্যান্ডেল উপরে ক্লোজ হবে।',
      'পরবর্তী ক্যান্ডেলটি পূর্বের গ্রিন ক্যান্ডেলের হাই ভাঙবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'ডাউনট্রেন্ডে কনসলিডেশন রেঞ্জের তলদেশ ভেঙে বড় Red ক্যান্ডেল নিচে ক্লোজ হবে।',
      'ব্রেকডাউন Red ক্যান্ডেলের লো ব্রেক হলে নিশ্চিত হবেন।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'ব্রেকআউট রেঞ্জের মিডপয়েন্ট বা সাম্প্রতিক সুইং পয়েন্টের বাইরে।',
    takeProfit: 'ট্রেইলিং স্টপ-লসের মাধ্যমে ট্রেন্ড শেষ না হওয়া পর্যন্ত (১:৩+ RRR)।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'একটি অনুভূমিক কনসলিডেশন রেঞ্জের ওপর রেজিস্ট্যান্স ও নিচে সাপোর্ট লাইন টানুন। একটি শক্তিশালী দীর্ঘ Green ক্যান্ডেল রেঞ্জ হাই ব্রেক করে উপরে ক্লোজ হয়েছে। ব্রেকআউট ক্যান্ডেলের হাই-এর ওপরে বাই অ্যারো এবং কনসলিডেশন বক্সের মিডপয়েন্টের নিচে ড্যাশড লাইনে স্টপ-লস আঁকুন।',
  };
}

// Module 9: Multi-Indicator (81-90)
function getCategory9Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'একক ইন্ডিকেটর প্রায়শই মিথ্যা সংকেত দেয়। কিন্তু যখন দীর্ঘমেয়াদী ট্রেন্ড ফিল্টার ও মোমেন্টাম অসিলেটর উভয়ই ক্যান্ডেলের সাথে একমত হয়, তখন হাই-প্রবাবিলিটি ট্রেড নিশ্চিত হয়।',
    timeframe: '১৫ মিনিট বা ১ ঘণ্টা।',
    indicators: '200 EMA (ট্রেন্ড ফিল্টার) + RSI (মোমেন্টাম) + ক্যান্ডেলস্টিক।',
    buyConditions: [
      'প্রাইস অবশ্যই 200 EMA লাইনের উপরে অবস্থান করবে।',
      'RSI লাইন ৫০-এর উপরে উঠে বায়ারদের শক্তি নির্দেশ করবে।',
      '200 EMA-এর উপরে একটি শক্ত বডির Green বুলিশ ক্যান্ডেল ক্লোজ হতে হবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'প্রাইস 200 EMA-এর নিচে থাকবে।',
      'RSI লাইন ৫০-এর নিচে থাকবে।',
      '200 EMA-এর নিচে একটি স্পষ্ট Red বিয়ারিশ ক্যান্ডেল ক্লোজ হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: '200 EMA লাইন বা সাম্প্রতিক সুইং পয়েন্টের সামান্য বাইরে।',
    takeProfit: 'পরবর্তী মেজর কি-লেভেল (১:২.৫ RRR)।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'চার্টে একটি দীর্ঘমেয়াদী নীল 200 EMA লাইন আঁকুন। প্রাইস 200 EMA লাইনের উপরে থাকবে। নিচে RSI উইন্ডোতে মান ৫০-এর উপরে নির্দেশিত হবে। প্রাইস 200 EMA স্পর্শ করে একটি শক্তিশালী Green ক্যান্ডেল তৈরি করলে তার ওপরে বাই অ্যারো ও 200 EMA-এর নিচে SL মার্ক করুন।',
  };
}

// Module 10: Advanced SMC (91-100)
function getCategory10Strategy(outline: StrategyOutline): StrategyBaseContent {
  const { number, banglaTitle, englishTitle, moduleNameBangla } = outline;
  return {
    title: banglaTitle,
    englishTitle,
    number,
    module: moduleNameBangla,
    psychology: 'ব্যাংক ও মার্কেট মেকাররা রিটেলদের স্টপ-লস হান্ট করে তারল্য সংগ্রহ করে। লিকুইডিটি সুইপের লম্বা উইকের পর যখন মার্কেট স্ট্রাকচার শিফট (MSS) ঘটে, তখন আনফিল্ড অর্ডার ব্লকে ট্রেড নেওয়াই স্মার্ট মানি মেথড।',
    timeframe: '১৫ মিনিট (এন্ট্রি) এবং ১ ঘণ্টা/৪ ঘণ্টা (লিকুইডিটি ও অর্ডার ব্লক মার্কিং)।',
    indicators: 'অর্ডার ব্লক জোন, ফেয়ার ভ্যালু গ্যাপ (FVG), ক্যান্ডেলস্টিক উইক।',
    buyConditions: [
      'প্রাইস পূর্ববর্তী সুইং লো-এর নিচে নেমে রিটেল বায়ারদের স্টপ-লস লিকুইডেট করে দ্রুত উপরে উঠে আসবে (লম্বা নিচের সুইপ উইক তৈরি হবে)।',
      'একটি তীব্র বড় Green ক্যান্ডেল দিয়ে আগের সুইং হাই ব্রেক করে মার্কেট স্ট্রাকচার শিফট (MSS) ঘটাবে।',
      'প্রাইস পুনরায় বুলিশ অর্ডার ব্লকে বা FVG-তে রিটেস্ট করতে এসে একটি Green ক্যান্ডেল তৈরি করবে।',
    ],
    buyEntry: 'গ্রিন (Green) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    sellConditions: [
      'প্রাইস পূর্ববর্তী হাই সুইপ করে লম্বা ওপরের উইক তৈরি করে নিচে নেমে আসবে।',
      'বড় আক্রমণাত্মক Red ক্যান্ডেল দিয়ে ডাউনওয়ার্ড MSS কনফার্ম হবে।',
      'বিয়ারিশ অর্ডার ব্লকে রিটেস্টে Red ক্যান্ডেল তৈরি হবে।',
    ],
    sellEntry: 'রেড (Red) ক্যান্ডেল ক্লোজ হওয়ার পর।',
    stopLoss: 'লিকুইডিটি সুইপ উইকের নিচে ২-৫ পিপ বাফার দিয়ে।',
    takeProfit: 'বিপরীত লিকুইডিটি পুল (Equal Highs বা Unmitigated Lows) - ১:৩.৫ থেকে ১:৪+ RRR।',
    chartGuideBackground: 'সাদা ব্যাকগ্রাউন্ডে রেড এবং গ্রিন ক্যান্ডেলস্টিক।',
    chartGuideDrawing: 'পূর্ববর্তী সুইং লো-এর নিচে "Sell-Side Liquidity (SSL)" মার্ক করুন। একটি দ্রুত রেড ক্যান্ডেল সেই লো সুইপ করে লম্বা নিচের উইক ফেলে উপরে ক্লোজ হয়েছে। পরবর্তী বড় Green ক্যান্ডেলে MSS (Market Structure Shift) এবং চার্টে একটি বুলিশ Order Block (OB) ও Fair Value Gap (FVG) আয়তাকার বক্স আঁকুন। বক্সে প্রাইস রিটেস্ট করার সময় গ্রিন ক্যান্ডেলের মাথায় বাই অ্যারো দিন।',
  };
}
