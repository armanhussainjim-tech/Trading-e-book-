import React, { useState } from 'react';
import { TradingStrategy } from '../types';
import { USER_100_STRATEGIES_OUTLINE } from '../data/user100StrategiesOutline';
import { getPaperbackStrategyContent, formatStrategyAsMarkdown } from '../data/cleanPaperbackFormatter';
import { CHAPTER_0_DATA } from '../data/chapter0';
import { X, Download, Copy, Check, BookOpen } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  strategies: TradingStrategy[];
}

export const EbookExportModal: React.FC<Props> = ({ isOpen, onClose, strategies }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Clean paperback plain text generation using the exact user-specified layout
  const generatePaperbackBookMarkdown = () => {
    let book = `# Trading Master E-Book: ১০০টি প্রাতিষ্ঠানিক ট্রেডিং স্ট্র্যাটেজি\n\n`;
    
    // Add Chapter 0: Trading Basics & Candlesticks
    book += `\n---\n\n` + CHAPTER_0_DATA.markdown + `\n`;

    strategies.forEach((s) => {
      const outline = USER_100_STRATEGIES_OUTLINE.find((o) => o.number === s.number) || {
        number: s.number,
        banglaTitle: s.title,
        englishTitle: s.englishTitle || '',
        moduleKey: 'price-action',
        moduleNameBangla: s.module,
        categoryNumber: Math.ceil(s.number / 10),
        defaultDifficulty: s.difficulty,
        defaultTimeframe: s.timeframe,
        setupType: 'bullish' as const,
      };
      const p = getPaperbackStrategyContent(outline);
      book += `\n---\n\n` + formatStrategyAsMarkdown(p) + `\n`;
    });

    return book;
  };

  const handleCopyAll = async () => {
    const success = await copyToClipboard(generatePaperbackBookMarkdown());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    const content = generatePaperbackBookMarkdown();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Trading_Master_EBook_100_Strategies.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div className="bg-white border border-slate-300 rounded-lg w-full max-w-2xl shadow-xl p-6 text-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded bg-slate-100 text-slate-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                মুদ্রিত বই ফরম্যাটে সম্পূর্ণ ই-বুক কপি ({strategies.length} টি কৌশল)
              </h2>
              <p className="text-xs text-slate-500">
                হোয়াইট ব্যাকগ্রাউন্ড ও জাপানিজ ক্যান্ডেলস্টিক রুলস যুক্ত পরিচ্ছন্ন ফরম্যাট
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-600">
            সম্পূর্ণ বইটি ক্যান্ডেলস্টিক (Green / Red Candle) রুলস ও পেপারব্যাক বই লেআউটে সাজানো হয়েছে:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-xs text-slate-700 max-h-60 overflow-y-auto whitespace-pre-line leading-relaxed">
            {generatePaperbackBookMarkdown().slice(0, 1500)}...
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              কৌশল সংখ্যা: <strong className="text-slate-800">{strategies.length}</strong>
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded bg-slate-800 hover:bg-slate-900 text-white transition shadow-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>বই ডাউনলোড (.txt)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
