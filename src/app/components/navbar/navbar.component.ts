import { UserService } from '../../services/user/user.service';
import { Component, HostListener } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { UserDto } from '../../data/Dto/auth/user.dto';
import { ProductCartDto } from 'src/app/data/Dto/cart/productCart.dto';

@Component({
  selector: 'meal-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  IsOpen: boolean = false;
  IsMobile!: boolean;
  products: ProductCartDto[] = [];
  userToken: any = this.jwtService.decodeJwtToken();
  user!: UserDto | null;
  IsLoggedIn: boolean = false;

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.handleWindowResize();
    this.getUser();
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

  getUser(): any {
    if (this.userToken.data == null) {
      this.user = null;
      this.IsLoggedIn = false;
      return null;
    }
    this.userService.getUser(this.userToken.data.id).subscribe({
      next: (response) => {
        this.IsLoggedIn = true;
        this.user = response.data;
      },
      error: (err) => {
        this.IsLoggedIn = false;
        this.user = null;
        console.log('Error getting the current logged in user');
      },
    });
  }

  toggle(): void {
    this.IsOpen = !this.IsOpen;
  }
}
