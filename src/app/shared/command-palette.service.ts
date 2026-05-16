import { Injectable, signal } from '@angular/core';

/**
 * Tiny signal-backed store so anything in the tree (header button, keyboard
 * shortcut handler, etc.) can open the command palette without prop-drilling.
 */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  readonly open = signal(false);

  toggle(): void { this.open.update(v => !v); }
  show():   void { this.open.set(true); }
  hide():   void { this.open.set(false); }
}
