import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Game301 from "./pages/Game301";
import Statistics from "./pages/Statistics";
import History from "./pages/History";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      {/* optional: global header */}
      <div style={{ padding: 10 }}>
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/301" element={<Game301 />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;