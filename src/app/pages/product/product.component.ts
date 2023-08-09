import { UserService } from './../../services/user/user.service';
import { JwtService } from './../../utils/jwt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from './../../data/Dto/product/product.dto';
import { ProductService } from './../../services/product/product.service';
import { Component, Inject } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { CartService } from '../../services/cart/cart.service';
import { CartDto } from '../../data/Dto/cart/cart.dto';
import { UserDto } from '../../data/Dto/auth/user.dto';

@Component({
  selector: 'meal-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product!: ProductDto;
  productQuantity: number = 1;
  productId!: string;
  productPrice!: number;
  IsFetchingProduct!: boolean;
  error!: string;
  message!: string;
  totalAmountOfProduct!: number;
  user!: UserDto | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    @Inject(ActivatedRoute) private activeRoute: ActivatedRoute,
    private jwtService: JwtService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.params['productId'] ?? '';
    this.getProduct(this.productId);
    const { id } = this.jwtService.decodeJwtToken().data ?? '';
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: (err) => {
        this.error = err.message.message;
      },
    });
  }
  getProduct(productId: string): void {
    this.IsFetchingProduct = true;
    this.productService.getProduct(productId).subscribe({
      next: (response) => {
        if (response.statusCode == HttpStatusCode.Ok) {
          this.IsFetchingProduct = false;
          this.product = response.data;
          this.productPrice = response.data.price;
          this.totalAmountOfProduct = this.productPrice *= this.productQuantity;
        }
      },
      error: (err) => {
        this.IsFetchingProduct = false;
        this.error = err.error.message.message;
      },
    });
  }

  handleQuantityIncreaseORDecrease(action: string): void {
    if (action === 'increment' && this.product != undefined) {
      this.productQuantity += 1;
    } else if (action === 'decrement' && this.product != undefined) {
      this.productQuantity > 1
        ? (this.productQuantity = this.productQuantity - 1)
        : (this.productQuantity = this.productQuantity);
    }
  }

  checkFullPrice(): void {
    this.totalAmountOfProduct = this.productPrice *= this.productQuantity;
  }

  addItemToCart(): void {
    if (this.user == null) {
      this.error =
        'Item was not added with reason: user not found. navigating to login page';
      this.router.navigateByUrl('login');
      return;
    }
    const cartDto: CartDto = {
      user: {
        userId: this.user._id,
        username: this.user.username,
        country: this.user.country,
      },
      quantity: this.productQuantity,
      product: {
        productId: this.product._id,
        title: this.product.title,
        price: this.product.price,
        img: this.product.img,
        desc: this.product.desc,
      },
    };
    this.cartService.add(cartDto).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.message = 'Your purchase was successfully added to the cart.';
        }
      },
      error: (err) => {
        this.error = err.error.message.message;
      },
    });
  }
}
