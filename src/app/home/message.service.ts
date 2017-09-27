import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  getMessage() {
    return Promise.resolve('Hello World');
  }
}
