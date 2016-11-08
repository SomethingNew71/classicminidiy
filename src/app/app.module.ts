// Angular Required Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party Library Additions
import { MaterialModule } from '@angular/material';
import { UIRouterModule } from 'ui-router-ng2';

// Component Imports
import { AppComponent } from './app.component';
import { ToolbarRenderComponent } from './toolbar-render/toolbar-render.component';
import { ContentBoxComponent } from './content-box/content-box.component';

// Page Components
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { TechnicalPageComponent } from './pages/technical-page/technical-page.component';
/** States */

let homeState = {
  name: 'home',
  url: '/home',
  component: HomePageComponent
};
let historyState = {
  name: 'history',
  url: '/history',
  component: HistoryPageComponent
};
let technicalState = {
  name: 'technical',
  url: '/technical',
  component: TechnicalPageComponent
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarRenderComponent,
    ContentBoxComponent,
    HomePageComponent,
    HistoryPageComponent,
    TechnicalPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot({
      // States imported here
      states: [
        homeState,
        historyState,
        technicalState
      ],
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
