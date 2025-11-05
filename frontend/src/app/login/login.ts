import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../shared/models/user.interface';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ConfirmDialogModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [ConfirmationService],
})
export class Login {
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      this.showWarningDialog('El formulario contiene errores.');
      return;
    }
    const userData = this.loginForm.getRawValue() as IUser;
    this.singIn(userData);
  }

  singIn(user: IUser) {
    this.authService.signIn$(user).subscribe({
      next: () => {
        this.goCoachees();
      },
      error: () => {
        this.showErrorDialog('Datos de acceso no válidos.');
      },
    });
  }

  showWarningDialog(warning: string) {
    this.confirmationService.confirm({
      message: warning,
      header: '¡Atención!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cerrar',
      rejectVisible: true,
      acceptVisible: false,
    });
  }

  showErrorDialog(error: string) {
    this.confirmationService.confirm({
      message: error,
      header: 'Error',
      icon: 'pi pi-times-circle',
      rejectLabel: 'Cerrar',
      rejectVisible: true,
      acceptVisible: false,
    });
  }

  goCoachees() {
    this.router.navigate(['/coachees']);
  }
}
