import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="back-to-top"
      [class.visible]="visible()"
      (click)="scrollTop()"
      aria-label="Back to top">
      <i class="pi pi-arrow-up" aria-hidden="true"></i>
    </button>
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: clamp(1rem, 3vw, 2rem);
      right: clamp(1rem, 3vw, 2rem);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
      z-index: 999;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
    }
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .back-to-top:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }
    @media (max-width: 480px) {
      .back-to-top { width: 44px; height: 44px; }
    }
  `]
})
export class BackToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > 480);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
