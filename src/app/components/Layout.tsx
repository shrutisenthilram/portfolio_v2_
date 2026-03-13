import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorFollower } from "./CursorFollower";
import { ThemeProvider } from "../context/ThemeContext";

function PageWrapper() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "var(--p-bg)",
        color: "var(--p-fg)",
      }}
    >
      <CursorFollower />
      <Navbar />

      {/*
        No AnimatePresence — old page unmounts instantly, new page fades in.
        This eliminates the height-collapse shakiness that mode="wait" causes.
      */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <Outlet />
        <Footer />
      </motion.div>
    </div>
  );
}

export function Layout() {
  return (
    <ThemeProvider>
      <PageWrapper />
    </ThemeProvider>
  );
}
