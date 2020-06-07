import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
  // @ViewChild('textEditor') textEditor: ElementRef;

  constructor(
    private commentService: CommentService
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

    } catch (err) {
      console.log(err);
    }
  }

}
