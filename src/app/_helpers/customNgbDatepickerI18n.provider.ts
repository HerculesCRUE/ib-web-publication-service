import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHelperService } from '../_services/translate-helper.service';
const I18N_VALUES = {
    es: {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    en: {
        weekdays: ['Mon', 'Tues', 'Web', 'Thurs', 'Fri', 'Sat', 'Sun'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
    // other languages you would support
};
@Injectable()
export class I18n {
    language = 'es';
}
@Injectable()
export class CustomNgbDatepickerI18n extends NgbDatepickerI18n {
    constructor(private i18n: I18n, private translateHelperService: TranslateHelperService) {
        super();
    }

    /**
     *
     *
     * @param {number} weekday
     * @return {*}  {string}
     * @memberof CustomNgbDatepickerI18n
     */
    getWeekdayShortName(weekday: number): string {
        let lang: string;
        if (!this.translateHelperService.getLocalLang()) {
            lang = 'es';
        } else {
            lang = this.translateHelperService.getLocalLang();
        }
        return I18N_VALUES[lang].weekdays[weekday - 1];
    }

    /**
     *
     *
     * @param {number} month
     * @return {*}  {string}
     * @memberof CustomNgbDatepickerI18n
     */
    getMonthShortName(month: number): string {
        let lang: string;
        if (!this.translateHelperService.getLocalLang()) {
            lang = 'es';
        } else {
            lang = this.translateHelperService.getLocalLang();
        }
        return I18N_VALUES[lang].months[month - 1];
    }

    /**
     *
     *
     * @param {number} month
     * @return {*}  {string}
     * @memberof CustomNgbDatepickerI18n
     */
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    /**
     *
     *
     * @param {NgbDateStruct} date
     * @return {*}  {string}
     * @memberof CustomNgbDatepickerI18n
     */
    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}
