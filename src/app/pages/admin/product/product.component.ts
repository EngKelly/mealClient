import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from 'src/app/data/Dto/product/product.dto';

@Component({
  selector: 'meal-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class AdminProductComponent {
  foodForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.foodForm = this.formBuilder.group({
      title: ['', Validators.required],
      img: ['', Validators.required],
      Instock: [false, Validators.required],
      size: [[], Validators.required],
      color: [[], Validators.required],
      categories: [[], Validators.required],
      desc: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.foodForm.valid) {
      const newFoodItem: ProductDto = this.foodForm.value;
      console.log(newFoodItem); // Replace with your logic to save the new food item
    }
  }
}
