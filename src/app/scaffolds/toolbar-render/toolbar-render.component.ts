import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-render',
  templateUrl: './toolbar-render.component.html',
  styleUrls: ['./toolbar-render.component.scss']
})
export class ToolbarRenderComponent implements OnInit {
  title = 'Classic Mini DIY';
  logoUrl = 'assets/logo.png';

  // TODO: this needs to be added to loop over menu items in the future
  // public menuButtons = [
  //   {
  //     name: 'History',
  //     url: 21,
  //     ariaLabel: 'History'
  //   },
  //   {
  //     name: 'Technical Specs',
  //     url: 24,
  //     ariaLabel: 'Tech Specs'
  //   },
  //   {
  //     name: 'Youtube Channel',
  //     url: 18,
  //     ariaLabel: 'Youtube'
  //   }
  // ];
  constructor() { }
  ngOnInit() { }
}
