import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu/menu.component';

@Component({
  selector: 'app-vista-admin',
  standalone:true,
  imports: [MenuComponent],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.scss'
})
export class VistaAdminComponent {

}
