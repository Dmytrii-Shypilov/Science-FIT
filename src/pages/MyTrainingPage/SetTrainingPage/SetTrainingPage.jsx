import s from './set-training.module.scss';
import { useState } from 'react';
import ExerciseForm from '../../../components/ExerciseForm';
import TrainingDay from '../../../components/TrainingDay';
import { AlertModal } from '../../../components/AlertModal/AlertModal';

const SetTrainingPage = () => {
  const [day, setDay] = useState({
    name: '',
    exercises: [],
  });

  const [alert, setAlert] = useState({
    isAlert: false,
    type: '',
    message: ''
  })


  const [formReset, setFormReset] = useState({ resetForm: false });

  const addExercise = exercise => {
    setDay(prevState => {
      return {
        ...prevState,
        exercises: [...prevState.exercises, exercise],
      };
    });
  };

  const resetTraining = () => {
    setDay({
      name: '',
      exercises: [],
    });
    setFormReset({
      resetForm: !formReset.resetForm,
    });
  };
  const setDayName = name => {
    setDay(prevState => {
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
          formReset={formReset}
          setFormReset={setFormReset}
          setAlert={setAlert}
        />
      </div>
      <div>
        <TrainingDay trainingDay={day} resetTraining={resetTraining} setDay={setDay} />
      </div>
     {alert.isAlert && <AlertModal alert={alert} setAlert={setAlert}/>}
    </div>
  );
};

export default SetTrainingPage;
