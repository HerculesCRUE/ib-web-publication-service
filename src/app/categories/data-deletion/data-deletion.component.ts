import { Component } from '@angular/core';
import { Helper } from 'src/app/_helpers/utils';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { DataDeletionService } from 'src/app/_services/data-deletion.service';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-data-deletion',
  templateUrl: './data-deletion.component.html',
})
export class DataDeletionComponent {

  deletionDate: number;
  maxDate: {};
  executing: boolean;
  currentUsername: string;

  constructor(private translate: TranslateService,
    private loginService: LoginService,
    private dataDeletionService: DataDeletionService) {

  }

  ngOnInit(): void {
    this.maxDate = Helper.fromModel(new Date().getTime());

    this.loginService.getLoggedUsername().subscribe((username: string) => {
      this.currentUsername = username;
    });
  }

  delete() {

    if (this.deletionDate && this.currentUsername) {

      this.executing = true;

      Swal.fire({
        html: this.translate.instant('dataDeletion.delete-message'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.translate.instant('form.yes'),
        cancelButtonText: this.translate.instant('form.cancel'),
        focusCancel: true
      }).then(result => {
        if (result.value) {

          const date = Helper.parse(this.deletionDate);

          //pass parameters: date and currentUsername

          this.dataDeletionService.delete().subscribe((data) => {
            this.executing = false;
          }, (error) => {
            this.executing = false;
          });
        } else {
          this.executing = false;
        }
      });

    }

  }

}
