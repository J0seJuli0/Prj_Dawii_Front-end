// menu.component.ts
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <img [src]="'assets/xdd.jpg'" alt="Michus Logo" class="logo-img"/>
        <span class="logo-text">Michus</span>
      </div>
      <p-panelMenu 
        [model]="menuItems" 
        [multiple]="false"
        styleClass="sidebar-menu">
      </p-panelMenu>
    </div>
  `,
  styles: [`
    .sidebar {
      height: 100vh;
      width: 250px;
      background-color: #f8f9fa;
      border-right: 1px solid #dee2e6;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      background-color: #1e3d58;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .logo-text {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
    }

    :host ::ng-deep {
      .sidebar-menu {
        border: none;
        background: transparent;
        width: 100%;
        
        .p-panelmenu-header-link {
          padding: 1rem;
          background: transparent;
          border: none;
          color: #495057;
          font-weight: 500;
          transition: all 0.2s;

          &:hover {
            background: #e9ecef;
          }

          .p-menuitem-icon {
            color: #6c757d;
            margin-right: 0.75rem;
          }
        }

        .p-panelmenu-content {
          border: none;
          background: transparent;
        }

        .p-menuitem-link {
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          color: #6c757d;

          &:hover {
            background: #e9ecef;
          }

          .p-menuitem-icon {
            color: #6c757d;
            margin-right: 0.75rem;
          }
        }
      }
    }
  `]
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Lista de Empleados',
          icon: 'pi pi-list',
          command: () => this.router.navigate(['/empleados'])
        }
      ]
    },
    {
      label: 'Roles y Permisos',
      icon: 'pi pi-key',
      items: [
        {
          label: 'Gestionar Roles',
          icon: 'pi pi-cog',
          command: () => this.router.navigate(['/rol-permiso'])
        },
        {
          label: 'Gestion de menus',
          icon: 'pi pi-cog',
          command: () => this.router.navigate(['/menu-rol'])
        }
      ]
    }
  ];

  constructor(private router: Router) {}
}