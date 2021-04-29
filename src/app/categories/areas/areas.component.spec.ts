import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { Graphic } from 'src/app/_models/graphic';
import { AreasService } from 'src/app/_services/areas.service';
import { GraphicService } from 'src/app/_services/graphic.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';
import { MockGraphicService } from 'src/app/_services/_testingServices/mockGraphic.service';

import { AreasComponent } from './areas.component';

describe('AreasComponent', () => {
  let component: AreasComponent;
  let fixture: ComponentFixture<AreasComponent>;
  let graphicService: MockGraphicService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: GraphicService, useClass: MockGraphicService },
      { provide: AreasService, useClass: MockAreaservice }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasComponent);
    component = fixture.componentInstance;
    graphicService = TestBed.inject(MockGraphicService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('it should init component', () => {
    it('it should call projectAreasPerYear on service', () => {
      const graphicService1 = fixture.debugElement.injector.get(GraphicService);
      const spy = spyOn(graphicService1, 'projectAreasPerYear').and.returnValue(of({}))
      component.ngOnInit();
      fixture.detectChanges();
      expect(graphicService1.projectAreasPerYear).toHaveBeenCalled();
    });


  });



});
