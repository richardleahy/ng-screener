import { Injectable } from '@angular/core';

/**
 * Class representing a StorageService.
 */
@Injectable()
export class StorageService {

  constructor() { }

  /**
   * Get the data associated with the key.
   * @param {string} key - local storage key. 
   */
  get(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * Set data assocaited with key.
   * @param {string} key - key to use.
   * @param {string} value - value to set. 
   */
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * Remove data associated with local storage key.
   * @param {string} key - key to use.
   */
  clear(key: string) {
    localStorage.removeItem(key);
  }
}
