import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../shared/theme.service';
import { ResumeService } from '../../shared/resume.service';
import { CommandPaletteService } from '../../shared/command-palette.service';
import { PROFILE } from '../../shared/resume.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" [class.scrolled]="scrolled()">
      <div class="container header-inner">
        <a routerLink="/" class="logo" (click)="closeMenu()" aria-label="Ankaj Kumar — Home">
          <span class="logo-mark" aria-hidden="true">AK</span>
          <span class="logo-text">
            <span class="logo-name">{{ profile.name }}</span>
            <span class="logo-role">{{ profile.role }}</span>
          </span>
        </a>

        <nav class="nav-desktop" aria-label="Primary">
          <a *ngFor="let l of links"
             [routerLink]="l.path"
             routerLinkActive="active"
             [routerLinkActiveOptions]="l.exact ? {exact: true} : {exact: false}"
             class="nav-link">
            {{ l.label }}
          </a>
        </nav>

        <div class="header-actions">
          <button class="cmdk-btn desktop-cmdk" type="button"
                  (click)="palette.show()"
                  aria-label="Open command palette"
                  title="Open command palette">
            <i class="pi pi-search" aria-hidden="true"></i>
            <span class="cmdk-label">Search…</span>
            <span class="cmdk-keys"><kbd>{{ modKey }}</kbd><kbd>K</kbd></span>
          </button>

          <button class="icon-btn cmdk-icon" type="button"
                  (click)="palette.show()"
                  aria-label="Open command palette">
            <i class="pi pi-search" aria-hidden="true"></i>
          </button>

          <button class="icon-btn" type="button"
                  (click)="theme.toggle()"
                  [attr.aria-label]="isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
                  [attr.aria-pressed]="isDark()">
            <i [class]="isDark() ? 'pi pi-sun' : 'pi pi-moon'" aria-hidden="true"></i>
          </button>

          <button class="cta-btn desktop-cta" type="button" (click)="resume.open()">
            <i class="pi pi-download" aria-hidden="true"></i>
            <span>Resume</span>
          </button>

          <button class="icon-btn menu-toggle" type="button"
                  (click)="toggleMenu()"
                  [attr.aria-expanded]="menuOpen()"
                  aria-label="Toggle navigation menu"
                  aria-controls="mobile-menu">
            <i [class]="menuOpen() ? 'pi pi-times' : 'pi pi-bars'" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Drawer + scrim live OUTSIDE the header so backdrop-filter on the
         header doesn't trap their position:fixed inside its container. -->
    <div class="scrim" [class.open]="menuOpen()" (click)="closeMenu()" aria-hidden="true"></div>
    <aside id="mobile-menu"
           class="mobile-menu"
           [class.open]="menuOpen()"
           [attr.aria-hidden]="!menuOpen()"
           role="dialog"
           aria-modal="true"
           aria-label="Mobile navigation">
      <nav aria-label="Mobile primary">
        <a *ngFor="let l of links"
           [routerLink]="l.path"
           routerLinkActive="active"
           [routerLinkActiveOptions]="l.exact ? {exact: true} : {exact: false}"
           class="mobile-link"
           [attr.tabindex]="menuOpen() ? 0 : -1"
           (click)="closeMenu()">
          <i [class]="l.icon" aria-hidden="true"></i>
          <span>{{ l.label }}</span>
        </a>
        <button class="mobile-link cta" type="button"
                [attr.tabindex]="menuOpen() ? 0 : -1"
                (click)="downloadAndClose()">
          <i class="pi pi-download" aria-hidden="true"></i>
          <span>Download Resume</span>
        </button>
      </nav>
    </aside>
  `,
  styles: [`
    :host { display: block; }
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: color-mix(in srgb, var(--bg-primary) 88%, transparent);
      backdrop-filter: saturate(180%) blur(14px);
      -webkit-backdrop-filter: saturate(180%) blur(14px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .header.scrolled {
      border-bottom-color: var(--border-light);
      box-shadow: var(--shadow-sm);
    }
    .header-inner {
      display: flex;
      align-items: center;
      gap: 1rem;
      height: var(--header-height);
    }
    .logo {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }
    .logo-mark {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-weight: 800;
      letter-spacing: -0.02em;
      box-shadow: var(--shadow-sm);
    }
    .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
    .logo-name { font-weight: 700; color: var(--text-dark); font-size: 1rem; }
    .logo-role { font-size: 0.75rem; color: var(--text-light); }

    .nav-desktop {
      margin-left: auto;
      display: flex;
      gap: 0.25rem;
    }
    .nav-link {
      position: relative;
      padding: 0.55rem 0.9rem;
      font-weight: 500;
      color: var(--text-medium);
      border-radius: var(--radius-md);
      text-decoration: none;
      transition: color 0.2s ease, background 0.2s ease;
    }
    .nav-link:hover { color: var(--primary-color); background: var(--bg-secondary); }
    .nav-link.active { color: var(--primary-color); }
    .nav-link.active::after {
      content: '';
      position: absolute;
      left: 0.9rem; right: 0.9rem; bottom: 0.2rem;
      height: 2px; border-radius: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
    }
    .nav-desktop + .header-actions { margin-left: 0; }

    .icon-btn {
      width: 40px; height: 40px;
      display: inline-flex;
      align-items: center; justify-content: center;
      border: 1px solid var(--border-light);
      background: var(--bg-primary);
      color: var(--text-dark);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    }
    .icon-btn:hover {
      background: var(--bg-secondary);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1rem;
      border-radius: var(--radius-md);
      border: none;
      cursor: pointer;
      font-weight: 600;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      min-height: 40px;
    }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

    .menu-toggle { display: none; }

    /* Command-palette launcher */
    .cmdk-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.45rem 0.75rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      background: var(--bg-secondary);
      color: var(--text-light);
      font-size: 0.85rem;
      cursor: pointer;
      min-height: 40px;
      min-width: 200px;
      transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    }
    .cmdk-btn:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: var(--bg-primary);
    }
    .cmdk-label { flex: 1; text-align: left; }
    .cmdk-keys { display: inline-flex; gap: 0.2rem; }
    .cmdk-keys kbd {
      font-family: inherit;
      font-size: 0.7rem;
      padding: 0.05rem 0.35rem;
      border-radius: 5px;
      border: 1px solid var(--border-medium);
      background: var(--bg-primary);
      color: var(--text-medium);
      line-height: 1.4;
    }
    .cmdk-icon { display: none; }
    @media (max-width: 1100px) {
      .desktop-cmdk { display: none; }
      .cmdk-icon { display: inline-flex; }
    }
    @media (max-width: 900px) {
      /* Already hidden by the responsive block below when nav collapses;
         keep the icon variant visible so mobile users still have access. */
      .cmdk-icon { display: inline-flex; }
    }

    /* Mobile drawer */
    .mobile-menu {
      position: fixed;
      top: var(--header-height);
      right: 0;
      bottom: 0;
      width: min(80vw, 320px);
      background: var(--bg-primary);
      border-left: 1px solid var(--border-light);
      box-shadow: var(--shadow-xl);
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      z-index: 1001;
      overflow-y: auto;
    }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
    }
    .mobile-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--text-dark);
      font-weight: 500;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      transition: background 0.2s ease, color 0.2s ease;
      min-height: 44px;
    }
    .mobile-link:hover { background: var(--bg-secondary); color: var(--primary-color); }
    .mobile-link.active { color: var(--primary-color); background: var(--bg-secondary); }
    .mobile-link i { font-size: 1.05rem; width: 1.5rem; text-align: center; }
    .mobile-link.cta {
      margin-top: 1rem;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      justify-content: center;
    }
    .mobile-link.cta:hover { color: #fff; opacity: 0.95; }

    .scrim {
      position: fixed;
      inset: var(--header-height) 0 0 0;
      background: rgba(15, 23, 42, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      z-index: 1000;
    }
    .scrim.open { opacity: 1; pointer-events: auto; }

    @media (max-width: 900px) {
      .nav-desktop, .desktop-cta { display: none; }
      .menu-toggle { display: inline-flex; }
      .logo-text { display: none; }
    }
    @media (max-width: 480px) {
      .header-inner { gap: 0.5rem; }
    }
  `]
})
export class HeaderComponent {
  readonly profile = PROFILE;
  readonly theme = inject(ThemeService);
  readonly resume = inject(ResumeService);
  readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router);

  readonly modKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl';

  links = [
    { label: 'Home',       path: '/',           exact: true,  icon: 'pi pi-home' },
    { label: 'About',      path: '/about',      exact: false, icon: 'pi pi-user' },
    { label: 'Experience', path: '/experience', exact: false, icon: 'pi pi-briefcase' },
    { label: 'Projects',   path: '/projects',   exact: false, icon: 'pi pi-th-large' },
    { label: 'Contact',    path: '/contact',    exact: false, icon: 'pi pi-envelope' }
  ];

  menuOpen = signal(false);
  scrolled = signal(false);

  isDark = () => this.theme.theme() === 'dark';

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('window:keydown.escape')
  onEsc() {
    if (this.menuOpen()) this.closeMenu();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }
  closeMenu() {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
  downloadAndClose() {
    this.resume.open();
    this.closeMenu();
  }
}
