import { useMemo, useState } from "react";

/* =========================================================
   SMART SCHEDULER DATA
========================================================= */

const platformOptions = [
  {
    id: "YouTube",
    short: "YT",
    bestTime: "Thursday · 7:00 PM",
    confidence: "92%",
    reason:
      "Your technology videos have been performing strongest around Thursday evenings.",
  },
  {
    id: "Instagram",
    short: "IG",
    bestTime: "Thursday · 8:15 PM",
    confidence: "88%",
    reason:
      "Your audience activity becomes stronger after the evening peak begins.",
  },
  {
    id: "Facebook",
    short: "FB",
    bestTime: "Friday · 6:30 PM",
    confidence: "84%",
    reason:
      "Your Facebook audience shows stronger engagement during Friday evenings.",
  },
];

const initialUpcoming = [
  {
    id: 1,
    title: "10 Best AI Tools for Students",
    platform: "YouTube",
    date: "Sep 10",
    time: "7:00 PM",
    score: "91",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "AI Productivity Tips",
    platform: "Instagram",
    date: "Sep 11",
    time: "8:15 PM",
    score: "88",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Creator Setup 2026",
    platform: "YouTube",
    date: "Sep 17",
    time: "7:30 PM",
    score: "86",
    status: "Scheduled",
  },
];

const calendarDays = [
  { day: 7, label: "Mon" },
  { day: 8, label: "Tue" },
  { day: 9, label: "Wed" },
  {
    day: 10,
    label: "Thu",
    event: "10 Best AI Tools",
    time: "7:00 PM",
  },
  {
    day: 11,
    label: "Fri",
    event: "AI Productivity Tips",
    time: "8:15 PM",
  },
  { day: 12, label: "Sat" },
  { day: 13, label: "Sun" },
  { day: 14, label: "Mon" },
  { day: 15, label: "Tue" },
  { day: 16, label: "Wed" },
  {
    day: 17,
    label: "Thu",
    event: "Creator Setup",
    time: "7:30 PM",
  },
  { day: 18, label: "Fri" },
  { day: 19, label: "Sat" },
  { day: 20, label: "Sun" },
];

/* =========================================================
   MAIN SMART SCHEDULER
========================================================= */

function SmartScheduler({ theme = "dark" }) {
  const isLight = theme === "light";

  /* =======================================================
     THEME COLORS
  ======================================================= */

  const colors = {
    pageText: isLight ? "#111827" : "#ffffff",

    panelBackground: isLight ? "#ffffff" : "#090909",
    panelBorder: isLight ? "#e5e7eb" : "rgba(255,255,255,0.10)",

    secondaryBackground: isLight ? "#f9fafb" : "#080808",
    secondaryBorder: isLight ? "#e5e7eb" : "rgba(255,255,255,0.08)",

    inputBackground: isLight ? "#f9fafb" : "#0e0e0e",
    inputText: isLight ? "#111827" : "#d1d5db",
    inputBorder: isLight ? "#e5e7eb" : "rgba(255,255,255,0.10)",

    secondaryText: isLight ? "#4b5563" : "#6b7280",
    mutedText: isLight ? "#6b7280" : "#4b5563",
    primaryText: isLight ? "#111827" : "#ffffff",
  };

  /* =======================================================
     STATE
  ======================================================= */

  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "YouTube",
  ]);

  const [title, setTitle] = useState(() => {
  return (
    localStorage.getItem("kizenra_scheduler_title") || ""
  );
});

  const [selectedDate, setSelectedDate] = useState(
    "September 10, 2026"
  );

  const [selectedTime, setSelectedTime] = useState(
    "7:00 PM"
  );

  const [upcoming, setUpcoming] = useState(
    initialUpcoming
  );

  const [scheduled, setScheduled] = useState(false);

  /* =======================================================
     ACTIVE RECOMMENDATIONS
  ======================================================= */

  const activeRecommendations = useMemo(() => {
    return platformOptions.filter((platform) =>
      selectedPlatforms.includes(platform.id)
    );
  }, [selectedPlatforms]);

  /* =======================================================
     PLATFORM SELECTION
  ======================================================= */

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        if (prev.length === 1) {
          return prev;
        }

        return prev.filter((item) => item !== platform);
      }

      return [...prev, platform];
    });

    setScheduled(false);
  };

  /* =======================================================
     APPLY BEST TIME
  ======================================================= */

  const applyBestTime = (platform) => {
    const recommendation = platformOptions.find(
      (item) => item.id === platform
    );

    if (!recommendation) {
      return;
    }

    const timeOnly = recommendation.bestTime
      .split("·")[1]
      .trim();

    setSelectedTime(timeOnly);
    setScheduled(false);
  };

  /* =======================================================
     SCHEDULE CONTENT
  ======================================================= */

  const scheduleContent = () => {
    if (!title.trim()) {
      setScheduled(false);
      return;
    }

    const primaryPlatform = selectedPlatforms[0];

    const recommendation = platformOptions.find(
      (item) => item.id === primaryPlatform
    );

    const dateNumber =
      selectedDate.match(/\d+/)?.[0] || "10";

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      platform: primaryPlatform,
      date: `Sep ${dateNumber}`,
      time: selectedTime,
      score:
        recommendation?.confidence.replace("%", "") ||
        "88",
      status: "Scheduled",
    };

    setUpcoming((prev) => [newItem, ...prev]);

    setScheduled(true);
    setTitle("");
  };

  /* =======================================================
     INLINE STYLES FOR PROBLEM AREAS
     These intentionally override any conflicting CSS.
  ======================================================= */

  const recommendedWindowStyle = {
    backgroundColor: isLight ? "#ffffff" : "#080808",
    borderColor: isLight
      ? "#e9d5ff"
      : "rgba(255,255,255,0.10)",
    color: colors.primaryText,
  };

  const selectStyle = {
    backgroundColor: isLight ? "#ffffff" : "#0e0e0e",
    color: isLight ? "#111827" : "#d1d5db",
    borderColor: isLight
      ? "#e5e7eb"
      : "rgba(255,255,255,0.10)",
    colorScheme: isLight ? "light" : "dark",
  };

  return (
    <div
      style={{
        color: colors.pageText,
      }}
    >
      <PageShell
        eyebrow="Smart Scheduler"
        title="Publish when your audience is ready."
        description="Kizenra turns your audience activity and content performance into practical publishing recommendations."
        isLight={isLight}
      >

        {/* =================================================
            HERO
        ================================================= */}

        <div
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${
            isLight
              ? "border-purple-200 bg-purple-50"
              : "border-purple-500/20 bg-purple-500/[0.035]"
          }`}
        >

          <div
            className={`absolute -right-28 -top-28 h-72 w-72 rounded-full blur-[100px] ${
              isLight
                ? "bg-purple-300/20"
                : "bg-purple-600/10"
            }`}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">

            <div>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-medium text-green-500">
                  Kizenra scheduling intelligence
                </span>

              </div>

              <h2
                className={`mt-4 max-w-2xl text-2xl font-bold sm:text-3xl ${
                  isLight
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                Your best publishing window is{" "}
                <span className="text-purple-500">
                  Thursday at 7:00 PM.
                </span>
              </h2>

              <p
                className={`mt-3 max-w-2xl text-sm leading-7 ${
                  isLight
                    ? "text-gray-600"
                    : "text-gray-500"
                }`}
              >
                This recommendation combines your recent
                audience activity, platform performance, and
                content patterns.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <InsightPill
                  text="Audience activity: High"
                  isLight={isLight}
                />

                <InsightPill
                  text="Confidence: 92%"
                  isLight={isLight}
                />

                <InsightPill
                  text="Technology content: Strong"
                  isLight={isLight}
                />

              </div>

            </div>

            {/* =============================================
                RECOMMENDED WINDOW
            ============================================= */}

            <div
              className="rounded-2xl border p-5 shadow-sm"
              style={recommendedWindowStyle}
            >

              <p className="text-[10px] uppercase tracking-[0.18em] text-purple-500">
                Recommended window
              </p>

              <p
                className="mt-3 text-2xl font-bold"
                style={{
                  color: isLight ? "#111827" : "#ffffff",
                }}
              >
                Thursday · 7:00 PM
              </p>

              <div
                className="mt-5 h-2 overflow-hidden rounded-full"
                style={{
                  backgroundColor: isLight
                    ? "#e5e7eb"
                    : "rgba(255,255,255,0.05)",
                }}
              >

                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-purple-700 to-purple-400" />

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span
                  className="text-xs"
                  style={{
                    color: isLight
                      ? "#4b5563"
                      : "#6b7280",
                  }}
                >
                  Audience activity
                </span>

                <span className="text-xs font-semibold text-green-500">
                  92% confidence
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BEST WINDOWS
        ================================================= */}

        <div
          className="mt-5 rounded-2xl border p-6"
          style={{
            backgroundColor: colors.panelBackground,
            borderColor: colors.panelBorder,
          }}
        >

          <SectionHeader
            title="Best publishing windows"
            subtitle="Kizenra recommendations for your connected platforms"
            isLight={isLight}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">

            {platformOptions.map((platform) => (

              <RecommendationCard
                key={platform.id}
                platform={platform}
                active={selectedPlatforms.includes(
                  platform.id
                )}
                onSelect={() =>
                  togglePlatform(platform.id)
                }
                onApply={() =>
                  applyBestTime(platform.id)
                }
                isLight={isLight}
              />

            ))}

          </div>

        </div>

        {/* =================================================
            SCHEDULING BUILDER
        ================================================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">

          {/* SCHEDULE FORM */}

          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: colors.panelBackground,
              borderColor: colors.panelBorder,
            }}
          >

            <SectionHeader
              title="Schedule content"
              subtitle="Choose what you want Kizenra to publish"
              isLight={isLight}
            />

            <div className="mt-6 space-y-5">

              {/* TITLE */}

              <div>

                <label
                  className="text-xs font-medium"
                  style={{
                    color: isLight
                      ? "#374151"
                      : "#9ca3af",
                  }}
                >
                  Content title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setScheduled(false);
                  }}
                  placeholder="e.g. 10 Best AI Tools for Students"
                  className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                  style={{
                    backgroundColor: colors.inputBackground,
                    color: colors.inputText,
                    borderColor: colors.inputBorder,
                  }}
                />

              </div>

              {/* PLATFORMS */}

              <div>

                <p
                  className="text-xs font-medium"
                  style={{
                    color: isLight
                      ? "#374151"
                      : "#9ca3af",
                  }}
                >
                  Publish to
                </p>

                <div className="mt-2 grid gap-2 sm:grid-cols-3">

                  {platformOptions.map((platform) => {

                    const active =
                      selectedPlatforms.includes(
                        platform.id
                      );

                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() =>
                          togglePlatform(platform.id)
                        }
                        className="rounded-xl border px-4 py-3 text-left text-xs transition"
                        style={{
                          backgroundColor: active
                            ? isLight
                              ? "#faf5ff"
                              : "rgba(168,85,247,0.10)"
                            : isLight
                              ? "#f9fafb"
                              : "rgba(255,255,255,0.02)",

                          borderColor: active
                            ? isLight
                              ? "#d8b4fe"
                              : "rgba(168,85,247,0.30)"
                            : isLight
                              ? "#e5e7eb"
                              : "rgba(255,255,255,0.10)",

                          color: active
                            ? isLight
                              ? "#9333ea"
                              : "#d8b4fe"
                            : isLight
                              ? "#6b7280"
                              : "#6b7280",
                        }}
                      >

                        <div className="flex items-center justify-between">

                          <span className="font-semibold">
                            {platform.short}
                          </span>

                          {active && (
                            <span className="text-green-500">
                              ✓
                            </span>
                          )}

                        </div>

                        <p className="mt-1">
                          {platform.id}
                        </p>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* DATE + TIME */}

              <div className="grid gap-4 sm:grid-cols-2">

                {/* DATE */}

                <div>

                  <label
                    className="text-xs font-medium"
                    style={{
                      color: isLight
                        ? "#374151"
                        : "#9ca3af",
                    }}
                  >
                    Publish date
                  </label>

                  <select
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(
                        event.target.value
                      );
                      setScheduled(false);
                    }}
                    className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                    style={selectStyle}
                  >

                    <option value="September 10, 2026">
                      September 10, 2026
                    </option>

                    <option value="September 11, 2026">
                      September 11, 2026
                    </option>

                    <option value="September 17, 2026">
                      September 17, 2026
                    </option>

                    <option value="September 18, 2026">
                      September 18, 2026
                    </option>

                  </select>

                </div>

                {/* TIME */}

                <div>

                  <label
                    className="text-xs font-medium"
                    style={{
                      color: isLight
                        ? "#374151"
                        : "#9ca3af",
                    }}
                  >
                    Publish time
                  </label>

                  <select
                    value={selectedTime}
                    onChange={(event) => {
                      setSelectedTime(
                        event.target.value
                      );
                      setScheduled(false);
                    }}
                    className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
                    style={selectStyle}
                  >

                    <option value="6:30 PM">
                      6:30 PM
                    </option>

                    <option value="7:00 PM">
                      7:00 PM
                    </option>

                    <option value="7:30 PM">
                      7:30 PM
                    </option>

                    <option value="8:15 PM">
                      8:15 PM
                    </option>

                  </select>

                </div>

              </div>

              {/* RECOMMENDATION */}

              <div
                className="rounded-2xl border p-4"
                style={{
                  backgroundColor: isLight
                    ? "#faf5ff"
                    : "rgba(168,85,247,0.025)",
                  borderColor: isLight
                    ? "#e9d5ff"
                    : "rgba(168,85,247,0.10)",
                }}
              >

                <p className="text-[10px] uppercase tracking-[0.18em] text-purple-500">
                  Kizenra recommendation
                </p>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{
                    color: isLight
                      ? "#4b5563"
                      : "#6b7280",
                  }}
                >
                  {activeRecommendations[0]?.reason ||
                    "Choose a platform to see Kizenra's publishing recommendation."}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    activeRecommendations[0] &&
                    applyBestTime(
                      activeRecommendations[0].id
                    )
                  }
                  className="mt-4 text-xs font-semibold text-purple-500 transition hover:text-purple-400"
                >
                  Apply recommended time →
                </button>

              </div>

              {/* SCHEDULE BUTTON */}

              <button
                type="button"
                onClick={scheduleContent}
                className="w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-purple-500"
              >
                Schedule Content →
              </button>

              {!title.trim() && (
                <p
                  className="text-center text-[10px]"
                  style={{
                    color: isLight
                      ? "#9ca3af"
                      : "#4b5563",
                  }}
                >
                  Add a content title before scheduling.
                </p>
              )}

              {scheduled && (
                <div
                  className="rounded-xl border p-4 text-center"
                  style={{
                    backgroundColor: isLight
                      ? "#f0fdf4"
                      : "rgba(34,197,94,0.04)",
                    borderColor: isLight
                      ? "#bbf7d0"
                      : "rgba(34,197,94,0.10)",
                  }}
                >

                  <p className="text-sm font-semibold text-green-500">
                    Content scheduled successfully
                  </p>

                  <p
                    className="mt-1 text-xs"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    Kizenra added your content to Upcoming.
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* =================================================
              WHY THIS TIME
          ================================================= */}

          <div
            className="relative overflow-hidden rounded-2xl border p-6"
            style={{
              backgroundColor: colors.panelBackground,
              borderColor: colors.panelBorder,
            }}
          >

            <div
              className={`absolute -right-20 -top-20 h-52 w-52 rounded-full blur-[80px] ${
                isLight
                  ? "bg-purple-200/30"
                  : "bg-purple-600/10"
              }`}
            />

            <div className="relative">

              <SectionHeader
                title="Why this time?"
                subtitle="Kizenra explains every recommendation"
                isLight={isLight}
              />

              <div className="mt-6 space-y-4">

                <WhyRow
                  number="01"
                  title="Audience activity"
                  text="Most of your active viewers appear between 6 PM and 9 PM."
                  isLight={isLight}
                />

                <WhyRow
                  number="02"
                  title="Content performance"
                  text="Your recent technology content performs better during Thursday evenings."
                  isLight={isLight}
                />

                <WhyRow
                  number="03"
                  title="Recent pattern"
                  text="Your last three strong-performing uploads were published around this window."
                  isLight={isLight}
                />

              </div>

              <div
                className="mt-6 rounded-2xl border p-5"
                style={{
                  backgroundColor: isLight
                    ? "#f0fdf4"
                    : "rgba(34,197,94,0.03)",
                  borderColor: isLight
                    ? "#bbf7d0"
                    : "rgba(34,197,94,0.10)",
                }}
              >

                <p className="text-xs font-semibold text-green-500">
                  Recommendation confidence
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-4xl font-bold">
                    92%
                  </p>

                  <span
                    className="text-xs"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    Strong match
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            CONTENT CALENDAR
        ================================================= */}

        <div
          className="mt-5 rounded-2xl border p-6"
          style={{
            backgroundColor: colors.panelBackground,
            borderColor: colors.panelBorder,
          }}
        >

          <SectionHeader
            title="Content calendar"
            subtitle="September 2026 · Scheduled creator content"
            isLight={isLight}
          />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">

            {calendarDays.map((item) => {

              const itemDate =
                `September ${item.day}, 2026`;

              const selected =
                selectedDate === itemDate;

              return (
                <button
                  key={`${item.label}-${item.day}`}
                  type="button"
                  onClick={() => {
                    setSelectedDate(itemDate);
                    setScheduled(false);
                  }}
                  className="min-h-[125px] rounded-2xl border p-3 text-left transition"
                  style={{
                    backgroundColor: selected
                      ? isLight
                        ? "#faf5ff"
                        : "rgba(168,85,247,0.06)"
                      : isLight
                        ? "#f9fafb"
                        : "rgba(255,255,255,0.02)",

                    borderColor: selected
                      ? isLight
                        ? "#d8b4fe"
                        : "rgba(168,85,247,0.30)"
                      : isLight
                        ? "#e5e7eb"
                        : "rgba(255,255,255,0.05)",
                  }}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className="text-[10px] uppercase tracking-wider"
                      style={{
                        color: isLight
                          ? "#6b7280"
                          : "#4b5563",
                      }}
                    >
                      {item.label}
                    </span>

                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: isLight
                          ? "#374151"
                          : "#d1d5db",
                      }}
                    >
                      {item.day}
                    </span>

                  </div>

                  {item.event ? (

                    <div
                      className="mt-5 rounded-xl border p-2.5"
                      style={{
                        backgroundColor: isLight
                          ? "#ffffff"
                          : "rgba(168,85,247,0.05)",
                        borderColor: isLight
                          ? "#e9d5ff"
                          : "rgba(168,85,247,0.10)",
                      }}
                    >

                      <p className="truncate text-[10px] font-semibold text-purple-500">
                        {item.event}
                      </p>

                      <p
                        className="mt-1 text-[9px]"
                        style={{
                          color: colors.secondaryText,
                        }}
                      >
                        {item.time}
                      </p>

                    </div>

                  ) : (

                    <p
                      className="mt-8 text-[10px]"
                      style={{
                        color: isLight
                          ? "#9ca3af"
                          : "#374151",
                      }}
                    >
                      No content
                    </p>

                  )}

                </button>
              );
            })}

          </div>

        </div>

        {/* =================================================
            UPCOMING CONTENT
        ================================================= */}

        <div
          className="mt-5 rounded-2xl border p-6"
          style={{
            backgroundColor: colors.panelBackground,
            borderColor: colors.panelBorder,
          }}
        >

          <SectionHeader
            title="Upcoming content"
            subtitle={`${upcoming.length} scheduled items`}
            isLight={isLight}
          />

          <div className="mt-5 space-y-3">

            {upcoming.length === 0 ? (

              <div
                className="rounded-2xl border border-dashed p-8 text-center"
                style={{
                  backgroundColor: colors.secondaryBackground,
                  borderColor: colors.secondaryBorder,
                }}
              >

                <p className="text-sm font-semibold">
                  No scheduled content
                </p>

                <p
                  className="mt-2 text-xs"
                  style={{
                    color: colors.secondaryText,
                  }}
                >
                  Schedule your next content item above.
                </p>

              </div>

            ) : (

              upcoming.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center"
                  style={{
                    backgroundColor: colors.secondaryBackground,
                    borderColor: colors.secondaryBorder,
                  }}
                >

                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                    style={{
                      backgroundColor: isLight
                        ? "#faf5ff"
                        : "rgba(168,85,247,0.10)",
                      color: isLight
                        ? "#9333ea"
                        : "#d8b4fe",
                    }}
                  >
                    {item.platform === "YouTube"
                      ? "YT"
                      : item.platform === "Instagram"
                        ? "IG"
                        : "FB"}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p
                      className="truncate text-sm font-semibold"
                      style={{
                        color: isLight
                          ? "#1f2937"
                          : "#d1d5db",
                      }}
                    >
                      {item.title}
                    </p>

                    <p
                      className="mt-1 text-[10px]"
                      style={{
                        color: colors.secondaryText,
                      }}
                    >
                      {item.platform} · {item.date} ·{" "}
                      {item.time}
                    </p>

                  </div>

                  <div className="flex flex-wrap items-center gap-4">

                    <div className="text-right">

                      <p
                        className="text-[10px] uppercase tracking-wider"
                        style={{
                          color: isLight
                            ? "#9ca3af"
                            : "#374151",
                        }}
                      >
                        Standout
                      </p>

                      <p className="mt-1 text-sm font-bold text-purple-500">
                        {item.score}
                      </p>

                    </div>

                    <span
                      className="rounded-full border px-3 py-1.5 text-[9px] font-semibold"
                      style={{
                        backgroundColor: isLight
                          ? "#f0fdf4"
                          : "rgba(34,197,94,0.04)",
                        borderColor: isLight
                          ? "#bbf7d0"
                          : "rgba(34,197,94,0.10)",
                        color: isLight
                          ? "#16a34a"
                          : "#4ade80",
                      }}
                    >
                      {item.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setUpcoming((prev) =>
                          prev.filter(
                            (upcomingItem) =>
                              upcomingItem.id !== item.id
                          )
                        )
                      }
                      className="rounded-lg border px-3 py-2 text-[10px] transition"
                      style={{
                        backgroundColor: isLight
                          ? "#ffffff"
                          : "transparent",
                        borderColor: isLight
                          ? "#e5e7eb"
                          : "rgba(255,255,255,0.10)",
                        color: isLight
                          ? "#6b7280"
                          : "#6b7280",
                      }}
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))

            )}

          </div>

        </div>

        <Footer isLight={isLight} />

      </PageShell>
    </div>
  );
}

/* =========================================================
   RECOMMENDATION CARD
========================================================= */

function RecommendationCard({
  platform,
  active,
  onSelect,
  onApply,
  isLight,
}) {
  return (
    <div
      className="rounded-2xl border p-5 transition"
      style={{
        backgroundColor: active
          ? isLight
            ? "#faf5ff"
            : "rgba(168,85,247,0.035)"
          : isLight
            ? "#f9fafb"
            : "rgba(255,255,255,0.02)",

        borderColor: active
          ? isLight
            ? "#e9d5ff"
            : "rgba(168,85,247,0.20)"
          : isLight
            ? "#e5e7eb"
            : "rgba(255,255,255,0.10)",
      }}
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold"
            style={{
              backgroundColor: isLight
                ? "#ffffff"
                : "rgba(255,255,255,0.05)",
              color: isLight
                ? "#374151"
                : "#d1d5db",
            }}
          >
            {platform.short}
          </div>

          <div>

            <p
              className="text-sm font-semibold"
              style={{
                color: isLight
                  ? "#111827"
                  : "#ffffff",
              }}
            >
              {platform.id}
            </p>

            <p
              className="mt-1 text-[10px]"
              style={{
                color: isLight
                  ? "#6b7280"
                  : "#4b5563",
              }}
            >
              Best match for your audience
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={onSelect}
          className="h-6 w-6 rounded-md border text-xs transition"
          style={{
            backgroundColor: active
              ? isLight
                ? "#faf5ff"
                : "rgba(168,85,247,0.10)"
              : "transparent",
            borderColor: active
              ? isLight
                ? "#d8b4fe"
                : "rgba(168,85,247,0.30)"
              : isLight
                ? "#e5e7eb"
                : "rgba(255,255,255,0.10)",
            color: active
              ? isLight
                ? "#9333ea"
                : "#d8b4fe"
              : isLight
                ? "#9ca3af"
                : "#4b5563",
          }}
        >
          {active ? "✓" : ""}
        </button>

      </div>

      <p
        className="mt-6 text-xl font-bold"
        style={{
          color: isLight
            ? "#111827"
            : "#ffffff",
        }}
      >
        {platform.bestTime}
      </p>

      <div className="mt-4 flex items-center justify-between">

        <span
          className="text-[10px]"
          style={{
            color: isLight
              ? "#6b7280"
              : "#4b5563",
          }}
        >
          Confidence
        </span>

        <span className="text-[10px] font-semibold text-green-500">
          {platform.confidence}
        </span>

      </div>

      <p
        className="mt-4 text-xs leading-6"
        style={{
          color: isLight
            ? "#6b7280"
            : "#4b5563",
        }}
      >
        {platform.reason}
      </p>

      <button
        type="button"
        onClick={onApply}
        className="mt-5 w-full rounded-xl border px-4 py-2.5 text-xs font-semibold transition"
        style={{
          backgroundColor: isLight
            ? "#ffffff"
            : "transparent",
          borderColor: isLight
            ? "#e5e7eb"
            : "rgba(255,255,255,0.10)",
          color: isLight
            ? "#4b5563"
            : "#9ca3af",
        }}
      >
        Use this window
      </button>

    </div>
  );
}

/* =========================================================
   INSIGHT PILL
========================================================= */

function InsightPill({
  text,
  isLight,
}) {
  return (
    <span
      className="rounded-full border px-3 py-1.5 text-[10px]"
      style={{
        backgroundColor: isLight
          ? "#ffffff"
          : "rgba(255,255,255,0.025)",
        borderColor: isLight
          ? "#e5e7eb"
          : "rgba(255,255,255,0.10)",
        color: isLight
          ? "#6b7280"
          : "#6b7280",
      }}
    >
      {text}
    </span>
  );
}

/* =========================================================
   WHY ROW
========================================================= */

function WhyRow({
  number,
  title,
  text,
  isLight,
}) {
  return (
    <div
      className="flex gap-4 rounded-2xl border p-4"
      style={{
        backgroundColor: isLight
          ? "#f9fafb"
          : "rgba(255,255,255,0.02)",
        borderColor: isLight
          ? "#e5e7eb"
          : "rgba(255,255,255,0.05)",
      }}
    >

      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
        style={{
          backgroundColor: isLight
            ? "#faf5ff"
            : "rgba(168,85,247,0.10)",
          color: isLight
            ? "#9333ea"
            : "#a855f7",
        }}
      >
        {number}
      </div>

      <div>

        <p
          className="text-sm font-semibold"
          style={{
            color: isLight
              ? "#111827"
              : "#d1d5db",
          }}
        >
          {title}
        </p>

        <p
          className="mt-2 text-xs leading-6"
          style={{
            color: isLight
              ? "#6b7280"
              : "#4b5563",
          }}
        >
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   PAGE SHELL
========================================================= */

function PageShell({
  eyebrow,
  title,
  description,
  children,
  isLight,
}) {
  return (
    <div
      className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8"
      style={{
        color: isLight
          ? "#111827"
          : "#ffffff",
      }}
    >

      <div className="max-w-4xl">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
          {eyebrow}
        </p>

        <h1
          className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl"
          style={{
            color: isLight
              ? "#111827"
              : "#ffffff",
          }}
        >
          {title}
        </h1>

        <p
          className="mt-4 max-w-2xl text-sm leading-7 sm:text-base"
          style={{
            color: isLight
              ? "#6b7280"
              : "#6b7280",
          }}
        >
          {description}
        </p>

      </div>

      <div className="mt-8">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
  isLight,
}) {
  return (
    <div>

      <p
        className="text-sm font-semibold"
        style={{
          color: isLight
            ? "#111827"
            : "#ffffff",
        }}
      >
        {title}
      </p>

      <p
        className="mt-1 text-[11px]"
        style={{
          color: isLight
            ? "#6b7280"
            : "#4b5563",
        }}
      >
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({
  isLight,
}) {
  return (
    <footer
      className="mt-12 border-t py-7"
      style={{
        borderColor: isLight
          ? "#e5e7eb"
          : "rgba(255,255,255,0.10)",
      }}
    >

      <div className="flex flex-col justify-between gap-3 text-xs sm:flex-row">

        <p
          style={{
            color: isLight
              ? "#9ca3af"
              : "#374151",
          }}
        >
          © 2026 Kizenra · Polish it before publish it.
        </p>

        <p className="text-purple-500/60">
          Built with Love for Creators
        </p>

      </div>

    </footer>
  );
}

export default SmartScheduler;