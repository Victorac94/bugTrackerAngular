import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
