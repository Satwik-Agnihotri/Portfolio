import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import me from "../assets/me.jpeg";

const Contact = ({ show, onClose }) => {
  const [copiedField, setCopiedField] = useState("");
  const [displayModal, setDisplayModal] = useState(show);

  useEffect(() => {
    if (show) {
      setDisplayModal(true);
    }
  }, [show]);

  const copyToClipboard = (text, field) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedField(field);
          setTimeout(() => setCopiedField(""), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy using Clipboard API:", err);
          fallbackCopyToClipboard(text, field);
        });
    } else {
      fallbackCopyToClipboard(text, field);
    }
  };

  const fallbackCopyToClipboard = (text, field) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  if (!displayModal && !show) {
    return null;
  }

  return (
    // This outer motion.div is crucial for centering.
    // 'fixed inset-0' ensures it covers the entire viewport.
    // 'flex items-center justify-center' tells it to center its content (the card)
    // both horizontally (justify-center) and vertically (items-center).
    <motion.div
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1, backdropFilter: 'blur(4px)' } : { opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        if (!show) {
          setDisplayModal(false);
        }
      }}
      className={`fixed inset-0 z-[999] bg-black/30 flex items-center justify-center ${show ? 'backdrop-blur-sm' : ''}`}
      onClick={(e) => {
        if (e.target.id === 'contact-backdrop') {
          onClose();
        }
      }}
      id="contact-backdrop"
    >
      {/* This inner motion.div is the card itself.
          It does NOT have absolute positioning or translate classes anymore,
          as its centering is handled by the parent flex container. */}
      <motion.div
        id="contact"
        // Animation for sliding in from the left and fading
        initial={{ x: '-100vw', opacity: 0 }}
        animate={show ? { x: '0', opacity: 1 } : { x: '-100vw', opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="w-[90%] max-w-3xl bg-white/5 border border-[#FF3D00] rounded-2xl shadow-xl backdrop-blur-md px-8 py-6 flex flex-col md:flex-row items-center gap-6 relative"
      >
        {/* Left Text Block */}
        <div className="text-orange-400 font-inter bg-transparent w-full md:w-2/3 space-y-3">
          <h2
            onClick={() => copyToClipboard("Satwik Agnihotri", "name")}
            className="text-2xl font-bold cursor-pointer bg-transparent hover:text-white transition"
          >
            Satwik Agnihotri
            {copiedField === "name" && (
              <span className="ml-2 text-green-400 bg-transparent text-sm">Copied!</span>
            )}
          </h2>

          <p
            onClick={() =>
              copyToClipboard("satwikagnihotrie@gmail.com", "email")
            }
            className="cursor-pointer bg-transparent hover:text-white transition"
          >
            <FaEnvelope className="inline mr-2" />
            satwikagnihotrie@gmail.com
            {copiedField === "email" && (
              <span className="ml-2 text-green-400 bg-transparent text-sm">Copied!</span>
            )}
          </p>

          <p
            onClick={() => copyToClipboard("FullStack Developer", "role")}
            className="cursor-pointer bg-transparent hover:text-white transition"
          >
            🚀 FullStack Developer
            {copiedField === "role" && (
              <span className="ml-2 text-green-400 bg-transparent text-sm">Copied!</span>
            )}
          </p>

          <p
            onClick={() =>
              copyToClipboard("https://github.com/Satwik-Agnihotri", "github")
            }
            className="cursor-pointer bg-transparent hover:text-white transition"
          >
            GitHub: Satwik-Agnihotri
            {copiedField === "github" && (
              <span className="ml-2 text-green-400 bg-transparent text-sm">Copied!</span>
            )}
          </p>

          <p
            onClick={() =>
              copyToClipboard(
                "https://www.linkedin.com/in/satwik-agnihotri/",
                "linkedin"
              )
            }
            className="cursor-pointer bg-transparent hover:text-white transition"
          >
            LinkedIn: satwik-agnihotri
            {copiedField === "linkedin" && (
              <span className="ml-2 text-green-400 bg-transparent text-sm">Copied!</span>
            )}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 bg-transparent pt-1">
            <a
              href="https://www.linkedin.com/in/satwik-agnihotri/"
              target="_blank"
              className="hover:text-white bg-transparent transition"
              rel="noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/satwik_agnihotri/"
              target="_blank"
              className="hover:text-white bg-transparent transition"
              rel="noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://github.com/Satwik-Agnihotri"
              target="_blank"
              className="hover:text-white bg-transparent transition"
              rel="noreferrer"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-36 h-36 rounded-full bg-transparent overflow-hidden border-4 border-[#FF3D00] shadow-md">
          <img src={me} alt="Satwik" className="w-full h-full object-cover" />
        </div>

        {/* Close Button (Inside Bottom Center) */}
        <button
          onClick={onClose}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#FF3D00] hover:bg-[#ff5722] text-white font-semibold rounded-full shadow-md transition duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Contact;