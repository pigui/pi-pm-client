import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@web/auth';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  templateUrl: 'register.view.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterView {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading = this.authFacade.isLoading;
  user = this.authFacade.user;

  loggedSuccess = computed(() => (this.user() ? 'success' : 'primary'));

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    const {
      email = '',
      password = '',
      firstName = '',
      lastName = '',
    } = this.form.value;
    this.authFacade.registerWithPassword(email, password, firstName, lastName);
  }

  goLogin(): void {
    this.router.navigate(['auth', 'login']);
  }
}
