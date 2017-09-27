import { Component, OnInit, Input } from '@angular/core';
import { Timespan } from './timespan';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit {

  @Input()
  countDownDate: Date;

  timespan: Timespan;

  ngOnInit() {
    const countDownDateTime = this.countDownDate.getTime();

    this.timespan = Timespan.create(countDownDateTime - Date.now());

    const intervalId = setInterval(() => {
      const timespanInMs = countDownDateTime - Date.now();

      this.timespan = Timespan.create(timespanInMs);

      if (timespanInMs < 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

}
