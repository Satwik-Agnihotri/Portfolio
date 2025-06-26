import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import RotatingText from "./components/RotatingText"; // Your loader

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Loader will now run for 5 seconds as requested
    const timer = setTimeout(() => setLoading(false), 5000); // Increased duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white font-sans min-h-screen bg-[#0e0e0e]">
      {loading ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e0e0e]"> {/* Keep this background #0e0e0e */}
          <RotatingText
            texts={[
              // New texts with emojis as requested
              "a UI illusionist",
              "the brain behind the build",
              "your host and hacker",
              "a designer in a dev's disguise",
            ]}
            // Passing your specific transition prop to RotatingText
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            animatePresenceMode="wait"
            animatePresenceInitial={false}
            rotationInterval={1600} // Rotation speed set to 1600ms (slower)
            staggerDuration={0.03} // Stagger duration for character animation
            staggerFrom="center"
            loop
            auto
            splitBy="characters bg-[#FF3D00] " // Corrected: Should only be "characters" or "words", not CSS classes
            // These custom class names will now be correctly applied by RotatingText.jsx.
            // mainClassName and splitLevelClassName no longer contain background or text color
            // as those are now handled directly within RotatingText.jsx for robustness.
            mainClassName="text-xl sm:text-2xl md:text-3xl bg-[#FF3D00] font-bold tracking-wide"
            splitLevelClassName="gap-x-1 bg-[#FF3D00]"
            elementLevelClassName="drop-shadow-md bg-transparent"
          />
        </div>
      ) : (
        <>
          <Navbar onContactClick={() => setShowContact(true)} />
          <Contact show={showContact} onClose={() => setShowContact(false)} />
          <Intro />
          <PortfolioGrid />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;