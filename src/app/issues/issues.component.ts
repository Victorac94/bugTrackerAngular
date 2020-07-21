import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: any;
  loading: boolean;

  constructor(
    private issueService: IssueService,
    private _snackBar: MatSnackBar
  ) {
    this.issues = null;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getIssues();
  }

  async getIssues(): Promise<any> {
    try {
      // Show loading spinner
      this.loading = true;

      // Get all issues from DB
      const response = await this.issueService.getAll();

      this.issues = response.issues;

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
