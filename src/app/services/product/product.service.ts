import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../../data/Dto/product/product.dto';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../../data/Dto/auth/http.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<HttpResponse<ProductDto>> {
    return this.http.get<HttpResponse<ProductDto>>(
      `${environment.apiUrl}/product/${id}`
    );
  }

  getProducts(
    keyword: string = '',
    page: number = 1
  ): Observable<HttpResponse<ProductDto[]>> {
    return this.http.get<HttpResponse<ProductDto[]>>(
      `${environment.apiUrl}/product/get-products?page=${page}&keyword=${keyword}`
    );
  }
}
