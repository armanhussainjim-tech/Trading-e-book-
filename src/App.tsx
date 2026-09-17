import React, { useState, useMemo, useEffect } from 'react';
import { TradingStrategy } from './types';
import { buildFull100StrategiesCatalog } from './data/fullCatalogGenerator';
import { StrategyDetailView } from './components/StrategyDetailView';
import { Chapter0View } from './components/Chapter0View';
import { EbookExportModal } from './components/EbookExportModal';
import {
  loadUserState,
  toggleFavoriteStrategy,
  toggleCompletedStrategy,
  setLastReadStrategy,
  UserTradingState,
} from './services/storageService';
import {
  BookOpen,
  Search,
  Download,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Star,
  Compass,
  Smartphone,
} from 'lucide-react';

export function App() {
  const [strategies] = useState<TradingStrategy[]>(() => buildFull100StrategiesCatalog());
  const [userState, setUserState] = useState<UserTradingState>(() => loadUserState());

  // Determine initial selected strategy (or 'chapter-0')
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(() => {
    const saved = loadUserState();
    if (saved.lastReadStrategyNumber === 0) return 'chapter-0';
    const target = buildFull100StrategiesCatalog().find((s) => s.number === saved.lastReadStrategyNumber);
    return target ? target.id : 'chapter-0';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'favorites' | 'completed'>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setInstallPrompt(null);
  };

  // Keep lastReadStrategy updated in local storage
  const handleSelectStrategy = (id: string, number: number) => {
    setSelectedStrategyId(id);
    const updated = setLastReadStrategy(number);
    setUserState(updated);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChapter0 = () => {
    setSelectedStrategyId('chapter-0');
    const updated = setLastReadStrategy(0);
    setUserState(updated);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (strategyNumber: number) => {
    const updated = toggleFavoriteStrategy(strategyNumber);
    setUserState(updated);
  };

  const handleToggleCompleted = (strategyNumber: number) => {
    const updated = toggleCompletedStrategy(strategyNumber);
    setUserState(updated);
  };

  // Extract unique module names
  const modules = useMemo(() => {
    const list: string[] = [];
    strategies.forEach((s) => {
      if (!list.includes(s.module)) list.push(s.module);
    });
    return list;
  }, [strategies]);

  // Filter strategies considering search, module, and state tabs (all, favorites, completed)
  const filteredStrategies = useMemo(() => {
    return strategies.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.englishTitle && s.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.number.toString() === searchQuery.trim();

      const matchesModule = selectedModule === 'all' || s.module === selectedModule;

      const matchesTab =
        activeTabFilter === 'all' ||
        (activeTabFilter === 'favorites' && userState.favorites.includes(s.number)) ||
        (activeTabFilter === 'completed' && userState.completed.includes(s.number));

      return matchesSearch && matchesModule && matchesTab;
    });
  }, [strategies, searchQuery, selectedModule, activeTabFilter, userState]);

  const isChapter0 = selectedStrategyId === 'chapter-0';
  const selectedStrategy = strategies.find((s) => s.id === selectedStrategyId) || strategies[0];
  const currentIndex = strategies.findIndex((s) => s.id === selectedStrategyId);

  const handleNext = () => {
    if (isChapter0) {
      if (strategies.length > 0) {
        handleSelectStrategy(strategies[0].id, strategies[0].number);
      }
      return;
    }
    if (currentIndex < strategies.length - 1) {
      const nextStrategy = strategies[currentIndex + 1];
      handleSelectStrategy(nextStrategy.id, nextStrategy.number);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      handleSelectChapter0();
      return;
    }
    if (currentIndex > 0) {
      const prevStrategy = strategies[currentIndex - 1];
      handleSelectStrategy(prevStrategy.id, prevStrategy.number);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Simple Paperback Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-1.5 rounded text-slate-600 hover:bg-slate-100"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-slate-800" />
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                ট্রেডিং মাস্টার ই-বুক • ১০০টি স্ট্র্যাটেজি
              </h1>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                জাপানিজ ক্যান্ডেলস্টিক (Green / Red Candle) রুলস ও মিনিমাল পেপারব্যাক সংস্করণ
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs font-sans">
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>আয়ত্ত: <strong>{userState.completed.length}</strong>/{strategies.length}</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>প্রিয়: <strong>{userState.favorites.length}</strong></span>
            </span>
          </div>

          {installPrompt && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs animate-pulse"
              title="অ্যাপটি আপনার মোবাইল বা পিসিতে ইনস্টল করুন"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>ইনস্টল অ্যাপ</span>
            </button>
          )}

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-900 text-white transition shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">সম্পূর্ণ বই কপি / ডাউনলোড</span>
            <span className="sm:hidden">ই-বুক</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Index / Table of Contents */}
        <aside
          className={`${
            mobileNavOpen ? 'fixed inset-y-0 left-0 z-40 w-72 pt-16' : 'hidden'
          } md:block md:w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col`}
        >
          {/* Search and Category Filter */}
          <div className="p-3 border-b border-slate-200 space-y-2 bg-slate-50/70">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কৌশল বা নম্বর খুঁজুন..."
                className="w-full bg-white border border-slate-300 rounded pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-500"
              />
            </div>

            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:border-slate-500"
            >
              <option value="all">সব অধ্যায় ({strategies.length} টি কৌশল)</option>
              {modules.map((m, idx) => (
                <option key={idx} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* View State Filter Tabs */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              <button
                onClick={() => setActiveTabFilter('all')}
                className={`py-1 px-1.5 text-[11px] font-medium rounded text-center transition ${
                  activeTabFilter === 'all'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                সব ({strategies.length})
              </button>
              <button
                onClick={() => setActiveTabFilter('favorites')}
                className={`py-1 px-1.5 text-[11px] font-medium rounded text-center transition flex items-center justify-center gap-1 ${
                  activeTabFilter === 'favorites'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Star className="h-3 w-3" />
                <span>প্রিয় ({userState.favorites.length})</span>
              </button>
              <button
                onClick={() => setActiveTabFilter('completed')}
                className={`py-1 px-1.5 text-[11px] font-medium rounded text-center transition flex items-center justify-center gap-1 ${
                  activeTabFilter === 'completed'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="h-3 w-3" />
                <span>আয়ত্ত ({userState.completed.length})</span>
              </button>
            </div>
          </div>

          {/* Chapter 0 Introduction Button */}
          <div className="p-2 border-b border-slate-200 bg-amber-50/40">
            <button
              onClick={handleSelectChapter0}
              className={`w-full text-left px-3 py-2.5 rounded transition flex items-center justify-between gap-2 text-xs ${
                isChapter0
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-700 hover:bg-amber-100/60 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Compass className={`h-4 w-4 flex-shrink-0 ${isChapter0 ? 'text-amber-400' : 'text-amber-700'}`} />
                <div className="truncate">
                  <span className="block font-bold">Chapter 0: বেসিকস ও চার্ট</span>
                  <span className={`text-[10px] block truncate ${isChapter0 ? 'text-slate-300' : 'text-slate-500'}`}>
                    ক্যান্ডেলস্টিক, S&R এবং EMA পরিচিতি
                  </span>
                </div>
              </div>
              <ChevronRight className={`h-3.5 w-3.5 flex-shrink-0 ${isChapter0 ? 'text-white' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* Strategy List Index */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredStrategies.map((s) => {
              const isSelected = s.id === selectedStrategyId;
              const isFav = userState.favorites.includes(s.number);
              const isDone = userState.completed.includes(s.number);

              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectStrategy(s.id, s.number)}
                  className={`w-full text-left px-3.5 py-2.5 transition flex items-start justify-between gap-2 text-xs ${
                    isSelected
                      ? 'bg-slate-100 text-slate-900 font-semibold border-l-3 border-slate-800'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="min-w-0 pr-1 flex-1">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[11px] font-mono text-slate-400">
                        #{s.number}
                      </span>
                      {isFav && (
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500 inline-block" />
                      )}
                      {isDone && (
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 inline-block" />
                      )}
                    </div>
                    <span className="leading-snug block line-clamp-2">{s.title}</span>
                  </div>
                  <ChevronRight
                    className={`h-3.5 w-3.5 flex-shrink-0 mt-1 ${
                      isSelected ? 'text-slate-800' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}

            {filteredStrategies.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-400 space-y-1">
                <p>কোনো কৌশল পাওয়া যায়নি</p>
                {activeTabFilter !== 'all' && (
                  <button
                    onClick={() => setActiveTabFilter('all')}
                    className="text-slate-700 underline hover:text-slate-900 text-[11px]"
                  >
                    সব কৌশল দেখুন
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Strategy Reading Workspace (Clean White Paperback Canvas) */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-100">
          {isChapter0 ? (
            <Chapter0View
              onGoToFirstStrategy={() => {
                if (strategies.length > 0) {
                  handleSelectStrategy(strategies[0].id, strategies[0].number);
                }
              }}
            />
          ) : (
            <StrategyDetailView
              strategy={selectedStrategy}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={currentIndex < strategies.length - 1}
              hasPrevious={currentIndex >= 0}
              totalStrategies={strategies.length}
              isFavorite={userState.favorites.includes(selectedStrategy.number)}
              isCompleted={userState.completed.includes(selectedStrategy.number)}
              onToggleFavorite={handleToggleFavorite}
              onToggleCompleted={handleToggleCompleted}
            />
          )}
        </main>
      </div>

      {/* Export Modal */}
      <EbookExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        strategies={strategies}
      />
    </div>
  );
}

export default App;
