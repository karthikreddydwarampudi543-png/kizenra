
import { useState } from "react";

function CreatorProfile() {
  const [name, setName] = useState("Karthik Reddy");
  const [username, setUsername] = useState("@kizenra_creator");
  const [email, setEmail] = useState("creator@kizenra.in");
  const [bio, setBio] = useState(
    "Creator focused on technology, AI, and digital content."
  );
  const [category, setCategory] = useState("Technology");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">
      {/* HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
          Creator Profile
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Your creator identity.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Manage the information Kizenra uses to understand you and
          personalize your creator intelligence.
        </p>
      </div>

      {/* PROFILE HERO */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-purple-500/15 bg-purple-500/[0.035] p-6 sm:p-8">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-600/10 blur-[100px]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* AVATAR */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-4xl font-bold shadow-xl shadow-purple-950/30">
            K
          </div>

          <div>
            <p className="text-2xl font-bold">{name}</p>

            <p className="mt-1 text-sm text-purple-400">
              {username}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-green-500/10 bg-green-500/[0.05] px-3 py-1 text-[10px] font-semibold text-green-400">
                CREATOR ACCOUNT
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] text-gray-500">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE FORM */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-[#090909] p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold">
            Profile Information
          </p>

          <p className="mt-1 text-[11px] text-gray-600">
            Update the information associated with your creator account.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {/* NAME */}
          <ProfileInput
            label="Creator Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSaved(false);
            }}
            placeholder="Your name"
          />

          {/* USERNAME */}
          <ProfileInput
            label="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setSaved(false);
            }}
            placeholder="@username"
          />

          {/* EMAIL */}
          <ProfileInput
            label="Email Address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSaved(false);
            }}
            placeholder="creator@example.com"
            type="email"
          />

          {/* CATEGORY */}
          <div>
            <label className="text-xs font-medium text-gray-500">
              Creator Category
            </label>

            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-gray-300 outline-none transition focus:border-purple-500/40 focus:bg-purple-500/[0.04]"
            >
              <option className="bg-[#111111]" value="Technology">
                Technology
              </option>

              <option className="bg-[#111111]" value="Education">
                Education
              </option>

              <option className="bg-[#111111]" value="Entertainment">
                Entertainment
              </option>

              <option className="bg-[#111111]" value="Gaming">
                Gaming
              </option>

              <option className="bg-[#111111]" value="Lifestyle">
                Lifestyle
              </option>

              <option className="bg-[#111111]" value="Business">
                Business
              </option>

              <option className="bg-[#111111]" value="Other">
                Other
              </option>
            </select>
          </div>
        </div>

        {/* BIO */}
        <div className="mt-5">
          <label className="text-xs font-medium text-gray-500">
            Creator Bio
          </label>

          <textarea
            value={bio}
            onChange={(event) => {
              setBio(event.target.value);
              setSaved(false);
            }}
            rows={5}
            placeholder="Tell Kizenra about your content..."
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-purple-500/40 focus:bg-purple-500/[0.04]"
          />

          <div className="mt-2 flex justify-between">
            <span className="text-[10px] text-gray-700">
              {bio.length} characters
            </span>

            <span className="text-[10px] text-gray-700">
              Help Sara understand your creator identity.
            </span>
          </div>
        </div>

        {/* SAVE */}
        <div className="mt-7 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div>
            {saved ? (
              <p className="text-xs font-medium text-green-400">
                ✓ Profile changes saved
              </p>
            ) : (
              <p className="text-xs text-gray-600">
                Your profile information is currently stored locally.
              </p>
            )}
          </div>

          <button
            onClick={handleSave}
            className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-purple-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* CREATOR INTELLIGENCE */}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <ProfileStat
          title="Connected Platforms"
          value="3"
          description="YouTube · Instagram · Facebook"
        />

        <ProfileStat
          title="Content Analyzed"
          value="24"
          description="Across your creator ecosystem"
        />

        <ProfileStat
          title="Creator Score"
          value="87"
          description="Based on recent content"
        />
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
   PROFILE INPUT
========================================================= */

function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-purple-500/40 focus:bg-purple-500/[0.04]"
      />
    </div>
  );
}

/* =========================================================
   PROFILE STAT
========================================================= */

function ProfileStat({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090909] p-5 transition hover:border-purple-500/20">
      <p className="text-xs text-gray-600">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-[10px] leading-5 text-gray-700">
        {description}
      </p>
    </div>
  );
}

export default CreatorProfile;

