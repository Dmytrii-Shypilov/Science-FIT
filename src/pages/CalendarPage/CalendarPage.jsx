import s from './calendar-page.module.scss';
import { useState } from 'react';
import Calendar from '../../components/Calendar';
import Modal from '../../components/Modal';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchSchedule } from '../../redux/schedule/schedule-operations';
import Container from '../../components/Container';
import { calendarData } from '../../components/services/calendarHelpers';
import { AlertModal } from '../../components/AlertModal/AlertModal';



const CalendarPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModal] = useState(false);
  const [dayData, setDayData] = useState({
    fullDate: '',
    day: '',
    month: '',
    year: '',
  });
  const [period, setPeriod] = useState('');
  const [alert, setAlert] = useState({
    isAlert: false,
    type: '',
    message: '',
    callback: null,
  });

  const { isAlert} = alert;
  const {months} = calendarData

  const toggleModal = (e) => {
    getDayData(e.currentTarget.id);
    if(!isModalOpen ) {
      setModal(true)
      document.body.style.overflow = "hidden"
      return
    }
    setModal(false)
    document.body.style.overflow = "visible"
  }

  const getDayData = date => {
    const [day, monthFig, year] = date.split('.');
    const month = months[monthFig - 1];
    setDayData({
      fullDate: date,
      day,
      month,
      year,
    });
  };


  useEffect(() => {
    if (period) {
      dispatch(fetchSchedule(period));
    }
  }, [period, dispatch]);

  return (
    <>
      <section className={s.section}>
        <Container>
          <Calendar toggleModal={toggleModal} setPeriod={setPeriod} />
        </Container>
      </section>
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          dayData={dayData}
          setAlert={setAlert}
        />
      )}
      {isAlert && (
        <AlertModal
          alert={alert}
          setAlert={setAlert}
          callback={alert.callback}
        />
      )}
    </>
  );
};

export default CalendarPage;
