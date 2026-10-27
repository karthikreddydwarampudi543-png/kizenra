import kizenraLogo from "../assets/kizenra-logo.png";

function Login({
  onBack,
  onSignup,
  onLoginSuccess,
  theme = "dark",
}) {
  const isLight = theme === "light";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend login
    // Real authentication will be connected later
    onLoginSuccess();
  };

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${
        isLight
          ? "bg-[#f5f5f7] text-gray-900"
          : "bg-[#050505] text-white"
      }`}
    >

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

      {/* NAVBAR */}
      <nav
        className={`relative z-20 border-b backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? "border-gray-200 bg-white/70"
            : "border-white/10 bg-[#050505]/70"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-3"
          >
            <img
              src={kizenraLogo}
              alt="Kizenra"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold tracking-wide">
              KIZENRA
            </span>
          </button>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={onBack}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              isLight
                ? "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            ← Back to Home
          </button>

        </div>
      </nav>

      {/* LOGIN SECTION */}
      <main className="relative z-10 flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* HEADING */}
          <div className="mb-8 text-center">

            <div
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-2xl transition-colors duration-300 ${
                isLight
                  ? "border-gray-200 bg-white"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <img
                src={kizenraLogo}
                alt="Kizenra"
                className="h-11 w-11 object-contain"
              />
            </div>

            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p
              className={`mt-3 ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Continue creating smarter with Kizenra.
            </p>

          </div>

          {/* LOGIN CARD */}
          <div
            className={`rounded-3xl border p-7 shadow-2xl backdrop-blur-xl transition-colors duration-300 sm:p-8 ${
              isLight
                ? "border-gray-200 bg-white/80"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>

                <label
                  className={`mb-2 block text-sm font-medium ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-400/60 focus:bg-white"
                      : "border-white/10 bg-black/30 text-white placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/50"
                  }`}
                />

              </div>

              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    className={`text-sm font-medium ${
                      isLight ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className={`text-xs transition ${
                      isLight
                        ? "text-purple-600 hover:text-purple-700"
                        : "text-purple-300 hover:text-purple-200"
                    }`}
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-400/60 focus:bg-white"
                      : "border-white/10 bg-black/30 text-white placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/50"
                  }`}
                />

              </div>

              {/* REMEMBER ME */}
              <div className="flex items-center gap-3">

                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 accent-purple-500"
                />

                <label
                  htmlFor="remember"
                  className={`text-sm ${
                    isLight ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Remember me
                </label>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className={`w-full rounded-xl py-3.5 font-bold transition duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  isLight
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                Login to Kizenra →
              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">

              <div
                className={`h-px flex-1 ${
                  isLight ? "bg-gray-200" : "bg-white/10"
                }`}
              />

              <span
                className={`text-xs ${
                  isLight ? "text-gray-400" : "text-gray-600"
                }`}
              >
                OR
              </span>

              <div
                className={`h-px flex-1 ${
                  isLight ? "bg-gray-200" : "bg-white/10"
                }`}
              />

            </div>

            {/* SIGN UP */}
            <div className="text-center">

              <p
                className={`text-sm ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Don't have a Kizenra account?
              </p>

              <button
                type="button"
                onClick={onSignup}
                className={`mt-2 font-semibold transition ${
                  isLight
                    ? "text-purple-600 hover:text-purple-700"
                    : "text-purple-300 hover:text-purple-200"
                }`}
              >
                Create an account →
              </button>

            </div>

          </div>

          {/* BOTTOM MESSAGE */}
          <p
            className={`mt-6 text-center text-xs leading-5 ${
              isLight ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Your creator journey starts here.
            <br />
            Built with Love for Creators.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Login;