import { OrderDto } from './../../data/Dto/order/order.dto';
import { JwtService } from '../../utils/jwt.service';
import { OrderService } from '../../services/order/order.service';
import { Component, HostListener } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'meal-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orders!: OrderDto[];
  error!: string | null;
  message!: string | null;
  productId!: string;
  IsFetching!: boolean;
  IsOrdering!: boolean;
  IsDeleting!: boolean;
  IsMobile!: boolean;
  userId!: string;
  constructor(
    private jwtService: JwtService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.handleWindowResize();
    const userId: string | null = this.jwtService.decodeJwtToken().data.id;
    if (userId != null) {
      this.getOrders(userId);
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

  getOrders(userId: string): void {
    this.IsFetching = true;
    this.orderService.getOrders('', 20, 1, userId).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.orders = res.data;
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

  cancelOrder(id: string): void {
    this.IsDeleting = true;
    this.orderService.cancelOrder(id).subscribe({
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
}
