import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class CustomNgbDateFormatter extends NgbDateParserFormatter {
  formatDate = 'YYYY-MM-DD';
  /**
   * Parses the given value to an NgbDateStruct. Implementations should try their best to provide a result, even
   * partial. They must return null if the value can't be parsed.
   * @param value the value to parse
   */
  parse(value: string): NgbDateStruct {

    let result = null;

    if (value) {
      // Local format Example: es=DD/MM/YYYY
      const momentDate = moment.utc(value, 'L');
      if (momentDate.isValid()) {
        result = { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
      }
    }

    return result;
  }

  /**
   * Formats the given date to a string. Implementations should return an empty string if the given date is null,
   * and try their best to provide a partial result if the given date is incomplete or invalid.
   * @param date the date to format as a string
   */
  format(date: NgbDateStruct): string {

    let result = null;

    if (date && Number.isInteger(date.year) && Number.isInteger(date.month) && Number.isInteger(date.day)) {
      const newDate = moment.utc();
      newDate.set('year', date.year);
      newDate.set('month', date.month - 1);
      newDate.set('date', date.day);
      newDate.startOf('day');
      result = newDate.format(this.formatDate);
    }

    return result;
  }

  setOtherFormat(format) {
    this.formatDate = format;
  }

}
