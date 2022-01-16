import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {
  MOCK_LANGUAGES = ['English', 'Русский (Russian)', 'հայերեն (Armenian)'];

  constructor() {}

  ngOnInit(): void {}
}
