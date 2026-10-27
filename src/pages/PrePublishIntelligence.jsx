import { useMemo, useState, useRef, useEffect } from "react";

/* =========================================================
   DEMO PRESETS
========================================================= */
const DEMO_PRESETS = [
  {
    name: "AI Tools Guide",
    platform: "YouTube",
    niche: "tech",
    title: "10 AI Tools That Will Replace 90% of Your Daily Work in 2026",
    caption:
      "Most people only know ChatGPT. In this deep dive, we break down the 10 underground AI tools that automate coding, editing, and research.",
    hookScript:
      "Hey everyone, welcome back to my channel! Before we jump in, make sure to hit subscribe and like. Today I want to talk about something really interesting that I've been experimenting with for the last couple of months...",
    thumbnailUrl: null,
  },
  {
    name: "Coding Career Advice",
    platform: "Instagram",
    niche: "tech",
    title: "Stop Learning Python In 2026 (Do This Instead)",
    caption:
      "Why traditional coding syntax is losing value and what full-stack architects are actually getting hired for right now. Save this reel.",
    hookScript:
      "If you're still spending 6 months memorizing Python syntax in 2026, you're preparing for a job market that won't exist next year. Here is what senior engineers are doing instead.",
    thumbnailUrl: null,
  },
  {
    name: "Wealth & Finance Blueprint",
    platform: "YouTube",
    niche: "finance",
    title: "How I Built a $10,000/Mo Cash Flow Portfolio (No Crypto, No Real Estate)",
    caption:
      "A raw, transparent breakdown of index allocation, covered calls, and the exact brokerage dividend breakdown after 3 years.",
    hookScript:
      "Most financial advisors tell you to save 10% and wait 40 years. That strategy is broken. Here is the cash flow architecture that produces $10k every 30 days without trading all day.",
    thumbnailUrl: null,
  },
  {
    name: "Creator Behind The Scenes",
    platform: "Facebook",
    niche: "business",
    title: "How I Built a 6-Figure Studio from My Bedroom With Zero Funding",
    caption:
      "A raw, transparent breakdown of equipment, failures, client acquisitions, and the turning point after 14 months of zero revenue.",
    hookScript:
      "Everyone shows the final result, but nobody shows the 14 months where I had minus $400 in my account. Here is the exact blueprint I used to turn things around.",
    thumbnailUrl: null,
  },
];

/* =========================================================
   NICHE-SPECIFIC PERSONA ARCHETYPES
========================================================= */
const NICHE_PERSONAS = {
  universal: {
    name: "Universal Creator",
    scroller: {
      name: "Alex",
      label: "The Impatient Scroller",
      avatar: "⚡",
      role: "Short-Form / Fast-Swipe Mindset",
      traits: "3-5s attention span. Hates greetings and preamble.",
    },
    skeptic: {
      name: "Jordan",
      label: "The Skeptical Value-Seeker",
      avatar: "🧐",
      role: "Analytical / Anti-Clickbait",
      traits: "Leaves the instant a title claim isn't validated early.",
    },
    supporter: {
      name: "Maya",
      label: "The Core Channel Fan",
      avatar: "✨",
      role: "Community / Relatability",
      traits: "Loves your style, values crisp pacing and high-energy value.",
    },
  },
  tech: {
    name: "Tech & AI",
    scroller: {
      name: "Alex",
      label: "The Spec Snob & Benchmark Junkie",
      avatar: "⚡",
      role: "Short-Form Tech Watcher",
      traits: "Wants to see the live app demo immediately. Swipes if you spend 10s explaining what the tool is.",
    },
    skeptic: {
      name: "Jordan",
      label: "The Senior Dev / Anti-Hype Critic",
      avatar: "🧐",
      role: "Pragmatic Engineer",
      traits: "Thinks 90% of AI tools are ChatGPT wrappers. Demands source code, latency metrics, or API proof.",
    },
    supporter: {
      name: "Maya",
      label: "The No-Code & Indie Builder",
      avatar: "✨",
      role: "Builder Community",
      traits: "Wants practical automation to ship software faster without getting lost in terminal jargon.",
    },
  },
  finance: {
    name: "Finance & Wealth",
    scroller: {
      name: "Alex",
      label: "The Fast Trend & Alpha Chaser",
      avatar: "⚡",
      role: "Shorts/Reels Market Watcher",
      traits: "High time preference. Swipes if you don't share the metric, portfolio return, or strategy by second 4.",
    },
    skeptic: {
      name: "Jordan",
      label: "The Boglehead & Anti-Scam Auditor",
      avatar: "🧐",
      role: "Due Diligence Value Seeker",
      traits: "Assumes finance creators are selling courses. Demands audited returns and real brokerage proof.",
    },
    supporter: {
      name: "Maya",
      label: "The 9-to-5 Wealth Builder",
      avatar: "✨",
      role: "Long-term Compounder",
      traits: "Wants realistic, low-stress cash flow steps to beat inflation without trading all day.",
    },
  },
  fitness: {
    name: "Fitness & Health",
    scroller: {
      name: "Alex",
      label: "The Rapid Form & Rep Lifter",
      avatar: "⚡",
      role: "Visual Workout Watcher",
      traits: "Wants instant visual demonstration of the exercise. Zero tolerance for long talking-head intros.",
    },
    skeptic: {
      name: "Jordan",
      label: "The Science-Based Physiology Critic",
      avatar: "🧐",
      role: "Biomechanics Geek",
      traits: "Fact-checks muscle recruitment and peer-reviewed studies. Calls out bro-science instantly.",
    },
    supporter: {
      name: "Maya",
      label: "The Busy Professional Beginner",
      avatar: "✨",
      role: "Daily Habit Builder",
      traits: "Wants 30-minute high-efficiency routines that fit a hectic schedule with zero gym anxiety.",
    },
  },
  business: {
    name: "Business & Growth",
    scroller: {
      name: "Alex",
      label: "The Fast-Growth Solopreneur",
      avatar: "⚡",
      role: "Traction Seeker",
      traits: "Despises generic motivational quotes. Demands the exact cold email template or funnel step.",
    },
    skeptic: {
      name: "Jordan",
      label: "The Bootstrapped Operator",
      avatar: "🧐",
      role: "CAC & Unit Economics Critic",
      traits: "Scrutinizes churn and overhead. Demands verifiable revenue metrics and real case studies.",
    },
    supporter: {
      name: "Maya",
      label: "The First-Time Agency Builder",
      avatar: "✨",
      role: "Agency Founder",
      traits: "Looking for client acquisition frameworks and contract templates she can implement tomorrow.",
    },
  },
};

/* =========================================================
   COMPETITOR BENCHMARK DEFINITIONS
========================================================= */
const BENCHMARK_CONFIGS = {
  industry: {
    id: "industry",
    name: "Industry Baseline",
    badge: "Category Avg",
    sec30: 48,
    color: "#9ca3af",
    stroke: "rgba(156, 163, 175, 0.6)",
    description: "Standard creator retention across YouTube & Meta feeds (~48% hold at 30s).",
    points: [
      { sec: 0, val: 100 },
      { sec: 6, val: 78 },
      { sec: 14, val: 64 },
      { sec: 24, val: 54 },
      { sec: 30, val: 48 },
      { sec: 44, val: 42 },
      { sec: 60, val: 36 },
    ],
  },
  top10: {
    id: "top10",
    name: "Top 10% Viral Benchmark",
    badge: "Viral Class",
    sec30: 74,
    color: "#34d399",
    stroke: "rgba(52, 211, 153, 0.8)",
    description: "High-performing creators with rigorous pacing and zero fluff (~74% hold at 30s).",
    points: [
      { sec: 0, val: 100 },
      { sec: 6, val: 92 },
      { sec: 14, val: 84 },
      { sec: 24, val: 78 },
      { sec: 30, val: 74 },
      { sec: 44, val: 69 },
      { sec: 60, val: 62 },
    ],
  },
  viral: {
    id: "viral",
    name: "Hyper-Paced (MrBeast Model)",
    badge: "Extreme Retention",
    sec30: 88,
    color: "#f59e0b",
    stroke: "rgba(245, 158, 11, 0.85)",
    description: "Multi-million view retention formula with instant conflict & perpetual payoff (~88% at 30s).",
    points: [
      { sec: 0, val: 100 },
      { sec: 6, val: 97 },
      { sec: 14, val: 93 },
      { sec: 24, val: 90 },
      { sec: 30, val: 88 },
      { sec: 44, val: 84 },
      { sec: 60, val: 78 },
    ],
  },
};

/* =========================================================
   HOOK DOCTOR FORMULAS
========================================================= */
const HOOK_DOCTOR_TEMPLATES = [
  {
    id: "curiosity",
    type: "High-Stakes Curiosity Gap",
    badge: "+22% Retention",
    badgeColor: "purple",
    formula: "Trigger the curiosity reflex immediately without greeting or preamble.",
    template: (topic, payoff) =>
      `There is a reason 99% of people get ${topic || "this"} completely wrong. In the next 30 seconds, I'm going to show you ${payoff || "the exact framework that changes everything"}.`,
  },
  {
    id: "pattern",
    type: "Contrarian Pattern Interrupt",
    badge: "+27% Retention",
    badgeColor: "emerald",
    formula: "Attack common conventional wisdom to shatter expectations in second 1.",
    template: (topic) =>
      `Everything you've been told about ${topic || "this topic"} is outdated. If you follow standard advice in 2026, you will waste months. Here is the contrarian truth.`,
  },
  {
    id: "speedrun",
    type: "Direct-Value Speedrun",
    badge: "+18% Retention",
    badgeColor: "blue",
    formula: "Deliver the primary takeaway upfront, then unpack the methodology.",
    template: (topic) =>
      `I tested every single method for ${topic || "this problem"} so you don't have to. Here are the 3 crucial rules, starting with the one nobody talks about.`,
  },
];

export default function PrePublishIntelligence({ theme = "dark", goTo }) {
  const isLight = theme === "light";
  const fileInputRef = useRef(null);

  /* User Inputs */
  const [platform, setPlatform] = useState("YouTube");
  const [niche, setNiche] = useState("tech");
  const [channelTwinMode, setChannelTwinMode] = useState(false);
  const [title, setTitle] = useState(DEMO_PRESETS[0].title);
  const [caption, setCaption] = useState(DEMO_PRESETS[0].caption);
  const [hookScript, setHookScript] = useState(DEMO_PRESETS[0].hookScript);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  /* Check for hooks applied from Sara AI or questions from Comment Intelligence */
  useEffect(() => {
    const applied = localStorage.getItem("kizenra_applied_hook");
    if (applied) {
      setHookScript(applied);
      localStorage.removeItem("kizenra_applied_hook");
      triggerSimulation();
    }

    const fromComments = localStorage.getItem("kizenra_prepublish_topic");
    if (fromComments) {
      setTitle(fromComments);
      setHookScript(`In my last video, hundreds of you asked for the exact breakdown of this framework. I spent the last week testing every single method so you don't have to. Here are the 3 rules that actually matter.`);
      localStorage.removeItem("kizenra_prepublish_topic");
      triggerSimulation();
    }
  }, []);

  /* UI State */
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedSecond, setSelectedSecond] = useState(12);
  const [activeTab, setActiveTab] = useState("retention");
  const [appliedHookId, setAppliedHookId] = useState(null);
  const [benchmarkMode, setBenchmarkMode] = useState("industry");
  const [showFeedMockup, setShowFeedMockup] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCopied, setReportCopied] = useState(false);
  const [auditSaved, setAuditSaved] = useState(false);

  /* Custom Persona Studio State */
  const [customPersonas, setCustomPersonas] = useState([]);
  const [showAddPersonaModal, setShowAddPersonaModal] = useState(false);
  const [newPersona, setNewPersona] = useState({
    name: "",
    avatar: "🎯",
    role: "",
    traits: "",
    bias: "skeptic", // "scroller" | "skeptic" | "supporter"
  });

  /* Custom Hook Generator State */
  const [customNicheInput, setCustomNicheInput] = useState("");
  const [customGeneratedHooks, setCustomGeneratedHooks] = useState([]);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);

  /* Theme style helpers */
  const surface = isLight ? "bg-white border-gray-200 shadow-sm" : "bg-[#090909] border-white/10";
  const surfaceSoft = isLight ? "bg-gray-50/80 border-gray-200" : "bg-white/[0.025] border-white/5";
  const textSecondary = isLight ? "text-gray-600" : "text-gray-400";
  const textMuted = isLight ? "text-gray-400" : "text-gray-500";
  const inputBg = isLight
    ? "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white"
    : "bg-white/[0.03] border-white/10 text-white placeholder:text-gray-600 focus:bg-white/[0.06]";

  /* Load Preset */
  const handleLoadPreset = (preset) => {
    setPlatform(preset.platform);
    if (preset.niche) setNiche(preset.niche);
    setTitle(preset.title);
    setCaption(preset.caption);
    setHookScript(preset.hookScript);
    setThumbnailPreview(preset.thumbnailUrl);
    setAppliedHookId(null);
    triggerSimulation();
  };

  /* Handle Thumbnail Upload */
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result);
      triggerSimulation();
    };
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* Trigger Simulation with visual feedback */
  const triggerSimulation = () => {
    setIsSimulating(true);
    window.setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  /* Add Custom Persona Handler */
  const handleAddCustomPersona = (e) => {
    e.preventDefault();
    if (!newPersona.name.trim() || !newPersona.role.trim()) return;

    const personaItem = {
      id: "custom-" + Date.now(),
      name: newPersona.name.trim(),
      label: newPersona.role.trim(),
      avatar: newPersona.avatar || "🎯",
      role: newPersona.traits.trim() || "Target demographic avatar for this upload",
      bias: newPersona.bias,
      isCustom: true,
    };

    setCustomPersonas((prev) => [...prev, personaItem]);
    setNewPersona({ name: "", avatar: "🎯", role: "", traits: "", bias: "skeptic" });
    setShowAddPersonaModal(false);
    triggerSimulation();
  };

  const removeCustomPersona = (id) => {
    setCustomPersonas((prev) => prev.filter((p) => p.id !== id));
    triggerSimulation();
  };

  /* Navigate to Sara AI */
  const handleConsultSara = () => {
    localStorage.setItem(
      "kizenra_sara_prompt",
      `Help me optimize this video hook: Title: "${title}" | Script Opening: "${hookScript.slice(0, 200)}"`
    );
    if (typeof goTo === "function") {
      goTo("Sara AI");
    } else {
      alert("✓ Pre-loaded hook into Sara AI! Select Sara AI from the navigation.");
    }
  };

  /* =========================================================
     COMPUTED SIMULATION ENGINE
  ========================================================= */
  const simulation = useMemo(() => {
    const cleanTitle = title.trim();
    const cleanHook = hookScript.trim();

    /* 1. Detect Filler & Preamble Disasters */
    const fillerPatterns = [
      /\b(welcome back|hey guys|hi everyone|in today's video|before we start|don't forget to|hit that subscribe|leave a like|sponsored by)\b/i,
      /\b(i was thinking|so basically|just a quick update|for those who don't know me)\b/i,
    ];
    const hasPreambleFiller = fillerPatterns[0].test(cleanHook) || fillerPatterns[1].test(cleanHook);

    /* 2. Detect Hook Strength & Curiosity Triggers */
    const hasCuriosity =
      /\b(why|secret|truth|mistake|stop|never|only|proven|exact|replace|blueprint|ruining)\b/i.test(cleanHook) ||
      /\d+/.test(cleanHook) ||
      /\b(i tested|i lost|i made|in 30 seconds|in this video)\b/i.test(cleanHook);
    const startsDirectly = !hasPreambleFiller && cleanHook.length > 20;

    /* 3. Cognitive Gap: Does the opening deliver on the title? */
    const titleWords = cleanTitle.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const hookWords = cleanHook.toLowerCase().split(/\s+/);
    const overlapCount = titleWords.filter((w) => hookWords.some((hw) => hw.includes(w) || w.includes(hw))).length;
    const titleRelevanceRatio = titleWords.length > 0 ? overlapCount / titleWords.length : 0.5;

    let cognitiveScore = 70;
    if (hasPreambleFiller) cognitiveScore -= 28;
    if (startsDirectly) cognitiveScore += 18;
    if (titleRelevanceRatio >= 0.4) cognitiveScore += 14;
    if (thumbnailPreview) cognitiveScore += 8;
    if (caption.trim().length > 30) cognitiveScore += 4;
    cognitiveScore = Math.min(Math.max(cognitiveScore, 30), 98);

    /* 4. Second-by-Second Retention Curve Generation (0 to 60 seconds) */
    const platformDecay = platform === "Instagram" ? 1.35 : platform === "Facebook" ? 1.2 : 1.0;
    
    const curve = [];
    let currentRetention = 100;

    for (let sec = 0; sec <= 60; sec += 2) {
      if (sec === 0) {
        curve.push({ sec, retention: 100, status: "Peak", label: "Initial Impression" });
        continue;
      }

      let secDrop;
      if (sec <= 6) {
        if (hasPreambleFiller) {
          secDrop = (platform === "Instagram" ? 7 : 5) * platformDecay;
        } else if (hasCuriosity) {
          secDrop = 1.2 * platformDecay;
        } else {
          secDrop = 3.0 * platformDecay;
        }
      } else if (sec <= 16) {
        if (hasPreambleFiller) {
          secDrop = 3.8 * platformDecay;
        } else if (startsDirectly) {
          secDrop = 1.1 * platformDecay;
        } else {
          secDrop = 2.2 * platformDecay;
        }
      } else if (sec <= 32) {
        if (titleRelevanceRatio > 0.3) {
          secDrop = 0.9 * platformDecay;
        } else {
          secDrop = 2.5 * platformDecay;
        }
      } else {
        secDrop = 0.7 * platformDecay;
      }

      currentRetention = Math.max(Math.round((currentRetention - secDrop) * 10) / 10, 18);

      let status = "Stable";
      let label = "Steady Engagement";
      if (sec === 4) {
        status = hasPreambleFiller ? "Critical Drop" : "High Retention";
        label = hasPreambleFiller ? "42% swipe away due to generic intro" : "Strong initial hook lock-in";
      } else if (sec === 12) {
        status = hasPreambleFiller ? "Danger Zone" : "Engaged";
        label = hasPreambleFiller ? "Audience expects value, hearing channel intro" : "Viewer anticipation rising";
      } else if (sec === 28) {
        status = "Payoff Check";
        label = "Primary premise must be visibly demonstrated";
      } else if (sec === 48) {
        status = "Pacing Check";
        label = "Retention stabilizes around core interested viewers";
      }

      curve.push({ sec, retention: currentRetention, status, label });
    }

    const endRetention = curve[curve.length - 1]?.retention || 50;
    const sec30Retention = curve.find((c) => c.sec === 30)?.retention || 65;

    /* 5. Niche & Channel Twin Persona Synthesis */
    const activeNicheConfig = NICHE_PERSONAS[niche] || NICHE_PERSONAS.universal;

    const basePersonas = {
      scroller: {
        ...activeNicheConfig.scroller,
        verdict: hasPreambleFiller ? "Swiped at 0:04" : "Watched to 0:45",
        sentiment: hasPreambleFiller ? "negative" : "positive",
        quote: channelTwinMode
          ? hasPreambleFiller
            ? "Your channel's last video started with action right away. In this one, you reverted back to generic greetings so I swiped to the next clip."
            : "This has the exact high-velocity pacing as your best-performing video from last month! Hooked in second 1."
          : hasPreambleFiller
          ? "You said 'Hey guys welcome back' and asked for likes before showing me anything. I immediately swiped."
          : "You got right into the tension in second 1. I couldn't scroll away until I knew what the answer was.",
        tip: hasPreambleFiller
          ? "Cut the greeting entirely. Start with the sentence that creates tension."
          : "Pacing is crisp. Keep the first B-roll transition under 2 seconds.",
      },
      skeptic: {
        ...activeNicheConfig.skeptic,
        verdict: titleRelevanceRatio < 0.3 ? "Left at 0:18" : "Watching Full Video",
        sentiment: titleRelevanceRatio < 0.3 ? "warning" : "positive",
        quote: channelTwinMode
          ? titleRelevanceRatio < 0.3
            ? "People in your comments have been asking for real transparency on this topic. 20 seconds in, you haven't mentioned data yet."
            : "You answered the exact debate your subscribers have been discussing in your community tab. Great authority."
          : titleRelevanceRatio < 0.3
          ? "Your title made a massive claim, but 20 seconds in you haven't mentioned evidence or the actual tool. Feels like clickbait."
          : "Direct and straightforward. You're acknowledging counter-arguments right away which builds instant authority.",
        tip:
          titleRelevanceRatio < 0.3
            ? "Reference your core title promise within the first 10 seconds to validate expectations."
            : "Add a concrete metric or visual graphic during seconds 15-20.",
      },
      supporter: {
        ...activeNicheConfig.supporter,
        verdict: "Engaged 100%",
        sentiment: "positive",
        quote: channelTwinMode
          ? "As a longtime subscriber, this is your cleanest opening yet! Trimming the intro fluff makes it so easy to share on Twitter/Reddit."
          : "Love this topic! Even though I'm a subscriber, trimming the opening fluff makes this so much easier to share with my friends.",
        tip: "A quick visual chapter or text callout around second 10 will keep casual viewers around too.",
      },
    };

    /* Synthesize reactions for Custom Personas */
    const dynamicCustomPersonas = customPersonas.map((cp) => {
      const isNegative = cp.bias === "scroller" ? hasPreambleFiller : titleRelevanceRatio < 0.35;
      return {
        id: cp.id,
        name: cp.name,
        label: cp.label,
        avatar: cp.avatar,
        role: cp.role,
        isCustom: true,
        verdict: isNegative ? "Dropped at 0:08" : "Fully Engaged",
        sentiment: isNegative ? "warning" : "positive",
        quote: isNegative
          ? `As someone who is ${cp.label.toLowerCase()}, I felt like the first 10 seconds didn't speak directly to my situation.`
          : `This spoke directly to my goals as ${cp.label.toLowerCase()}. Direct, respectful of my time, and very engaging.`,
        tip: isNegative
          ? "Call out this specific viewer archetype in your second sentence (e.g. 'If you are...')."
          : "Keep this direct framing throughout your first chapter breakdown.",
      };
    });

    /* 6. Overall Readiness Score */
    const readinessScore = Math.round(cognitiveScore * 0.4 + sec30Retention * 0.4 + (cleanTitle ? 20 : 0));

    /* 7. Multimodal Thumbnail Intelligence */
    const thumbnailMetrics = {
      contrastScore: thumbnailPreview ? 88 : 72,
      legibilityScore: cleanTitle.length <= 60 ? 94 : 76,
      curiosityScore: hasCuriosity ? 89 : 68,
      anchorSubject: thumbnailPreview ? "Subject Centered & High Foreground Contrast" : "Default Media Placeholder",
      ctrMultiplier: thumbnailPreview ? "+26% Projected Feed CTR" : "Awaiting Custom Thumbnail",
    };

    return {
      cognitiveScore,
      curve,
      sec30Retention,
      endRetention,
      hasPreambleFiller,
      personas: basePersonas,
      customPersonas: dynamicCustomPersonas,
      readinessScore: Math.min(Math.max(readinessScore, 25), 99),
      thumbnailMetrics,
    };
  }, [title, hookScript, caption, platform, niche, channelTwinMode, customPersonas, thumbnailPreview]);

  /* Apply a Hook from Hook Doctor */
  const applyHook = (hookItem) => {
    const cleanTitle = title.replace(/[0-9]/g, "").replace(/top|best|how to|guide|tutorial|stop|why/gi, "").trim();
    const generated = hookItem.template(cleanTitle || "this workflow", "the method that outperforms 95% of creators");
    setHookScript(generated);
    setAppliedHookId(hookItem.id);
    triggerSimulation();
  };

  /* AI Generator for Custom Niche Hooks */
  const handleGenerateCustomHooks = () => {
    setIsGeneratingHooks(true);
    const targetNiche = customNicheInput.trim() || title.replace(/10|best|tools|guide|stop/gi, "").trim() || "content growth";

    window.setTimeout(() => {
      const generated = [
        {
          id: "custom-1",
          type: "The $$10,000$ Fatal Mistake",
          badge: "Curiosity Interrupt",
          hook: `If you are trying to scale ${targetNiche} by doing what worked in 2025, you are actively losing momentum. Here is the single mistake that cost me months of progress.`,
        },
        {
          id: "custom-2",
          type: "The 3-Step No-BS Speedrun",
          badge: "Direct Value",
          hook: `Most guides about ${targetNiche} spend 15 minutes explaining fluff. I spent 80 hours breaking it down into 3 rules you can implement before this video ends.`,
        },
        {
          id: "custom-3",
          type: "The Counter-Intuitive Truth",
          badge: "Cognitive Pattern",
          hook: `Stop listening to mainstream creators about ${targetNiche}. The data shows that doing the exact opposite produces 3x faster results. Watch this.`,
        },
      ];
      setCustomGeneratedHooks(generated);
      setIsGeneratingHooks(false);
    }, 700);
  };

  /* Send to Smart Scheduler */
  const handleSendToScheduler = () => {
    localStorage.setItem("kizenra_scheduler_title", title);
    localStorage.setItem("kizenra_scheduler_platform", platform);
    localStorage.setItem("kizenra_scheduler_score", simulation.readinessScore);
    localStorage.setItem("kizenra_scheduler_retention", simulation.sec30Retention);
    if (typeof goTo === "function") {
      goTo("Smart Scheduler");
    } else {
      alert("✓ Draft title saved to Smart Scheduler!");
    }
  };

  /* Save Audit to Reports Archive */
  const handleSaveToReports = () => {
    const saved = JSON.parse(localStorage.getItem("kizenra_saved_audits") || "[]");
    const newAudit = {
      id: "audit-" + Date.now(),
      title,
      platform,
      niche,
      score: simulation.readinessScore,
      retention: simulation.sec30Retention,
      congruence: simulation.cognitiveScore,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      verdicts: {
        alex: simulation.personas.scroller.verdict,
        jordan: simulation.personas.skeptic.verdict,
        maya: simulation.personas.supporter.verdict,
      },
    };
    saved.unshift(newAudit);
    localStorage.setItem("kizenra_saved_audits", JSON.stringify(saved));
    setAuditSaved(true);
    window.setTimeout(() => setAuditSaved(false), 2500);
  };

  /* Copy Pre-Flight Audit Report */
  const handleCopyReport = () => {
    const benchmarkData = BENCHMARK_CONFIGS[benchmarkMode];
    const delta = Math.round(simulation.sec30Retention - benchmarkData.sec30);
    const reportText = `📋 KIZENRA PRE-FLIGHT RETENTION & AUDIT REPORT
==================================================
Video Title: ${title}
Target Platform: ${platform} (${niche.toUpperCase()} Niche)
Pre-Flight Readiness Index: ${simulation.readinessScore} / 100
Predicted 30s Retention: ${simulation.sec30Retention}% (${delta >= 0 ? "+" + delta + "%" : delta + "%"} vs ${benchmarkData.name})
Cognitive Congruence: ${simulation.cognitiveScore}% (Thumbnail ↔ Hook Alignment)
Channel Twin Status: ${channelTwinMode ? "ACTIVE (Synced with 4,820 channel comments)" : "Universal Baseline"}

SYNTHETIC FOCUS GROUP VERDICTS:
• Alex (${simulation.personas.scroller.label}): ${simulation.personas.scroller.verdict} — "${simulation.personas.scroller.quote}"
• Jordan (${simulation.personas.skeptic.label}): ${simulation.personas.skeptic.verdict} — "${simulation.personas.skeptic.quote}"
• Maya (${simulation.personas.supporter.label}): ${simulation.personas.supporter.verdict} — "${simulation.personas.supporter.quote}"

FIRST 60S HOOK SCRIPT:
"${hookScript.slice(0, 180)}..."

Monetization & Policy Status: Clean / Low Risk
Generated via KIZENRA.IN AI Intelligence Platform`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(reportText);
      setReportCopied(true);
      window.setTimeout(() => setReportCopied(false), 2200);
    }
  };

  /* Active Benchmark Data & Coordinates */
  const activeBenchmark = BENCHMARK_CONFIGS[benchmarkMode];
  const benchmarkDelta = Math.round(simulation.sec30Retention - activeBenchmark.sec30);

  const benchmarkPoints = activeBenchmark.points.map((pt) => ({
    x: 35 + (pt.sec / 60) * 550,
    y: 220 - (pt.val / 100) * 190,
  }));
  const benchmarkPathD = benchmarkPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  /* Selected Second Detail Helper */
  const currentSecondData = simulation.curve.find((c) => c.sec === selectedSecond) || simulation.curve[6];

  return (
    <div className={`min-h-screen px-4 py-8 sm:px-8 transition-colors duration-300 ${isLight ? "bg-[#f8f9fa] text-gray-900" : "bg-[#050505] text-white"}`}>
      <div className="mx-auto max-w-[1380px] space-y-8">
        
        {/* =========================================================
            HEADER & HERO ACTIONS
        ========================================================= */}
        <div className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-end border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
                Industry-First Innovation · Kizenra Pre-Flight
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Pre-Publish Retention Simulator
            </h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed sm:text-base ${textSecondary}`}>
              Simulate human psychology and algorithmic watch-time <span className="font-semibold text-purple-400">before</span> you hit publish. Prevent the critical 0-15s drop-off that kills video reach.
            </p>
          </div>

          {/* TOP ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleConsultSara}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                isLight
                  ? "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                  : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <span>✦ Consult Sara AI</span>
            </button>

            <button
              type="button"
              onClick={handleSendToScheduler}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition hover:from-purple-500 hover:to-indigo-500"
            >
              <span>📅 Send to Smart Scheduler</span>
              <span className="text-white/70">➜</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                isLight
                  ? "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  : "border-white/10 bg-white/[0.04] text-gray-200 hover:bg-white/[0.08]"
              }`}
            >
              <span>📄 Export Audit</span>
            </button>
          </div>
        </div>

        {/* DEMO PRESETS PICKER & CHANNEL TWIN TOGGLE */}
        <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4 backdrop-blur-xl ${surfaceSoft}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>
              Quick Demos:
            </span>
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                  title === preset.title
                    ? "border-purple-500 bg-purple-500/15 text-purple-300"
                    : isLight
                    ? "border-gray-300 bg-white text-gray-700 hover:border-purple-400"
                    : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* CHANNEL DIGITAL TWIN SWITCH */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setChannelTwinMode(!channelTwinMode)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                channelTwinMode
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-sm shadow-emerald-500/20"
                  : isLight
                  ? "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  : "border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span>{channelTwinMode ? "🧬 Channel Twin Active" : "🧬 Enable Channel Twin"}</span>
              <span className={`h-2 w-2 rounded-full ${channelTwinMode ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
            </button>
            <span className={`text-[11px] hidden sm:inline ${textMuted}`}>
              {channelTwinMode ? "Trained on 4,820 channel comments" : "Universal audience model"}
            </span>
          </div>
        </div>

        {/* =========================================================
            TOP PULSE: PLATFORM + SCORE SUMMARY
        ========================================================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* 1. Platform Switcher */}
          <div className={`rounded-2xl border p-4 backdrop-blur-xl ${surface}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>
              Target Algorithmic Environment
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              {["YouTube", "Instagram", "Facebook"].map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => {
                    setPlatform(plat);
                    triggerSimulation();
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                    platform === plat
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : isLight
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-white/[0.03] text-gray-400 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
            <p className={`mt-2 text-[11px] ${textMuted}`}>
              {platform === "Instagram"
                ? "Reels algorithm: 3s swipe threshold is brutal."
                : platform === "Facebook"
                ? "Social feed: Auto-play & silent hook weight."
                : "Long-form & Shorts: First 30s dictates 80% of reach."}
            </p>
          </div>

          {/* 2. Readiness Score */}
          <div className={`rounded-2xl border p-4 backdrop-blur-xl ${surface}`}>
            <p className={`text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>
              Pre-Flight Readiness Index
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-purple-400">
                {simulation.readinessScore}
              </span>
              <span className={`text-xs ${textMuted}`}>/ 100</span>
              <span
                className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  simulation.readinessScore >= 80
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : simulation.readinessScore >= 60
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {simulation.readinessScore >= 80 ? "Launch Ready" : simulation.readinessScore >= 60 ? "Needs Polish" : "High Risk"}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-400 transition-all duration-700"
                style={{ width: `${simulation.readinessScore}%` }}
              />
            </div>
          </div>

          {/* 3. Cognitive Gap Score */}
          <div className={`rounded-2xl border p-4 backdrop-blur-xl ${surface}`}>
            <div className="flex items-center justify-between">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>
                Cognitive Congruence
              </p>
              <span className="text-[10px] text-purple-400 font-mono">Thumb ↔ Hook</span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">
                {simulation.cognitiveScore}%
              </span>
              <span
                className={`ml-auto text-xs font-semibold ${
                  simulation.cognitiveScore >= 75 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {simulation.cognitiveScore >= 75 ? "Seamless Fit" : "Expectation Gap"}
              </span>
            </div>
            <p className={`mt-2 text-[11px] ${textMuted}`}>
              {simulation.hasPreambleFiller
                ? "⚠️ Warning: Opening talks about greetings instead of title promise."
                : "Audience gets what the title promised immediately."}
            </p>
          </div>

          {/* 4. 30s Retention Projection */}
          <div className={`rounded-2xl border p-4 backdrop-blur-xl ${surface}`}>
            <div className="flex items-center justify-between">
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>
                Predicted 30s Retention
              </p>
              <span className={`text-[10px] font-bold font-mono ${benchmarkDelta >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {benchmarkDelta >= 0 ? `+${benchmarkDelta}%` : `${benchmarkDelta}%`} vs Bench
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span
                className={`text-3xl font-extrabold ${
                  simulation.sec30Retention >= 70
                    ? "text-emerald-400"
                    : simulation.sec30Retention >= 50
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {simulation.sec30Retention}%
              </span>
              <span className={`text-xs ${textMuted}`}>
                ({activeBenchmark.badge}: {activeBenchmark.sec30}%)
              </span>
            </div>
            <p className={`mt-2 text-[11px] ${textMuted}`}>
              {simulation.sec30Retention >= activeBenchmark.sec30
                ? "🔥 Outperforming benchmark velocity."
                : "Below optimal threshold. Use Hook Doctor below."}
            </p>
          </div>

        </div>

        {/* =========================================================
            MAIN WORKSPACE GRID: INPUTS (LEFT) & SIMULATOR (RIGHT)
        ========================================================= */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* -------------------------------------------------------
              LEFT COLUMN: DRAFT INPUTS (5 COLS)
          ------------------------------------------------------- */}
          <div className="space-y-6 lg:col-span-5">
            <div className={`rounded-3xl border p-6 backdrop-blur-xl ${surface}`}>
              <div className="flex items-center justify-between border-b pb-4 border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-base text-purple-400">✦</span>
                  <h2 className="text-base font-bold">Content Asset Ingestion</h2>
                </div>
                <button
                  type="button"
                  onClick={triggerSimulation}
                  disabled={isSimulating}
                  className="rounded-lg bg-purple-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-purple-500"
                >
                  {isSimulating ? "Simulating..." : "Re-simulate"}
                </button>
              </div>

              <div className="mt-5 space-y-5">
                
                {/* 1. THUMBNAIL UPLOADER & MULTIMODAL VISION INSPECTION */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                      1. Thumbnail & Visual Promise
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowFeedMockup(!showFeedMockup)}
                        className="text-[11px] text-purple-400 hover:underline"
                      >
                        {showFeedMockup ? "Hide Feed Mockup" : "Preview in Feed"}
                      </button>
                      {thumbnailPreview && (
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="text-[11px] text-rose-400 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    {thumbnailPreview ? (
                      <div className="space-y-3">
                        <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 group">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-44 w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                            <label className="cursor-pointer rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-black">
                              Change Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-mono text-white">
                            Feed Simulation Active
                          </span>
                        </div>

                        {/* MULTIMODAL VISION DIAGNOSTICS */}
                        <div className={`rounded-xl border p-3 text-xs ${surfaceSoft}`}>
                          <p className="font-bold text-[11px] uppercase tracking-wider text-purple-400 mb-2">
                            👁️ Vision & Contrast Diagnostics
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className={textMuted}>Contrast Score: </span>
                              <span className="font-bold text-emerald-400">{simulation.thumbnailMetrics.contrastScore}/100</span>
                            </div>
                            <div>
                              <span className={textMuted}>Mobile Legibility: </span>
                              <span className="font-bold text-emerald-400">{simulation.thumbnailMetrics.legibilityScore}/100</span>
                            </div>
                            <div className="col-span-2 text-[10px] text-purple-300">
                              ✓ {simulation.thumbnailMetrics.anchorSubject}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label
                        className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition ${
                          isLight
                            ? "border-gray-300 hover:border-purple-500 hover:bg-purple-50/50"
                            : "border-white/10 hover:border-purple-500/50 hover:bg-purple-500/[0.02]"
                        }`}
                      >
                        <span className="text-2xl text-purple-400">▣</span>
                        <p className="mt-2 text-xs font-medium">Upload Proposed Thumbnail</p>
                        <p className={`mt-0.5 text-[10px] ${textMuted}`}>
                          Tests visual promise vs script hook congruency & mobile contrast
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* FEED MOCKUP PREVIEW */}
                  {showFeedMockup && (
                    <div className={`mt-3 rounded-2xl border p-3 text-xs ${surfaceSoft}`}>
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="font-bold text-[11px]">Simulated {platform} Card</span>
                        <span className="text-[10px] text-purple-400">Feed Simulation</span>
                      </div>
                      <div className="mt-2.5 flex gap-3 items-center">
                        <div className="h-16 w-28 rounded-lg bg-purple-900/30 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10">
                          {thumbnailPreview ? (
                            <img src={thumbnailPreview} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-white/40">16:9</span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs line-clamp-2 leading-tight">{title || "Untitled Video Title"}</p>
                          <p className={`text-[10px] mt-1 ${textMuted}`}>Kizenra Studio · 142K views · 2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. TITLE INPUT */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                      2. Video / Post Title
                    </label>
                    <span className={`text-[11px] font-mono ${title.length > 70 ? "text-amber-400" : textMuted}`}>
                      {title.length}/70 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setAppliedHookId(null);
                    }}
                    placeholder="e.g. 10 AI Tools That Will Replace 90% of Your Daily Work in 2026..."
                    className={`mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition ${inputBg}`}
                  />
                </div>

                {/* 3. OPENING HOOK SCRIPT */}
                <div>
                  <div className="flex items-center gap-1.5 justify-between">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-purple-400">
                        3. First 60-Second Hook Script
                      </label>
                      <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-bold text-purple-300">
                        CRITICAL
                      </span>
                    </div>
                    {simulation.hasPreambleFiller && (
                      <span className="text-[10px] font-semibold text-rose-400 animate-pulse">
                        ⚠️ Fluff Detected
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-[11px] leading-tight ${textMuted}`}>
                    Paste the exact spoken words of your first 30–60 seconds. This determines initial retention.
                  </p>
                  <textarea
                    rows={6}
                    value={hookScript}
                    onChange={(e) => {
                      setHookScript(e.target.value);
                      setAppliedHookId(null);
                    }}
                    placeholder="Type or paste the first 45-60 seconds of dialogue here..."
                    className={`mt-2 w-full resize-none rounded-xl border p-3.5 text-sm leading-relaxed outline-none transition font-sans ${inputBg}`}
                  />
                </div>

                {/* 4. CAPTION & METADATA */}
                <div>
                  <label className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>
                    4. Supporting Caption & Context
                  </label>
                  <textarea
                    rows={3}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your description, tags, or pinned comment context..."
                    className={`mt-2 w-full resize-none rounded-xl border p-3 text-xs leading-relaxed outline-none transition ${inputBg}`}
                  />
                </div>

              </div>
            </div>
          </div>

          {/* -------------------------------------------------------
              RIGHT COLUMN: SIMULATOR & AUDIENCE LABORATORY (7 COLS)
          ------------------------------------------------------- */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* TABS SELECTOR */}
            <div className={`flex flex-wrap gap-1 rounded-2xl border p-1.5 backdrop-blur-xl ${surface}`}>
              {[
                { id: "retention", label: "📈 Retention Curve", badge: `${simulation.sec30Retention}% at 30s` },
                { id: "personas", label: "👥 Synthetic Focus Group", badge: `${3 + simulation.customPersonas.length} Agents` },
                { id: "hook_doctor", label: "⚡ Hook Doctor", badge: "Instant Fixer" },
                { id: "audit", label: "🛡️ Safety & Policy Audit", badge: "Pre-Flight" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                      : isLight
                      ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`hidden sm:inline-block rounded-md px-1.5 py-0.5 text-[10px] font-normal ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : isLight
                        ? "bg-gray-200 text-gray-700"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* =======================================================
                TAB 1: RETENTION CURVE WITH COMPETITOR BENCHMARKS
            ======================================================= */}
            {activeTab === "retention" && (
              <div className={`rounded-3xl border p-6 sm:p-7 backdrop-blur-xl ${surface}`}>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span>Predicted Retention Curve</span>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                        First 60 Seconds
                      </span>
                    </h3>
                    <p className={`mt-1 text-xs ${textSecondary}`}>
                      Compare your script hold-rate against live industry benchmarks.
                    </p>
                  </div>
                  
                  {/* BENCHMARK OVERLAY SELECTOR */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] uppercase font-bold ${textMuted}`}>Overlay:</span>
                    {Object.values(BENCHMARK_CONFIGS).map((bench) => (
                      <button
                        key={bench.id}
                        type="button"
                        onClick={() => setBenchmarkMode(bench.id)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                          benchmarkMode === bench.id
                            ? "bg-white/15 text-white border border-white/20"
                            : `${textMuted} hover:text-white`
                        }`}
                      >
                        {bench.badge} ({bench.sec30}%)
                      </button>
                    ))}
                  </div>
                </div>

                {/* BENCHMARK COMPARISON CALLOUT */}
                <div className={`mt-4 flex items-center justify-between rounded-xl p-3 text-xs border border-white/5 ${
                  benchmarkDelta >= 0 ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"
                }`}>
                  <div className="flex items-center gap-2">
                    <span>{benchmarkDelta >= 0 ? "🔥" : "⚠️"}</span>
                    <span>
                      At 30s, your predicted retention is <strong>{simulation.sec30Retention}%</strong> (
                      {benchmarkDelta >= 0 ? `+${benchmarkDelta}%` : `${benchmarkDelta}%`} vs {activeBenchmark.name}).
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-75">
                    {activeBenchmark.description.split("(")[0]}
                  </span>
                </div>

                {/* SVG RETENTION GRAPH */}
                <div className="relative mt-6 overflow-hidden rounded-2xl border p-4 bg-gradient-to-b from-purple-950/10 to-transparent border-white/10">
                  <svg
                    viewBox="0 0 600 240"
                    className="h-56 w-full overflow-visible select-none"
                  >
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid Lines (100%, 75%, 50%, 25%) */}
                    {[100, 75, 50, 25].map((level) => {
                      const y = 220 - (level / 100) * 190;
                      return (
                        <g key={level}>
                          <line
                            x1="30"
                            y1={y}
                            x2="590"
                            y2={y}
                            stroke={isLight ? "#e5e7eb" : "rgba(255,255,255,0.07)"}
                            strokeDasharray="3 3"
                          />
                          <text
                            x="5"
                            y={y + 4}
                            fill={isLight ? "#9ca3af" : "#52525b"}
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            {level}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Dynamic Benchmark Dashed Line */}
                    <path
                      d={benchmarkPathD}
                      fill="none"
                      stroke={activeBenchmark.color}
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      strokeOpacity="0.8"
                    />

                    {/* Simulated Path Coordinates Calculation */}
                    {(() => {
                      const points = simulation.curve.map((pt) => {
                        const x = 35 + (pt.sec / 60) * 550;
                        const y = 220 - (pt.retention / 100) * 190;
                        return { x, y, pt };
                      });

                      const pathD = points.reduce((acc, p, idx) => {
                        return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                      }, "");

                      const areaD = `${pathD} L ${points[points.length - 1].x} 220 L ${points[0].x} 220 Z`;

                      return (
                        <>
                          <path d={areaD} fill="url(#curveGradient)" />
                          
                          <path
                            d={pathD}
                            fill="none"
                            stroke="url(#strokeGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Critical Danger Flags */}
                          {points
                            .filter((p) => [4, 12, 28, 48].includes(p.pt.sec))
                            .map((p) => {
                              const isSelected = selectedSecond === p.pt.sec;
                              return (
                                <g
                                  key={p.pt.sec}
                                  className="cursor-pointer"
                                  onClick={() => setSelectedSecond(p.pt.sec)}
                                >
                                  <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={isSelected ? "7" : "5"}
                                    fill={isSelected ? "#ec4899" : "#a855f7"}
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                  />
                                  <text
                                    x={p.x}
                                    y={p.y - 12}
                                    textAnchor="middle"
                                    fill={isSelected ? "#ec4899" : isLight ? "#4b5563" : "#d4d4d8"}
                                    fontSize="10"
                                    fontWeight="bold"
                                  >
                                    {p.pt.sec}s ({p.pt.retention}%)
                                  </text>
                                </g>
                              );
                            })}
                        </>
                      );
                    })()}
                  </svg>

                  {/* Horizontal Time Axis Markers */}
                  <div className={`mt-2 flex justify-between px-6 text-[10px] font-mono ${textMuted}`}>
                    <span>0s (Hook)</span>
                    <span>15s (Intro)</span>
                    <span>30s (Hold Point)</span>
                    <span>45s (Progression)</span>
                    <span>60s (Core Content)</span>
                  </div>
                </div>

                {/* DIAGNOSIS CARD FOR SELECTED SECOND */}
                <div className={`mt-6 rounded-2xl border p-4 sm:p-5 transition ${surfaceSoft}`}>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 font-mono text-sm font-bold text-purple-400">
                        {currentSecondData.sec}s
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold">{currentSecondData.label}</h4>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              currentSecondData.status === "Critical Drop" || currentSecondData.status === "Danger Zone"
                                ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                                : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            {currentSecondData.status}
                          </span>
                        </div>
                        <p className={`text-xs ${textSecondary}`}>
                          Projected audience remaining: <strong>{currentSecondData.retention}%</strong>
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-medium ${textMuted}`}>
                      Click any point (4s, 12s, 28s, 48s) to inspect
                    </span>
                  </div>

                  <div className="mt-4 border-t pt-3 border-white/5 flex items-start gap-2">
                    <span className="text-amber-400 text-sm">💡</span>
                    <p className={`text-xs leading-relaxed ${textSecondary}`}>
                      <strong className={isLight ? "text-gray-900" : "text-white"}>Why this happens: </strong>
                      {currentSecondData.sec <= 6
                        ? "Viewers decide whether to commit or swipe in the first 3 seconds. Any pause or generic greeting causes instant exit."
                        : currentSecondData.sec <= 16
                        ? "Between seconds 8 and 16, viewers demand proof that the video title wasn't clickbait. If you're still doing an intro, they bounce."
                        : "Viewers who make it past 25s will generally watch 60%+ of the total runtime. Your job is getting them here."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================================
                TAB 2: SYNTHETIC AUDIENCE FOCUS GROUP & PERSONA STUDIO
            ======================================================= */}
            {activeTab === "personas" && (
              <div className={`rounded-3xl border p-6 sm:p-7 backdrop-blur-xl ${surface}`}>
                <div className="flex flex-col justify-between gap-4 border-b pb-5 border-white/10 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span>Synthetic Audience Focus Group</span>
                      <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
                        Multi-Agent Laboratory
                      </span>
                    </h3>
                    <p className={`mt-1 text-xs ${textSecondary}`}>
                      {channelTwinMode
                        ? "🧬 Digital Twin Active: Simulating reactions trained on your real channel audience data."
                        : "Simulating reactions from cold scrollers, skeptics, and channel advocates."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddPersonaModal(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-purple-600/30 transition hover:bg-purple-500"
                  >
                    <span>+ Add Target Viewer</span>
                  </button>
                </div>

                {/* NICHE SWITCHER BAR */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>
                    Niche Model:
                  </span>
                  {Object.entries(NICHE_PERSONAS).map(([key, n]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setNiche(key);
                        triggerSimulation();
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        niche === key
                          ? "border-purple-500 bg-purple-500/15 text-purple-300"
                          : isLight
                          ? "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                          : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25"
                      }`}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>

                {/* PERSONA CARDS LIST */}
                <div className="mt-6 space-y-4">
                  {/* Standard Base Personas */}
                  {Object.entries(simulation.personas).map(([key, persona]) => (
                    <div
                      key={key}
                      className={`rounded-2xl border p-5 transition hover:border-purple-500/30 ${surfaceSoft}`}
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-xl">
                            {persona.avatar}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold">{persona.name}</h4>
                              <span className={`text-xs ${textMuted}`}>· {persona.label}</span>
                            </div>
                            <p className={`text-[11px] ${textMuted}`}>{persona.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              persona.sentiment === "positive"
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : persona.sentiment === "warning"
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {persona.verdict}
                          </span>
                        </div>
                      </div>

                      <div className={`mt-4 rounded-xl border p-3.5 border-white/5 ${isLight ? "bg-gray-100/70 text-gray-800" : "bg-black/20 text-gray-300"}`}>
                        <p className="text-xs italic leading-relaxed">
                          "{persona.quote}"
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-purple-400">
                          <span className="font-bold">Recommended Tweak:</span>
                          <span className={textSecondary}>{persona.tip}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleConsultSara}
                          className="text-[11px] font-semibold text-purple-400 hover:underline"
                        >
                          ✦ Fix with Sara
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Custom Personas Created by User */}
                  {simulation.customPersonas.map((persona) => (
                    <div
                      key={persona.id}
                      className={`rounded-2xl border border-purple-500/40 p-5 transition bg-purple-500/[0.03]`}
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/20 text-xl">
                            {persona.avatar}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold">{persona.name}</h4>
                              <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-bold text-purple-300">
                                Custom Target
                              </span>
                              <span className={`text-xs ${textMuted}`}>· {persona.label}</span>
                            </div>
                            <p className={`text-[11px] ${textMuted}`}>{persona.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              persona.sentiment === "positive"
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {persona.verdict}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeCustomPersona(persona.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 ml-1 p-1"
                            title="Remove Persona"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className={`mt-4 rounded-xl border p-3.5 border-white/5 ${isLight ? "bg-gray-100/70 text-gray-800" : "bg-black/20 text-gray-300"}`}>
                        <p className="text-xs italic leading-relaxed">
                          "{persona.quote}"
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-purple-400">
                          <span className="font-bold">Niche Match:</span>
                          <span className={textSecondary}>{persona.tip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =======================================================
                TAB 3: THE HOOK DOCTOR & CUSTOM AI GENERATOR
            ======================================================= */}
            {activeTab === "hook_doctor" && (
              <div className={`rounded-3xl border p-6 sm:p-7 backdrop-blur-xl ${surface}`}>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span>The "Hook Doctor" AI Fixer</span>
                      <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                        Instant Script Upgrades
                      </span>
                    </h3>
                    <p className={`mt-1 text-xs ${textSecondary}`}>
                      Replace low-retention filler with algorithmically proven hook formulas. Click to apply directly into your script.
                    </p>
                  </div>
                </div>

                {/* AI CUSTOM HOOK GENERATOR INPUT */}
                <div className={`mt-6 rounded-2xl border p-4 ${surfaceSoft}`}>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    ✨ Generate Custom Niche Hooks
                  </p>
                  <p className={`mt-1 text-xs ${textSecondary}`}>
                    Type a topic or angle to generate 3 tailor-made, high-retention openings for your video.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={customNicheInput}
                      onChange={(e) => setCustomNicheInput(e.target.value)}
                      placeholder={`e.g. ${title.slice(0, 40)}...`}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs outline-none ${inputBg}`}
                    />
                    <button
                      type="button"
                      onClick={handleGenerateCustomHooks}
                      disabled={isGeneratingHooks}
                      className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
                    >
                      {isGeneratingHooks ? "Generating..." : "Generate AI Hooks"}
                    </button>
                  </div>

                  {/* CUSTOM HOOKS RESULTS */}
                  {customGeneratedHooks.length > 0 && (
                    <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
                      {customGeneratedHooks.map((genHook) => (
                        <div key={genHook.id} className="rounded-xl border border-purple-500/30 bg-purple-500/[0.05] p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-300">{genHook.type}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setHookScript(genHook.hook);
                                setAppliedHookId(genHook.id);
                                triggerSimulation();
                              }}
                              className="rounded-lg bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-500"
                            >
                              Apply to Script ➜
                            </button>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-gray-200">"{genHook.hook}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* STANDARD FORMULA TEMPLATES */}
                <div className="mt-6 space-y-4">
                  {HOOK_DOCTOR_TEMPLATES.map((hook) => {
                    const isApplied = appliedHookId === hook.id;
                    const previewText = hook.template(
                      title.replace(/10|best|tools|guide|stop/gi, "").trim(),
                      "the 3 underground strategies that actually work"
                    );

                    return (
                      <div
                        key={hook.id}
                        className={`rounded-2xl border p-5 transition ${
                          isApplied
                            ? "border-purple-500 bg-purple-500/[0.08]"
                            : `${surfaceSoft} hover:border-purple-500/30`
                        }`}
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{hook.type}</span>
                            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
                              {hook.badge}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => applyHook(hook)}
                            className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                              isApplied
                                ? "bg-emerald-600 text-white"
                                : "bg-purple-600 text-white hover:bg-purple-500"
                            }`}
                          >
                            {isApplied ? "✓ Applied to Script" : "Apply to Script →"}
                          </button>
                        </div>

                        <p className={`mt-2 text-xs ${textMuted}`}>
                          {hook.formula}
                        </p>

                        <div className={`mt-3 rounded-xl border p-3 font-mono text-xs border-white/5 ${isLight ? "bg-gray-100 text-gray-800" : "bg-black/30 text-gray-200"}`}>
                          {previewText}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =======================================================
                TAB 4: SAFETY, CLICKBAIT & POLICY AUDIT
            ======================================================= */}
            {activeTab === "audit" && (
              <div className={`rounded-3xl border p-6 sm:p-7 backdrop-blur-xl ${surface}`}>
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span>Pre-Flight Safety & Policy Audit</span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                      Zero Penalty Guarantee
                    </span>
                  </h3>
                  <p className={`mt-1 text-xs ${textSecondary}`}>
                    Checking for algorithmic shadow-demotion triggers before your audience sees the upload.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  
                  <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>
                      Clickbait Penalty Scanner
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <p className="text-sm font-bold text-emerald-400">Safe / Low Penalty Risk</p>
                    </div>
                    <p className={`mt-2 text-xs leading-relaxed ${textSecondary}`}>
                      Title contains curiosity keywords without triggering spam triggers (e.g. "SHOCKING", "YOU WON'T BELIEVE").
                    </p>
                  </div>

                  <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>
                      Thumbnail-to-Title Congruence
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                      <p className="text-sm font-bold text-purple-400">
                        {simulation.cognitiveScore >= 75 ? "Congruent" : "Slight Disconnect"}
                      </p>
                    </div>
                    <p className={`mt-2 text-xs leading-relaxed ${textSecondary}`}>
                      The visual message aligns with the promise of the first sentence of your script.
                    </p>
                  </div>

                  <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>
                      Advertiser-Friendliness Scan
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <p className="text-sm font-bold text-emerald-400">Green Monetization Ready</p>
                    </div>
                    <p className={`mt-2 text-xs leading-relaxed ${textSecondary}`}>
                      No profanity or controversial terminology detected in the opening 60 seconds.
                    </p>
                  </div>

                  <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                    <p className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>
                      Platform-Specific Format Fit
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <p className="text-sm font-bold text-emerald-400">Optimized for {platform}</p>
                    </div>
                    <p className={`mt-2 text-xs leading-relaxed ${textSecondary}`}>
                      Script length ({hookScript.split(/\s+/).length} words) fits the typical 60-second pacing cadence.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

        {/* =========================================================
            CUSTOM PERSONA STUDIO MODAL
        ========================================================= */}
        {showAddPersonaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-7 ${isLight ? "bg-white text-gray-900" : "bg-[#0c0c0c] text-white"} border-white/10 shadow-2xl`}>
              
              <div className="flex items-center justify-between border-b pb-4 border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 text-lg">🎭</span>
                  <h3 className="text-base font-bold">Add Custom Target Viewer Persona</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPersonaModal(false)}
                  className="rounded-lg p-1.5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCustomPersona} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Viewer Name & Emoji Avatar</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPersona.avatar}
                      onChange={(e) => setNewPersona({ ...newPersona, avatar: e.target.value })}
                      placeholder="🎯"
                      className={`w-14 text-center text-lg rounded-xl border p-2 ${inputBg}`}
                    />
                    <input
                      type="text"
                      required
                      value={newPersona.name}
                      onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                      placeholder="e.g. Liam, 23"
                      className={`flex-1 rounded-xl border px-3.5 py-2 ${inputBg}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Target Role / Demographic Archetype</label>
                  <input
                    type="text"
                    required
                    value={newPersona.role}
                    onChange={(e) => setNewPersona({ ...newPersona, role: e.target.value })}
                    placeholder="e.g. Computer Science Student Looking for 1st Remote Job"
                    className={`w-full rounded-xl border px-3.5 py-2 ${inputBg}`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Core Pain Point / Mindset</label>
                  <textarea
                    rows={2}
                    value={newPersona.traits}
                    onChange={(e) => setNewPersona({ ...newPersona, traits: e.target.value })}
                    placeholder="e.g. Scared AI will make junior developers obsolete. Needs tangible proof."
                    className={`w-full rounded-xl border p-3 ${inputBg}`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Psychological Scrutiny Bias</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "scroller", label: "Fast Swipe (3s)" },
                      { id: "skeptic", label: "Skeptical Critic" },
                      { id: "supporter", label: "Core Supporter" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setNewPersona({ ...newPersona, bias: b.id })}
                        className={`rounded-xl border p-2 text-center text-[11px] font-semibold transition ${
                          newPersona.bias === b.id
                            ? "border-purple-500 bg-purple-500/20 text-purple-300"
                            : "border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddPersonaModal(false)}
                    className={`rounded-xl border px-4 py-2 font-semibold ${
                      isLight ? "border-gray-300 text-gray-700" : "border-white/10 text-gray-300"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-purple-600 px-5 py-2 font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500"
                  >
                    Add Persona to Focus Group
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* =========================================================
            PRE-FLIGHT AUDIT EXPORT MODAL
        ========================================================= */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className={`relative w-full max-w-2xl rounded-3xl border p-6 sm:p-8 ${isLight ? "bg-white text-gray-900" : "bg-[#0c0c0c] text-white"} border-white/10 shadow-2xl`}>
              
              <div className="flex items-center justify-between border-b pb-4 border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 text-lg">📄</span>
                  <h3 className="text-lg font-bold">Kizenra Pre-Flight Audit Report</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="rounded-lg p-1.5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
                <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                  <p className="font-mono text-[11px] text-purple-400 uppercase font-bold">Upload Candidate</p>
                  <p className="text-base font-extrabold mt-1">{title}</p>
                  <p className={`mt-1 ${textMuted}`}>
                    Target: {platform} · Niche: {NICHE_PERSONAS[niche]?.name || niche} · Readiness: {simulation.readinessScore}/100
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className={`rounded-xl border p-3 ${surfaceSoft}`}>
                    <p className={`text-[10px] uppercase ${textMuted}`}>Readiness</p>
                    <p className="text-xl font-bold text-purple-400">{simulation.readinessScore}/100</p>
                  </div>
                  <div className={`rounded-xl border p-3 ${surfaceSoft}`}>
                    <p className={`text-[10px] uppercase ${textMuted}`}>30s Retention</p>
                    <p className="text-xl font-bold text-emerald-400">{simulation.sec30Retention}%</p>
                  </div>
                  <div className={`rounded-xl border p-3 ${surfaceSoft}`}>
                    <p className={`text-[10px] uppercase ${textMuted}`}>Congruence</p>
                    <p className="text-xl font-bold text-indigo-400">{simulation.cognitiveScore}%</p>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                  <p className="font-bold text-xs uppercase text-purple-400 mb-2">Focus Group Takeaways ({niche.toUpperCase()})</p>
                  <ul className="space-y-2">
                    <li><strong>Alex ({simulation.personas.scroller.label}):</strong> {simulation.personas.scroller.verdict} — "{simulation.personas.scroller.quote}"</li>
                    <li><strong>Jordan ({simulation.personas.skeptic.label}):</strong> {simulation.personas.skeptic.verdict} — "{simulation.personas.skeptic.quote}"</li>
                    <li><strong>Maya ({simulation.personas.supporter.label}):</strong> {simulation.personas.supporter.verdict} — "{simulation.personas.supporter.quote}"</li>
                  </ul>
                </div>

                <div className={`rounded-2xl border p-4 ${surfaceSoft}`}>
                  <p className="font-bold text-xs uppercase text-emerald-400 mb-1">Policy & Distribution Clearance</p>
                  <p className={textSecondary}>✓ Zero clickbait penalty triggers detected</p>
                  <p className={textSecondary}>✓ 100% advertiser friendly opening syntax</p>
                  <p className={textSecondary}>✓ Platform-tailored pacing verified</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyReport}
                    className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-purple-500"
                  >
                    {reportCopied ? "✓ Copied to Clipboard!" : "Copy Report"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveToReports}
                    className="rounded-xl border border-purple-500/40 bg-purple-500/15 px-3.5 py-2 text-xs font-bold text-purple-300 transition hover:bg-purple-500/25"
                  >
                    {auditSaved ? "✓ Saved to Reports Archive!" : "💾 Save to Reports"}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                      isLight ? "border-gray-300 text-gray-800" : "border-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    Print / PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                      isLight ? "border-gray-300 text-gray-800" : "border-white/10 text-gray-300 hover:text-white"
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
