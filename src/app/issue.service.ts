import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = env.baseUrl + '/issues';
  }

  // Get all issues registered on DB
  async getAll(): Promise<any> {
    try {
      return await this.httpClient.get(this.url, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  // Get issue details by it's mongo id
  async getIssue(issueId): Promise<any> {
    try {
      return await this.httpClient.get(`${this.url}/${issueId}`, this.createHeaders()).toPromise();

    } catch (err) {
      throw err;
    }
  }

  // Add new issue to DB
  async newIssue(value): Promise<any> {
    try {
      return await this.httpClient.post(`${this.url}/new`, value, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  // Edit issue by it's mongo id
  async editIssue(value, issueId): Promise<any> {
    try {
      return await this.httpClient.put(`${this.url}/${issueId}/edit`, value, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  // Delete issue from DB
  async deleteIssue(issueId): Promise<any> {
    try {
      return await this.httpClient.delete(`${this.url}/${issueId}/delete`, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  // Close issue
  async toggleIssueState(issueId, state): Promise<any> {
    try {
      return await this.httpClient.patch(`${this.url}/${issueId}/toggle-state`, { state: state }, this.createHeaders()).toPromise();
    } catch (err) {
      throw err;
    }
  }

  createHeaders() {
    const userToken = localStorage.getItem('user-token');

    if (userToken) {
      return {
        headers: new HttpHeaders({
          'user-token': userToken
        })
      }
    } else {
      return {
        headers: null
      }
    }
  }
}
