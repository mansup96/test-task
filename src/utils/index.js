export const getQueryFromObject = obj => {
  let query = '?';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      query += key + '=' + obj[key] + '&';
    }
  }
  return query.slice(0, query.length - 1);
};

const declOfNum = (number, words) => {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
  ];
};

const getDistance = distance => {
  const words = ['метр', 'метра', 'метров'];
  const meters = declOfNum(distance, words);
  return distance < 1000
    ? `${distance} ${meters}`
    : distance % 1000 === 0
    ? `${parseInt(distance / 1000)} км`
    : `${parseInt(distance / 1000)} км ${distance % 1000} ${meters}`;
};

export const transformDistance = walk => {
  return {
    ...walk,
    transformedDistance: getDistance(walk.distance),
  };
};

export const getFormattedDate = date => {
  date = new Date(date);
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month =
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const getDay = date => {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  date = new Date(date);
  return days[date.getDay()];
};

export const transformDate = walk => {
  return {
    ...walk,
    dateObject: {
      date: getFormattedDate(walk.date),
      day: getDay(walk.date),
    },
  };
};
