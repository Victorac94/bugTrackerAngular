import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = env.baseUrl + '/users/login';
  }

  async sendLoginForm(loginValue): Promise<any> {
    try {
      return await this.httpClient.post<any>(this.url, loginValue).toPromise();

    } catch (err) {
      throw err;
    }
  }
}
