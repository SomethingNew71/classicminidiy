import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // Sets hero-banner URL
  heroUrl = 'assets/hero.jpg';
  miniUrl = 'assets/mini-icon.png';
  arrowUrl = 'assets/arrow-icon.png';
  rocketUrl = 'assets/rocket-icon.png';

  constructor() { }
  ngOnInit() { }
}
