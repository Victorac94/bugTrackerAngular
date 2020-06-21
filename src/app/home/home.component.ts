import { Component, OnInit } from '@angular/core';
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
    private issueService: IssueService
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
      const issues = await this.issueService.getAll();

      // Hide loading spinner
      this.loading = false;

      // Set latest issues to their corresponding group (open or closed state)
      this.latestIssues = this.sortIssues(issues, 'open');
      this.closedIssues = this.sortIssues(issues, 'closed');

    } catch (err) {
      console.log(err);
      // Hide loading spinner
      this.loading = false;
    }
  }

  sortIssues(issues, sorting) {
    return issues.filter(issue => {
      return issue.state === sorting;
    }).slice(0, 5)
  }
}
