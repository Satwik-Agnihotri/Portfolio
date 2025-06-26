// src/pages/InfoSection.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

// EmailJS config (keep your service and template IDs here)
emailjs.init('gNymqCR1vtA215E9p'); // Replace with your actual Public Key

const InfoSection = ({ contactBgImage }) => { // Renamed component to InfoSection
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success or error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send('service_v6g945c', 'template_3pgprcn', templateParams) // Replace with your actual Service ID and Template ID
      .then(() => {
        setLoading(false);
        setFormData({ name: '', email: '', message: '' });
        setStatus({ message: 'Message sent successfully!', type: 'success' });
      })
      .catch((error) => {
        console.error('EmailJS failed:', error); // Log the actual error for debugging
        setLoading(false);
        setStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
      });
  };

  return (
    <>
      {/* About Us Section */}
      <motion.section
        id="about" // Ensure this ID matches your header navigation
        className="py-20 bg-black/70 backdrop-blur-sm text-white" // Background kept for readability of text
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400">
            About UpVision
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Founder Card */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-cyan-500/10 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Rajat Verma</h3>
              <p className="text-sm text-white/70">Founder & CEO</p>
              <p className="mt-4 text-gray-300 text-sm">
                Rajat, our visionary leader, built UpVision to redefine data's power in business.
              </p>
            </motion.div>

            {/* Marketing Head Card */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-cyan-500/10 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Sneha Kapoor</h3>
              <p className="text-sm text-white/70">Marketing Head</p>
              <p className="mt-4 text-gray-300 text-sm">
                Sneha drives our global outreach with creative fire and strategic acumen.
              </p>
            </motion.div>

            {/* Admin Head Card */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-cyan-500/10 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Aryan Sinha</h3>
              <p className="text-sm text-white/70">Admin Lead</p>
              <p className="mt-4 text-gray-300 text-sm">
                Aryan ensures our daily operations run smoothly, fostering a calm environment.
              </p>
            </motion.div>

            {/* General Team Info Card */}
            <motion.div
              className="p-6 rounded-xl bg-white/5 border border-cyan-500/10 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">Our Team</h3>
              <p className="mt-4 text-gray-300 text-sm">
                A passionate crew of thinkers, builders, and storytellers empowering insight-led transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Offices Section */}
      <motion.section
        id="office"
        className="py-20 text-white relative"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* No absolute background overlay here, allowing particles from App.jsx to show through */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400">
            Our Global Presence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* New Delhi Office Card with Map */}
            <motion.div
              className="w-full p-6 rounded-2xl bg-black/30 border border-cyan-500/10 shadow-md flex flex-col gap-4 overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-3xl font-semibold text-cyan-300 mb-2">New Delhi Office</h3>
              <p className="text-base text-white/80">
                📍 14-A Green Park, Hauz Khas<br />New Delhi, 110016
              </p>
              {/* Google Map for New Delhi */}
              <div className="w-full h-64 rounded-xl overflow-hidden mt-4 border border-cyan-600/20">
                <iframe
                  title="New Delhi Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60472.31408934911!2d77.18182261304258!3d28.54403871067837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d08938eeaf3%3A0xffba7696e9e12886!2sHauz%20Khas%20Fort!5e0!3m2!1sen!2sin!4v1750334844916!5m2!1sen!2sin"
                ></iframe>
              </div>
            </motion.div>

            {/* Bangalore Office Card with Map */}
            <motion.div
              className="w-full p-6 rounded-2xl bg-black/30 border border-cyan-500/10 shadow-md flex flex-col gap-4 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
            >
              <h3 className="text-3xl font-semibold text-cyan-300 mb-2">Bangalore Office</h3>
              <p className="text-base text-white/80">
                📍 2nd Floor, Indiranagar Block C<br />Bengaluru, Karnataka 560038
              </p>
              {/* Google Map for Bangalore */}
              <div className="w-full h-64 rounded-xl overflow-hidden mt-4 border border-cyan-600/20">
                <iframe
                  title="Bangalore Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497700.1123298952!2d77.30126647367804!3d12.953790198662501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x65e3ef55f432165d%3A0x55a845ec1b4d5709!2sEdLernity!5e0!3m2!1sen!2sin!4v1750334811704!5m2!1sen!2sin"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact" // Ensure this ID matches your header navigation
        className="relative py-20 text-white"
        style={{
          // Use contactBgImage if provided, otherwise default to a transparent background
          // This allows the App.jsx particles to show through if contactBgImage is not set or transparent.
          backgroundImage: contactBgImage ? `url(${contactBgImage})` : 'none',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        {/* Overlay for the contact section to provide blur and tint, making text readable.
            Adjusted opacity from 70% to 30% to be more transparent to particles/bg image. */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-md" // More transparent background
          aria-hidden="true"
        ></div>

        <div className="max-w-xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight pb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400">
            Get In Touch
          </h2>

          {/* Status Message Display */}
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 text-base text-center font-medium px-4 py-3 rounded-lg shadow-md ${
                status.type === 'success'
                  ? 'bg-emerald-700/20 text-emerald-300 border border-emerald-600/50'
                  : 'bg-red-700/20 text-red-300 border border-red-600/50'
              }`}
            >
              {status.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block pb-2 text-base font-medium text-white/90">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block pb-2 text-base font-medium text-white/90">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block pb-2 text-base font-medium text-white/90">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 min-h-[144px] resize-none"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded-xl px-6 py-3 text-lg font-bold text-black shadow-lg
                         bg-gradient-to-r from-cyan-400 to-sky-500 hover:shadow-xl transition-all duration-300"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default InfoSection;
