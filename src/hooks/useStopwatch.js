import { useReducer, useEffect, useCallback } from 'react';

const initialState = {
  time: 0,
  stopTime: 0,
  isRunning: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'RESET':
      return { time: 0, isRunning: false, stopTime: 0 };
    case 'STOP':
      return { time: 0, isRunning: false, stopTime: state.time };
    case 'TICK':
      return { ...state, time: state.time + 10 };
    default:
      return state;
  }
};

const useStopwatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let interval = null;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  const startPause = useCallback(() => {
    dispatch({ type: state.isRunning ? 'PAUSE' : 'START' });
  }, [state.isRunning]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const stop = useCallback(() => {
    dispatch({ type: 'STOP' });
  }, []);

  return {
    time: state.time,
    stopTime: state.stopTime,
    isRunning: state.isRunning,
    startPause,
    reset,
    stop,
  };
};

export default useStopwatch;
