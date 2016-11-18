// Angular Required Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Third Party Library Additions
import { MaterialModule } from '@angular/material';
import { UIRouterModule } from 'ui-router-ng2';
// import CountUp from 'node_modules/countup.js/dist/countUp.min.js';

// Component Imports
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';

// App Structure Components
import { ToolbarRenderComponent } from './scaffolds/toolbar-render/toolbar-render.component';
import { ContentBoxComponent } from './scaffolds/content-box/content-box.component';
import { FooterRenderComponent } from './scaffolds/footer-render/footer-render.component';

// Page Components - Paired with the states
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { TechnicalPageComponent } from './pages/technical-page/technical-page.component';
import { ManualPageComponent } from './pages/manual-page/manual-page.component';


// State Declerations
let defaultState = {
  // Simply a filler that directs to the homeState
  name: 'default',
  url: '',
  redirectTo: 'home',
  component: HomePageComponent
};

const homeState = {
  name: 'home',
  url: '/home',
  component: HomePageComponent
};
const historyState = {
  name: 'history',
  url: '/history',
  component: HistoryPageComponent
};
const technicalState = {
  name: 'technical',
  url: '/technical',
  component: TechnicalPageComponent
};
const manualsState = {
  name: 'manuals',
  url: '/manuals',
  component: ManualPageComponent
};

@NgModule({
  declarations: [
    AppComponent,
    // Structure Components
    ToolbarRenderComponent,
    ContentBoxComponent,
    FooterRenderComponent,
    // Page Components
    HomePageComponent,
    HistoryPageComponent,
    TechnicalPageComponent,
    ManualPageComponent,
    // Functional Components
    CounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot({
      // States imported here
      // UI-router options can be configured here as well
      states: [
        defaultState,
        homeState,
        historyState,
        technicalState,
        manualsState
      ],
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
