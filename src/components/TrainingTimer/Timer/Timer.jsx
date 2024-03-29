import s from "./timer.module.scss";
import { useEffect, useState } from "react";

const Timer = ({
  time,
  countDown,
  showForm,
  saveSetData,
  completeRest,
}) => {
  const [counter, setCounter] = useState({
    time: 0,
    countDown: false,
    timerId: null,
    curButton: "start",
    countingInProgress: false
  });

  const startCount = () => {
      const timerId = setInterval(() => {
        setCounter((prevState) => {
          return {
            ...prevState,
            time: countDown ? prevState.time - 1 : prevState.time + 1,
          };
        });
      }, 1000);
      setCounter((prevState) => {
        return {
          ...prevState,
          timerId,
          countingInProgress:true,
          curButton: countDown ? "none" : "finish",
        };
      });
  };

useEffect(()=> {
if(counter.countDown && !counter.countingInProgress) {
  setCounter((prevState) => {
    return {
      ...prevState,
      curButton: 'start rest'
    };
  });
}
}, [counter.countDown, counter.countingInProgress])

  useEffect(() => {
    setCounter((prevState) => {
      return { ...prevState, time, countDown };
    });
  }, [time, countDown]);

  useEffect(() => {
    if (counter.time === 0 && counter.countDown === true) {
      clearInterval(counter.timerId);
      completeRest();
    }
  }, [counter.time, completeRest, counter.countDown, counter.timerId]);

  const stopCount = () => {
    clearInterval(counter.timerId);
    setCounter((prevState) => {
      return {
        ...prevState,
        curButton: "restart",
      };
    });
    showForm();
    saveSetData({ duration: counter.time });
  };

  const restartCount = () => {
    setCounter((prevState) => {
      return {
        ...prevState,
        time: 0,
        curButton: "finish",
      };
    });
    startCount();
    showForm();
  };

  const formattedCounter = `${counter.time / 60 < 10 ? "0" : ""}${Math.floor(
    counter.time / 60
  )}:${counter.time % 60 < 10 ? "0" : ""}${counter.time % 60}`;

  return (
    <div className={s.timer}>
      <p className={s.clock}>{formattedCounter}</p>

      {counter.curButton === "finish" && (
        <button className={s.btn} onClick={stopCount}>
          finish
        </button>
      )}
      {["start", "start rest"].includes(counter.curButton) && (
        <button className={s.btn} onClick={startCount}>
          {counter.curButton}
        </button>
      )}
      {counter.curButton === "restart" && (
        <button className={s.btn} onClick={restartCount}>
          restart
        </button>
      )}
      {counter.curButton === "none" && (
        <p className={s.text}>
          {counter.time ? "Rest in progress" : "Rest finished"}
        </p>
      )}
    </div>
  );
};

export default Timer;
