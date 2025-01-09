import { useState, useEffect } from "react";
import "./loader.css"; // Import CSS file for styling

interface Props {
  percentage: number;
}

const CircleLoader = ({ percentage }: Props) => {
  // State for the current percentage value
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update the progress state based on the percentage prop
    setProgress(percentage);
  }, [percentage]);

  return (
    <div className="circle-loader-container">
      <svg className="circle-loader" viewBox="0 0 100 100">
        <circle className="circle-loader-background" cx="50" cy="50" r="45" />
        <circle
          className="circle-loader-progress"
          cx="50"
          cy="50"
          r="45"
          style={{ strokeDasharray: `${progress}, 100` }}
        />
        <text
          className="circle-loader-text"
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircleLoader;
