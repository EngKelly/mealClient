import { AuthService } from './../../services/auth/auth.service';
import { SignUpDto } from './../../data/Dto/signup.dto';
import { Component } from '@angular/core';
import { HttpResponse } from '../../data/Dto/http.response';
import { Router } from '@angular/router';

@Component({
  selector: 'meal-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  IsRememberMe: boolean = false;
  error!: HttpResponse | null;
  IsFetching!: boolean;
  user: SignUpDto = {
    email: '',
    username: '',
    country: '',
    password: '',
    roles: [],
  };
  constructor(private authService: AuthService, private router: Router) {}

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.error = null;
    }, timeOut);
  }

  toggleChoice(): void {
    this.IsRememberMe = !this.IsRememberMe;
  }

  onSubmit(): void {
    this.IsFetching = true;
    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        if (response.data !== null) {
          const IsSaved: boolean =
            this.authService.saveUserSessionAsync(response);
          if (IsSaved) {
            this.IsFetching = false;
            this.router.navigateByUrl('');
          }
        }
      },
      error: (err) => {
        this.error = err.error.message;
        this.IsFetching = false;
        this.setTimeOut(3000);
      },
    });
  }
}
