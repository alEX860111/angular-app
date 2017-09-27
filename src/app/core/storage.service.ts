import { Injectable } from '@angular/core';

import { WindowService } from './window.service';

@Injectable()
export class StorageService {

  private sessionStorage;

  private fallbackStorage;

  constructor(windowService: WindowService) {
    const window = windowService.getWindow();
    if (window) {
      this.sessionStorage = window.sessionStorage;
    }
    this.fallbackStorage = {};
  }

  public set(key: string, value: string) {
    if (this.sessionStorage) {
      this.sessionStorage.setItem(key, value);
    } else {
      this.fallbackStorage[key] = value;
    }
  }

  public get(key: string): string {
    if (this.sessionStorage) {
      return this.sessionStorage.getItem(key);
    } else {
      return this.fallbackStorage[key];
    }
  }

  public remove(key: string) {
    if (this.sessionStorage) {
      this.sessionStorage.removeItem(key);
    } else {
      delete this.fallbackStorage.key;
    }
  }

}
