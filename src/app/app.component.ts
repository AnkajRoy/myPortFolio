import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { CommandPaletteComponent } from './components/command-palette/command-palette.component';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent, CommandPaletteComponent],
  template: `
    <div class="app-shell">
      <app-header></app-header>
      <main id="main-content" tabindex="-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-back-to-top></app-back-to-top>
      <app-command-palette></app-command-palette>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    main {
      flex: 1;
      outline: none;
    }
  `]
})
export class AppComponent {
  // Eagerly construct so the dark-mode class is applied before first paint.
  private readonly theme = inject(ThemeService);
  title = 'Ankaj Kumar — Frontend Engineer';
}
