import s from './trainings-list.module.scss';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import  {deleteTraining}  from '../../../redux/trainings/trainings-operations.js';
import {
  addScheduleItem,
  deleteMultipleScheduleItems,
} from '../../../redux/schedule/schedule-operations.js';
import { getTimeArray } from '../../services/calendarHelpers.js';
import { NavLink } from 'react-router-dom';

const TrainingList = ({
  goBack,
  openDescription,
  trainings,
  dayData,
  setAlert,
  schedule,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const { fullDate } = dayData;

  const onChange = e => {
    const item = {time: e.target.value, name: e.target.id}
    setSelected(prevState => { 
     return [...prevState.filter(el=> el.name !== e.target.id), item]
    });
  };

  const addTrainingItem = e => {
   const choosen = selected.find(el => el.name === e.target.id)
   
    if (!choosen) {
      setAlert({
        isAlert: true,
        type: 'alert',
        message: 'Choose your time, please',
      });
      return;
    }

    const {name, time } = choosen

    if (schedule.length > 0) {
      const trainingslist = schedule.filter(el => el.date === fullDate);
      const sameTraining = trainingslist?.find(el => el.name === name);
      const sameTime = trainingslist?.find(el => el.time === time);

      if (sameTraining) {
        setAlert({
          isAlert: true,
          type: 'alert',
          message: 'This training has already been added before',
        });
        return;
      }

      if (sameTime) {
        setAlert({
          isAlert: true,
          type: 'alert',
          message: 'This time is already taken',
        });
        return;
      }
    }
    if (e.target.id !== name) {
      return;
    }
    const training = {
      date: fullDate,
      name,
      time,
    };
    dispatch(addScheduleItem(training));
    goBack();
  };

  const removeTraining = e => {
    const [id, name] = e.target.id.split('/');
    const removeTraining = () => deleteTraining(id);
    const updateSchedule = () => deleteMultipleScheduleItems(name);

    setAlert({
      isAlert: true,
      type: 'approval',
      message:
        'Are you sure to delete this training? All related records in your schedule will be also removed!',
      callback: [removeTraining, updateSchedule],
    });
  };
  const timeArray = getTimeArray();
  return (
    <section>
      <div className={s.listBlock}>
        {!trainings.length && (
          <div className={s.message}>
            <div>
              <p className={s.text}>There is no training created yet</p>
              <p className={s.text}>
                You can create your training{' '}
                <NavLink to="/my-training" className={s.link}>
                  here
                </NavLink>
              </p>
            </div>
          </div>
        )}
        {trainings.length > 0 && (
          <ul className={s.list}>
            {trainings.map(el => {
              return (
                <li className={s.listItem}>
                  <span
                    id={el.name}
                    className={s.training}
                    onClick={openDescription}
                  >
                    {el.name}
                  </span>
                  <div className={s.panel}>
                    <select
                      className={s.time}
                      onChange={onChange}
                      name="time"
                      id={el.name}
                      
                    >
                      <option value="--:--">--:--</option>
                      {timeArray.map(el => (
                        <option value={el}>{el}</option>
                      ))}
                    </select>
                    <div className={s.btnWrapper}>
                      <span
                        onClick={addTrainingItem}
                        id={el.name}
                        className={s.addBtn}
                        value='sssss'
                      >
                        Add
                      </span>
                      <span
                        onClick={removeTraining}
                        id={`${el._id}/${el.name}`}
                        className={s.deleteBtn}
                      >
                        D
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={s.btnContainer}>
        <button onClick={goBack} className={s.btn} type="button">
          Back
        </button>
      </div>
    </section>
  );
};

export default TrainingList;
