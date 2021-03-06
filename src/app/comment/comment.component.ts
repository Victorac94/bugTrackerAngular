import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  @Input() commentIndex: number;
  @Input() myUserInfo: any;
  @Input() isLoggedIn: boolean;
  @Input() issueState: string;
  @ViewChild('commentElem') commentElem: ElementRef;
  editingComment: boolean;
  commentTextBeforeEditing: any;

  constructor(
    private commentService: CommentService,
    private _snackBar: MatSnackBar,
  ) {
    this.editingComment = false;
  }

  ngOnInit(): void {
  }

  enableCommentEdit() {
    // Show edit comment buttons
    this.editingComment = true;

    // We need to store comment's text value before editing
    // because of ngModel binding in the quill-editor
    this.commentTextBeforeEditing = this.comment.text;
  }

  disableCommentEdit() {
    // Hide edit comment buttons
    this.editingComment = false;

    // Restore text value of comment before we enabled edit
    this.comment.text = this.commentTextBeforeEditing;
  }

  async handleSubmitEditedComment($event) {
    try {
      // Get comment's raw content
      const commentData = $event.currentTarget.parentElement.parentElement.querySelector('.ql-editor').innerHTML;

      // Submit comment content to DB
      await this.commentService.editComment(commentData, this.comment._id);

      // Exit editing mode and save new edited content to edited comment
      this.editingComment = false;
      this.comment.text = commentData;

      // Show success message
      this.openSnackBar('Comment edited successfully');

    } catch (err) {
      // Show error message
      if (err.status === 422) {
        this.openSnackBar(err.error, undefined, 4000)

        // For errors like 500 with no custom error text
      } else {
        this.openSnackBar(`${err.statusText} ${err.status}`, undefined, 4000);
      }
    }
  }

  async handleDeleteComment() {
    try {
      // Request to delete selected comment from DB
      const response = await this.commentService.deleteComment(this.comment);
      console.log(response);

      // If successful remove comment element from html
      this.commentElem.nativeElement.parentNode.remove();

      // Show success message
      this.openSnackBar('Message deleted successfully');

    } catch (err) {
      // Show error message
      if (err.status === 422) {
        this.openSnackBar(err.error, undefined, 4000)

        // For errors like 500 with no custom error text
      } else {
        this.openSnackBar(`${err.statusText} ${err.status}`, undefined, 4000);
      }
    }
  }

  // Bottom screen message
  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }

}
