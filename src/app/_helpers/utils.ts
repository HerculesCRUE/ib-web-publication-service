import { BASE_URL } from '../configuration';
import { HttpParams } from '@angular/common/http';
import { Direction, Page, PageRequest } from './search';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Binding, SparqlResults } from '../_models/sparql';
/**
 * Clase de ayuda para la realización de llamadas HTTP.
 */
export class Helper {
  /**
   * Completa la URL a llamar con la URL base.
   * @param fragment Fragmento de URL.
   */
  static getUrl(fragment: string) {
    return BASE_URL + fragment;
  }

  /**
   * Add a parameter to request parameter list.
   * @param params  request parameter list.
   * @param name parameter name.
   * @param value parameter value.
   * @returns new request params.
   */
  static addParam(params: HttpParams, name: string, value: string | number | Array<string>): HttpParams {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(element => {
          if (element !== '' && element !== 'undefined') {
            params = params.append(`${name.toString()}`, element);
          }
        });
      } else {
        const strValue = String(value);
        if (strValue !== '' && strValue !== 'undefined') {
          params = params.append(name, strValue);
        }
      }

    }

    return params;
  }

  /**
   * Add pagination parameters to request parameter list.
   * @param params request parameter list.
   * @param pageRequest page request.
   * @returns new request params
   */
  static addPaginationParams(
    params: HttpParams,
    pageRequest: PageRequest
  ): HttpParams {
    if (pageRequest.size) {
      params = params.set('size', String(pageRequest.size));
    }

    if (pageRequest.page !== undefined) {
      params = params.set('page', String(pageRequest.page));
    }

    if (pageRequest.property) {
      let sort = pageRequest.property;

      if (pageRequest.direction) {
        sort += `,${pageRequest.direction}`;
      }

      params = params.set('sort', sort);
    }

    return params;
  }

  /**
   *
   *
   * @static
   * @param {NgbDateStruct} date
   * @return {*}  {number}
   * @memberof Helper
   */
  static toModel(dateSent: NgbDateStruct): number {
    let result = null;

    if (dateSent
      && Number.isInteger(dateSent.year) &&
      Number.isInteger(dateSent.month) &&
      Number.isInteger(dateSent.day)) {
      const newDate = moment.utc();
      newDate.set('year', dateSent.year);
      newDate.set('month', dateSent.month - 1);
      newDate.set('date', dateSent.day);
      newDate.startOf('day');

      result = newDate.valueOf();
    }

    return result;
  }

  /**
   * Converts native date to a NgbDateStruct
   */
  static fromModel(date: number): NgbDateStruct {
    let result = null;

    if (date !== undefined && date !== null) {
      const momentDate = moment.utc(date);
      result = { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() };
    }

    return result;
  }



  static parse(value: number): any {
    const momentDate = moment.utc(value);
    if (momentDate.isValid()) {
      return momentDate.format('YYYY-MM-DD');
    } else {
      return null;
    }
  }

  static parseYear(value: number): any {
    const momentDate = moment.utc(value);
    if (momentDate.isValid()) {
      return momentDate.format('YYYY');
    } else {
      return null;
    }
  }

  /**
   *
   * param count
   */
  static genData(count) {
    const nameList = [
      'Verificación 1',
      'Acreditación 1',
      'Acreditación de las dimensiones adicionales 1',
      'Certificación del sistema de garantía interna de la calidad (SGIC) de centro 1',
      'Centro acreditado institucionalmente 1',
    ];
    const legendData = [];
    const seriesData = [];
    const selected = {};
    let name;


    for (let i = 0; i < count; i++) {
      const crypto = window.crypto;
      const array = new Uint32Array(1);
      const rest = crypto.getRandomValues(array);
      name = nameList[i];
      legendData.push(name);
      seriesData.push({
        name,
        value: Math.round(rest[0]),
      });
      selected[name] = i < 6;
    }
    return {
      legendData,
      seriesData,
      selected,
    };
  }

  static findInServiceData(data: SparqlResults, filters: Map<string, string>, pageRequest: PageRequest): Page<SparqlResults> {
    const page: Page<SparqlResults> = new Page<SparqlResults>();
    let dataFiltered: Binding[] = data.results.bindings;
    // Filters
    if (!!filters) {
      filters.forEach((valueFilter: string, keyFilter: string) => {
        if (!!valueFilter) {
          dataFiltered = data.results.bindings = data.results.bindings.filter((binding: Binding) => {
            for (const keyObject of Object.keys(binding)) {
              if (
                keyObject === keyFilter &&
                binding[keyObject].value === valueFilter
              ) {
                return true;
              }
            }
          });
        }
      });
    }

    // Order
    if (!!pageRequest && !!pageRequest.property) {
      page.sort = pageRequest.property;
      page.direction = pageRequest.direction;
      data.results.bindings = data.results.bindings.sort((a, b) => {
        if (pageRequest.direction === Direction.ASC) {
          return (a[pageRequest.property].value > b[pageRequest.property].value) ? 1 : -1;
        }
        return (a[pageRequest.property].value <= b[pageRequest.property].value) ? 1 : -1;
      });
    }

    const min = ((!!pageRequest.page) ? pageRequest.page - 1 : 0) * pageRequest.size;
    const max = ((!!pageRequest.page) ? pageRequest.page : 1) * pageRequest.size;
    data.results.bindings = data.results.bindings.slice(min, max);
    page.number = pageRequest.page;
    page.numberOfElements = pageRequest.size;
    page.size = pageRequest.size;
    page.totalElements = dataFiltered.length;
    // TODO sort

    page.content = [data];
    return page;
  }

  /**
   *
   *  get years for select
   * @return {*} 
   * @memberof Helper
   */
  static getYears() {
    const year3 = new Date().getFullYear();
    const result = [];
    for (let index = year3 - 8; index < year3 + 1; index++) {
      result.push(index);
    }
    return result.reverse();
  }
}
