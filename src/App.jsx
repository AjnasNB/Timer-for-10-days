import React, { useState, useEffect } from "react";

const App = () => {
  const [timeRemaining, setTimeRemaining] = useState(
    parseInt(localStorage.getItem("timeRemaining")) || 864000
  );
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    localStorage.setItem("timeRemaining", timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        setTimerExpired(true);
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [timeRemaining]);

  const days = Math.floor(timeRemaining / 86400);
  const hours = Math.floor((timeRemaining % 86400) / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  return (
    <div className="container">
      {timerExpired ? (
        <p className="time-over">Time Over</p>
      ) : (
        <h1 className="timer">
          Time Remaining:<br />
          {days} Days : {hours} Hrs : {minutes} Mins : {seconds} Sec
        </h1>
      )}
    </div>
  );
};

export default App;
