import React, { useEffect, useRef, useState } from "react";

const WordByWordReveal = ({ text, delay = 300, onComplete }) => {
  const words = text.split(" ");
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const intervalRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    setVisibleWordCount(0);
    completedRef.current = false;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setVisibleWordCount((prevCount) => {
        const nextCount = prevCount + 1;

        if (nextCount >= words.length) {
          clearInterval(intervalRef.current);

          // Use timeout to defer onComplete until after render
          if (!completedRef.current && onComplete) {
            completedRef.current = true;
            onComplete();
            // setTimeout(onComplete, delay); // Delay to avoid React warning
          }
        }

        return nextCount;
      });
    }, delay);

    return () => {
      clearInterval(intervalRef.current);
    }; 
    // eslint-disable-next-line
  }, [text, delay, onComplete]);

  return (
    <p className="font-medium text-white leading-relaxed">
      {words.slice(0, visibleWordCount).join(" ")}
    </p>
  );
};

export default WordByWordReveal;
