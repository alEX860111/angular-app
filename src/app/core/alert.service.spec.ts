import { AlertService } from './alert.service';

describe('AlertService', () => {

  let snackBarMock;

  let alertService: AlertService;

  beforeEach(() => {
    snackBarMock = jasmine.createSpyObj('snackBarMock', ['open']);
    alertService = new AlertService(snackBarMock);
  });

  it('alertSuccess', () => {
    alertService.alertSuccess('my message');
    expect(snackBarMock.open).toHaveBeenCalled();
    expect(snackBarMock.open.calls.argsFor(0)[0]).toEqual('my message');
    expect(snackBarMock.open.calls.argsFor(0)[2].duration).toEqual(5000);
  });

  it('alertError', () => {
    alertService.alertError('my message');
    expect(snackBarMock.open).toHaveBeenCalled();
    expect(snackBarMock.open.calls.argsFor(0)[0]).toEqual('my message');
    expect(snackBarMock.open.calls.argsFor(0)[2].duration).toEqual(5000);
    expect(snackBarMock.open.calls.argsFor(0)[2].extraClasses).toEqual(['alert-error']);
  });

});
