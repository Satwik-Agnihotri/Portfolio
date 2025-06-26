// src/components/shared/Loader.jsx
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// U-shape SVG component for reusability and consistent styling
const USymbol = ({ className, initial, animate, transition, onAnimationComplete }) => (
  <motion.svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={initial}
    animate={animate}
    transition={transition}
    onAnimationComplete={onAnimationComplete}
  >
    {/* Path for a bold 'U' shape, designed to resemble 'UpVision' font style */}
    <path
      d="M25 10V70C25 80 35 80 35 80H65C65 80 75 80 75 70V10"
      stroke="url(#gradientU)"
      strokeWidth="18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      {/* Gradient matching the 'UpVision' text gradient for consistency */}
      <linearGradient id="gradientU" x1="25" y1="10" x2="75" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67E8F9" />
        <stop offset="0.5" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#60A5FA" />
      </linearGradient>
    </defs>
  </motion.svg>
);

export default function Loader({ onAnimationComplete }) {
  const [animationPhase, setAnimationPhase] = useState(0);

  const count = useMotionValue(0); // Master MotionValue for progress 0-100
  const roundedCount = useTransform(count, (latest) => Math.round(latest));
  const barWidth = useTransform(count, (latest) => `${latest}%`); // For setting width in percentage

  // Effect to animate the count from 0 to 100
  useEffect(() => {
    if (animationPhase === 0) {
      count.set(0); // Explicitly ensure it starts at 0
      // Animate to 100, but add a tiny delay to `set(100)`
      // to ensure the UI renders the initial 0 before animation begins.
      // This helps visually guarantee it starts from 0.
      const animationTimer = setTimeout(() => {
        count.set(100, { duration: 2.4, ease: "easeInOut" });
      }, 50); // A small delay (e.g., 50ms)

      return () => clearTimeout(animationTimer);
    }
  }, [animationPhase, count]);

  const handleBarFillComplete = () => {
    setAnimationPhase(1); // Move to phase 1 (bar shrinks, U appears)
  };

  const handleUTransformComplete = () => {
    setAnimationPhase(2); // Move to phase 2 (U zooms out)
    if (onAnimationComplete) {
      onAnimationComplete(); // Signal to parent (App.jsx) that loader is done
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5 }} // Scales up 1.5x as it fades out to enhance zoom effect
      transition={{ duration: 1.0, ease: "easeIn" }} // Quick, impactful exit transition
    >
      {/* Subtle glowing aura behind the main content */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/30 blur-3xl rounded-full pointer-events-none transition-opacity duration-1000 ease-out" />

      {/* "UpVision" text animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: animationPhase === 0 ? 1 : 0, scale: animationPhase === 0 ? 1 : 0.9 }}
        transition={{
          opacity: { duration: 0.3, delay: animationPhase === 0 ? 0.3 : 2.0, ease: "easeOut" },
          scale: { duration: 0.5, delay: animationPhase === 0 ? 0.3 : 0, ease: "easeOut" }
        }}
        className="text-6xl sm:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-sky-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
      >
        UpVision
      </motion.h1>

      {/* Loading Counter - Positioned in the exact bottom-left corner */}
      <AnimatePresence>
        {animationPhase === 0 && ( // Only show counter during phase 0 (bar filling)
          <motion.p
            className="absolute bottom-4 left-4 text-xs text-white opacity-75 font-medium" // Positioned to bottom-left, tiny text, subtle opacity
            initial={{ opacity: 0 }} // Fades in
            animate={{ opacity: 1 }} // Stays visible
            exit={{ opacity: 0, transition: { duration: 0.3 } }} // Fades out with the loader
            transition={{ duration: 0.5, delay: 0.5 }} // Appear shortly after loader starts
          >
            <motion.span>{roundedCount}</motion.span>% {/* Display rounded MotionValue */}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Premium Loading Bar - visible only during phase 0 and the transition to phase 1 */}
      {animationPhase <= 1 && (
        <motion.div
          className="h-2 w-64 rounded-full bg-white/10 mt-8 overflow-hidden shadow-lg ring-1 ring-white/10"
          initial={{ width: 0, opacity: 1, y: 0 }} // Start with 0 width, full opacity
          animate={{
            width: animationPhase === 0 ? "100%" : "20px", // Full width, then shrink to 20px
            height: animationPhase === 0 ? "8px" : "20px", // Original height, then grow to 20px (to become square for U)
            opacity: animationPhase === 0 ? 1 : 0, // Stay visible in phase 0, fade out in phase 1
            y: animationPhase === 0 ? 0 : 40, // Move down slightly as it transforms
          }}
          transition={{
            width: { duration: 2.4, ease: "easeInOut" }, // Bar fill duration
            height: { duration: 0.3, delay: 2.4, ease: "easeOut" }, // Height transition starts after fill
            opacity: { duration: 0.3, delay: 2.4, ease: "easeOut" }, // Opacity transition starts after fill
            y: { duration: 0.3, delay: 2.4, ease: "easeOut" },
          }}
          onAnimationComplete={handleBarFillComplete} // Trigger phase 1 when bar fill is done
          style={{ width: barWidth }} // Link bar width to motion value
        >
          {/* Inner pulsating bar */}
          <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_12px_#0ff]" />
        </motion.div>
      )}

      {/* U Symbol - Appears in phase 1, zooms out in phase 2 */}
      {animationPhase >= 1 && ( // Render U symbol from phase 1 onwards
        <USymbol
          className="absolute w-24 h-24" // Base size of the U symbol
          // Adjust 'top' to align the U symbol with the position where the bar disappears.
          // This positions the U roughly where the bar was.
          style={{ top: '50%', marginTop: '32px' }}
          initial={{ opacity: 0, scale: 0.2 }} // Start as small and fully transparent
          animate={{
            // In phase 1: fade in and scale to normal size
            // In phase 2: fade out and scale massively (zoom effect)
            opacity: animationPhase === 1 ? 1 : (animationPhase === 2 ? 0 : 0),
            scale: animationPhase === 1 ? 1 : (animationPhase === 2 ? 200 : 0.2), // Zoom to 200x scale for deep "through U" effect
          }}
          transition={{
            // Transition for phase 1: fade in and scale up (starts after bar animation)
            opacity: { duration: animationPhase === 1 ? 0.3 : 0.5, delay: animationPhase === 1 ? 2.4 : 0 },
            scale: { duration: animationPhase === 1 ? 0.5 : 0.8, ease: animationPhase === 1 ? "easeOut" : "easeIn", delay: animationPhase === 1 ? 2.4 : 0 },
            // Delay for phase 1 ensures U appears right as bar disappears
          }}
          // Only call for phase 1 completion to trigger the U zoom (phase 2)
          onAnimationComplete={animationPhase === 1 ? handleUTransformComplete : undefined}
        />
      )}
    </motion.div>
  );
}
