import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  manuals = 15;
  videos = 45;
  productionYears = 41;
  brandOwners = 10;

  constructor() { }
  ngOnInit() {}
}
