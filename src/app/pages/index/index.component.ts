import { UserDto } from './../../data/Dto/user.dto';
import { Component, HostListener } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'meal-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  products!: any[];
  userToken: any = this.jwtService.decodeJwtToken();
  IsMobile!: boolean;
  user!: UserDto | undefined;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.handleWindowResize();
  }

  handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.IsMobile = false;
    } else {
      this.IsMobile = true;
    }
  }

  ngOnInit() {
    this.handleWindowResize();
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
