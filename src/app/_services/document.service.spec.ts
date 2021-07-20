import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentService } from './document.service';
import { TestingHelper } from '../_helpers/testing.spec';
import { Helper } from '../_helpers/utils';
import { SparqlResults } from '../_models/sparql';
import { FindRequest } from '../_helpers/search';

describe('DocumentService', () => {
    let service: DocumentService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestingHelper.configureTest()
            .compileComponents();
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.inject(DocumentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('be able to retrieve posts from the API via GET', async () => {
        const findRequest: FindRequest = new FindRequest();
        const DUMMY_DATA: SparqlResults = {
            head: {
                vars: [
                    'name',
                    'area',
                    'organisation',
                    'id'
                ]
            },
            results: {
                bindings: [
                    // 1
                    {
                        name: {
                            type: 'literal',
                            value: 'Patente 1'
                        },
                        area: {
                            type: 'literal',
                            value: 'Derecho'
                        },
                        organisation: {
                            type: 'literal',
                            value: 'red.es'
                        },
                        id: {
                            type: 'literal',
                            value: 'xxxxxx'
                        }
                    },
                    // 2
                    {
                        name: {
                            type: 'literal',
                            value: 'Patente 2'
                        },
                        area: {
                            type: 'literal',
                            value: 'Historia'
                        },
                        organisation: {
                            type: 'literal',
                            value: 'Fondos europeos'
                        },
                        id: {
                            type: 'literal',
                            value: 'xxxxxx'
                        }
                    }
                ]
            }
        };
        service.find(findRequest).subscribe(result => {
            if (result.content) {
                expect(result.content.length).toBe(2);
            }

        });
        const request = httpMock.expectOne(Helper.getUrl('/document/search?size=50&page=0'));
        expect(request.request.method).toBe('GET');
        request.flush(DUMMY_DATA);
    });
});
