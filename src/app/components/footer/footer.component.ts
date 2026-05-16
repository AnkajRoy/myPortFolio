import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROFILE, SKILL_GROUPS } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <section class="brand">
            <h3 class="brand-title">{{ profile.name }}</h3>
            <p class="brand-tagline">{{ profile.tagline }}</p>
            <p class="brand-summary">
              {{ profile.yearsExperience }} years building production-grade fintech web applications.
              Open to interesting frontend and full-stack opportunities.
            </p>
            <div class="social">
              <a [href]="profile.linkedin" target="_blank" rel="noopener" class="social-link linkedin" aria-label="LinkedIn">
                <i class="pi pi-linkedin" aria-hidden="true"></i>
              </a>
              <a [href]="profile.github" target="_blank" rel="noopener" class="social-link github" aria-label="GitHub">
                <i class="pi pi-github" aria-hidden="true"></i>
              </a>
              <a [href]="profile.leetcode" target="_blank" rel="noopener" class="social-link leetcode" aria-label="LeetCode">
                <i class="pi pi-code" aria-hidden="true"></i>
              </a>
              <a [href]="'mailto:' + profile.email" class="social-link email" aria-label="Email">
                <i class="pi pi-envelope" aria-hidden="true"></i>
              </a>
            </div>
          </section>

          <section>
            <h4 class="col-title">Navigate</h4>
            <ul class="links">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/about">About</a></li>
              <li><a routerLink="/experience">Experience</a></li>
              <li><a routerLink="/projects">Projects</a></li>
              <li><a routerLink="/contact">Contact</a></li>
              <li><button class="link-btn" type="button" (click)="resume.open()">Download Resume</button></li>
            </ul>
          </section>

          <section>
            <h4 class="col-title">Core Stack</h4>
            <div class="chips">
              <span class="chip" *ngFor="let s of coreStack">{{ s }}</span>
            </div>
          </section>

          <section>
            <h4 class="col-title">Contact</h4>
            <ul class="links">
              <li>
                <a [href]="'mailto:' + profile.email">
                  <i class="pi pi-envelope" aria-hidden="true"></i> {{ profile.email }}
                </a>
              </li>
              <li>
                <a [href]="'tel:' + profile.phoneTel">
                  <i class="pi pi-phone" aria-hidden="true"></i> {{ profile.phone }}
                </a>
              </li>
              <li>
                <span class="muted"><i class="pi pi-map-marker" aria-hidden="true"></i> {{ profile.location }}</span>
              </li>
            </ul>
          </section>
        </div>

        <div class="footer-bottom">
          <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
          <p class="muted">Built with Angular 16, PrimeNG, and a focus on accessibility.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-dark);
      color: #cbd5e1;
      padding: clamp(2.5rem, 5vw, 4rem) 0 1.5rem;
      margin-top: clamp(2rem, 5vw, 4rem);
    }
    .footer-grid {
      display: grid;
      gap: clamp(1.5rem, 3vw, 2.5rem);
      grid-template-columns: 2fr 1fr 1fr 1.2fr;
    }
    .brand-title { color: #fff; margin-bottom: 0.4rem; font-size: 1.25rem; }
    .brand-tagline { color: var(--primary-light); font-weight: 600; margin-bottom: 0.75rem; }
    .brand-summary { color: #94a3b8; line-height: 1.6; margin-bottom: 1.25rem; max-width: 38ch; }

    .social {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .social-link {
      width: 44px; height: 44px;
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: 12px;
      background: rgba(255,255,255,0.06);
      color: #fff;
      text-decoration: none;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .social-link:hover { transform: translateY(-2px); background: var(--primary-color); }
    .social-link.github:hover { background: #1f2937; }
    .social-link.linkedin:hover { background: #0077b5; }
    .social-link.leetcode:hover { background: #f89f1b; color: #000; }

    .col-title {
      color: #fff;
      font-size: 0.95rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .links { list-style: none; padding: 0; margin: 0; }
    .links li { margin-bottom: 0.5rem; }
    .links a, .link-btn {
      color: #94a3b8;
      text-decoration: none;
      background: none;
      border: 0;
      cursor: pointer;
      padding: 0;
      font: inherit;
      transition: color 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .links a:hover, .link-btn:hover { color: var(--primary-light); }
    .links i { color: var(--primary-light); }
    .muted { color: #94a3b8; }

    .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .chip {
      background: rgba(255,255,255,0.06);
      color: #e2e8f0;
      padding: 0.3rem 0.7rem;
      border-radius: 999px;
      font-size: 0.8rem;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      margin-top: 2rem;
      padding-top: 1.25rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .brand { grid-column: 1 / -1; }
    }
    @media (max-width: 560px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom { justify-content: center; text-align: center; }
    }
  `]
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly resume = inject(ResumeService);
  readonly year = new Date().getFullYear();
  readonly coreStack = SKILL_GROUPS[1].skills.slice(0, 6);
}
