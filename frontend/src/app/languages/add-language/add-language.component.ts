import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss'],
})
export class AddLanguageComponent implements OnInit {
  isPopupOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public openPopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }
}
