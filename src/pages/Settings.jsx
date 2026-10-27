import { useState } from "react";

function Settings({
  onRequestLogout,
  onNavigate,
  connectedCount = 0,
  theme = "dark",
  onThemeChange,
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saraEnabled, setSaraEnabled] = useState(true);

  const Toggle = ({ enabled, onClick, label }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${label}: ${enabled ? "On" : "Off"}`}
        aria-pressed={enabled}
        className={`relative h-5 w-9 shrink-0 rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 ${
          enabled ? "bg-purple-600" : "bg-gray-700"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    );
  };

  const openConnectedPlatforms = () => {
    if (typeof onNavigate === "function") {
      onNavigate("Connected Platforms");
    }
  };

  const handleLogout = () => {
    if (typeof onRequestLogout === "function") {
      onRequestLogout();
    }
  };

  const handleThemeChange = (nextTheme) => {
    if (typeof onThemeChange === "function") {
      onThemeChange(nextTheme);
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">

      <div className="max-w-4xl">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          Settings
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Your workspace.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Manage your Kizenra workspace, preferences, connected platforms,
          and account.
        </p>

      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.5fr]">

        <section className="rounded-2xl border border-white/10 bg-[#090909] p-6">

          <div>

            <p className="text-sm font-semibold text-gray-200">
              Account
            </p>

            <p className="mt-1 text-[11px] text-gray-600">
              Your Kizenra profile
            </p>

          </div>

          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-lg font-bold text-white">
              K
            </div>

            <div>

              <p className="font-semibold text-gray-200">
                Creator
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Personal workspace
              </p>

            </div>

          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">

            <p className="text-[10px] uppercase tracking-[0.18em] text-gray-600">
              Workspace
            </p>

            <p className="mt-2 text-sm text-gray-300">
              Personal Creator Workspace
            </p>

          </div>

        </section>

        <section className="rounded-2xl border border-white/10 bg-[#090909] p-6">

          <div>

            <p className="text-sm font-semibold text-gray-200">
              Preferences
            </p>

            <p className="mt-1 text-[11px] text-gray-600">
              Customize your Kizenra experience
            </p>

          </div>

          <div className="mt-6 space-y-3">

            {/* INTELLIGENCE NOTIFICATIONS */}

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/20">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                ♢
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-gray-300">
                  Intelligence notifications
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Receive important creator insights from Kizenra.
                </p>

              </div>

              <Toggle
                label="Intelligence notifications"
                enabled={notificationsEnabled}
                onClick={() =>
                  setNotificationsEnabled((current) => !current)
                }
              />

            </div>

            {/* SARA AI */}

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/20">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                ✦
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-gray-300">
                  Sara AI
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Keep Sara available for creator intelligence.
                </p>

              </div>

              <Toggle
                label="Sara AI"
                enabled={saraEnabled}
                onClick={() =>
                  setSaraEnabled((current) => !current)
                }
              />

            </div>

            {/* APPEARANCE */}

            <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/20">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                ◐
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-gray-300">
                  Appearance
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Choose how Kizenra looks across your workspace.
                </p>

              </div>

              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.025] p-1">

                <button
                  type="button"
                  onClick={() => handleThemeChange("light")}
                  aria-pressed={theme === "light"}
                  className={`rounded-lg px-3 py-1.5 text-xs transition ${
                    theme === "light"
                      ? "bg-white text-gray-900"
                      : "text-gray-600 hover:bg-white/5 hover:text-gray-300"
                  }`}
                >
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange("dark")}
                  aria-pressed={theme === "dark"}
                  className={`rounded-lg px-3 py-1.5 text-xs transition ${
                    theme === "dark"
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:bg-white/5 hover:text-gray-300"
                  }`}
                >
                  Dark
                </button>

              </div>

            </div>

            {/* CONNECTED PLATFORMS */}

            <button
              type="button"
              onClick={openConnectedPlatforms}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:border-purple-500/30 hover:bg-purple-500/[0.03] focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
                ◈
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-gray-300">
                  Connected platforms
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Manage your connected creator platforms.
                </p>

              </div>

              <div className="flex items-center gap-2">

                <span className="text-xs text-green-400">
                  {connectedCount} Connected
                </span>

                <span className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-purple-400">
                  →
                </span>

              </div>

            </button>

          </div>

        </section>

      </div>

      <section className="relative mt-5 overflow-hidden rounded-3xl border border-purple-500/15 bg-purple-500/[0.035] p-6 sm:p-7">

        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/10 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                ♥
              </div>

              <div>

                <p className="font-semibold text-gray-200">
                  Creators' Heart
                </p>

                <p className="mt-1 text-xs text-purple-300">
                  The principle behind Kizenra
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500">
              Kizenra exists to help creators make better decisions,
              not to distract them from creating.
            </p>

          </div>

          <span className="whitespace-nowrap rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-[10px] font-semibold tracking-widest text-purple-300">
            CREATORS FIRST
          </span>

        </div>

      </section>

      <section className="mt-5 rounded-2xl border border-white/10 bg-[#090909] p-6">

        <div>

          <p className="text-sm font-semibold text-gray-200">
            Account Actions
          </p>

          <p className="mt-1 text-[11px] text-gray-600">
            Manage your current session
          </p>

        </div>

        <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl border border-red-500/10 bg-red-500/[0.025] p-5 sm:flex-row sm:items-center">

          <div>

            <p className="text-sm font-semibold text-gray-300">
              Sign out of Kizenra
            </p>

            <p className="mt-1 max-w-xl text-xs leading-5 text-gray-600">
              You will be returned to the Kizenra landing page.
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-xs font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/30"
          >
            Logout →
          </button>

        </div>

      </section>

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

export default Settings;