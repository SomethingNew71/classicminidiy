import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarRenderComponent } from './toolbar-render/toolbar-render.component';
import { ContentBoxComponent } from './content-box/content-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarRenderComponent,
    ContentBoxComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
