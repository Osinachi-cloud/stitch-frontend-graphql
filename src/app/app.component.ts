import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trevautyInternalApp';
  isRed = true;
  isBlue = true;
  isGreen = true;

  dynamicClass = 'dynamicClass'
}
