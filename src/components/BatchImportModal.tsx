import React, { useState } from 'react';
import { ListPlus, X, Check, FileText } from 'lucide-react';
import { TradingStrategy } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImportList: (newStrategies: Partial<TradingStrategy>[]) => void;
  currentCount: number;
}

export const BatchImportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onImportList,
  currentCount,
}) => {
  const [textInput, setTextInput] = useState('');
  const [targetModule, setTargetModule] = useState('স্মার্ট মানি কনসেপ্টস ও অর্ডার ফ্লো (SMC)');

  if (!isOpen) return null;

  const sampleList = `১. ব্রেকার ব্লক ও ফেয়ার ভ্যালু গ্যাপ রিভার্সাল (Breaker Block SMC)
২. এশিয়ান সেশন হাই-লো লিকুইডিটি জুডাস সুইং (Judas Swing)
৩. সাপ্লাই অ্যান্ড ডিমান্ড ফ্লিপ জোন (Supply-Demand Flip)
৪. ওয়াইকফ স্প্রিং ও অ্যাকুমুলেশন ফেজ ব্রেকআউট (Wyckoff Spring)
৫. সুইং ফেইলিওর প্যাটার্ন (SFP) লিকুইডিটি ট্র্যাপ`;

  const handleParse = () => {
    if (!textInput.trim()) return;

    const lines = textInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsed: Partial<TradingStrategy>[] = lines.map((line, idx) => {
      // Clean leading numbers (e.g. "1.", "১.", "Strategy 1:")
      const cleanTitle = line.replace(/^([0-9১-৯]+[\.\:\-\)]|\s*কৌশল\s*[0-9১-৯]+\s*[:\-]?|\s*Strategy\s*[0-9]+\s*[:\-]?)\s*/i, '');
      
      return {
        number: currentCount + idx + 1,
        title: cleanTitle || line,
        module: targetModule,
        difficulty: 'Intermediate',
        timeframe: '15m / 1h',
        winRateEstimate: '70%',
        riskReward: '1:3',
        psychologyAndLogic: 'ইনস্টিটিউশনাল অর্ডার ফ্লো ও লিকুইডিটি হ্যান্ডলিং।',
        timeframeAndSetup: 'মাল্টি-টাইমফ্রেম অ্যানালাইসিস (1H/15M)।',
        buyEntryRules: ['১. সেটআপ কনফার্মেশন নিন।', '২. রিটেস্টে বাই এন্ট্রি ওপেন করুন।'],
        sellEntryRules: ['১. স্ট্রাকচার ব্রেক নিশ্চিত করুন।', '২. রিজেকশনে সেল করুন।'],
        riskManagement: {
          stopLoss: 'সুইং পয়েন্টের বাইরে।',
          takeProfit: '১:৩ RRR টার্গেট।',
          rrr: '১:৩',
          riskPerTrade: '১% ঝুঁকি।',
        },
        visualDiagramGuide: {
          chartDescription: `${cleanTitle} এর চার্ট বর্ণনা ও ড্রয়িং গাইড।`,
          drawingSteps: ['Rectangle Tool দিয়ে জোন আঁকুন', 'Entry এবং SL লেবেল করুন'],
          canvaPrompt: `TradingView chart illustration of ${cleanTitle}`,
          setupType: 'bullish',
        },
        isCustom: true,
      };
    });

    onImportList(parsed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <ListPlus className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                কৌশল তালিকা পেস্ট করুন (Batch Paste)
              </h2>
              <p className="text-xs text-slate-400">
                আপনার স্ট্র্যাটেজি তালিকা বা মডিউল পেস্ট করুন
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

        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>প্রতি লাইনে একটি করে স্ট্র্যাটেজির নাম লিখুন বা পেস্ট করুন:</span>
            <button
              type="button"
              onClick={() => setTextInput(sampleList)}
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              <span>নমুনা লোড করুন</span>
            </button>
          </div>

          <textarea
            rows={8}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={`১. ব্রেকার ব্লক ও ফেয়ার ভ্যালু গ্যাপ রিভার্সাল\n২. এশিয়ান সেশন হাই-লো লিকুইডিটি জুডাস সুইং\n৩. সাপ্লাই অ্যান্ড ডিমান্ড ফ্লিপ জোন...`}
            className="w-full font-mono text-xs p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:border-sky-500"
          />

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400">
              শনাক্তকৃত লাইন: <span className="text-emerald-400 font-bold">{textInput.split('\n').filter(l => l.trim()).length}</span> টি
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleParse}
                disabled={!textInput.trim()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-40 transition shadow-lg shadow-sky-950"
              >
                <Check className="h-3.5 w-3.5" />
                <span>ই-বুকে যুক্ত করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
