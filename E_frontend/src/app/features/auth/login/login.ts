import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm;
  errorMessage = ''

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.errorMessage = '';

    this.authService.login(email, password).subscribe({
      next: (user) => {
        console.log('Inicio de sesión correcto', user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        }else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión';
        }
      },
    });
  }
} 