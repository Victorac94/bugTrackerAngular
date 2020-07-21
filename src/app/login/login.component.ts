import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar
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

      this.openSnackBar(`Welcome back ${response['user-info'].name}`, undefined, 3000);

    } catch (err) {
      // Show error message
      if (err.status === 422) {
        this.openSnackBar(err.error, undefined, 4000)

        // For errors like 500 with no custom error text
      } else {
        this.openSnackBar(`${err.statusText} ${err.status}`, undefined, 4000);
      }
    }
  }

  // Bottom screen message
  openSnackBar(message: string, action: string = 'Dismiss', duration: number = 2000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
