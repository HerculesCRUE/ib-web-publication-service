import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '../shared/shared.module';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { AllResearchmentStructuresComponent } from './researchment-structures/all-researchment-structures/all-researchment-structures.component';
import { TopResearchmentStructuresComponent } from './researchment-structures/top-researchment-structures/top-researchment-structures.component';
import { ResearchmentStructuresByFinancingComponent }
  from './researchment-structures/researchment-structures-chart-by-financing/researchment-structures-chart-by-financing.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { ResearchmentStructuresByQSComponent } from './researchment-structures/researchment-structures-chart-by-qs/researchment-structures-chart-by-qs.component';
import { TreeComponent } from '../graphic/tree/tree.component';
import { GraphicComponent } from '../graphic/graphic.component';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentsComponent } from '../common/documents/documents.component';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { ParticipantsComponent } from '../common/participants/participants.component';
import { DeliverableComponent } from '../common/deliverable/deliverable.component';
import { ScientistComponent } from './scientist/scientist.component';
import { ScientistDetailComponent } from './scientist-detail/scientist-detail.component';
import { DirectedJobsComponent } from '../common/directed-jobs/directed-jobs.component';
import { StartupComponent } from '../common/startup/startup.component';
import { AreasComponent } from './areas/areas.component';
import { EventsComponent } from '../common/events/events.component';
import { ScientificProductionComponent } from './scientific-production/scientific-production.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PeopleInvolvedComponent } from '../common/people-involved/people-involved.component';
import { CollaboratorsComponent } from '../common/collaborators/collaborators.component';
import { ScientificPublicationDetailComponent } from './scientific-publication-detail/scientific-publication-detail.component';
import { AreasListComponent } from '../common/areas-list/areas-list.component';
import { DataImporterComponent } from './data-importer/data-importer.component';
import { AllDataImporterStructuresComponent } from './data-importer/all-data-importer/all-data-importer-structures.component';


@NgModule({
  declarations: [ResearchmentStructuresComponent, ResearchmentStructuresDetailComponent, AllResearchmentStructuresComponent,
    TopResearchmentStructuresComponent, ResearchmentStructuresByFinancingComponent, ResearchmentStructuresByQSComponent,
    InvestigationActionsComponent, TreeComponent, GraphicComponent, NewTreeComponent, PatentsComponent,
    ProyectsComponent, ScientistSearchComponent, DocumentsComponent,
    ProjectsDetailComponent, ParticipantsComponent, DeliverableComponent, ScientistComponent, ScientistDetailComponent,
    DirectedJobsComponent, StartupComponent, AreasComponent, EventsComponent,
    ScientificProductionComponent, DocumentDetailComponent, EventDetailComponent, StatisticsComponent,
    PeopleInvolvedComponent, CollaboratorsComponent, ScientificPublicationDetailComponent, AreasListComponent, DataImporterComponent, AllDataImporterStructuresComponent
  ],
  imports: [
    NgxEchartsModule,
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    LeafletModule,
    SharedModule,
    TabsModule.forRoot(),
    TranslateModule.forChild(),
    LeafletModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ]
})
export class CategoriesModule { }
