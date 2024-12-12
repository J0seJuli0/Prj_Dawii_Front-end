import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api'; // PrimeNG menu structure
import { TieredMenuModule } from 'primeng/tieredmenu'; 
import { PanelMenuModule } from 'primeng/panelmenu'; // Para menús laterales

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, TieredMenuModule],
  template: `
    <div class="sidebar-container">
      <p-panelMenu [model]="menuItems" styleClass="w-full md:w-20rem"></p-panelMenu>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Escritorio',
      icon: 'pi pi-home',
      items: [
        { label: 'Resumen', icon: 'pi pi-chart-line' },
        { label: 'Actividades', icon: 'pi pi-calendar' }
      ]
    },
    {
      label: 'Entradas',
      icon: 'pi pi-pencil',
      items: [
        { label: 'Todas las entradas', icon: 'pi pi-list' },
        { label: 'Añadir nueva', icon: 'pi pi-plus' }
      ]
    },
    {
      label: 'Medios',
      icon: 'pi pi-images',
      items: [
        { label: 'Biblioteca', icon: 'pi pi-folder-open' },
        { label: 'Añadir nuevo', icon: 'pi pi-upload' }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      items: [
        { label: 'Todos los usuarios', icon: 'pi pi-user' },
        { label: 'Añadir nuevo', icon: 'pi pi-user-plus' },
        { label: 'Perfil', icon: 'pi pi-id-card' }
      ]
    },
    {
      label: 'Ajustes',
      icon: 'pi pi-cog',
      items: [
        { label: 'Generales', icon: 'pi pi-sliders-h' },
        { label: 'Escritura', icon: 'pi pi-pencil' },
        { label: 'Lectura', icon: 'pi pi-eye' }
      ]
    }
  ];
}
