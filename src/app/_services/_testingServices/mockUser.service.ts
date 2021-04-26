import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/_helpers/abstract';
import { FindRequest, Page } from 'src/app/_helpers/search';
import { User } from 'src/app/_models/user';
import { Helper } from 'src/app/_helpers/utils';

/**
 * Servicio para la gestión de datos de usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class MockUserService extends AbstractService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
   * Realiza la consulta de usuarios.
   * @param findRequest Datos de la consulta.
   * @returns Observable con el resultado de la consulta.
   */
  findUsers(findRequest: FindRequest): Observable<Page<User>> {
    const user: User = new User();
    const page: Page<User> = new Page();
    user.email = 'test@gmail.com';

    page.content = [user];
    // Filter params
    return of(page);
  }

  /**
   * Obtiene los datos de un usuario.
   * @param id ID del usuario.
   * @returns Observable con los datos del usuario.
   */
  get(id: string): Observable<User> {
    const user: User = new User();
    user.email = 'test@gmail.com';
    // Filter params
    return of(user);
  }

  /**
   * Realiza el guardado de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  save(user: User): Observable<User> {
    // Filter params
    return of(user);
  }

  /**
   * Realiza la actualización de los datos de un usuario.
   * @param user Usuario a guardar.
   * @returns Observable con el resultado de la operación.
   */
  update(user: User): Observable<User> {
    // Filter params
    return of(user);
  }

  /**
   * Realiza la activación o desactivación de un usuario.
   * @param user Datos del usuario.
   * @returns Observable con el resultado de la operación.
   */
  toggle(user: User): Observable<any> {
    let observable: Observable<any>;

    if (user.accountNonLocked) {
      observable = this.httpClient.put(
        Helper.getUrl(`/user/${user.id}/disable`),
        null
      );
    } else {
      observable = this.httpClient.put(
        Helper.getUrl(`/user/${user.id}/enable`),
        null
      );
    }

    return observable.pipe(catchError(this.handleError));
  }

  /**
   * Obtiene los datos del usuario actual
   * @returns Observable con los datos del usuario actual.
   */
  getUserData(): Observable<User> {
    const user: User = new User();
    user.email = 'test@gmail.com';
    // Filter params
    return of(user);
  }
}
