import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PROJECTS, PROJECT_CATEGORIES } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

type Project = (typeof PROJECTS)[number];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, DialogModule, RevealOnScrollDirective],
  template: `
    <!-- Header -->
    <section class="header section">
      <div class="container" appReveal>
        <p class="kicker">Projects</p>
        <h1>Production work I've owned at InCred.</h1>
        <p class="lede">
          Four projects that ship together: two Angular 18 portals, one authentication library, and the NestJS BFF
          that orchestrates the microservices behind them.
        </p>
      </div>
    </section>

    <!-- Filter -->
    <section class="filter-bar" appReveal>
      <div class="container">
        <div class="filters" role="tablist" aria-label="Project category filter">
          <button *ngFor="let c of categories"
                  type="button"
                  role="tab"
                  [attr.aria-selected]="selectedCategory() === c.value"
                  class="filter-chip"
                  [class.active]="selectedCategory() === c.value"
                  (click)="selectedCategory.set(c.value)">
            {{ c.name }}
            <span class="count">{{ countFor(c.value) }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="grid-section section">
      <div class="container">
        <div class="grid">
          <article class="card"
                   *ngFor="let p of filtered(); let i = index; trackBy: trackByTitle"
                   appReveal
                   [revealDelay]="i * 80">
            <div class="card-head">
              <span class="icon"><i [class]="p.icon" aria-hidden="true"></i></span>
              <span class="status">{{ p.status }}</span>
            </div>

            <h2 class="title">{{ p.title }}</h2>
            <p class="role">{{ p.role }}</p>
            <p class="desc">{{ p.description }}</p>

            <ul class="tech">
              <li *ngFor="let t of p.technologies">{{ t }}</li>
            </ul>

            <div class="actions">
              <a class="btn ghost" [href]="p.githubUrl" target="_blank" rel="noopener" *ngIf="p.githubUrl">
                <i class="pi pi-github" aria-hidden="true"></i> Source
              </a>
              <button type="button" class="btn primary" (click)="openDetails(p)">
                <i class="pi pi-info-circle" aria-hidden="true"></i> Details
              </button>
            </div>
          </article>
        </div>

        <div class="empty" *ngIf="!filtered().length" appReveal>
          <i class="pi pi-info-circle" aria-hidden="true"></i>
          <p>No projects in this category yet — check back soon.</p>
        </div>
      </div>
    </section>

    <!-- Details dialog -->
    <p-dialog
      [(visible)]="dialogVisible"
      [modal]="true"
      [draggable]="false"
      [dismissableMask]="true"
      [closable]="true"
      [style]="{ width: 'min(92vw, 720px)' }"
      [breakpoints]="{ '720px': '95vw' }"
      [header]="active()?.title || 'Project details'"
      styleClass="project-modal">
      <ng-container *ngIf="active() as p">
        <div class="dialog-meta">
          <span class="status">{{ p.status }}</span>
          <span class="role">{{ p.role }}</span>
        </div>

        <h3>Overview</h3>
        <p>{{ p.fullDescription }}</p>

        <h3>Key features</h3>
        <ul class="features">
          <li *ngFor="let f of p.features">
            <i class="pi pi-check" aria-hidden="true"></i>
            <span>{{ f }}</span>
          </li>
        </ul>

        <h3>Stack</h3>
        <ul class="tech">
          <li *ngFor="let t of p.technologies">{{ t }}</li>
        </ul>

        <div class="dialog-actions" *ngIf="p.githubUrl">
          <a class="btn primary" [href]="p.githubUrl" target="_blank" rel="noopener">
            <i class="pi pi-github" aria-hidden="true"></i> View on GitHub
          </a>
        </div>
      </ng-container>
    </p-dialog>
  `,
  styles: [`
    .kicker {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .header {
      background:
        radial-gradient(60% 80% at 90% 20%, color-mix(in srgb, var(--primary-color) 12%, transparent), transparent 60%),
        var(--bg-primary);
      padding-bottom: 1.5rem;
    }
    .header h1 {
      font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
      max-width: 26ch;
      margin-bottom: 1rem;
    }
    .lede { color: var(--text-light); max-width: 60ch; font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); }

    /* Filters */
    .filter-bar {
      position: sticky;
      top: calc(var(--header-height) - 1px);
      z-index: 50;
      background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
      backdrop-filter: blur(10px);
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-light);
    }
    .filters {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      overflow-x: auto;
    }
    .filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--border-light);
      background: var(--bg-primary);
      color: var(--text-medium);
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      min-height: 40px;
      white-space: nowrap;
    }
    .filter-chip:hover { border-color: var(--primary-color); color: var(--primary-color); }
    .filter-chip.active {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      border-color: transparent;
    }
    .filter-chip .count {
      font-size: 0.7rem;
      padding: 0.1rem 0.45rem;
      border-radius: 999px;
      background: rgba(255,255,255,0.18);
      color: inherit;
    }
    .filter-chip:not(.active) .count {
      background: var(--bg-secondary);
      color: var(--text-light);
    }

    /* Grid */
    .grid-section { background: var(--bg-secondary); }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: color-mix(in srgb, var(--primary-color) 35%, var(--border-light));
    }
    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;
    }
    .icon {
      width: 48px; height: 48px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.25rem;
    }
    .status {
      font-size: 0.7rem; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 0.25rem 0.6rem; border-radius: 999px;
      background: color-mix(in srgb, #10b981 14%, transparent);
      color: #047857;
    }
    .title { font-size: 1.15rem; margin-bottom: 0.1rem; }
    .role { color: var(--primary-color); font-weight: 600; font-size: 0.8rem; margin-bottom: 0.4rem; }
    .desc { color: var(--text-light); font-size: 0.95rem; flex-grow: 1; }
    .tech {
      list-style: none; padding: 0;
      display: flex; flex-wrap: wrap; gap: 0.35rem;
      margin: 0.5rem 0;
    }
    .tech li {
      font-size: 0.75rem;
      padding: 0.2rem 0.55rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: 999px;
      color: var(--text-medium);
    }
    .actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.6rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      font-size: 0.875rem;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      min-height: 40px;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }
    .btn.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
    }
    .btn.primary:hover { transform: translateY(-2px); }
    .btn.ghost {
      background: var(--bg-secondary);
      color: var(--text-dark);
      border-color: var(--border-light);
    }
    .btn.ghost:hover { background: var(--bg-tertiary); color: var(--primary-color); }

    .empty {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--text-light);
    }
    .empty i { font-size: 2rem; color: var(--primary-color); display: block; margin-bottom: 0.5rem; }

    /* Dialog */
    .dialog-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .dialog-meta .role {
      color: var(--text-light); font-weight: 500; font-size: 0.875rem;
    }
    .features {
      list-style: none; padding: 0;
      display: grid; gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .features li {
      display: flex;
      gap: 0.5rem;
      align-items: flex-start;
      color: var(--text-medium);
    }
    .features i {
      width: 22px; height: 22px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 0.7rem;
      margin-top: 0.2rem;
      flex-shrink: 0;
    }
    .dialog-actions { margin-top: 1rem; }

    :host ::ng-deep .project-modal .p-dialog-content {
      padding: 1.25rem 1.5rem 1.5rem;
    }
    :host ::ng-deep .project-modal .p-dialog-header {
      border-bottom: 1px solid var(--border-light);
    }
    :host ::ng-deep .project-modal .p-dialog-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
    }
  `]
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
  readonly categories = PROJECT_CATEGORIES;
  readonly resume = inject(ResumeService);

  selectedCategory = signal('all');
  active = signal<Project | null>(null);
  dialogVisible = false;

  filtered = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all' ? this.projects : this.projects.filter(p => p.category === cat);
  });

  countFor(value: string): number {
    return value === 'all'
      ? this.projects.length
      : this.projects.filter(p => p.category === value).length;
  }

  openDetails(p: Project) {
    this.active.set(p);
    this.dialogVisible = true;
  }

  trackByTitle(_: number, p: Project) {
    return p.title;
  }
}
