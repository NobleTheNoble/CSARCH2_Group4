import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMsgComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
