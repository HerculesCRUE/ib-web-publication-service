import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { TestingHelper } from '../_helpers/testing.spec';
import { EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { MockLoginService } from '../_services/_testingServices/mockLogin.service';
export class TranslateServiceStub {
  public onLangChange = new EventEmitter<any>();
  public onTranslationChange = new EventEmitter<any>();
  public onDefaultLangChange = new EventEmitter<any>();
  public addLangs(langs: string[]) { return; }
  public getLangs() { return ['en-us']; }
  public getBrowserLang() { return ''; }
  public getBrowserCultureLang() { return ''; }
  public use(lang: string) { return null; }
  // tslint:disable-next-line:no-reserved-keywords
  public get(key: any): any { return of(key); }
  instant(): string {
    return 'some_string';
  }
}
@Pipe({ name: 'translate' })
export class TranslatePipeStub implements PipeTransform {
  public transform(key: string, ...args: any[]): any { return key; }
}
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useClass: MockLoginService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
