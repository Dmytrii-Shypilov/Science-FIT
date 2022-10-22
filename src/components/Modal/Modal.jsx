import s from './modal.module.scss';
import { createPortal } from 'react-dom';
import TrainingsList from './TrainingsList';
import DescriptionBlock from './DescriptionBlock';
import { getTrainings } from '../../redux/trainings/trainings-selector';
import { getSchedule } from '../../redux/schedule/schedule-selector';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteScheduleItem } from '../../redux/schedule/schedule-operations';



const modalRoot = document.querySelector('#modalRoot');

const Modal = ({ toggleModal, dayData, setAlert }) => {
  const [page, setPage] = useState({
    currentPage: 'Schedule',
    prevPage: '',
  });
  const [clickedTraining, setClickedTraining] = useState({});

  const { currentPage, prevPage } = page;
  const { fullDate, day, month, year } = dayData;

  const trainings = useSelector(getTrainings);
  const {schedule} = useSelector(getSchedule);
  const thisDayTrainings = schedule.filter(el => el.date === fullDate).sort((a, b) =>
  Number(a.time.split(':').join('')) >
  Number(b.time.split(':').join(''))
    ? 1
    : -1); 

  const openTrainings = () => {
    setPage(prevState => {
      return { currentPage: 'Trainings', prevPage: prevState.currentPage };
    });
  };

  const openDescription = e => {
    const training = trainings.find(el => el.name === e.target.id);
    setClickedTraining(training);
    setPage(prevState => {
      return { currentPage: 'Description', prevPage: prevState.currentPage };
    });
  };

  const goBack = () => {
    if (prevPage === 'Schedule' || currentPage === 'Trainings') {
      setPage(prevState => {
        return { currentPage: 'Schedule', prevPage: prevState.currentPage };
      });
    } else if (prevPage === 'Trainings') {
      setPage(prevState => {
        return { currentPage: 'Trainings', prevPage: prevState.currentPage };
      });
    }
  };

  const cancelTraining = e => {
    const id = e.target.id;
    const cancelTraining = () => deleteScheduleItem(id);
    setAlert({
      isAlert: true,
      type: 'approval',
      message: 'Are you sure to cancel this scheduled training?',
      callback: [cancelTraining],
    });
  };

  return createPortal(
    <div className={s.backdrop}>
      <div className={s.modal}>
        <span onClick={toggleModal} className={s.closeBtn}>
          close
        </span>
        <h4 className={s.title}>
          {month} {day}, {year}
        </h4>
        {currentPage === 'Schedule' && (
          <>
            <div className={s.listBlock}>
              <ul className={s.list}>
                {thisDayTrainings &&
                  thisDayTrainings.map(el => {
                    return (
                      <li className={s.listItem}>
                        <div>
                          <span className={s.time}>{el.time}</span>
                          <span
                            id={el.name}
                            onClick={openDescription}
                            className={s.training}
                          >
                            {el.name}
                          </span>
                        </div>
                        <span
                          onClick={cancelTraining}
                          id={el._id}
                          className={s.cancelBtn}
                        >
                          C
                        </span>
                      </li>
                    );
                  })}
                 
              </ul>
              {!thisDayTrainings.length && <p className={s.message}>There is no training scheduled for today</p>}
            </div>
            <div className={s.btnContainer}>
              <button className={s.btn} onClick={openTrainings} type="button">
                Add training
              </button>
            </div>
          </>
        )}
        {currentPage === 'Trainings' && (
          <TrainingsList
            trainings={trainings}
            goBack={goBack}
            openDescription={openDescription}
            dayData={dayData}
            clickedTraining={clickedTraining}
            setAlert={setAlert}
            schedule={schedule}
          />
        )}
        {currentPage === 'Description' && (
          <DescriptionBlock clickedTraining={clickedTraining} goBack={goBack} />
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
