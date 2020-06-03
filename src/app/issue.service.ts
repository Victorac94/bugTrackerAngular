import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
