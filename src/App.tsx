import SpaceBackground from "./components/background/SpaceBackground";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import Gallery from "./components/sections/Gallery";
import Bio from "./components/sections/Bio";
import Experience from "./components/sections/Experience";
import PortfolioIntro from "./components/sections/PortfolioIntro";
import PortfolioWorks from "./components/sections/PortfolioWorks";
import ExperienceIntro from "./components/sections/ExperienceIntro";
import ExperienceSports from "./components/sections/ExperienceSports";
import ExperienceGaming from "./components/sections/ExperienceGaming";
import ExperiencePresscon from "./components/sections/ExperiencePresscon";
import ExperienceGala from "./components/sections/ExperienceGala";
import ExperienceAwards from "./components/sections/ExperienceAwards";
import PartnerMarquee from "./components/sections/PartnerMarquee";
import Contact from "./components/sections/Contact";
import Works from "./components/sections/Works";
import Capabilities from "./components/sections/Capabilities";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-space-black text-white">
      <SpaceBackground />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <div id="about"><Bio /></div>
        <Experience />
        <div id="skills"><Works /></div>
        <Capabilities />
        <div id="works"><PortfolioIntro /></div>
        <PortfolioWorks />
        <div id="experience"><ExperienceIntro /></div>
        <ExperienceSports />
        <ExperienceGaming />
        <ExperiencePresscon />
        <ExperienceGala />
        <ExperienceAwards />
        <PartnerMarquee />
        <div id="contact"><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}
