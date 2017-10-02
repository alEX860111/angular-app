import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

import { UserService } from './user.service';
import { ChangePasswordRequest } from './change-password-request';

describe('UserService', () => {

  let http, logService;

  let userService: UserService;

  beforeEach(() => {
    http = jasmine.createSpyObj('authHttp', ['put']);

    logService = jasmine.createSpyObj('logService', ['logError']);

    userService = new UserService(http, logService);
  });

  describe('changePassword', () => {

    it('success', () => {
      http.put.and.returnValue(Observable.of({}));
      const expectedUrl = '/api/users/123abc';

      const changePasswordRequest = new ChangePasswordRequest();
      const userId = '123abc';

      userService.changePassword(changePasswordRequest, userId).subscribe(id => {
        expect(id).toEqual(userId);
      }, fail);

      const args = http.put.calls.argsFor(0);
      expect(args[0]).toEqual(expectedUrl);
      expect(args[1]).toEqual(JSON.stringify(changePasswordRequest));
      const headers: Headers = args[2].headers;
      expect(headers.get('Content-Type')).toEqual('application/json');
    });

    it('error', () => {
      const expectedError = new Error();
      http.put.and.returnValue(Observable.throw(expectedError));

      const expectedUrl = '/api/users/123abc';

      const changePasswordRequest = new ChangePasswordRequest();
      const userId = '123abc';

      userService.changePassword(changePasswordRequest, userId).subscribe(fail, error => {
        expect(error).toBe(expectedError);
      });

      expect(logService.logError).toHaveBeenCalledWith(expectedError);

      const args = http.put.calls.argsFor(0);
      expect(args[0]).toEqual(expectedUrl);
      expect(args[1]).toEqual(JSON.stringify(changePasswordRequest));
      const headers: Headers = args[2].headers;
      expect(headers.get('Content-Type')).toEqual('application/json');
    });

  });

});
