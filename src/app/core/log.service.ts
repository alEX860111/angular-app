import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  logError(error: any) {
    console.error(error);
  }

}
