import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues: any;

  constructor(
    private issueService: IssueService
  ) {
    this.issues = null;
  }

  ngOnInit(): void {
    this.getIssues();
  }

  async getIssues(): Promise<any> {
    try {
      this.issues = await this.issueService.getAll();
      console.log(this.issues);

    } catch (err) {
      console.log(err);
    }
  }
}
