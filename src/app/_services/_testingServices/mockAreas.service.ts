import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractService } from 'src/app/_helpers/abstract';
import { Page } from 'src/app/_helpers/search';
import { KnowledgeArea } from 'src/app/_models/KnowledgeArea';

/**
 *
 *
 * @export
 * @class GraphicService
 * @extends {AbstractService}
 */
@Injectable({
    providedIn: 'root',
})
export class MockAreaservice extends AbstractService {



    constructor() {
        super();
    }

    find(): Observable<Page<KnowledgeArea>> {
        const page: Page<KnowledgeArea> = new Page<KnowledgeArea>();
        page.number = 0;
        page.numberOfElements = 10;
        page.size = 10;
        page.totalElements = 10;
        // TODO sort
        return of(page);
    }


    getAll(): Observable<any> {
        return of({});
    }

}
