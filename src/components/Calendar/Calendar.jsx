import s from './calendar.module.scss';
import { useEffect, useState } from 'react';
import { getSchedule } from '../../redux/schedule/schedule-selector';
import { useSelector } from 'react-redux';
import { getClassName, filterTrainings, calendarData } from '../../services/calendarHelpers';

const Calendar = ({ toggleModal, setPeriod }) => {
  const [calendar, setCalendar] = useState({
    year: null,
    month: null,
    days: null,
  });

  const { month, days, year } = calendar;
  const { months, weekdays } = calendarData;
  const { schedule } = useSelector(getSchedule);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const days = new Date(year, month + 1, 0).getDate();
    setPeriod(`${month + 1}.${year}`);
    setCalendar({
      month,
      year,
      days,
    });
  }, [setPeriod]);

  const renderMarkup = () => {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const weekday = firstDay.toLocaleDateString('en-us', {
      weekday: 'long',
    });
    const padding = weekdays.indexOf(weekday);
    let markup = [];
    for (let i = 1; i <= 42; i++) {
      if (i < padding + 1) {
        markup.push(<div className={s.padDay}></div>);
      } else if (i >= padding && i < days + padding + 1) {
        const trainings = filterTrainings(i, schedule, year, month, padding)
        const className = getClassName(i, today, month, year, padding)
        markup.push(
          <div
            onClick={toggleModal}
            className={className.dayClassName}
            id={`${i - padding}.${month + 1}.${year}`}
          >
            <span className={className.iconClassName}>{i - padding}</span>
            {trainings &&
              trainings.map(el => {
                return <div className={s.training}>{el.name.split(' ')[0]}</div>;
              })}
          </div>
        );
      }
    }
    return markup;
  };

  const nextMonth = e => {
    setCalendar(prevState => {
      return {
        ...prevState,
        month: month + 1,
        days: new Date(year, month + 2, 0).getDate(),
      };
    });
    if (month === 11) {
      setCalendar(prevState => {
        return {
          ...prevState,
          month: 0,
          year: year + 1,
          days: new Date(year, month + 2, 0).getDate(),
        };
      });
    }
    setPeriod(`${month + 2}.${year}`);
  };

  const prevMonth = () => {
    setCalendar(prevState => {
      return {
        ...prevState,
        month: month - 1,
        days: new Date(year, month, 0).getDate(),
      };
    });
    if (month === 0) {
      setCalendar(prevState => {
        return {
          ...prevState,
          month: 11,
          year: year - 1,
          days: new Date(year, month + 1, 0).getDate(),
        };
      });
    }
    setPeriod(`${month}.${year}`);
  };

  return (
    <div className={s.calendarBody}>
      <div className={s.calNav}>
        <span className={s.dateBtn} onClick={prevMonth}>
          back
        </span>
        <span className={s.title}>
          {months[month]} {year}
        </span>
        <span className={s.dateBtn} onClick={nextMonth}>
          next
        </span>
      </div>

      <div className={s.headRow} id="head">
        <div className={s.headColumn}>Monday</div>
        <div className={s.headColumn}>Tuesday</div>
        <div className={s.headColumn}>Wednesday</div>
        <div className={s.headColumn}>Thursday</div>
        <div className={s.headColumn}>Friday</div>
        <div className={s.headColumn}>Saturday</div>
        <div className={s.headColumn}>Sunday</div>
      </div>
      <div className={s.calendarDays}>{renderMarkup()}</div>
    </div>
  );
};

export default Calendar;
