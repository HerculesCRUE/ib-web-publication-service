import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { LoginService } from 'src/app/_services/login.service';
import { SparqlService } from 'src/app/_services/sparql.service';
import { MockLoginService } from 'src/app/_services/_testingServices/mockLogin.service';
import { MockSparql } from 'src/app/_services/_testingServices/mockSparql.service';

import { QueriesManagementComponent } from './queries-management.component';

describe('QueriesManagementComponent', () => {
  let component: QueriesManagementComponent;
  let fixture: ComponentFixture<QueriesManagementComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: SparqlService, useClass: MockSparql }, { provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
