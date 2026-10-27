import { useMemo, useState } from "react";
import ConnectedPlatforms from "./ConnectedPlatforms";
import kizenraLogo from "../assets/kizenra-logo.png";
import Settings from "./Settings";
import CreatorProfile from "./CreatorProfile";
import SearchIntelligence from "./SearchIntelligence";
import SmartScheduler from "./SmartScheduler";
import PrePublishIntelligence from "./PrePublishIntelligence";
import SaraAI from "./SaraAI";

const platformData = {
  YouTube: {
    short: "YT",
    color: "red",
    overview: { totalViews: "824K", viewsChange: "+21.4%", reachChange: "+21.4%", engagement: "8.7%", engagementChange: "+4.3%", audienceGrowth: "+12.4K", audienceChange: "+8.1%", contentScore: "91", scoreChange: "+6 points", followers: "80.4K subscribers" },
    analytics: { views: "824K", viewsChange: "+21.4%", watchTime: "284K", watchTimeChange: "+11.4%", engagement: "8.7%", engagementChange: "+4.3%", followers: "+12.4K", followersChange: "+8.1%" },
    chart: [30, 38, 45, 41, 55, 49, 62, 58, 70, 65, 77, 73, 84, 80, 92],
  },
  Instagram: {
    short: "IG",
    color: "pink",
    overview: { totalViews: "284K", viewsChange: "+14.7%", reachChange: "+14.7%", engagement: "6.9%", engagementChange: "+3.6%", audienceGrowth: "+8.2K", audienceChange: "+6.4%", contentScore: "86", scoreChange: "+4 points", followers: "30.2K followers" },
    analytics: { views: "284K", viewsChange: "+14.7%", watchTime: "96K", watchTimeChange: "+9.8%", engagement: "6.9%", engagementChange: "+3.6%", followers: "+8.2K", followersChange: "+6.4%" },
    chart: [25, 34, 39, 42, 48, 44, 57, 61, 58, 69, 72, 75, 81, 86, 90],
  },
  Facebook: {
    short: "FB",
    color: "blue",
    overview: { totalViews: "132K", viewsChange: "+8.9%", reachChange: "+8.9%", engagement: "5.4%", engagementChange: "+2.8%", audienceGrowth: "+4.1K", audienceChange: "+4.6%", contentScore: "82", scoreChange: "+3 points", followers: "12.8K followers" },
    analytics: { views: "132K", viewsChange: "+8.9%", watchTime: "52K", watchTimeChange: "+6.7%", engagement: "5.4%", engagementChange: "+2.8%", followers: "+4.1K", followersChange: "+4.6%" },
    chart: [20, 28, 32, 30, 37, 42, 40, 48, 53, 50, 61, 64, 69, 74, 79],
  },
};

function parseChange(value) {
  const parsed = Number(String(value).replace("%", "").replace("+", "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

function getPlatformHealth(platformName) {
  const data = platformData[platformName]?.overview;
  if (!data) return { name: platformName, score: 0, reachChange: 0, engagementChange: 0, audienceChange: 0, contentScore: 0 };

  const reachChange = parseChange(data.reachChange);
  const engagementChange = parseChange(data.engagementChange);
  const audienceChange = parseChange(data.audienceChange);
  const contentScore = Number(data.contentScore) || 0;

  const reachHealth = clamp(65 + reachChange);
  const engagementHealth = clamp(65 + engagementChange * 2);
  const audienceHealth = clamp(65 + audienceChange * 1.5);
  const healthScore = Math.round((contentScore + reachHealth + engagementHealth + audienceHealth) / 4);

  return { name: platformName, score: healthScore, reachChange, engagementChange, audienceChange, contentScore };
}

function getHeartStatus(score) {
  if (score >= 80) return { label: "Healthy", color: "green", description: "Your creator ecosystem is performing well across your connected platforms." };
  if (score >= 60) return { label: "Needs Attention", color: "yellow", description: "Your overall creator performance is stable but some signals need attention." };
  if (score >= 40) return { label: "Weakening", color: "orange", description: "Your creator performance is weakening and deserves attention." };
  return { label: "Critical", color: "red", description: "Your creator ecosystem is showing significant performance weakness." };
}

function Dashboard({ onLogout, theme, onThemeChange }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [activePage, setActivePage] = useState(() => localStorage.getItem("kizenra_active_page") || "Overview");
  const [creatorMenuOpen, setCreatorMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");

  const [platforms, setPlatforms] = useState({
    youtube: { connected: true, name: "Kizenra Creator", handle: "@kizenra", followers: "80.4K subscribers", lastSync: "2 minutes ago" },
    instagram: { connected: true, name: "Karthik Reddy", handle: "@karthikreddy", followers: "30.2K followers", lastSync: "2 minutes ago" },
    facebook: { connected: true, name: "Karthik Reddy Page", handle: "Karthik Reddy", followers: "12.8K followers", lastSync: "2 minutes ago" },
  });

  const connectedCount = Object.values(platforms).filter((p) => p.connected).length;
  const platformNameMap = { youtube: "YouTube", instagram: "Instagram", facebook: "Facebook" };

  const heartPlatforms = Object.entries(platforms)
    .filter(([, p]) => p.connected)
    .map(([key]) => getPlatformHealth(platformNameMap[key]))
    .filter((p) => p.name);

  const heartScore = heartPlatforms.length > 0 ? Math.round(heartPlatforms.reduce((tot, p) => tot + p.score, 0) / heartPlatforms.length) : 0;
  const heartStatus = getHeartStatus(heartScore);
  const weakeningPlatforms = heartPlatforms.filter((p) => p.reachChange < 0).sort((a, b) => a.reachChange - b.reachChange);
  const heartAlert = weakeningPlatforms.length > 0 ? { active: true, platform: weakeningPlatforms[0].name, reachChange: weakeningPlatforms[0].reachChange } : { active: false, platform: null, reachChange: 0 };

  const togglePlatform = (platform) => {
    setPlatforms((prev) => {
      const current = prev[platform];
      if (!current) return prev;
      if (current.connected) return { ...prev, [platform]: { ...current, connected: false } };
      return {
        ...prev,
        [platform]: {
          ...current,
          connected: true,
          name: platform === "youtube" ? "Kizenra Creator" : platform === "instagram" ? "Karthik Reddy" : "Karthik Reddy Page",
          handle: platform === "youtube" ? "@kizenra" : platform === "instagram" ? "@karthikreddy" : "Karthik Reddy",
          followers: platform === "youtube" ? "80.4K subscribers" : platform === "instagram" ? "30.2K followers" : "12.8K followers",
          lastSync: "Just now",
        },
      };
    });
  };

  const requestLogout = () => { setCreatorMenuOpen(false); setLogoutConfirm(true); };

  const navigation = [
    { name: "Overview", icon: "⌂" },
    { name: "Content Intelligence", icon: "◈" },
    { name: "Analytics", icon: "↗" },
    { name: "Comment Intelligence", icon: "◌" },
    { name: "Pre-Publish", icon: "✦" },
    { name: "Reports", icon: "▤" },
    { name: "Settings", icon: "⚙" },
    { name: "Search Intelligence", icon: "⌕" },
    { name: "Smart Scheduler", icon: "◷" },
  ];

  const searchableContent = [
    { title: "How I Built My AI Workflow", platform: "YouTube", score: "91" },
    { title: "5 Tools Every Creator Needs", platform: "Instagram", score: "86" },
    { title: "My Creator Setup 2026", platform: "YouTube", score: "82" },
    { title: "How I Grew My Instagram Audience", platform: "Instagram", score: "88" },
    { title: "Facebook Creator Strategy", platform: "Facebook", score: "84" },
  ];

  const searchResults = searchableContent.filter((item) => `${item.title} ${item.platform}`.toLowerCase().includes(searchQuery.toLowerCase()));

  const goTo = (page) => { setActivePage(page); localStorage.setItem("kizenra_active_page", page); setCreatorMenuOpen(false); };
  const handlePlatformChange = (platform) => setSelectedPlatform(platform);
  const openReport = (report) => { setSelectedReport(report); setActivePage("Report Details"); localStorage.setItem("kizenra_active_page", "Report Details"); };
  const backToReports = () => { setSelectedReport(null); setActivePage("Reports"); localStorage.setItem("kizenra_active_page", "Reports"); };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-[#f5f5f7] text-gray-900" : "bg-[#050505] text-white"}`}>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[250px] overflow-hidden border-r border-white/10 bg-[#080808] lg:flex lg:flex-col">
        <div className="flex h-[78px] shrink-0 items-center border-b border-white/10 px-6">
          <img src={kizenraLogo} alt="Kizenra" className="h-9 w-auto object-contain" />
          <span className="ml-3 text-lg font-bold tracking-tight">KIZENRA<span className="text-purple-500">.</span></span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-6 [scrollbar-width:thin]">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Workspace</p>
          <div className="mt-4 space-y-1">
            {navigation.map((item) => (
              <button key={item.name} type="button" onClick={() => goTo(item.name)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all duration-300 ${activePage === item.name ? "bg-purple-500/10 text-white shadow-[inset_2px_0_0_rgba(168,85,247,0.8)]" : "text-gray-500 hover:bg-white/[0.04] hover:text-white"}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${activePage === item.name ? "bg-purple-500/20 text-purple-400" : "bg-white/[0.03] text-gray-500 group-hover:bg-white/[0.06]"}`}>{item.icon}</span>
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                {activePage === item.name && <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400 shadow-lg shadow-purple-500/70" />}
              </button>
            ))}
          </div>
          <div className="mt-8 border-t border-white/[0.06] pt-6">
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/10 bg-purple-500/[0.04] p-4">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <div className="sara-mini-orb flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">✦</div>
                <div className="min-w-0"><p className="text-sm font-semibold">Sara AI</p><p className="text-[11px] text-gray-600">Creator assistant</p></div>
              </div>
              <button type="button" onClick={() => goTo("Sara AI")} className={`relative mt-4 w-full rounded-xl py-2 text-xs font-semibold transition ${theme === "light" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700" : "bg-purple-600/15 text-purple-300 hover:bg-purple-600/25 hover:text-purple-200"}`}>Talk to Sara →</button>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-40 flex h-[78px] items-center border-b border-white/10 bg-[#050505]/90 px-5 backdrop-blur-2xl sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <img src={kizenraLogo} alt="Kizenra" className="h-8 w-auto" />
            <span className="font-bold">KIZENRA<span className="text-purple-500">.</span></span>
          </div>

          <div className="relative ml-8 hidden w-full max-w-md md:block lg:ml-0">
            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/50">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((item) => (
                      <button key={`${item.platform}-${item.title}`} type="button" onClick={() => { setSearchQuery(""); goTo("Overview"); }} className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">▶</div>
                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-gray-300">{item.title}</p><p className="mt-1 text-[10px] text-gray-600">{item.platform} · Score {item.score}</p></div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center"><p className="text-sm text-gray-400">No content found</p><p className="mt-1 text-[10px] text-gray-700">Try searching for a title or platform.</p></div>
                )}
              </div>
            )}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 transition focus-within:border-purple-500/30">
              <span className="text-gray-600">⌕</span>
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-700" placeholder="Search your content..." />
              <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-700">/</span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/[0.025] p-1 sm:flex">
              <button type="button" onClick={() => handlePlatformChange("YouTube")} className={`rounded-lg px-2.5 py-1.5 text-xs transition ${selectedPlatform === "YouTube" ? "bg-red-500/10 text-red-400" : "text-gray-600 hover:bg-white/5 hover:text-gray-300"}`}>YT</button>
              <button type="button" onClick={() => handlePlatformChange("Instagram")} className={`rounded-lg px-2.5 py-1.5 text-xs transition ${selectedPlatform === "Instagram" ? "bg-pink-500/10 text-pink-400" : "text-gray-600 hover:bg-white/5 hover:text-gray-300"}`}>IG</button>
              <button type="button" onClick={() => handlePlatformChange("Facebook")} className={`rounded-lg px-2.5 py-1.5 text-xs transition ${selectedPlatform === "Facebook" ? "bg-blue-500/10 text-blue-400" : "text-gray-600 hover:bg-white/5 hover:text-gray-300"}`}>FB</button>
            </div>

            <button type="button" onClick={() => goTo("Overview")} className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-500 transition hover:border-purple-500/20 hover:text-white" aria-label="Creator health notifications">
              ♢
              <span className={`absolute right-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full ${heartAlert.active ? "bg-red-400 shadow-lg shadow-red-400/50" : "bg-purple-500"}`} />
            </button>

            <div className="relative">
              <button type="button" onClick={() => setCreatorMenuOpen(!creatorMenuOpen)} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition hover:bg-white/10">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold">K</div>
                <div className="hidden text-left sm:block"><p className="text-sm font-semibold text-white">Karthik Reddy</p><p className="text-xs text-gray-400">Creator</p></div>
                <span className="text-gray-400">{creatorMenuOpen ? "▲" : "▼"}</span>
              </button>

              {creatorMenuOpen && (
                <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/50">
                  <div className="border-b border-white/10 px-4 py-4"><p className="font-semibold text-white">Karthik Reddy</p><p className="text-xs text-gray-400">Creator Account</p></div>
                  <div className="p-2">
                    <button type="button" onClick={() => goTo("Creator Profile")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">👤<span>Creator Profile</span></button>
                    <button type="button" onClick={() => goTo("Connected Platforms")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">🔗<span>Connected Platforms</span></button>
                    <button type="button" onClick={() => goTo("Settings")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">⚙️<span>Settings</span></button>
                  </div>
                  <div className="border-t border-white/10 p-2">
                    <button type="button" onClick={requestLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="border-b border-white/10 bg-[#080808] px-4 py-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {navigation.map((item) => (
              <button type="button" key={item.name} onClick={() => goTo(item.name)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs transition ${activePage === item.name ? "bg-purple-500/15 text-purple-300" : "text-gray-600 hover:bg-white/[0.03] hover:text-gray-300"}`}>
                {item.icon} {item.name}
              </button>
            ))}
            <button type="button" onClick={() => goTo("Sara AI")} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs ${activePage === "Sara AI" ? "bg-purple-500/15 text-purple-300" : "text-gray-600"}`}>✦ Sara AI</button>
          </div>
        </div>

        {activePage === "Overview" && <Overview goTo={goTo} selectedPlatform={selectedPlatform} heartScore={heartScore} heartStatus={heartStatus} heartPlatforms={heartPlatforms} heartAlert={heartAlert} />}
        {activePage === "Content Intelligence" && <ContentIntelligence />}
        {activePage === "Analytics" && <Analytics selectedPlatform={selectedPlatform} />}
        {activePage === "Comment Intelligence" && <CommentIntelligence />}
        {activePage === "Settings" && <Settings onRequestLogout={requestLogout} onNavigate={goTo} connectedCount={connectedCount} theme={theme} onThemeChange={onThemeChange} />}
        {activePage === "Creator Profile" && <CreatorProfile connectedCount={connectedCount} />}
        {activePage === "Connected Platforms" && <ConnectedPlatforms platforms={platforms} connectedCount={connectedCount} onTogglePlatform={togglePlatform} />}
        {activePage === "Pre-Publish" && <PrePublishIntelligence theme={theme} goTo={goTo} />}
        {activePage === "Reports" && <Reports onOpenReport={openReport} />}
        {activePage === "Report Details" && selectedReport && <ReportDetails report={selectedReport} onBack={backToReports} />}
        {activePage === "Sara AI" && <SaraAI theme={theme} goTo={goTo} />}
        {activePage === "Search Intelligence" && <SearchIntelligence theme={theme} goTo={goTo} />}
        {activePage === "Smart Scheduler" && <SmartScheduler theme={theme} />}
      </main>

      {logoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl shadow-black/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-xl text-red-400">
              <img src={kizenraLogo} alt="Kizenra" className="h-7 w-auto object-contain" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Are you sure?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">Do you really want to log out of your Kizenra creator account?</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setLogoutConfirm(false)} className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white">Cancel</button>
              <button type="button" onClick={() => { setLogoutConfirm(false); localStorage.removeItem("kizenra_active_page"); onLogout(); }} className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Overview({ goTo, selectedPlatform, heartScore, heartStatus, heartPlatforms, heartAlert }) {
  const data = platformData[selectedPlatform].overview;
  const chart = platformData[selectedPlatform].chart;

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/40" /><span className="text-xs text-green-400">Kizenra Intelligence is active</span></div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Good evening, Creator.</h1>
          <p className="mt-2 text-sm text-gray-600">Showing insights for <span className="text-gray-400">{selectedPlatform}</span>.</p>
        </div>
        <button type="button" onClick={() => goTo("Pre-Publish")} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-purple-600/10 transition hover:-translate-y-0.5 hover:bg-purple-500">+ Analyze New Content</button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric title="Total Views" value={data.totalViews} change={data.viewsChange} icon="◉" />
        <Metric title="Engagement" value={data.engagement} change={data.engagementChange} icon="↗" />
        <Metric title="Audience Growth" value={data.audienceGrowth} change={data.audienceChange} icon="◎" />
        <Metric title="Content Score" value={data.contentScore} change={data.scoreChange} icon="✦" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-5 sm:p-6">
          <SectionHeader title={`${selectedPlatform} Content Performance`} subtitle={`${selectedPlatform} · Last 30 days`} />
          <div className="relative mt-8 h-[270px]">
            <div className="absolute inset-0 flex flex-col justify-between">{[1, 2, 3, 4, 5].map((x) => (<div key={x} className="border-t border-white/[0.045]" />))}</div>
            <div className="absolute inset-0 flex items-end gap-2">
              {chart.map((height, index) => (
                <div key={`${selectedPlatform}-${index}`} className="group flex h-full flex-1 items-end">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-purple-700/20 via-purple-500/50 to-purple-400/80 transition-all duration-500 group-hover:to-purple-300" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4"><span className="text-[10px] text-gray-700">{selectedPlatform} · Last 30 days</span><span className="text-[10px] text-green-400">↗ Trending upward</span></div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090909] p-6">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-[90px]" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-semibold">Creators' Heart</p><p className="mt-1 text-xs text-gray-600">Your overall creator health</p></div>
              <span className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest ${heartStatus.color === "green" ? "border-green-500/20 bg-green-500/10 text-green-400" : heartStatus.color === "yellow" ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400" : heartStatus.color === "orange" ? "border-orange-500/20 bg-orange-500/10 text-orange-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>{heartStatus.label}</span>
            </div>

            {heartPlatforms.length > 0 ? (
              <>
                <div className="mt-7 flex items-center gap-5">
                  <div className="creator-dashboard-heart heart-health-small">
                    <div className="creator-dashboard-heart-glow heart-glow-active" />
                    <div className="creator-heart-pulse pulse-active" />
                    <div className="creator-heart-ring ring-one" /><div className="creator-heart-ring ring-two" /><div className="creator-heart-ring ring-three" />
                    <div className="creator-dashboard-heart-symbol heart-clicked">♥</div>
                  </div>
                  <div>
                    <p className="text-5xl font-bold">{heartScore}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">Overall Health</p>
                    <p className="mt-3 max-w-[180px] text-xs leading-5 text-gray-500">Based on {heartPlatforms.length} connected platform{heartPlatforms.length === 1 ? "" : "s"}.</p>
                  </div>
                </div>

                {heartAlert.active ? (
                  <div className="mt-5 rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">!</div>
                      <div><p className="text-xs font-semibold text-red-400">Your Creators' Heart is weakening</p><p className="mt-1 text-xs leading-5 text-gray-500">{heartAlert.platform} reach is down {Math.abs(heartAlert.reachChange)}%.</p></div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-green-500/10 bg-green-500/[0.025] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">✓</div>
                      <div><p className="text-xs font-semibold text-green-400">Your creator ecosystem is healthy</p><p className="mt-1 text-xs leading-5 text-gray-500">Kizenra is not seeing a major reach decline.</p></div>
                    </div>
                  </div>
                )}

                <div className="mt-5 space-y-2">
                  {heartPlatforms.map((platform) => (
                    <div key={platform.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="flex-1"><p className="text-xs font-medium text-gray-300">{platform.name}</p><p className="mt-1 text-[10px] text-gray-600">Reach <span className={platform.reachChange < 0 ? "text-red-400" : "text-green-400"}>{platform.reachChange > 0 ? "+" : ""}{platform.reachChange}%</span></p></div>
                      <span className="text-sm font-semibold">{platform.score}</span>
                      <span className={`h-2 w-2 rounded-full ${platform.score >= 80 ? "bg-green-400" : platform.score >= 60 ? "bg-yellow-400" : platform.score >= 40 ? "bg-orange-400" : "bg-red-400"}`} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-8 rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.025] p-5 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 text-xl text-yellow-400">♡</div>
                <p className="mt-4 text-sm font-semibold">Connect a platform to activate your Heart</p>
                <p className="mt-2 text-xs leading-5 text-gray-600">Kizenra needs at least one connected platform to understand your creator health.</p>
                <button type="button" onClick={() => goTo("Connected Platforms")} className="mt-5 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-500">Connect Platform →</button>
              </div>
            )}
            <div className="mt-5 border-t border-white/10 pt-4 text-center"><p className="text-xs text-gray-600">Kizenra watches your connected platforms for you.</p></div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-5">
          <SectionHeader title="Recent Content" subtitle={`${selectedPlatform} content`} action="View all" />
          <div className="mt-5 space-y-3">
            <ContentItem title="How I Built My AI Workflow" platform="YouTube" score="91" />
            <ContentItem title="5 Tools Every Creator Needs" platform="Instagram" score="86" />
            <ContentItem title="My Creator Setup 2026" platform="YouTube" score="82" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-5">
          <SectionHeader title="Comment Intelligence" subtitle={`${selectedPlatform} audience`} action="Explore" />
          <div className="mt-5 space-y-3">
            <Insight icon="♥" title="Positive sentiment" value="68%" />
            <Insight icon="?" title="Questions detected" value="142" />
            <Insight icon="#" title="Recurring themes" value="8" />
            <Insight icon="↺" title="Useful feedback" value="34" />
          </div>
        </div>
        <div className="rounded-2xl border border-purple-500/10 bg-purple-500/[0.035] p-5">
          <SectionHeader title="Sara AI" subtitle="Your creator intelligence" action="Open" />
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#080808] p-4">
            <div className="flex items-center gap-3">
              <div className="sara-mini-orb flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">✦</div>
              <div><p className="text-sm font-semibold">Sara noticed something</p><p className="text-[10px] text-green-400">Based on your recent content</p></div>
            </div>
            <p className="mt-5 text-sm leading-6 text-gray-400">Your {selectedPlatform} audience is repeatedly asking for a deeper explanation of your second section.</p>
            <button type="button" onClick={() => goTo("Sara AI")} className="mt-5 w-full rounded-xl bg-purple-600 py-2.5 text-xs font-semibold transition hover:bg-purple-500">Ask Sara →</button>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-5">
        <SectionHeader title="Connected Platforms" subtitle="Your creator ecosystem" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Platform name="YouTube" short="YT" followers="80.4K subscribers" />
          <Platform name="Instagram" short="IG" followers="30.2K followers" />
          <Platform name="Facebook" short="FB" followers="12.8K followers" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContentIntelligence() {
  return (
    <PageShell eyebrow="Content Intelligence" title="Understand your content." description="See how Kizenra evaluates the quality, clarity, strength, and opportunities inside your content.">
      <div className="grid gap-5 md:grid-cols-3">
        <ScoreCard title="Latest Content" score="91" label="Strong" />
        <ScoreCard title="Average Score" score="87" label="Good" />
        <ScoreCard title="Improvement" score="+12" label="This month" />
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">
        <SectionHeader title="Content Intelligence" subtitle="Kizenra analysis" />
        <div className="mt-6 space-y-5">
          <Analysis title="Content Quality" score="92%" />
          <Analysis title="Audience Value" score="89%" />
          <Analysis title="Clarity" score="94%" />
          <Analysis title="Engagement Potential" score="86%" />
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <SectionHeader title="What is working" subtitle="Your strongest signals" />
          <div className="mt-5 space-y-3">
            <Finding type="Strong" title="Clear core message" description="Your main idea is easy for viewers to understand." />
            <Finding type="Strong" title="Strong audience value" description="Your content provides a clear reason for viewers to stay." />
          </div>
        </div>
        <div className="rounded-2xl border border-yellow-500/10 bg-[#090909] p-6">
          <SectionHeader title="Opportunities" subtitle="Where you can improve" />
          <div className="mt-5 space-y-3">
            <Finding type="Improve" title="Strengthen the opening" description="Make the first few seconds establish the value faster." />
            <Finding type="Improve" title="Increase curiosity" description="Create a stronger reason for the audience to continue watching." />
          </div>
        </div>
      </div>
      <Footer />
    </PageShell>
  );
}

function Analytics({ selectedPlatform }) {
  const data = platformData[selectedPlatform].analytics;
  const chart = platformData[selectedPlatform].chart;

  return (
    <PageShell eyebrow={`${selectedPlatform} Analytics`} title={`${selectedPlatform} performance.`} description={`Understand how your ${selectedPlatform} content is performing and how your audience is growing.`}>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Views" value={data.views} change={data.viewsChange} icon="◉" />
        <Metric title="Watch Time" value={data.watchTime} change={data.watchTimeChange} icon="◷" />
        <Metric title="Engagement" value={data.engagement} change={data.engagementChange} icon="↗" />
        <Metric title="Followers" value={data.followers} change={data.followersChange} icon="◎" />
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">
        <SectionHeader title={`${selectedPlatform} Performance Overview`} subtitle="Last 30 days" />
        <div className="relative mt-8 h-[300px]">
          <div className="absolute inset-0 flex flex-col justify-between">{[1, 2, 3, 4, 5].map((x) => (<div key={x} className="border-t border-white/[0.045]" />))}</div>
          <div className="absolute inset-0 flex items-end gap-2">
            {chart.map((height, index) => (
              <div key={`${selectedPlatform}-${index}`} className="group flex h-full flex-1 items-end">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-purple-700/20 via-purple-500/50 to-purple-400/80 transition-all duration-500 group-hover:to-purple-300" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4"><span className="text-[10px] text-gray-700">{selectedPlatform} · Last 30 days</span><span className="text-[10px] text-green-400">↗ Trending upward</span></div>
      </div>
      <div className="mt-5"><PlatformAnalytics name={selectedPlatform} value={data.views} change={data.viewsChange} /></div>
      <Footer />
    </PageShell>
  );
}

function CommentIntelligence() {
  return (
    <PageShell eyebrow="Comment Intelligence" title="Understand your audience." description="Kizenra turns audience conversations into useful creator intelligence.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard title="Positive" score="68%" label="Sentiment" />
        <ScoreCard title="Questions" score="142" label="Detected" />
        <ScoreCard title="Themes" score="8" label="Recurring" />
        <ScoreCard title="Feedback" score="34" label="Useful" />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <SectionHeader title="Audience Summary" subtitle="Generated by Kizenra" />
          <p className="mt-6 text-lg leading-8 text-gray-300">Your audience strongly appreciates practical examples. Many viewers are asking for a deeper explanation of your second section.</p>
          <div className="mt-6 rounded-xl border border-green-500/10 bg-green-500/[0.025] p-4">
            <p className="text-xs font-semibold text-green-400">Audience opportunity</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">Turn the repeated question into your next piece of content.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <SectionHeader title="Top Audience Signals" subtitle="What deserves your attention" />
          <div className="mt-5 space-y-3">
            <AudienceSignal label="Most requested" text="Part 2 tutorial" />
            <AudienceSignal label="Main theme" text="Practical examples" />
            <AudienceSignal label="Opportunity" text="Short-form follow-up" />
            <AudienceSignal label="Audience concern" text="More detailed explanations" />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">
        <SectionHeader title="Comment Categories" subtitle="How your audience conversations are distributed" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CommentCategory title="Positive" value="68%" icon="♥" />
          <CommentCategory title="Questions" value="142" icon="?" />
          <CommentCategory title="Constructive" value="34" icon="↗" />
          <CommentCategory title="Spam" value="19" icon="!" />
        </div>
      </div>
      <Footer />
    </PageShell>
  );
}

function FileAssetCard({ type, title, description, icon, file, onChange, accept }) {
  return (
    <label className="group relative cursor-pointer overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#090909] p-6 transition hover:border-purple-500/30 hover:bg-purple-500/[0.025]">
      <input type="file" className="hidden" accept={accept} onChange={(event) => onChange(type, event)} />
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-lg text-purple-400 transition group-hover:bg-purple-500/15">{icon}</div>
        {file && <span className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] text-green-400">ADDED</span>}
      </div>
      <p className="mt-6 font-semibold">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">{description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-purple-400">{file ? "Change file →" : "Upload file →"}</span>
        {file && <span className="max-w-[150px] truncate text-[10px] text-gray-700">{file.name}</span>}
      </div>
    </label>
  );
}

function TextInputCard({ title, description, icon, value, onChange, placeholder, textarea = false }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#090909] p-6 transition hover:border-purple-500/20">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-lg font-semibold text-purple-400">{icon}</div>
        {value.trim() && <span className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] text-green-400">ADDED</span>}
      </div>
      <p className="mt-6 font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
      {textarea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={5} className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-purple-500/40 focus:bg-purple-500/[0.025]" />
      ) : (
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-purple-500/40 focus:bg-purple-500/[0.025]" />
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-gray-700">{value.length} characters</span>
        <span className="text-xs text-purple-400">{value.trim() ? "Ready for analysis ✓" : `Write ${title.toLowerCase()} →`}</span>
      </div>
    </div>
  );
}

function ScanBadge({ text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
      <span className="text-[10px] text-gray-500">{text}</span>
    </div>
  );
}

function Finding({ type, title, description }) {
  const isStrong = type === "Strong";
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10">
      <div className="flex items-center gap-2">
        <span className={`rounded-lg px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${isStrong ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{type}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-gray-300">{title}</p>
      <p className="mt-2 text-xs leading-5 text-gray-600">{description}</p>
    </div>
  );
}

function RiskRow({ title, status, positive }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${positive ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{positive ? "✓" : "!"}</div>
      <p className="flex-1 text-xs text-gray-400">{title}</p>
      <span className={`text-[10px] font-semibold ${positive ? "text-green-400" : "text-yellow-400"}`}>{status}</span>
    </div>
  );
}

function AudienceSignal({ label, text }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/10">
      <p className="text-[10px] uppercase tracking-wider text-purple-400">{label}</p>
      <p className="mt-2 text-sm text-gray-300">{text}</p>
    </div>
  );
}

function CommentCategory({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">{icon}</div>
        <span className="text-lg font-bold">{value}</span>
      </div>
      <p className="mt-4 text-xs text-gray-500">{title}</p>
    </div>
  );
}

function PlatformAnalytics({ name, value, change }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090909] p-5">
      <div className="flex items-center justify-between"><p className="text-sm font-semibold">{name}</p><span className="h-2 w-2 rounded-full bg-green-400" /></div>
      <p className="mt-5 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-green-400">{change}</p>
    </div>
  );
}

function Platform({ name, short, followers }) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-xs font-bold">{short}</div>
      <div className="flex-1"><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-[10px] text-gray-600">{followers}</p></div>
      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
    </div>
  );
}

function ScoreCard({ title, score, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090909] p-5 transition hover:border-purple-500/20">
      <p className="text-xs text-gray-600">{title}</p>
      <p className="mt-3 text-3xl font-bold">{score}</p>
      <p className="mt-2 text-xs text-purple-400">{label}</p>
    </div>
  );
}

function Analysis({ title, score }) {
  const numericScore = Number(String(score).replace("%", "").trim());
  const safeScore = Number.isFinite(numericScore) ? Math.min(Math.max(numericScore, 0), 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4"><span className="text-sm text-gray-400">{title}</span><span className="text-sm font-semibold text-white">{score}</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all duration-700" style={{ width: `${safeScore}%` }} />
      </div>
    </div>
  );
}

function ReadinessCard({ title, score, added }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090909] p-5">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-[10px] text-gray-600">{added ? "Asset included in readiness check" : "Asset not added yet"}</p></div>
        <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${added ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{added ? "ADDED" : "MISSING"}</span>
      </div>
      <div className="mt-5 flex items-end justify-between"><p className="text-3xl font-bold">{score}%</p><span className="text-[10px] text-gray-600">Readiness</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all duration-700" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function Metric({ title, value, change, icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#090909] p-5 transition hover:-translate-y-0.5 hover:border-purple-500/20">
      <div className="flex items-start justify-between">
        <div><p className="text-xs text-gray-600">{title}</p><p className="mt-3 text-3xl font-bold">{value}</p></div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/15">{icon}</div>
      </div>
      <p className="mt-4 text-xs text-green-400">{change}</p>
    </div>
  );
}

function Insight({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">{icon}</div>
      <p className="flex-1 text-xs text-gray-400">{title}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between">
      <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-[11px] text-gray-600">{subtitle}</p></div>
      {action && <button type="button" className="text-[11px] text-purple-400 transition hover:text-purple-300">{action} →</button>}
    </div>
  );
}

function ContentItem({ title, platform, score }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.035]">
      <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-purple-900/20 text-xs text-purple-300">▶</div>
      <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-gray-300">{title}</p><p className="mt-1 text-[10px] text-gray-700">{platform}</p></div>
      <div className="text-right"><p className="text-xs font-bold">{score}</p><p className="mt-1 text-[9px] text-green-400">Strong</p></div>
    </div>
  );
}

function Reports({ onOpenReport, goTo, theme = "dark" }) {
  const reports = [
    { id: "weekly-performance", title: "Weekly Performance", date: "August 25, 2026", category: "Performance", icon: "↗", summary: "Your overall creator performance is trending upward across your connected platforms.", metrics: [{ title: "Total Views", value: "1.24M", change: "+18.6%" }, { title: "Engagement", value: "8.1%", change: "+3.9%" }, { title: "Audience Growth", value: "+24.7K", change: "+7.8%" }, { title: "Content Score", value: "89", change: "+5 points" }], insights: ["Your audience engagement improved throughout the week.", "YouTube generated the strongest overall performance.", "Your latest content is showing stronger audience retention."] },
    { id: "audience-intelligence", title: "Audience Intelligence", date: "August 25, 2026", category: "Audience", icon: "◌", summary: "Your audience is showing strong interest in practical, educational creator content.", metrics: [{ title: "Positive Sentiment", value: "68%", change: "+6.2%" }, { title: "Questions", value: "142", change: "+18" }, { title: "Recurring Themes", value: "8", change: "+2" }, { title: "Useful Feedback", value: "34", change: "+9" }], insights: ["Practical examples are your strongest recurring audience theme.", "A large number of viewers are requesting deeper explanations.", "Audience questions can be converted into future content ideas."] },
    { id: "content-analysis", title: "Content Analysis", date: "August 24, 2026", category: "Content", icon: "✦", summary: "Kizenra found that your content has a strong foundation with several opportunities for improvement.", metrics: [{ title: "Content Quality", value: "92%", change: "+4%" }, { title: "Audience Value", value: "93%", change: "+7%" }, { title: "Clarity", value: "95%", change: "+3%" }, { title: "Engagement Potential", value: "88%", change: "+5%" }], insights: ["Your core message is clear and easy to understand.", "The opening can be strengthened to communicate value faster.", "Increasing curiosity could improve audience retention."] },
  ];

  const historyReports = [
    { id: "monthly-intelligence", title: "Monthly Creator Intelligence", date: "August 2026", category: "Creator Intelligence", icon: "▤", summary: "A monthly overview of your creator performance, audience and content intelligence.", metrics: [{ title: "Views", value: "1.24M", change: "+18.6%" }, { title: "Engagement", value: "8.1%", change: "+3.9%" }, { title: "Content Score", value: "89", change: "+5" }, { title: "Platforms", value: "3", change: "Connected" }], insights: ["Your creator ecosystem is growing consistently.", "Content quality remains one of your strongest signals.", "Audience questions represent a major opportunity for new content."] },
    { id: "audience-feedback", title: "Audience Feedback Summary", date: "August 2026", category: "Audience", icon: "◌", summary: "A summary of the most important audience feedback identified by Kizenra.", metrics: [{ title: "Positive", value: "68%", change: "+6.2%" }, { title: "Questions", value: "142", change: "+18" }, { title: "Themes", value: "8", change: "+2" }, { title: "Feedback", value: "34", change: "+9" }], insights: ["Your audience wants more practical examples.", "Part 2 tutorial content is frequently requested.", "Long-form explanations can be converted into short-form follow-ups."] },
    { id: "pre-publish-analysis", title: "Pre-Publish Analysis", date: "August 24, 2026", category: "Pre-Publish", icon: "✦", summary: "Kizenra's latest pre-publish analysis found your content ready with a few recommended improvements.", metrics: [{ title: "Readiness", value: "91", change: "Ready" }, { title: "Hook Strength", value: "84%", change: "+4%" }, { title: "Clarity", value: "95%", change: "+6%" }, { title: "Risk", value: "Low", change: "Safe" }], insights: ["Your content provides strong audience value.", "The opening should establish the value faster.", "Potential copyright concerns should be reviewed before publishing."] },
  ];

  return (
    <PageShell eyebrow="Reports" title="Your creator intelligence." description="Keep important insights from your content and audience in one place.">
      <div className="grid gap-4 md:grid-cols-3">
        {reports.map((report) => (<ReportCard key={report.id} title={report.title} date={report.date} icon={report.icon} onOpen={() => onOpenReport(report)} />))}
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">
        <SectionHeader title="Report History" subtitle="Your saved creator intelligence" />
        <div className="mt-5 space-y-3">
          {historyReports.map((report) => (<ReportRow key={report.id} title={report.title} date={report.date} icon={report.icon} onView={() => onOpenReport(report)} />))}
        </div>
      </div>
      <Footer />
    </PageShell>
  );
}

function ReportDetails({ report, onBack }) {
  return (
    <PageShell eyebrow={report.category} title={report.title} description={report.summary}>
      <button type="button" onClick={onBack} className="mb-6 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white">← Back to Reports</button>
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-purple-500/[0.035] p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-[90px]" />
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-xl text-purple-400">{report.icon || "▤"}</div>
            <div><p className="text-lg font-semibold">{report.title}</p><p className="mt-1 text-xs text-gray-500">Generated {report.date}</p></div>
          </div>
          <span className="w-fit rounded-full border border-green-500/10 bg-green-500/[0.05] px-3 py-1.5 text-[10px] font-semibold text-green-400">REPORT AVAILABLE</span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {report.metrics.map((metric) => (<Metric key={metric.title} title={metric.title} value={metric.value} change={metric.change} icon="✦" />))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#090909] p-6">
          <SectionHeader title="Key Insights" subtitle="What Kizenra found" />
          <div className="mt-5 space-y-3">
            {report.insights.map((insight, index) => (
              <div key={index} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">{index + 1}</div>
                  <p className="text-sm leading-6 text-gray-400">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/15 bg-purple-500/[0.035] p-6">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-600/10 blur-[80px]" />
          <div className="relative">
            <SectionHeader title="Sara's Take" subtitle="Creator-focused recommendation" />
            <div className="mt-5 flex items-start gap-4">
              <div className="sara-mini-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">✦</div>
              <p className="text-sm leading-7 text-gray-400">Based on this report, focus on the strongest audience signals and turn the repeated patterns into your next content opportunities.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#090909] p-5 sm:flex-row sm:items-center">
        <div><p className="text-sm font-semibold">Report generated by Kizenra Intelligence</p><p className="mt-1 text-xs text-gray-600">Keep using your creator intelligence to make better decisions.</p></div>
        <button type="button" onClick={onBack} className="rounded-xl bg-purple-600 px-5 py-3 text-xs font-semibold transition hover:bg-purple-500">Back to Reports →</button>
      </div>
      <Footer />
    </PageShell>
  );
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ReportCard({ title, date, icon, onOpen }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#090909] p-6 transition hover:-translate-y-1 hover:border-purple-500/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">{icon || "▤"}</div>
      <p className="mt-6 font-semibold">{title}</p>
      <p className="mt-2 text-xs text-gray-600">Generated {date}</p>
      <button type="button" onClick={onOpen} className="mt-6 text-xs font-medium text-purple-400 transition hover:text-purple-300">Open report →</button>
    </div>
  );
}

function ReportRow({ title, date, icon, onView }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/2 p-4 transition hover:border-white/10 hover:bg-white/[0.035]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">{icon || "▤"}</div>
      <div className="flex-1"><p className="text-sm font-medium text-gray-300">{title}</p><p className="mt-1 text-[10px] text-gray-700">{date}</p></div>
      <button type="button" onClick={onView} className="text-xs font-medium text-purple-400 transition hover:text-purple-300">View →</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 py-7">
      <div className="flex flex-col justify-between gap-3 text-xs text-gray-700 sm:flex-row">
        <p>© 2026 Kizenra · Polish it before publish it.</p>
        <p className="text-purple-500/60">Built with Love for Creators</p>
      </div>
    </footer>
  );
}

const heartStyles = `
.creator-heart-card { isolation: isolate; }
.creator-dashboard-heart { position: relative; display: flex; align-items: center; justify-content: center; width: 230px; height: 230px; }
.heart-health-small { width: 120px; height: 120px; flex-shrink: 0; }
.heart-health-small .creator-dashboard-heart-symbol { font-size: 74px; }
.heart-health-small .creator-dashboard-heart-glow { width: 85px; height: 85px; }
.heart-health-small .creator-heart-pulse { width: 72px; height: 72px; }
.creator-dashboard-heart-glow { position: absolute; width: 145px; height: 145px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,.50), rgba(168,85,247,.15), transparent 70%); filter: blur(30px); opacity: .45; animation: dashboardHeartGlow 3s ease-in-out infinite; transition: all .8s ease; }
.creator-dashboard-heart-glow.heart-glow-active { width: 190px; height: 190px; opacity: .95; filter: blur(38px); }
.creator-heart-pulse { position: absolute; width: 120px; height: 120px; border-radius: 50%; border: 1px solid rgba(192,132,252,.08); animation: heartPulse 3s ease-in-out infinite; }
.creator-heart-pulse.pulse-active { animation: heartPulseActive 1.4s ease-out infinite; }
.creator-dashboard-heart-symbol { position: relative; z-index: 5; font-size: 130px; line-height: 1; background: linear-gradient(135deg, #f3e8ff, #d8b4fe, #a855f7, #9333ea, #ec4899); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 8px rgba(168,85,247,.85)) drop-shadow(0 0 25px rgba(168,85,247,.65)) drop-shadow(0 0 55px rgba(168,85,247,.40)); animation: dashboardHeartBeat 3s ease-in-out infinite; transition: filter .5s ease; }
.creator-dashboard-heart-symbol:hover { filter: drop-shadow(0 0 10px rgba(168,85,247,1)) drop-shadow(0 0 35px rgba(168,85,247,.85)) drop-shadow(0 0 75px rgba(236,72,153,.45)); }
.creator-dashboard-heart-symbol.heart-clicked { animation: dashboardHeartClick .9s ease-in-out, dashboardHeartBeat 3s .9s ease-in-out infinite; filter: drop-shadow(0 0 12px rgba(168,85,247,1)) drop-shadow(0 0 40px rgba(168,85,247,.95)) drop-shadow(0 0 85px rgba(236,72,153,.55)); }
.creator-heart-ring { position: absolute; border-radius: 999px; border: 1px solid rgba(168,85,247,.10); pointer-events: none; }
.ring-one { inset: 18px; animation: dashboardRing 14s linear infinite; }
.ring-two { inset: 42px; border-color: rgba(192,132,252,.08); animation: dashboardRingReverse 18s linear infinite; }
.ring-three { inset: 66px; border-color: rgba(236,72,153,.07); border-style: dashed; animation: dashboardRing 22s linear infinite; }
@keyframes dashboardHeartBeat { 0%, 100% { transform: scale(.96); } 12% { transform: scale(1.06); } 24% { transform: scale(.98); } 36% { transform: scale(1.09); } 50% { transform: scale(.96); } }
@keyframes dashboardHeartClick { 0% { transform: scale(1); } 20% { transform: scale(1.35); } 40% { transform: scale(.88); } 60% { transform: scale(1.20); } 80% { transform: scale(.96); } 100% { transform: scale(1); } }
@keyframes dashboardHeartGlow { 0%, 100% { transform: scale(.78); opacity: .30; } 50% { transform: scale(1.15); opacity: .80; } }
@keyframes heartPulse { 0%, 100% { transform: scale(.75); opacity: .1; } 50% { transform: scale(1.2); opacity: .5; } }
@keyframes heartPulseActive { 0% { transform: scale(.7); opacity: .7; } 100% { transform: scale(1.7); opacity: 0; } }
@keyframes dashboardRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes dashboardRingReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes saraOrb { 0%, 100% { box-shadow: 0 0 0 rgba(168,85,247,0); transform: scale(1); } 50% { box-shadow: 0 0 25px rgba(168,85,247,.25); transform: scale(1.04); } }
`;

if (typeof document !== "undefined") {
  const styleId = "kizenra-dashboard-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = heartStyles;
    document.head.appendChild(style);
  }
}

export default Dashboard;