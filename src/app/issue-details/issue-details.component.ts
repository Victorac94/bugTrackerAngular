import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IssueService } from '../issue.service';
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
  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) {
    this.issue = null;
    this.sendingComment = false;
    this.myUserInfo = null;
    this.isValidComment = false;
    this.loading = false;
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

  // Get issue details
  async issueDetails(issueId): Promise<any> {
    try {
      // Show loading bar
      this.loading = true;

      const response = await this.issueService.getIssue(issueId);

      // Hide loading bar
      this.loading = false;

      this.issue = response.issue;
      console.log(this.issue);
      console.log(this.myUserInfo, this.issue.informer)

    } catch (err) {
      console.log(err);
      // Hide loading bar
      this.loading = false;
    }
  }

  // Delete issue
  async deleteIssue(issueId) {
    try {
      const response = await this.issueService.deleteIssue(issueId);

      console.log(response);
      this.router.navigate(['/issues']);

      // Show snackbar with success message
      setTimeout(() => {
        this.openSnackBar('Issue deleted successfully', 'Dismiss');
      }, 300);

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

      // Show snackbar with success message
      this.openSnackBar('Comment added successfully', 'Dismiss');

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
