const GetYear = (fdato?: string, pnr?: string, def?: string) => {
  try {
    if (
      pnr === undefined ||
      fdato === undefined ||
      fdato === '' ||
      pnr === ''
    ) {
      return def;
    }

    if (fdato.length === 8) {
      return fdato.slice(4, 6);
    }
    // get 2 last characters of fdato
    const lastTwo = fdato.slice(-2);

    // get current year
    const currentYear: string = new Date().getFullYear().toString();

    let year;
    // 1900 - 1999
    if (/^([0-4]\d\d)/g.test(pnr.toString().substring(0, 3))) {
      year = 19;
    }
    // 2000 - 2099
    if (/^([5-9]\d\d)/g.test(pnr.toString().substring(0, 3))) {
      // check if age would be greater than current year
      if (`20${lastTwo}` > currentYear) {
        year = 18;
      } else {
        year = 20;
      }
    }
    return year;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default GetYear;
