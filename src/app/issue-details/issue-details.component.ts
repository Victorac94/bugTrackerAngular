import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent implements OnInit {

  issue: any;
  quill: any;
  newCommentForm: FormGroup;
  sendingComment: boolean;
  isValidComment: boolean;
  myUserInfo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private commentService: CommentService
  ) {
    this.issue = null;
    this.sendingComment = false;
    this.myUserInfo = null;
    this.isValidComment = false;
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

    this.myUserInfo = JSON.parse(localStorage.getItem('user-info'));
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

  // Get quill instance when loading this page
  getEditorInstance($event) {
    this.quill = $event;

    // Enable / disable sending a new comment
    this.quill.on('text-change', () => {
      // By default quill-editor always ends with \n (newline)
      // even if the user has not written anything

      // If user has written content
      if (this.quill.getText() !== '\n') {
        this.isValidComment = true;

      } else {
        this.isValidComment = false;
      }
    })
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

      // Clear text editor and push new comment to this issue's comment list (visually)
      this.quill.setContents([]);
      this.issue.comments.push(response['comment'])
      this.isValidComment = false;

    } catch (err) {
      console.log(err);
      this.sendingComment = false;
    }
  }

  handleCommentContent($event) {
    this.quill.focus();
    // Clear quill-editor contents
    this.quill.setContents([]);
    // Fill quill-editor with the selected comment's value
    this.quill.clipboard.dangerouslyPasteHTML(0, $event);
    // Disable sending the comment until it has been modified
    this.isValidComment = false;
  }
}
