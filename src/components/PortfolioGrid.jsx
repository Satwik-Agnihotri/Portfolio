import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';

// Import asset images and videos
import iphoneFrame from "../assets/iphone.png";
import rec1Video from "../assets/rec1.webm";
import rec2Video from "../assets/rec2.webm";
import rec3Video from "../assets/rec3.webm"; // New: Import rec3 video
import rec4Video from "../assets/rec4.mp4"; // New: Import rec3 video

import perimg1 from "../assets/per1.webp";
import perimg2 from "../assets/per2.webp";

import upvi1 from "../assets/upvi1.webp";
import upvi2 from "../assets/upvi2.webp";

import alvis1 from "../assets/alvis1.webp";
import alvis2 from "../assets/alvis2.webp";
import uply1 from "../assets/uply1.webp";
import uply2 from "../assets/uply2.webp";
import master1 from "../assets/master1.webp";
import master2 from "../assets/master2.webp";
import nova1 from "../assets/nova1.png";
import nova2 from "../assets/nova2.png";
import moon1 from "../assets/moon1.png";
import moon2 from "../assets/moon2.png";

// New: Import images for Comic Sketch Task Manager
import task1 from "../assets/task1.webp";
import task2 from "../assets/task2.webp";


/**
 * GlareHover Component (Integrated Directly into PortfolioGrid.jsx)
 * Creates a card with a dynamic glare effect on hover.
 *
 * @param {string} width - The width of the component (e.g., "100%").
 * @param {string} height - The height of the component (e.g., "100%").
 * @param {string} background - The background color of the main component container (set to "transparent" when nested).
 * @param {string} borderRadius - The border radius of the component.
 * @param {React.ReactNode} children - The content to be displayed inside the component.
 * @param {string} glareColor - The color of the glare effect (e.g., "#ffffff", "#FFA500").
 * @param {number} glareOpacity - The opacity of the glare effect (0.0 to 1.0).
 * @param {number} glareAngle - The angle of the linear gradient for the glare effect in degrees.
 * @param {number} glareSize - The size (percentage) of the glare background.
 * @param {number} transitionDuration - The duration of the glare animation in milliseconds.
 * @param {boolean} playOnce - If true, the glare animation plays only once on mouseEnter.
 * @param {string} className - Additional Tailwind CSS classes for the main container.
 * @param {React.CSSProperties} style - Additional inline CSS styles for the main container.
 */
const GlareHover = ({
  width = "500px",
  height = "500px",
  background = "transparent",
  borderRadius = "10px",
  children,
  glareColor = "#ff5722",
  glareOpacity = 0.3,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
}) => {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    el.offsetHeight; // Force reflow
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "-100% -100%, 0 0";
    }
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
      hsla(0,0%,0%,0) 60%,
      ${rgba} 70%,
      hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  return (
    <div
      className={`relative grid place-items-center cursor-pointer ${className}`}
      style={{
        width,
        height,
        background,
        borderRadius,
        ...style,
        overflow: 'hidden'
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

// --- LazyImage component (for lazy loading images) ---
const LazyImage = ({ src, alt, className = "", delay = 0, style = {} }) => {
  const [loadedSrc, setLoadedSrc] = useState('');
  const imgRef = useRef(null);

  useEffect(() => {
    let observer;
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !loadedSrc) {
              const image = new Image();
              image.src = src;
              image.onload = () => {
                setLoadedSrc(src);
              };
              image.onerror = () => {
                console.error(`Failed to load image: ${src}`);
              };
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '100px' }
      );
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, loadedSrc]);

  return (
    <img
      ref={imgRef}
      src={loadedSrc || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
      alt={alt}
      className={`${className} ${loadedSrc ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ease-in-out`}
      style={style}
    />
  );
};


const PortfolioGrid = () => {
  // State to manage which video is currently displayed in the iPhone frame
  const [currentIphoneContent, setCurrentIphoneContent] = useState('rec1');
  // State to control the initial animation of the product design button
  const [animateButton, setAnimateButton] = useState(false);
  // State to control the looping animation of the product design button
  const [loopButtonAnimation, setLoopButtonAnimation] = useState(false);

  // Define the sequence of iPhone videos
  const iphoneVideoSequence = ['rec4', 'rec3', 'rec1','rec2']; // Added rec3
  const [iphoneVideoIndex, setIphoneVideoIndex] = useState(0);

  // Effect to handle the iPhone video cycling
  useEffect(() => {
    setCurrentIphoneContent(iphoneVideoSequence[iphoneVideoIndex]);
  }, [iphoneVideoIndex]);

  // Function to get the video source based on the current content key
  const getIphoneVideoSrc = (key) => {
    switch (key) {
      case 'rec1':
        return rec1Video;
      case 'rec2':
        return rec2Video;
      case 'rec3': // New case for rec3
        return rec3Video;
        case 'rec4': // New case for rec3
        return rec4Video;
      default:
        return rec1Video;
    }
  };

  // Effect for the button animation
  useEffect(() => {
    setAnimateButton(true);
    const loopDelayTimeout = setTimeout(() => {
      setLoopButtonAnimation(true);
    }, 4000);

    return () => {
      clearTimeout(loopDelayTimeout);
    };
  }, []);

  return (
    <section className="w-[80%] mx-auto mt-10 font-inter text-gray-300 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

        {/* Left Column */}
        <div className="flex flex-col gap-6 ">
          {/* iOS Mobile app section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4 bg-[#1B1B1B]">
              <div className="max-w-[calc(100%-40px)]">
                <h3 className="text-lg text-gray-300 font-medium hover:text-orange-500 transition-colors bg-[#1B1B1B] duration-300 cursor-pointer">Built to Flow Everywhere</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">From widescreens to palms — it's clean, fluid, and fast. </p>
              </div>
              <a href="#" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            <div className="mt-auto flex justify-center items-end min-h-[350px] relative bg-[#1B1B1B]">
              <img src={iphoneFrame} alt="iPhone Frame" className="absolute w-[200px] h-auto object-contain bg-[#1B1B1B] z-10 bottom-0" style={{ maxHeight: 'calc(100% - 20px)' }} />
              <div
                className="absolute z-10 transition-opacity duration-1000"
                style={{
                  width: '145px',
                  height: '305px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -46.9%)',
                  overflow: 'hidden',
                  borderRadius: '1rem',
                  opacity: currentIphoneContent ? 1 : 0,
                }}
              >
                <video
                  key={currentIphoneContent}
                  src={getIphoneVideoSrc(currentIphoneContent)} // Use helper function
                  className="absolute top-0 left-0 w-full h-full object-fill"
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => {
                    setIphoneVideoIndex((prevIndex) =>
                      (prevIndex + 1) % iphoneVideoSequence.length
                    );
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Alvis Agrochem project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://alvisagrochem.com" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Alvis Agrochem</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">Dedicated Website for Fertilizers & Farmers</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://alvisagrochem.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://alvisagrochem.com" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={alvis2}
                  alt="Alvis Agrochem - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={alvis1}
                  alt="Alvis Agrochem - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
              </div>
            </a>
          </motion.div>

          {/* Masterverse Project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://www.masterverses.com/wishdom.html" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Masterverse - Spiritual AI Chatbot</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">AI-Powered Conversational Platform for Spiritual Guidance</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://www.masterverses.com/wishdom.html" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://www.masterverses.com/wishdom.html" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={master2}
                  alt="Masterverse - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={master1}
                  alt="Masterverse - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
                
              </div>
            </a>
          </motion.div>
   <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
        >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
                <a href="#" className="max-w-[calc(100%-40px)] flex-grow group">
                    <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">NovaSync – Universal AI Collaboration Protocol</h3>
                    <p className="text-sm text-gray-500 bg-[#1B1B1B]">Built a decentralized protocol enabling AI agents to collaborate in real time with blockchain-secured trust; scaled to millions of concurrent interactions.</p>
                </a>
                <a href="#" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                    </svg>
                </a>
            </div>
            <a href="#" className="block">
                <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                    <LazyImage src={nova2} alt="NovaSync - Back Card" className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85] transition-all duration-500 ease-in-out group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl"/>
                    <LazyImage src={nova1} alt="NovaSync - Front Card" className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu transition-all duration-500 ease-in-out group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl"/>
                </div>
            </a>
        </motion.div>
         <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
        >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
                <a href="#" className="max-w-[calc(100%-40px)] flex-grow group">
                    <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Moonrow (ICP Work) – Decentralized Freelance Marketplace</h3>
                    <p className="text-sm text-gray-500 bg-[#1B1B1B]">Developed a Web3 freelance platform on ICP with trustless escrow, on-chain reputation, and DAO governance, cutting infra costs by 70%.</p>
                </a>
                <a href="#" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                    </svg>
                </a>
            </div>
            <a href="#" className="block">
                <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                    <LazyImage src={moon2} alt="Moonrow - Back Card" className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85] transition-all duration-500 ease-in-out group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl"/>
                    <LazyImage src={moon1} alt="Moonrow - Front Card" className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu transition-all duration-500 ease-in-out group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl"/>
                </div>
            </a>
        </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Product Design Button */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-lg p-[1px] overflow-hidden group w-full"
          >
            <div
              className={`absolute inset-0 rounded-lg
                bg-[linear-gradient(to_bottom_right,transparent,transparent_40%,orange_50%,transparent_60%,transparent)]
                bg-[length:100%_200%]
                ${animateButton ? (loopButtonAnimation ? 'animate-gradient-border-anim-loop' : 'animate-gradient-border-anim') : ''}
              `}
            ></div>
            <span className="relative z-10 w-full h-full bg-[#1B1B1B] text-gray-300 px-6 py-12 rounded-lg flex items-center justify-center block overflow-hidden">
              <GlareHover
                width="100%"
                height="100%"
                background="transparent"
                borderRadius="0.5rem"
                glareColor="#ff5722"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="flex items-center justify-center"
                style={{ position: 'absolute', inset: 0 }}
              >
                Making Frontend Feel Premium
              </GlareHover>
            </span>
          </motion.button>

          <div className="flex gap-4">
            {/* User Experience Button */}
            <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative rounded-lg p-[1px] overflow-hidden group w-1/2"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-orange-500/50 to-orange-500/80 "></div>
              <span className="relative z-10 w-full h-full bg-[#1B1B1B] text-gray-300 px-6 py-12 rounded-lg flex items-center justify-center block overflow-hidden">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="0.5rem"
                  glareColor="#ff5722"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className="flex items-center justify-center"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  Animated. Responsive. Real.
                </GlareHover>
              </span>
            </motion.button>

            {/* NoCode Develop Button */}
            <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative rounded-lg p-[1px] overflow-hidden group w-1/2"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-red-600/80 to-orange-500/90"></div>
              <span className="relative z-10 w-full h-full bg-[#1B1B1B] text-gray-300 px-6 py-12 rounded-lg flex items-center justify-center block overflow-hidden">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="0.5rem"
                  glareColor="#ff5722"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className="flex items-center justify-center"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  Zero Bloat. Just Skill.
                </GlareHover>
              </span>
            </motion.button>
          </div>

          {/* Comic Sketch Task Manager Project - NEW SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }} // Adjusted delay
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://checksy-task.netlify.app/" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Comic Sketch Task Manager</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">A playful and intuitive task management application with a comic book aesthetic.</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://checksy-task.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://checksy-task.netlify.app/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={task2}
                  alt="Comic Sketch Task Manager - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={task1}
                  alt="Comic Sketch Task Manager - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
              </div>
            </a>
          </motion.div>


          {/* Scented Pleasure Project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }} // Adjusted delay
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://scentedplum.netlify.app" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Scented Pleasure - Premium Perfume Brand</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">E-commerce Platform with Immersive Product Experience & Secure Payment Integration</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://scentedplum.netlify.app" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://scentedplum.netlify.app" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={perimg2}
                  alt="Scented Pleasure - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={perimg1}
                  alt="Scented Pleasure - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
              </div>
            </a>
          </motion.div>

          {/* Upvision Project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }} // Adjusted delay
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://upvision-hackathon.netlify.app/" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Upvision - Interactive Data Visualization</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">Dynamic Dashboards to Showcase Company Performance with Interactive Graphs</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://upvision-hackathon.netlify.app/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://upvision-hackathon.netlify.app/" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={upvi2}
                  alt="Upvision - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={upvi1}
                  alt="Upvision - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
              </div>
            </a>
          </motion.div>

          {/* Uplyft Project */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }} // Adjusted delay
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 bg-[#1B1B1B] mb-4">
              {/* Wrapped heading and paragraph in a clickable anchor */}
              <a href="https://chatbot-uply.netlify.app" target="_blank" rel="noopener noreferrer" className="max-w-[calc(100%-40px)] flex-grow group">
                <h3 className="text-lg text-gray-300 font-medium bg-[#1B1B1B] group-hover:text-orange-500 transition-colors duration-300">Uplyft - AI E-commerce Chatbot</h3>
                <p className="text-sm text-gray-500 bg-[#1B1B1B]">AI-Powered Chatbot to Streamline E-commerce Search and Enhance User Experience</p>
              </a>
              {/* Existing arrow icon remains clickable */}
              <a href="https://chatbot-uply.netlify.app" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-orange-500 hover:text-white transition-colors duration-300 ml-auto bg-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={2} stroke="currentColor" className="w-5 h-5 bg-[#1B1B1B]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25"/>
                </svg>
              </a>
            </div>
            {/* Wrapped image section in a clickable anchor */}
            <a href="https://chatbot-uply.netlify.app" target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative group w-full bg-[#1B1B1B] min-h-[180px] sm:min-h-[220px] flex items-center justify-center overflow-hidden">
                {/* Back Card */}
                <LazyImage
                  src={uply2}
                  alt="Uplyft - Back Card"
                  className="absolute w-[90%] h-[90%] object-contain rounded-xl z-0 transform-gpu rotate-[5deg] opacity-70 scale-[0.85]
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[20deg] group-hover:translate-x-[90px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:opacity-100 group-hover:z-10 group-hover:shadow-xl
                  "
                />
                {/* Front Card */}
                <LazyImage
                  src={uply1}
                  alt="Uplyft - Front Card"
                  className="absolute w-full h-full object-contain rounded-xl z-10 transform-gpu
                  transition-all duration-500 ease-in-out
                  group-hover:rotate-[-20deg] group-hover:translate-x-[-40px] group-hover:translate-y-[-20px] group-hover:scale-[1.15] group-hover:shadow-xl
                  "
                />
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
