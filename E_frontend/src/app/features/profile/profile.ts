import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm;
  successMessage = '';

  constructor(public authService: AuthService, private formBilder: FormBuilder) {
    const currentUser = this.authService.currentUser();
    this.profileForm = this.formBilder.nonNullable.group({
      name: [currentUser?.name ?? '', Validators.required],
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
    const updatedUser = {
      ...currentUser,
      name,
    };

    this.authService.updateUser(updatedUser);
    this.successMessage = 'Perfil actualizado correctamente';

    console.log('Perfil actualizado');
    console.log(updatedUser);
  }
}
