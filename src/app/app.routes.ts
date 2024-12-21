import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { VistaAdminComponent } from './features/vista-admin/vista-admin/vista-admin.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleado/lista-empleado.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';  
import { RolPermisoComponent } from './rol-permiso/rol-permiso.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login como vista principal
  { path: 'login', component: LoginComponent }, 
  {
    path: '',
    component: AppLayoutComponent,  
    children: [
      { path: 'vista-admin', component: VistaAdminComponent }, 
      { path: 'empleados', component: ListaEmpleadosComponent },
      { path: 'rol-permiso', component: RolPermisoComponent },

    ]
  },
  { path: '**', redirectTo: 'login' }, // Ruta wildcard que redirige a login
];
