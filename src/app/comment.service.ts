import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:3000/comments';
  }

  async newComment(comment) {
    try {
      return await this.httpClient.post(this.url + '/new', comment, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async deleteComment(comment) {
    try {
      const deleteURL = `${this.url}/${comment._id}/delete`;
      return await this.httpClient.delete(deleteURL, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token')
      })
    }
  }
}
