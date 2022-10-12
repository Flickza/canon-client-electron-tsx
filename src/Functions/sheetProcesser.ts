/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import XLSX from 'xlsx';
import { parentPort } from 'worker_threads';
import DateIsValid from './DateIsValid';
import GetProperty from './GetProperty';
import GetYear from './GetYear';
import checkMissing from './checkMissing';

const process = async (sheet: XLSX.WorkSheet, _defVal: string) => {
  const temp: Array<any> = XLSX.utils.sheet_to_json(sheet?.Sheets?.Ark1, {
    defval: '',
  });
  temp.map((row: { [index: string]: string }, index: any) => {
    // get personNr key from object
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const pnrKey: string = GetProperty.PersonNr?.(row)!;

    // get Fødselsdato key from object
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const dateKey: string = GetProperty.Date?.(row)!;

    // calculate birthyear from fødselsdato + personnr
    const year = GetYear(
      row[dateKey].toString(),
      row[pnrKey].toString(),
      _defVal
    );

    if (pnrKey === undefined || dateKey === undefined || !year) {
      return new Error(
        `Some headers were not found... \n PNR_HEADER_FOUND: ${pnrKey}\n DATE_HEADER_FOUND: ${dateKey}\n YEAR_HEADER_FOUND: ${year} [BASED_ON]: ${row[dateKey]}, ${row[pnrKey]}`
      );
    }
    if (row[dateKey].length < 5 || row[dateKey] === '') {
      return temp[index];
    }
    // Strip all invalid characters
    temp[index][dateKey] = row[dateKey].toString().replaceAll(/\W|-|_/g, '');

    if (!DateIsValid(temp[index][dateKey])) {
      // date missing trailing 0
      if (
        temp[index][dateKey].length === 7 &&
        checkMissing.trailing?.(temp[index][dateKey])
      ) {
        const modified = `0${temp[index][dateKey]}`;
        // check if date is valid after modification
        if (DateIsValid(modified)) {
          temp[index][dateKey] = modified;
        }
      }
      // date missing trailing 0 and year
      if (
        temp[index][dateKey].length === 5 &&
        checkMissing.yearAndTrailing?.(temp[index][dateKey])
      ) {
        const modified = `0${temp[index][dateKey]}${year}`;

        // check if date is valid after modification
        if (DateIsValid(modified)) {
          // set new value to modified value
          temp[index][dateKey] = modified;
        }
      }
      // check if date missing year
      if (
        temp[index][dateKey].length === 6 &&
        checkMissing.year?.(temp[index][dateKey])
      ) {
        // split date string and add year to string
        const modified =
          temp[index][dateKey].substring(0, 4) +
          year +
          temp[index][dateKey].substring(4, 6);
        // check if date is after year has been added
        if (DateIsValid(modified)) {
          // set new value to modified value
          temp[index][dateKey] = modified;
        }
      }
    }
    return temp[index];
  });
  return temp;
};

parentPort?.on('message', async (d) => {
  if (d.sheet && d.defVal) {
    try {
      parentPort?.postMessage(await process(d.sheet, d.defVal));
    } catch (e) {
      parentPort?.postMessage('error');
    }
  }
});
