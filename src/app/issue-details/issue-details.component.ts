import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';
import Quill from 'quill';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issue: any;
  sendingComment: boolean;
  newCommentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private commentService: CommentService
  ) {
    this.issue = null;
    this.sendingComment = false;
    this.newCommentForm = new FormGroup({
      textarea: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(30000)
      ])
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.issueDetails(params.issueId);
    });
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

  async handleNewComment() {
    try {
      const body = {
        text: this.newCommentForm.controls.textarea.value,
        issue: this.issue._id
      }

      this.sendingComment = true;

      const response = await this.commentService.newComment(body);

      this.sendingComment = false;

      console.log(response['comment']);

      this.issue.comments.push(response['comment'])

    } catch (err) {
      console.log(err);
      this.sendingComment = false;
    }
  }
}
