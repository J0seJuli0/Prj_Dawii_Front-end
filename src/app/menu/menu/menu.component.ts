import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api'; // PrimeNG menu structure
import { TieredMenuModule } from 'primeng/tieredmenu'; 
import { PanelMenuModule } from 'primeng/panelmenu'; // Para menús laterales
import { Router } from '@angular/router'; // Para la navegación

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [PanelMenuModule, TieredMenuModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Empleados',  
      icon: 'pi pi-users', 
      command: () => this.navigateToEmpleados() 
    },
    {
      label: 'Gestión de roles o permisos',  // Nueva entrada para gestión de roles
      icon: 'pi pi-key',  // Icono para el nuevo ítem
      command: () => this.navigateToRoles()  // Navegar a la nueva vista
    }
  ];

  constructor(private router: Router) {}

  navigateToEmpleados(): void {
    this.router.navigate(['/empleados']); 
  }

  navigateToRoles(): void {
    this.router.navigate(['/gestion-roles']); 
  }
}
