
import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const TRADING_SYSTEM_INSTRUCTION = `
You are an expert financial market trader, price action specialist, and co-author of a published premium trading e-book.
Your goal is to write clean, elegant, publication-ready trading book content strictly formatted in Bengali.

CRITICAL FORMAT RULES:
Format every strategy with the exact premium layout:

================================================================================
CHAPTER HEADER: [ক্যাটাগরি বা মডিউলের নাম] | STRATEGY NO. [নম্বর]
================================================================================

# [কৌশলের নাম]

> **📘 চ্যাপ্টার সারসংক্ষেপ:** 
> [১-২ বাক্যে ট্রেডটির মূল কনসেপ্ট এবং সাইকোলজি নিয়ে একটি আকর্ষণীয় ভূমিকা]

---

## 📌 ১. মার্কেট সাইকোলজি ও মেকানিক্স (Psychology & Logic)
[মার্কেট মেকানিক্স, বায়ার-সেলার যুদ্ধ এবং ক্যান্ডেলস্টিক সাইকোলজির বিশদ ব্যাখ্যা]

---

## ⚙️ ২. চার্ট সেটআপ ও প্যারামিটার (Chart Setup)
| প্যারামিটার (Parameter) | স্পেসিফিকেশন (Specification) |
| :--- | :--- |
| **টাইমফ্রেম** | [টাইমফ্রেম] |
| **ক্যান্ডেলস্টিক প্রকার** | রেড (বিয়ারিশ) এবং গ্রিন (বুলিশ) |
| **ইন্ডিকেটর/লেভেল** | [ইন্ডিকেটরসমূহ] |

---

## 🎯 ৩. ট্রেড এক্সিকিউশন রুলস (Execution Rules)

### 🟢 বাই ট্রেড রুলস (Bullish Setup)
1. **কন্ডিশন ১:** [শর্ত ১]
2. **কন্ডিশন ২:** [শর্ত ২]
3. **এন্ট্রি পয়েন্ট:** [গ্রিন ক্যান্ডেল ক্লোজের পর]

### 🔴 সেল ট্রেড রুলস (Bearish Setup)
1. **কন্ডিশন ১:** [শর্ত ১]
2. **কন্ডিশন ২:** [শর্ত ২]
3. **এন্ট্রি পয়েন্ট:** [রেড ক্যান্ডেল ক্লোজের পর]

---

## 🛡️ ৪. রিস্ক ম্যানেজমেন্ট (SL, TP & Risk)
* 🛑 **স্টপ-লস (SL):** [স্টপ-লস নিয়ম]
* 🎯 **টেক-প্রফিট (TP):** [টেক-প্রফিট নিয়ম]

> 💡 **প্রো-টিপস (Trader's Pro-Tip):**
> [অভিজ্ঞ ট্রেডারদের মূল্যবান ইনসাইট]

> ⚠️ **কখন ট্রেড এড়িয়ে চলবেন (Warning Trap):**
> [ফেকআউট ও ফাঁদ থেকে বাঁচার নির্দেশিকা]

---

## 📊 ৫. ভিজ্যুয়াল ক্যান্ডেলস্টিক চার্ট (Mermaid Visual Chart)
\`\`\`mermaid
graph TD
    classDef red fill:#fee2e2,stroke:#ef4444,stroke-width:2px,color:#991b1b;
    classDef green fill:#dcfce7,stroke:#22c55e,stroke-width:2px,color:#166534;
    classDef level fill:#f1f5f9,stroke:#64748b,stroke-width:2px,stroke-dasharray: 4 4,color:#1e293b;
    classDef action fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#92400e;
\`\`\`
`;

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: "paperback_candlestick_book" });
});

// Endpoint to generate trading strategies
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { strategyName, englishName, moduleName, timeframe, difficulty } = req.body;

    if (!strategyName) {
      return res.status(400).json({ error: "strategyName is required" });
    }

    const ai = getGeminiClient();

    const prompt = `
Write strategy #${req.body.number || 1}: "${strategyName}" (${englishName || ''}) in fluent, natural Bengali.
Module: ${moduleName || 'প্রাইস অ্যাকশন'}
Timeframe: ${timeframe || '১৫ মিনিট বা ১ ঘণ্টা'}

Strictly follow the required paperback template with ■ headers and Green/Red candle entry definitions. Do not include any markdown codeblocks or ASCII borders.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: TRADING_SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    const generatedText = response.text || "";

    res.json({
      success: true,
      strategyName,
      englishName,
      content: generatedText,
    });
  } catch (error: any) {
    console.error("Strategy generation error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate strategy content",
    });
  }
});

// Vite middleware / static files
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Paperback Trading Book server running on port ${PORT}`);
  });
}

setupVite();
