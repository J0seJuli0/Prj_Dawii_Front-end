import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8090/admin/login';

  constructor(private http: HttpClient) {}

  // Iniciar sesión
  login(email: string, contrasenia: string): Observable<any> {
    const url = `http://localhost:8090/admin/login?email=${email}&contrasenia=${contrasenia}`;
  return this.http.post<any>(url, {});
  }

 
}
