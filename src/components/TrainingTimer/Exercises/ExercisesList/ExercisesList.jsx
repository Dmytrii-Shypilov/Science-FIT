import s from "./exercises-list.module.scss";

const ExercisesList = ({ exercises, setCurrBlock, setChoosen, exStatus }) => {
  const chooseExercise = (e) => {
    const selected = exercises.find((el) => el.exercise === e.currentTarget.id);
    setChoosen(selected);
    setCurrBlock("sets-tracker");
  };

  return (
    <ul>
      {exercises.map((ex) => {
        return (
          <li key={ex.exercise} className={s.exerciseBlock}>
            <div className={s.head}>
              <h4>{ex.exercise}</h4>
              {exStatus[ex.exercise] === "pending" ? (
                <button
                  id={ex.exercise}
                  className={s.btn}
                  onClick={chooseExercise}
                >
                  Start
                </button>
              ) : (
                <span className={s.status}>Completed</span>
              )}
            </div>
            <div className={s.slider}>
              <p>Resistance: {ex.resistance}</p>
              <p>Sets: {ex.sets}</p>
              <p>Reps: {ex.repetitions}</p>
              <p>Rest: {ex.restInterval}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ExercisesList;
