// src/pages/Insights.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dummy Data for charts and metrics
const keyMetrics = [
  { label: 'Total Users', value: '250K+', icon: 'users' },
  { label: 'Revenue Growth', value: '+18.5%', icon: 'chart' },
  { label: 'Active Sessions', value: '98%', icon: 'activity' },
  { label: 'Data Processed', value: '500TB', icon: 'server' },
];

const trendData = [
  { name: 'Jan', Sales: 4000, Revenue: 2400, Profit: 1000 },
  { name: 'Feb', Sales: 3000, Revenue: 1398, Profit: 800 },
  { name: 'Mar', Sales: 2000, Revenue: 9800, Profit: 4000 },
  { name: 'Apr', Sales: 2780, Revenue: 3908, Profit: 2000 },
  { name: 'May', Sales: 1890, Revenue: 4800, Profit: 2500 },
  { name: 'Jun', Sales: 2390, Revenue: 3800, Profit: 1800 },
  { name: 'Jul', Sales: 3490, Revenue: 4300, Profit: 2100 },
  { name: 'Aug', Sales: 3000, Revenue: 3200, Profit: 1500 },
  { name: 'Sep', Sales: 2000, Revenue: 2800, Profit: 1200 },
];

const predictionData = [
  { label: 'Market Uptake', value: 85 },
  { label: 'Innovation Score', value: 78 },
  { label: 'User Retention', value: 92 },
  { label: 'Growth Potential', value: 95 },
];

// Framer Motion Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Insights = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax background style
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.2}px)`, // Adjust 0.2 for desired parallax strength
  };

  const chartAxisStyles = {
    stroke: '#FFFFFF', // White for axes
    fontSize: 12,
    tick: { fill: '#B0F2F2' }, // Light cyan for tick labels
    axisLine: { stroke: '#00FFFF' }, // Cyan for axis lines
    tickLine: { stroke: '#00FFFF' },
  };

  const chartTooltipStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid #00FFFF', // Cyan border
    borderRadius: '8px',
    color: '#FFFFFF',
    padding: '10px',
  };
  const chartItemStyles = {
    color: '#B0F2F2' // Light cyan for tooltip item values
  };
  const chartLabelStyles = {
    color: '#00FFFF' // Cyan for tooltip label
  };


  return (
    <div id="insights" className="relative w-full min-h-screen text-white overflow-hidden font-inter">

      {/* Parallax Background Element - Reduced opacity for more transparency */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-indigo-900/10 backdrop-blur-[1px] opacity-50" // Opacity reduced to 50%
        style={parallaxStyle}
      ></motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 pt-[120px] pb-20 px-6 max-w-7xl mx-auto">

        {/* Hero Section for Insights */}
        <motion.section
          className="text-center mb-20 md:mb-32"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 className="text-5xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
            Uncover Deep Insights
          </motion.h1>
          <motion.p className="text-lg md:text-2xl text-white/70 font-light max-w-3xl mx-auto">
            Transform raw data into actionable intelligence with our cutting-edge analytics platform.
          </motion.p>
        </motion.section>

        {/* Key Metrics Section */}
        <motion.section
          className="mb-20 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                // Reduced bg-white/5 to bg-white/2 for more transparency
                className="bg-white/2 border border-cyan-700/30 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg backdrop-blur-md
                           hover:bg-white/5 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {/* Placeholder for icon - In a real app, use Lucide React or similar */}
                <div className="text-cyan-400 text-5xl mb-4">
                  {metric.icon === 'users' && '👥'}
                  {metric.icon === 'chart' && '📈'}
                  {metric.icon === 'activity' && '⚡'}
                  {metric.icon === 'server' && '💾'} {/* Changed '?' to '💾' for server icon */}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{metric.label}</h3>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400">
                  {metric.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Deep Dive: Trend Analysis (Interactive Chart) */}
        <motion.section
          className="mb-20 md:mb-32 bg-white/2 border border-blue-700/30 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-md" // Reduced bg-white/5 to bg-white/2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
            Sales & Revenue Trend Analysis
          </h2>
          <div className="w-full h-[300px] md:h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis dataKey="name" {...chartAxisStyles} />
                <YAxis {...chartAxisStyles} />
                <Tooltip contentStyle={chartTooltipStyles} itemStyle={chartItemStyles} labelStyle={chartLabelStyles} />
                <Legend wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Sales" stroke="#00FFFF" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Profit" stroke="#FF8042" activeDot={{ r: 8 }} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Predictive Outlook Section */}
        <motion.section
          className="mb-20 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-300">
            Future & Predictive Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {predictionData.map((prediction, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/2 border border-indigo-700/30 rounded-2xl p-6 shadow-lg backdrop-blur-md" // Reduced bg-white/5 to bg-white/2
              >
                <h3 className="text-xl font-semibold text-white mb-4">{prediction.label}</h3>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${prediction.value}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.8 }}
                  ></motion.div>
                </div>
                <p className="text-sm text-white/70 text-right">{prediction.value}% Confidence</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-16 bg-white/2 border border-cyan-500/30 rounded-2xl shadow-xl backdrop-blur-md" // Reduced bg-white/5 to bg-white/2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white">
            Ready to Dive Deeper?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to get a personalized analytics overview tailored to your business needs.
          </p>
          <motion.button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-block px-8 py-4 rounded-full font-semibold text-lg
                       bg-gradient-to-r from-cyan-400 to-sky-500 text-black shadow-lg
                       hover:shadow-xl transition-all duration-300 hover:scale-[1.05] transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Request a Demo →
          </motion.button>
        </motion.section>

      </div>
    </div>
  );
};

export default Insights;
