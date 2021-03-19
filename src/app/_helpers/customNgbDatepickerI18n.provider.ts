import { Component, Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
const I18N_VALUES = {
    es: {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    }
    // other languages you would support
};
@Injectable()
export class I18n {
    language = 'es';
}
@Injectable()
export class CustomNgbDatepickerI18n extends NgbDatepickerI18n {
    constructor(private i18n: I18n) {
        super();
    }
    /*getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }

    getWeekdayShortName(weekday: number): string {
        const day = (weekday === 7) ? 0 : weekday;
        return moment.weekdaysShort()[day];
    }

    getMonthShortName(month: number): string {
        return moment.monthsShort()[month - 1];
    }

    getMonthFullName(month: number): string {
        return moment.months()[month - 1];
    }*/

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this.i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}
