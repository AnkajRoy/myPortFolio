import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'ankaj-portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.initial());

  constructor() {
    effect(() => {
      const value = this.theme();
      const root = document.documentElement;
      root.classList.toggle('dark', value === 'dark');
      root.setAttribute('data-theme', value);
      try { localStorage.setItem(STORAGE_KEY, value); } catch {}
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', value === 'dark' ? '#0b1220' : '#ffffff');
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  private initial(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {}
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}
