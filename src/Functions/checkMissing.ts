interface Missing {
  year?: (v: string) => boolean;
  trailing?: (v: string) => boolean;
  yearAndTrailing?: (v: string) => boolean;
}

const checkMissing: Missing = {};

checkMissing.year = (v: string) => {
  return /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])\d\d$/g.test(v);
};

checkMissing.trailing = (v: string) => {
  return /^([1-9]|[12][0-9]|3[01])(0[1-9]|1[012])(18|19|20)\d\d$/g.test(v);
};

checkMissing.yearAndTrailing = (v: string) => {
  return /^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])([1-9][0-9])/g.test(v);
};

export default checkMissing;
