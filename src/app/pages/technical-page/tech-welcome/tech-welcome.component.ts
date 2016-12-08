import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-welcome',
  templateUrl: './tech-welcome.component.html',
  styleUrls: ['./tech-welcome.component.scss']
})
export class TechWelcomeComponent implements OnInit {
  dimensions = {
    wheelbase: {
      saloonIn: 80.2,
      saloonMm: 2036,
      estateIn: 84.2,
      estateMm: 2138
    },
    length: {
      saloonIn: 120.2,
      saloonMm: 3054,
      estateIn: 129.9,
      estateMm: 3299,
      hornetIn: 130,
      hornetMm: 3300
    },
    width: {
      saloonIn: 55,
      saloonMm: 1397
    },
    height: {
      saloonIn: 53,
      saloonMm: 1346
    },
    Weight: {
      saloonLb: 1360,
      saloonkg: 617,
      estateLb: 1512,
      estatekg: 686
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
