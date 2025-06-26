// src/components/common/GraphModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const GraphModal = ({ chart, onClose }) => {
  // Variants for modal animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  // Variants for backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  if (!chart) return null; // Should not happen with AnimatePresence, but good safeguard

  // Render the appropriate chart type based on chart.chartType
  const renderChart = () => {
    const { chartType, chartProps, title } = chart;
    const { data, dataKey, barKeys, areaKey, color } = chartProps;

    // Common chart properties for consistent styling
    const commonChartProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
      // Optional: Responsive padding for larger text
      className: "chart-container"
    };

    const axisStyles = {
      stroke: '#888888', // Light gray for axes
      fontSize: 12,
      tick: { fill: '#ffffff' }, // White for tick labels
      axisLine: { stroke: '#444444' }, // Darker gray for axis lines
      tickLine: { stroke: '#444444' },
    };

    const tooltipStyles = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: '1px solid #00FFFF', // Cyan border for tooltip
      color: '#FFFFFF',
    };

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" /> {/* Dark grid lines */}
              <XAxis dataKey="name" {...axisStyles} />
              <YAxis {...axisStyles} />
              <Tooltip contentStyle={tooltipStyles} itemStyle={{ color: '#FFFFFF' }} labelStyle={{ color: '#00FFFF' }} />
              <Legend wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }} /> {/* White legend text */}
              <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" {...axisStyles} />
              <YAxis {...axisStyles} />
              <Tooltip contentStyle={tooltipStyles} itemStyle={{ color: '#FFFFFF' }} labelStyle={{ color: '#00FFFF' }} />
              <Legend wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }} />
              {barKeys.map((item, idx) => (
                <Bar key={idx} dataKey={item.key} fill={item.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart {...commonChartProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="name" {...axisStyles} />
              <YAxis {...axisStyles} />
              <Tooltip contentStyle={tooltipStyles} itemStyle={{ color: '#FFFFFF' }} labelStyle={{ color: '#00FFFF' }} />
              <Legend wrapperStyle={{ color: '#FFFFFF', paddingTop: '10px' }} />
              <Area type="monotone" dataKey={areaKey} stroke={color} fillOpacity={0.7} fill={color} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return <p className="text-white">Chart type not supported.</p>;
    }
  };

  // Effect to disable body scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4" // Very high z-index for the modal
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer" // Dark, blurred backdrop
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose} // Close modal when clicking backdrop
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-black/70 border border-cyan-500/30 rounded-2xl shadow-xl p-8 w-full max-w-4xl h-[80vh] flex flex-col items-center justify-center overflow-hidden" // Max width/height
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors z-10 p-2 rounded-full bg-white/10"
          aria-label="Close chart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Chart Title */}
        <h3 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-sky-400">
          {chart.title}
        </h3>

        {/* Chart Container */}
        <div className="flex-grow w-full h-full"> {/* flex-grow to take available space */}
          {renderChart()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GraphModal;
