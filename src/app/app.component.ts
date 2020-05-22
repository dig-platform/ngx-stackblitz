import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-stackblitz';

  public files = {
    'index.html': '<h1>My Test Page</h1>',
    'index.js': 'console.log("my test")'
  }

  saveTree(tree) {
    console.log({tree});
  }
}
