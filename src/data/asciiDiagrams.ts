import { StrategyOutline } from './user100StrategiesOutline';

/**
 * Generates a clean text-based ASCII candlestick diagram for any given strategy.
 * Uses characters like '|' (wick), '[GREEN]' (bullish body), '[RED]' (bearish body),
 * dashed lines for key levels (S/R, EMA, OB), and directional arrows for Entry/SL/TP.
 */
export function getStrategyAsciiDiagram(outline: StrategyOutline): string {
  const num = outline.number;
  const cat = outline.categoryNumber;
  const eng = outline.englishTitle.toLowerCase();

  // 1. Support & Resistance Reversal (Strategy 1)
  if (num === 1 || eng.includes('support & resistance reversal')) {
    return `  Resistance Line (TP Target) --------------------------------------- [TP: 1:3 RRR]
                          |                   |
                        [RED]               [RED]  <-- Rejection Candle
                          |                   |
  Support Line -------------------------------|----------------------
         |                     |              |
      [GREEN]               [GREEN] <--- BUY ENTRY HERE (Green Close)
         |                     |
         |                     |    <--- Long Lower Wick (Rejection)
  Stop-Loss (SL) ----------------------------------------------------`;
  }

  // 2. Support & Resistance Breakout & Retest (Strategy 2)
  if (num === 2 || eng.includes('breakout')) {
    return `  Take-Profit (TP Target) ------------------------------------------- [TP: 1:2.5+ RRR]
                                                       |
                                                    [GREEN]
                                                       |
  Broken Resistance (Now Support) ---------------------|-------------
                           |            |              |
                        [GREEN]       [RED]         [GREEN] <--- BUY ENTRY (Retest Bounce)
                           |            |              |
  Old Range                | (Breakout) | (Pullback)   |
  -------------------------------------------------------------------
                                               Stop-Loss (SL) -------`;
  }

  // 3. Dynamic Support & Resistance / EMA Bounce (Strategy 3)
  if (num === 3 || eng.includes('dynamic support')) {
    return `  Target Swing High (TP) -------------------------------------------- [TP Target]
                                                       |
                                                    [GREEN]
                                                       |
  20 EMA (Momentum) ~~~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~/~~~~~~~~~~~~~
                         /                            /  |
  50 EMA (Dynamic Support) ~~/~~~~~~~~~~~~~~~~~~~~~~~/~[GREEN] <--- BUY ENTRY (EMA Bounce)
                            /                       /    |
                     |     /                       /     | <--- Lower Wick on EMA
                   [RED]  /                       /
  Stop-Loss (SL) ----------------------------------------------------`;
  }

  // 4. Trendline Bounce Strategy (Strategy 4)
  if (num === 4 || eng.includes('trendline bounce')) {
    return `  Target Swing High (TP) -------------------------------------------- [TP: 1:3 RRR]
                                                                |
                                                             [GREEN]
                                                                |
  Ascending Trendline                      /                    |
                                         /                   [GREEN] <--- BUY ENTRY (Bounce)
                                       /                        |
                              |      /                          | <--- Lower Wick Touches Line
                            [RED]   /
                              |    /
  Stop-Loss (SL) ----------------------------------------------------`;
  }

  // 5. Trendline Breakout Strategy (Strategy 5)
  if (num === 5 || eng.includes('trendline breakout')) {
    return `  Take-Profit (TP) -------------------------------------------------- [TP Target]
                                                       |
                                                    [GREEN]
                                                       |
  Descending Trendline \\                               |
                        \\      |                       |
                         \\  [GREEN]                 [GREEN] <--- BUY ENTRY (Retest Bounce)
                          \\    | (Breakout Candle)     |
                           \\                           |
  Stop-Loss (SL) -----------\\----------------------------------------`;
  }

  // Category 2: Single Candlestick Patterns (11 - 20)
  if (cat === 2) {
    if (eng.includes('shooting star') || eng.includes('hanging man') || eng.includes('gravestone')) {
      return `  Resistance Line ---------------------------------------------------
                            |    <--- Long Upper Wick (2x Body Rejection)
                            |
                          [RED]  <--- SELL ENTRY (Bearish Close)
                            |
  Stop-Loss (SL) -----------|----------------------------------------
                            |
  Support Line (TP Target) ------------------------------------------ [TP: 1:2.5 RRR]
                                  |
                                [RED]
                                  |`;
    }
    // Hammer / Dragonfly / Pinbar (Bullish)
    return `  Resistance Line (TP Target) --------------------------------------- [Take-Profit]
                                          |
                                       [GREEN]
                                          |
                                    |
                                 [GREEN]
                                    |
  Support Line ---------------------|--------------------------------
         |                          |
       [RED]                     [GREEN] <--- BUY ENTRY (Hammer / Pinbar Close)
         |                          |
         |                          |
         |                          |    <--- Very Long Lower Wick (2x Body)
  Stop-Loss (SL) -------------------|--------------------------------`;
  }

  // Category 3: Multiple Candlestick Patterns (21 - 30)
  if (cat === 3) {
    if (eng.includes('bearish engulfing') || eng.includes('evening star') || eng.includes('tweezer top') || eng.includes('black crows')) {
      return `  Resistance Line ---------------------------------------------------
               |                     |
            [GREEN] (Bullish)      [RED] <--- SELL ENTRY (Engulfs Previous Body)
               |                     |
  Stop-Loss (SL) --------------------|-------------------------------
                                     |
                                     |
  Support Line (TP Target) ----------|------------------------------- [TP: 1:3 RRR]
                                     |
                                   [RED]
                                     |`;
    }
    // Bullish Engulfing / Morning Star / Tweezer Bottom
    return `  Resistance Line (TP Target) --------------------------------------- [Take-Profit]
                                                |
                                             [GREEN]
                                                |
  Support Line ---------------------------------|--------------------
         |                                      |
       [RED] (Bearish Candle 1)              [GREEN] <--- BUY ENTRY (Candle 3: >50% Engulf)
         |                                      |
         |                     |                |
         |                  [DOJI] (Candle 2)   |
  Stop-Loss (SL) --------------|-------------------------------------`;
  }

  // Category 4: Moving Average Strategies (31 - 40)
  if (cat === 4) {
    if (eng.includes('death cross') || eng.includes('bearish')) {
      return `  50 EMA (Slow) ~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                   /                           \\
  20 EMA (Fast) ~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\~~~~~~~~~~~~~~~~~~~~ [Bearish Cross]
                 /                               \\
  Stop-Loss (SL) ---------------------------------\\------------------
                                                   \\    |
                                                   [RED] <--- SELL ENTRY (EMA Rejection)
                                                     |
  Take-Profit (TP) -------------------------------------------------- [TP Target]
                                                     |
                                                   [RED]
                                                     |`;
    }
    return `  Take-Profit (TP) -------------------------------------------------- [TP: 1:2.5+ RRR]
                                                |
                                             [GREEN]
                                                |
  20 EMA (Fast) ~~~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~/~~~~~~~~~~~~~~~~~~~~
                     /                         /  |
  50 EMA (Slow) ~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~/~[GREEN] <--- BUY ENTRY (EMA Cross/Bounce)
                   /                         /    |
            |     /                         /     |
          [RED]  /                         /
  Stop-Loss (SL) ----------------------------------------------------`;
  }

  // Category 5: Oscillators & Momentum (41 - 50)
  if (cat === 5) {
    if (eng.includes('bearish divergence')) {
      return `  Price Chart: Higher High (HH) ----/---- [RED] <--- SELL ENTRY (Bearish Close)
                                   /        |
  Stop-Loss (SL) -----------------/---------|------------------------
  Take-Profit (TP) -------------------------|------------------------ [TP: 1:2.5 RRR]
                                            |
                                          [RED]
                                            |
  ===================================================================
  RSI (14) Indicator:
         70 (Overbought) ---/----------------------------------------
                           /--\\-- Lower High (LH) <--- Bearish Divergence
         50 (Centerline) -/----\\-------------------------------------
         30 (Oversold) ----------------------------------------------`;
    }
    return `  Resistance Line (TP) ---------------------------------------------- [Take-Profit]
                                       |
                                    [GREEN]
                                       |
  Price Chart:          |              |
                      [RED]         [GREEN] <--- BUY ENTRY (Bullish Confirmation)
                        |              |
  Lower Low (LL) ---\\---|--------------|-----------------------------
                     \\  |              |    <--- Price Lower Low
  Stop-Loss (SL) -----\\----------------------------------------------
  ===================================================================
  RSI (14) Indicator:
         70 (Overbought) --------------------------------------------
         50 (Centerline) --------------------------------------------
                            /-- Higher Low (HL) <--- Bullish Divergence
         30 (Oversold) ----/-----------------------------------------`;
  }

  // Category 6: Volatility & Bands (51 - 60)
  if (cat === 6) {
    return `  Upper Band Expansion ~~~~~~~~~~~~~~~~~~/~~~~ [GREEN] <--- BUY ENTRY (Breakout Close)
                                        /        |
  20 SMA (Middle Band) ----------------/-----------------------------
                       (Squeeze)      /     Stop-Loss (SL) ----------
                           |         /
                        [GREEN]     /
                           |       /
  Lower Band Expansion ~~~~~~~~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Take-Profit Target ------------------------------------------------ [TP: Band Expansion]`;
  }

  // Category 7: Classic Chart Patterns (61 - 70)
  if (cat === 7) {
    if (eng.includes('head & shoulders') && !eng.includes('inverse')) {
      return `                     Head [TOP]
                      |        |
        Left Shoulder |        | Right Shoulder
             |        |        |      |
          [GREEN]   [RED]    [GREEN] [RED]
             |        |        |      |
  Neckline ---------------------------|------------------------------
                                      |
                                    [RED] <--- SELL ENTRY (Neckline Breakdown)
  Stop-Loss (SL) ---------------------|------------------------------
  Measured Move Target (TP) ----------|------------------------------ [TP: Full Height]
                                      |
                                    [RED]`;
    }
    // Double Bottom 'W' / Inverse Head & Shoulders / Flags
    return `  Target (Measured Move TP) ----------------------------------------- [TP: Height of 'W']
                                       |
                                    [GREEN]
                                       |
  Neckline Breakout -------------------|-----------------------------
                          |            |
                       [GREEN]      [GREEN] <--- BUY ENTRY (Neckline Retest)
                          | (Break)    |
        Bottom 1          |   Bottom 2 |
  ----------\\-------------|-----/------|-----------------------------
             \\---[RED]----/    \\--[RED]/   Stop-Loss (SL) -----------`;
  }

  // Category 8: Trend & Breakout (71 - 80)
  if (cat === 8) {
    return `  Take-Profit Target (1:3+ RRR) ------------------------------------- [TP Target]
                                       |
                                    [GREEN]
                                       |
  Consolidation Range High ------------|-----------------------------
                          |            |
                       [GREEN]      [GREEN] <--- BUY ENTRY (Range Breakout)
                          |            |
  Consolidation Range     | (Breakout) |
  -------------------------------------------------------------------
  Consolidation Range Low                  Stop-Loss (SL) -----------`;
  }

  // Category 9: Multi-Indicator Confluence (81 - 90)
  if (cat === 9) {
    return `  Take-Profit Target ------------------------------------------------ [TP: 1:3 RRR]
                                       |
                                    [GREEN]
                                       |
  Price Action          |              |
                      [RED]         [GREEN] <--- BUY ENTRY (Confluence Confirmed)
                        |              |
  200 EMA (Bullish Trend Baseline) ~~~~/~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Stop-Loss (SL) ----------------------------------------------------
  ===================================================================
  RSI (14) > 50 (Bullish Momentum) & Stochastic %K > %D Bullish Cross`;
  }

  // Category 10: Advanced SMC / ICT (91 - 100)
  if (cat === 10) {
    if (eng.includes('bearish order block') || eng.includes('liquidity run high')) {
      return `  Buy-Side Liquidity (BSL) ----- [SWEEP] <--- Trapped Retail Buyers
                                           |
  Stop-Loss (SL) --------------------------|-------------------------
  Bearish Order Block [==== OB ====] ------|-------------------------
                                         [RED] <--- SELL ENTRY (OB Mitigation)
                                           |
  Market Structure Shift (MSS) ------------|-------------------------
                                           |
  Sell-Side Liquidity (SSL / TP) ----------|------------------------- [TP: Equal Lows]
                                         [RED]`;
    }
    // Bullish SMC (Liquidity Sweep -> MSS -> Bullish Order Block / FVG)
    return `  Buy-Side Liquidity (BSL / TP) ------------------------------------- [TP Target: Equal Highs]
                                               |
                                            [GREEN]
                                               |
  Market Structure Shift (MSS) ----------------|---------------------
                                |              |
                             [GREEN] (Impulse) |
                                |              |
  Bullish Order Block [== OB ==]|--------------|---------------------
         |                      |           [GREEN] <--- BUY ENTRY (OB Mitigation)
       [RED]                    |              |
  Sell-Side Liquidity (SSL) ----|--------------|---------------------
                                |              |
  Liquidity Sweep ---------- [SWEEP]           |
  Stop-Loss (SL) ---------------|------------------------------------
                                | <--- Trapped Retail Sellers Hunted`;
  }

  // Default Fallback
  return `  Resistance Line (TP Target) --------------------------------------- [TP: 1:3 RRR]
                          |                   |
                        [RED]               [RED]  <-- Rejection Candle
                          |                   |
  Support Line -------------------------------|----------------------
         |                     |              |
      [GREEN]               [GREEN] <--- BUY ENTRY HERE (Green Close)
         |                     |
  Stop-Loss (SL) ----------------------------------------------------`;
}
