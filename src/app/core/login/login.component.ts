import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputGroup } from 'primeng/inputgroup';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ButtonModule,InputTextModule,PasswordModule,ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Nota: Cambié 'styleUrl' a 'styleUrls'.
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Controla la visibilidad de la contraseña
  loading: boolean = false; // Controla el spinner de carga


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna entre visible y no visible
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Mostrar el spinner
      this.errorMessage = ''; // Limpiar mensajes previos de error
  
      const { email, contrasenia } = this.loginForm.value;
  
      this.loginService.login(email, contrasenia).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response.p_mensaje === 'Bienvenido') {
            console.log('Redirigiendo a ./vista-admin');
            // Retraso para el spinner
            setTimeout(() => {
              this.loading = false; // Ocultar el spinner
              this.router.navigate(['/vista-admin']); // Redirigir
            }, 2000); // Retraso de 2 segundos
          } else {
            this.errorMessage = 'Credenciales incorrectas.';
            this.loading = false; // Ocultar el spinner sin retraso
          }
        },
        error: (error) => {
          console.error('Error en el login:', error);
          this.errorMessage = error.message || 'Error inesperado.';
          this.loading = false; // Ocultar el spinner sin retraso
        },
      });
    }
  }
  
  
}
