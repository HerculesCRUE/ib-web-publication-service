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
  email: {};

  constructor(private translate: TranslateService,
    private loginService: LoginService,
    private dataDeletionService: DataDeletionService) {

  }

  ngOnInit(): void {
    this.email = Helper.getEmailData();
    this.maxDate = Helper.fromModel(new Date().getTime());
    this.loginService.getLoggedUsername().subscribe((username: string) => {
      this.currentUsername = username;
    });
  }

  delete() {

    if (this.deletionDate && this.currentUsername) {
      console.log(this.deletionDate);
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
          let message = String(this.email['message']);
          message = message.replace('//date//', new Date(this.deletionDate).toLocaleDateString("es-US"))
          //message = message.replace('//to//', String(this.currentUsername))
          this.dataDeletionService.delete(this.currentUsername, this.email['subject'], message).subscribe((data) => {
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
