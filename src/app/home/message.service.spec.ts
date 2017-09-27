import { MessageService } from './message.service';

import { async } from '@angular/core/testing';

describe('MessageService', function () {
  it('should return a promise', async(function () {
    const service: MessageService = new MessageService();
    service.getMessage().then(msg => {
      expect(msg).toEqual('Hello World');
    });
  }));
});
