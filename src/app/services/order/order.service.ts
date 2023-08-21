import { HttpResponse } from '../../data/Dto/auth/http.response';
import { environment } from '../../../environment/environment';
import { OrderDto } from '../../data/Dto/order/order.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  order(order: OrderDto): Observable<HttpResponse> {
    const url: string = `${environment.apiUrl}/order`;
    return this.http.post<HttpResponse>(url, order);
  }

  getOrders(
    keyword: string,
    limit: number,
    page: number,
    userId: string
  ): Observable<HttpResponse<OrderDto[]>> {
    const url: string = `${environment.apiUrl}/order/get-all/${userId}?page=${page}&keyword=${keyword}&limit=${limit}`;
    return this.http.get<HttpResponse<OrderDto[]>>(url);
  }

  cancelOrder(id: string): Observable<HttpResponse> {
    const url: string = `${environment.apiUrl}/order`;
    return this.http.delete<HttpResponse>(url);
  }
}
