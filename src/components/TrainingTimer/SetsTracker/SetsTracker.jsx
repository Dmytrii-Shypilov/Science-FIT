import s from "./sets-tracker.module.scss";
import { useState } from "react";
import Timer from "../Timer/Timer";
import SetForm from "./SetForm";
import RestTracker from "../RestTracker/RestTracker";
import ExerciseCompletionNotice from "../ExerciseCompletionNotice";

const SetsTracker = ({ currExercise, setCompletedStatus, moveToExercises, saveExerciseData}) => {
  const [curSet, setCurrSet] = useState({ order: 1, data: {} });
  const [viewState, setViewState] = useState({
    setTimer: true,
    form: false,
    restTimer: false,
    completion: false,
  });

  const { exercise, resistance, repetitions, sets, restInterval } =
    currExercise;
  const { order, data } = curSet;
  const { setTimer, form, restTimer, completion } = viewState;

  const showForm = () => {
    setViewState((prevState) => {
      return {
        ...prevState,
        form: !prevState.form,
      };
    });
  };

  const saveSetData = (setData) => {
    let setInfo;

    if (Object.keys(setData).length > 1) {
      setInfo = {
        repetitions: setData.repetitions ? setData.repetitions : repetitions,
        resistance: setData.resistance ? setData.resistance : resistance,
      };
    } else {
      setInfo = setData;
    }

    const set = `set_${order}`;
    setCurrSet((prevState) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [set]: { ...prevState.data[set], ...setInfo },
        },
      };
    });
  };

  const takeRest = () => {
    setViewState((prevState) => {
      return {
        ...prevState,
        setTimer: false,
        form: false,
        restTimer: true,
      };
    });
  };

  const completeExercise = () => {
    setViewState({
      setTimer: false,
      form: false,
      restTimer: false,
      completion: true,
    });
  };

  const startNextSet = () => {
    if (order === sets) {
      completeExercise();
      return;
    }
    setCurrSet((prevState) => {
      return {
        ...prevState,
        order: prevState.order + 1,
      };
    });
    setViewState((prevState) => {
      return {
        ...prevState,
        setTimer: true,
        form: false,
        restTimer: false,
      };
    });
  };

  const resetExerciseData = () => {
    setCurrSet({ order: 1, data: {} });
  };

  const saveExercise = () => {
    const exData = {
      exercise,
      sets: data
    }
    saveExerciseData(exData)
  }

  return (
    <div>
      {!completion && (
        <div className={s.titleBlock}>
          <h4 className={s.title}>{exercise}</h4>
          <p className={s.setInfo}>Your set №{order}</p>
        </div>
      )}
      <div>
        {setTimer && (
          <div className={s.setTimer}>
            <Timer
              saveSetData={saveSetData}
              time={0}
              countDown={false}
              showForm={showForm}
            />
          </div>
        )}
  
        {form && (
          <div className={s.setForm}>
            <SetForm saveSetData={saveSetData} takeRest={takeRest} />
          </div>
        )}
        {restTimer && (
          <div>
            <RestTracker
              restInterval={restInterval}
              startNextSet={startNextSet}
            />
          </div>
        )}
        {completion && (
          <ExerciseCompletionNotice
            exerciseData={data}
            exerciseName={exercise}
            resetExerciseData={resetExerciseData}
            setCompletedStatus={setCompletedStatus}
            moveToExercises={moveToExercises}
            saveExercise={saveExercise}
          />
        )}
      </div>
    </div>
  );
};

export default SetsTracker;
