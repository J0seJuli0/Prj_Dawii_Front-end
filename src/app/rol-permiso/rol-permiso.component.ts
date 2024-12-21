import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { RolPermisoService } from './service/rol-permiso.service';
import { MenuDTO, PermisosRolDTO, RolDTO, SubMenuDTO } from '../core/interfaces/interfaces';

@Component({
  selector: 'app-rol-permiso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    TreeModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [MessageService, RolPermisoService],
  templateUrl: './rol-permiso.component.html',
  styleUrl: './rol-permiso.component.scss'
})
export class RolPermisoComponent implements OnInit {
  roles: RolDTO[] = [];
  menus: MenuDTO[] = [];
  submenus: SubMenuDTO[] = [];
  currentPermissions: number[] = [];
  selectedNodes: any[] = [];

  displayNewRolDialog: boolean = false;
  displayPermissionsDialog: boolean = false;

  newRol: RolDTO = { idRol: '', rol: '', tipoUsuario: 0, descripcion: '' };
  selectedRol: RolDTO | null = null;

  menuNodes: any[] = [];

  constructor(private rolesService: RolPermisoService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.rolesService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => console.error('Error al cargar roles:', err)
    });

    this.rolesService.getMenus().subscribe(menus => {
      this.menus = menus;
      this.rolesService.getSubmenus().subscribe(submenus => {
        this.submenus = submenus;
        this.transformMenuToNodes();
      });
    });
  }

  transformMenuToNodes() {
    this.menuNodes = this.menus.map(menu => ({
      key: `menu_${menu.idMenu}`,
      label: menu.nombreMenu,
      data: menu,
      children: this.submenus
        .filter(submenu => submenu.idMenu.idMenu === menu.idMenu)
        .map(submenu => ({
          key: `submenu_${submenu.idSubMenus}`,
          label: submenu.nombreSubMenu,
          data: submenu
        }))
    }));
  }

  showNewRolDialog() {
    this.newRol = { idRol: '', rol: '', tipoUsuario: 0, descripcion: '' };
    this.displayNewRolDialog = true;
  }

  saveNewRol() {
    if (!this.newRol.rol || !this.newRol.descripcion || this.newRol.tipoUsuario === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
      return;
    }

    this.newRol.idRol = this.generateNextId();
    this.rolesService.createRol(this.newRol).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Rol creado correctamente' });
        this.loadInitialData();
        this.displayNewRolDialog = false;
      },
      error: err => {
        console.error('Error al crear rol:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el rol' });
      }
    });
  }

  showPermissionsDialog(rol: RolDTO) {
    this.selectedRol = rol;
    this.rolesService.getRolPermissions(rol.idRol).subscribe(permissions => {
      this.currentPermissions = permissions.map(p => p.idSubmenu);
      this.selectedNodes = this.transformPermissionsToNodes(permissions);
      this.displayPermissionsDialog = true;
    });
  }

  transformPermissionsToNodes(permissions: PermisosRolDTO[]) {
    const submenuIds = permissions.map(p => p.idSubmenu);
    return this.menuNodes.filter(node =>
      node.children.some((child: any) => submenuIds.includes(child.data.idSubMenus))
    );
  }

  hideNewRolDialog() {
    this.displayNewRolDialog = false;
  }
  hidePermissionsDialog() {
    this.displayPermissionsDialog = false;
    this.selectedRol = null;
    this.selectedNodes = [];
    this.currentPermissions = [];
  }

  savePermissions() {
    if (!this.selectedRol) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione un rol válido' });
      return;
    }

    const newPermissions = this.selectedNodes
      .filter(node => node.key.startsWith('submenu_'))
      .map(node => parseInt(node.data.idSubMenus, 10));

    this.rolesService.updateRolPermissions(this.selectedRol.idRol, this.currentPermissions, newPermissions)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Permisos actualizados correctamente' });
          this.displayPermissionsDialog = false;
          this.loadInitialData();
        },
        error: err => {
          console.error('Error al actualizar permisos:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar permisos' });
        }
      });
  }

  generateNextId(): string {
    if (!this.roles.length) return 'R01';
    const lastId = Math.max(...this.roles.map(role => parseInt(role.idRol.substring(1), 10)));
    return `R${(lastId + 1).toString().padStart(2, '0')}`;
  }
  
}