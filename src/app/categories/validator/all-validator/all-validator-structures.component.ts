import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Direction, FindRequest, Order, Page, PageRequest, PaginatedSearchComponent } from 'src/app/_helpers/search';
import { Validator } from 'src/app/_models/validator';
import { ValidatorService } from 'src/app/_services/validator.service';
import Swal from 'sweetalert2';

/**
 *
 *
 * @export
 * @class AllValidatorStructuresComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-all-validator-structures',
    templateUrl: './all-validator-structures.component.html'
})
export class AllValidatorStructuresComponent extends PaginatedSearchComponent<Validator> {
    loaded = false;

    findRequest: FindRequest = new FindRequest();

    constructor(
        private researchmentStructureService: ValidatorService,
        router: Router,
        private translateS: TranslateService,
        translate: TranslateService,
        toastr: ToastrService
    ) {
        super(router, translate, toastr);
    }

    protected findInternal(findRequest: FindRequest): Observable<Page<Validator>> {
        const page: Page<Validator> = new Page();
        return this.researchmentStructureService.find(findRequest).pipe(
            map((x) => {
                this.loaded = true;
                return x;
            }), // return the received value true/false
            catchError((err) => {
                this.loaded = true;
                return of(page)
            }));
    }

    protected removeInternal(entity: any): Observable<any> {
        return of({});
    }

    protected getDefaultOrder(): Order {
        return {
            property: 'entity',
            direction: Direction.DESC
        };
    }

    /**
     * Filter researchment structures
     *
     * @param {string} filterName
     * @memberof AllResearchmentStructuresComponent
     */
    filterResearchmentStructures() {
        this.findRequest.pageRequest.page = 0;
        this.loaded = false;
        this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
        }, () => {
            this.loaded = true;
        });

    }

    /**
     * Function called on sortChanged event of TableResultsComponent
     *
     * @param {PageRequest} pageRequest
     * @memberof AllResearchmentStructuresComponent
     */
    allResearchmentStructuresFilteredSortChanged(pageRequest: PageRequest): void {
        this.findRequest.pageRequest.property = pageRequest.property;
        this.findRequest.pageRequest.direction = pageRequest.direction;
        this.researchmentStructureService.find(this.findRequest).subscribe((data) => {
            this.resultObject = data;
            this.loaded = true;
        }, () => {
            this.loaded = true;
        });
    }

    deleteQUery(id: string) {
        Swal.fire({
            html: this.translateS.instant('validator.delete'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translateS.instant('form.yes'),
            cancelButtonText: this.translateS.instant('form.cancel')
        }).then(result => {
            if (result.value) {
                this.researchmentStructureService.delete(id).subscribe(data => {
                    this.resultObject.content = this.resultObject.content.filter(obj => obj['id'] !== id);
                });
            }
        });

    }
}
