export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const is_email = (em) => ((em.match(EMAIL_REGEX)) ? true : false);

export const is_password = (pw) => ((pw.length >= 8) ? true : false);

export const format_number = (num = '') => {
  const m = num.match(/\+1([\d]{3})([\d]{3})([\d]{4})/);
  return `(${m[1]}) ${m[2]}-${m[3]}`;
}
