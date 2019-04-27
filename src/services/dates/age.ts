// Times in milliseconds
var second = 1e3,
  minute = 6e4,
  hour = 36e5,
  day = 864e5,
  week = 6048e5,
  formats = {
    seconds: 's',
    minutes: 'm',
    hours: 'h',
    days: 'd',
  };

export function dateAge(input: Date | string | number) {
  if (input instanceof Date) {
    input = input.getTime();
  }

  if (typeof input === 'string') {
    input = new Date(input).getTime();
  }

  const diff = Math.abs(input - Date.now());

  if (diff <= second) {
    return '1m';
  } else if (diff < minute) {
    return '1m';
  } else if (diff < hour) {
    return Math.floor(diff / 1000 / 60) + 'm';
  } else if (diff < day) {
    return Math.floor(diff / 1000 / 3600) + 'h';
  }
  const daysDiff = Math.floor(diff / 1000 / 86400);

  if (daysDiff < 100) {
    return `${daysDiff}d`;
  }

  return `+99d`;

  // else {
  //   if (diff < week) {
  //     return Math.floor(diff / 1000 / 86400) + 'd';
  //   } else {
  //     var d = new Date(input);
  //     return d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
  //   }
  // }
}
