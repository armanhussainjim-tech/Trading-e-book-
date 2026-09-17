import React, { useState } from 'react';
import { SvgChartConfig } from '../data/visualChartDiagrams';
import { Copy, Check, BarChart2, Code2, ArrowUpRight, TrendingUp, ShieldAlert, Target } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface VisualCandlestickChartProps {
  config: SvgChartConfig;
  mermaidCode: string;
}

export const VisualCandlestickChart: React.FC<VisualCandlestickChartProps> = ({
  config,
  mermaidCode,
}) => {
  const [viewMode, setViewMode] = useState<'svg' | 'mermaid'>('svg');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(mermaidCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // SVG dimensions
  const width = 640;
  const height = 280;
  const candleCount = config.candles.length;
  const stepX = (width - 120) / (candleCount + 1);
  const candleWidth = Math.max(20, Math.min(36, stepX * 0.55));

  return (
    <div className="rounded-lg border border-slate-700/80 bg-slate-950 overflow-hidden shadow-xl my-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-200">{config.title}</span>
          </div>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-400 font-mono">{config.subtitle}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode('svg')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'svg'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>গ্রাফিক্যাল চার্ট</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mermaid')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'mermaid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Mermaid.js কোড</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors ml-1"
            title="Mermaid কোড কপি করুন"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'svg' ? (
        <div className="p-3 sm:p-4 bg-slate-950 flex flex-col items-center">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto max-h-[360px] select-none"
              style={{ minWidth: '480px' }}
            >
              {/* Background Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.7" strokeDasharray="2 2" />
                </pattern>
                <linearGradient id="bullishGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="bearishGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>

              <rect width={width} height={height} fill="#0b0f19" />
              <rect width={width} height={height} fill="url(#grid)" />

              {/* SMC Order Block Zone if exists */}
              {config.smcZone && (
                <g>
                  <rect
                    x={config.smcZone.x}
                    y={config.smcZone.y}
                    width={config.smcZone.width}
                    height={config.smcZone.height}
                    fill={config.smcZone.color}
                    fillOpacity="0.18"
                    stroke={config.smcZone.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    rx="3"
                  />
                  <text
                    x={config.smcZone.x + 8}
                    y={config.smcZone.y + 16}
                    fill="#34d399"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {config.smcZone.label}
                  </text>
                </g>
              )}

              {/* Support Horizontal Level */}
              {config.supportLevel && (
                <g>
                  <line
                    x1="20"
                    y1={config.supportLevel.y}
                    x2={width - 20}
                    y2={config.supportLevel.y}
                    stroke="#0ea5e9"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                  />
                  <rect
                    x="24"
                    y={config.supportLevel.y - 18}
                    width="180"
                    height="16"
                    rx="2"
                    fill="#0369a1"
                    opacity="0.85"
                  />
                  <text
                    x="30"
                    y={config.supportLevel.y - 6}
                    fill="#e0f2fe"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {config.supportLevel.label}
                  </text>
                </g>
              )}

              {/* Resistance Horizontal Level */}
              {config.resistanceLevel && (
                <g>
                  <line
                    x1="20"
                    y1={config.resistanceLevel.y}
                    x2={width - 20}
                    y2={config.resistanceLevel.y}
                    stroke="#f59e0b"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                  />
                  <rect
                    x="24"
                    y={config.resistanceLevel.y - 18}
                    width="200"
                    height="16"
                    rx="2"
                    fill="#b45309"
                    opacity="0.85"
                  />
                  <text
                    x="30"
                    y={config.resistanceLevel.y - 6}
                    fill="#fef3c7"
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {config.resistanceLevel.label}
                  </text>
                </g>
              )}

              {/* Indicator Smooth Curve Line (e.g., 50 EMA or 200 EMA) */}
              {config.curveLine && (
                <g>
                  <path
                    d={config.curveLine.path}
                    fill="none"
                    stroke={config.curveLine.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <text
                    x="380"
                    y="75"
                    fill={config.curveLine.color}
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {config.curveLine.label}
                  </text>
                </g>
              )}

              {/* Trendline if exists */}
              {config.trendLine && (
                <g>
                  <line
                    x1={config.trendLine.x1}
                    y1={config.trendLine.y1}
                    x2={config.trendLine.x2}
                    y2={config.trendLine.y2}
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={config.trendLine.x2 - 100}
                    y={config.trendLine.y2 + 15}
                    fill="#c084fc"
                    fontSize="9.5"
                    fontFamily="sans-serif"
                  >
                    {config.trendLine.label}
                  </text>
                </g>
              )}

              {/* Stop Loss Line */}
              {config.stopLoss && (
                <g>
                  <line
                    x1="20"
                    y1={config.stopLoss.price}
                    x2={width - 20}
                    y2={config.stopLoss.price}
                    stroke="#dc2626"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={width - 155}
                    y={config.stopLoss.price - 14}
                    width="135"
                    height="14"
                    rx="2"
                    fill="#7f1d1d"
                  />
                  <text
                    x={width - 148}
                    y={config.stopLoss.price - 3}
                    fill="#fecaca"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {config.stopLoss.label}
                  </text>
                </g>
              )}

              {/* Take Profit Target Line */}
              {config.takeProfit && (
                <g>
                  <line
                    x1="20"
                    y1={config.takeProfit.price}
                    x2={width - 20}
                    y2={config.takeProfit.price}
                    stroke="#16a34a"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={width - 165}
                    y={config.takeProfit.price - 14}
                    width="145"
                    height="14"
                    rx="2"
                    fill="#14532d"
                  />
                  <text
                    x={width - 158}
                    y={config.takeProfit.price - 3}
                    fill="#bbf7d0"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {config.takeProfit.label}
                  </text>
                </g>
              )}

              {/* Candlesticks Rendering */}
              {config.candles.map((candle, idx) => {
                const cx = 60 + idx * stepX;
                const isGreen = candle.type === 'green';
                const bodyTop = Math.min(candle.open, candle.close);
                const bodyHeight = Math.max(4, Math.abs(candle.close - candle.open));
                const candleColor = isGreen ? '#22c55e' : '#ef4444';
                const wickColor = isGreen ? '#4ade80' : '#f87171';

                return (
                  <g key={candle.id} className="transition-transform hover:opacity-90">
                    {/* Upper Wick */}
                    <line
                      x1={cx}
                      y1={candle.high}
                      x2={cx}
                      y2={bodyTop}
                      stroke={wickColor}
                      strokeWidth="2"
                    />

                    {/* Lower Wick */}
                    <line
                      x1={cx}
                      y1={bodyTop + bodyHeight}
                      x2={cx}
                      y2={candle.low}
                      stroke={wickColor}
                      strokeWidth="2"
                    />

                    {/* Candle Real Body */}
                    <rect
                      x={cx - candleWidth / 2}
                      y={bodyTop}
                      width={candleWidth}
                      height={bodyHeight}
                      rx="1.5"
                      fill={isGreen ? 'url(#bullishGradient)' : 'url(#bearishGradient)'}
                      stroke={isGreen ? '#15803d' : '#b91c1c'}
                      strokeWidth="1.2"
                    />

                    {/* Candle Label / Annotation below candle */}
                    {candle.label && (
                      <g>
                        <text
                          x={cx}
                          y={candle.low + 16}
                          fill={isGreen ? '#86efac' : '#fca5a5'}
                          fontSize="9"
                          fontWeight="600"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {candle.label}
                        </text>
                      </g>
                    )}

                    {/* Action Marker if Key Candle */}
                    {candle.isKeyAction && (
                      <circle
                        cx={cx}
                        cy={candle.high - 8}
                        r="3.5"
                        fill="#facc15"
                        stroke="#713f12"
                        strokeWidth="1"
                      />
                    )}
                  </g>
                );
              })}

              {/* Trade Entry Point Indicator Arrow & Callout */}
              {config.entryPoint && (
                <g>
                  {(() => {
                    const entryX = 60 + config.entryPoint.candleIndex * stepX;
                    const entryY = config.entryPoint.price;
                    const badgeWidth = 180;
                    const isNearRight = entryX + 35 + badgeWidth > width - 10;
                    const badgeX = isNearRight ? Math.max(10, entryX - badgeWidth - 25) : entryX + 35;
                    const lineTargetX = isNearRight ? entryX - 25 : entryX + 35;
                    return (
                      <g>
                        {/* Glowing Entry Pin */}
                        <circle cx={entryX} cy={entryY} r="5" fill="#38bdf8" />
                        <circle cx={entryX} cy={entryY} r="9" fill="#0284c7" opacity="0.35" />

                        {/* Pointer Line */}
                        <line
                          x1={entryX}
                          y1={entryY}
                          x2={lineTargetX}
                          y2={entryY - 22}
                          stroke="#38bdf8"
                          strokeWidth="1.8"
                        />

                        {/* Callout Badge */}
                        <rect
                          x={badgeX}
                          y={entryY - 34}
                          width={badgeWidth}
                          height="22"
                          rx="4"
                          fill="#0369a1"
                          stroke="#38bdf8"
                          strokeWidth="1.2"
                        />
                        <text
                          x={badgeX + 7}
                          y={entryY - 20}
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="sans-serif"
                        >
                          {config.entryPoint.label}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>
          </div>

          {/* Legend and Key Data Strip */}
          <div className="w-full mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-3 bg-emerald-500 rounded-xs"></span>
                <span>বুলিশ (Green Candle)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-3 bg-red-500 rounded-xs"></span>
                <span>বিয়ারিশ (Red Candle)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-sky-400"></span>
                <span>সাপোর্ট / কী-লেভেল</span>
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-emerald-400 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>কনফার্মেশন: পরবর্তী ক্যান্ডেল ওপেন / ক্লোজ</span>
            </div>
          </div>
        </div>
      ) : (
        /* Mermaid Code View */
        <div className="p-4 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between mb-2 text-slate-400 border-b border-slate-800 pb-2">
            <span>Mermaid.js Flowchart Source:</span>
            <span className="text-[11px] text-slate-500">Copy or embed in Markdown documents</span>
          </div>
          <pre className="text-emerald-400 bg-slate-900/90 p-3 rounded border border-slate-800 leading-relaxed overflow-x-auto select-all">
            {mermaidCode}
          </pre>
        </div>
      )}
    </div>
  );
};
