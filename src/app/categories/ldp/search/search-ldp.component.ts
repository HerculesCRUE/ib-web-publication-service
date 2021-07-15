import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 *
 *
 * @export
 * @class SearchLdpComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-search-ldp',
    templateUrl: './search-ldp.component.html',
})
export class SearchLdpComponent implements OnInit {

    searchToken: string;

    routerChild: Router;

    constructor(router: Router) {
        this.routerChild = router;
    }

    ngOnInit(): void {
        this.searchToken = '';
    }

    filter(): void {
        this.routerChild.navigateByUrl('/main/categories/ldp-search-result?title=' + this.searchToken);
    }

}
