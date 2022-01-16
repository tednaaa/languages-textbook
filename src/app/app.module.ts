import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupComponent } from './shared/popup/popup.component';
import { LanguagesModule } from './languages/languages.module';

@NgModule({
  declarations: [AppComponent, PopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LanguagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
