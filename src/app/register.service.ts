import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:3000/users/new';
  }

  async sendRegisterForm(formValue): Promise<any> {
    try {
      return await this.httpClient.post<any>(this.url, formValue).toPromise();

    } catch (err) {
      throw err;
    }
  }
}
