"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0, rotateX: 90 },
    animate = { y: 0, opacity: 1, rotateX: 0 },
    exit = { y: "-120%", opacity: 0, rotateX: -90 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0.03, // Reverted to 0.03 for a visible stagger
    staggerFrom = "center",
    loop = true,
    auto = true,
    splitBy = "characters", // Default is "characters"
    onNext,
    // Custom classNames from App.jsx are *merged* with base styles here
    mainClassName,      // For the motion.span around rotating text (e.g., text size, tracking)
    splitLevelClassName, // For the flex container of words (e.g., gap-x)
    elementLevelClassName, // For each individual character span (e.g., drop-shadow)
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    // Default split by custom string (e.g., if splitBy is a comma)
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      // If staggerFrom is a number (e.g., 2), calculate from that index
      if (typeof staggerFrom === "number") {
          return Math.abs(staggerFrom - index) * staggerDuration;
      }
      return 0; // Default if unknown staggerFrom
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    // Outer container for the full-screen overlay, remains transparent
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Container for "Satwik is a" and the rotating text.
          Base styling for the whole line is applied here. */}
      <div className="flex items-center gap-2 text-white text-xl sm:text-2xl md:text-4xl font-bold">
        <span className="text-white/80">Just Satwik being</span>
        {/* The rotating text container - applying background color via inline style
            and explicitly adding base styling classes. */}
        <motion.span
          className={cn(
            "flex flex-wrap whitespace-pre-wrap relative px-3 py-1 rounded-lg",
            mainClassName // Merges additional classes from App.jsx
          )}
          {...rest}
          layout
          // IMPORTANT: Set inline style for background color to ensure it's applied
          // and merge with any existing style props.
          style={{ ...rest.style, perspective: 1000, backgroundColor: '#FF3D00' }}
        >
          <span className="sr-only">{texts[currentTextIndex]}</span>
          <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
            <motion.div
              key={currentTextIndex}
              className={cn(
                splitBy === "lines"
                  ? "flex flex-col w-full"
                  : "flex flex-wrap whitespace-pre-wrap relative",
                splitLevelClassName // Merges additional classes from App.jsx
              )}
              layout
              aria-hidden="true"
            >
              {elements.map((wordObj, wordIndex, array) => {
                const previousCharsCount = array
                  .slice(0, wordIndex)
                  .reduce((sum, word) => sum + word.characters.length, 0);
                return (
                  <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                    {wordObj.characters.map((char, charIndex) => (
                      <motion.span
                        key={charIndex}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition, // Uses the 'transition' prop from App.jsx
                          delay: getStaggerDelay(
                            previousCharsCount + charIndex,
                            array.reduce((sum, word) => sum + word.characters.length, 0)
                          ),
                        }}
                        // Text color is explicitly white here for contrast
                        className={cn("inline-block text-white", elementLevelClassName)}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.span>
      </div>
    </div>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;