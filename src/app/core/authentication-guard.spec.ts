import { AuthenticationGuard } from './authentication-guard';
import { Session } from './session';

describe('AuthenticationGuard', () => {

  let sessionServiceMock;

  let authenticationServiceMock;

  let routerMock;

  let authenticationGuard: AuthenticationGuard;

  let routerStateSnapshotMock;

  beforeEach(() => {
    sessionServiceMock = jasmine.createSpyObj('sessionServiceMock', ['getSession', 'isSessionExpired']);
    authenticationServiceMock = jasmine.createSpyObj('authenticationServiceMock', ['setRedirectUrl']);
    routerMock = jasmine.createSpyObj('routerMock', ['navigate']);

    authenticationGuard = new AuthenticationGuard(sessionServiceMock, authenticationServiceMock, routerMock);

    routerStateSnapshotMock = jasmine.createSpy('routerStateSnapshotMock');
    routerStateSnapshotMock.url = '/home';
  });

  describe('canActivate', () => {

    it('should return true if the session is not expired', () => {
      const session = new Session();
      sessionServiceMock.getSession.and.returnValue(session);
      sessionServiceMock.isSessionExpired.and.returnValue(false);

      const result = authenticationGuard.canActivate(null, routerStateSnapshotMock);

      expect(result).toBe(true);

      expect(sessionServiceMock.getSession).toHaveBeenCalled();
      expect(sessionServiceMock.isSessionExpired).toHaveBeenCalledWith(session);

      expect(authenticationServiceMock.setRedirectUrl).not.toHaveBeenCalled();

      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should return false if the session is expired', () => {
      const session = new Session();
      sessionServiceMock.getSession.and.returnValue(session);
      sessionServiceMock.isSessionExpired.and.returnValue(true);

      const result = authenticationGuard.canActivate(null, routerStateSnapshotMock);

      expect(result).toBe(false);

      expect(sessionServiceMock.getSession).toHaveBeenCalled();
      expect(sessionServiceMock.isSessionExpired).toHaveBeenCalledWith(session);

      expect(authenticationServiceMock.setRedirectUrl).toHaveBeenCalledWith('/home');

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should return false if session does not exist', () => {
      sessionServiceMock.getSession.and.returnValue(null);

      const result = authenticationGuard.canActivate(null, routerStateSnapshotMock);

      expect(result).toBe(false);

      expect(sessionServiceMock.getSession).toHaveBeenCalled();
      expect(sessionServiceMock.isSessionExpired).not.toHaveBeenCalled();

      expect(authenticationServiceMock.setRedirectUrl).toHaveBeenCalledWith('/home');

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

  });

});
