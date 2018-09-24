import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;
  let stubValue = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });

    var store = {
      key: stubValue
    };

    spyOn(localStorage, 'getItem').and.callFake(key => {
      return store[key];
    });
  
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake(key => {
      delete store[key];
    });

    storageService = TestBed.get(StorageService);
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('#get should return stubbed key', () => {
    const stubKey = 'key';
    expect(storageService.get(stubKey)).toBe(stubValue);
  });

  it('#set should set stubbed key', () => {
    const key = 'k';
    const stubValue = 'v';
    storageService.set(key, stubValue);
    expect(storageService.get(key)).toBe(stubValue);
  });

  it('#clear should clear stubbed key', () => {
    const key = 'key';
    storageService.clear(key);
    expect(storageService.get(key)).toBe(undefined);
  });
});
