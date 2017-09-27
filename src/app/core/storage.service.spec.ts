import { StorageService } from './storage.service';

describe('StorageService', () => {

  let storageService: StorageService;

  describe('window sessionStorage exists', () => {

    let sessionStorageMock;

    beforeEach(() => {
      sessionStorageMock = jasmine.createSpyObj('sessionStorageMock', ['setItem', 'getItem', 'removeItem']);
      const windowServiceMock = jasmine.createSpyObj('windowServiceMock', ['getWindow']);
      windowServiceMock.getWindow.and.returnValue({ sessionStorage: sessionStorageMock });
      storageService = new StorageService(windowServiceMock);
    });

    it('set', () => {
      storageService.set('key', 'value');
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('get', () => {
      storageService.get('key');
      expect(sessionStorageMock.getItem).toHaveBeenCalledWith('key');
    });

    it('remove', () => {
      storageService.remove('key');
      expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('key');
    });

  });

  describe('window sessionStorage does not exist - fallback to in-memory storage', () => {

    beforeEach(() => {
      const windowServiceMock = jasmine.createSpyObj('windowServiceMock', ['getWindow']);
      windowServiceMock.getWindow.and.returnValue(null);
      storageService = new StorageService(windowServiceMock);
    });

    it('set - get - remove', () => {
      storageService.set('key', 'value');
      expect(storageService.get('key')).toEqual('value');
      storageService.remove('key');
      expect(storageService.get('key')).not.toBeDefined();
    });

  });

});
