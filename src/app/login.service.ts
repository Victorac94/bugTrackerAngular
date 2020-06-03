import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:3000/users/login';
  }

  async sendLoginForm(loginValue): Promise<any> {
    try {
      return await this.httpClient.post<any>(this.url, loginValue).toPromise();

    } catch (err) {
      throw err;
    }
  }
}
