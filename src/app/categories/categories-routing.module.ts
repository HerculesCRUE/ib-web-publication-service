import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { AreasComponent } from './areas/areas.component';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { ScientistDetailComponent } from './scientist-detail/scientist-detail.component';
import { ScientistComponent } from './scientist/scientist.component';
import { ScientificProductionComponent } from './scientific-production/scientific-production.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PatentDetailComponent } from '../common/patent-detail/patent-detail.component';
import { ScientificPublicationDetailComponent } from './scientific-publication-detail/scientific-publication-detail.component';
import { NewDataImporterComponent } from './data-importer/new-data-importer/new-data-importer.component';
import { NewValidatorComponent } from './validator/new-validator/new-validator.component';
import { SearchLdpResultComponent } from './ldp/search-result/search-ldp-result.component';

const routes: Routes = [
  {
    path: 'researchmentStructures',
    component: ResearchmentStructuresComponent,
  },
  {
    path: 'researchmentStructures/:id/:type',
    component: ResearchmentStructuresDetailComponent,
  },
  {
    path: 'investigation-actions',
    component: InvestigationActionsComponent,
  },
  {
    path: 'investigation-actions/project/:id',
    component: ProjectsDetailComponent,
  },
  {
    path: 'project/:id',
    component: ProjectsDetailComponent,
  },
  {
    path: 'scientist',
    component: ScientistComponent,
  },
  {
    path: 'scientist/:id',
    component: ScientistDetailComponent,
  },
  {
    path: 'areas',
    component: AreasComponent
  }
  ,
  {
    path: 'scientific-production',
    component: ScientificProductionComponent
  },
  {
    path: 'document/:id/:type',
    component: DocumentDetailComponent
  },
  {
    path: 'event/:id/:type',
    component: EventDetailComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: 'patent/:id',
    component: PatentDetailComponent
  },
  {
    path: 'scientificpublication/:id',
    component: ScientificPublicationDetailComponent
  },
  {
    path: 'new-data-importer',
    component: NewDataImporterComponent
  },
  {
    path: 'new-validator',
    component: NewValidatorComponent
  },
  {
    path: 'ldp-search-result',
    component: SearchLdpResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
