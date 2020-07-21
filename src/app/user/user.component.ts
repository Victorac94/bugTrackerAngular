import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData: any;
  loading: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.userData = null;
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loadUserData(params.userId);
    });
  }

  async loadUserData(userId): Promise<any> {
    try {
      // Show loading spinner
      this.loading = true;

      // Get user profile data
      const response = await this.userService.fetchUserData(userId);

      // Reverse user comments and issues so the latest ones show first
      response.user.comments.reverse();
      response.user.issues.reverse();

      this.userData = response.user;

      // Hide loading spinner
      this.loading = false;

    } catch (err) {
      // Hide loading spinner
      this.loading = false;

      // Show error message
      if (err.status === 422) {
        this.openSnackBar(err.error, undefined, 4000)

        // For errors like 500 with no custom error text
      } else {
        this.openSnackBar(`${err.statusText} ${err.status}`, undefined, 4000);
      }
    }
  }

  // Bottom screen message
  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
