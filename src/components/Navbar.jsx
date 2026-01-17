// src/components/Navbar.jsx
import React from "react";
import logo from "../assets/logo.png";

const Navbar = ({ onContactClick }) => {
  const handleScrollToIntro = () => {
    const introSection = document.getElementById("intro");
    if (introSection) {
      introSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenResume = () => {
    window.open(
      "https://www.dropbox.com/scl/fi/kgxanxrarv3rw4r0e2rjz/SATWIK_COMBINED.pdf?rlkey=biycv1ndlj5pq67dq7va66d30&st=79jra9f6&dl=0",
      "_blank"
    );
  };

  const handleContactClick = () => {
    onContactClick(); // showContact(true)
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // wait for ContactCard to mount
  };

  return (
    <nav className="w-full flex justify-center items-center py-6 px-4 bg-[#161616]">
      <div className="w-full max-w-6xl flex flex-wrap md:flex-nowrap justify-between items-center gap-y-4">
        {/* Logo Circle */}
        <div className="bg-[#1B1B1B] border border-[#2a2a2a] rounded-full w-14 h-14 flex items-center justify-center mx-auto md:mx-0">
          <img
            src={logo}
            alt="logo"
            className="w-7 h-7 object-contain bg-[#1B1B1B]"
          />
        </div>

        {/* Nav Links */}
        <div className="w-full md:flex-1 bg-[#1B1B1B] border border-l border-[#2a2a2a] rounded-full px-6 md:px-12 h-14 flex items-center justify-center">
          <ul className="flex flex-wrap justify-around w-full font-inter text-sm md:text-base font-normal tracking-wide bg-[#1B1B1B]">
            <li
              onClick={handleScrollToIntro}
              className="text-white cursor-pointer hover:text-[#FF3D00] bg-[#1B1B1B] hover:font-semibold transition duration-300"
            >
              ABOUT
            </li>
            <li
              onClick={handleOpenResume}
              className="text-white cursor-pointer hover:text-[#FF3D00] bg-[#1B1B1B] hover:font-semibold transition duration-300"
            >
              RESUME
            </li>
            <li
              onClick={handleContactClick}
              className="text-white cursor-pointer hover:text-[#FF3D00] bg-[#1B1B1B] hover:font-semibold transition duration-300"
            >
              CONTACT
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
