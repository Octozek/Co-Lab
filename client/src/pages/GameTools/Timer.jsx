import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownOn, setCountdownOn] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to handle input value

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    let interval = null;

    if (countdownOn) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 10 : 0));
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (countdownTime === 0) {
      clearInterval(interval);
      setCountdownOn(false);
    }

    return () => clearInterval(interval);
  }, [countdownOn, countdownTime]);

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
      3,
      "0"
    )}`;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setCountdownTime(inputValue * 60 * 1000); // Convert to milliseconds
      setInputValue(""); // Clear the input field
    }
  };

  return (
    <div>
      <style>
        {`
          .pulsing {
            animation: pulse 1s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>

      <div>
        <h2>Stopwatch</h2>
        <h2> {formatTime(time)}</h2>
        <button onClick={() => setTimerOn(true)}>Start</button>
        <button onClick={() => setTimerOn(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>

      <div>
        <h2>Countdown</h2>
        <h2 className={countdownOn ? "pulsing" : ""}>
          {formatTime(countdownTime)}
        </h2>
        <input
          type="number"
          placeholder="Enter time in minutes"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={countdownOn}
        />
        <button onClick={() => setCountdownOn(true)}>Start Countdown</button>
        <button onClick={() => setCountdownOn(false)}>Stop Countdown</button>
        <button onClick={() => setCountdownTime(0)}>Reset Countdown</button>
      </div>
    </div>
  );
}
