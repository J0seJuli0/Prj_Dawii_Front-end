import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { VistaAdminComponent } from './features/vista-admin/vista-admin/vista-admin.component';
import { ListaEmpleadosComponent } from './empleados/lista-empleado/lista-empleado.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';  

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  {
    path: '',
    component: AppLayoutComponent,  
    children: [
      { path: 'vista-admin', component: VistaAdminComponent }, 
      { path: 'empleados', component: ListaEmpleadosComponent },  
      { path: '', redirectTo: 'vista-admin', pathMatch: 'full' },  
    ]
  },
  { path: '**', redirectTo: 'login' }, 
];
