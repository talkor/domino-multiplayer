import React from 'react';
import './Timer.css';

const Timer = props => {
  const minutes = parseInt(props.elapsedSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (props.elapsedSeconds % 60).toString().padStart(2, '0');

  return (
    <div className="timer">
      Time: <span className="timer-minutes">{minutes}</span>:
      <span className="timer-seconds">{seconds}</span>
    </div>
  );
};

export default Timer;
