export class Timespan {

  static HOURS_PER_DAY = 24;

  static SECONDS_PER_MINUTE = 60;

  static MINUTES_PER_HOUR = 60;

  static SECONDS_PER_HOUR = Timespan.SECONDS_PER_MINUTE * Timespan.MINUTES_PER_HOUR;

  static SECONDS_PER_DAY = Timespan.SECONDS_PER_HOUR * Timespan.HOURS_PER_DAY;

  days; hours; minutes; seconds: number;

  public static create(timespanInMs: number): Timespan {
    const timespan = new Timespan();
    if (timespanInMs > 0) {
      const timespanInS = timespanInMs / 1000;
      timespan.days = Math.floor(timespanInS / Timespan.SECONDS_PER_DAY);
      timespan.hours = Math.floor((timespanInS % Timespan.SECONDS_PER_DAY) / Timespan.SECONDS_PER_HOUR);
      timespan.minutes = Math.floor((timespanInS % Timespan.SECONDS_PER_HOUR) / Timespan.SECONDS_PER_MINUTE);
      timespan.seconds = Math.floor(timespanInS % Timespan.SECONDS_PER_MINUTE);
    } else {
      timespan.days = 0;
      timespan.hours = 0;
      timespan.minutes = 0;
      timespan.seconds = 0;
    }
    return timespan;
  }

  private constructor() { }

}
