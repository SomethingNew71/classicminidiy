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
import { CounterComponent } from './components/counter/counter.component';

// App Structure Components
import { ToolbarRenderComponent } from './scaffolds/toolbar-render/toolbar-render.component';
import { ContentBoxComponent } from './scaffolds/content-box/content-box.component';
import { FooterRenderComponent } from './scaffolds/footer-render/footer-render.component';

// Page Components - Paired with the states
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VideosPageComponent } from './pages/videos-page/videos-page.component';

import { TechnicalPageComponent } from './pages/technical-page/technical-page.component';
// Subsets of Technical Page
import { TechWelcomeComponent } from './pages/technical-page/tech-welcome/tech-welcome.component';
import { TechEngineComponent } from './pages/technical-page/tech-engine/tech-engine.component';
import { TechSuspensionComponent } from './pages/technical-page/tech-suspension/tech-suspension.component';
import { TechTorquesComponent } from './pages/technical-page/tech-torques/tech-torques.component';

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
const videosState = {
  name: 'videos',
  url: '/videos',
  component: VideosPageComponent
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
    VideosPageComponent,
    TechnicalPageComponent,
      TechWelcomeComponent,
      TechEngineComponent,
      TechSuspensionComponent,
      TechTorquesComponent,
    ManualPageComponent,
    // Functional Components
    CounterComponent,
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
        videosState,
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
