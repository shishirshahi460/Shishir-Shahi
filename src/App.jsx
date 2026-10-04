import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import ContactPage from "./pages/ContactPage";
import HireMe from "./pages/HireMe";
import GalleryPage from "./pages/Gallerypage";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/hireme" element={<HireMe />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;