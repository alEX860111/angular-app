import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

import { HomeComponent } from './home.component';
import { MessageService } from './message.service';

describe('HomeComponent', function () {

  const TEST_MESSAGE = 'test';

  let serviceMock: MessageService;

  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HomeComponent]
    });
  });

  beforeEach(() => {
    const spy = jasmine.createSpyObj('serviceMock', ['getMessage']);
    spy.getMessage.and.returnValue(Promise.resolve(TEST_MESSAGE));
    serviceMock = spy;
    TestBed.overrideComponent(HomeComponent, {
      set: {
        providers: [{ provide: MessageService, useValue: serviceMock }, { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }]
      }
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
    });
  }));

  it('should be created', () => {
    expect(fixture.componentInstance instanceof HomeComponent).toBe(true);
  });

  it('should render the message in a p element', async(() => {
    fixture.detectChanges();
    expect(serviceMock.getMessage).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.componentInstance.msg).toEqual(TEST_MESSAGE);
    });
  }));

});
