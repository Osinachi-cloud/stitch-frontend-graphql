import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed = true;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = 'init';
    if(this.collapsed && this.screenWidth > 768) {
  console.log(this.screenWidth , "1");

      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
  console.log(this.screenWidth, "2");

      styleClass = 'body-md-screen'
    } else if(this.collapsed){
  console.log(this.screenWidth, "3");
        styleClass = "defaultStyle";
    }
    else if(!this.collapsed){
      styleClass = "final";

    }
    return styleClass;
  }
}
