interface GPInterface {
  Date?: (a: { [index: string]: string }) => string;
  PersonNr?: (a: { [index: string]: string }) => string;
}
type Key = {
  key: string;
};

const GetProperty: GPInterface = {};

GetProperty.PersonNr = (a: { [index: string]: string }) => {
  const property: Key = {
    key: '',
  };
  // Look through object keys and look for a key containing person|Person
  Object.keys(a).forEach((x) => {
    if (/^(person)|(Person)/g.test(x)) {
      property.key = x;
    }
  });
  // return key;
  return property.key;
};

GetProperty.Date = (a: { [index: string]: string }) => {
  const property: Key = {
    key: '',
  };
  if (Object.prototype.hasOwnProperty.call(a, 'ddmmyy')) {
    property.key = 'ddmmyy';
  }
  if (Object.prototype.hasOwnProperty.call(a, 'Fødselsdato (ddmmyyyy)')) {
    property.key = 'Fødselsdato (ddmmyyyy)';
  }
  return property.key;
};

export default GetProperty;
