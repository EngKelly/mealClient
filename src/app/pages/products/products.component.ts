import { ProductService } from './../../services/product/product.service';
import { UserService } from './../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from './../../utils/jwt.service';
import { UserDto } from '../../data/Dto/auth/user.dto';
import { ProductDto } from './../../data/Dto/product/product.dto';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'meal-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  userToken: any = this.jwtService.decodeJwtToken();
  IsMobile!: boolean;
  user!: UserDto | undefined;
  products!: ProductDto[] | undefined;
  productId!: string;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

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

  getProducts(productCategory: string = '', page: number = 1): void {
    this.productService.getProducts(productCategory, page).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.error('Error occured while fetching the user.', err.message);
      },
    });
  }
}
