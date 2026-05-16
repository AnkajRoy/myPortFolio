import {
  Directive, ElementRef, Input, OnDestroy, AfterViewInit, NgZone, Renderer2
} from '@angular/core';

/**
 * Adds the `is-visible` class to the host element the first time it intersects
 * the viewport. Works with the global `.reveal` styles in styles.scss.
 *
 * Usage:
 *   <section appReveal>                 // simple
 *   <div appReveal [revealDelay]="120"> // staggered
 *
 * `[revealOnce]="false"` keeps toggling on enter/leave (default true: trigger once).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;
  @Input() revealOnce = true;
  @Input() revealThreshold = 0.15;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    this.renderer.addClass(node, 'reveal');
    if (this.revealDelay) {
      this.renderer.setStyle(node, 'transition-delay', `${this.revealDelay}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(node, 'is-visible');
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(node, 'is-visible');
            if (this.revealOnce) this.observer?.unobserve(node);
          } else if (!this.revealOnce) {
            this.renderer.removeClass(node, 'is-visible');
          }
        }
      }, { threshold: this.revealThreshold });
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
