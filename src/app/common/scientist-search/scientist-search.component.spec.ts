import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AreasService } from 'src/app/_services/areas.service';
import { GraphicService } from 'src/app/_services/graphic.service';
import { ProjectService } from 'src/app/_services/project.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { ScientistSearchComponent } from './scientist-search.component';

describe('ScientistSearchComponent', () => {
  let component: ScientistSearchComponent;
  let fixture: ComponentFixture<ScientistSearchComponent>;
  let researchStaffService: MockResearchStaffService;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ResearchStaffService, useClass: MockResearchStaffService },
      { provide: GraphicService, useClass: MockGraphicService },
      { provide: AreasService, useClass: MockAreaservice },
      { provide: ProjectService, useClass: MockProjectService }

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistSearchComponent);
    component = fixture.componentInstance;
    researchStaffService = TestBed.inject(MockResearchStaffService);
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(graphicService, 'personArea').and.callThrough();
    expect(component).toBeTruthy();
  });


  describe('filter Top results', () => {
    it('should filter by type', () => {
      component.filterTop('74', 'appointments');
      spyOn(researchStaffService, 'find').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBeUndefined();
    });

    it('should return all values by filtering by empty filter', () => {
      component.filterTop('undefined', 'type');
      spyOn(researchStaffService, 'find').and.callThrough();
      expect(component.allScientificsFiltered.totalElements).toBeUndefined();
    });
  });

})
