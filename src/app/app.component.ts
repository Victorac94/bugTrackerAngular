import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  desktop: boolean;
  isLoggedIn: boolean;
  userInfo: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.isLoggedIn = false;
    this.userInfo = {};
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
    this.checkLogin();
  }

  // Check if the user is logged in
  checkLogin() {
    const userToken = localStorage.getItem('user-token');

    // If user token is stored on user's device, check with server if login time has not expired yet
    if (userToken) {
      this.userService.isLoggedIn(userToken)
        .then(response => {
          this.isLoggedIn = response.isLoggedIn;
          this.userInfo = response.userInfo;

        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  // Logout user
  logoutHandler() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-info');
    this.isLoggedIn = false;
    this.userInfo = {};

    // Show successful logout message
    this.openSnackBar('Logged out successfully', 'Dismiss');
  }

  // Angular material snackbar message
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
