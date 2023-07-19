import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../data/Dto/user.dto';
import { JwtService } from '../../utils/jwt.service';

@Component({
  selector: 'meal-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userToken: any = this.jwtService.decodeJwtToken();
  user!: UserDto | undefined;
  constructor(
    private router: Router,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.userToken.data.id).subscribe({
      next: (response) => {
        this.user = response.data;
        console.log(this.user?.username);
      },
      error: (err) => {
        console.log('Error getting the current logged in user');
      },
    });
  }
}
