import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import ToggleLanguage from "./ToggleLanguage";
import ThemeToggle from "./ThemeToggle";
import logo from "../../../assets/images/logo.png";
import { useTheme } from "../../../shared/theme/themeContext";

interface Props {
  isOpen: boolean;
  setIsOpen: (p: boolean) => void;
}

const socialLinks = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@lumin.cafe?_t=ZS-90tZzw6I02x&_r=1",
    Icon: AiFillTikTok,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/lumin.cafe/",
    Icon: FaSquareInstagram,
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/add/lumincafe?share_id=haC0gbJVXac&locale=ar-SA-u-nu-latn",
    Icon: FaSnapchatGhost,
  },
];

export default function SideMenu({ isOpen, setIsOpen }: Props) {
  const { isDark } = useTheme();

  // يمنع سكرول الصفحة اللي ورا القائمة وهي مفتوحة
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-dvh w-64 flex flex-col justify-between items-center py-6 overflow-hidden bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <IoCloseSharp
        className="text-2xl absolute top-2 left-2 cursor-pointer dark:text-white"
        onClick={() => setIsOpen(false)}
      />

      {/* اللوجو + زر اللغة + زر الدارك مود */}
      <div className="flex flex-col items-center gap-3">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img
            src={logo}
            alt="Lumin Cafe"
            className="w-36 h-36 [@media(max-height:560px)]:w-24 [@media(max-height:560px)]:h-24 object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ToggleLanguage />
          <ThemeToggle />
        </div>
      </div>

      {/* الروابط */}
      <HeaderLinks
        className="w-2/3 bg-white dark:bg-neutral-900 flex flex-col gap-3.5 justify-center text-black dark:text-white"
        textColor={isDark ? "white" : "black"}
      />

      {/* السوشيال ميديا */}
      <div className="w-2/3 border-t-2 border-dotted border-gray-300 dark:border-neutral-600 pt-4 flex items-center justify-center gap-5">
        {socialLinks.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-3xl text-[#DAB67B] hover:text-[#E4C7A2] transition-colors duration-300"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}