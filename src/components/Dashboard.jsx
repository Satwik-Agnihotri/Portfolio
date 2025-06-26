// src/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Revenue Overview',
    desc: 'Track your revenue growth and visualize key financial metrics with interactive graphs.',
    image: 'https://placehold.co/400x200/22d3ee/FFFFFF?text=Revenue+Graph', // Cyan bg
    link: '/insights/revenue'
  },
  {
    title: 'User Engagement',
    desc: 'Monitor user activity, retention, and interaction points to understand behavior.',
    image: 'https://placehold.co/400x200/3b82f6/FFFFFF?text=User+Stats', // Blue bg
    link: '/insights/users'
  },
  {
    title: 'System Health Status',
    desc: 'Keep critical systems and infrastructure in check with real-time health metrics.',
    image: 'https://placehold.co/400x200/a78bfa/FFFFFF?text=System+Health', // Violet bg
    link: '/insights/system'
  },
  {
    title: 'Sales Performance',
    desc: 'Dive deep into sales funnels, conversion rates, and team performance breakdowns.',
    image: 'https://placehold.co/400x200/06b6d4/FFFFFF?text=Sales+Chart', // Cyan-dark bg
    link: '/insights/sales'
  },
  {
    title: 'Customer Feedback',
    desc: 'Analyze customer sentiment and feedback trends to improve satisfaction scores.',
    image: 'https://placehold.co/400x200/60a5fa/FFFFFF?text=Feedback+Analysis', // Sky-blue bg
    link: '/insights/feedback'
  },
  {
    title: 'Inventory Dynamics',
    desc: 'Optimize stock levels and manage supply chain efficiency with predictive analytics.',
    image: 'https://placehold.co/400x200/38bdf8/FFFFFF?text=Inventory+Flow', // Light Blue bg
    link: '/insights/inventory'
  },
];

const Dashboard = () => {
  return (
    <section
      id="dashboard" // Ensure this ID matches your header navigation
      className="relative w-full min-h-screen pt-[120px] px-6 pb-20 text-white overflow-hidden"
      style={{ backgroundAttachment: 'fixed' }}
    >
      {/* Background Grid or Blur - provides a subtle backdrop */}
      <div className="absolute inset-0 z-0 backdrop-blur-[2px] bg-black/10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400">
          Interactive Dashboard
        </h2>
        <p className="text-white/80 text-lg sm:text-xl font-light">
          Real-time insights for your operations and strategic decision-making.
        </p>
      </div>

      <div className="relative z-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of element is in view
            transition={{ duration: 0.8, delay: index * 0.15 }} // Staggered delay for each card
            className="bg-white/5 border border-cyan-400/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col gap-4 cursor-pointer"
            whileHover={{
              scale: 1.03, // Slight scale up on hover
              // Glowing shadow effect on hover
              boxShadow: '0 0 25px rgba(0, 255, 255, 0.6), 0 0 15px rgba(0, 200, 255, 0.4)',
              transition: { duration: 0.2 } // Quick transition for hover
            }}
          >
            <div className="w-full h-40 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if placeholder also fails
                  e.target.src = "https://placehold.co/400x200/333333/FFFFFF?text=Image+Error"; // Fallback image
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-cyan-300">{card.title}</h3>
            <p className="text-white/70 text-sm flex-grow">{card.desc}</p> {/* flex-grow for consistent height */}
            <Link
              to={card.link}
              className="mt-4 self-start px-4 py-2 rounded-full text-sm font-medium
                         bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-md
                         hover:shadow-lg transition-all duration-300 hover:scale-[1.02] transform"
              // Adding Framer Motion for button hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details →
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-16 text-center"> {/* Increased margin-top */}
       
      </div>
    </section>
  );
};

export default Dashboard;
