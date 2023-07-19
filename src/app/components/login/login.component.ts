import { Component } from '@angular/core';
import { HttpResponse } from '../../data/Dto/http.response';
import { LoginDto } from '../../data/Dto/login.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'meal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  error!: HttpResponse | null;
  IsFetching!: boolean;
  user: LoginDto = { email: '', password: '', IsRememberMe: false };

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.error = null;
    }, timeOut);
  }

  onSubmit(): void {
    this.IsFetching = true;
    this.authService.Login(this.user).subscribe({
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
        this.setTimeOut();
      },
    });
  }
}
