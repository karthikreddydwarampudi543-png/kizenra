import { useState, useEffect } from "react";

export default function SaraAI({ theme = "dark", goTo }) {
  const isLight = theme === "light";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "initial-1",
      type: "user",
      text: "What should I create next?",
    },
    {
      id: "initial-2",
      type: "sara",
      text: "Based on your channel comments across YouTube and Instagram, your audience is repeatedly asking for a deep dive into AI agent workflows.",
    },
    {
      id: "initial-3",
      type: "sara",
      text: "I recommend structuring it as: 'How I Built My AI Agent Workflow in 2026' with a high-contrast thumbnail. That query is currently trending in Search Intelligence (+24% search volume).",
    },
  ]);

  /* Detect pre-loaded prompt from Pre-Publish or other modules */
  useEffect(() => {
    const prefill = localStorage.getItem("kizenra_sara_prompt");
    if (prefill) {
      localStorage.removeItem("kizenra_sara_prompt");

      // Extract title and hook if present
      const titleMatch = prefill.match(/Title:\s*"([^"]+)"/);
      const hookMatch = prefill.match(/Script Opening:\s*"([^"]+)"/);
      const extractedTitle = titleMatch ? titleMatch[1] : "your video";
      const extractedHook = hookMatch ? hookMatch[1] : "";

      const userMsgId = "user-" + Date.now();
      const saraMsgId = "sara-" + Date.now();

      const userMsg = {
        id: userMsgId,
        type: "user",
        text: `Sara, help me diagnose and rewrite this hook for maximum retention: \n\n📌 Title: "${extractedTitle}"\n🎙️ Script: "${extractedHook.slice(0, 160)}..."`,
      };

      const saraResponse = {
        id: saraMsgId,
        type: "sara",
        isHookConsultation: true,
        title: extractedTitle,
        diagnosis: "I ran your script through our attention retention model. The main issue is preamble delay: viewers decide in seconds 0-4 whether to swipe away. Any generic welcome greeting creates an immediate -35% drop-off.",
        options: [
          {
            title: "Option 1: The Curiosity Gap (Recommended)",
            badge: "+24% Retention",
            hook: `99% of creators get ${extractedTitle.replace(/10|best|tools|guide/gi, "").trim() || "this"} completely backwards. In the next 30 seconds, I'm going to show you the exact framework that changes everything.`,
          },
          {
            title: "Option 2: The Contrarian Pattern Interrupt",
            badge: "+28% Retention",
            hook: `Stop listening to standard advice about ${extractedTitle.replace(/10|best|tools|guide/gi, "").trim() || "this topic"} in 2026. The data shows doing the opposite produces 3x faster results. Watch this.`,
          },
          {
            title: "Option 3: Direct-Value Speedrun",
            badge: "+19% Retention",
            hook: `I tested every single strategy for ${extractedTitle.replace(/10|best|tools|guide/gi, "").trim() || "this problem"} so you don't have to. Here are the 3 crucial rules you can use before this video ends.`,
          },
        ],
      };

      setMessages((prev) => [...prev, userMsg, saraResponse]);
    }
  }, []);

  /* Send Message Engine */
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || message).trim();
    if (!query) return;

    const userMessage = {
      id: "user-" + Date.now(),
      type: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate intelligent contextual response
    window.setTimeout(() => {
      let replyText = "";
      const lower = query.toLowerCase();

      if (lower.includes("title") || lower.includes("ctr")) {
        replyText = `Here are 4 high-CTR title formulas optimized for algorithmic click velocity:
1. "The [Topic] Strategy Nobody Talks About in 2026" (Curiosity)
2. "How I Automated 80% of [Topic] (No Code Blueprint)" (Direct Payoff)
3. "Stop Doing [Topic] Like This (Do This Instead)" (Pattern Interrupt)
4. "Why 95% of Creators Fail at [Topic] in 2026" (Fear of Missing Out)`;
      } else if (lower.includes("hook") || lower.includes("retention") || lower.includes("drop")) {
        replyText = `To protect your 0-15s retention curve:
• Rule 1: Never say 'Hey guys' or ask for likes in the first 30 seconds.
• Rule 2: Deliver the first visual pattern interrupt at 0:03 (text pop, sound whoosh, or camera zoom).
• Rule 3: Reiterate the exact promise of your title before second 0:10 so viewers know they weren't clickbaited.`;
      } else if (lower.includes("schedule") || lower.includes("time") || lower.includes("post")) {
        replyText = `Based on your connected audience telemetry:
• YouTube Long-Form: Today between 6:30 PM – 8:00 PM (optimal peak viewership).
• Instagram Reels: 12:30 PM (lunchtime browse) & 7:15 PM.
• Facebook Video: Weekdays at 11:00 AM (workplace auto-play feed).
You can send your draft straight to the Smart Scheduler from Pre-Publish!`;
      } else if (lower.includes("comment") || lower.includes("audience")) {
        replyText = `Your audience sentiment index is currently 91% positive. The top 3 recurring questions in your comments are:
1. "What gear or AI software are you using?" (Asked 42 times)
2. "Can you make a beginner-friendly part 2?" (Asked 28 times)
3. "Where can I get the template?" (Asked 19 times)`;
      } else {
        replyText = `Based on your cross-platform metrics, your channel is in a strong algorithmic velocity bracket (+18.6% reach this month). I suggest focusing on short-to-long form funneling: use high-retention 45s Shorts to direct traffic to your in-depth guide.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "sara-" + Date.now(),
          type: "sara",
          text: replyText,
        },
      ]);
    }, 600);
  };

  /* Apply Hook and return to Pre-Publish */
  const handleApplyHookToPrePublish = (hookText) => {
    localStorage.setItem("kizenra_applied_hook", hookText);
    if (typeof goTo === "function") {
      goTo("Pre-Publish");
    } else {
      alert("✓ Applied hook! Return to Pre-Publish to see the updated curve.");
    }
  };

  const handleSendToScheduler = (titleText) => {
    localStorage.setItem("kizenra_scheduler_title", titleText || "Optimized Creator Video");
    if (typeof goTo === "function") {
      goTo("Smart Scheduler");
    } else {
      alert("✓ Saved to Smart Scheduler!");
    }
  };

  return (
    <div className={`min-h-screen px-4 py-8 sm:px-8 transition-colors duration-300 ${isLight ? "bg-[#f8f9fa] text-gray-900" : "bg-[#050505] text-white"}`}>
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
                Autonomous Creator Copilot
              </span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              Sara AI
            </h1>
            <p className={`mt-1 text-sm ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Your conversational strategist for script rewriting, retention diagnosis, and algorithmic optimization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Intelligence Online
            </span>
          </div>
        </div>

        {/* CHAT CONTAINER */}
        <div className={`rounded-3xl border p-5 sm:p-7 shadow-2xl backdrop-blur-xl ${isLight ? "bg-white border-gray-200 shadow-gray-200" : "bg-[#090909] border-white/10"}`}>
          
          {/* SARA STATUS BAR */}
          <div className="flex items-center justify-between border-b pb-4 border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-lg text-white shadow-md shadow-purple-600/30">
                ✦
              </div>
              <div>
                <p className="text-sm font-bold">Sara</p>
                <p className={`text-[11px] ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                  Connected to YouTube, Instagram & Focus Group Telemetry
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessages([
                  {
                    id: "reset-1",
                    type: "sara",
                    text: "Conversation refreshed. Ask me anything about your hooks, channel analytics, or content schedule!",
                  },
                ]);
              }}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition ${isLight ? "text-gray-500 hover:bg-gray-100" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              Clear Chat
            </button>
          </div>

          {/* MESSAGES LIST */}
          <div className="max-h-[540px] min-h-[350px] space-y-5 overflow-y-auto py-6 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.type === "user"
                      ? isLight
                        ? "border border-gray-200 bg-gray-100 text-gray-900"
                        : "border border-white/10 bg-white/[0.04] text-gray-200"
                      : isLight
                      ? "border border-purple-200 bg-purple-50/80 text-gray-900"
                      : "border border-purple-500/20 bg-purple-950/20 text-purple-100"
                  }`}
                >
                  {/* Standard Text Message */}
                  {msg.text && (
                    <div className="whitespace-pre-line text-xs sm:text-sm">
                      {msg.text}
                    </div>
                  )}

                  {/* Rich Hook Doctor Consultation Card */}
                  {msg.isHookConsultation && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3">
                        <p className="text-xs font-bold text-purple-300">
                          🩺 Hook Retention Diagnosis
                        </p>
                        <p className="mt-1 text-xs text-gray-300">
                          {msg.diagnosis}
                        </p>
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        ✨ 3 Optimized Script Rewrites for Your Video:
                      </p>

                      <div className="space-y-3">
                        {msg.options.map((opt, idx) => (
                          <div
                            key={idx}
                            className={`rounded-xl border p-3 transition ${
                              isLight ? "bg-white border-gray-200" : "bg-black/30 border-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-purple-300">{opt.title}</span>
                              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                                {opt.badge}
                              </span>
                            </div>
                            <p className="mt-2 text-xs italic text-gray-200">
                              "{opt.hook}"
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleApplyHookToPrePublish(opt.hook)}
                                className="rounded-lg bg-purple-600 px-3 py-1 text-[11px] font-bold text-white transition hover:bg-purple-500"
                              >
                                ✓ Apply & Back to Simulator
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-[11px] text-gray-400">
                          Ready to post instead?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSendToScheduler(msg.title)}
                          className="text-[11px] font-bold text-purple-400 hover:underline"
                        >
                          📅 Schedule Video in Smart Scheduler ➜
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>

          {/* INPUT BAR */}
          <div className="border-t pt-4 border-white/10">
            <div className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 transition ${
              isLight
                ? "bg-gray-50 border-gray-200 focus-within:border-purple-500 focus-within:bg-white"
                : "bg-white/[0.03] border-white/10 focus-within:border-purple-500/40 focus-within:bg-white/[0.05]"
            }`}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Ask Sara to rewrite a hook, brainstorm titles, or analyze your schedule..."
                className="flex-1 bg-transparent text-xs sm:text-sm outline-none placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white font-bold transition hover:bg-purple-500"
              >
                →
              </button>
            </div>

            {/* QUICK STRATEGY CHIPS */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className={`text-[10px] uppercase font-bold mr-1 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                Quick Prompts:
              </span>
              {[
                "⚡ Fix my 0-15s hook drop",
                "🎯 Generate 4 high-CTR titles",
                "📈 When should I post this week?",
                "💬 What are viewers asking in comments?",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                    isLight
                      ? "border-gray-200 bg-gray-50 text-gray-700 hover:bg-purple-50 hover:border-purple-300"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
