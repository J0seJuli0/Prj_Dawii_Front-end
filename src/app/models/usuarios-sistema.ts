import { RolDTO } from './rol'; 
export interface UsuariosSistemaDTO {
  idUsuario: string;
  usuario: string;
  email: string;
  contrasenia: string;
  idRol: RolDTO;
  fechaCreacion: Date;
  fechaModificacion: Date;
  estado: number;
}