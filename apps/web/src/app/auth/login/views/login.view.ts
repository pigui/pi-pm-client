import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthFacade, User } from '@web/auth';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.view.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginView {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  isLoading: Signal<boolean> = this.authFacade.isLoading;
  user: Signal<User | null> = this.authFacade.user;

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
