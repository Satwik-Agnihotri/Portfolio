import React, { useEffect } from 'react';

const TopAlert = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto close after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-[rgba(183,224,183,0.9)] border-[rgba(160,204,160,0.7)] text-[#1d3b1d]'
      : 'bg-[rgba(248,215,218,0.9)] border-[rgba(245,198,203,0.7)] text-[#491217]';

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-[90%] px-6 py-3 rounded-xl shadow-md border ${bgColor} transition-opacity duration-500 animate-fadeIn`}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

export default TopAlert;
