import kizenraLogo from "../assets/kizenra-logo.png";

function Landing({ onLogin, onSignup, theme = "dark" }) {
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${
        isLight
          ? "bg-[#f5f5f7] text-gray-900"
          : "bg-[#050505] text-white"
      }`}
    >

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "border-gray-200 bg-white/80"
            : "border-white/10 bg-[#050505]/80"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <img
              src={kizenraLogo}
              alt="Kizenra"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold tracking-wide">
              KIZENRA
            </span>

          </div>

          {/* NAV BUTTONS */}
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onLogin}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                isLight
                  ? "text-gray-800 hover:bg-gray-200"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={onSignup}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:scale-105 ${
                isLight
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
            >
              Get Started
            </button>

          </div>

        </div>
      </nav>

      {/* HERO */}
      <main className="relative flex min-h-screen items-center justify-center px-6 pt-24">

        {/* GLOW EFFECTS */}
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">

          {/* BADGE */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-xl transition-colors duration-300 ${
              isLight
                ? "border-gray-200 bg-white/70 text-gray-700"
                : "border-white/10 bg-white/5 text-gray-300"
            }`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            AI-powered Creator Intelligence
          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">

            Create Better.
            <br />

            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isLight
                  ? "from-gray-900 via-purple-600 to-blue-600"
                  : "from-white via-purple-300 to-blue-400"
              }`}
            >
              Publish Smarter.
            </span>

          </h1>

          {/* TAGLINE */}
          <p
            className={`mx-auto mt-7 max-w-2xl text-lg leading-8 sm:text-xl ${
              isLight ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Kizenra helps creators analyze, improve, and understand their
            content before and after publishing.
          </p>

          <p
            className={`mt-4 text-sm font-medium tracking-wide ${
              isLight ? "text-purple-600" : "text-purple-300"
            }`}
          >
            Polish it before publish it.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <button
              type="button"
              onClick={onSignup}
              className={`group rounded-2xl px-8 py-4 font-bold shadow-2xl transition duration-300 hover:scale-105 ${
                isLight
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
            >
              Start Creating

              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>

            </button>

            <button
              type="button"
              onClick={onLogin}
              className={`rounded-2xl border px-8 py-4 font-semibold backdrop-blur-xl transition ${
                isLight
                  ? "border-gray-300 bg-white/70 text-gray-900 hover:bg-gray-100"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              I Already Have an Account
            </button>

          </div>

          {/* FEATURE PREVIEW */}
          <div className="mt-20 grid gap-4 sm:grid-cols-3">

            <div
              className={`rounded-2xl border p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 ${
                isLight
                  ? "border-gray-200 bg-white/70 hover:bg-white"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >

              <div className="mb-4 text-2xl">✦</div>

              <h3 className="font-bold">
                Before You Publish
              </h3>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Analyze your content, thumbnail, caption, and potential
                problems before your audience sees it.
              </p>

            </div>

            <div
              className={`rounded-2xl border p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 ${
                isLight
                  ? "border-gray-200 bg-white/70 hover:bg-white"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >

              <div className="mb-4 text-2xl">◈</div>

              <h3 className="font-bold">
                Creator Intelligence
              </h3>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Understand performance, audience reactions, trends, and
                opportunities across your creator platforms.
              </p>

            </div>

            <div
              className={`rounded-2xl border p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 ${
                isLight
                  ? "border-gray-200 bg-white/70 hover:bg-white"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >

              <div className="mb-4 text-2xl">♡</div>

              <h3 className="font-bold">
                Creators' Heart
              </h3>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Built around what creators actually need—not distractions,
                pressure, or unnecessary complexity.
              </p>

            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t px-6 py-8 text-center text-sm transition-colors duration-300 ${
          isLight
            ? "border-gray-200 text-gray-500"
            : "border-white/10 text-gray-500"
        }`}
      >
        © 2026 Kizenra. Built for creators.
      </footer>

    </div>
  );
}

export default Landing;