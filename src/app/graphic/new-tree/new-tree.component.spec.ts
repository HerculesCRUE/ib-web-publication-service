import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AreasService } from 'src/app/_services/areas.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';

import { NewTreeComponent } from './new-tree.component';

describe('NewTreeComponent', () => {
  let component: NewTreeComponent;
  let fixture: ComponentFixture<NewTreeComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: AreasService, useClass: MockAreaservice }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('area Clicked', () => {
    it('expect to emit value on array filter', () => {
      const area = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      component.areaClicked(area, null);
      expect(component.filter[0]).toBe('CTQ');
    });

    it('expect to emit value of IMQ', () => {
      component.filter = ['CTQ'];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: false,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });

    it('delete parent from filter when clicking on child', () => {
      component.filter = ['CTQ'];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });

    it('emit data without deleting parents data because its not in the array', () => {
      component.filter = [];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });

    it('expected only to emit parents data, no area data', () => {
      component.filter = ['CTQ'];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['CTQ']);
    });


    it('expect not to find parent value in filter and to emit value of IMQ', () => {
      component.filter = [];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: false,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });


    it('expect to not add anything to filter array', () => {
      component.filter = [];
      const area = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: false,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      component.areaClicked(area, null);
      expect(component.filter.length).toBe(0);
    });

  });

  describe('remove Insede Object', () => {
    it('it should remove IQM from filter array ', () => {
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: false,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      component.filter = ['IQM'];
      component.removeInsedeObject(area, parent);
      expect(component.filter.length).toBe(0);
    });

    it('it should add CTQ and delete IQM from filter array ', () => {
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      component.filter = ['IQM'];
      component.removeInsedeObject(area, parent);
      expect(component.filter.length).toBe(1);
      expect(component.filter[0]).toBe('CTQ');
    });

    it('it should add CTQ and delete IQM and QM2 from filter array ', () => {
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, children: [
          { name: 'Ingeniería Química 2', value: 'IQ2', selected: false, children: [] },
          { name: 'Química 2', value: 'QM2', selected: false, children: [] }
        ]
      };
      component.filter = ['IQM', 'QM2'];
      component.removeInsedeObject(area, parent);
      expect(component.filter.length).toBe(1);
      expect(component.filter[0]).toBe('CTQ');
    });


    it('expect to call again removeInsedeObject because area has children inside children', () => {
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, children: [
          {
            name: 'Ingeniería Química 2', value: 'IQ2', selected: false, children: [
              { name: 'Química 2', value: 'QM2', selected: false, children: [] }
            ]
          },
          { name: 'Química 2', value: 'QM2', selected: false, children: [] }
        ]
      };
      component.filter = ['IQM', 'QM2'];
      spyOn(component, 'removeInsedeObject');
      component.removeInsedeObject(area, parent);
      expect(component.removeInsedeObject).toHaveBeenCalledTimes(1);
    });
  });
});
