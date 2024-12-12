import { Component } from '@angular/core';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent,PanelMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'daw-app-admin';
}
  