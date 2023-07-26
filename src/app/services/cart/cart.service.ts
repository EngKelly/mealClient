import { ProductDto } from './../../data/Dto/product/product.dto';
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
  private userId?: string;
  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.userId = this.jwtService.decodeJwtToken().data.id;
  }

  add(model: CartDto): Observable<HttpResponse<CartDto>> {
    const url: string = `${environment.apiUrl}/cart/add`;
    return this.http.post<HttpResponse<CartDto>>(url, model);
  }

  fetchCartItemsAsync(
    keyword: string = '',
    page: number = 1,
    pageSize: number = 1
  ): Observable<HttpResponse<CartDto[]>> {
    const url: string = `${environment.apiUrl}/cart/${this.userId}?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<HttpResponse<CartDto[]>>(url);
  }
}
