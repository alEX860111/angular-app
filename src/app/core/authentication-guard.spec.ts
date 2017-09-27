import { AuthenticationGuard } from './authentication-guard';
import { Session } from './session';

describe('AuthenticationGuard', () => {

  let sessionServiceMock;

  let routerMock;

  let authenticationGuard: AuthenticationGuard;

  let routerStateSnapshotMock;

  beforeEach(() => {
    sessionServiceMock = jasmine.createSpyObj('sessionServiceMock', ['getSession']);
    routerMock = jasmine.createSpyObj('routerMock', ['navigate']);

    authenticationGuard = new AuthenticationGuard(sessionServiceMock, routerMock);

    routerStateSnapshotMock = jasmine.createSpy('routerStateSnapshotMock');
    routerStateSnapshotMock.url = '/home';
  });

  describe('canActivate', () => {

    it('should return true if session exists', () => {
      const session = new Session();
      sessionServiceMock.getSession.and.returnValue(session);

      const result = authenticationGuard.canActivate(null, routerStateSnapshotMock);

      expect(result).toBe(true);

      expect(sessionServiceMock.getSession).toHaveBeenCalled();

      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should return false if session does not exist', () => {
      sessionServiceMock.getSession.and.returnValue(null);

      const result = authenticationGuard.canActivate(null, routerStateSnapshotMock);

      expect(result).toBe(false);

      expect(sessionServiceMock.getSession).toHaveBeenCalled();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

  });

});
