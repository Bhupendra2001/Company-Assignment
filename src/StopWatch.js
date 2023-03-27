import React, { useState, useRef } from 'react';

function Stopwatch() {
    
  const [isRunning, setIsRunning] = useState(false);
  const [Time, setTime] = useState(0);
  const intervalRef = useRef(null);

  function handleStart() {

    if (!isRunning) {
      const startTime = Date.now() - Time;
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const updatedTime = now - startTime;
        setTime(updatedTime);
      }, 10);
      setIsRunning(true);
    }
  }

  function handleStop() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function handleReset() {

    clearInterval(intervalRef.current);
    setIsRunning(false);

    setTime(0);
  }

  const minutes = Math.floor(Time / 60000);

  const seconds = Math.floor((Time % 60000) / 1000);

  const milliseconds = Time % 1000;

  return (
    <div>

      <h1>{`${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`}
        </h1>

      <button onClick={handleStart}>Start</button>

      <button onClick={handleStop}>Stop</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
