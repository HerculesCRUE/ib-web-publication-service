// -------------- Modules --------------
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';

// -------------- Services --------------
import { LoginService } from './_services/login.service';
import { MenuService } from './_services/menu.service';
import { UserService } from './_services/user.service';
import { ResearchmentStructuresService } from './_services/researchment.structures.service';

// -------------- Components --------------
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

// -------------- Guards --------------
import { AuthGuard } from './_guards/auth.guard';
import { NoAuthGuard } from './_guards/no-auth.guard';

// -------------- Interceptors --------------
import { TokenizedInterceptor } from './_interceptors/tokenized-interceptor';
import { SparqleditorModule } from './sparqleditor/sparqleditor.module';
import { LinksComponent } from './links/links.component';
import { LoginComponent } from './login/login.component';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateAdapter } from './_helpers/customNgbDateAdapter';
import { CustomNgbDateFormatter } from './_helpers/customNgbDateFormatter';
import { CustomNgbDatepickerI18n, I18n } from './_helpers/customNgbDatepickerI18n.provider';
import { AccesibilityComponent } from './accesibility/accesibility.component';
import { Helper } from './_helpers/utils';
import { HelperGraphics } from './_helpers/helperGraphics';
import { LangInterceptor } from './_helpers/lang-intercetor';


// -------------- Aux functions --------------

// keycloak
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { PatentDetailComponent } from './common/patent-detail/patent-detail.component';


const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    HomeComponent,
    LinksComponent,
    AccesibilityComponent,
    PatentDetailComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgSelectModule,
    // Application
    SparqleditorModule,
    NgbModule,
  ],
  providers: [
    I18n,
    AuthGuard,
    NoAuthGuard,
    LoginService,
    MenuService,
    ResearchmentStructuresService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenizedInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
    {
      provide: NgbDateAdapter,
      useClass: CustomNgbDateAdapter
    },
    {
      provide: NgbDateParserFormatter,
      useClass: CustomNgbDateFormatter
    },
    {
      provide: NgbDatepickerI18n,
      useClass: CustomNgbDatepickerI18n
    },
    Helper,
    HelperGraphics
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
