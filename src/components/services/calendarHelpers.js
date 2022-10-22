import s from '../Calendar/calendar.module.scss';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  ' May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getTimeArray = () => {
  let arr = []
  for (let i=1; i<=24; i++) {
    if (i === 24) {
      const arr2 = [`00:00`, `${'00:30'}`]
      arr = arr.concat(arr2)
      return arr
    }
    const arr2 = [`${i+':00'}`, `${i+':30'}`]
    arr = arr.concat(arr2)
  }
  return arr
}

export const getClassName = (i, today, month, year, padding) => {
  const dayClassName =
    today.toLocaleDateString().split('/').join('.') ===
    `${month + 1}.${i - padding}.${year}`
      ? `${s.currentDay}`
      : `${s.day}`;

  const iconClassName =
    today.toLocaleDateString().split('/').join('.') ===
    `${month + 1}.${i - padding}.${year}`
      ? `${s.currentDayIcon}`
      : `${s.dayIcon}`;
  const result = { iconClassName, dayClassName };
  return result;
};

export const filterTrainings = (i, schedule, year, month, padding) => {
  const trainings = schedule.filter(
    el => el.date === `${i - padding}.${month + 1}.${year}`
  );
  trainings.sort((a, b) =>
    Number(a.time.split(':').join('')) > Number(b.time.split(':').join(''))
      ? 1
      : -1
  );
  return trainings;
};

export const calendarData = {
  months,
  weekdays,
};
