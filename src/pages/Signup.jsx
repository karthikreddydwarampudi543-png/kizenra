import { useState } from "react";
import kizenraLogo from "../assets/kizenra-logo.png";

function Signup({
  onBack,
  onLogin,
  onSignupSuccess,
  theme = "dark",
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isLight = theme === "light";

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary frontend signup.
    // Real account creation will be connected to the backend later.
    onSignupSuccess();
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[150px]" />

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

          {/* BACK */}
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

      {/* SIGNUP SECTION */}
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
              Create your account
            </h1>

            <p
              className={`mt-3 ${
                isLight ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Start creating smarter with Kizenra.
            </p>

          </div>

          {/* SIGNUP CARD */}
          <div
            className={`rounded-3xl border p-7 shadow-2xl backdrop-blur-xl transition-colors duration-300 sm:p-8 ${
              isLight
                ? "border-gray-200 bg-white/80"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>

                <label
                  className={`mb-2 block text-sm font-medium ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-400/60 focus:bg-white"
                      : "border-white/10 bg-black/30 text-white placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/50"
                  }`}
                />

              </div>

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

                <label
                  className={`mb-2 block text-sm font-medium ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-400/60 focus:bg-white"
                      : "border-white/10 bg-black/30 text-white placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/50"
                  }`}
                />

                <p
                  className={`mt-2 text-xs ${
                    isLight ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Use at least 6 characters.
                </p>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label
                  className={`mb-2 block text-sm font-medium ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  Confirm password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-400/60 focus:bg-white"
                      : "border-white/10 bg-black/30 text-white placeholder:text-gray-600 focus:border-purple-400/60 focus:bg-black/50"
                  }`}
                />

              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* TERMS */}
              <div className="flex items-start gap-3">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-purple-500"
                />

                <label
                  htmlFor="terms"
                  className={`text-xs leading-5 ${
                    isLight ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  I agree to Kizenra's Terms of Service and Privacy Policy.
                </label>

              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className={`w-full rounded-xl py-3.5 font-bold transition duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  isLight
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                Create Kizenra Account →
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
                ALREADY A CREATOR?
              </span>

              <div
                className={`h-px flex-1 ${
                  isLight ? "bg-gray-200" : "bg-white/10"
                }`}
              />

            </div>

            {/* LOGIN */}
            <div className="text-center">

              <p
                className={`text-sm ${
                  isLight ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Already have a Kizenra account?
              </p>

              <button
                type="button"
                onClick={onLogin}
                className={`mt-2 font-semibold transition ${
                  isLight
                    ? "text-purple-600 hover:text-purple-700"
                    : "text-purple-300 hover:text-purple-200"
                }`}
              >
                Login to Kizenra →
              </button>

            </div>

          </div>

          {/* CREATORS HEART */}
          <p
            className={`mt-6 text-center text-xs leading-5 ${
              isLight ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Built with Love for Creators.
            <br />
            Your creativity comes first.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Signup;