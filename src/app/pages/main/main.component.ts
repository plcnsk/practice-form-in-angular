import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthUserService } from '../../shared/services/app/auth-user.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';
import { AppStoreService } from '../../shared/services/app/app-store.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgForOf, AsyncPipe, DatePipe, RouterOutlet],
})
export class MainComponent {
  readonly posts$ = this.appStore.posts$;

  constructor(
    private readonly authUserService: AuthUserService,
    private readonly appStore: AppStoreService,
  ) {}

  logOut(): void {
    this.authUserService.logOut();
  }
}
