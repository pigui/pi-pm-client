import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthFacade } from '@web/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.view.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginView {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  isLoading = this.authFacade.isLoading;
  user = this.authFacade.user;

  loggedSuccess = computed(() => (this.user() ? 'success' : 'primary'));

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    const { email = '', password = '' } = this.form.value;
    this.authFacade.loginWithPassword(email, password);
  }

  goRegister(): void {
    this.router.navigate(['auth', 'register']);
  }
}
