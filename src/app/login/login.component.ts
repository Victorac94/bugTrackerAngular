import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.login = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9@*#]{6,20}$/)
      ]),
    })
  }

  ngOnInit() {
  }

  async handleSubmitLogin(): Promise<any> {
    try {
      const response = await this.loginService.sendLoginForm(this.login.value);

      localStorage.setItem('user-token', response['user-token']);
      localStorage.setItem('user-info', JSON.stringify(response['user-info']));
      localStorage.setItem('isLoggedIn', JSON.stringify(response['isLoggedIn']));

      this.router.navigate(['/']);

    } catch (err) {

    }
  }
}
