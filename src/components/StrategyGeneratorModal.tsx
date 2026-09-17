import React, { useState } from 'react';
import { EBOOK_MODULES } from '../data/initialStrategies';
import { TradingStrategy } from '../types';
import { Sparkles, X, Loader2, BookOpen, AlertCircle, PlusCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStrategyGenerated: (strategy: TradingStrategy) => void;
  nextStrategyNumber: number;
}

const STRATEGY_IDEAS = [
  { title: 'সাপোর্ট ও রেজিস্ট্যান্স রিভার্সাল স্ট্র্যাটেজি', module: '১. বেসিক প্রাইস অ্যাকশন স্ট্র্যাটেজি (১-১০)' },
  { title: 'হ্যামার রিভার্সাল স্ট্র্যাটেজি', module: '২. সিঙ্গেল ক্যান্ডেলস্টিক প্যাটার্ন স্ট্র্যাটেজি (১১-২০)' },
  { title: 'মর্নিং স্টার ট্রিপল ক্যান্ডেল রিভার্সাল', module: '৩. মাল্টিপল ক্যান্ডেলস্টিক প্যাটার্ন স্ট্র্যাটেজি (২১-৩০)' },
  { title: 'গোল্ডেন ক্রস স্ট্র্যাটেজি (SMA 50 ও SMA 200)', module: '৪. মুভিং অ্যাভারেজ (MA) স্ট্র্যাটেজি (৩১-৪০)' },
  { title: 'RSI ওভারবট ও ওভারসোল্ড রিভার্সাল (৭০/৩০)', module: '৫. অসিলেটর ও মোমেন্টাম স্ট্র্যাটেজি (৪১-৫০)' },
  { title: 'বলিঙ্গার ব্যান্ডস স্কুইজ ব্রেকআউট', module: '৬. ভলাটিলিটি ও ব্যান্ড স্ট্র্যাটেজি (৫১-৬০)' },
  { title: 'ডাবল বটম (W-প্যাটার্ন) বুলিশ রিভার্সাল', module: '৭. চার্ট প্যাটার্ন স্ট্র্যাটেজি (৬১-৭০)' },
  { title: 'ফলস ব্রেকআউট (ফেকআউট) ট্র্যাপ স্ট্র্যাটেজি', module: '৮. ট্রেন্ড ও ব্রেকআউট স্ট্র্যাটেজি (৭১-৮০)' },
  { title: 'RSI ও MACD ডুয়াল কনফার্মেশন ক্রসওভার', module: '৯. মাল্টি-ইন্ডিকেটর কম্বিনেশন স্ট্র্যাটেজি (৮১-৯০)' },
  { title: 'অর্ডার ব্লক ও ফেয়ার ভ্যালু গ্যাপ (SMC)', module: '১০. অ্যাডভান্সড ও স্পেশাল কনসেপ্টস (৯১-১০০)' },
];

export const StrategyGeneratorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onStrategyGenerated,
  nextStrategyNumber,
}) => {
  const [strategyTitle, setStrategyTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');
  const [selectedModule, setSelectedModule] = useState(EBOOK_MODULES[0].nameBangla);
  const [customNotes, setCustomNotes] = useState('');
  const [timeframe, setTimeframe] = useState('15m / 1h');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectIdea = (idea: { title: string; module: string }) => {
    setStrategyTitle(idea.title);
    setSelectedModule(idea.module);
  };

  const parseGeneratedBengaliContent = (text: string, title: string, engTitle: string, mod: string): TradingStrategy => {
    // Helper to extract sections from Gemini output if it matches markdown headings
    // Match either bullet headers (• মূল ভাবনা) or numbered headers (১. কৌশলের মূল ভাবনা)
    const section1Match = text.match(/(?:•\s*মূল ভাবনা|১\.\s*কৌশলের মূল ভাবনা)[\s\S]*?(?=(?:•\s*চার্ট সেটআপ|২\.|$))/i);
    const section2Match = text.match(/(?:•\s*চার্ট সেটআপ|২\.\s*টাইমফ্রেম ও চার্ট সেটআপ)[\s\S]*?(?=(?:•\s*বাই রুলস|৩\.|$))/i);
    const section3Match = text.match(/(?:•\s*বাই রুলস|৩\.\s*বাই এন্ট্রি নিয়মাবলী)[\s\S]*?(?=(?:•\s*সেল রুলস|৪\.|$))/i);
    const section4Match = text.match(/(?:•\s*সেল রুলস|৪\.\s*সেল এন্ট্রি নিয়মাবলী)[\s\S]*?(?=(?:•\s*স্টপ-লস|৫\.|$))/i);
    const section5Match = text.match(/(?:•\s*স্টপ-লস ও টার্গেট|৫\.\s*ঝুঁকি ব্যবস্থাপনা)[\s\S]*?(?=(?:•\s*চার্ট গাইড|৬\.|$))/i);
    const section6Match = text.match(/(?:•\s*চার্ট গাইড|৬\.\s*ভিজ্যুয়াল ডায়াগ্রাম)[\s\S]*?$/i);

    const cleanSection = (match: RegExpMatchArray | null, fallback: string) => {
      if (!match) return fallback;
      return match[0].replace(/^(?:•\s*[^:\n]+:?|#*\s*[১-৬]\.[^\n]*)\s*/i, '').trim();
    };

    const p1 = cleanSection(section1Match, 'মার্কেটের মূল লজিক হলো বায়ার ও সেলারদের তারল্য ভারসাম্যহীনতা চিহ্নিত করা।');
    const p2 = cleanSection(section2Match, `টাইমফ্রেম: ${timeframe}। মূল চার্ট ইন্ডিকেটর ও প্রাইস অ্যাকশন লেভেল।`);
    const p3Raw = cleanSection(section3Match, '১. ট্রেন্ড কনফার্ম করুন।\n২. লেভেলে রিজেকশন দেখুন।\n৩. ক্যান্ডেল ক্লোজে BUY করুন।');
    const p4Raw = cleanSection(section4Match, '১. ডাউনট্রেন্ড নিশ্চিত করুন।\n২. রেজিস্ট্যান্সে রিজেকশন দেখুন।\n৩. ক্যান্ডেল ক্লোজে SELL করুন।');
    const p5Raw = cleanSection(section5Match, 'স্টপ-লস: সুইং লেভেলের বাইরে। টার্গেট: ১:৩ RRR।');
    const p6Raw = cleanSection(section6Match, 'TradingView-তে ক্যান্ডেলস্টিক রিজেকশন ও এন্ট্রি-এসএল লেভেল চিহ্নিত করুন।');

    const buyRules = p3Raw.split('\n').filter((l) => l.trim().length > 0);
    const sellRules = p4Raw.split('\n').filter((l) => l.trim().length > 0);

    return {
      id: `strat-${Date.now()}`,
      number: nextStrategyNumber,
      title: title,
      englishTitle: engTitle || undefined,
      module: mod,
      difficulty,
      timeframe,
      winRateEstimate: '68% - 75%',
      riskReward: '1:3+',
      psychologyAndLogic: p1,
      timeframeAndSetup: p2,
      buyEntryRules: buyRules.length > 0 ? buyRules : ['১. ট্রেন্ডের অনুকূলে পুলব্যাকের অপেক্ষা করুন।', '২. ক্যান্ডেলস্টিক রিজেকশনে এন্ট্রি নিন।'],
      sellEntryRules: sellRules.length > 0 ? sellRules : ['১. রেজিস্ট্যান্স জোন থেকে বিয়ারিশ মুভ নিশ্চিত করুন।', '২. ক্যান্ডেল ক্লোজে শর্ট করুন।'],
      riskManagement: {
        stopLoss: 'সুইং হাই বা লো এর সামান্য বাইরে বাফার রেখে।',
        takeProfit: 'পরবর্তী লিকুইডিটি পুল বা ১:৩ রিস্ক-টু-রিওয়ার্ড।',
        rrr: '১:৩ (Risk:Reward)',
        riskPerTrade: 'সর্বোচ্চ ১% একাউন্ট রিস্ক।',
      },
      visualDiagramGuide: {
        chartDescription: p6Raw,
        drawingSteps: [
          'টুলস: Rectangle (Zone), Trendline/Path Tool, Text Tool, Long/Short Position Tool।',
          'কালার: Green (#10B981) for Buy & TP, Red (#EF4444) for SL & Sell, Yellow (#F59E0B) for Structure।',
        ],
        canvaPrompt: `High quality TradingView chart diagram illustrating ${title}. Clear candlestick formation, entry arrow, stop loss dashed line, profit target zone.`,
        setupType: title.toLowerCase().includes('sell') || title.toLowerCase().includes('বিয়ারিশ') ? 'bearish' : 'bullish',
      },
      fullMarkdownContent: text,
      isCustom: true,
    };
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!strategyTitle.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategyTitle: strategyTitle.trim(),
          strategyNumber: nextStrategyNumber,
          moduleName: selectedModule,
          customNotes: `${customNotes} | Difficulty: ${difficulty} | Preferred Timeframe: ${timeframe}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate strategy');
      }

      const generatedStrategy = parseGeneratedBengaliContent(
        data.content,
        strategyTitle.trim(),
        englishTitle.trim(),
        selectedModule
      );

      onStrategyGenerated(generatedStrategy);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while generating strategy.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                নতুন ট্রেডিং কৌশল লিখুন (AI Co-Author)
              </h2>
              <p className="text-xs text-slate-400">
                স্ট্র্যাটেজি #{nextStrategyNumber} • নির্ধারিত ৬-দফা ফ্রেমওয়ার্কে স্বয়ংক্রিয় বাংলা কন্টেন্ট
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-start gap-3 text-rose-300 text-xs">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold block">উৎপাদনে সমস্যা হয়েছে:</span>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Quick Suggestions */}
        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            ১০০টি স্ট্র্যাটেজি লাইব্রেরি থেকে দ্রুত বেছে নিন:
          </span>
          <div className="flex flex-wrap gap-2">
            {STRATEGY_IDEAS.map((idea, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectIdea(idea)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-950/40 hover:text-emerald-300 hover:border-emerald-700/50 border border-slate-700 text-slate-300 transition text-left"
              >
                + {idea.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              কৌশলের নাম (বাংলায়) *
            </label>
            <input
              type="text"
              required
              value={strategyTitle}
              onChange={(e) => setStrategyTitle(e.target.value)}
              placeholder="যেমন: ব্রেকার ব্লক ও ফেয়ার ভ্যালু গ্যাপ রিভার্সাল"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                ইংরেজি রেফারেন্স নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={englishTitle}
                onChange={(e) => setEnglishTitle(e.target.value)}
                placeholder="e.g. Breaker Block & FVG Reversal"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 text-sm text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                মডিউল / ক্যাটাগরি
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-emerald-500"
              >
                {EBOOK_MODULES.map((m) => (
                  <option key={m.id} value={m.nameBangla}>
                    {m.number}. {m.nameBangla}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                টাইমফ্রেম
              </label>
              <input
                type="text"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                placeholder="15m / 1h / 4h"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                কঠিনতার মাত্রা (Difficulty)
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white"
              >
                <option value="Beginner">Beginner (সহজ)</option>
                <option value="Intermediate">Intermediate (মধ্যম)</option>
                <option value="Advanced">Advanced (উচ্চতর)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              অতিরিক্ত কাস্টম নোট বা বিশেষ পয়েন্ট (ঐচ্ছিক)
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="যেমন: লন্ডন সেশনের জন্য সেরা, অথবা আরএসআই ডাইভারজেন্স কনফার্মেশন সহ লিখতে হবে..."
              className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 text-sm text-white placeholder-slate-500"
            />
          </div>

          {/* Strict 6-point reminder */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-[11px] text-emerald-300 space-y-1">
            <span className="font-semibold block text-emerald-400">
              ✓ কো-অথর সিস্টেম নিশ্চিত করে এই ৬টি পয়েন্ট স্বয়ংক্রিয়ভাবে তৈরি হবে:
            </span>
            <p className="text-slate-400">
              ১. কৌশলের মূল ভাবনা • ২. টাইমফ্রেম ও চার্ট সেটআপ • ৩. বাই এন্ট্রি নিয়মাবলী • ৪. সেল এন্ট্রি নিয়মাবলী • ৫. ঝুঁকি ব্যবস্থাপনা ও টার্গেট • ৬. ভিজ্যুয়াল ডায়াগ্রাম গাইড (Canva/TradingView)
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isLoading || !strategyTitle.trim()}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:pointer-events-none transition shadow-lg shadow-emerald-950"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>কৌশলটি রচিত হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>কৌশল তৈরি করুন (AI Co-Author)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
