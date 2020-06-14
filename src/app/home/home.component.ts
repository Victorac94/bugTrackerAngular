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

  constructor(
    private issueService: IssueService
  ) {
    this.latestIssues = null;
    this.closedIssues = null;
  }

  ngOnInit(): void {
    this.getIssues();
  }

  async getIssues(): Promise<any> {
    try {
      const issues = await this.issueService.getAll();

      this.latestIssues = this.sortIssues(issues, 'open');
      this.closedIssues = this.sortIssues(issues, 'closed');

    } catch (err) {
      console.log(err);
    }
  }

  sortIssues(issues, sorting) {
    return issues.filter(issue => {
      return issue.state === sorting;
    }).slice(0, 5)
  }
}
