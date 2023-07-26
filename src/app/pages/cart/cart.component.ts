import { CartDto } from './../../data/Dto/cart/cart.dto';
import { CartService } from '../../services/cart/cart.service';
import { Component } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'meal-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems!: CartDto[];
  error?: string;
  productId!: string;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.cartService.fetchCartItemsAsync().subscribe({
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
    console.log(this.cartItems);
  }

  deleteCartItem(id: string | undefined): void {}
}
