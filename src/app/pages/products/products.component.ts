import { ProductService } from './../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from './../../utils/jwt.service';
import { ProductDto } from './../../data/Dto/product/product.dto';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'meal-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  userToken: any = this.jwtService.decodeJwtToken();
  IsMobile!: boolean;
  IsFetching!: boolean;
  IsActive!: boolean;
  products!: ProductDto[] | undefined;
  productId!: string;

  constructor(
    private jwtService: JwtService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.handleWindowResize();
    this.getProducts();
    this.productId = this.activeRoute.snapshot.params['id'];
    this.activeBtn();
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

  activeBtn(): void {
    this.IsActive = !this.IsActive;
  }

  getProducts(productCategory: string = '', page: number = 1): void {
    this.IsFetching = true;
    this.productService.getProducts(productCategory, page).subscribe({
      next: (response) => {
        this.products = response.data;
        this.IsFetching = false;
      },
      error: (err) => {
        this.IsFetching = false;
      },
    });
  }
}
