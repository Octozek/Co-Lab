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

    if (countdownOn && countdownTime === 0) {
      // Convert inputValue to a number and set it as countdownTime when countdown starts
      setCountdownTime(parseInt(inputValue) * 1000); // Assuming inputValue is in seconds
    }

    if (countdownOn) {
      interval = setInterval(() => {
        setCountdownTime((prevTime) => (prevTime > 0 ? prevTime - 10 : 0));
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdownOn, inputValue]); // Listen for changes in countdownOn and inputValue

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
    <div className="container">
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

          .container {
            display: flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }

          .stopwatch, .countdown {
            display: inline-block;
            margin: 10px;
            padding: 10px;
          }
          
          .countdown-input {
            padding: 5px;
            margin: 10px;
            width: 200px;
          }
          button {
            padding: 10px 20px;
            margin: 10px;
            border: #fecfe6 2px solid;
          }
          .start {
            background-color: #d2f189;
            color: #1e1b14;
          }
          .stop {
            background-color: #ed9569;
            color: #1e1b14;
          }
          .reset {
            background-color: transparent;
            color: #85c7e4;
          }
        `}
      </style>

      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <h2> {formatTime(time)}</h2>
        <div>
        <button className="start" onClick={() => setTimerOn(true)}>Start</button>
        <button className="stop" onClick={() => setTimerOn(false)}>Stop</button>
        <button className="reset" onClick={() => setTime(0)}>Reset</button>
        </div>
      </div>

      <div className="countdown">
        <h2>Countdown</h2>
        <h2 className={countdownOn ? "pulsing" : ""}>
          {formatTime(countdownTime)}
        </h2>
        <div>
        <input
          className="countdown-input"
          type="number"
          placeholder="Enter time in minutes"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={countdownOn}
        />
        </div>
        <div>
        <button className="start" onClick={() => setCountdownOn(true)}>Start</button>
        <button className="stop" onClick={() => setCountdownOn(false)}>Stop</button>
        <button className="reset" onClick={() => setCountdownTime(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
}
