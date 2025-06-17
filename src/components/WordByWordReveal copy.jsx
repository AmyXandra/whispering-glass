import React, { useEffect, useRef, useState } from "react";

const WordByWordReveal = ({ text, delay = 300, onComplete }) => {
  const words = text.split(" ");
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const hasCompleted = useRef(false);

  useEffect(() => {
    setVisibleWordCount(0);
    hasCompleted.current = false;

    const interval = setInterval(() => {
      setVisibleWordCount((prevCount) => {
        const nextCount = prevCount + 1;

        if (nextCount >= words.length) {
          clearInterval(interval);
          if (!hasCompleted.current && onComplete) {
            hasCompleted.current = true;
            onComplete();
          }
        }

        return nextCount;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay, onComplete]);

  return (
    <p className="text-lg font-medium text-white leading-relaxed">
      {words.slice(0, visibleWordCount).join(" ")}
    </p>
  );
};

export default WordByWordReveal;
