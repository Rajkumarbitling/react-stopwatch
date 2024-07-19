import React, { useMemo } from 'react';
import './App.css';
import useStopwatch from './hooks/useStopwatch';
import { useCallback } from 'react';

const App = () => {
  const { time, stopTime, isRunning, startPause, reset, stop } = useStopwatch();

  const formatTime = useCallback((time) => {
    const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const milliseconds = ("0" + ((time / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  })

  const formattedTime = useMemo(() => {
    return formatTime(time)
  }, [time]);


  return (
    <div className="App">
      <div className="stopwatch">
        <h1>Stopwatch</h1>
        <div className="time-display">{formattedTime}</div>
        <div className="buttons">
          <button onClick={startPause}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={stop}>Stop</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
        {stopTime !== 0 && <div className='stop-display'>
          <p>Stopped at</p>
          {formatTime(stopTime)}
        </div>}
    </div>
  );
};

export default App;
