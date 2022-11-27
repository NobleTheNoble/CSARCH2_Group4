import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { HexInputComponent } from './hex-input/hex-input.component';
import { BinInputComponent } from './bin-input/bin-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMsgComponent,
    HexInputComponent,
    BinInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
