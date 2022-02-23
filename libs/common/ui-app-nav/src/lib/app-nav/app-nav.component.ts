import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'jp-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavComponent {
  @Input() title!: string;
  @Input() loggedIn!: boolean;
  @Input() username?: string;
  @Output() signout = new EventEmitter<void>();

  onSignout(): void {
    this.signout.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [AppNavComponent],
  exports: [AppNavComponent],
})
export class AppNavComponentModule {}
