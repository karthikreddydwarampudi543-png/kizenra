import { useMemo, useState } from "react";

function SearchIntelligence({ theme, goTo }) {
  const [title, setTitle] = useState(
    "Best AI Tools for Students in 2026"
  );

  const [topic, setTopic] = useState(
    "best AI tools for students"
  );

  const [analyzed, setAnalyzed] = useState(true);

  const isLight = theme === "light";

  /* =========================================================
     THEME CLASSES
  ========================================================= */

  const surface = isLight
    ? "bg-white border-gray-200"
    : "bg-[#090909] border-white/10";

  const soft = isLight
    ? "bg-gray-50 border-gray-200"
    : "bg-white/[0.02] border-white/5";

  const primaryText = isLight
    ? "text-gray-900"
    : "text-white";

  const secondaryText = isLight
    ? "text-gray-600"
    : "text-gray-500";

  const mutedText = isLight
    ? "text-gray-500"
    : "text-gray-600";

  const inputClass = isLight
    ? "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400"
    : "border-white/10 bg-white/[0.025] text-gray-300 placeholder:text-gray-700";

  const divider = isLight
    ? "border-gray-200"
    : "border-white/10";

  /* =========================================================
     HELPERS
  ========================================================= */

  const stopWords = new Set([
    "the",
    "a",
    "an",
    "for",
    "to",
    "of",
    "and",
    "or",
    "in",
    "on",
    "with",
    "is",
    "are",
    "best",
    "how",
    "what",
    "why",
    "which",
    "my",
    "your",
    "this",
    "that",
    "from",
    "can",
    "will",
    "should",
    "2026",
  ]);

  const cleanWords = (value) =>
    value
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  /* =========================================================
     SEARCH ANALYSIS
  ========================================================= */

  const analysis = useMemo(() => {
    const cleanTitle = title.trim();
    const cleanTopic = topic.trim().toLowerCase();

    if (!cleanTitle && !cleanTopic) {
      return {
        visibility: 0,
        standout: 0,
        intent: 0,
        relevance: 0,
        clickAppeal: 0,
        topicCoverage: 0,
        competition: "Unknown",
        titleStrength: 0,
        descriptionStrength: 0,
        audienceQuestions: 0,
        keywordMatch: 0,
        specificity: 0,
        freshness: 0,
      };
    }

    const titleWords = cleanWords(cleanTitle);
    const topicWords = cleanWords(cleanTopic);

    const meaningfulTopicWords = topicWords.filter(
      (word) => !stopWords.has(word)
    );

    const matchedWords = topicWords.filter((word) =>
      titleWords.some(
        (titleWord) =>
          titleWord.includes(word) ||
          word.includes(titleWord)
      )
    ).length;

    const keywordMatch = topicWords.length
      ? Math.round(
          (matchedWords / topicWords.length) * 100
        )
      : 0;

    const meaningfulMatches = meaningfulTopicWords.filter(
      (word) =>
        titleWords.some(
          (titleWord) =>
            titleWord.includes(word) ||
            word.includes(titleWord)
        )
    ).length;

    const topicCoverage = meaningfulTopicWords.length
      ? Math.round(
          (meaningfulMatches / meaningfulTopicWords.length) * 100
        )
      : keywordMatch;

    const titleLengthScore =
      cleanTitle.length >= 35 &&
      cleanTitle.length <= 75
        ? 94
        : cleanTitle.length >= 25 &&
            cleanTitle.length <= 90
          ? 82
          : 67;

    const specificitySignals = [
      /\d/,
      /best/i,
      /how/i,
      /guide/i,
      /for/i,
      /tips/i,
      /tools/i,
      /ways/i,
      /mistakes/i,
      /examples/i,
      /comparison/i,
    ];

    const specificity = specificitySignals.filter(
      (pattern) => pattern.test(cleanTitle)
    ).length;

    const specificityBonus = Math.min(
      10,
      specificity * 2
    );

    const freshness =
      /2026|latest|new|updated|current/i.test(cleanTitle)
        ? 94
        : 72;

    const titleStrength = Math.min(
      98,
      Math.round(
        (
          titleLengthScore +
          keywordMatch +
          specificityBonus +
          freshness
        ) / 3
      )
    );

    const intent = Math.min(
      98,
      Math.max(
        60,
        Math.round(
          keywordMatch * 0.55 +
            topicCoverage * 0.25 +
            32
        )
      )
    );

    const relevance = Math.min(
      98,
      Math.max(
        60,
        Math.round(
          topicCoverage * 0.7 +
            keywordMatch * 0.3
        )
      )
    );

    const clickAppeal = Math.min(
      97,
      Math.max(
        62,
        Math.round(
          titleLengthScore * 0.42 +
            specificityBonus * 1.5 +
            freshness * 0.12 +
            22
        )
      )
    );

    const standout = Math.min(
      98,
      Math.round(
        intent * 0.25 +
          relevance * 0.25 +
          clickAppeal * 0.3 +
          topicCoverage * 0.2
      )
    );

    const visibility = Math.min(
      98,
      Math.round(
        standout * 0.6 +
          relevance * 0.25 +
          keywordMatch * 0.15
      )
    );

    const competition =
      meaningfulTopicWords.length >= 5 &&
      keywordMatch >= 80
        ? "Medium"
        : keywordMatch >= 60
          ? "Medium–High"
          : "High";

    return {
      visibility,
      standout,
      intent,
      relevance,
      clickAppeal,
      topicCoverage,
      competition,
      titleStrength,
      descriptionStrength: Math.min(
        95,
        Math.max(
          60,
          Math.round(
            relevance * 0.45 +
              intent * 0.25 +
              freshness * 0.1 +
              20
          )
        )
      ),
      audienceQuestions: topicWords.length ? 4 : 0,
      keywordMatch,
      specificity: specificityBonus,
      freshness,
    };
  }, [title, topic]);

  /* =========================================================
     KEYWORD OPPORTUNITIES
  ========================================================= */

  const keywordIdeas = useMemo(() => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      return [];
    }

    const base = cleanTopic
      .replace(/\s+/g, " ")
      .trim();

    const ideas = [
      {
        keyword: base,
        type: "Core",
        strength: 94,
      },
      {
        keyword: `${base} 2026`,
        type: "Fresh",
        strength: 90,
      },
      {
        keyword: `best ${base}`,
        type: "Commercial",
        strength: 86,
      },
      {
        keyword: `how to choose ${base}`,
        type: "Intent",
        strength: 82,
      },
      {
        keyword: `${base} for beginners`,
        type: "Beginner",
        strength: 79,
      },
      {
        keyword: `${base} free`,
        type: "Value",
        strength: 76,
      },
    ];

    const seen = new Set();

    return ideas.filter((item) => {
      const key = item.keyword.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [topic]);

  /* =========================================================
     CONTENT ANGLES
  ========================================================= */

  const contentAngles = useMemo(() => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      return [];
    }

    return [
      {
        label: "Comparison",
        title: `Best ${cleanTopic}: What Actually Wins in 2026`,
        description:
          "Compare the strongest options and clearly explain the differences.",
      },
      {
        label: "Beginner",
        title: `${cleanTopic} for Beginners: Start Here`,
        description:
          "Remove confusion and give beginners a simple starting path.",
      },
      {
        label: "Problem-solving",
        title: `How to Choose the Right ${cleanTopic}`,
        description:
          "Help viewers make a decision instead of only listing options.",
      },
      {
        label: "Value",
        title: `${cleanTopic}: What Is Actually Worth Using?`,
        description:
          "Focus on useful options and cut away unnecessary choices.",
      },
    ];
  }, [topic]);

  /* =========================================================
     RECOMMENDED TITLE
  ========================================================= */

  const recommendedTitles = useMemo(() => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      return [
        "10 Best AI Tools for Students in 2026",
        "Best AI Tools for Students: What Actually Works",
        "AI Tools for Students: 10 Worth Using in 2026",
      ];
    }

    const normalized = cleanTopic.replace(
      /^best\s+/i,
      ""
    );

    return [
      `10 Best ${normalized} in 2026 — What Actually Works`,
      `${normalized} for Beginners — The Best Options in 2026`,
      `Best ${normalized}: 10 Options Worth Trying`,
    ];
  }, [topic]);

  /* =========================================================
     QUESTIONS
  ========================================================= */

  const questionData = topic.trim()
    ? [
        `Which ${topic.trim()} are actually free?`,
        `What is the best ${topic.trim()} for beginners?`,
        `Which ${topic.trim()} saves the most time?`,
        `What should I avoid when choosing ${topic.trim()}?`,
      ]
    : [];

  /* =========================================================
     ACTIONABLE RECOMMENDATIONS
  ========================================================= */

  const recommendations = useMemo(() => {
    const items = [];

    if (analysis.keywordMatch < 80) {
      items.push({
        title: "Strengthen topic coverage",
        description:
          "Include the main search phrase more naturally in the title.",
        priority: "High",
      });
    }

    if (analysis.clickAppeal < 85) {
      items.push({
        title: "Improve the click promise",
        description:
          "Make the outcome or benefit clearer before the viewer clicks.",
        priority: "High",
      });
    }

    if (analysis.titleStrength < 85) {
      items.push({
        title: "Tighten the title",
        description:
          "Aim for a specific title that is neither too short nor overly long.",
        priority: "Medium",
      });
    }

    if (analysis.freshness < 85) {
      items.push({
        title: "Add freshness",
        description:
          "A current-year or updated angle can make the result feel more relevant.",
        priority: "Medium",
      });
    }

    if (items.length === 0) {
      items.push(
        {
          title: "Keep the main keyword natural",
          description:
            "Your title already covers the topic well. Avoid unnecessary keyword repetition.",
          priority: "Good",
        },
        {
          title: "Answer intent early",
          description:
            "Give the viewer the clearest answer as early as possible.",
          priority: "Good",
        },
        {
          title: "Use audience questions",
          description:
            "Cover the related questions to make the content more complete.",
          priority: "Good",
        }
      );
    }

    return items.slice(0, 3);
  }, [analysis]);

  /* =========================================================
     ANALYZE
  ========================================================= */

  const analyze = () => {
    setAnalyzed(false);

    window.setTimeout(() => {
      setAnalyzed(true);
    }, 350);
  };

  /* =========================================================
     APPLY TITLE
  ========================================================= */

  const applyRecommendedTitle = (selectedTitle) => {
    setTitle(selectedTitle || recommendedTitles[0]);
    setAnalyzed(false);

    window.setTimeout(() => {
      setAnalyzed(true);
    }, 300);
  };

  /* =========================================================
     OPTIMIZE & SCHEDULE
  ========================================================= */

  const optimizeAndSchedule = () => {
    const optimizedTitle =
      recommendedTitles[0].trim();

    const optimizedTopic = topic.trim();

    localStorage.setItem(
      "kizenra_scheduler_title",
      optimizedTitle
    );

    localStorage.setItem(
      "kizenra_scheduler_topic",
      optimizedTopic
    );

    localStorage.setItem(
      "kizenra_scheduler_source",
      "Search Intelligence"
    );

    goTo("Smart Scheduler");
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-4xl">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          Content Growth · Search Intelligence
        </p>

        <h1
          className={`mt-3 text-3xl font-bold tracking-tight sm:text-5xl ${primaryText}`}
        >
          Make your content easier to discover.
        </h1>

        <p
          className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${secondaryText}`}
        >
          Kizenra evaluates the search topic, intent, keyword
          coverage, title strength and click appeal so you can
          shape content around what your audience is looking for.
        </p>

      </div>

      {/* =====================================================
          FEATURE SWITCH
      ===================================================== */}

      <div className="mt-8 flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() => goTo("Search Intelligence")}
          className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-purple-300 transition hover:bg-purple-500/15"
        >
          Search Intelligence
        </button>

        <button
          type="button"
          onClick={() => goTo("Smart Scheduler")}
          className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${
            isLight
              ? "border-gray-200 bg-white text-gray-500 hover:border-purple-200 hover:text-purple-500"
              : "border-white/10 bg-white/[0.025] text-gray-500 hover:border-purple-500/20 hover:bg-purple-500/[0.04] hover:text-purple-300"
          }`}
        >
          Smart Scheduler →
        </button>

      </div>

      {/* =====================================================
          ANALYZER
      ===================================================== */}

      <div
        className={`mt-6 rounded-3xl border p-5 sm:p-7 ${surface}`}
      >

        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
              Analyze a search opportunity
            </p>

            <h2
              className={`mt-3 text-2xl font-bold ${primaryText}`}
            >
              What are people searching for?
            </h2>

            <p
              className={`mt-2 max-w-xl text-sm leading-6 ${secondaryText}`}
            >
              Enter the target topic and planned title.
              Kizenra will build a local intelligence report
              from the relationship between them.
            </p>

            <div className="mt-6 space-y-4">

              {/* TARGET SEARCH */}

              <div>

                <label
                  className={`text-[10px] uppercase tracking-wider ${mutedText}`}
                >
                  Target search
                </label>

                <input
                  value={topic}
                  onChange={(event) => {
                    setTopic(event.target.value);
                    setAnalyzed(false);
                  }}
                  placeholder="e.g. best AI tools for students"
                  className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-purple-500/40 ${inputClass}`}
                />

              </div>

              {/* PLANNED TITLE */}

              <div>

                <label
                  className={`text-[10px] uppercase tracking-wider ${mutedText}`}
                >
                  Planned title
                </label>

                <input
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setAnalyzed(false);
                  }}
                  placeholder="Write your title..."
                  className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-purple-500/40 ${inputClass}`}
                />

              </div>

              <button
                type="button"
                onClick={analyze}
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-500"
              >
                Analyze Search Opportunity →
              </button>

            </div>

          </div>

          {/* SEARCH VISIBILITY */}

          <div
            className={`relative overflow-hidden rounded-2xl border p-6 ${
              isLight
                ? "border-purple-200 bg-purple-50"
                : "border-purple-500/15 bg-purple-500/[0.035]"
            }`}
          >

            <div
              className={`absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[80px] ${
                isLight
                  ? "bg-purple-200/50"
                  : "bg-purple-600/10"
              }`}
            />

            <div className="relative">

              <p className="text-[10px] uppercase tracking-[0.18em] text-purple-500">
                Search visibility
              </p>

              <div className="mt-6 flex items-center gap-6">

                <div
                  className={`flex h-32 w-32 shrink-0 items-center justify-center rounded-full border ${
                    isLight
                      ? "border-purple-300 bg-white"
                      : "border-purple-400/20"
                  }`}
                >

                  <div className="text-center">

                    <p
                      className={`text-4xl font-bold ${primaryText}`}
                    >
                      {analysis.visibility}
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-green-500">
                      /100
                    </p>

                  </div>

                </div>

                <div>

                  <p
                    className={`text-lg font-semibold ${primaryText}`}
                  >
                    {analysis.visibility >= 88
                      ? "Strong opportunity"
                      : analysis.visibility >= 70
                        ? "Promising"
                        : "Needs work"}
                  </p>

                  <p
                    className={`mt-2 text-xs leading-5 ${secondaryText}`}
                  >
                    This score combines topic coverage,
                    intent, relevance and click appeal.
                  </p>

                </div>

              </div>

              <div
                className={`mt-6 grid grid-cols-2 gap-3 border-t pt-4 ${
                  isLight
                    ? "border-purple-200"
                    : "border-white/10"
                }`}
              >

                <div>

                  <p className={`text-[10px] ${mutedText}`}>
                    Competition
                  </p>

                  <p className="mt-1 text-xs font-semibold text-yellow-500">
                    {analysis.competition}
                  </p>

                </div>

                <div>

                  <p className={`text-[10px] ${mutedText}`}>
                    Keyword match
                  </p>

                  <p
                    className={`mt-1 text-xs font-semibold ${
                      analysis.keywordMatch >= 80
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {analysis.keywordMatch}%
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {analyzed && (
        <>

          {/* =================================================
              SCORE OVERVIEW
          ================================================= */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <ScoreCard
              title="Search Intent"
              score={analysis.intent}
              label="Audience purpose"
              isLight={isLight}
            />

            <ScoreCard
              title="Topic Relevance"
              score={analysis.relevance}
              label="Topic alignment"
              isLight={isLight}
            />

            <ScoreCard
              title="Click Appeal"
              score={analysis.clickAppeal}
              label="Reason to click"
              isLight={isLight}
            />

            <ScoreCard
              title="Title Strength"
              score={analysis.titleStrength}
              label="Overall title"
              isLight={isLight}
            />

          </div>

          {/* =================================================
              KEYWORD OPPORTUNITIES
          ================================================= */}

          <div className={`mt-5 rounded-3xl border p-6 ${surface}`}>

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                  Keyword opportunities
                </p>

                <h2
                  className={`mt-2 text-xl font-bold ${primaryText}`}
                >
                  Search phrases worth considering.
                </h2>

                <p
                  className={`mt-1 text-xs ${secondaryText}`}
                >
                  These are local suggestions built from the
                  topic you entered, not live search-volume data.
                </p>

              </div>

              <span
                className={`rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider ${
                  isLight
                    ? "border-gray-200 bg-gray-50 text-gray-500"
                    : "border-white/10 bg-white/[0.02] text-gray-500"
                }`}
              >
                Local intelligence
              </span>

            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">

              {keywordIdeas.map((item) => (
                <div
                  key={`${item.type}-${item.keyword}`}
                  className={`rounded-2xl border p-4 ${soft}`}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p
                        className={`text-sm font-medium ${
                          isLight
                            ? "text-gray-800"
                            : "text-gray-300"
                        }`}
                      >
                        {item.keyword}
                      </p>

                      <span className="mt-2 inline-flex rounded-full bg-purple-500/10 px-2 py-1 text-[9px] font-semibold text-purple-500">
                        {item.type}
                      </span>

                    </div>

                    <span className="shrink-0 text-sm font-bold text-green-500">
                      {item.strength}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* =================================================
              STANDOUT + RECOMMENDATION
          ================================================= */}

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">

            {/* STANDOUT SCORE */}

            <div
              className={`rounded-3xl border p-6 ${surface}`}
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p
                    className={`text-sm font-semibold ${primaryText}`}
                  >
                    Search Standout Score
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${mutedText}`}
                  >
                    Will the result earn attention after being
                    found?
                  </p>

                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${
                    analysis.standout >= 88
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-yellow-200 bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {analysis.standout >= 88
                    ? "STRONG"
                    : "IMPROVE"}
                </span>

              </div>

              <div className="mt-7 flex items-center gap-5">

                <p
                  className={`text-6xl font-bold ${primaryText}`}
                >
                  {analysis.standout}
                </p>

                <div className="flex-1">

                  <div
                    className={`h-2 overflow-hidden rounded-full ${
                      isLight
                        ? "bg-gray-200"
                        : "bg-white/5"
                    }`}
                  >

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all duration-700"
                      style={{
                        width: `${analysis.standout}%`,
                      }}
                    />

                  </div>

                  <p
                    className={`mt-3 text-xs leading-5 ${secondaryText}`}
                  >
                    Your result needs both relevance and a
                    clear reason to click.
                  </p>

                </div>

              </div>

              <div className="mt-7 space-y-4">

                <ScoreLine
                  title="Search intent match"
                  score={analysis.intent}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Keyword relevance"
                  score={analysis.relevance}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Click appeal"
                  score={analysis.clickAppeal}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Topic coverage"
                  score={analysis.topicCoverage}
                  isLight={isLight}
                />

              </div>

            </div>

            {/* RECOMMENDATION */}

            <div
              className={`rounded-3xl border p-6 ${surface}`}
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p
                    className={`text-sm font-semibold ${primaryText}`}
                  >
                    Kizenra recommendation
                  </p>

                  <p
                    className={`mt-1 text-[11px] ${mutedText}`}
                  >
                    The strongest title direction for this topic.
                  </p>

                </div>

                <span className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-[9px] font-semibold text-purple-500">
                  AI SUGGESTION
                </span>

              </div>

              <div
                className={`mt-6 rounded-2xl border p-5 ${soft}`}
              >

                <p
                  className={`text-[10px] uppercase tracking-[0.18em] ${mutedText}`}
                >
                  Current title
                </p>

                <p
                  className={`mt-3 text-lg font-semibold ${primaryText}`}
                >
                  {title || "Untitled content"}
                </p>

                <div
                  className={`my-5 border-t ${divider}`}
                />

                <p className="text-[10px] uppercase tracking-[0.18em] text-purple-500">
                  Recommended title
                </p>

                <p
                  className={`mt-3 text-lg font-semibold ${
                    isLight
                      ? "text-purple-700"
                      : "text-purple-200"
                  }`}
                >
                  {recommendedTitles[0]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  <Reason
                    text="Clearer promise"
                    isLight={isLight}
                  />

                  <Reason
                    text="Specific topic"
                    isLight={isLight}
                  />

                  <Reason
                    text="Fresh 2026 angle"
                    isLight={isLight}
                  />

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      applyRecommendedTitle(
                        recommendedTitles[0]
                      )
                    }
                    className={`rounded-xl border px-4 py-3 text-xs font-semibold transition ${
                      isLight
                        ? "border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100"
                        : "border-purple-500/20 bg-purple-500/10 text-purple-300 hover:bg-purple-500/15"
                    }`}
                  >
                    Apply Title
                  </button>

                  <button
                    type="button"
                    onClick={optimizeAndSchedule}
                    className="rounded-xl bg-purple-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-purple-500"
                  >
                    Optimize & Schedule →
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              TITLE OPTIONS
          ================================================= */}

          <div className={`mt-5 rounded-3xl border p-6 ${surface}`}>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                Title directions
              </p>

              <h2
                className={`mt-2 text-xl font-bold ${primaryText}`}
              >
                Three ways to approach the same search.
              </h2>

            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">

              {recommendedTitles.map(
                (suggestedTitle, index) => (
                  <div
                    key={suggestedTitle}
                    className={`rounded-2xl border p-5 ${soft}`}
                  >

                    <div className="flex items-center justify-between">

                      <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[9px] font-semibold text-purple-500">
                        OPTION {index + 1}
                      </span>

                      <span className="text-[10px] text-gray-500">
                        {index === 0
                          ? "Best overall"
                          : index === 1
                            ? "Beginner angle"
                            : "List angle"}
                      </span>

                    </div>

                    <p
                      className={`mt-4 text-sm font-semibold leading-6 ${primaryText}`}
                    >
                      {suggestedTitle}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        applyRecommendedTitle(
                          suggestedTitle
                        )
                      }
                      className="mt-5 text-xs font-semibold text-purple-500 transition hover:text-purple-400"
                    >
                      Use this title →
                    </button>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              CONTENT ANGLES
          ================================================= */}

          <div className={`mt-5 rounded-3xl border p-6 ${surface}`}>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                Content angles
              </p>

              <h2
                className={`mt-2 text-xl font-bold ${primaryText}`}
              >
                Don't just target the topic. Choose the right angle.
              </h2>

              <p
                className={`mt-1 text-xs ${secondaryText}`}
              >
                Different angles can satisfy different audience
                intents around the same search.
              </p>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {contentAngles.map((angle) => (
                <div
                  key={angle.label}
                  className={`rounded-2xl border p-5 ${soft}`}
                >

                  <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-purple-500">
                    {angle.label}
                  </span>

                  <p
                    className={`mt-4 text-sm font-semibold leading-6 ${primaryText}`}
                  >
                    {angle.title}
                  </p>

                  <p
                    className={`mt-2 text-xs leading-5 ${secondaryText}`}
                  >
                    {angle.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* =================================================
              SEARCH READINESS + QUESTIONS
          ================================================= */}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">

            <div
              className={`rounded-3xl border p-6 ${surface}`}
            >

              <p
                className={`text-sm font-semibold ${primaryText}`}
              >
                Search readiness
              </p>

              <p
                className={`mt-1 text-[11px] ${mutedText}`}
              >
                The signals Kizenra would improve before
                publishing.
              </p>

              <div className="mt-6 space-y-5">

                <ScoreLine
                  title="Title strength"
                  score={analysis.titleStrength}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Description strength"
                  score={analysis.descriptionStrength}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Audience intent"
                  score={analysis.intent}
                  isLight={isLight}
                />

                <ScoreLine
                  title="Freshness"
                  score={analysis.freshness}
                  isLight={isLight}
                />

              </div>

            </div>

            <div
              className={`rounded-3xl border p-6 ${surface}`}
            >

              <p
                className={`text-sm font-semibold ${primaryText}`}
              >
                Audience questions to cover
              </p>

              <p
                className={`mt-1 text-[11px] ${mutedText}`}
              >
                Useful questions that can help your content
                feel more complete.
              </p>

              <div className="mt-5 space-y-3">

                {questionData.map((question) => (

                  <div
                    key={question}
                    className={`rounded-xl border p-4 ${soft}`}
                  >

                    <div className="flex items-start gap-3">

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          isLight
                            ? "bg-purple-50 text-purple-600"
                            : "bg-purple-500/10 text-purple-400"
                        }`}
                      >
                        ?
                      </span>

                      <p
                        className={`text-sm leading-6 ${
                          isLight
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {question}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* =================================================
              RECOMMENDATIONS
          ================================================= */}

          <div className={`mt-5 rounded-3xl border p-6 ${surface}`}>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
                Action plan
              </p>

              <h2
                className={`mt-2 text-xl font-bold ${primaryText}`}
              >
                What Kizenra would change next.
              </h2>

            </div>

            <div className="mt-6 grid gap-3">

              {recommendations.map((item, index) => (

                <div
                  key={`${item.title}-${index}`}
                  className={`flex items-start gap-4 rounded-2xl border p-4 ${soft}`}
                >

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      item.priority === "High"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : item.priority === "Medium"
                          ? "bg-purple-500/10 text-purple-500"
                          : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {item.priority === "Good"
                      ? "✓"
                      : index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <p
                        className={`text-sm font-semibold ${primaryText}`}
                      >
                        {item.title}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-[8px] font-semibold uppercase tracking-wider ${
                          item.priority === "High"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : item.priority === "Medium"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p
                      className={`mt-2 text-xs leading-5 ${secondaryText}`}
                    >
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* =================================================
              SARA
          ================================================= */}

          <div
            className={`mt-5 rounded-3xl border p-6 sm:p-7 ${
              isLight
                ? "border-purple-200 bg-purple-50"
                : "border-purple-500/15 bg-purple-500/[0.035]"
            }`}
          >

            <div className="flex items-center gap-4">

              <div className="sara-mini-orb flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                ✦
              </div>

              <div>

                <p
                  className={`font-semibold ${primaryText}`}
                >
                  Sara's search advice
                </p>

                <p className="mt-1 text-xs text-green-500">
                  Based on this analysis
                </p>

              </div>

            </div>

            <p
              className={`mt-5 max-w-4xl text-sm leading-7 ${
                isLight
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              Your strongest opportunity is to keep the main
              search phrase natural, make the promise specific,
              answer the viewer's core question early, and use
              the related questions above to make the content
              more complete. Don't add keywords just for the
              sake of adding them.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  applyRecommendedTitle(
                    recommendedTitles[0]
                  )
                }
                className={`rounded-xl border px-5 py-3 text-xs font-semibold transition ${
                  isLight
                    ? "border-purple-200 bg-white text-purple-600 hover:bg-purple-50"
                    : "border-purple-500/20 bg-purple-500/10 text-purple-300 hover:bg-purple-500/15"
                }`}
              >
                Apply Recommendation
              </button>

              <button
                type="button"
                onClick={optimizeAndSchedule}
                className="rounded-xl bg-purple-600 px-5 py-3 text-xs font-semibold text-white transition hover:bg-purple-500"
              >
                Optimize & Schedule →
              </button>

            </div>

          </div>

        </>
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className={`mt-12 border-t py-7 ${
          isLight
            ? "border-gray-200"
            : "border-white/10"
        }`}
      >

        <div className="flex flex-col justify-between gap-3 text-xs sm:flex-row">

          <p
            className={
              isLight
                ? "text-gray-400"
                : "text-gray-700"
            }
          >
            © 2026 Kizenra · Polish it before publish it.
          </p>

          <p className="text-purple-500/60">
            Built with Love for Creators
          </p>

        </div>

      </footer>

    </div>
  );
}

/* =========================================================
   SCORE CARD
========================================================= */

function ScoreCard({
  title,
  score,
  label,
  isLight,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition hover:border-purple-500/20 ${
        isLight
          ? "border-gray-200 bg-white"
          : "border-white/10 bg-[#090909]"
      }`}
    >

      <p
        className={`text-xs ${
          isLight
            ? "text-gray-500"
            : "text-gray-600"
        }`}
      >
        {title}
      </p>

      <p
        className={`mt-3 text-3xl font-bold ${
          isLight
            ? "text-gray-900"
            : "text-white"
        }`}
      >
        {score}
      </p>

      <p className="mt-2 text-xs text-purple-400">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   SCORE LINE
========================================================= */

function ScoreLine({
  title,
  score,
  isLight,
}) {
  return (
    <div>

      <div className="flex items-center justify-between gap-4">

        <span
          className={`text-xs ${
            isLight
              ? "text-gray-600"
              : "text-gray-500"
          }`}
        >
          {title}
        </span>

        <span
          className={`text-xs font-semibold ${
            isLight
              ? "text-gray-800"
              : "text-gray-300"
          }`}
        >
          {score}%
        </span>

      </div>

      <div
        className={`mt-2 h-2 overflow-hidden rounded-full ${
          isLight
            ? "bg-gray-200"
            : "bg-white/5"
        }`}
      >

        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   REASON
========================================================= */

function Reason({
  text,
  isLight,
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-[10px] ${
        isLight
          ? "border-gray-200 bg-white text-gray-600"
          : "border-white/10 bg-white/[0.025] text-gray-500"
      }`}
    >
      ✓ {text}
    </span>
  );
}

export default SearchIntelligence;