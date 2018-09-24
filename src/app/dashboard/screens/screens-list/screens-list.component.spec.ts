import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensListComponent } from './screens-list.component';
import { MiscModule } from '../../misc/misc.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../../layout/layout.module';
import { HttpClient } from '@angular/common/http';
import { ScreenService } from '../services/screen.service';
import { of } from 'rxjs';
import { FilterPipe } from '../pipes/filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResult } from '../../../core/services/http-result';
import { Screen } from '../screen';

describe('ScreensListComponent', () => {
  let component: ScreensListComponent;
  let fixture: ComponentFixture<ScreensListComponent>;
  let screenServiceSpy: jasmine.SpyObj<ScreenService>;
  let screens: Screen[];

  beforeEach(async(() => {

    screens = [{
      name: "test",
      pk: 1,
      questions: []
    }];

    const screenSpy = jasmine.createSpyObj('ScreenService', ['getScreens', 'deleteScreen']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    screenSpy.getScreens.and.returnValue(
      of(new HttpResult(true, screens))
    );

    TestBed.configureTestingModule({
      imports: [
        MiscModule, 
        FontAwesomeModule, 
        FormsModule,
        LayoutModule,
        RouterTestingModule
      ],
      declarations: [ ScreensListComponent, FilterPipe ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: ScreenService, useValue: screenSpy},
      ]
    })
    .compileComponents();

    screenServiceSpy = TestBed.get(ScreenService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getScreens should return screens', () => {
    expect(component.screens).toBe(screens);
  });

  it('#deleteScreen should delete screen', () => {
    screenServiceSpy.deleteScreen.and.returnValue(
      of(new HttpResult(true))
    );
    component.deleteScreen(screens[0]);
    expect(component.screens).toEqual([]);
  });
});
