import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Componente para mostrar el detalle y alta de usuarios.
 */
@Component({
  selector: 'app-new-data-importer',
  templateUrl: './new-data-importer.component.html',
  styleUrls: ['./new-data-importer.component.css']
})
export class NewDataImporterComponent implements OnInit {

  /**
   * Datos del usuarioa actual.
   */
  user: User;
  /**
   * Modo. En caso afirmativo se trata del alta de usaurios.
   */
  createMode: boolean;
  /**
   * ID del usuario actual.
   */
  userId: string;
  /**
   * Lista de roles disponibles.
   */
  roles: Array<string> = ['ADMINISTRATOR', 'USER'];

  /**
   * Roles seleccionados.
   */
  userRoles: Array<string>;

  constructor(private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = null;
    this.user = new User();
    this.userRoles = [];

    this.route.params.subscribe
      ((params: Params) => {
        this.userId = params.id; // (+) converts string 'id' to a number
        if (this.userId) {
          this.createMode = false;

          this.userService.get(this.userId).subscribe(
            ((user: User) => {
              this.user = user;
            })
          );
        } else {
          this.createMode = true;
          this.user.credentialsNonExpired = true;
          this.user.enabled = true;
          this.user.accountNonLocked = true;
          this.user.accountNonExpired = true;
        }
      });
  }

  /**
   * Guarda el usuario actual.
   */
  save() {
    let observable: Observable<User>;

    if (this.createMode) {
      observable = this.userService.save(this.user);

    } else {
      observable = this.userService.update(this.user);
    }

    observable.subscribe(
      ((user: User) => {
        if (this.createMode) {
          this.router.navigate(['/main/users', user.id]);
        } else {
          this.user = user;
        }

        this.toastr.success(this.translate.instant('toast.success-saving', this.translate.instant('toast.success')));
      }), (error => {
        console.error(error);
        this.toastr.error(this.translate.instant('toast.error-saving', this.translate.instant('toast.error')));
      })
    );
  }
}
