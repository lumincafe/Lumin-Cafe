import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaLocationDot, FaSquareInstagram } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import LocationCard from "./LocationCard";
import { AiFillTikTok } from "react-icons/ai";
import { FaSnapchatGhost } from "react-icons/fa";


export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full min-h-dvh lg:min-h-[50vh] px-4 py-8 lg:px-20 bg-[#333] dark:bg-[#111]">
      {/* upper section */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center pb-5 gap-5">
        {/* about */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5 items-center">
          <p className="text-2xl text-white">{t("Header_About")}</p>
          <p className="text-gray-400 text-sm text-center">
            {t("footer_about")}
          </p>
          <p className="text-gray-400 text-sm text-center flex items-center gap-2.5">
            <FaLocationDot />
            {t("footer_address")}
          </p>
          <div className="flex items-center gap-2.5">
            <IoCall className="text-[#DAB67B]" />
            <p
              dir="ltr" 
              className="text-[#DAB67B] hover:underline transition-all duration-100 cursor-pointer">
              +966548010223
            </p>
          </div>
          <Link
            to={"/booking"}
            className="bg-[#DAB67B] text-[#1E1E1E] rounded-2xl hover:bg-[#E4C7A2] transition-all duration-100 px-10 py-2.5"
          >
            Book a table
          </Link>
        </div>
        {/* location */}
        <LocationCard/>
      </div>
      {/* lower section */}
      <div
        dir="ltr"
        className="w-full mt-4 pt-4 border-t-2 border-dotted border-gray-400 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 text-center"
      >
        {/* social links */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm text-gray-400">Follow Us :</p>
          <a
            href="https://www.tiktok.com/@lumin.cafe?_t=ZS-90tZzw6I02x&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <AiFillTikTok className="text-2xl text-gray-200 hover:text-[#DAB67B] transition-colors duration-200" />
          </a>
          <a
            href="https://www.instagram.com/lumin.cafe/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaSquareInstagram className="text-2xl text-gray-200 hover:text-[#DAB67B] transition-colors duration-200" />
          </a>
          <a
            href="https://www.snapchat.com/add/lumincafe?share_id=haC0gbJVXac&locale=ar-SA-u-nu-latn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Snapchat"
          >
            <FaSnapchatGhost className="text-2xl text-gray-200 hover:text-[#DAB67B] transition-colors duration-200" />
          </a>
        </div>

        {/* credits */}
        <div className="flex flex-col items-center lg:items-end gap-1">
          <p className="text-sm text-gray-400">
            <span className="text-amber-400">LUMIN CAFE &amp; LOUNGE</span>
            {" - "}
            <span dir="rtl">كافيه لومين &amp; لاونج</span>
          </p>
          <p className="text-sm text-gray-400">
            Updated By : <span className="text-amber-400">Ahmed Aburia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
