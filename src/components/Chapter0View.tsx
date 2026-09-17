import React, { useState } from 'react';
import { CHAPTER_0_DATA } from '../data/chapter0';
import { copyToClipboard } from '../utils/clipboard';
import {
  Copy,
  Check,
  Printer,
  ChevronRight,
  TrendingUp,
  BarChart2,
  Activity,
  Layers,
} from 'lucide-react';

interface Props {
  onGoToFirstStrategy: () => void;
}

export const Chapter0View: React.FC<Props> = ({ onGoToFirstStrategy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(CHAPTER_0_DATA.markdown);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <article className="bg-white border border-slate-200 rounded-sm shadow-xs p-5 sm:p-8 md:p-10 leading-relaxed">
        {/* Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium border border-amber-200">
              প্রারম্ভিক অধ্যায়
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline font-mono">Book Introduction</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              title="সম্পূর্ণ অধ্যায় কপি করুন"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>কপি টেক্সট</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
              title="প্রিন্ট প্রিভিউ"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">প্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* Chapter 0 Title - H1 */}
        <header className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-normal">
            # {CHAPTER_0_DATA.title}
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            ({CHAPTER_0_DATA.englishTitle})
          </p>
        </header>

        {/* Interactive Diagram Card for Beginners */}
        <div className="my-6 p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4 text-slate-700" />
            <span>ক্যান্ডেলস্টিক অ্যানাটমি ভিজ্যুয়াল মডেল (Anatomy of Candlesticks)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 sm:p-6 border border-slate-200 rounded">
            {/* Bullish Green Candle Visual */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-700 mb-2 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                বুলিশ ক্যান্ডেল (Green - বায়ার আধিপত্য)
              </span>

              <div className="relative flex flex-col items-center py-2 w-48">
                {/* High indicator */}
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <strong>High:</strong> সর্বোচ্চ দর (সর্বোচ্চ উইক)
                </div>

                {/* Upper Wick */}
                <div className="w-0.5 h-8 bg-slate-700"></div>

                {/* Green Body */}
                <div className="w-24 bg-emerald-600 border border-emerald-700 text-white text-center py-6 px-2 rounded-xs shadow-xs text-xs font-medium">
                  <div className="border-b border-emerald-400/50 pb-1 mb-1 text-[10px]">
                    <strong>Close:</strong> সমাপ্তি দর
                  </div>
                  <span className="block font-bold">গ্রিন বডি</span>
                  <div className="border-t border-emerald-400/50 pt-1 mt-1 text-[10px]">
                    <strong>Open:</strong> প্রারম্ভিক দর
                  </div>
                </div>

                {/* Lower Wick */}
                <div className="w-0.5 h-10 bg-slate-700"></div>

                {/* Low indicator */}
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <strong>Low:</strong> সর্বনিম্ন দর (লং উইক = বাইয়ার রিজেকশন)
                </div>
              </div>
            </div>

            {/* Bearish Red Candle Visual */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-rose-700 mb-2 px-2 py-0.5 bg-rose-50 rounded border border-rose-200">
                বিয়ারিশ ক্যান্ডেল (Red - সেলার আধিপত্য)
              </span>

              <div className="relative flex flex-col items-center py-2 w-48">
                {/* High indicator */}
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <strong>High:</strong> সর্বোচ্চ দর (সেলার রিজেকশন)
                </div>

                {/* Upper Wick */}
                <div className="w-0.5 h-10 bg-slate-700"></div>

                {/* Red Body */}
                <div className="w-24 bg-rose-600 border border-rose-700 text-white text-center py-6 px-2 rounded-xs shadow-xs text-xs font-medium">
                  <div className="border-b border-rose-400/50 pb-1 mb-1 text-[10px]">
                    <strong>Open:</strong> প্রারম্ভিক দর
                  </div>
                  <span className="block font-bold">রেড বডি</span>
                  <div className="border-t border-rose-400/50 pt-1 mt-1 text-[10px]">
                    <strong>Close:</strong> সমাপ্তি দর
                  </div>
                </div>

                {/* Lower Wick */}
                <div className="w-0.5 h-8 bg-slate-700"></div>

                {/* Low indicator */}
                <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <strong>Low:</strong> সর্বনিম্ন দর
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 0 Main Text Content following exact Typography */}
        <div className="space-y-8 text-[15px] sm:text-base text-slate-800 pt-2">
          {/* Section 1: Candlesticks */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-slate-700" />
              <span>## ১. ক্যান্ডেলস্টিক (Candlestick) কী এবং এটি কিভাবে কাজ করে?</span>
            </h2>
            <p className="pl-3 sm:pl-4 leading-relaxed text-slate-800">
              ক্যান্ডেলস্টিক হলো একটি নির্দিষ্ট সময়সীমার (যেমন ৫ মিনিট, ১৫ মিনিট, ১ ঘণ্টা বা ১ দিন) মধ্যে বাজারে ক্রেতা (Buyer) এবং বিক্রেতা (Seller)-দের মধ্যে লড়াইয়ের একটি নিখুঁত ভিজ্যুয়াল চিত্র। একটি ক্যান্ডেলস্টিক নির্দেশ করে ঐ নির্ধারিত সময়ে মূল্য কততে শুরু হয়েছিল, সর্বোচ্চ কোথায় উঠেছিল, সর্বনিম্ন কোথায় নেমেছিল এবং শেষে কততে বন্ধ হয়েছিল।
            </p>

            <div className="pl-3 sm:pl-4 space-y-4">
              <div className="border-l-2 border-emerald-500 pl-3">
                <h3 className="font-bold text-emerald-900 text-sm mb-1">
                  • বুলিশ ক্যান্ডেল (Green Candle):
                </h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><strong>ওপেন (Open):</strong> ক্যান্ডেলের বডির নিচের প্রান্ত, যে মূল্যে নির্দিষ্ট সময়সীমাটি শুরু হয়েছিল।</li>
                  <li><strong>ক্লোজ (Close):</strong> ক্যান্ডেলের বডির ওপরের প্রান্ত, যে মূল্যে সময়সীমাটি সমাপ্ত হয়েছিল। মূল্য ওপেনের চেয়ে ওপরে ক্লোজ হওয়ায় এটি সবুজ (Green) রঙের হয়।</li>
                  <li><strong>হাই (High):</strong> ক্যান্ডেলের ওপরের চিকন রেখা বা উইকের সর্বোচ্চ শীর্ষবিন্দু।</li>
                  <li><strong>লো (Low):</strong> ক্যান্ডেলের নিচের চিকন রেখা বা উইকের সর্বনিম্ন তলদেশ।</li>
                  <li><strong>বডি (Body):</strong> ওপেন এবং ক্লোজের মধ্যবর্তী ভরাট অংশটিই হলো ক্যান্ডেলের বডি (Real Body)। দীর্ঘ সবুজ বডি বাজারে ক্রেতাদের একচ্ছত্র আধিপত্য ও শক্তিমত্তা প্রমাণ করে।</li>
                </ul>
              </div>

              <div className="border-l-2 border-rose-500 pl-3">
                <h3 className="font-bold text-rose-900 text-sm mb-1">
                  • বিয়ারিশ ক্যান্ডেল (Red Candle):
                </h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><strong>ওপেন (Open):</strong> ক্যান্ডেলের বডির ওপরের প্রান্ত, যে মূল্যে সময়সীমাটি শুরু হয়েছিল।</li>
                  <li><strong>ক্লোজ (Close):</strong> ক্যান্ডেলের বডির নিচের প্রান্ত, যে মূল্যে সময়সীমাটি সমাপ্ত হয়েছিল। মূল্য ওপেনের চেয়ে নিচে নেমে ক্লোজ হওয়ায় এটি লাল (Red) রঙের হয়।</li>
                  <li><strong>হাই (High):</strong> ক্যান্ডেলের ওপরের উইকের সর্বোচ্চ বিন্দু।</li>
                  <li><strong>লো (Low):</strong> ক্যান্ডেলের নিচের উইকের সর্বনিম্ন বিন্দু।</li>
                  <li><strong>উইক বা শ্যাডো (Wick/Shadow):</strong> বডির ওপরে এবং নিচে থাকা চিকন সুতোর মতো রেখাকে উইক (Wick) বা শ্যাডো বলে। এটি বাজারে রিজেকশন (প্রত্যাখ্যান) প্রকাশ করে। দীর্ঘ লাল বডি বাজারে বিক্রেতাদের আক্রমণাত্মক আগ্রাসন নির্দেশ করে।</li>
                </ul>
              </div>

              <div className="border-l-2 border-slate-500 pl-3">
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  • ক্যান্ডেলের উইক (Wick) দ্বারা বায়ার ও সেলারের চাপ কীভাবে বোঝা যায়?
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>লং লোয়ার উইক (Long Lower Wick - বায়ারের রিজেকশন চাপ):</strong> ক্যান্ডেলের নিচের দিকে যদি লম্বা লেজ বা উইক থাকে এবং বডি ওপরে থাকে, তার অর্থ বিক্রেতারা মূল্যকে নিচে নামিয়ে নেওয়ার সর্বাত্মক চেষ্টা করেছিল, কিন্তু নিম্ন মূল্যে ক্রেতারা বিপুল শক্তিতে আক্রমণ করে সেলারদের তাড়িয়ে দিয়ে দাম ওপরে তুলে বন্ধ করেছে। এটি একটি শক্তিশালী বাই সিগন্যাল।
                  </li>
                  <li>
                    <strong>লং আপার উইক (Long Upper Wick - সেলারের রিজেকশন চাপ):</strong> ক্যান্ডেলের ওপরের দিকে যদি দীর্ঘ উইক থাকে এবং বডি নিচে থাকে, তার অর্থ বায়াররা প্রথমে মূল্য অনেক ওপরে নিয়ে গিয়েছিল, কিন্তু উচ্চ মূল্যে বিক্রেতাদের প্রবল বিক্রয় চাপের কাছে টিকতে না পেরে নিচে নেমে এসেছে। এটি একটি নিশ্চিত সেল সিগন্যাল।
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Support & Resistance */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-slate-700" />
              <span>## ২. সাপোর্ট ও রেজিস্ট্যান্স (Support & Resistance) কী?</span>
            </h2>
            <p className="pl-3 sm:pl-4 leading-relaxed text-slate-800">
              সাপোর্ট ও রেজিস্ট্যান্স হলো চার্টের সেই গুরুত্বপূর্ণ মানসিক সীমা বা মূল্যস্তর যেখানে বড় বড় প্রাতিষ্ঠানিক ফান্ড ও ট্রেডারদের সিদ্ধান্ত গ্রহণ সংঘটিত হয়।
            </p>

            <ul className="pl-3 sm:pl-4 space-y-3 text-sm text-slate-800">
              <li className="p-3 bg-emerald-50/50 border border-emerald-200 rounded">
                <strong className="text-emerald-950 font-bold block mb-1">
                  • সাপোর্ট জোন (Support Zone - বাই এলাকা):
                </strong>
                সাপোর্ট হলো চার্টের এমন একটি মেঝের (Floor) মতো স্তর, যেখানে একটি নামতে থাকা দাম এসে বারবার ধাক্কা খেয়ে পুনরায় ওপরে উঠে যায়।
                <span className="block mt-1 text-slate-600">
                  <strong>সহজে চেনার উপায়:</strong> চার্টে যখন দেখবেন দাম পরপর দুই বা ততোধিক বার একটি নির্দিষ্ট আনুভূমিক রেখা বা সীমানায় নেমে এসে আর নিচে নামতে পারছে না এবং সেখান থেকে লম্বা নিচের উইক সহ গ্রিন ক্যান্ডেল তৈরি করে ওপরের দিকে বাউন্স করছে, তখন সেই রেখাকে শক্তিশালী 'সাপোর্ট জোন' হিসেবে চিহ্নিত করুন। এটি প্রাতিষ্ঠানিক ক্রেতাদের ক্রয় এলাকা।
                </span>
              </li>

              <li className="p-3 bg-rose-50/50 border border-rose-200 rounded">
                <strong className="text-rose-950 font-bold block mb-1">
                  • রেজিস্ট্যান্স জোন (Resistance Zone - সেল এলাকা):
                </strong>
                রেজিস্ট্যান্স হলো চার্টের এমন একটি ছাদের (Ceiling) মতো স্তর, যেখানে একটি উঠতে থাকা দাম গিয়ে বাধা পায় এবং ধাক্কা খেয়ে নিচে ফিরে আসে।
                <span className="block mt-1 text-slate-600">
                  <strong>সহজে চেনার উপায়:</strong> চার্টে যখন দেখবেন দাম ওপরের দিকে উঠে বারবার একই আনুভূমিক স্তরে পৌঁছায় কিন্তু সেখান থেকে লম্বা ওপরের উইক ফেলে রিজেক্ট হয়ে রেড ক্যান্ডেল তৈরি করে নিচে নামছে, তখন সেই স্তরটি 'রেজিস্ট্যান্স জোন'। এটি বিক্রেতাদের বিক্রয় এলাকা।
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Moving Averages EMA */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-slate-700" />
              <span>## ৩. মুভিং এভারেজ (EMA) পরিচিতি</span>
            </h2>
            <div className="pl-3 sm:pl-4 space-y-2">
              <p className="leading-relaxed">
                <strong>EMA (Exponential Moving Average) কী?</strong> মুভিং এভারেজ হলো পূর্ববর্তী নির্দিষ্ট সংখ্যক ক্যান্ডেলের গড় মূল্যের একটি চলমান রেখা। সাধারণ SMA-এর তুলনায় EMA সাম্প্রতিকতম ক্যান্ডেলগুলোকে বেশি গুরুত্ব দেয়, ফলে বাজারের গতিপথ, মোমেন্টাম ও ট্রেন্ড পরিবর্তন তৎক্ষণাৎ প্রকাশ পায়।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 border border-slate-200 rounded bg-slate-50">
                  <span className="font-bold text-slate-900 block text-sm">EMA 9 (Ultra Fast Momentum)</span>
                  <p className="text-xs text-slate-600 mt-1">
                    অতি স্বল্পমেয়াদী গতিবেগ ও তাৎক্ষণিক স্ক্যাল্পিং এন্ট্রির জন্য ব্যবহৃত হয়। প্রাইস EMA 9-এর ওপরে থাকা মানে মার্কেট দ্রুত আপট্রেন্ডে রয়েছে।
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded bg-slate-50">
                  <span className="font-bold text-slate-900 block text-sm">EMA 20 (Short-term Trend)</span>
                  <p className="text-xs text-slate-600 mt-1">
                    ডে ট্রেডিংয়ের সবচেয়ে কার্যকর ডায়নামিক সাপোর্ট ও রেজিস্ট্যান্স লাইন। চলমান ট্রেন্ডে ছোটখাটো পুলব্যাক টেস্ট করার জন্য আদর্শ।
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded bg-slate-50">
                  <span className="font-bold text-slate-900 block text-sm">EMA 50 (Medium-term Trend)</span>
                  <p className="text-xs text-slate-600 mt-1">
                    প্রাতিষ্ঠানিক রিট্রেসমেন্ট জোন। একটি সুস্থ ও টেকসই ট্রেন্ড সাধারণত EMA 50-এ নেমে রিটেস্ট করে পুনরায় মূল ট্রেন্ডের দিকে বাউন্স করে।
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded bg-slate-50">
                  <span className="font-bold text-slate-900 block text-sm">EMA 200 (Golden Baseline)</span>
                  <p className="text-xs text-slate-600 mt-1">
                    বাজারের সার্বিক অভিভাবক লাইন। মূল্য ২০০ EMA-এর ওপরে থাকলে দীর্ঘমেয়াদী বুলিশ এবং নিচে থাকলে দীর্ঘমেয়াদী বিয়ারিশ।
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Chart Picture Guide */}
          <section className="bg-slate-50/80 border border-slate-200 rounded p-4 sm:p-5 mt-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              ## ৪. চার্ট পিকচার নির্দেশিকা (Chart Guide for Chapter 0)
            </h2>
            <ul className="space-y-2 pl-3 sm:pl-4 text-sm text-slate-800">
              <li>
                <strong>• চার্ট ব্যাকগ্রাউন্ড ও ক্যান্ডেল:</strong> সাদা ব্যাকগ্রাউন্ডে পরিষ্কারভাবে একটি পূর্ণাঙ্গ গ্রিন (Green) বুলিশ ক্যান্ডেল এবং একটি রেড (Red) বিয়ারিশ ক্যান্ডেল পাশাপাশি রাখুন।
              </li>
              <li>
                <strong>• গ্রিন ক্যান্ডেলের লেবেলিং:</strong>
                <div className="pl-4 text-xs text-slate-600 space-y-0.5 mt-0.5">
                  <div>1. শীর্ষের উইকের শেষপ্রান্তে: <strong>High</strong> (সর্বোচ্চ দর)</div>
                  <div>2. রঙিন বডির ওপরের সমান্তরাল প্রান্তে: <strong>Close</strong> (সমাপ্তি দর)</div>
                  <div>3. রঙিন বডির নিচের সমান্তরাল প্রান্তে: <strong>Open</strong> (প্রারম্ভিক দর)</div>
                  <div>4. নিচের উইকের শেষপ্রান্তে: <strong>Low</strong> (সর্বনিম্ন দর)</div>
                  <div>5. সবুজ বডির মাঝখানে: <strong>Bullish Real Body (Buyers Dominated)</strong></div>
                </div>
              </li>
              <li>
                <strong>• রেড ক্যান্ডেলের লেবেলিং:</strong>
                <div className="pl-4 text-xs text-slate-600 space-y-0.5 mt-0.5">
                  <div>1. শীর্ষের উইকের শেষপ্রান্তে: <strong>High</strong> (সর্বোচ্চ দর)</div>
                  <div>2. রঙিন বডির ওপরের সমান্তরাল প্রান্তে: <strong>Open</strong> (প্রারম্ভিক দর)</div>
                  <div>3. রঙিন বডির নিচের সমান্তরাল প্রান্তে: <strong>Close</strong> (সমাপ্তি দর)</div>
                  <div>4. নিচের উইকের শেষপ্রান্তে: <strong>Low</strong> (সর্বনিম্ন দর)</div>
                  <div>5. লাল বডির মাঝখানে: <strong>Bearish Real Body (Sellers Dominated)</strong></div>
                </div>
              </li>
              <li>
                <strong>• উইক নির্দেশক তীরচিহ্ন:</strong> উইকের পাশে তীরচিহ্ন দিয়ে <strong>"Wick / Shadow = Rejection & Pressure"</strong> স্পষ্ট করে লিখে দিন যাতে ট্রেডিংভিউতে বা ই-বুকে পাঠকরা এক পলকেই ক্যান্ডেলের শারীরবৃত্তীয় গঠন অনুধাবন করতে পারেন।
              </li>
            </ul>
          </section>
        </div>

        {/* Next to Strategy 1 Button */}
        <footer className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            পরবর্তী ধাপ: ১০০টি প্রাতিষ্ঠানিক কৌশল
          </span>

          <button
            onClick={onGoToFirstStrategy}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            <span>কৌশল ১ শুরু করুন</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </footer>
      </article>
    </div>
  );
};
