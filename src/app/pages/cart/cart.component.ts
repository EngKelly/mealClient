import { CartDto } from './../../data/Dto/cart/cart.dto';
import { CartService } from '../../services/cart/cart.service';
import { Component, HostListener } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { JwtService } from 'src/app/utils/jwt.service';

@Component({
  selector: 'meal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems!: CartDto[];
  error?: string;
  productId!: string;
  IsFetching!: boolean;
  IsMobile!: boolean;
  userId!: string;
  constructor(
    private cartService: CartService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.handleWindowResize();
    const userId: string | null = this.jwtService.decodeJwtToken().data.id;
    if (userId != null) {
      this.fetchCartItems(userId);
    }
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

  fetchCartItems(userId: string): void {
    this.cartService.fetchCartItemsAsync('', 1, 1, userId).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.cartItems = res.data;
          console.log(res.data);
        }
      },
      error: (err) => {
        this.error = err.error.message.message;
        console.log(err);
      },
    });
  }

  deleteCartItem(id: string | undefined): void {}
}
