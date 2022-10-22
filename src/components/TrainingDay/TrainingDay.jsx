import s from './training-day.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTraining } from '../../redux/trainings/trainings-operations';
import image from '../../images/dumbell.png';

const TrainingDay = ({ trainingDay, resetTraining, setDay }) => {
  const dispatch = useDispatch();
  const { name, exercises } = trainingDay;
  const [flags, setFlags] = useState({
    isNotesOpen: false,
  });
  const [note, setNote] = useState('');

  const { isNotesOpen } = flags;

  const onInput = e => {
    setNote(e.target.value);
  };

  const toggleNotes = () => {
    setFlags(prevState => {
      return {
        isNotesOpen: !isNotesOpen,
      };
    });
  };

  const createTraining = () => {
    const training = {
      ...trainingDay,
      notes: note,
    };

    dispatch(addTraining(training));
    resetTraining();
    setFlags({
      isNotesOpen: false,
    });
    setNote('');
  };

  const deleteExercise = e => {
    const newList = [...exercises];
    newList.splice(e.target.id, 1);
    setDay(prevState => {
      return {
        ...prevState,
        exercises: newList,
      };
    });
  };

  const moveLeft = e => {
    const idx = Number(e.target.id);
    const newList = [...exercises];
    const movedEl = newList[idx];
    if (idx - 1 >= 0) {
      newList[idx] = newList[idx - 1];
      newList[idx - 1] = movedEl;
      setDay(prevState => {
        return {
          ...prevState,
          exercises: newList,
        };
      });
    }
  };

  const moveRight = e => {
    const idx = Number(e.target.id);
    const newList = [...exercises];
    const movedEl = newList[idx];
    if (idx + 1 < newList.length) {
      newList[idx] = newList[idx + 1];
      newList[idx + 1] = movedEl;
      console.log(newList, 'final');
      setDay(prevState => {
        return {
          ...prevState,
          exercises: newList,
        };
      });
    }
  };

  return (
    <section className={s.section}>
      {!name && (
        <div className={s.messageContainer}>
          <p className={s.message}>There is no training data added yet</p>
          <img
            className={s.image}
            src={image}
            alt=""
            width="298"
            height="174"
          />
        </div>
      )}
      {name && (
        <div className={s.wrapper}>
          <h3 className={s.title}>{name}</h3>
          {!exercises.length && <p className={s.callAction}>Add your exercise, please</p>}
          {exercises.length > 0 && (
            <div className={s.trainingBlock}>
              <div>
                <ul className={s.exerciseList}>
                  {exercises.map((el, idx) => {
                    return (
                      <li className={s.listItem} key={idx}>
                        <div>
                          <div className={s.order}>
                            <p className={s.orderTitle}> Exercise {idx + 1}</p>
                          </div>

                          <p className={s.exerciseName}>{el.exercise}</p>
                          <p className={s.description}>
                            <span className={s.label}>Resistance:</span>
                            {el.resistance} kg ;
                          </p>
                          <p className={s.description}>
                            <span className={s.label}>Sets:</span>
                            {el.sets} ;
                          </p>
                          <p className={s.description}>
                            <span className={s.label}>Reps:</span>
                            {el.repetitions} ;
                          </p>
                          <p className={s.description}>
                            <span className={s.label}>Rest:</span>{' '}
                            {el.restInterval} secs ;
                          </p>
                        </div>

                        <div className={s.panel}>
                          <span
                            onClick={moveLeft}
                            id={idx}
                            className={s.panelBtn}
                          >
                            L
                          </span>
                          <span
                            onClick={deleteExercise}
                            id={idx}
                            className={s.panelBtn}
                          >
                            D
                          </span>
                          <span
                            onClick={moveRight}
                            id={idx}
                            className={s.panelBtn}
                          >
                            R
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <span onClick={toggleNotes} className={s.notesLabel}>
                  {isNotesOpen ? (
                    <span className={s.circle}>-</span>
                  ) : (
                    <span className={s.circle}>+</span>
                  )}
                  Add notes
                </span>
                {isNotesOpen && (
                  <div className={s.notesWrap}>
                    <textarea
                      onChange={onInput}
                      value={note}
                      type="text"
                      className={s.notes}
                      placeholder="Here you can leave your training notes..."
                    />
                  </div>
                )}
              </div>

              <div className={s.btnWrap}>
                <button
                  onClick={createTraining}
                  type="button"
                  className={s.btn}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TrainingDay;
