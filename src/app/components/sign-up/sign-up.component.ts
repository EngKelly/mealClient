import { UserDto } from './../../data/Dto/auth/user.dto';
import { localStorageToken } from './../../extension/local.storage';
import { AuthService } from './../../services/auth/auth.service';
import { SignUpDto } from '../../data/Dto/auth/signup.dto';
import { Component, Inject } from '@angular/core';
import { HttpResponse } from '../../data/Dto/auth/http.response';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'meal-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  IsRememberMe: boolean = false;
  error!: HttpResponse | null;
  IsFetching!: boolean;
  UserImgPath!: string;
  errorMessage!: any;
  successMessage!: any;
  uploadingImage!: boolean;
  uploaded!: boolean;

  user: SignUpDto = {
    email: '',
    username: '',
    profileURL: '',
    country: '',
    password: '',
    roles: ['user'],
  };
  constructor(
    private authService: AuthService,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  setTimeOut(timeOut: number = 2000): void {
    setTimeout(() => {
      this.error = null;
    }, timeOut);
  }

  toggleChoice(): void {
    this.IsRememberMe = !this.IsRememberMe;
  }

  onFileSelect(event: any): void {
    if (event.target.files.length <= 0) {
      return;
    }
    const image: File = event.target.files[0];
    this.uploadFile(image);
    this.UserImgPath = this.localStorage.getItem('UserImgPath')!;
  }

  uploadFile(file: File) {
    this.uploadingImage = true;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.authService.postImage(formData).subscribe({
      next: (res) => {
        if (res.statusCode == HttpStatusCode.Ok) {
          this.localStorage.removeItem('UserImgPath');
          this.localStorage.setItem('UserImgPath', res.data.ImgPath);
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

  onSubmit(): void {
    this.IsFetching = true;
    let user: UserDto = this.user;
    user.profileURL = this.localStorage.getItem('UserImgPath')!;
    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        if (response.data !== null) {
          const IsSaved: boolean = this.authService.saveUserSession(response);
          if (IsSaved) {
            this.IsFetching = false;
            window.location.assign('');
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
