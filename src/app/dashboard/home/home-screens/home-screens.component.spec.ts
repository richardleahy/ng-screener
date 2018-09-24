import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreensComponent } from './home-screens.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HttpClient } from '@angular/common/http';
import { ScreenService } from '../../screens/services/screen.service';
import { of } from 'rxjs';
import { HttpResult } from '../../../core/services/http-result';

describe('HomeScreensComponent', () => {
  let component: HomeScreensComponent;
  let fixture: ComponentFixture<HomeScreensComponent>;
  let screenServiceSpy: jasmine.SpyObj<ScreenService>;

  beforeEach(async(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const screenSpy = jasmine.createSpyObj('ScreenService', ['getScreens']);
    screenSpy.getScreens.and.returnValue(
      of(new HttpResult(
        true,
        [{pk: 1, name: "test"}]
      ))
    );
    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RoundProgressModule
      ],
      declarations: [ HomeScreensComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: ScreenService, useValue: screenSpy},
      ]
    })
    .compileComponents();

    screenServiceSpy = TestBed.get(ScreenService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getScreens should return screens', () => {
    expect(screenServiceSpy.getScreens.calls.count()).toBe(1);
    expect(component.current).toBe(1);
 
  });
});
