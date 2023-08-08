import { HttpStatusCode } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from 'src/app/data/Dto/product/product.dto';
import { localStorageToken } from 'src/app/extension/local.storage';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'meal-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class AddProductComponent {
  foodForm: FormGroup;
  ImgPath!: string;
  errorMessage!: any;
  successMessage!: any;
  uploadingImage!: boolean;
  uploaded!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    @Inject(localStorageToken) private localStorage: Storage
  ) {
    this.foodForm = this.formBuilder.group({
      title: ['', Validators.required],
      InStock: ['', Validators.required],
      categories: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      date: [''],
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length <= 0) {
      return;
    }
    const image: File = event.target.files[0];
    this.uploadFile(image);
    this.ImgPath = this.localStorage.getItem('ProductImgPath')!;
  }

  uploadFile(file: File) {
    this.uploadingImage = true;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.productService.postImage(formData).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.localStorage.removeItem('ProductImgPath');
          this.localStorage.setItem('ProductImgPath', res.data.ImgPath);
          this.uploaded = true;
          this.uploadingImage = false;
        } else {
          this.uploaded = false;
          this.uploadingImage = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message.message;
        this.uploadingImage = false;
        this.uploaded = false;
      },
    });
  }

  onSubmit() {
    if (this.foodForm.valid) {
      let newFoodItem: ProductDto = this.foodForm.value;
      newFoodItem.img = this.localStorage.getItem('ImgPath')!;
      this.productService.createProduct(newFoodItem).subscribe({
        next: (response) => {
          if (response.statusCode == HttpStatusCode.Ok) {
            this.successMessage = response.message;
          } else {
            this.errorMessage =
              'Something went wrong while uploading the product.';
          }
        },
        error: (err) => {
          this.errorMessage = err.message.message;
          console.log(err.message);
        },
      });
    }
  }
}
