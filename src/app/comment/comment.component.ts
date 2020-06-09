import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any;
  @Input() myUserInfo: any;
  @Output() commentContent: EventEmitter<any>;
  @ViewChild('commentElem') commentElem: ElementRef;

  constructor(
    private commentService: CommentService,
    private _snackBar: MatSnackBar
  ) {
    this.commentContent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  handleEditComment($event) {
    // Get comment's raw content
    const content = $event.currentTarget.parentElement.parentElement.querySelector('.ql-editor').innerHTML;

    this.commentContent.emit(content);
  }

  async handleDeleteComment() {
    try {
      await this.commentService.deleteComment(this.comment);

      this.commentElem.nativeElement.parentNode.remove();

      // Show snackbar with successful delete message
      this.openSnackBar('Message deleted successfully', 'Dismiss');

    } catch (err) {
      console.log(err);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    })
  }

}
