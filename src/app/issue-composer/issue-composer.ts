import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-issue-composer',
  templateUrl: './issue-composer.component.html',
  styleUrls: ['./issue-composer.component.scss']
})
export class IssueComposerComponent implements OnInit {

  issueForm: FormGroup;
  isEditMode: boolean;
  issueCustomId: number;

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {
    this.isEditMode = false;
    this.issueCustomId = 0;
    this.issueForm = new FormGroup({
      summary: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ]),
      project: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      priority: new FormControl('', [
        Validators.required,
        Validators.pattern(/low|medium|high/)
      ]),
      severity: new FormControl('', [
        Validators.required,
        Validators.pattern(/low|medium|high/)
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      product_version: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      os: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      tags: new FormControl('', [
        Validators.required,
        Validators.pattern(/feature|bug/)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30000)
      ]),
      steps_to_reproduce: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(30000)
      ])
    })
  }

  ngOnInit(): void {
    // If we are in edit mode it returns the issue id
    // If we are not, that means we are in new issue and it returns null
    const edit = this.router.url.match(/(.{24})\/(edit)$/);

    if (edit) {
      // We pass in the issue id
      this.getIssueDetails(edit[1]);
      this.isEditMode = true;
    }
  }

  async getIssueDetails(issueId) {
    try {
      const response = await this.issueService.getIssue(issueId);

      this.issueForm.setValue({
        summary: response.issue.summary,
        project: response.issue.project._id,
        priority: response.issue.priority,
        severity: response.issue.severity,
        category: response.issue.category,
        product_version: response.issue.product_version,
        os: response.issue.os,
        tags: response.issue.tags,
        description: response.issue.description,
        steps_to_reproduce: response.issue.steps_to_reproduce
      })

      this.issueCustomId = response.issue.id;

    } catch (err) {
      console.log(err);
    }
  }

  async handleSubmitNewIssue() {
    try {
      console.log(this.issueForm.value);
      const response = await this.issueService.newIssue(this.issueForm.value);

      console.log(response);
      this.router.navigate(['/issues']);

    } catch (err) {
      console.log(err);
    }

  }
}
