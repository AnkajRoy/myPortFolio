import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { PROFILE, STATS, CORE_SKILLS, PROJECTS, ACHIEVEMENTS } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ChipModule, RevealOnScrollDirective, CountUpDirective],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text" appReveal>
          <span class="eyebrow">
            <span class="dot"></span>
            Available for new opportunities
          </span>
          <h1 class="hero-title">
            Hi, I'm <span class="grad">{{ profile.name }}</span>
          </h1>
          <h2 class="hero-subtitle" aria-live="polite">
            <span class="prefix">A&nbsp;</span><span class="rotating">{{ currentRole() }}</span><span class="caret" aria-hidden="true">|</span>
          </h2>
          <p class="hero-summary">{{ profile.summary }}</p>

          <div class="hero-actions">
            <a class="btn primary" routerLink="/projects">
              <i class="pi pi-th-large" aria-hidden="true"></i>
              View My Work
            </a>
            <button class="btn outline" type="button" (click)="resume.open()">
              <i class="pi pi-download" aria-hidden="true"></i>
              Download Resume
            </button>
            <a class="btn ghost" routerLink="/contact">
              <i class="pi pi-envelope" aria-hidden="true"></i>
              Get In Touch
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat" *ngFor="let s of stats">
              <span class="value" [appCountUp]="s.value" [suffix]="s.suffix">0</span>
              <span class="label">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" appReveal [revealDelay]="120">
          <div class="profile-card">
            <div class="ring"></div>
            <div class="avatar">
              <img src="assets/images/profile-image.jpg" alt="Portrait of Ankaj Kumar" loading="eager">
            </div>
            <h3 class="card-name">{{ profile.name }}</h3>
            <p class="card-role">Software Engineer · InCred Financial Services</p>
            <div class="card-stack">
              <span>Angular 18</span><span>TypeScript</span><span>NestJS</span><span>Keycloak</span>
            </div>
            <a class="card-link" [href]="profile.github" target="_blank" rel="noopener">
              <i class="pi pi-github" aria-hidden="true"></i> github.com/AnkajRoy
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Core skills -->
    <section class="skills section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Core Stack</p>
          <h2 class="section-title">Technologies I work with every day</h2>
          <p class="section-subtitle">
            From standalone-component Angular apps to NestJS BFFs and Webpack 5 npm libraries — these are the tools I reach for first.
          </p>
        </header>
        <div class="skill-grid">
          <article class="skill-card"
                   *ngFor="let skill of coreSkills; let i = index"
                   appReveal
                   [revealDelay]="i * 80">
            <div class="skill-icon"><i [class]="skill.icon" aria-hidden="true"></i></div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <p class="skill-blurb">{{ skill.blurb }}</p>
            <span class="skill-level" [attr.data-level]="skill.level">{{ skill.level }}</span>
          </article>
        </div>
      </div>
    </section>

    <!-- Featured projects -->
    <section class="featured section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Featured Work</p>
          <h2 class="section-title">Production projects shipping at InCred</h2>
          <p class="section-subtitle">
            Owned end-to-end, from architecture to deployment. Each one is currently in production serving real fintech workflows.
          </p>
        </header>

        <div class="project-grid">
          <article class="project-card"
                   *ngFor="let project of featuredProjects; let i = index"
                   appReveal
                   [revealDelay]="i * 100">
            <div class="project-head">
              <span class="project-icon"><i [class]="project.icon" aria-hidden="true"></i></span>
              <span class="status">{{ project.status }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-role">{{ project.role }}</p>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-tech">
              <span *ngFor="let t of project.technologies.slice(0, 5)">{{ t }}</span>
            </div>
            <div class="project-actions">
              <a class="link" [href]="project.githubUrl" target="_blank" rel="noopener" *ngIf="project.githubUrl">
                <i class="pi pi-github" aria-hidden="true"></i> Source
              </a>
              <a class="link" routerLink="/projects">
                Details <i class="pi pi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <section class="achievements section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Highlights</p>
          <h2 class="section-title">A few things I'm proud of</h2>
        </header>
        <div class="ach-grid">
          <article class="ach-card"
                   *ngFor="let a of achievements; let i = index"
                   appReveal
                   [revealDelay]="i * 80">
            <span class="ach-icon"><i [class]="a.icon" aria-hidden="true"></i></span>
            <h3 class="ach-title">{{ a.title }}</h3>
            <p class="ach-desc">{{ a.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-band section" appReveal>
      <div class="container cta-inner">
        <div>
          <h2>Have a project in mind?</h2>
          <p>I'm open to interesting frontend and full-stack opportunities — let's talk.</p>
        </div>
        <div class="cta-actions">
          <a routerLink="/contact" class="btn primary">
            <i class="pi pi-envelope" aria-hidden="true"></i> Contact Me
          </a>
          <button type="button" class="btn outline" (click)="resume.open()">
            <i class="pi pi-download" aria-hidden="true"></i> Resume
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===== Hero ===== */
    .hero {
      padding: clamp(3rem, 6vw, 6rem) 0 clamp(3rem, 6vw, 5rem);
      background:
        radial-gradient(60% 80% at 80% 20%, color-mix(in srgb, var(--primary-color) 18%, transparent), transparent 60%),
        radial-gradient(40% 60% at 10% 70%, color-mix(in srgb, var(--accent-color) 14%, transparent), transparent 60%),
        var(--bg-primary);
    }
    .hero-inner {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: clamp(2rem, 4vw, 4rem);
      align-items: center;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.8rem;
      border-radius: 999px;
      background: color-mix(in srgb, #10b981 12%, transparent);
      color: #059669;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
    }
    .eyebrow .dot {
      width: 8px; height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
      70% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
      100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
    }
    .hero-title {
      font-size: clamp(2.25rem, 5vw + 1rem, 4.25rem);
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 1rem;
    }
    .grad {
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .hero-subtitle {
      font-size: clamp(1.125rem, 1.5vw + 0.5rem, 1.625rem);
      font-weight: 600;
      color: var(--text-medium);
      margin-bottom: 1.25rem;
      min-height: 2.4em;
      display: inline-flex;
      flex-wrap: wrap;
    }
    .prefix { color: var(--text-light); margin-right: 0.25rem; }
    .rotating { color: var(--primary-color); }
    .caret {
      display: inline-block;
      margin-left: 2px;
      animation: blink 1s steps(1) infinite;
      color: var(--accent-color);
    }
    @keyframes blink { 50% { opacity: 0; } }
    .hero-summary {
      max-width: 60ch;
      font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
      color: var(--text-light);
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }
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
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
      min-height: 44px;
    }
    .btn.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      box-shadow: var(--shadow-sm);
    }
    .btn.primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .btn.outline {
      background: var(--bg-primary);
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
    .btn.outline:hover { background: var(--primary-color); color: #fff; }
    .btn.ghost {
      background: var(--bg-secondary);
      color: var(--text-dark);
      border-color: var(--border-light);
    }
    .btn.ghost:hover { background: var(--bg-tertiary); }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(0.75rem, 2vw, 1.5rem);
      padding: 1.25rem;
      border-radius: var(--radius-lg);
      background: color-mix(in srgb, var(--bg-secondary) 70%, transparent);
      border: 1px solid var(--border-light);
    }
    .stat { display: flex; flex-direction: column; }
    .stat .value {
      font-size: clamp(1.4rem, 2vw + 0.75rem, 2rem);
      font-weight: 800;
      color: var(--primary-color);
    }
    .stat .label { font-size: 0.8rem; color: var(--text-light); }

    /* Hero visual */
    .hero-visual { display: flex; justify-content: center; }
    .profile-card {
      position: relative;
      width: min(100%, 360px);
      padding: 2rem 1.5rem 1.75rem;
      border-radius: var(--radius-2xl);
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      box-shadow: var(--shadow-lg);
      text-align: center;
      overflow: hidden;
    }
    .profile-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }
    .ring {
      position: absolute;
      inset: -40% -40% auto auto;
      width: 70%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(closest-side, color-mix(in srgb, var(--primary-color) 20%, transparent), transparent);
      pointer-events: none;
    }
    .avatar {
      width: clamp(120px, 25vw, 160px);
      aspect-ratio: 1;
      margin: 0 auto 1rem;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid var(--bg-primary);
      box-shadow: 0 0 0 4px var(--primary-color), var(--shadow-md);
    }
    .avatar img { width: 100%; height: 100%; object-fit: cover; }
    .card-name { font-size: 1.25rem; margin-bottom: 0.25rem; }
    .card-role { color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem; }
    .card-stack { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; margin-bottom: 1rem; }
    .card-stack span {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      background: var(--bg-secondary);
      color: var(--text-medium);
      border: 1px solid var(--border-light);
    }
    .card-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.85rem;
      color: var(--text-medium);
    }

    /* ===== Section heads ===== */
    .section-head { text-align: center; margin-bottom: clamp(2rem, 4vw, 3rem); }
    .kicker {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    /* ===== Skills ===== */
    .skills { background: var(--bg-secondary); }
    .skill-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .skill-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      position: relative;
    }
    .skill-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: color-mix(in srgb, var(--primary-color) 35%, var(--border-light));
    }
    .skill-icon {
      width: 56px; height: 56px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 18%, transparent), color-mix(in srgb, var(--accent-color) 18%, transparent));
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--primary-color);
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .skill-name { font-size: 1.15rem; margin-bottom: 0.5rem; }
    .skill-blurb { color: var(--text-light); font-size: 0.95rem; margin-bottom: 1rem; }
    .skill-level {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      color: var(--primary-color);
    }
    .skill-level[data-level="Proficient"] {
      background: color-mix(in srgb, var(--accent-color) 14%, transparent);
      color: #b45309;
    }

    /* ===== Featured projects ===== */
    .featured { background: var(--bg-primary); }
    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: clamp(1rem, 2vw, 1.75rem);
    }
    .project-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
      border-color: color-mix(in srgb, var(--primary-color) 35%, var(--border-light));
    }
    .project-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .project-icon {
      width: 48px; height: 48px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.25rem;
    }
    .status {
      font-size: 0.7rem; font-weight: 700;
      padding: 0.25rem 0.6rem; border-radius: 999px;
      background: color-mix(in srgb, #10b981 14%, transparent);
      color: #047857;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .project-title { margin-bottom: 0.1rem; font-size: 1.15rem; }
    .project-role {
      font-size: 0.8rem;
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .project-desc { color: var(--text-light); font-size: 0.95rem; flex-grow: 1; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.5rem 0; }
    .project-tech span {
      font-size: 0.75rem;
      padding: 0.2rem 0.55rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: 999px;
      color: var(--text-medium);
    }
    .project-actions { display: flex; gap: 1rem; margin-top: auto; }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--primary-color);
      font-weight: 600;
      font-size: 0.875rem;
      text-decoration: none;
    }
    .link:hover { color: var(--primary-dark); }

    /* ===== Achievements ===== */
    .achievements { background: var(--bg-secondary); }
    .ach-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .ach-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .ach-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .ach-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--accent-color) 18%, transparent);
      color: #b45309;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
    }
    .ach-title { font-size: 1.05rem; margin-bottom: 0.4rem; }
    .ach-desc { color: var(--text-light); font-size: 0.9rem; }

    /* ===== CTA band ===== */
    .cta-band {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      padding: clamp(2.5rem, 5vw, 4rem) 0;
    }
    .cta-band h2 { color: #fff; margin-bottom: 0.4rem; }
    .cta-band p { color: rgba(255,255,255,0.85); margin: 0; }
    .cta-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .cta-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .cta-band .btn.primary {
      background: #fff;
      color: var(--primary-color);
    }
    .cta-band .btn.primary:hover { background: rgba(255,255,255,0.92); }
    .cta-band .btn.outline {
      background: transparent;
      border-color: rgba(255,255,255,0.7);
      color: #fff;
    }
    .cta-band .btn.outline:hover { background: rgba(255,255,255,0.15); color: #fff; }

    /* ===== Responsive ===== */
    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; text-align: center; }
      .hero-actions, .hero-stats { justify-content: center; }
      .hero-stats { grid-template-columns: repeat(2, 1fr); }
      .hero-summary { margin-left: auto; margin-right: auto; }
      .hero-visual { order: -1; }
      .cta-inner { text-align: center; justify-content: center; }
    }
    @media (max-width: 480px) {
      .hero-stats { grid-template-columns: repeat(2, 1fr); padding: 1rem; }
      .stat .value { font-size: 1.4rem; }
      .btn { width: 100%; justify-content: center; }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly profile = PROFILE;
  readonly stats = STATS;
  readonly coreSkills = CORE_SKILLS;
  readonly featuredProjects = PROJECTS.slice(0, 3);
  readonly achievements = ACHIEVEMENTS;
  readonly resume = inject(ResumeService);

  currentRole = signal(this.profile.rotatingRoles[0]);
  private rotateTimer?: number;

  ngOnInit(): void {
    let i = 0;
    this.rotateTimer = window.setInterval(() => {
      i = (i + 1) % this.profile.rotatingRoles.length;
      this.currentRole.set(this.profile.rotatingRoles[i]);
    }, 2600);
  }

  ngOnDestroy(): void {
    if (this.rotateTimer) clearInterval(this.rotateTimer);
  }
}
