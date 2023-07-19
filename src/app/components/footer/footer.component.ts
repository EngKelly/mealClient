import { Component } from '@angular/core';

@Component({
  selector: 'meal-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor() {}

  date: number = new Date().getFullYear();
}
