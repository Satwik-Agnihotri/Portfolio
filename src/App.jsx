import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import PortfolioGrid from "./components/PortfolioGrid";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

const App = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="text-white font-sans min-h-screen">
      {/* Pass function to Navbar */}
      <Navbar onContactClick={() => setShowContact(true)} />

      {/* Contact Card, visible only if showContact = true */}
      <Contact show={showContact} onClose={() => setShowContact(false)} />

      <Intro />
      <PortfolioGrid />
      <Footer />
    </div>
  );
};

export default App;
