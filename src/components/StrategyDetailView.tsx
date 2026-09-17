import React, { useState } from 'react';
import { TradingStrategy } from '../types';
import { USER_100_STRATEGIES_OUTLINE } from '../data/user100StrategiesOutline';
import {
  getPaperbackStrategyContent,
  formatStrategyAsMarkdown,
  CleanPaperbackStrategy,
} from '../data/cleanPaperbackFormatter';
import { getStrategySvgConfig } from '../data/visualChartDiagrams';
import { VisualCandlestickChart } from './VisualCandlestickChart';
import { copyToClipboard } from '../utils/clipboard';
import {
  Copy,
  Check,
  Printer,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  strategy: TradingStrategy;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  totalStrategies: number;
  isFavorite?: boolean;
  isCompleted?: boolean;
  onToggleFavorite?: (strategyNumber: number) => void;
  onToggleCompleted?: (strategyNumber: number) => void;
}

export const StrategyDetailView: React.FC<Props> = ({
  strategy,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  totalStrategies,
  isFavorite = false,
  isCompleted = false,
  onToggleFavorite,
  onToggleCompleted,
}) => {
  const [copied, setCopied] = useState(false);

  // Match the outline to get the exact paperback book format
  const outline = USER_100_STRATEGIES_OUTLINE.find((o) => o.number === strategy.number) || {
    number: strategy.number,
    banglaTitle: strategy.title,
    englishTitle: strategy.englishTitle || '',
    moduleKey: 'price-action',
    moduleNameBangla: strategy.module,
    categoryNumber: Math.ceil(strategy.number / 10),
    defaultDifficulty: strategy.difficulty,
    defaultTimeframe: strategy.timeframe,
    setupType: 'bullish' as const,
  };

  const bookData: CleanPaperbackStrategy = getPaperbackStrategyContent(outline);
  const svgConfig = getStrategySvgConfig(outline);

  // Exact markdown format matching the e-book specification
  const getPlainText = () => {
    return formatStrategyAsMarkdown(bookData);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getPlainText());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-16 px-3 sm:px-6 font-serif">
      {/* Paperback Book Page Container - Clean White Background */}
      <article className="bg-white border border-slate-200 rounded-sm p-6 sm:p-12 shadow-sm text-slate-900 leading-relaxed">
        
        {/* Top Book Header Toolbar */}
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-200 text-xs font-sans text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">ট্রেডিং মাস্টার ই-বুক</span>
            <span className="mx-2">•</span>
            <span>কৌশল {bookData.number} / {totalStrategies}</span>
            <span className="mx-2">•</span>
            <span className="text-slate-600">{bookData.module}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => onToggleFavorite?.(bookData.number)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans rounded border transition ${
                isFavorite
                  ? 'bg-amber-50 text-amber-800 border-amber-300 font-medium'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title={isFavorite ? 'প্রিয় তালিকা থেকে সরান' : 'প্রিয় তালিকায় যোগ করুন'}
            >
              <Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-500'}`} />
              <span>{isFavorite ? 'প্রিয় তালিকায় সংরক্ষিত' : 'প্রিয়'}</span>
            </button>

            <button
              onClick={() => onToggleCompleted?.(bookData.number)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans rounded border transition ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title={isCompleted ? 'শেখা হয়নি চিহ্নিত করুন' : 'সম্পন্ন / আয়ত্ত করা হয়েছে চিহ্নিত করুন'}
            >
              <CheckCircle2 className={`h-3.5 w-3.5 ${isCompleted ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>{isCompleted ? 'আয়ত্ত করা হয়েছে' : 'সম্পন্ন'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
              title="কপি করুন"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition"
              title="প্রিন্ট করুন"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* CHAPTER HEADER Banner (Published E-Book Style) */}
        <div className="mt-5 mb-4 p-3 bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm tracking-wider uppercase rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm border-l-4 border-amber-400">
          <span className="font-semibold text-slate-200">CHAPTER HEADER: {bookData.module}</span>
          <span className="text-amber-400 font-bold bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
            STRATEGY NO. {bookData.number}
          </span>
        </div>

        {/* Strategy Title - H1 */}
        <header className="pb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
            # {bookData.title}
          </h1>
          {bookData.englishTitle && (
            <p className="text-sm font-sans font-medium text-slate-500 mt-1">
              ({bookData.englishTitle})
            </p>
          )}
        </header>

        {/* > 📘 চ্যাপ্টার সারসংক্ষেপ */}
        <div className="my-4 bg-sky-50/70 border-l-4 border-sky-600 rounded-r-sm p-4 text-slate-800 text-sm sm:text-base leading-relaxed">
          <p className="font-bold text-sky-950 font-sans flex items-center gap-1.5 mb-1">
            <span>📘 চ্যাপ্টার সারসংক্ষেপ:</span>
          </p>
          <p className="text-slate-800 italic pl-1">
            {bookData.chapterSummary}
          </p>
        </div>

        <hr className="border-slate-200 my-6" />

        {/* Clean Paperback Body Following Exact User Template */}
        <div className="space-y-7 text-[15px] sm:text-base text-slate-800">
          
          {/* ## 📌 ১. মার্কেট সাইকোলজি ও মেকানিক্স (Psychology & Logic) */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans mb-2.5 flex items-center gap-2">
              <span>📌 ১. মার্কেট সাইকোলজি ও মেকানিক্স (Psychology & Logic)</span>
            </h2>
            <p className="pl-3 sm:pl-4 text-slate-800 leading-relaxed text-sm sm:text-[15px]">
              {bookData.psychology}
            </p>
          </section>

          <hr className="border-slate-200 my-6" />

          {/* ## ⚙️ ২. চার্ট সেটআপ ও প্যারামিটার (Chart Setup) */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans mb-3 flex items-center gap-2">
              <span>⚙️ ২. চার্ট সেটআপ ও প্যারামিটার (Chart Setup)</span>
            </h2>
            <div className="overflow-x-auto rounded-sm border border-slate-200 shadow-xs">
              <table className="w-full text-left text-sm font-sans border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                    <th className="py-2.5 px-4 font-bold w-1/3 border-r border-slate-200">প্যারামিটার (Parameter)</th>
                    <th className="py-2.5 px-4 font-bold">স্পেসিফিকেশন (Specification)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-900 border-r border-slate-200">টাইমফ্রেম</td>
                    <td className="py-2.5 px-4 text-slate-800">{bookData.timeframe}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-900 border-r border-slate-200">ক্যান্ডেলস্টিক প্রকার</td>
                    <td className="py-2.5 px-4 text-slate-800">{bookData.candleType || 'রেড (বিয়ারিশ) এবং গ্রিন (বুলিশ)'}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-900 border-r border-slate-200">ইন্ডিকেটর/লেভেল</td>
                    <td className="py-2.5 px-4 text-slate-800">{bookData.indicators}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-200 my-6" />

          {/* ## 🎯 ৩. ট্রেড এক্সিকিউশন রুলস (Execution Rules) */}
          <section className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans mb-3 flex items-center gap-2">
              <span>🎯 ৩. ট্রেড এক্সিকিউশন রুলস (Execution Rules)</span>
            </h2>

            {/* 🟢 বাই ট্রেড রুলস (Bullish Setup) */}
            <div className="bg-emerald-50/40 border border-emerald-200 rounded-sm p-4">
              <h3 className="text-sm sm:text-base font-bold text-emerald-950 font-sans mb-2.5 flex items-center gap-1.5">
                <span>🟢 বাই ট্রেড রুলস (Bullish Setup)</span>
              </h3>
              <ol className="space-y-2 pl-3 sm:pl-4 text-slate-800 text-sm sm:text-[15px]">
                {bookData.buyConditions.map((condition, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="font-semibold text-slate-900">{idx + 1}. কন্ডিশন {idx + 1}:</strong> {condition}
                  </li>
                ))}
                <li className="leading-relaxed pt-1">
                  <strong className="font-semibold text-emerald-900">{bookData.buyConditions.length + 1}. এন্ট্রি পয়েন্ট:</strong> {bookData.buyEntry}
                </li>
              </ol>
            </div>

            {/* 🔴 সেল ট্রেড রুলস (Bearish Setup) */}
            <div className="bg-rose-50/40 border border-rose-200 rounded-sm p-4">
              <h3 className="text-sm sm:text-base font-bold text-rose-950 font-sans mb-2.5 flex items-center gap-1.5">
                <span>🔴 সেল ট্রেড রুলস (Bearish Setup)</span>
              </h3>
              <ol className="space-y-2 pl-3 sm:pl-4 text-slate-800 text-sm sm:text-[15px]">
                {bookData.sellConditions.map((condition, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="font-semibold text-slate-900">{idx + 1}. কন্ডিশন {idx + 1}:</strong> {condition}
                  </li>
                ))}
                <li className="leading-relaxed pt-1">
                  <strong className="font-semibold text-rose-900">{bookData.sellConditions.length + 1}. এন্ট্রি পয়েন্ট:</strong> {bookData.sellEntry}
                </li>
              </ol>
            </div>
          </section>

          <hr className="border-slate-200 my-6" />

          {/* ## 🛡️ ৪. রিস্ক ম্যানেজমেন্ট (SL, TP & Risk) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans mb-3 flex items-center gap-2">
              <span>🛡️ ৪. রিস্ক ম্যানেজমেন্ট (SL, TP & Risk)</span>
            </h2>

            <ul className="space-y-2 pl-3 sm:pl-4 text-slate-800 text-sm sm:text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-base">🛑</span>
                <div>
                  <strong className="font-semibold text-rose-900">স্টপ-লস (SL):</strong> {bookData.stopLoss}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">🎯</span>
                <div>
                  <strong className="font-semibold text-emerald-900">টেক-প্রফিট (TP):</strong> {bookData.takeProfit}
                </div>
              </li>
            </ul>

            {/* 💡 প্রো-টিপস (Trader's Pro-Tip) */}
            <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-sm p-4 my-3 text-slate-800 text-sm sm:text-[15px] leading-relaxed">
              <p className="font-bold text-amber-950 font-sans flex items-center gap-1.5 mb-1">
                <span>💡 প্রো-টিপস (Trader's Pro-Tip):</span>
              </p>
              <p className="text-amber-950/90 pl-1">{bookData.proTip}</p>
            </div>

            {/* ⚠️ কখন ট্রেড এড়িয়ে চলবেন (Warning Trap) */}
            <div className="bg-rose-50/70 border-l-4 border-rose-500 rounded-r-sm p-4 my-3 text-slate-800 text-sm sm:text-[15px] leading-relaxed">
              <p className="font-bold text-rose-950 font-sans flex items-center gap-1.5 mb-1">
                <span>⚠️ কখন ট্রেড এড়িয়ে চলবেন (Warning Trap):</span>
              </p>
              <p className="text-rose-950/90 pl-1">{bookData.warningTrap}</p>
            </div>
          </section>

          <hr className="border-slate-200 my-6" />

          {/* ## 📊 ৫. ভিজ্যুয়াল ক্যান্ডেলস্টিক চার্ট (Mermaid Visual Chart) */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans mb-3 flex items-center gap-2">
              <span>📊 ৫. ভিজ্যুয়াল ক্যান্ডেলস্টিক চার্ট (Mermaid Visual Chart)</span>
            </h2>
            <VisualCandlestickChart config={svgConfig} mermaidCode={bookData.mermaidChart} />
          </section>

        </div>

        {/* Minimal Bottom Page Navigation */}
        <footer className="pt-6 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-600">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition w-full sm:w-auto justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{bookData.number === 1 ? 'Chapter 0 (বেসিকস)' : 'পূর্ববর্তী কৌশল'}</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-500">
              পৃষ্ঠা {bookData.number} / {totalStrategies}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                আয়ত্ত করা হয়েছে
              </span>
            )}
            {isFavorite && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                প্রিয়
              </span>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition w-full sm:w-auto justify-center"
          >
            <span>পরবর্তী কৌশল</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </footer>

      </article>
    </div>
  );
};

