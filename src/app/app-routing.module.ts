import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesComponent } from './languages/languages.component';
import { routeNames } from './route-names';

const routes: Routes = [
  { path: '', redirectTo: routeNames.LANGUAGES, pathMatch: 'full' },
  { path: routeNames.LANGUAGES, component: LanguagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
