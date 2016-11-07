import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-render',
  templateUrl: './toolbar-render.component.html',
  styleUrls: ['./toolbar-render.component.css']
})
export class ToolbarRenderComponent implements OnInit {
  title = 'Classic Mini DIY';
  logoUrl = 'url/to/logo.png';

  constructor() { }
  ngOnInit() { }
}
