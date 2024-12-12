import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LayoutComponent } from './core/layout/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [LayoutComponent,PanelMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'daw-app-admin';
}
  