import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { AreasComponent } from './areas/areas.component';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { ScientistDetailComponent } from './scientist-detail/scientist-detail.component';
import { ScientistComponent } from './scientist/scientist.component';
import { AreasDetailComponent } from './areas/areas-detail/areas-detail.component';
import { ScientificProductionComponent } from './scientific-production/scientific-production.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: 'researchmentStructures',
    component: ResearchmentStructuresComponent,
  },
  {
    path: 'researchmentStructures/:id',
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
    path: 'researchmentStructures/:proyect/project/:id',
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
    path: 'areas/:area',
    component: AreasDetailComponent
  },
  {
    path: 'scientific-production',
    component: ScientificProductionComponent
  },
  {
    path: 'document/:id',
    component: DocumentDetailComponent
  },
  {
    path: 'event/:id',
    component: EventDetailComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
