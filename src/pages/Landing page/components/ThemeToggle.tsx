import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../../shared/theme/themeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-10 h-10 shrink-0 rounded-full border border-[#DAB67B] bg-[#1E1E1E] text-[#DAB67B] flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:bg-[#DAB67B] hover:text-black"
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}