import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = env.baseUrl + '/projects';
  }

  async getAll(): Promise<any> {
    try {
      return await this.httpClient.get(this.baseUrl).toPromise();

    } catch (err) {
      throw err;
    }
  }
}
