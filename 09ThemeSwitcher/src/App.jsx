import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/Theme";
import ThemeBtn from "./components/ThemeBtn";
import GithubProfile from "./components/GithubProfile";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => setThemeMode("light");
  const darkTheme = () => setThemeMode("dark");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-col min-h-screen items-center py-10 space-y-8">
        <div className="w-full max-w-lg flex justify-end">
          <ThemeBtn />
        </div>

        {/* Only GitHub Profile (with repos) */}
        <GithubProfile />
      </div>
    </ThemeProvider>
  );
}

export default App;
