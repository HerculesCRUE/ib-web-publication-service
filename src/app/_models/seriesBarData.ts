/**
 *
 *
 * @export
 * @class SeriesBarData
 */
export class SeriesBarData {
    /**
     *
     *
     * @type {string}
     * @memberof SeriesBarData
     */
    name: string;
    /**
     *
     *
     * @type {string}
     * @memberof SeriesBarData
     */
    type: string;
    /**
     *
     *
     * @type {*}
     * @memberof SeriesBarData
     */
    data: any;
    /**
     *
     *
     * @memberof SeriesBarData
     */
    animationDelay: (idx) => number;
}
