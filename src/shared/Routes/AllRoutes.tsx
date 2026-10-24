import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Landing page/Home";
import { ScrollToTop } from "../components/ScrollToTop";

const Menu = lazy(() => import("../../pages/Menu/Menu"));
const About = lazy(() => import("../../pages/About/About"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Booking = lazy(() => import("../../pages/Booking/Booking"));
const SingleCategory = lazy(() => import("../../pages/Menu/components/SingleCategory"));

export default function AllRoutes() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<SingleCategory />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}