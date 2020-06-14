import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = env.baseUrl + '/users/';
  }

  async fetchUserData(userId): Promise<any> {
    try {
      return await this.httpClient.get(this.url + userId).toPromise();

    } catch (err) {
      throw err;
    }
  }

  async isLoggedIn(userToken): Promise<any> {
    try {
      const headers = {
        headers: new HttpHeaders({
          'user-token': userToken
        })
      }

      return await this.httpClient.get(this.url + 'isLoggedIn', headers).toPromise();
    } catch (err) {
      throw err;
    }
  }

}
