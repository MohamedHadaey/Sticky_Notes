import { Component } from '@angular/core';
import disableDevtool from 'disable-devtool';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sticky_Notes';
  constructor(){
    // to disable inspect element and f12 button
    disableDevtool();
  }
}
