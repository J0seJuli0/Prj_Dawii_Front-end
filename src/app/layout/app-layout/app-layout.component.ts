import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule para usar router-outlet
import { MenuComponent } from '../../menu/menu/menu.component';  // Importa el componente de menú

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterModule,  
    MenuComponent 
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']   
})
export class AppLayoutComponent {

}
