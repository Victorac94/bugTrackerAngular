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
  loading: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userData = null;
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loadUserData(params.userId);
    });
  }

  async loadUserData(userId): Promise<any> {
    try {
      // Show loading spinner
      this.loading = true;

      // Get user profile data
      const response = await this.userService.fetchUserData(userId);

      // Reverse user comments and issues so the latest ones show first
      response.user.comments.reverse();
      response.user.issues.reverse();

      this.userData = response.user;

      // Hide loading spinner
      this.loading = false;

    } catch (err) {
      console.log(err);
      // Hide loading spinner
      this.loading = false;
    }
  }

}
