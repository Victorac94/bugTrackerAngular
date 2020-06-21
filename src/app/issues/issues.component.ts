import { Component, OnInit } from '@angular/core';
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
    private issueService: IssueService
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

      // Get all issues in DB
      this.issues = await this.issueService.getAll();

      // Hide loading spinner
      this.loading = false;

    } catch (err) {
      console.log(err);
      // Hide loading spinner
      this.loading = false;
    }
  }
}
