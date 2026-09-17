import React, { useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  ChevronDown,
  Info
} from 'lucide-react';

interface Props {
  totalStrategies: number;
  onOpenGenerator: () => void;
  onOpenBatchImport: () => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<Props> = ({
  totalStrategies,
  onOpenGenerator,
  onOpenBatchImport,
  onOpenExport,
}) => {
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);

  return (
    <>
      <header className="h-[65px] bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base md:text-lg text-white tracking-tight flex items-center gap-2">
                <span>Trading Master E-Book</span>
                <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  ১০০টি স্ট্র্যাটেজি
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              প্রাইস অ্যাকশন ও টেকনিক্যাল অ্যানালাইসিস কো-অথর স্টুডিও
            </p>
          </div>
        </div>

        {/* Confirmation Badge & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowFrameworkModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 text-xs hover:bg-emerald-900/40 transition"
            title="৬-দফা কো-অথর সিস্টেমের বিবরণ দেখুন"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium hidden md:inline">সিস্টেম কনফার্মড:</span>
            <span className="font-semibold text-white">৬-দফা লেআউট</span>
            <Info className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">নতুন স্ট্র্যাটেজি লিখুন</span>
            <span className="sm:hidden">+স্ট্র্যাটেজি</span>
          </button>
        </div>
      </header>

      {/* Framework Specs Modal */}
      {showFrameworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl p-6 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-bold text-white text-base">
                    কো-অথর সিস্টেমের নিশ্চিতকৃত ৬-দফা কাঠামো
                  </h3>
                  <p className="text-xs text-slate-400">
                    প্রতিটি স্ট্র্যাটেজি এই নির্ধারিত ক্রম ও গভীরতায় বাংলায় রচিত হচ্ছে
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFrameworkModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1 text-sm rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-purple-400 block mb-1">
                  ১. কৌশলের মূল ভাবনা (Psychology & Logic)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  মার্কেটে ক্রেতা/বিক্রেতার সাইকোলজি, প্রাতিষ্ঠানিক লিকুইডিটি পুল এবং কেন এই সেটআপটি কাজ করে তার বিস্তারিত বিশ্লেষণ।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-sky-400 block mb-1">
                  ২. টাইমফ্রেম ও চার্ট সেটআপ (Timeframe & Setup)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  স্ক্যাল্পিং, ইন্ট্রাডে ও সুইং এর জন্য আদর্শ টাইমফ্রেম এবং ক্যান্ডেলস্টিক/ইন্ডিকেটরের সুনির্দিষ্ট প্যারামিটার।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">
                  ৩. বাই এন্ট্রি নিয়মাবলী (Buy Entry Rules)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  LONG পজিশন ওপেন করার প্রতিটি সুনির্দিষ্ট ধাপ (১, ২, ৩, ৪...) ও কনফার্মেশন ক্যান্ডেলস্টিক শর্ত।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-rose-400 block mb-1">
                  ৪. সেল এন্ট্রি নিয়মাবলী (Sell Entry Rules)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  SHORT পজিশন ওপেন করার প্রতিটি সুনির্দিষ্ট ধাপ (১, ২, ৩, ৪...) ও বিয়ারিশ রিজেকশন কনফার্মেশন।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">
                  ৫. ঝুঁকি ব্যবস্থাপনা ও টার্গেট (SL, TP & Risk Management)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Stop-Loss ও Take-Profit এর সুনির্দিষ্ট অবস্থান, ন্যূনতম ১:৩ RRR এবং অ্যাকাউন্ট ক্যাপিটালের ১-১.৫% রিস্ক রুল।
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-teal-400 block mb-1">
                  ৬. ভিজ্যুয়াল ডায়াগ্রাম গাইড (Visual Diagram & Chart Description)
                </span>
                <p className="text-slate-300 leading-relaxed">
                  TradingView বা Canva-তে ড্র করার জন্য লাইন, জোন, তীরচিহ্ন, ক্যান্ডেল উইক ও রঙের বিস্তারিত আর্কিটেকচার।
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowFrameworkModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
              >
                ঠিক আছে, বুঝতে পেরেছি
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
