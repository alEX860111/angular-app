import { TokenService } from './token.service';

describe('TokenService', () => {

  let tokenService: TokenService;

  let storageService;

  beforeEach(() => {
    storageService = jasmine.createSpyObj('storageService', ['get', 'set', 'remove']);
    tokenService = new TokenService(storageService);
  });

  it('getToken', () => {
    storageService.get.and.returnValue('123abc');
    const token = tokenService.getToken();
    expect(token).toEqual('123abc');
    expect(storageService.get).toHaveBeenCalledWith('token');
  });

  it('setToken', () => {
    tokenService.setToken('123abc');
    expect(storageService.set).toHaveBeenCalledWith('token', '123abc');
  });

  it('clearToken', () => {
    tokenService.clearToken();
    expect(storageService.remove).toHaveBeenCalledWith('token');
  });

});
