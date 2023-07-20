import { UserService } from '../../services/user/user.service';
import { Component, HostListener } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { UserDto } from '../../data/Dto/auth/user.dto';

@Component({
  selector: 'meal-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  IsOpen: boolean = false;
  IsMobile!: boolean;
  products!: any[];
  userToken: any = this.jwtService.decodeJwtToken();
  user!: UserDto | undefined;

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.handleWindowResize();
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

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.handleWindowResize();
    console.log(this.IsMobile);
  }

  handleWindowResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      this.IsMobile = true;
    } else {
      this.IsMobile = false;
    }
  }

  toggle(): void {
    this.IsOpen = !this.IsOpen;
  }
}
