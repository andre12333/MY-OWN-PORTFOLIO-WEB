import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LanguageSwitcher from "../ui/LanguageSwitcher";

const navItems = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "works", href: "#works" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
];

function NavLink({ item, onNav }: { item: { key: string; href: string }; onNav: (e: React.MouseEvent, href: string) => void }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      onClick={(e) => onNav(e, item.href)}
      className="relative text-silver/30 hover:text-gold text-lg whitespace-nowrap tracking-[0.15em] font-display transition-colors duration-500 px-7 py-3 rounded-xl"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Flowing border per item */}
      <div
        className="absolute -inset-1.5 rounded-xl pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          border: "1px solid rgba(255,107,53,0.2)",
          boxShadow: hovered ? "0 0 16px rgba(255,107,53,0.18), inset 0 0 16px rgba(255,107,53,0.08)" : "none",
          background: "linear-gradient(90deg, transparent 10%, rgba(255,107,53,0.15) 35%, rgba(255,140,90,0.3) 50%, rgba(255,107,53,0.15) 65%, transparent 90%)",
          backgroundSize: "200% 100%",
          animation: "border-flow 1.5s linear infinite",
        }}
      />
      {t(`nav.${item.key}`)}
    </motion.a>
  );
}

function FadeOverlay({ show }: { show: boolean }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9999,
        background: "#0a0a14",
        opacity: show ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}
    />
  );
}

export default function Navbar() {
  const [fade, setFade] = useState(false);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setFade(true);
    const id = href.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "instant" });
      setTimeout(() => setFade(false), 150);
    }, 350);
  };

  return (
    <>
      <FadeOverlay show={fade} />
      <motion.nav
        className="fixed top-12 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center py-5 px-8 relative">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.key} item={item} onNav={handleNav} />
            ))}
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.nav>
    </>
  );
}
