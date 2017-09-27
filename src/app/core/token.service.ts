import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class TokenService {

  private key = 'token';

  constructor(private storageService: StorageService) { }

  getToken(): string {
    return this.storageService.get(this.key);
  }

  setToken(token: string) {
    this.storageService.set(this.key, token);
  }

  clearToken() {
    this.storageService.remove(this.key);
  }

}
