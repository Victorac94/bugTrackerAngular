import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = env.baseUrl + '/comments';
  }

  async newComment(comment) {
    try {
      return await this.httpClient.post(this.url + '/new', comment, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async editComment(data, commentId) {
    try {
      const commentData = {
        text: data
      }

      return await this.httpClient.put(`${this.url}/${commentId}/edit`, commentData, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async deleteComment(comment) {
    try {
      const deleteURL = `${this.url}/${comment._id}/delete`;
      return await this.httpClient.delete(deleteURL, this.createHeaders(comment.issue._id)).toPromise();

    } catch (err) {
      throw err;
    }
  }

  createHeaders(issueId: string = '') {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
        'issue-id': issueId
      })
    }
  }
}
