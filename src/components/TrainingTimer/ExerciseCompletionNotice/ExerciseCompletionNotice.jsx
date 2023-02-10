import s from "./exercise-completion.module.scss";

const ExerciseCompletionNotice = ({
  exerciseData,
  exerciseName,
  setCompletedStatus,
  resetExerciseData,
  moveToExercises,
  saveExercise
}) => {
 
const completeExercise = () => {
  setCompletedStatus(exerciseName)
  saveExercise()
  resetExerciseData()
  moveToExercises()
}

  const stattistics = Object.entries(exerciseData)
    .map((el, idx) => {
      return (
        <p key={idx}>
          <span className={s.text}>{idx + 1}:</span>
          <span className={s.text}>{el[1].resistance} kg</span>
          <span className={s.text}>{el[1].repetitions} reps</span>
        </p>
      );
    })
    
   

  return (
    <div>
      <h4 className={s.title}>Good job!</h4>
      <p className={s.message}>{exerciseName} exercise is completed</p>
      <div className={s.statistics}>
        <h5 className={s.heading}>Statistics:</h5>
        {stattistics}
      </div>

      <div className={s.btnContainer}>
        <button onClick={completeExercise} className={s.btn}>Ok</button>
      </div>
    </div>
  );
};

export default ExerciseCompletionNotice;
