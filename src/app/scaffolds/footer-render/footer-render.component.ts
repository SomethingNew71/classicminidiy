import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-render',
  templateUrl: './footer-render.component.html',
  styleUrls: ['./footer-render.component.scss']
})
export class FooterRenderComponent implements OnInit {
  copyDate = new Date().getFullYear();

  constructor() { }

  ngOnInit() { }

}
