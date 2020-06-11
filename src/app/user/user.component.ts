import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userData: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userData = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loadUserData(params.userId);
    });
  }

  async loadUserData(userId): Promise<any> {
    try {
      const response = await this.userService.fetchUserData(userId);
      this.userData = response.user;
      console.log(this.userData);

    } catch (err) {
      console.log(err);
    }
  }

}
