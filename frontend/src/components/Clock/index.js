import Countdown from 'react-countdown-now';
import { useSelector } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default function Clock(props) {
    const history = useHistory()
    const style = {"fontSize": 70, "fontFamily": "Iceberg", "paddingRight": "10px"}
    const [time, setTime ] = useState(useSelector(state => state.time)) 

    const check_time = (time) => {
        if (time <= Date.now()) {
            history.push('/gameover')
        }
    }
    useInterval(() => {
        check_time(time)
      }, 1000);

    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>TIME OVER!</span>
    } else {
        if (seconds >= 10) {
            return (
                <>
                    <span style={style}>{minutes}:{seconds}</span>
                </>
            )
        } else {
            return (
                <>
                    <span style={style}>{minutes}:0{seconds}</span>
                </>
            )
        }
       
    }
    }

    return (
        <>
        <Countdown
        date={time}
        renderer={renderer}
        />
        </>
    )
}