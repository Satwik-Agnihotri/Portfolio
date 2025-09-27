import React, { useState } from "react";
import me from "../assets/me.jpeg";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Intro = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleHireMeClick = () => {
    window.open(
      "https://www.dropbox.com/scl/fi/8inmff15wesibxj6suy0t/Satwik-CV.docx?rlkey=cgxngabbx8c45fik9cizbi6ua&st=4hsco5c2&dl=0",
      "_blank"
    );
  };

  const handleCopyEmailClick = () => {
    navigator.clipboard.writeText("satwikagnihotrie@gmail.com");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  return (
    <section  id="intro" className="w-[90%] md:w-[80%] mx-auto bg-[#1B1B1B] rounded-xl border border-[#2a2a2a] p-6 md:p-8 mt-10 font-inter bg-[#1B1B1B] relative">
      {/* Alert */}
      {showAlert && (
        <div className="absolute top-4 right-4 bg-[#2a2a2a] text-white px-4 py-2 rounded-md shadow-lg animate-pulse border border-[#FF3D00]">
          📧 Email copied to clipboard!
        </div>
      )}

      {/* Top Row: Role + Availability */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left bg-[#1B1B1B]">
        <p className="text-m text-gray-400 bg-[#1B1B1B]">FullStack Developer</p>
        <span className="text-xs text-white flex items-center gap-1 mt-2 sm:mt-0 border border-[#2a2a2a] rounded-full px-2 py-1 bg-[#1B1B1B]">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          OPEN TO INTERNSHIPS
        </span>
      </div>

      {/* Main Content: Text + Image (Responsive) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#1B1B1B]">
        {/* Left Side Text */}
        <div className="space-y-4 text-center md:text-left w-full md:w-2/3 bg-[#1B1B1B]">
          <h1 className="text-3xl font-semibold text-white bg-[#1B1B1B]">I’m Satwik Agnihotri</h1>
          <p className="text-gray-300 bg-[#1B1B1B]">
            I build expressive UIs with <br className="hidden sm:block" />
            clean code and seamless motion.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 bg-[#1B1B1B]">
            {/* Hire Me Button */}
            <div
              className={`flex shadow-md rounded-md overflow-hidden border border-[#b02e0c] 
              transition-transform duration-200 ease-out 
              shadow-orange-500/50 hover:shadow-orange-500/70 bg-[#1B1B1B]`}
              style={{
                boxShadow: "0 0 8px rgba(255, 61, 0, 0.5)",
              }}
            >
              <button
                className="bg-[#FF3D00] text-white px-4 py-2 font-medium hover:bg-[#ff5722] transition"
                onClick={handleHireMeClick}
              >
                Hire me
              </button>
              <div className="w-px bg-[#b02e0c]"></div>
              <button
                className="bg-[#FF3D00] text-white px-4 py-2 hover:bg-[#ff5722] transition"
                onClick={handleHireMeClick}
              >
                +
              </button>
            </div>

            {/* Copy Email Button */}
            <div
              className={`flex rounded-md overflow-hidden border border-[#333] 
              transition-transform duration-200 ease-out bg-[#1B1B1B]`}
            >
              <button
                className="bg-[#101010] text-gray-300 px-4 py-2 font-medium hover:bg-[#1f1f1f] transition"
                onClick={handleCopyEmailClick}
              >
                Copy Email
              </button>
              <div className="w-px bg-[#333]"></div>
              <span
                className="bg-[#101010] px-3 py-2 flex items-center justify-center text-gray-400 hover:bg-[#1f1f1f] transition cursor-pointer"
                onClick={handleCopyEmailClick}
              >
                📋
              </span>
            </div>
          </div>
        </div>

        {/* Profile Image + Social Icons */}
        <div className="flex flex-col items-center bg-[#1B1B1B]">
          <img
            src={me}
            alt="Satwik"
            className="w-28 h-28 rounded-full border-4 border-[#2a2a2a] object-cover"
            style={{
              boxShadow: "0 0 25px #FF3D00, 0 0 2px #FF3D00, 0 0 3px #FF3D00",
            }}
          />
          {/* Social Icons */}
          <div className="flex gap-4 mt-2 bg-transparent">
            <a
              href="https://www.instagram.com/satwik_agnihotri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-white transition duration-300 hover:scale-110 bg-[#1B1B1B]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/satwik-agnihotri/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-white transition duration-300 hover:scale-110 bg-[#1B1B1B]"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/Satwik-Agnihotri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-white transition duration-300 hover:scale-110 bg-[#1B1B1B]"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
