import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:3000/users/';
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
