import {
  Directive, ElementRef, Input, AfterViewInit, OnDestroy, NgZone, Renderer2
} from '@angular/core';

/**
 * Animates the width of a skill-bar progress element from 0% to the target
 * percentage when it enters the viewport. Used on `.skill-progress`.
 */
@Directive({
  selector: '[appAnimateProgress]',
  standalone: true
})
export class AnimateProgressDirective implements AfterViewInit, OnDestroy {
  @Input('appAnimateProgress') target = 0;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    this.renderer.setStyle(node, 'width', '0%');
    this.renderer.setStyle(node, 'transition', 'width 1.4s cubic-bezier(0.25, 0.8, 0.25, 1)');

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.setStyle(node, 'width', `${this.target}%`);
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              this.renderer.setStyle(node, 'width', `${this.target}%`);
            });
            this.observer?.unobserve(node);
          }
        }
      }, { threshold: 0.3 });
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
