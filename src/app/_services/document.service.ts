import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AbstractService } from '../_helpers/abstract';
import { FindRequest, Page } from '../_helpers/search';
import { Helper } from '../_helpers/utils';
import { AcademicPublication } from '../_models/academicPublication';
import { BookSection } from '../_models/bookSection';
import { Document } from '../_models/document';
import { DocumentDetail } from '../_models/documentDetail';
import { OtherPublication } from '../_models/otherPublication';

/**
 *  Service for Document
 *
 * @export
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class DocumentService extends AbstractService {

    /**
     * Creates an instance of DocumentService.
     * @param {HttpClient} httpClient
     * @memberof DocumentService
     */
    constructor(private httpClient: HttpClient) {
        super();
    }



    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<Document>>}
     * @memberof DocumentService
     */
    find(findRequest: FindRequest): Observable<Page<Document>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.types);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'dateFrom', findRequest.filter.yearFrom);
        parameters = Helper.addParam(parameters, 'dateTo', findRequest.filter.yearTo);
        parameters = Helper.addParam(parameters, 'authorId', findRequest.filter.authorId);
        parameters = Helper.addParam(parameters, 'organizationId', findRequest.filter.organizationId);

        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/document/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<AcademicPublication>>}
     * @memberof DocumentService
     */
    findAcademicPublication(findRequest: FindRequest): Observable<Page<AcademicPublication>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.types);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'yearFrom', findRequest.filter.yearFrom);
        parameters = Helper.addParam(parameters, 'yearTo', findRequest.filter.yearTo);
        parameters = Helper.addParam(parameters, 'directedBy', findRequest.filter.directedBy);
        parameters = Helper.addParam(parameters, 'date', findRequest.filter.date);
        parameters = Helper.addParam(parameters, 'authorId', findRequest.filter.authorId);
        parameters = Helper.addParam(parameters, 'organizationId', findRequest.filter.organizationId);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/academicpublication/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    findOtherPublications(findRequest: FindRequest): Observable<Page<OtherPublication>> {

        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'types', findRequest.filter.types);
        parameters = Helper.addParam(parameters, 'title', findRequest.filter.name);
        parameters = Helper.addParam(parameters, 'dateFrom', findRequest.filter.yearFrom);
        parameters = Helper.addParam(parameters, 'dateTo', findRequest.filter.yearTo);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/otherpublication/search'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     *
     *
     * @param {FindRequest} findRequest
     * @return {*}  {Observable<Page<AcademicPublication>>}
     * @memberof DocumentService
     */
    getBookSection(findRequest: FindRequest): Observable<Page<BookSection>> {
        // Filter params
        let parameters = new HttpParams();
        parameters = Helper.addParam(parameters, 'bookId', findRequest.filter.id);
        // Pagination params
        parameters = Helper.addPaginationParams(parameters, findRequest.pageRequest);

        return this.httpClient
            .get(Helper.getUrl('/booksection/search/'), {
                params: parameters
            }).pipe(
                catchError(this.handleError)
            );
    }

    /**
     * get docuemtn from back with id and type
     *
     * @param {string} id
     * @param {string} type
     * @return {*} 
     * @memberof DocumentService
     */
    getDocumentByIdAndType(id: string, type: string): Observable<DocumentDetail> {

        return this.httpClient
            .get(Helper.getUrl('/document/' + id + '/' + type)).pipe(
                catchError(this.handleError)
            );
    }

    getotherByIdAndType(id: string, type: string): Observable<DocumentDetail> {

        return this.httpClient
            .get(Helper.getUrl('/otherpublication/' + id + '/' + type)).pipe(
                catchError(this.handleError)
            );
    }

    getacademicByIdAndType(id: string, type: string): Observable<DocumentDetail> {

        return this.httpClient
            .get(Helper.getUrl('/academicpublication/' + id + '/' + type)).pipe(
                catchError(this.handleError)
            );
    }

}
