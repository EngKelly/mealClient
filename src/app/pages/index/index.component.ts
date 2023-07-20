import { ProductService } from './../../services/product/product.service';
import { ProductDto } from './../../data/Dto/product/product.dto';
import { UserDto } from '../../data/Dto/auth/user.dto';
import { Component, HostListener } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'meal-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  userToken: any = this.jwtService.decodeJwtToken();
  IsMobile!: boolean;
  user!: UserDto | undefined;
  products!: ProductDto[] | undefined;
  productId!: string;

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
    this.getProducts();
    console.log(this.products);
    this.productId = this.activeRoute.snapshot.params['id'];
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error occured while fetching the user.', err.message);
      },
    });
  }
}
