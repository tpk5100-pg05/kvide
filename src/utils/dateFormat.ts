import dayjs from 'dayjs';

/**
 * Format a start and end date to a day, e.g Feb 26 - Feb 27
 * @param start_time The start time of the episode
 * @param end_time The end time of the episode
 * @returns formatted string
 */
const dayFormat = (start_time: Date, end_time: Date) => {
  // return start_time.getDate();
  if (dayjs(start_time).isSame(end_time, 'day')) {
    return dayjs(start_time).format('MMM D');
    // return start_time.getDate();
  }

  return dayjs(start_time).format('MMM D') + ' - ' + dayjs(end_time).format('MMM D');
};

/**
 * Format a start and end time to specic time, e.g 10:00 - 11:00
 * @param start_time
 * @param end_time
 * @returns formatted string
 */
const timeFormat = (start_time: Date, end_time: Date) => {
  //   return start_time.getTime();
  return dayjs(start_time).format('HH:mm') + ' - ' + dayjs(end_time).format('HH:mm');
};

export { dayFormat, timeFormat };
