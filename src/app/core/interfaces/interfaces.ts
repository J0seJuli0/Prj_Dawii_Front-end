export interface RolDTO {
  idRol: string;
  rol: string;
  tipoUsuario: number;
  descripcion: string;
}

export interface MenuDTO {
  idMenu: number;
  nombreMenu: string;
  ordenMenu: number;
  estadoMenu: boolean;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface SubMenuDTO {
  idSubMenus: number;
  idMenu: MenuDTO;
  nombreSubMenu: string;
  enlaceSubMenu: string;
  ordenSubMenu: number;
  estadoSubMenu: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface PermisosRolDTO {
  idRol: string;
  idSubmenu: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface ActualizarPermisosRequest {
  idRol: string; // ID del rol
  idSubmenuActual: number[]; // IDs de permisos actuales
  idSubmenuNuevo: number[]; // IDs de nuevos permisos
}
