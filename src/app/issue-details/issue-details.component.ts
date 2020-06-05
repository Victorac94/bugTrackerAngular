import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issue: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService
  ) {
    this.issue = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.issueDetails(params.issueId);
    })
  }

  async issueDetails(issueId): Promise<any> {
    try {
      const response = await this.issueService.getIssue(issueId);

      this.issue = response.issue;
      console.log(this.issue);

    } catch (err) {
      console.log(err);
    }
  }

}
