import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.view.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeView {}
