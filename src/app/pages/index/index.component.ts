import { ProductDto } from './../../data/Dto/product/product.dto';
import { Component, HostListener, Inject } from '@angular/core';
import { JwtService } from '../../utils/jwt.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'meal-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  constructor(
    private jwtService: JwtService,
    private activeRoute: ActivatedRoute
  ) {}

  userToken: any = this.jwtService.decodeJwtToken();
  IsMobile!: boolean;
  IsActive!: boolean;
  products!: ProductDto[] | undefined;
  productId!: string;
  IsFetching!: boolean;

  ngOnInit() {
    this.handleWindowResize();
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

  @HostListener('window:offline', ['$event'])
  OnBrowserOffline(event: Event): void {
    console.log('oflline');
  }

  activeBtn(): void {
    this.IsActive = !this.IsActive;
  }
}
