import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost/Backend/crud.php';

  constructor(private http:HttpClient) {}

    login(username: string, password: string) {
      return this.http.post(`${this.url}`, { accion: 'login' , username, password });
    }
}
