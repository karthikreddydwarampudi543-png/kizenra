import { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("kizenra_page") || "landing";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("kizenra_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("kizenra_theme", theme);
  }, [theme]);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
    localStorage.setItem("kizenra_page", nextPage);
  };

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
  };

  // LANDING
  if (page === "landing") {
    return (
      <Landing
        onLogin={() => navigateTo("login")}
        onSignup={() => navigateTo("signup")}
        theme={theme}
      />
    );
  }

  // LOGIN
  if (page === "login") {
    return (
      <Login
        onBack={() => navigateTo("landing")}
        onSignup={() => navigateTo("signup")}
        onLoginSuccess={() => navigateTo("dashboard")}
        theme={theme}
      />
    );
  }

  // SIGNUP
  if (page === "signup") {
    return (
      <Signup
        onBack={() => navigateTo("landing")}
        onLogin={() => navigateTo("login")}
        onSignupSuccess={() => navigateTo("dashboard")}
        theme={theme}
      />
    );
  }

  // DASHBOARD
  if (page === "dashboard") {
    return (
      <Dashboard
        theme={theme}
        onThemeChange={handleThemeChange}
        onLogout={() => {
          localStorage.removeItem("kizenra_page");
          localStorage.removeItem("kizenra_active_page");
          setPage("landing");
        }}
      />
    );
  }

  return null;
}

export default App;