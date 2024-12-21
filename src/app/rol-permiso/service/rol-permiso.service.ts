import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActualizarPermisosRequest, MenuDTO, PermisosRolDTO, RolDTO, SubMenuDTO } from '../../core/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolPermisoService {
  private baseUrl = 'http://localhost:8090/admin'; // URL base

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
        'Authorization': `Bearer ${token.trim()}`,
        'Content-Type': 'application/json'
    });
}
getSubmenusByMenu(menuId: number): Observable<SubMenuDTO[]> {
  return this.http.get<SubMenuDTO[]>(`${this.baseUrl}/menus/${menuId}/submenus`);
}
updateSubmenuStatus(submenuId: number, activo: boolean): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/submenus/${submenuId}/status`, { activo });
}
  getRoles(): Observable<RolDTO[]> {
    return this.http.get<RolDTO[]>(`${this.baseUrl}/rol/listarrol`, { headers: this.getHeaders() });
  }

  getMenus(): Observable<MenuDTO[]> {
    return this.http.get<MenuDTO[]>(`${this.baseUrl}/menu/listarmenu`, { headers: this.getHeaders() });
  }

  getSubmenus(): Observable<SubMenuDTO[]> {
    return this.http.get<SubMenuDTO[]>(`${this.baseUrl}/sub_menu/listarsubmenu`, { headers: this.getHeaders() });
  }

  getRolPermissions(idRol: string): Observable<PermisosRolDTO[]> {
    return this.http.get<PermisosRolDTO[]>(`${this.baseUrl}/permisosrol/listarpermisorol`, { headers: this.getHeaders() })
      .pipe(map(permisos => permisos.filter(p => p.idRol === idRol))); // Filtrar por idRol
  }

  createRol(rol: RolDTO): Observable<RolDTO> {
    return this.http.post<RolDTO>(`${this.baseUrl}/rol/crearrol`, rol, { headers: this.getHeaders() });
  }

  updateRolPermissions(idRol: string, currentPermisos: number[], newPermisos: number[]): Observable<any> {
    const request: ActualizarPermisosRequest = {
      idRol,
      idSubmenuActual: currentPermisos,
      idSubmenuNuevo: newPermisos
    };

    return this.http.put(`${this.baseUrl}/permisosrol/actualizar`, request, { 
      headers: this.getHeaders(), 
      observe: 'response' 
    }).pipe(
      catchError(error => {
        console.error('Error al actualizar permisos:', error);
        return of(error); // Manejar errores
      })
    );
  }
}
