import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { UserDto } from '../data/Dto/auth/user.dto';

@Component({
  selector: 'meal-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  user!: UserDto | undefined;
  userId!: string;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.params['userId'];
    this.userService.getUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.data;
        console.log(this.user?.username);
      },
      error: (err) => {
        console.log('Error getting the current logged in user');
      },
    });
  }

  logout(): void {
    if (this.authService.logout()) {
      window.location.assign('');
    }
  }
}
