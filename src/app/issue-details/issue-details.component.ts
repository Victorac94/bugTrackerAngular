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
  isLoggedIn: boolean;
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
    this.isLoggedIn = false;
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
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
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

  async toggleIssueState(issueId, state) {
    try {
      const response = await this.issueService.toggleIssueState(issueId, state);

      // this.router.navigate(['/issues']);
      this.issue.state = state;

      // Show snackbar with success message
      setTimeout(() => {
        this.openSnackBar(`Issue ${state} successfully`, 'Dismiss');
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
      // Compose comment data
      const body = {
        text: this.newCommentForm.controls.textarea.value,
        issue: this.issue._id
      }

      // Show 'Sending...' text in submit button
      this.sendingComment = true;

      // Send and save new comment to DB
      const response = await this.commentService.newComment(body);

      // Reset submit button text to initial value
      this.sendingComment = false;

      // Clear text editor and push new comment to this issue's array of comments (for visual purposes)
      this.quill.setContents([]);
      this.issue.comments.push(response['comment'])
      this.isValidComment = false;

      // Show success message
      this.openSnackBar('Comment added successfully', 'Dismiss');

    } catch (err) {
      console.log(err);
      this.sendingComment = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
