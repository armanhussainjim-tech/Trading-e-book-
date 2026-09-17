import React, { useState } from 'react';
import { TradingStrategy } from '../types';
import { EBOOK_MODULES } from '../data/initialStrategies';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ListPlus,
  Filter,
  Layers,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';

interface Props {
  strategies: TradingStrategy[];
  activeStrategyId: string;
  onSelectStrategy: (id: string) => void;
  onOpenGenerator: () => void;
  onOpenBatchImport: () => void;
  onOpenExport: () => void;
}

export const StrategySidebar: React.FC<Props> = ({
  strategies,
  activeStrategyId,
  onSelectStrategy,
  onOpenGenerator,
  onOpenBatchImport,
  onOpenExport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');

  const filteredStrategies = strategies.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.englishTitle && s.englishTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.number.toString().includes(searchTerm);

    const matchesModule =
      selectedModuleFilter === 'all' ||
      s.module === selectedModuleFilter ||
      s.module.includes(selectedModuleFilter);

    return matchesSearch && matchesModule;
  });

  const progressPercent = Math.min(100, Math.round((strategies.length / 100) * 100));

  return (
    <aside className="w-full md:w-80 lg:w-96 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-65px)] overflow-hidden">
      {/* Top Header & Progress */}
      <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-900/90 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-bold text-white text-sm">১০০টি স্ট্র্যাটেজি অগ্রগতি</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            {strategies.length}/১০০ ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            id="sidebar-new-strategy-btn"
            onClick={onOpenGenerator}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI দিয়ে কৌশল লিখুন</span>
          </button>
          <button
            id="sidebar-batch-import-btn"
            onClick={onOpenBatchImport}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <ListPlus className="h-3.5 w-3.5 text-sky-400" />
            <span>তালিকা পেস্ট</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="কৌশলের নাম বা নম্বর খুঁজুন..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-750 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Module Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <button
            onClick={() => setSelectedModuleFilter('all')}
            className={`px-2.5 py-1 rounded-lg flex-shrink-0 transition ${
              selectedModuleFilter === 'all'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            সব ({strategies.length})
          </button>
          {EBOOK_MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModuleFilter(m.nameBangla)}
              title={m.nameBangla}
              className={`px-2.5 py-1 rounded-lg flex-shrink-0 transition ${
                selectedModuleFilter === m.nameBangla
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              M{m.number}: {m.nameEnglish.replace(' Strategies', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Strategies List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 p-2 space-y-1">
        {filteredStrategies.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            কোনো কৌশল খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          filteredStrategies.map((s) => {
            const isActive = s.id === activeStrategyId;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStrategy(s.id)}
                className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 group relative ${
                  isActive
                    ? 'bg-slate-800/90 text-white border border-emerald-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute left-1 top-3 bottom-3 w-1 bg-emerald-500 rounded-full" />
                )}
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center mt-0.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400'
                  }`}
                >
                  {s.number}
                </span>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="text-xs font-semibold leading-snug line-clamp-2">
                    {s.title}
                  </div>
                  {s.englishTitle && (
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {s.englishTitle}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                    <span className="text-emerald-400 font-mono">{s.timeframe}</span>
                    <span>•</span>
                    <span className="text-sky-400">RRR {s.riskReward || '1:3'}</span>
                  </div>
                </div>

                <ChevronRight
                  className={`h-4 w-4 flex-shrink-0 mt-1 transition ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </button>
            );
          })
        )}
      </div>

      {/* Footer Export & Info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition"
        >
          <Download className="h-3.5 w-3.5" />
          <span>ই-বুক এক্সপোর্ট (.md / JSON)</span>
        </button>
        <span className="text-[10px] text-slate-500">বাংলা সংস্করণ ১.০</span>
      </div>
    </aside>
  );
};
