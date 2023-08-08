import { JwtService } from './../../utils/jwt.service';
import { CartDto } from '../../data/Dto/cart/cart.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../data/Dto/auth/http.response';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  add(model: CartDto): Observable<HttpResponse<CartDto>> {
    const url: string = `${environment.apiUrl}/cart/add`;
    return this.http.post<HttpResponse<CartDto>>(url, model);
  }

  fetchCartItemsAsync(
    keyword: string = '',
    page: number = 1,
    pageSize: number = 1,
    userId: string
  ): Observable<HttpResponse<CartDto[]>> {
    const url: string = `${environment.apiUrl}/cart/${userId}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<HttpResponse<CartDto[]>>(url);
  }
}
