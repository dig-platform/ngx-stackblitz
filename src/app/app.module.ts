import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxStackblitzModule} from '../../projects/editor/src/lib/ngx-stackblitz.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxStackblitzModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
