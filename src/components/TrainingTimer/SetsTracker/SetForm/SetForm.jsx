import s from "./set-form.module.scss";
import { useRef } from "react";

const SetForm = ({saveSetData, takeRest}) => {

const resistance = useRef()
const reps = useRef()

const submitData = (e) => {
  e.preventDefault()
  const data ={
    resistance: Number(resistance.current.value),
    repetitions: Number(reps.current.value)
  }
  saveSetData(data)
  takeRest()
 
}

  return (
    <form className={s.form} >
      <p className={s.text}>Enter your completed set actual data:</p>
      <div className={s.inputsContainer}>
        <div className={s.formElement}>
          <label className={s.label} htmlFor="">Resistance</label>
          <input ref={resistance} className={s.input} type="number"  />
        </div>
        <div className={s.formElement}>
          <label className={s.label} htmlFor="">Repetitions</label>
          <input ref={reps} className={s.input} type="number" />
        </div>
        <button onClick={submitData} className={s.btn} type="submit">save</button>
      </div>
    </form>
  );
};

export default SetForm;
