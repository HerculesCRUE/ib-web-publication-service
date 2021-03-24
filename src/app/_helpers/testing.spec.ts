import { TestBed } from '@angular/core/testing';

// -------------- Modules --------------
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';

// -------------- Services --------------
import { UserService } from '../_services/user.service';

// -------------- Components --------------
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';

// -------------- Guards --------------
import { AuthGuard } from '../_guards/auth.guard';

// -------------- Interceptors --------------
import { TokenizedInterceptor } from '../_interceptors/tokenized-interceptor';
import { OAuthInterceptor } from '../_interceptors/oauth-interceptor';

import { APP_BASE_HREF } from '@angular/common';
import { SPARQLEditorComponent } from '../sparqleditor/sparqleditor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { TreeComponent } from '../graphic/tree/tree.component';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { DocumentsComponent } from '../common/documents/documents.component';
import { ParticipantsComponent } from '../common/participants/participants.component';
import { DeliverableComponent } from '../common/deliverable/deliverable.component';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { ScientistComponent } from '../categories/scientist/scientist.component';
import { InvestigationActionsComponent } from '../categories/investigation-actions/investigation-actions.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ScientistDetailComponent } from '../categories/scientist-detail/scientist-detail.component';
import { DirectedJobsComponent } from '../common/directed-jobs/directed-jobs.component';
import { StartupComponent } from '../common/startup/startup.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AreasComponent } from '../categories/areas/areas.component';
import { LinksComponent } from '../links/links.component';
import { EventsComponent } from '../common/events/events.component';
import { BusinessComponent } from '../common/business/business.component';
import { AreasDetailComponent } from '../categories/areas/areas-detail/areas-detail.component';
import { ScientificProductionComponent } from '../categories/scientific-production/scientific-production.component';
import { DocumentDetailComponent } from '../categories/document-detail/document-detail.component';
import { EventDetailComponent } from '../categories/event-detail/event-detail.component';
import { StatisticsComponent } from '../categories/statistics/statistics.component';
import { AllResearchmentStructuresComponent } from '../categories/researchment-structures/all-researchment-structures/all-researchment-structures.component';
import { TopResearchmentStructuresComponent } from '../categories/researchment-structures/top-researchment-structures/top-researchment-structures.component';
import { ResearchmentStructuresByQSComponent } from '../categories/researchment-structures/researchment-structures-chart-by-qs/researchment-structures-chart-by-qs.component';
import { ResearchmentStructuresByFinancingComponent } from '../categories/researchment-structures/researchment-structures-chart-by-financing/researchment-structures-chart-by-financing.component';
import { ResearchmentStructuresDetailComponent } from '../categories/researchment-structures-detail/researchment-structures-detail.component';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';


/**
 * Clase de ayuda para construcción de tests unitarios.
 */
export class TranslateServiceStub {
  public onLangChange = new EventEmitter<any>();
  public onTranslationChange = new EventEmitter<any>();
  public onDefaultLangChange = new EventEmitter<any>();
  public addLangs(langs: string[]) { return; }
  public getLangs() { return ['en-us']; }
  public getBrowserLang() { return ''; }
  public getBrowserCultureLang() { return ''; }
  public use(lang: string) { return null; }
  // tslint:disable-next-line:no-reserved-keywords
  public get(key: any): any { return of(key); }
  instant(): string {
    return 'some_string';
  }
}
@Pipe({ name: 'translate' })
export class TranslatePipeStub implements PipeTransform {
  public transform(key: string, ...args: any[]): any { return key; }
}
export class TestingHelper {
  public static configureTest(): typeof TestBed {
    return TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        TranslatePipeStub,
        PatentsComponent,
        LoginComponent,
        MainComponent,
        HomeComponent,
        SPARQLEditorComponent,
        ScientistSearchComponent,
        TreeComponent,
        NewTreeComponent,
        ProyectsComponent,
        PatentsComponent,
        TreeComponent,
        NewTreeComponent,
        DocumentsComponent,
        ParticipantsComponent,
        DeliverableComponent,
        ProjectsDetailComponent,
        ScientistComponent,
        InvestigationActionsComponent,
        ScientistDetailComponent,
        DirectedJobsComponent,
        StartupComponent,
        AreasComponent,
        LinksComponent,
        EventsComponent,
        BusinessComponent,
        AreasDetailComponent,
        ScientificProductionComponent,
        DocumentDetailComponent,
        EventDetailComponent,
        StatisticsComponent,
        AllResearchmentStructuresComponent,
        TopResearchmentStructuresComponent,
        ResearchmentStructuresByQSComponent,
        ResearchmentStructuresByFinancingComponent,
        ResearchmentStructuresDetailComponent
      ],
      imports: [
        BrowserModule,
        AlertModule.forRoot(),
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgbModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: this.createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        ToastrModule.forRoot(),
        PaginationModule.forRoot(),
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressRouterModule,
        NgSelectModule,
        LeafletModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
        TabsModule.forRoot(),
      ],
      providers: [
        AuthGuard,
        UserService,
        KeycloakService,
        { provide: TranslateService, useClass: TranslateServiceStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenizedInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OAuthInterceptor,
          multi: true,
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        }
      ]
    });
  }

  private static createTranslateLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
  }
}
