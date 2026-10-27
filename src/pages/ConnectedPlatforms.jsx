function ConnectedPlatforms({ platforms, onTogglePlatform }) {
  // No local state here on purpose: Dashboard.jsx owns the real
  // platforms data and the real toggle logic. This component just
  // displays it and forwards clicks. That way there is exactly one
  // source of truth and the count can never drift from the cards.
  const connectedCount = Object.values(platforms).filter(
    (platform) => platform.connected
  ).length;

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">

      {/* HEADER */}
      <div className="max-w-4xl">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          Connected Platforms
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Your creator ecosystem.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Connect your social platforms so Kizenra can understand
          your content, audience, and performance in one place.
        </p>

      </div>

      {/* SUMMARY */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-purple-500/15 bg-purple-500/[0.035] p-6 sm:p-8">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/30" />

              <span className="text-xs font-medium text-green-400">
                Kizenra ecosystem
              </span>

            </div>

            <h2 className="mt-3 text-2xl font-bold">
              {connectedCount} of 3 platforms connected
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Connect your platforms to unlock cross-platform
              intelligence and unified creator analytics.
            </p>

          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10">

            <div className="text-center">

              <p className="text-2xl font-bold text-purple-300">
                {connectedCount}
              </p>

              <p className="text-[9px] uppercase tracking-wider text-gray-600">
                Connected
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* PLATFORMS */}
      <div className="mt-5 space-y-4">

        <PlatformConnectionCard
          platform="YouTube"
          short="YT"
          description="Connect your YouTube channel to analyze videos, views, engagement, audience growth and content performance."
          connected={platforms.youtube?.connected ?? false}
          name={platforms.youtube?.name ?? ""}
          handle={platforms.youtube?.handle ?? ""}
          followers={platforms.youtube?.followers ?? ""}
          lastSync={platforms.youtube?.lastSync ?? ""}
          onToggle={() => onTogglePlatform("youtube")}
          accent="red"
        />

        <PlatformConnectionCard
          platform="Instagram"
          short="IG"
          description="Connect your Instagram professional account to understand content performance, audience engagement and growth."
          connected={platforms.instagram?.connected ?? false}
          name={platforms.instagram?.name ?? ""}
          handle={platforms.instagram?.handle ?? ""}
          followers={platforms.instagram?.followers ?? ""}
          lastSync={platforms.instagram?.lastSync ?? ""}
          onToggle={() => onTogglePlatform("instagram")}
          accent="pink"
        />

        <PlatformConnectionCard
          platform="Facebook"
          short="FB"
          description="Connect your Facebook Page to bring page performance, audience signals and content intelligence into Kizenra."
          connected={platforms.facebook?.connected ?? false}
          name={platforms.facebook?.name ?? ""}
          handle={platforms.facebook?.handle ?? ""}
          followers={platforms.facebook?.followers ?? ""}
          lastSync={platforms.facebook?.lastSync ?? ""}
          onToggle={() => onTogglePlatform("facebook")}
          accent="blue"
        />

      </div>

      {/* PRIVACY */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            🔒
          </div>

          <div>

            <p className="text-sm font-semibold">
              Your accounts stay yours.
            </p>

            <p className="mt-2 text-xs leading-6 text-gray-600">
              Kizenra will use official platform authorization rather
              than asking for your social-media password. Real OAuth
              authentication will be connected when we build the
              backend.
            </p>

          </div>

        </div>

      </div>

      {/* PERMISSIONS */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">

        <div>

          <p className="text-sm font-semibold">
            What Kizenra will understand
          </p>

          <p className="mt-1 text-[11px] text-gray-600">
            Connected platforms allow Kizenra to build your creator
            intelligence layer.
          </p>

        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <PermissionCard
            icon="◉"
            title="Performance"
            description="Views, reach and engagement"
          />

          <PermissionCard
            icon="◎"
            title="Audience"
            description="Growth and audience signals"
          />

          <PermissionCard
            icon="◈"
            title="Content"
            description="Your published content"
          />

          <PermissionCard
            icon="◌"
            title="Comments"
            description="Audience conversations"
          />

        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-white/10 py-7">

        <div className="flex flex-col justify-between gap-3 text-xs text-gray-700 sm:flex-row">

          <p>
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
   PLATFORM CARD
========================================================= */

function PlatformConnectionCard({
  platform,
  short,
  description,
  connected,
  name,
  handle,
  followers,
  lastSync,
  onToggle,
  accent,
}) {
  const accentStyles = {
    red: {
      icon: "bg-red-500/10 text-red-400",
      glow: "border-red-500/10",
      button: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
    },

    pink: {
      icon: "bg-pink-500/10 text-pink-400",
      glow: "border-pink-500/10",
      button: "bg-pink-500/10 text-pink-300 hover:bg-pink-500/20",
    },

    blue: {
      icon: "bg-blue-500/10 text-blue-400",
      glow: "border-blue-500/10",
      button: "bg-blue-500/10 text-blue-300 hover:bg-blue-500/20",
    },
  };

  const styles = accentStyles[accent] || accentStyles.blue;

  return (
    <div
      className={`rounded-3xl border bg-[#090909] p-6 transition-all duration-300 sm:p-7 ${
        connected
          ? `${styles.glow} hover:border-purple-500/20`
          : "border-white/10 hover:border-white/15"
      }`}
    >

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${styles.icon}`}
        >
          {short}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <p className="text-lg font-semibold">
              {platform}
            </p>

            {connected ? (

              <span className="flex items-center gap-1.5 rounded-full border border-green-500/10 bg-green-500/[0.05] px-2.5 py-1 text-[9px] font-semibold tracking-wider text-green-400">

                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                CONNECTED

              </span>

            ) : (

              <span className="rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[9px] font-semibold tracking-wider text-gray-600">
                NOT CONNECTED
              </span>

            )}

          </div>

          {connected ? (

            <div className="mt-3">

              <p className="text-sm text-gray-300">
                {name}
              </p>

              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">

                <span className="text-[11px] text-gray-600">
                  {handle}
                </span>

                <span className="text-[11px] text-gray-600">
                  {followers}
                </span>

                <span className="text-[11px] text-gray-700">
                  Synced {lastSync}
                </span>

              </div>

            </div>

          ) : (

            <p className="mt-3 max-w-2xl text-xs leading-6 text-gray-600">
              {description}
            </p>

          )}

        </div>

        <div className="shrink-0">

          {connected ? (

            <button
              type="button"
              onClick={onToggle}
              className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-gray-500 transition hover:border-red-500/20 hover:bg-red-500/[0.04] hover:text-red-400"
            >
              Disconnect
            </button>

          ) : (

            <button
              type="button"
              onClick={onToggle}
              className={`rounded-xl px-5 py-3 text-xs font-semibold transition hover:-translate-y-0.5 ${styles.button}`}
            >
              Connect {platform} →
            </button>

          )}

        </div>

      </div>

      {connected && (

        <div className="mt-6 border-t border-white/[0.06] pt-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex flex-wrap gap-2">
              <MiniTag text="Analytics" />
              <MiniTag text="Content" />
              <MiniTag text="Audience" />
              <MiniTag text="Comments" />
            </div>

            <p className="text-[10px] text-gray-700">
              Demo connection · OAuth will be added later
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function MiniTag({ text }) {
  return (
    <span className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[9px] text-gray-600">
      {text}
    </span>
  );
}

function PermissionCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/10">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        {icon}
      </div>

      <p className="mt-4 text-xs font-semibold text-gray-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-gray-700">
        {description}
      </p>

    </div>
  );
}

export default ConnectedPlatforms;
