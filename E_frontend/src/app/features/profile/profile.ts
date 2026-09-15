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

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    const currentUser = this.authService.currentUser();
    this.profileForm = this.formBuilder.nonNullable.group({
      name: [currentUser?.name ?? '', Validators.required],
    });

    this.passwordForm = this.formBuilder.nonNullable.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
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
    this.passwordErrorMessage = '';

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const {
      currentPassword,
      newPassword,
      confirmPassword 
    } = this.passwordForm.getRawValue();

    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      return;
    }
    if (currentPassword !== currentUser?.password) {
      this.passwordErrorMessage = 'La contraseña actual es incorrecta';
      return;
    }
    if (newPassword !== confirmPassword) {
      this.passwordErrorMessage = 'La nueva contraseña no coincide';
      return;
    }

    const updateUser = {...currentUser, password: newPassword};

    this.authService.updateUser(updateUser);
    this.passwordForm.reset();
    this.passwordSuccessMessage = 'Contraseña actualizada correctamente';
  }
}
