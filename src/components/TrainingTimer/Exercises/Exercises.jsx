import s from "./exercises.module.scss";

import ExercisesList from './ExercisesList'

const Exercises = ({exercises, setCurrBlock, setChoosen, exStatus, trainingName}) => {
  return (
    <div>
      <h2 className={s.title}>{trainingName}</h2>

      <ExercisesList
        exStatus={exStatus}
        setCurrBlock={setCurrBlock}
        exercises={exercises}
        setChoosen={setChoosen}
      />
    </div>
  );
};

export default Exercises