import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { VistaAdminComponent } from './features/vista-admin/vista-admin/vista-admin.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vista-admin', component: VistaAdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta inicial
  { path: '**', redirectTo: 'login' }, // Ruta para manejar errores
];
