import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.register = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_ ]{3,30}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      picture: new FormControl('', [
        Validators.pattern(/(https)?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9@*#]{6,20}$/)
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9@*#]{6,20}$/)
      ])
    }, this.checkPasswords)
  }

  ngOnInit() {
  }

  checkPasswords(register): any {
    if (register.controls.password.value !== register.controls.repeatPassword.value) {
      return { 'passwordsDoNotMatch': true };
    } else {
      return null;
    }
  }

  // Submit register form and store user token in local storage
  async handleSubmitRegister(): Promise<any> {
    try {
      const response = await this.registerService.sendRegisterForm(this.register.value);

      localStorage.setItem('user-token', response['user-token']);
      localStorage.setItem('user-info', JSON.stringify(response['user-info']));
      localStorage.setItem('isLoggedIn', JSON.stringify(response['isLoggedIn']));

      // Redirect to main page
      this.router.navigate(['/']);

    } catch (err) {
      console.log(err);
    }

  }
}