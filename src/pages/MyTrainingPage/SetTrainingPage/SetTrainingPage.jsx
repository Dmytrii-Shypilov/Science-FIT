import s from "./set-training.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../../../components/ExerciseForm";
import TrainingDay from "../../../components/TrainingDay";
import { AlertModal } from "../../../components/AlertModal/AlertModal";

const SetTrainingPage = () => {
  const [day, setDay] = useState({
    name: "",
    exercises: [],
  });

  const [alert, setAlert] = useState({
    isAlert: false,
    type: "",
    message: "",
    callback: null,
  });

  const [formReset, setFormReset] = useState({ resetForm: false, resetNotes: false });

  useEffect(() => {
    const trainingCache = JSON.parse(localStorage.getItem("trainingState"));
    if (trainingCache && trainingCache.day.name) {
      setDay(trainingCache.day);
    }
  }, []);

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("trainingState"));
    localStorage.setItem("trainingState", JSON.stringify({...prevState, day}));
  }, [day]);

  

  const addExercise = (exercise) => {
    setDay((prevState) => {
      return {
        ...prevState,
        exercises: [...prevState.exercises, exercise],
      };
    });
  };



  const resetTraining = () => {
    setDay({
      name: "",
      exercises: [],
    });
    setFormReset({
      resetForm: !formReset.resetForm,
      resetNotes: true
    });
    
  };

  const setDayName = (name) => {
    setDay((prevState) => {
      return {
        ...prevState,
        name,
      };
    });
  };




  return (
    <div className={s.wrapper}>
      <div>
        <ExerciseForm
          addExercise={addExercise}
          getName={setDayName}
          resetForm={formReset.resetForm}
          setFormReset={setFormReset}
          setAlert={setAlert}
          resetTraining={resetTraining}
        />
      </div>
      <div>
        <TrainingDay
          trainingDay={day}
          resetTraining={resetTraining}
          setDay={setDay}
          resetNotes={formReset.resetNotes}
        />
      </div>
      {alert.isAlert && (
        <AlertModal
          alert={alert}
          setAlert={setAlert}
          callback={alert.callback}
        />
      )}
    </div>
  );
};

export default SetTrainingPage;
