import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import hero from "../../assets/images/hero.jpg";
import Hero from "./components/Hero";
import TopSeller from "./components/TopSeller";
import DiscoverSection from "./components/DiscoverSection";
import Footer from "./components/Footer";

const ProductsSlider = lazy(() => import("./components/ProductsSlider"));
export default function Home() {
  return (
    <main className="w-full relative overflow-hidden">
      <motion.img
        src={hero}
        alt="Hero Background"
        fetchPriority="high"
        className="w-full h-dvh object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* The overlay */}
      <div className="w-full h-dvh bg-[rgba(0,0,0,0.7)] absolute inset-0">
        <Header />
        {/* Hero Section */}
        <Hero />
      </div>
      {/* Other sections */}
      <TopSeller />
      <DiscoverSection />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ProductsSlider />
      </Suspense>
      <Footer/>
    </main>
  );
}
