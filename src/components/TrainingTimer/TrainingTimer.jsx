import s from "./training-timer.module.scss";

import { useEffect, useState } from "react";
import { exercises } from "../../DB/exercises";
import Exercises from "./Exercises/Exercises";
import SetsTracker from "./SetsTracker/SetsTracker";

const TrainingTimer = () => {
  const [currBlock, setCurrBlock] = useState("exercises");
  const [exStatus, setExStatus] = useState({});
  const [choosen, setChoosen] = useState({});
  const [trainingCompleted, setTrainingCompleted] = useState(false);
  const [finalData, setFinalData] = useState({
    name: "Training",
    exercises: [],
  });

  useEffect(() => {
    if (!Object.keys(exStatus).length) {
      const statusInfo = exercises.reduce((data, el) => {
        return Object.assign(data, { [el.exercise]: "pending" });
      }, {});
      setExStatus(statusInfo);
    }
  }, []);

  useEffect(() => {
    const status = Object.values(exStatus);
    if (status.length) {
      if (status.every((exercise) => exercise === "completed")) {
        setTrainingCompleted(true);
      }
    }
  }, [exStatus]);

  const setCompletedStatus = (exercise) => {
    setExStatus((prevState) => {
      return {
        ...prevState,
        [exercise]: "completed",
      };
    });
  };

  const saveExerciseData = (data) => {
    setFinalData((prevState) => {
      return {
        ...prevState,
        exercises: [...prevState.exercises, data],
      };
    });
  };

  const moveToExercises = () => {
    setCurrBlock("exercises");
  };

  const sendFinalData = () => {
    console.log('sending')
  };

  return (
    <div className={s.timer}>
      {currBlock === "exercises" && (
        <Exercises
          exStatus={exStatus}
          setCurrBlock={setCurrBlock}
          exercises={exercises}
          setChoosen={setChoosen}
        />
      )}
      {currBlock === "sets-tracker" && (
        <SetsTracker
          currExercise={choosen}
          setCurrBlock={setCurrBlock}
          setCompletedStatus={setCompletedStatus}
          moveToExercises={moveToExercises}
          saveExerciseData={saveExerciseData}
        />
      )}
      {trainingCompleted && (
        <div className={s.btnContainer}>
          <button onClick={sendFinalData} className={s.btn}>Finish training</button>
        </div>
      )}
    </div>
  );
};

export default TrainingTimer;
