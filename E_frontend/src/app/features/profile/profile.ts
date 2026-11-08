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

    this.successMessage = '';

    this.authService.updateUser(updatedUser).subscribe({
      next: () => {
        this.successMessage = 'Perfil actualizdo correctamente';
      },
      error: (error) => {
        console.error('Error el actualizar el perfil:', error);
        this.successMessage = '';
      },
    });
  }

  changePassword(): void {
    this.passwordSuccessMessage = '';
    this.passwordErrorMessage = '';

    if (this.passwordForm.invalid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = this.passwordForm.getRawValue();

    if (newPassword !== confirmPassword) {
      this.passwordErrorMessage = 'Las contraseñas nuevas no coinciden.';
      return;
    }

    this.authService.changePassword(
      currentPassword,
      newPassword
    ).subscribe({
      next: (response) => {
        this.passwordSuccessMessage = response.message;
        this.passwordForm.reset();
      },
      error: (error) => {
        this.passwordErrorMessage =
          error.error?.detail ?? 'No se puede actualizar la contraseña.';
      },
    });
  }
}
