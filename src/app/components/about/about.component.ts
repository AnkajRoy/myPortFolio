import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROFILE, SKILL_GROUPS, EDUCATION, ACHIEVEMENTS } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, RevealOnScrollDirective],
  template: `
    <!-- Intro -->
    <section class="intro section">
      <div class="container intro-grid">
        <div class="intro-text" appReveal>
          <p class="kicker">About me</p>
          <h1>I build production fintech software.</h1>
          <p class="lede">
            I'm Ankaj — a Frontend Engineer at InCred Financial Services with {{ profile.yearsExperience }} years of experience
            designing and shipping web applications that real teams depend on. My focus is Angular 18, but I'm equally comfortable
            in NestJS, TypeScript, and the auth layer that ties them together.
          </p>
          <p>
            I care about clean architecture, accessible UI, and shipping the boring 80% that makes a product reliable. The favorite
            thing I've built so far is a private npm authentication package that replaced Auth0 across our portals and cut annual
            licensing costs significantly.
          </p>
          <div class="intro-actions">
            <button class="btn primary" type="button" (click)="resume.open()">
              <i class="pi pi-download" aria-hidden="true"></i> Download Resume
            </button>
            <a class="btn outline" routerLink="/contact">
              <i class="pi pi-envelope" aria-hidden="true"></i> Get in touch
            </a>
          </div>
        </div>
        <div class="intro-image" appReveal [revealDelay]="120">
          <div class="frame">
            <img src="assets/images/profile-image.jpg" alt="Portrait of Ankaj Kumar" loading="lazy">
          </div>
          <div class="quick-facts">
            <div><span class="label">Role</span><span class="value">Software Engineer</span></div>
            <div><span class="label">At</span><span class="value">InCred Financial Services</span></div>
            <div><span class="label">Since</span><span class="value">{{ profile.startedAt }}</span></div>
            <div><span class="label">Based in</span><span class="value">{{ profile.location }}</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="education section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Education</p>
          <h2 class="section-title">Where I learned the fundamentals</h2>
        </header>
        <article class="edu-card" appReveal>
          <div class="edu-icon"><i class="pi pi-graduation-cap" aria-hidden="true"></i></div>
          <div>
            <h3>{{ education.degree }}</h3>
            <p class="institute">{{ education.institute }}</p>
            <div class="edu-meta">
              <span><i class="pi pi-calendar" aria-hidden="true"></i> Graduated {{ education.year }}</span>
              <span><i class="pi pi-chart-bar" aria-hidden="true"></i> CGPA {{ education.cgpa }}</span>
            </div>
            <p class="edu-blurb">
              Focus on software engineering, web technologies, data structures, and algorithms — foundation for the
              {{ achievements[1].title.toLowerCase() }} I've worked through since.
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Skills -->
    <section class="skills section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">What I work with</p>
          <h2 class="section-title">Skills &amp; tooling</h2>
          <p class="section-subtitle">Grouped by area of focus. No vanity percentages — just an honest read of what I use.</p>
        </header>
        <div class="skill-groups">
          <article class="skill-group"
                   *ngFor="let g of skillGroups; let i = index"
                   appReveal
                   [revealDelay]="i * 80">
            <h3 class="group-title">{{ g.title }}</h3>
            <ul class="chips">
              <li *ngFor="let s of g.skills">{{ s }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Beyond code -->
    <section class="beyond section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">Beyond code</p>
          <h2 class="section-title">A few things outside the editor</h2>
        </header>
        <div class="beyond-grid">
          <div class="beyond-card" *ngFor="let item of interests; let i = index" appReveal [revealDelay]="i * 80">
            <span class="beyond-icon"><i [class]="item.icon" aria-hidden="true"></i></span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ===== Intro ===== */
    .intro {
      background:
        radial-gradient(50% 80% at 90% 10%, color-mix(in srgb, var(--primary-color) 12%, transparent), transparent 60%),
        var(--bg-primary);
    }
    .intro-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: clamp(2rem, 4vw, 4rem);
      align-items: center;
    }
    .intro-text h1 {
      font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
      margin-bottom: 1rem;
    }
    .lede { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); color: var(--text-medium); }
    .intro-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
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
      min-height: 44px;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .btn.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      box-shadow: var(--shadow-sm);
    }
    .btn.primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .btn.outline { color: var(--primary-color); border-color: var(--primary-color); background: var(--bg-primary); }
    .btn.outline:hover { background: var(--primary-color); color: #fff; }

    .intro-image { position: relative; }
    .frame {
      position: relative;
      width: min(100%, 320px);
      aspect-ratio: 1;
      margin: 0 auto;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      transform: rotate(-1.5deg);
    }
    .frame::before {
      content: '';
      position: absolute;
      inset: -8px;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      z-index: -1;
      border-radius: 24px;
      transform: rotate(3deg);
    }
    .frame img { width: 100%; height: 100%; object-fit: cover; }

    .quick-facts {
      margin: 1.25rem auto 0;
      max-width: 320px;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1rem 1.25rem;
      box-shadow: var(--shadow-sm);
      display: grid;
      gap: 0.5rem;
    }
    .quick-facts > div {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
    }
    .quick-facts .label { color: var(--text-light); }
    .quick-facts .value { color: var(--text-dark); font-weight: 600; }

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

    /* ===== Education ===== */
    .education { background: var(--bg-secondary); }
    .edu-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1.5rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      max-width: 720px;
      margin: 0 auto;
      box-shadow: var(--shadow-sm);
    }
    .edu-icon {
      width: 64px; height: 64px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.5rem;
    }
    .institute { color: var(--text-medium); font-weight: 600; margin-bottom: 0.5rem; }
    .edu-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 0.75rem;
      color: var(--text-light);
      font-size: 0.875rem;
    }
    .edu-meta i { color: var(--primary-color); margin-right: 0.25rem; }
    .edu-blurb { color: var(--text-light); margin: 0; }

    /* ===== Skills ===== */
    .skills { background: var(--bg-primary); }
    .skill-groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .skill-group {
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .skill-group:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .group-title {
      font-size: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .chips { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .chips li {
      font-size: 0.8rem;
      padding: 0.3rem 0.7rem;
      border-radius: 999px;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      color: var(--text-medium);
    }

    /* ===== Beyond code ===== */
    .beyond { background: var(--bg-secondary); }
    .beyond-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    .beyond-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .beyond-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .beyond-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
    }
    .beyond-card h4 { margin-bottom: 0.35rem; font-size: 1.05rem; }
    .beyond-card p { color: var(--text-light); font-size: 0.9rem; margin: 0; }

    @media (max-width: 900px) {
      .intro-grid { grid-template-columns: 1fr; text-align: center; }
      .intro-actions { justify-content: center; }
      .intro-image { order: -1; }
      .edu-card { grid-template-columns: 1fr; text-align: center; }
      .edu-icon { margin: 0 auto; }
      .edu-meta { justify-content: center; }
    }
    @media (max-width: 480px) {
      .btn { width: 100%; justify-content: center; }
    }
  `]
})
export class AboutComponent {
  readonly profile = PROFILE;
  readonly skillGroups = SKILL_GROUPS;
  readonly education = EDUCATION;
  readonly achievements = ACHIEVEMENTS;
  readonly resume = inject(ResumeService);

  interests = [
    { title: 'Competitive Programming', icon: 'pi pi-bolt',
      description: '500+ DSA problems on LeetCode, GFG, and CodeChef. Global Rank 440 in Newton Coding Contest.' },
    { title: 'Open Source',            icon: 'pi pi-github',
      description: 'Building internal libraries and exploring open-source projects I rely on every day.' },
    { title: 'Knowledge Sharing',      icon: 'pi pi-comments',
      description: 'Internal tech talks, hackathons, and onboarding sessions for new engineers on my team.' },
    { title: 'Continuous Learning',    icon: 'pi pi-book',
      description: 'Always exploring patterns, language features, and tools that improve how I build software.' }
  ];
}
