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
import { ResearchmentStructuresByFinancingComponent } from './researchment-structures/researchment-structures-chart-by-financing/researchment-structures-chart-by-financing.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { ResearchmentStructuresByQSComponent } from './researchment-structures/researchment-structures-chart-by-qs/researchment-structures-chart-by-qs.component';
import { TreeComponent } from '../graphic/tree/tree.component';
import { GraphicComponent } from '../graphic/graphic.component';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { TopSearchComponent } from '../common/top-search/top-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentsComponent } from '../common/documents/documents.component';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { ParticipantsComponent } from '../common/participants/participants.component';
import { DeliverableComponent } from '../common/deliverable/deliverable.component';
import { ScientistComponent } from './scientist/scientist.component';

@NgModule({
  declarations: [ResearchmentStructuresComponent, ResearchmentStructuresDetailComponent, AllResearchmentStructuresComponent,
    TopResearchmentStructuresComponent, ResearchmentStructuresByFinancingComponent, ResearchmentStructuresByQSComponent,
    InvestigationActionsComponent, TreeComponent, GraphicComponent, NewTreeComponent, PatentsComponent,
    ProyectsComponent, ScientistSearchComponent, TopSearchComponent, DocumentsComponent,
    ProjectsDetailComponent, ParticipantsComponent, DeliverableComponent, ScientistComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    NgxEchartsModule,
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
