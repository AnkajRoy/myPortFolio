import {
  Directive, ElementRef, Input, AfterViewInit, OnDestroy, NgZone
} from '@angular/core';

/**
 * Counts up from 0 to the target number when the element first enters the
 * viewport. Used for hero stats.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') target = 0;
  @Input() duration = 1600;
  @Input() suffix = '';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.textContent = `0${this.suffix}`;

    if (typeof IntersectionObserver === 'undefined') {
      node.textContent = `${this.target}${this.suffix}`;
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.run(node);
            this.observer?.unobserve(node);
          }
        }
      }, { threshold: 0.5 });
      this.observer.observe(node);
    });
  }

  private run(node: HTMLElement) {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / this.duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * this.target);
      node.textContent = `${value}${this.suffix}`;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
