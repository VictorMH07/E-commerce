import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.registerForm = this.formBuilder.nonNullable.group({
      name: ['', Validators.required, Validators.minLength(2)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  
  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user = this.registerForm.getRawValue();

    this.errorMessage = '';

    this.authService.register(user).subscribe({
      next: () => {
        console.log('Registro realizado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Ya existe un usuario con este correo electrónico.';
        } else if (error.status === 422) {
          this.errorMessage = 'Verifica los datos. La contraseña debe tener al menos 8 caracteres.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrar el usuario.';
        }
      },
    });
  }
}