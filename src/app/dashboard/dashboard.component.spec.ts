import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MiscModule } from './misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerService } from '../core/services/spinner.service';
import spinnerServiceStub from '../../testing/spinner-service-stub';
import { StorageService } from '../core/services/storage.service';
import { HttpClient } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const storageServiceSpy = jasmine.createSpy('StorageService');
    const httpClientSpy = jasmine.createSpy('HttpClient');
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ DashboardComponent ],
      providers: [
        {provide: SpinnerService, useValue: spinnerServiceStub},
        {provide: StorageService, useValue: storageServiceSpy},
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
