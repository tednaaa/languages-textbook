import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { LanguagesComponent } from './languages.component';
import { AddLanguageComponent } from './add-language/add-language.component';
import { AddNoteComponent } from './add-note/add-note.component';

@NgModule({
  declarations: [LanguagesComponent, AddLanguageComponent, AddNoteComponent],
  imports: [CommonModule, MatListModule, MatButtonModule],
})
export class LanguagesModule {}
