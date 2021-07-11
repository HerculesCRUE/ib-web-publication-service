import { Component, OnInit } from '@angular/core';
import { Validator } from 'src/app/_models/validator';
import { ValidatorService } from 'src/app/_services/validator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component in order to launch a new importation
 */
@Component({
    selector: 'app-new-validator',
    templateUrl: './new-validator.component.html',
    styleUrls: ['./new-validator.component.css']
})
export class NewValidatorComponent implements OnInit {
    // vbles
    validator: Validator;
    createMode: boolean;

    constructor(private router: Router,
        private translate: TranslateService,
        private toastr: ToastrService,
        private validatorService: ValidatorService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.createMode = true;
        this.validator = new Validator();
        this.activatedRoute.params.subscribe(params => {
            if (params.data) {
                this.validator = JSON.parse(params.data);
                this.createMode = false;
            }
        });
    }

    /**
     * Launchs an import operation
     */
    create() {
        let observable: Observable<Validator>;

        // we set the user_name
        const userName = localStorage.getItem('user_name');
        //this.validator.user = userName;

        console.info(this.validator);
        if (this.createMode) {
            observable = this.validatorService.save(this.validator);
        } else {
            observable = this.validatorService.update(this.validator);
        }
        observable.subscribe(
            ((validator: Validator) => {
                this.router.navigate(['/main/validator']);
                console.info(validator);
                this.toastr.success(this.translate.instant('toast.success-saving', this.translate.instant('toast.success')));
            }), (error => {
                console.error(error);
                this.toastr.error(this.translate.instant('toast.error-saving', this.translate.instant('toast.error')));
            })
        );
    }
}
