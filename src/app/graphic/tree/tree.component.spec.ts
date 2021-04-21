import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { AreasService } from 'src/app/_services/areas.service';
import { MockAreaservice } from 'src/app/_services/_testingServices/mockAreas.service';

import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: AreasService, useClass: MockAreaservice }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'Áreas',
      children: [
        {
          name: 'Abstracts',
          value: 'ABS',
          selected: false,
          children: []
        },
        {
          name: 'Publicación académica',
          value: 'PUA',
          selected: true,
          children: [
            {
              name: 'Tesis',
              value: 'TES',
              selected: false,
              children: [{ name: 'Tesis de bachiller', value: 'TEB', selected: false, children: [] },
              { name: 'Tesis de doctoral', value: 'TED', selected: false, children: [] },
              { name: 'Tesis de master', value: 'TEM', selected: false, children: [] }]
            },
            { name: 'Contenido audiovisual', value: 'COV', selected: false, children: [] },
            { name: 'Catalogo', value: 'CAT', selected: false, children: [] }
          ]
        },
        {
          name: 'Artículo', value: 'ART', selected: false, children: [
            { name: 'Artículo Técnico', value: 'ATE', selected: false, children: [] }
          ]
        },
        { name: 'Publicación científica', value: 'PUC', selected: false, children: [] }

      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not find Style', () => {
    const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] };
    const result = component.findStyle(node);
    expect(result).toBeFalsy();
  });

  it('should find Style', () => {
    const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' };
    const result = component.findStyle(node);
    expect(result).toBeTruthy();
  });


  describe('is First Line', () => {
    it('is First Line expect to return no, because there is no children', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería Química');
      expect(result).toBeFalsy();
    });
    it('is First Line should return true because it has children', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' }], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería Química');
      expect(result).toBeTruthy();
    });
    it('is First Line should return true because it has children but no match because of different name', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' }], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería');
      expect(result).toBeFalsy();
    });
  });

  describe('clean Node', () => {
    it('should change color node to grey', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: { color: '' } }],
      };
      component.cleanNode(node, 'Ingeniería Química');
      fixture.detectChanges();
      expect(node.children[0].lineStyle.color).toBe('grey')
    });

    it('should change color node to grey and assign object', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] }],
      };
      component.cleanNode(node, 'Ingeniería Química');
      fixture.detectChanges();
      expect(node.children[0].hasOwnProperty('lineStyle')).toBeTruthy();
    });


  });

  describe('search Insede Nodes', () => {
    it('search should find node', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería');
      expect(result).toBeTruthy();
    });

    it('search should not find node', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });

    it('search should not find node but search inside next children', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: false,
            children: [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }], lineStyle: { color: 'black' }
          }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });

    it('search should not find node but not search inside children', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });
  });

  describe('isNodeSelected', () => {
    it('should return true because node is selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: true, children: [
              { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [], lineStyle: { color: 'black' } }
            ], lineStyle: { color: 'black' }
          }],
      };
      const result = component.isNodeSelected(node, 'Ingeniería Química');
      expect(result).toBeTruthy();
    });

    it('should return true because node is not selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.isNodeSelected(node, 'Ingeniería Química');
      expect(result).toBeFalsy();
    });

    it('should return true because node is not selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: false, children: [
              { name: 'Ingeniería 2', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }
            ], lineStyle: { color: 'black' }
          }],
      };
      const result = component.isNodeSelected(node, 'Matematica');
      expect(result).toBeFalsy();
    });

    it('should return true because node is not selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: false, children: [
              { name: 'Ingeniería 2', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }
            ], lineStyle: { color: 'black' }
          }],
      };
      const result = component.isNodeSelected(node, 'Matematica');
      expect(result).toBeFalsy();
    });
  });

});
