import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmpleadoDTO } from '../models/empleado.model';
import { RolDTO } from '../models/rol';
import { TipoDocumentoDTO } from '../models/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiUrl = 'http://localhost:8090/admin'; 

  constructor(private http: HttpClient) { }

  listarEmpleados(): Observable<EmpleadoDTO[]> {
    return this.http.get<EmpleadoDTO[]>(`${this.apiUrl}/empleado/listarempleado`);
  }

  listarRoles(): Observable<RolDTO[]> {
    return this.http.get<RolDTO[]>(`${this.apiUrl}/rol/listarrol`);
  }

  actualizarRol(idUsuario: string, idRol: string): Observable<void> {
    const body = { idUsuario, idRol };
    return this.http.put<void>(`${this.apiUrl}/usuario/actualizar-rol`, body);
  }

  listarTiposDocumento(): Observable<TipoDocumentoDTO[]> {
    return this.http.get<TipoDocumentoDTO[]>(`${this.apiUrl}/tipo_documento/listartipodocumento`);
  }

}
