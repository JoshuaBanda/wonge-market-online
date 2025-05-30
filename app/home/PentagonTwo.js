"use client";
import React, { useState, useEffect } from "react";

const PentagonTwo = () => {
  const centerX = 100;
  const centerY = 100;
  const radius = 50;

  const [rotation, setRotation] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  const colors = ["white", "white", "white", "white", "white"];

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation - 72);
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  const rotationStyle = {
    transform: `rotate(${rotation}deg)`,
    transformOrigin: `${centerX}px ${centerY}px`,
    transition: 'transform 2s ease-in-out'
  };

  if (!hasMounted) return null;

  return (
    <svg width="200" height="200">
      {/* 🔽 Define blur filter */}
      <defs><filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="glow"/>
  <feMerge>
    <feMergeNode in="glow" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>

      </defs>

      <polygon
        points={points.map((point) => `${point.x},${point.y}`).join(' ')}
        fill="rgba(0,0,0,0)"
        stroke={colors[colorIndex]}
        strokeWidth="80"
        strokeLinejoin="round"
        style={rotationStyle}
       filter="url(#glow-filter)"
      />
    </svg>
  );
};

export default PentagonTwo;
