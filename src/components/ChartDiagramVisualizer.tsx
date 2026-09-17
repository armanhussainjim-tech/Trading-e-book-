import React from 'react';
import { TradingStrategy } from '../types';

interface Props {
  strategy: TradingStrategy;
}

export const ChartDiagramVisualizer: React.FC<Props> = ({ strategy }) => {
  const isBullish = strategy.visualDiagramGuide.setupType === 'bullish';
  const isBearish = strategy.visualDiagramGuide.setupType === 'bearish';
  const isBreakout = strategy.visualDiagramGuide.setupType === 'breakout';

  return (
    <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/60">
      <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
        <span className="font-mono text-slate-400">TradingView চার্ট সেটআপ স্কেচ:</span>
        <span className="text-[10px] text-slate-500 uppercase">{strategy.visualDiagramGuide.setupType}</span>
      </div>

      <svg
        viewBox="0 0 600 200"
        className="w-full h-auto max-h-48 rounded bg-slate-950/90 font-mono select-none"
      >
        {/* Subtle grid lines */}
        <line x1="0" y1="50" x2="600" y2="50" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="0" y1="100" x2="600" y2="100" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="0" y1="150" x2="600" y2="150" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3,3" />

        {isBreakout && (
          <g>
            {/* Breakout Level */}
            <line x1="40" y1="110" x2="560" y2="110" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="50" y="102" fill="#94a3b8" fontSize="10">Key Level / Resistance</text>

            {/* Price line bouncing then breaking */}
            <path
              d="M 60 140 L 140 115 L 200 135 L 280 110 L 350 60 L 410 105 L 520 40"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Retest circle */}
            <circle cx="410" cy="105" r="4" fill="#10b981" />
            <text x="420" y="108" fill="#34d399" fontSize="10" fontWeight="bold">BUY (Retest)</text>

            {/* SL line */}
            <line x1="380" y1="130" x2="480" y2="130" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="490" y="133" fill="#f87171" fontSize="9">SL</text>

            {/* TP line */}
            <line x1="450" y1="40" x2="550" y2="40" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="555" y="43" fill="#34d399" fontSize="9">TP</text>
          </g>
        )}

        {isBearish && (
          <g>
            {/* Resistance / Supply */}
            <rect x="180" y="30" width="260" height="25" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" />
            <text x="190" y="46" fill="#f87171" fontSize="10">Resistance / Supply Zone</text>

            {/* Price path up into resistance then dropping */}
            <path
              d="M 60 160 L 160 110 L 220 140 L 310 40 L 380 90 L 520 170"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
            />
            {/* Sell Arrow */}
            <circle cx="310" cy="40" r="4" fill="#ef4444" />
            <text x="325" y="45" fill="#f87171" fontSize="10" fontWeight="bold">SELL (Rejection)</text>

            <line x1="260" y1="20" x2="360" y2="20" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="365" y="23" fill="#f87171" fontSize="9">SL</text>

            <line x1="420" y1="170" x2="540" y2="170" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="545" y="173" fill="#34d399" fontSize="9">TP</text>
          </g>
        )}

        {(isBullish || (!isBreakout && !isBearish)) && (
          <g>
            {/* Support / Demand Zone */}
            <rect x="160" y="145" width="280" height="25" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
            <text x="170" y="161" fill="#34d399" fontSize="10">Support / Demand Zone</text>

            {/* Price path dropping into support then reversing */}
            <path
              d="M 60 40 L 150 90 L 220 60 L 300 150 L 370 110 L 520 30"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Buy Arrow */}
            <circle cx="300" cy="150" r="4" fill="#10b981" />
            <text x="315" y="145" fill="#34d399" fontSize="10" fontWeight="bold">BUY (Bounce)</text>

            <line x1="250" y1="180" x2="350" y2="180" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="355" y="183" fill="#f87171" fontSize="9">SL</text>

            <line x1="440" y1="30" x2="540" y2="30" stroke="#10b981" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="545" y="33" fill="#34d399" fontSize="9">TP</text>
          </g>
        )}
      </svg>
    </div>
  );
};
