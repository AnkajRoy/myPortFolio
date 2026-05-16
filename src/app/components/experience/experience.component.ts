import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE, ACHIEVEMENTS, PROFILE, PROJECTS } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  template: `
    <!-- Header -->
    <section class="hero section">
      <div class="container" appReveal>
        <p class="kicker">Experience</p>
        <h1>Building production fintech software for {{ profile.yearsExperience }} years.</h1>
        <p class="lede">
          A focused track at InCred Financial Services: shipping Angular 18 portals, owning authentication infrastructure,
          and building the NestJS BFF that ties it together.
        </p>
        <div class="hero-actions">
          <button class="btn primary" type="button" (click)="resume.open()">
            <i class="pi pi-download" aria-hidden="true"></i> Download Resume
          </button>
        </div>
      </div>
    </section>

    <!-- Main role -->
    <section class="role-section section">
      <div class="container">
        <article class="role-card" *ngFor="let role of experience" appReveal>
          <div class="role-head">
            <div class="role-id">
              <div class="company-mark"><i class="pi pi-building" aria-hidden="true"></i></div>
              <div>
                <h2 class="company">{{ role.company }}</h2>
                <p class="title">{{ role.role }}</p>
              </div>
            </div>
            <div class="role-meta">
              <span class="badge" *ngIf="role.current">Current</span>
              <span class="duration"><i class="pi pi-calendar" aria-hidden="true"></i> {{ role.duration }}</span>
              <span class="loc"><i class="pi pi-map-marker" aria-hidden="true"></i> {{ role.location }}</span>
            </div>
          </div>

          <p class="role-summary">{{ role.summary }}</p>

          <div class="role-sections">
            <section class="role-section-block"
                     *ngFor="let s of role.sections; let i = index"
                     appReveal
                     [revealDelay]="i * 80">
              <h3 class="block-title">{{ s.title }}</h3>
              <ul class="block-items">
                <li *ngFor="let item of s.items">
                  <i class="pi pi-check" aria-hidden="true"></i>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>

    <!-- Projects at a glance -->
    <section class="projects-glance section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Inside this role</p>
          <h2 class="section-title">Owned projects, end-to-end</h2>
        </header>
        <div class="glance-grid">
          <article class="glance-card"
                   *ngFor="let p of projects; let i = index"
                   appReveal
                   [revealDelay]="i * 80">
            <span class="glance-icon"><i [class]="p.icon" aria-hidden="true"></i></span>
            <h3>{{ p.title }}</h3>
            <p class="role">{{ p.role }}</p>
            <p class="desc">{{ p.description }}</p>
            <a class="glance-link" [href]="p.githubUrl" target="_blank" rel="noopener" *ngIf="p.githubUrl">
              <i class="pi pi-github" aria-hidden="true"></i> View source
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Achievements timeline -->
    <section class="achievements section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Achievements</p>
          <h2 class="section-title">Highlights from the journey</h2>
        </header>
        <ol class="timeline">
          <li *ngFor="let a of achievements; let i = index" appReveal [revealDelay]="i * 80">
            <span class="dot"><i [class]="a.icon" aria-hidden="true"></i></span>
            <div class="item">
              <h3>{{ a.title }}</h3>
              <p>{{ a.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
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
    .section-head { text-align: center; margin-bottom: clamp(2rem, 4vw, 3rem); }

    /* Hero */
    .hero {
      background:
        radial-gradient(60% 80% at 10% 20%, color-mix(in srgb, var(--primary-color) 12%, transparent), transparent 60%),
        var(--bg-primary);
      padding-bottom: 0;
    }
    .hero h1 {
      font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
      max-width: 26ch;
      margin-bottom: 1rem;
    }
    .lede { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); color: var(--text-light); max-width: 60ch; }
    .hero-actions { margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 1.4rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      min-height: 44px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      box-shadow: var(--shadow-sm);
    }
    .btn.primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }

    /* Role */
    .role-section { background: var(--bg-primary); }
    .role-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: clamp(1.25rem, 3vw, 2rem);
      box-shadow: var(--shadow-sm);
    }
    .role-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-light);
      margin-bottom: 1.25rem;
    }
    .role-id { display: flex; align-items: center; gap: 1rem; }
    .company-mark {
      width: 56px; height: 56px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.25rem;
    }
    .company { font-size: 1.5rem; margin-bottom: 0.1rem; }
    .title { color: var(--primary-color); font-weight: 600; }
    .role-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      align-items: center;
      color: var(--text-light);
      font-size: 0.875rem;
    }
    .role-meta i { color: var(--primary-color); margin-right: 0.25rem; }
    .badge {
      background: color-mix(in srgb, #10b981 14%, transparent);
      color: #047857;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      font-weight: 700;
      font-size: 0.7rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .role-summary { color: var(--text-medium); margin-bottom: 1.5rem; }

    .role-sections { display: grid; gap: 1.5rem; }
    .role-section-block {
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem;
    }
    .block-title {
      font-size: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .block-items { list-style: none; padding: 0; display: grid; gap: 0.75rem; }
    .block-items li {
      display: flex;
      gap: 0.65rem;
      align-items: flex-start;
      color: var(--text-medium);
      line-height: 1.55;
    }
    .block-items i {
      flex-shrink: 0;
      width: 22px; height: 22px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 0.7rem;
      margin-top: 0.2rem;
    }

    /* Projects at a glance */
    .projects-glance { background: var(--bg-secondary); }
    .glance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .glance-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .glance-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .glance-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
    }
    .glance-card h3 { font-size: 1.05rem; margin-bottom: 0.35rem; }
    .glance-card .role { color: var(--primary-color); font-weight: 600; font-size: 0.8rem; margin-bottom: 0.5rem; }
    .glance-card .desc { color: var(--text-light); font-size: 0.9rem; }
    .glance-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary-color);
      margin-top: 0.5rem;
    }

    /* Achievements timeline */
    .achievements { background: var(--bg-primary); }
    .timeline {
      list-style: none;
      padding: 0;
      max-width: 720px;
      margin: 0 auto;
      position: relative;
    }
    .timeline::before {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      left: 24px;
      width: 2px;
      background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
      border-radius: 2px;
    }
    .timeline li {
      position: relative;
      padding-left: 60px;
      margin-bottom: 1.5rem;
    }
    .timeline .dot {
      position: absolute;
      left: 8px; top: 0;
      width: 34px; height: 34px;
      border-radius: 50%;
      background: var(--bg-primary);
      border: 2px solid var(--primary-color);
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--primary-color);
      font-size: 0.85rem;
    }
    .timeline .item {
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1rem 1.25rem;
    }
    .timeline h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
    .timeline p { color: var(--text-light); margin: 0; font-size: 0.9rem; }

    @media (max-width: 600px) {
      .role-head { flex-direction: column; align-items: flex-start; }
      .role-meta { gap: 0.4rem; }
    }
  `]
})
export class ExperienceComponent {
  readonly profile = PROFILE;
  readonly experience = EXPERIENCE;
  readonly projects = PROJECTS;
  readonly achievements = ACHIEVEMENTS;
  readonly resume = inject(ResumeService);
}
