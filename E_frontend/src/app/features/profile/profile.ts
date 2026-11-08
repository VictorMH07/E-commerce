import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm;
  passwordForm;

  successMessage = '';
  passwordSuccessMessage = '';
  passwordErrorMessage = '';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    const currentUser = this.authService.currentUser();

    this.profileForm = this.formBuilder.nonNullable.group({
      name: [currentUser?.name ?? '', Validators.required],
    });

    this.passwordForm = this.formBuilder.nonNullable.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });    
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return;
    }

    const { name } = this.profileForm.getRawValue();
    const updatedUser = {...currentUser, name,};

    this.authService.updateUser(updatedUser);
    this.successMessage = 'Perfil actualizado correctamente';
  }

  changePassword(): void {
    this.passwordSuccessMessage = '';
    this.passwordErrorMessage = 'El cambio de contraseña estará disponible cuando implementemos este endpoint.';
  }
}
