import {
  Component, ElementRef, HostListener, ViewChild, computed, effect, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommandPaletteService } from '../../shared/command-palette.service';
import { ThemeService } from '../../shared/theme.service';
import { ResumeService } from '../../shared/resume.service';
import { PROFILE } from '../../shared/resume.data';

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  group: 'Navigate' | 'Actions' | 'External' | 'Copy';
  keywords?: string;
  shortcut?: string[];
  run: () => void | Promise<void>;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="visible()">
      <div class="backdrop" (click)="close()" aria-hidden="true"></div>
      <div class="palette"
           role="dialog"
           aria-modal="true"
           aria-label="Command palette"
           (click)="$event.stopPropagation()">
        <div class="search">
          <i class="pi pi-search" aria-hidden="true"></i>
          <input #searchInput
                 type="text"
                 [value]="query()"
                 (input)="onQuery($any($event.target).value)"
                 (keydown)="onKey($event)"
                 placeholder="Type a command or jump to a section…"
                 aria-label="Search commands"
                 spellcheck="false"
                 autocomplete="off">
          <span class="kbd-hint">esc</span>
        </div>

        <div class="results" #resultsList>
          <ng-container *ngIf="grouped().length; else empty">
            <section class="group" *ngFor="let g of grouped()">
              <p class="group-title">{{ g.title }}</p>
              <ul role="listbox" [attr.aria-label]="g.title">
                <li *ngFor="let cmd of g.items"
                    role="option"
                    [attr.aria-selected]="cmd === active()"
                    [class.active]="cmd === active()"
                    [attr.data-id]="cmd.id"
                    (mouseenter)="setActive(cmd)"
                    (click)="execute(cmd)">
                  <span class="cmd-icon"><i [class]="cmd.icon" aria-hidden="true"></i></span>
                  <div class="cmd-body">
                    <span class="cmd-title">{{ cmd.title }}</span>
                    <span class="cmd-sub" *ngIf="cmd.subtitle">{{ cmd.subtitle }}</span>
                  </div>
                  <span class="cmd-shortcut" *ngIf="cmd.shortcut">
                    <kbd *ngFor="let k of cmd.shortcut">{{ k }}</kbd>
                  </span>
                </li>
              </ul>
            </section>
          </ng-container>
          <ng-template #empty>
            <div class="no-results">
              <i class="pi pi-inbox" aria-hidden="true"></i>
              <p>No commands match "{{ query() }}"</p>
            </div>
          </ng-template>
        </div>

        <footer class="foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
          <span class="grow"></span>
          <span class="brand">⌘K</span>
        </footer>
      </div>
    </ng-container>
  `,
  styles: [`
    :host { display: contents; }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 1100;
      animation: fade 0.18s ease-out;
    }

    .palette {
      position: fixed;
      top: clamp(2rem, 12vh, 8rem);
      left: 50%;
      transform: translateX(-50%);
      width: min(620px, 92vw);
      max-height: 70vh;
      background: var(--bg-primary);
      color: var(--text-dark);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
      z-index: 1101;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: pop 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pop {
      from { opacity: 0; transform: translate(-50%, -8px) scale(0.98); }
      to   { opacity: 1; transform: translate(-50%, 0)    scale(1); }
    }

    .search {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.9rem 1rem;
      border-bottom: 1px solid var(--border-light);
    }
    .search i { color: var(--text-light); font-size: 1.1rem; }
    .search input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      color: var(--text-dark);
      font-size: 1rem;
      font-family: inherit;
      padding: 0.25rem 0;
    }
    .search input::placeholder { color: var(--text-muted); }
    .kbd-hint {
      font-size: 0.7rem;
      color: var(--text-muted);
      border: 1px solid var(--border-light);
      padding: 0.1rem 0.4rem;
      border-radius: 6px;
      background: var(--bg-secondary);
    }

    .results {
      overflow-y: auto;
      padding: 0.5rem;
      flex: 1;
    }
    .group { margin-bottom: 0.5rem; }
    .group-title {
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 0.5rem 0.75rem 0.3rem;
      margin: 0;
    }
    ul { list-style: none; padding: 0; margin: 0; }
    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.12s ease;
    }
    li.active {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    li.active .cmd-title { color: var(--primary-color); }
    .cmd-icon {
      width: 32px; height: 32px;
      border-radius: 8px;
      display: inline-flex; align-items: center; justify-content: center;
      background: var(--bg-secondary);
      color: var(--primary-color);
      font-size: 0.95rem;
      flex-shrink: 0;
    }
    li.active .cmd-icon {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
    }
    .cmd-body {
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }
    .cmd-title { font-weight: 600; color: var(--text-dark); font-size: 0.92rem; }
    .cmd-sub { font-size: 0.78rem; color: var(--text-light); }
    .cmd-shortcut {
      display: inline-flex;
      gap: 0.25rem;
      align-items: center;
    }
    .cmd-shortcut kbd, .foot kbd {
      font-family: inherit;
      font-size: 0.7rem;
      padding: 0.1rem 0.4rem;
      border: 1px solid var(--border-light);
      border-radius: 6px;
      background: var(--bg-secondary);
      color: var(--text-medium);
      line-height: 1.4;
    }

    .no-results {
      padding: 2.5rem 1rem;
      text-align: center;
      color: var(--text-light);
    }
    .no-results i { font-size: 1.75rem; display: block; margin-bottom: 0.5rem; color: var(--primary-color); }

    .foot {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.5rem 0.85rem;
      border-top: 1px solid var(--border-light);
      background: var(--bg-secondary);
      font-size: 0.72rem;
      color: var(--text-light);
    }
    .foot .grow { flex: 1; }
    .foot .brand {
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: 0.05em;
    }

    @media (max-width: 560px) {
      .palette { top: 1rem; max-height: 88vh; width: 94vw; }
      .foot { flex-wrap: wrap; gap: 0.4rem; font-size: 0.65rem; }
      .cmd-shortcut { display: none; }
    }
  `]
})
export class CommandPaletteComponent {
  private readonly palette = inject(CommandPaletteService);
  private readonly router  = inject(Router);
  private readonly theme   = inject(ThemeService);
  private readonly resume  = inject(ResumeService);
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('resultsList') resultsList?: ElementRef<HTMLElement>;

  readonly visible = this.palette.open;
  readonly query   = signal('');
  readonly active  = signal<Command | null>(null);

  private readonly isMac = typeof navigator !== 'undefined'
    && /Mac|iPhone|iPad/.test(navigator.platform);
  private readonly mod = this.isMac ? '⌘' : 'Ctrl';

  private readonly commands: Command[] = [
    // Navigate
    { id: 'nav-home',       group: 'Navigate', title: 'Go to Home',       subtitle: 'Hero, stack, featured work', icon: 'pi pi-home',       shortcut: ['G', 'H'], run: () => this.go('/') },
    { id: 'nav-about',      group: 'Navigate', title: 'Go to About',      subtitle: 'Bio, education, skills',     icon: 'pi pi-user',       shortcut: ['G', 'A'], run: () => this.go('/about') },
    { id: 'nav-experience', group: 'Navigate', title: 'Go to Experience', subtitle: 'InCred role and projects',   icon: 'pi pi-briefcase',  shortcut: ['G', 'E'], run: () => this.go('/experience') },
    { id: 'nav-projects',   group: 'Navigate', title: 'Go to Projects',   subtitle: 'Production work, end-to-end',icon: 'pi pi-th-large',   shortcut: ['G', 'P'], run: () => this.go('/projects') },
    { id: 'nav-contact',    group: 'Navigate', title: 'Go to Contact',    subtitle: 'Form, email, phone',         icon: 'pi pi-envelope',   shortcut: ['G', 'C'], run: () => this.go('/contact') },

    // Actions
    { id: 'act-theme',      group: 'Actions',  title: 'Toggle theme',           subtitle: 'Switch between light and dark', icon: 'pi pi-palette',  keywords: 'dark light mode', shortcut: ['T'], run: () => this.theme.toggle() },
    { id: 'act-resume',     group: 'Actions',  title: 'Download résumé',        subtitle: 'Opens PDF in a new tab',         icon: 'pi pi-download', keywords: 'cv pdf', shortcut: ['R'], run: () => this.resume.open() },
    { id: 'act-top',        group: 'Actions',  title: 'Scroll to top',          icon: 'pi pi-arrow-up', keywords: 'back top scroll', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'act-print',      group: 'Actions',  title: 'Print this page',        icon: 'pi pi-print', keywords: 'pdf print save', run: () => window.print() },

    // Copy
    { id: 'copy-email',     group: 'Copy',     title: 'Copy email',  subtitle: PROFILE.email,           icon: 'pi pi-at',     keywords: 'mail address', run: () => this.copy(PROFILE.email) },
    { id: 'copy-phone',     group: 'Copy',     title: 'Copy phone',  subtitle: PROFILE.phone,           icon: 'pi pi-phone',  keywords: 'mobile call',  run: () => this.copy(PROFILE.phone) },
    { id: 'copy-link',      group: 'Copy',     title: 'Copy this page URL', icon: 'pi pi-link', keywords: 'share', run: () => this.copy(location.href) },

    // External
    { id: 'ext-github',   group: 'External', title: 'GitHub profile',   subtitle: PROFILE.github,   icon: 'pi pi-github',   run: () => this.openExt(PROFILE.github) },
    { id: 'ext-linkedin', group: 'External', title: 'LinkedIn profile', subtitle: PROFILE.linkedin, icon: 'pi pi-linkedin', run: () => this.openExt(PROFILE.linkedin) },
    { id: 'ext-leetcode', group: 'External', title: 'LeetCode profile', subtitle: PROFILE.leetcode, icon: 'pi pi-code',     run: () => this.openExt(PROFILE.leetcode) },
    { id: 'ext-mail',     group: 'External', title: 'Send an email',    subtitle: PROFILE.email,    icon: 'pi pi-envelope', run: () => this.openExt('mailto:' + PROFILE.email) }
  ];

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.commands;
    return this.commands.filter(c => {
      const hay = `${c.title} ${c.subtitle ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
      return q.split(/\s+/).every(token => hay.includes(token));
    });
  });

  readonly grouped = computed(() => {
    const out: { title: string; items: Command[] }[] = [];
    for (const cmd of this.filtered()) {
      const existing = out.find(g => g.title === cmd.group);
      (existing ? existing.items : (out.push({ title: cmd.group, items: [] }), out[out.length - 1].items)).push(cmd);
    }
    return out;
  });

  private lastFocus: HTMLElement | null = null;

  constructor() {
    // Reset query and active row each time the palette opens; restore focus on close.
    effect(() => {
      const open = this.visible();
      if (open) {
        this.lastFocus = document.activeElement as HTMLElement | null;
        this.query.set('');
        document.body.style.overflow = 'hidden';
        // Focus the input after Angular renders it.
        setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
      } else {
        document.body.style.overflow = '';
        this.lastFocus?.focus?.();
      }
    });

    // Reset active to the first result whenever the filter changes.
    effect(() => {
      const list = this.filtered();
      this.active.set(list[0] ?? null);
    });
  }

  // Global keyboard hook to open/close.
  @HostListener('window:keydown', ['$event'])
  onWindowKey(e: KeyboardEvent) {
    const isToggle = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
    if (isToggle) {
      e.preventDefault();
      this.palette.toggle();
      return;
    }
    if (this.visible() && e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }
  }

  onKey(e: KeyboardEvent) {
    const items = this.filtered();
    if (!items.length) return;
    const idx = this.active() ? items.indexOf(this.active()!) : -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.setActive(items[Math.min(items.length - 1, idx + 1)]);
      this.scrollActiveIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.setActive(items[Math.max(0, idx - 1)]);
      this.scrollActiveIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const c = this.active();
      if (c) this.execute(c);
    }
  }

  onQuery(value: string) { this.query.set(value); }
  setActive(c: Command | null) { this.active.set(c); }

  async execute(cmd: Command) {
    await Promise.resolve(cmd.run());
    this.close();
  }

  close() { this.palette.hide(); }

  private go(path: string) {
    this.router.navigateByUrl(path);
  }
  private openExt(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  private async copy(text: string) {
    try { await navigator.clipboard.writeText(text); } catch {}
  }

  private scrollActiveIntoView() {
    setTimeout(() => {
      const el = this.resultsList?.nativeElement.querySelector('li.active') as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    }, 0);
  }
}
