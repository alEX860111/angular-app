import { Timespan } from './timespan';

describe('Timespan', () => {

  it('one day', () => {
    const timespan = Timespan.create(86400 * 1000);
    expect(timespan.days).toEqual(1);
    expect(timespan.hours).toEqual(0);
    expect(timespan.minutes).toEqual(0);
    expect(timespan.seconds).toEqual(0);
  });

  it('one day, one hour, one minute, one second', () => {
    const timespan = Timespan.create(90061 * 1000);
    expect(timespan.days).toEqual(1);
    expect(timespan.hours).toEqual(1);
    expect(timespan.minutes).toEqual(1);
    expect(timespan.seconds).toEqual(1);
  });

  it('negative', () => {
    const timespan = Timespan.create(-1);
    expect(timespan.days).toEqual(0);
    expect(timespan.hours).toEqual(0);
    expect(timespan.minutes).toEqual(0);
    expect(timespan.seconds).toEqual(0);
  });

});
