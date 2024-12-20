import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8090/admin/usuario/login';

  constructor(private http: HttpClient) {}

  // Iniciar sesión
  login(email: string, contrasenia: string): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post<any>(url, {
      email,
      Clave:contrasenia,
    }).pipe(
      tap((response) => {
        if (response && response.token) {
          console.log('Token recibido:', response.token); // Mostrar el token en consola
          localStorage.setItem('token', response.token); // Guardar token en localStorage
        } else {
          console.warn('No se recibió token en la respuesta.');
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('Error al iniciar sesión:', error);
    return throwError('Error de inicio de sesión, verifique sus credenciales.');
  }
}
