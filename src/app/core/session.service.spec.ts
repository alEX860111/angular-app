import { Session } from './session';
import { SessionService } from './session.service';

describe('SessionService', () => {

  let tokenServiceMock;

  let jwtHelperMock;

  let sessionService: SessionService;

  beforeEach(() => {
    tokenServiceMock = jasmine.createSpyObj('tokenServiceMock', ['getToken', 'setToken', 'clearToken']);
    jwtHelperMock = jasmine.createSpyObj('jwtHelperMock', ['decodeToken', 'getTokenExpirationDate']);
    sessionService = new SessionService(tokenServiceMock, jwtHelperMock);
  });

  describe('getSession', () => {

    it('should return the session if the token is present', () => {
      const token = '123abc';
      tokenServiceMock.getToken.and.returnValue(token);

      const decodedToken = { username: 'zoe', userId: '42xy', role: 'user', more: 'info', iat: 0 };
      jwtHelperMock.decodeToken.and.returnValue(decodedToken);
      const expirationDate = new Date(Date.now() * 10);
      jwtHelperMock.getTokenExpirationDate.and.returnValue(expirationDate);

      const session = sessionService.getSession();

      const expectedSession = new Session();
      expectedSession.username = 'zoe';
      expectedSession.userId = '42xy';
      expectedSession.role = 'user';
      expectedSession.expirationDate = expirationDate;
      expectedSession.loginDate = new Date(0);

      expect(session).toEqual(expectedSession);

      expect(tokenServiceMock.getToken).toHaveBeenCalled();
      expect(jwtHelperMock.decodeToken).toHaveBeenCalledWith(token);
    });

    it('should return null if the token is not present', () => {
      tokenServiceMock.getToken.and.returnValue(null);

      const session: Session = sessionService.getSession();

      expect(session).toBe(null);

      expect(tokenServiceMock.getToken).toHaveBeenCalled();
      expect(jwtHelperMock.decodeToken).not.toHaveBeenCalled();
    });

  });

  it('destroySession', () => {
    sessionService.destroySession();

    expect(tokenServiceMock.clearToken).toHaveBeenCalled();
  });

  it('createSession', () => {
    const token = '123';
    tokenServiceMock.getToken.and.returnValue(token);

    const decodedToken = { username: 'zoe', userId: '42xy', role: 'user', more: 'info', iat: 0 };
    jwtHelperMock.decodeToken.and.returnValue(decodedToken);
    const expirationDate = new Date(Date.now() * 10);
    jwtHelperMock.getTokenExpirationDate.and.returnValue(expirationDate);

    const session: Session = sessionService.createSession(token);

    expect(tokenServiceMock.setToken).toHaveBeenCalledWith(token);

    const expectedSession = new Session();
    expectedSession.username = 'zoe';
    expectedSession.userId = '42xy';
    expectedSession.role = 'user';
    expectedSession.expirationDate = expirationDate;
    expectedSession.loginDate = new Date(0);
    expect(session).toEqual(expectedSession);
  });

});
