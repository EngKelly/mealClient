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

  createProduct(model: ProductDto): Observable<HttpResponse<ProductDto>> {
    const url: string = `${environment.apiUrl}/product/new`;
    return this.http.post<HttpResponse<ProductDto>>(url, model);
  }

  postImage(file: FormData): Observable<HttpResponse<{ ImgPath: string }>> {
    const url: string = `${environment.apiUrl}/uploads/product`;
    return this.http.post<HttpResponse<{ ImgPath: string }>>(url, file);
  }

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
