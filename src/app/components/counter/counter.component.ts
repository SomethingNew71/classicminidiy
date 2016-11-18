import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  manuals = 15;
  videos = 55;
  prodYears = 41;
  brandOwners = 10;

  constructor() { }

  ngOnInit() {
    // const easingFn = function (t, b, c, d) {
    //   const ts = (t /= d) * t;
    //   const tc = ts * t;
    //   return b + c * (tc + -3 * ts + 3 * t);
    // };
    // const options = {
    //   useEasing : true,
    //   easingFn: easingFn,
    //   useGrouping : true,
    //   separator : ',',
    //   decimal : '.',
    //   prefix : '',
    //   suffix : ''
    // };
    // const demo = new CountUp('myTargetElement', 0, 3248, 0, 2.5, options);
    // demo.start();
  }

}
