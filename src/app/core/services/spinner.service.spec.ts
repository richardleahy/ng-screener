import { TestBed, inject } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let spinnerService: SpinnerService;
  let dummyEl: HTMLElement;

  beforeEach(() => {
    dummyEl = document.createElement('div');

    TestBed.configureTestingModule({
      providers: [SpinnerService]
    });

    spyOn(document, 'getElementById').and.callFake(selector => {
      return dummyEl;
    });
    
    spinnerService = TestBed.get(SpinnerService);
  });

  it('should be created', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));

  it('#show should set display to block', () => {
    spinnerService.show();
    expect(dummyEl.style['display']).toBe('block');
  });

  it('#hide should set display to none', () => {
    spinnerService.hide();
    expect(dummyEl.style['display']).toBe('none');
  });
});
