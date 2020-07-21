import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IssueService } from '../issue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestIssues: any;
  closedIssues: any;
  loading: boolean;

  constructor(
    private issueService: IssueService,
    private _snackBar: MatSnackBar
  ) {
    this.latestIssues = null;
    this.closedIssues = null;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getIssues();
  }

  async getIssues(): Promise<any> {
    try {
      // Show loading spinner
      this.loading = true;

      // Get latest issues
      const response = await this.issueService.getAll();

      // Hide loading spinner
      this.loading = false;

      // Set latest issues to their corresponding group (open or closed state)
      this.latestIssues = this.sortIssues(response.issues, 'open');
      this.closedIssues = this.sortIssues(response.issues, 'closed');

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

  sortIssues(issues, sorting) {
    return issues.filter(issue => {
      return issue.state === sorting;
    }).slice(0, 5)
  }

  // Bottom screen message
  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
