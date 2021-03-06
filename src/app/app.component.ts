import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  desktop: boolean;

  constructor(
    breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.TabletLandscape
    ]).subscribe(result => {
      if (result.matches) {
        this.desktop = true;
      } else {
        this.desktop = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
