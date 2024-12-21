import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule ,
    MessageModule
  
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Nota: Usando 'styleUrls'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Controla la visibilidad de la contraseña
  loading: boolean = false; // Controla el spinner de carga

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }

  // Método para alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el inicio de sesión
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
  
      const { email, contrasenia } = this.loginForm.value;

     


      this.loginService.login(email, contrasenia).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/vista-admin']); // Redirige al dashboard o página principal
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Correo o contraseña incorrectos.';
        },
      });
    }
  }
  
}
