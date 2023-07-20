import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../../data/Dto/auth/user.dto';
import { Observable } from 'rxjs';
import { HttpResponse } from 'src/app/data/Dto/auth/http.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //   UpdateUser(id: string, model: UserDto): Observable<HttpResponse<UserDto>>{}
  PatchUpdateUser(id: string, model: UserDto) {}

  getUser(id: string): Observable<HttpResponse<UserDto>> {
    const url: string = `${environment.apiUrl}/user/${id}`;
    return this.http.get<HttpResponse<UserDto>>(url);
  }

  getUsers(query: { keyword: string; page: number }): void {}
  deleteUser(id: string) {}
}
