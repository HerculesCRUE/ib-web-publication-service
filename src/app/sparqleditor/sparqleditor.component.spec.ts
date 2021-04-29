import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPARQLEditorComponent } from './sparqleditor.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { yasgui } from 'src/environments/environment';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';
import { LoginService } from '../_services/login.service';
import { GraphicService } from '../_services/graphic.service';
import { MockGraphicService } from '../_services/_testingServices/mockGraphic.service';
import { SparqlService } from '../_services/sparql.service';
import { MockSparql } from '../_services/_testingServices/mockSparql.service';

describe('SPARQLEditorComponent', () => {
  let component: SPARQLEditorComponent;
  let fixture: ComponentFixture<SPARQLEditorComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService },
      { provide: GraphicService, useClass: MockGraphicService },
      { provide: SparqlService, useClass: MockSparql }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPARQLEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.yasqe).toBeDefined();

    expect(component.yasqe.config.requestConfig.endpoint).toBe(yasgui.endpoint);
    expect(component.yasqe.config.requestConfig.method).toBe(yasgui.method);
  });

  describe('federChangeCheck', () => {
    it('federChangeCheck with false value', () => {
      component.federChangeCheck(false);
      expect(component.yasqe).toBeDefined();

      expect(component.yasqe.config.requestConfig.endpoint).toBe(yasgui.endpoint);
      expect(component.yasqe.config.requestConfig.method).toBe(yasgui.method);
    });


    it('federChangeCheck with true value', () => {
      component.federChangeCheck(true);
      expect(component.yasqe).toBeDefined();

      expect(component.yasqe.config.requestConfig.endpoint).toBe(yasgui.endpointFeder);
      expect(component.yasqe.config.requestConfig.method).toBe(yasgui.methodFeder);
    });
  });
});
