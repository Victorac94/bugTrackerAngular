import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isLoggedIn: boolean;
  userInfo: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.isLoggedIn = false;
    this.userInfo = {};
  }

  ngOnInit(): void {
    // Check if the user is logged in
    this.checkLogin();

    // Listen for navigation end event
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (!this.isLoggedIn) {
        // If we were not logged in, check if we are now
        this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      }
    })
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

          localStorage.setItem('user-info', JSON.stringify(response.userInfo));
          localStorage.setItem('isLoggedIn', JSON.stringify(response.isLoggedIn));

        })
        .catch(err => {
          console.error(err);
        });

      // If there's no user token stored on localstorage, set user is logout by default
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }

  // Logout user
  logoutHandler() {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-info');
    localStorage.setItem('isLoggedIn', 'false');
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
