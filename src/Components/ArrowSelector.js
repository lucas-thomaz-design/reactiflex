// src/components/ArrowSelector.js
import React from 'react';
import ArrowSVG from './ArrowSVG';
import './ArrowSelector.css';

const ArrowSelector = ({ directions, selectedArrows, setSelectedArrows }) => {
  const handleArrowSelection = (arrow) => {
    setSelectedArrows((prev) =>
      prev.includes(arrow) ? prev.filter((a) => a !== arrow) : [...prev, arrow]
    );
  };

  return (
    <div className="arrow-selector">
      {directions.map((arrow) => (
        <div
          key={arrow}
          className={`arrow-box ${selectedArrows.includes(arrow) ? 'selected' : ''}`}
          onClick={() => handleArrowSelection(arrow)}
        >
          <ArrowSVG direction={arrow} />
        </div>
      ))}
    </div>
  );
};

export default ArrowSelector;
