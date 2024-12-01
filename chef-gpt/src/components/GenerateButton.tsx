import React, { useEffect, useState } from "react";
import "../css/generatebtn.css";

interface GenerateButtonProps {
  isLoading: boolean;
  generate: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  isLoading,
  generate,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsCompleted(true);
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    } else {
      setIsCompleted(false);
      setIsHidden(false);
    }
  }, [isLoading]);

  return (
    <div className="generate-button">
      {isLoading && !isCompleted ? (
        <div className={`LoadingBar ${isHidden ? "hidden" : ""}`}>
          <div className={`bar ${isCompleted ? "complete" : ""}`}></div>
        </div>
      ) : (
        <button onClick={generate}>Generate Your Recipe✨</button>
      )}
    </div>
  );
};

export default GenerateButton;
