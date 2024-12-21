import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MenuDTO, SubMenuDTO } from '../core/interfaces/interfaces';
import { RolPermisoService } from '../rol-permiso/service/rol-permiso.service';

@Component({
  selector: 'app-menu-rol',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule
  ],
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.scss']
})
export class MenuRolComponent implements OnInit {
  menus: MenuDTO[] = []; // Listado de menús
  submenus: SubMenuDTO[] = []; // Submenús del menú seleccionado
  selectedMenu: MenuDTO | null = null; // Menú seleccionado

  constructor(private rolPermisoService: RolPermisoService) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  /**
   * Carga todos los menús disponibles.
   */
  loadMenus(): void {
    this.rolPermisoService.getMenus().subscribe({
      next: menus => this.menus = menus,
      error: err => console.error('Error al cargar menús:', err)
    });
  }

  /**
   * Carga los submenús del menú seleccionado.
   * @param menu Menú seleccionado
   */
  loadSubmenus(menu: MenuDTO): void {
    this.selectedMenu = menu;
    this.rolPermisoService.getSubmenusByMenu(menu.idMenu).subscribe({
      next: submenus => this.submenus = submenus,
      error: err => console.error('Error al cargar submenús:', err)
    });
  }

  /**
   * Actualiza el estado del submenú (activo/inactivo).
   * @param submenu Submenú a actualizar
   */
  updateSubmenuStatus(submenu: SubMenuDTO): void {
    submenu.activo = !submenu.activo; // Cambiar estado localmente para retroalimentación inmediata
  
    this.rolPermisoService.updateSubmenuStatus(submenu.idSubMenus, submenu.activo).subscribe({
      next: () => console.log(`Estado de submenú actualizado: ${submenu.nombreSubMenu}`),
      error: err => {
        console.error('Error al actualizar el estado del submenú:', err);
        submenu.activo = !submenu.activo; // Revertir cambio si falla la actualización
      }
    });
  }
  
}
