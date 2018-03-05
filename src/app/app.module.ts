import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {PasswordStrengthBar} from './password-strenght.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    PasswordStrengthBar
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
