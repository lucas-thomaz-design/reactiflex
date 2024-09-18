// src/components/ArrowSVG.js
import React from 'react';

const ArrowSVG = ({ direction }) => {
  const getRotation = (direction) => {
    switch (direction) {
      case '↑':
        return 0;
      case '→':
        return 90;
      case '↓':
        return 180;
      case '←':
        return 270;
      default:
        return 0;
    }
  };

  const rotation = getRotation(direction);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="48"
      height="48"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "fill 0.2s ease-in-out, transform 0.2s ease",
      }}
      className="arrow-svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l-10 10h6v10h8v-10h6l-10-10z" />
    </svg>
  );
};

export default ArrowSVG;
