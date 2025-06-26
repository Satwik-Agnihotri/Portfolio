import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// Import Recharts components for rendering mini-graphs
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, ResponsiveContainer
} from 'recharts';

import GraphModal from './GraphModal'; // Corrected import path for GraphModal

// --- IMPORTANT: Ensure these are defined at the top level of the file ---
// Dummy data for different chart types
const chartDataSets = {
  lineGraph: [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 }, { name: 'Aug', value: 3000 }, { name: 'Sep', value: 2500 },
    { name: 'Oct', value: 4200 }, { name: 'Nov', value: 3800 }, { name: 'Dec', value: 4500 }
  ],
  barGraph: [
    { name: 'Prod A', sales: 2400, profit: 1000 }, { name: 'Prod B', sales: 1398, profit: 800 },
    { name: 'Prod C', sales: 9800, profit: 4000 }, { name: 'Prod D', sales: 3908, profit: 2000 },
    { name: 'Prod E', sales: 4800, profit: 2500 }, { name: 'Prod F', sales: 3800, profit: 1800 },
  ],
  areaGraph: [
    { name: 'Q1', users: 590, sessions: 800 }, { name: 'Q2', users: 868, sessions: 967 },
    { name: 'Q3', users: 1397, sessions: 1098 }, { name: 'Q4', users: 1480, sessions: 1200 },
    { name: 'Q5', users: 1520, sessions: 1108 }, { name: 'Q6', users: 1400, sessions: 680 },
  ],
};

const keywords = [
  { label: 'Graph', tag: 'graph' },
  { label: 'Stats', tag: 'stats' },
  { label: 'Chart', tag: 'chart' },
];

const componentsData = [
  // --- Positions are now primarily for MD and up (absolute positioning) ---
  // On mobile, they will be arranged in a grid automatically.
  // The 'top' and 'left' properties within 'position' are specifically for MD+ absolute positioning.

  // Graph components (4 total)
  { id: 1, tag: 'graph', position: { mdTop: '20%', mdLeft: '8%' }, title: 'Monthly Revenue', chartType: 'line', chartProps: { data: chartDataSets.lineGraph, dataKey: 'value', color: '#8884d8' } },
  { id: 4, tag: 'graph', position: { mdTop: '75%', mdLeft: '70%' }, title: 'Product Sales', chartType: 'bar', chartProps: { data: chartDataSets.barGraph, barKeys: [{ key: 'sales', color: '#82ca9d' }, { key: 'profit', color: '#8884d8' }] } },
  { id: 6, tag: 'graph', position: { mdTop: '40%', mdLeft: '25%' }, title: 'Q1-Q3 Growth', chartType: 'line', chartProps: { data: chartDataSets.lineGraph.slice(0, 7), dataKey: 'value', color: '#FF8042' } },
  { id: 7, tag: 'graph', position: { mdTop: '88%', mdLeft: '10%' }, title: 'User Trend', chartType: 'area', chartProps: { data: chartDataSets.areaGraph.slice(3, 6), areaKey: 'users', color: '#FFBB28' } },

  // Chart components (3 total)
  { id: 2, tag: 'chart', position: { mdTop: '30%', mdLeft: '75%' }, title: 'Quarterly Users', chartType: 'area', chartProps: { data: chartDataSets.areaGraph, areaKey: 'users', color: '#8884d8' } },
  { id: 8, tag: 'chart', position: { mdTop: '55%', mdLeft: '85%' }, title: 'Last Q Sales', chartType: 'bar', chartProps: { data: chartDataSets.barGraph.slice(3), barKeys: [{ key: 'sales', color: '#00C49F' }] } },
  { id: 9, tag: 'chart', position: { mdTop: '65%', mdLeft: '40%' }, title: 'Half-Yearly', chartType: 'line', chartProps: { data: chartDataSets.lineGraph.slice(6), dataKey: 'value', color: '#FF8042' } },

  // Stats components (3 total)
  { id: 3, tag: 'stats', position: { mdTop: '60%', mdLeft: '18%' }, title: 'Initial Profit', chartType: 'bar', chartProps: { data: chartDataSets.barGraph.slice(0, 3), barKeys: [{ key: 'profit', color: '#0088FE' }] } },
  { id: 5, tag: 'stats', position: { mdTop: '30%', mdLeft: '45%' }, title: 'Session Growth', chartType: 'area', chartProps: { data: chartDataSets.areaGraph.slice(0, 4), areaKey: 'sessions', color: '#82ca9d' } },
  { id: 10, tag: 'stats', position: { mdTop: '48%', mdLeft: '60%' }, title: 'Mid-Year Fluctuation', chartType: 'line', chartProps: { data: chartDataSets.lineGraph.slice(4, 9), dataKey: 'value', color: '#A020F0' } },
];
// --- END IMPORTANT ---


const HeroSection = () => {
  const [activeTag, setActiveTag] = useState(null);
  const [modalChart, setModalChart] = useState(null); // State to hold the chart data for the modal

  const handleKeywordClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const openChartModal = (chart) => {
    setModalChart(chart);
  };

  const closeChartModal = () => {
    setModalChart(null);
  };

  // Helper function to render a miniaturized chart
  const renderMiniChart = (chart) => {
    const { chartType, chartProps } = chart;
    const { data, dataKey, barKeys, areaKey, color } = chartProps;

    const commonMiniChartProps = {
      data,
      margin: { top: 5, right: 5, left: 5, bottom: 5 }, // Minimal margins
    };

    const hiddenAxis = { axisLine: false, tickLine: false, tick: false, allowDataOverflow: true };

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart {...commonMiniChartProps}>
              <XAxis dataKey="name" hide={true} {...hiddenAxis} />
              <YAxis hide={true} {...hiddenAxis} />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart {...commonMiniChartProps}>
              <XAxis dataKey="name" hide={true} {...hiddenAxis} />
              <YAxis hide={true} {...hiddenAxis} />
              {barKeys.map((item, idx) => (
                <Bar key={idx} dataKey={item.key} fill={item.color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart {...commonMiniChartProps}>
              <XAxis dataKey="name" hide={true} {...hiddenAxis} />
              <YAxis hide={true} {...hiddenAxis} />
              <Area type="monotone" dataKey={areaKey} stroke={color} fillOpacity={0.7} fill={color} strokeWidth={1} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return <p className="text-white/50 text-xs">No mini-chart preview</p>;
    }
  };


  return (
    <section
      id="hero"
      // Increased padding-top for better initial clearance on all screen sizes
      className="relative w-full min-h-screen pt-[160px] sm:pt-[180px] md:pt-[220px] overflow-hidden" // Further increased pt values
    >
      {/* Main content wrapper - controls layout for text/buttons and charts */}
      <div className="flex flex-col items-center justify-start h-full md:h-auto md:block"> {/* Flex for mobile, block for md+ */}

        {/* Header Text & Keywords */}
        <div className="z-40 text-center mb-8 px-4 flex-shrink-0 w-full max-w-full
                        md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:mb-0"> {/* Increased z-index, added responsive absolute positioning and removed mobile margin-bottom */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-sky-400">
            Welcome to UpVision
          </h1>
          <p className="text-base sm:text-xl text-white/80 font-light mb-6">
            Visualize intelligence through dynamic data storytelling.
          </p>

          <div className="flex justify-center gap-4 flex-wrap px-4"> {/* Added horizontal padding for buttons */}
            {keywords.map(({ label, tag }) => (
              <button
                key={tag}
                onClick={() => handleKeywordClick(tag)}
                className={twMerge(
                  'text-sm px-4 py-2 rounded-full border border-cyan-400 text-white hover:bg-cyan-600 transition-all',
                  activeTag === tag && 'bg-cyan-500'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Scattered Components (Mini-Graphs) - Now uses grid for mobile, absolute for md+ */}
        {/* On mobile, this will be a grid. On md+, it will be absolute inset-0. */}
        <div className="relative w-full h-[500px] sm:h-[600px] mt-8 md:absolute md:inset-0 md:h-auto md:mt-0 md:top-0 md:left-0 md:w-full md:min-h-screen"> {/* Added margin-top for mobile spacing, removed for md+ */}
          <div className="grid grid-cols-2 gap-4 px-4 pb-8 justify-items-center items-center md:hidden"> {/* Mobile grid layout */}
              {componentsData.map((chart) => {
                  const isActive = activeTag === null || activeTag === chart.tag;
                  return (
                      <motion.div
                          key={chart.id}
                          initial={{ scale: 0.9, opacity: 0.3, filter: 'blur(8px)' }}
                          animate={{
                              scale: isActive ? 1 : 0.8,
                              opacity: isActive ? 1 : 0.3, // Keep some opacity when blurred in mobile grid
                              filter: isActive ? 'blur(0px)' : 'blur(8px)',
                              // No display: 'none' in mobile grid, just blur/dim
                          }}
                          transition={{ duration: 0.5 }}
                          className={twMerge(
                              "w-36 h-24 bg-white/10 border border-cyan-500/20 rounded-xl backdrop-blur-md flex flex-col items-center justify-center text-center text-sm text-white shadow-md z-20 cursor-pointer",
                              activeTag !== null && !isActive ? 'opacity-30 blur-sm' : '' // Dim and blur if not active when a filter is applied
                          )}
                          onClick={() => openChartModal(chart)}
                          // Style not needed here as it's grid-managed
                      >
                          <div className="flex-grow w-full h-full p-1 flex items-center justify-center">
                              {renderMiniChart(chart)}
                          </div>
                          <span className="font-semibold text-xs text-cyan-300 -mt-1 text-shadow-sm">
                              {chart.title}
                          </span>
                          <span className="text-[0.6rem] text-white/70 text-shadow-sm pb-1">
                              ({chart.chartType})
                          </span>
                      </motion.div>
                  );
              })}
          </div>

          {/* Absolute positioning for MD and up */}
          <div className="hidden md:block md:absolute md:inset-0 md:h-full">
            {componentsData.map((chart) => {
              const isActive = activeTag === null || activeTag === chart.tag;

              const mdTop = chart.position.mdTop;
              const mdLeft = chart.position.mdLeft;

              return (
                <motion.div
                  key={chart.id}
                  initial={{ scale: 0.9, opacity: 0.3, filter: 'blur(8px)' }}
                  animate={{
                    scale: activeTag === null ? 0.9 : (isActive ? 1 : 0.8),
                    opacity: activeTag === null ? 0.3 : (isActive ? 1 : 0),
                    filter: activeTag === null ? 'blur(8px)' : (isActive ? 'blur(0px)' : 'blur(8px)'),
                    display: isActive ? 'flex' : 'none', // Hide completely if not active and a filter is on
                  }}
                  transition={{ duration: 0.5 }}
                  className={twMerge(
                    "absolute w-40 h-28 bg-white/10 border border-cyan-500/20 rounded-xl backdrop-blur-md flex items-center justify-center text-center text-sm text-white shadow-md z-20 cursor-pointer",
                    `top-[${mdTop}] left-[${mdLeft}]` // MD positions only
                  )}
                  onClick={() => openChartModal(chart)}
                >
                  <div className="absolute inset-0 p-1 flex items-center justify-center">
                    {renderMiniChart(chart)}
                  </div>
                  <span className="absolute top-1 left-2 font-semibold text-xs text-cyan-300 z-10 text-shadow-sm">
                    {chart.title}
                  </span>
                  <span className="absolute bottom-1 right-2 text-[0.65rem] text-white/70 z-10 text-shadow-sm">
                    ({chart.chartType})
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Graph Modal */}
      <AnimatePresence>
        {modalChart && (
          <GraphModal
            chart={modalChart}
            onClose={closeChartModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
