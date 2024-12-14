import { TipoDocumentoDTO } from './tipo-documento';

export interface EmpleadoDTO {
  idEmpleado: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  idDocumento: TipoDocumentoDTO;
  docIdentidad: string;
  salario: number;
  fechaIngreso: Date;
  estado: number;
  fechaRegistro: Date;
  fechaActualizacion: Date;
}