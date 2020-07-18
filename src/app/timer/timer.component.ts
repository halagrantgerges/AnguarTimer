import { Component, OnInit } from "@angular/core";
import { tick } from "@angular/core/testing";

@Component({
  selector: "timer",
  templateUrl: "./timer.component.html",
})
export class TimerComponent {
  started: boolean;
  minutes: number;
  seconds: number;
  newMin: number;
  interval: any;
  timeLeft: any;
  dateTime: Date;
  finished: boolean;
  strMin: string;
  strSec: string;
  init: boolean = true;
  updateStrValues() {
    this.minutes = Math.floor((this.timeLeft % 3600) / 60);
    this.seconds = Math.floor((this.timeLeft % 3600) % 60);

    this.strMin = this.minutes.toString();
    this.strSec = this.seconds.toString();

    if (this.strMin.length == 1) this.strMin = "0" + this.strMin;

    if (this.strSec.length == 1) this.strSec = "0" + this.strSec;
  }
  constructor() {
    this.minutes = 25;
    this.seconds = 0;
    this.started = false;
    this.timeLeft = this.minutes * 60 + this.seconds;
    this.updateStrValues();
  }

  resetVariables(mins, secs, started) {
    this.started = started;
    this.minutes = mins;
    this.seconds = secs;
    this.timeLeft = this.minutes * 60 + this.seconds;
    this.updateStrValues();
  }

  start() {
    this.started = true;
    this.interval = setInterval(() => {
      this.intervalCallback();
    }, 1000);
  }

  intervalCallback() {
    if (this.started) {
      if (this.minutes == 0 && this.seconds == 0) {
        this.finished = true;
        this.started = false;
      } else {
        this.timeLeft = this.minutes * 60 + this.seconds;
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.updateStrValues();
        } else {
          this.started = false;
          this.finished = true;
        }
      }
    }
  }

  addFive() {
    if (this.started) {
      this.started = false;
      this.timeLeft += 5 * 60;
      this.updateStrValues();
      this.started = true;
    }
  }

  minusFive() {
    if (this.started) {
      this.started = false;
      this.timeLeft -= 5 * 60;
      if (this.timeLeft < 0) {
        this.timeLeft = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.started = false;
      } else this.started = true;

      this.updateStrValues();
    }
  }

  stop() {
    this.started = false;
  }

  reset() {
    this.resetVariables(25, 0, false);
  }
}
