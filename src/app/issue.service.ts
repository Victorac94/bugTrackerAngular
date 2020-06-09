import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:3000/issues';
  }

  async getAll(): Promise<any> {
    try {
      return await this.httpClient.get(this.url).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async getIssue(issueId): Promise<any> {
    try {
      return await this.httpClient.get(`${this.url}/${issueId}`).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async newIssue(value): Promise<any> {
    try {
      return await this.httpClient.post(`${this.url}/new`, value, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  async editIssue(value, issueId): Promise<any> {
    try {
      return await this.httpClient.put(`${this.url}/${issueId}/edit`, value, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  async deleteIssue(issueId): Promise<any> {
    try {
      return await this.httpClient.delete(`${this.url}/${issueId}/delete`, this.createHeaders()).toPromise();
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
