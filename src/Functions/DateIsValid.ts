const DateIsValid = (date: string) => {
  return /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(18|19|20)\d\d$/.test(date);
};

export default DateIsValid;
