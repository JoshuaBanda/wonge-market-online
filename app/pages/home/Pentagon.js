import React, { useState, useEffect } from "react";

const Pentagon = () => {
    const centerX = 100;
    const centerY = 100;
    const radius = 50;

    const [rotation, setRotation] = useState(0);
    const [colorIndex, setColorIndex] = useState(0);

    // Define an array of 5 RGBA colors
    const colors = [
        "rgba(255, 99, 132, 0.5)", // Color 1
        "rgba(54, 162, 235, 0.5)", // Color 2
        "rgba(255, 159, 64, 0.5)", // Color 3
        "rgba(75, 192, 192, 0.5)", // Color 4
        "rgba(153, 102, 255, 0.5)", // Color 5
    ];

    // Rotate and change color every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation((prevRotation) => prevRotation - 72); // Rotate by 72 degrees
            setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Cycle through colors
        }, 6000); // Update rotation and color every 6 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const points = Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72) * (Math.PI / 180); 
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return { x, y };
    });

    // Apply the rotation to the polygon via CSS transform
    const rotationStyle = {
        transform: `rotate(${rotation}deg)`,
        transformOrigin: `${centerX}px ${centerY}px`, // Make sure it rotates around the center of the pentagon
        transition: 'transform 2s ease-in-out' // Smooth transition for rotation
    };

    return (
        <svg width="200" height="200">
            <polygon
                points={points.map((point) => `${point.x},${point.y}`).join(' ')}
                fill='rgba(0,0,0,0)'
                stroke={colors[colorIndex]}
                strokeWidth="80"  // Increased stroke width to make rounding more pronounced
                strokeLinejoin="round" // Ensure rounded corners where lines meet
                style={rotationStyle} // Apply the rotation style
            />
        </svg>
    );
};

export default Pentagon;
