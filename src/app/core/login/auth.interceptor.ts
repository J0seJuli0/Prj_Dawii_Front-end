import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      // Recuperar el token desde localStorage
      const token = localStorage.getItem('token');
  
      // Clonar la solicitud y agregar el encabezado de autorización si hay un token
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(authReq);
      }
  
      // Si no hay token, se envía la solicitud original
      return next.handle(req);
    }
  }
  