import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class MaskController {
    mask: string = "DD/MM/YYYY"
    public setMask(mask) {
        this.mask = mask;
    }
}
@Injectable()
export class CustomDateAdapter {
    constructor(private maskController: MaskController) { }
    get mask() {
        return this.maskController.mask;
    }
    /**
     *
     *
     * @param {string} date
     * @return {*}  {NgbDateStruct}
     * @memberof CustomDateAdapter
     */
    fromModel(date: string): NgbDateStruct {
        let result = null;

        if (date !== undefined && date !== null) {
            const momentDate = moment.utc(date);
            result = { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
        }

        return result;
    }

    /**
     *
     *
     * @param {NgbDateStruct} date
     * @return {*}  {string}
     * @memberof CustomDateAdapter
     */
    toModel(date: NgbDateStruct): string // from internal model -> your mode
    {
        let result = null;
        if (date && Number.isInteger(date.year) && Number.isInteger(date.month) && Number.isInteger(date.day)) {
            const newDate = moment.utc();
            newDate.set('year', date.year);
            newDate.set('month', date.month - 1);
            newDate.set('date', date.day);
            newDate.startOf('day');
            result = newDate.format(this.mask);
            result = newDate.valueOf();
        }

        return result;
    }

}
@Injectable()
export class CustomDateParserFormatter {
    constructor(private maskController: MaskController) { }
    get mask() {
        return this.maskController.mask;
    }
    /**
     *
     *
     * @param {string} value
     * @return {*}  {NgbDateStruct}
     * @memberof CustomDateParserFormatter
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
     *
     *
     * @param {NgbDateStruct} date
     * @return {*}  {string}
     * @memberof CustomDateParserFormatter
     */
    format(date: NgbDateStruct): string {

        let result = null;

        if (date && Number.isInteger(date.year) && Number.isInteger(date.month) && Number.isInteger(date.day)) {
            const newDate = moment.utc();
            newDate.set('year', date.year);
            newDate.set('month', date.month - 1);
            newDate.set('date', date.day);
            newDate.startOf('day');
            result = newDate.format(this.mask);
        }

        return result;

    }
}
