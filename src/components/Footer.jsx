// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative z-10 bg-transparent text-center py-10"
    >
      <div className="max-w-6xl mx-auto px-4 font-inter">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-6"
        >
          <a
            href="https://instagram.com/satwik_agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-white transition-transform duration-300 hover:scale-110"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com/in/satwik-agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-white transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Satwik-Agnihotri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-white transition-transform duration-300 hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-white/50 text-sm md:text-base font-light pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
