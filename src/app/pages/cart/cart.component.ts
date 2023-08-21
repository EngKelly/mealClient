import { ProductStatus } from './../../data/enum/product-status';
import { OrderDto } from './../../data/Dto/order/order.dto';
import { OrderService } from '../../services/order/order.service';
import { CartDto } from '../../data/Dto/cart/cart.dto';
import { CartService } from '../../services/cart/cart.service';
import { Component, HostListener } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { JwtService } from '../../../app/utils/jwt.service';

@Component({
  selector: 'meal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems!: CartDto[];
  error!: string | null;
  message!: string | null;
  productId!: string;
  IsFetching!: boolean;
  IsOrdering!: boolean;
  IsDeleting!: boolean;
  IsMobile!: boolean;
  userId!: string;
  constructor(
    private cartService: CartService,
    private jwtService: JwtService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.handleWindowResize();
    const userId: string | null = this.jwtService.decodeJwtToken().data.id;
    if (userId != null) {
      this.fetchCartItems(userId);
    }
  }

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.error = null;
      this.message = null;
    }, timeOut);
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
    this.IsFetching = true;
    this.cartService.fetchCartItems('', 1, 1, userId).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.cartItems = res.data;
          this.IsFetching = false;
        }
        this.IsFetching = false;
      },
      error: (err) => {
        this.IsFetching = false;
        this.error = err.error.message.message;
      },
    });
  }

  deleteCartItem(id: string): void {
    this.IsDeleting = true;
    this.cartService.deleteCartItem(id).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.message = res.message;
          this.IsDeleting = false;
          this.setTimeOut();
        }
        this.IsDeleting = false;
        this.setTimeOut();
      },
      error: (err) => {
        this.IsDeleting = false;
        this.error = err.error?.message.message;
        this.setTimeOut();
      },
    });
  }

  order(cartItem: CartDto): void {
    this.IsOrdering = true;

    const order: OrderDto = {
      userId: cartItem.user.userId!,
      product: {
        productId: cartItem.product.productId,
        product: {
          _id: cartItem.product.productId,
          title: cartItem.product.title,
          img: cartItem.product.img,
          desc: cartItem.product.desc,
          price: cartItem.product.price,
          categories: cartItem.product.categories,
          InStock: cartItem.product.InStock,
        },
        quantity: cartItem.quantity,
      },
      amount: cartItem.product.price,
      status: ProductStatus.PENDING,
      address: cartItem.user.country,
    };

    this.orderService.order(order).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.message = res.message;
          this.IsOrdering = false;
          this.setTimeOut(3000);
          return;
        }
        this.message = res.message;
        this.IsOrdering = false;
        this.setTimeOut(3000);
      },
      error: (err) => {
        this.error = err.error.message.message;
        this.IsOrdering = false;
        this.setTimeOut(3000);
      },
    });
  }
}
