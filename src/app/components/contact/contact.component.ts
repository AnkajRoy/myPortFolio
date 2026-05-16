import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PROFILE } from '../../shared/resume.data';
import { ResumeService } from '../../shared/resume.service';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    InputTextModule, InputTextareaModule, ToastModule,
    RevealOnScrollDirective
  ],
  providers: [MessageService],
  template: `
    <!-- Header -->
    <section class="header section">
      <div class="container" appReveal>
        <p class="kicker">Contact</p>
        <h1>Let's build something together.</h1>
        <p class="lede">
          I'm open to interesting frontend and full-stack opportunities — especially in fintech or anywhere reliability matters.
          The fastest way to reach me is email, but pick whatever works.
        </p>
      </div>
    </section>

    <!-- Contact grid -->
    <section class="content section">
      <div class="container content-grid">
        <!-- Info cards -->
        <aside class="info" appReveal>
          <h2 class="block-title">Direct contact</h2>
          <ul class="info-list">
            <li>
              <span class="info-icon"><i class="pi pi-envelope" aria-hidden="true"></i></span>
              <div class="info-body">
                <span class="label">Email</span>
                <a [href]="'mailto:' + profile.email" class="value">{{ profile.email }}</a>
              </div>
              <button type="button" class="copy-btn" (click)="copy(profile.email, 'Email')"
                      [attr.aria-label]="'Copy email ' + profile.email">
                <i [class]="copied() === 'Email' ? 'pi pi-check' : 'pi pi-copy'" aria-hidden="true"></i>
              </button>
            </li>
            <li>
              <span class="info-icon"><i class="pi pi-phone" aria-hidden="true"></i></span>
              <div class="info-body">
                <span class="label">Phone</span>
                <a [href]="'tel:' + profile.phoneTel" class="value">{{ profile.phone }}</a>
              </div>
              <button type="button" class="copy-btn" (click)="copy(profile.phone, 'Phone')"
                      [attr.aria-label]="'Copy phone ' + profile.phone">
                <i [class]="copied() === 'Phone' ? 'pi pi-check' : 'pi pi-copy'" aria-hidden="true"></i>
              </button>
            </li>
            <li>
              <span class="info-icon"><i class="pi pi-map-marker" aria-hidden="true"></i></span>
              <div class="info-body">
                <span class="label">Location</span>
                <span class="value">{{ profile.location }} · Open to remote</span>
              </div>
            </li>
            <li>
              <span class="info-icon"><i class="pi pi-clock" aria-hidden="true"></i></span>
              <div class="info-body">
                <span class="label">Hours</span>
                <span class="value">Mon – Fri · 9 AM – 6 PM IST</span>
              </div>
            </li>
          </ul>

          <h2 class="block-title">On the web</h2>
          <div class="socials">
            <a [href]="profile.linkedin" target="_blank" rel="noopener" class="social linkedin">
              <i class="pi pi-linkedin" aria-hidden="true"></i><span>LinkedIn</span>
            </a>
            <a [href]="profile.github" target="_blank" rel="noopener" class="social github">
              <i class="pi pi-github" aria-hidden="true"></i><span>GitHub</span>
            </a>
            <a [href]="profile.leetcode" target="_blank" rel="noopener" class="social leetcode">
              <i class="pi pi-code" aria-hidden="true"></i><span>LeetCode</span>
            </a>
            <button type="button" class="social resume" (click)="resume.open()">
              <i class="pi pi-download" aria-hidden="true"></i><span>Resume</span>
            </button>
          </div>
        </aside>

        <!-- Form -->
        <section class="form-card" appReveal [revealDelay]="120">
          <h2 class="block-title">Send a message</h2>
          <p class="form-help">All fields marked with * are required. I usually respond within a working day.</p>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <div class="row">
              <div class="field">
                <label for="name">Name *</label>
                <input id="name" type="text" pInputText autocomplete="name"
                       formControlName="name"
                       [class.invalid]="isInvalid('name')"
                       placeholder="Your full name">
                <span class="error" *ngIf="isInvalid('name')">Please enter your name (2+ characters).</span>
              </div>
              <div class="field">
                <label for="email">Email *</label>
                <input id="email" type="email" pInputText autocomplete="email"
                       formControlName="email"
                       [class.invalid]="isInvalid('email')"
                       placeholder="you@example.com">
                <span class="error" *ngIf="isInvalid('email')">A valid email address is required.</span>
              </div>
            </div>
            <div class="field">
              <label for="subject">Subject *</label>
              <input id="subject" type="text" pInputText
                     formControlName="subject"
                     [class.invalid]="isInvalid('subject')"
                     placeholder="What's this about?">
              <span class="error" *ngIf="isInvalid('subject')">Subject should be at least 5 characters.</span>
            </div>
            <div class="field">
              <label for="message">Message *</label>
              <textarea id="message" pInputTextarea rows="6"
                        formControlName="message"
                        [class.invalid]="isInvalid('message')"
                        placeholder="A few sentences about the role, project, or idea."></textarea>
              <span class="error" *ngIf="isInvalid('message')">Message should be at least 10 characters.</span>
            </div>
            <div class="actions">
              <button type="submit" class="btn primary" [disabled]="submitting()">
                <i [class]="submitting() ? 'pi pi-spin pi-spinner' : 'pi pi-send'" aria-hidden="true"></i>
                {{ submitting() ? 'Sending…' : 'Send message' }}
              </button>
              <a class="btn outline" [href]="mailtoUrl()">
                <i class="pi pi-envelope" aria-hidden="true"></i> Open in mail app
              </a>
              <button type="button" class="btn ghost" (click)="reset()">
                <i class="pi pi-refresh" aria-hidden="true"></i> Reset
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq section">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="kicker">FAQ</p>
          <h2 class="section-title">Quick answers</h2>
        </header>
        <div class="faq-grid">
          <details class="faq-item" *ngFor="let f of faqs; let i = index" appReveal [revealDelay]="i * 60">
            <summary>
              <span>{{ f.question }}</span>
              <i class="pi pi-chevron-down" aria-hidden="true"></i>
            </summary>
            <p>{{ f.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <p-toast position="bottom-right"></p-toast>
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
        radial-gradient(60% 80% at 10% 20%, color-mix(in srgb, var(--primary-color) 12%, transparent), transparent 60%),
        var(--bg-primary);
      padding-bottom: 1.5rem;
    }
    .header h1 { font-size: clamp(2rem, 4vw + 1rem, 3.25rem); max-width: 26ch; margin-bottom: 1rem; }
    .lede { color: var(--text-light); max-width: 60ch; font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); }
    .block-title {
      font-size: 0.85rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .section-head { text-align: center; margin-bottom: clamp(2rem, 4vw, 3rem); }

    .content { background: var(--bg-secondary); }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: clamp(1.5rem, 3vw, 2.5rem);
      align-items: start;
    }

    /* Info */
    .info {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
    }
    .info-list { list-style: none; padding: 0; display: grid; gap: 0.75rem; margin-bottom: 1.5rem; }
    .info-list li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
    }
    .info-icon {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 1rem;
    }
    .info-body { display: flex; flex-direction: column; min-width: 0; }
    .info-body .label { font-size: 0.7rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; }
    .info-body .value { color: var(--text-dark); font-weight: 600; text-decoration: none; word-break: break-word; }
    .info-body a.value:hover { color: var(--primary-color); }

    .copy-btn {
      width: 36px; height: 36px;
      border-radius: 10px;
      border: 1px solid var(--border-light);
      background: var(--bg-primary);
      color: var(--text-medium);
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .copy-btn:hover { background: var(--primary-color); color: #fff; border-color: transparent; }

    .socials {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.6rem;
    }
    .social {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      text-decoration: none;
      color: #fff;
      font-weight: 600;
      font-size: 0.9rem;
      transition: transform 0.2s ease, opacity 0.2s ease;
      border: 0; cursor: pointer;
      min-height: 44px;
    }
    .social i { font-size: 1.1rem; }
    .social:hover { transform: translateY(-2px); opacity: 0.95; }
    .social.linkedin { background: linear-gradient(135deg, #0077b5, #005885); }
    .social.github   { background: linear-gradient(135deg, #1f2937, #0f172a); }
    .social.leetcode { background: linear-gradient(135deg, #f59e0b, #b45309); }
    .social.resume   { background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); }

    /* Form */
    .form-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: clamp(1.25rem, 3vw, 2rem);
      box-shadow: var(--shadow-sm);
    }
    .form-help { color: var(--text-light); margin-bottom: 1.5rem; }
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .field { display: flex; flex-direction: column; margin-bottom: 1rem; }
    .field label { font-weight: 600; color: var(--text-dark); margin-bottom: 0.4rem; font-size: 0.9rem; }
    .field input, .field textarea {
      width: 100%;
      padding: 0.75rem 0.9rem;
      border: 2px solid var(--border-light);
      border-radius: var(--radius-md);
      background: var(--bg-primary);
      color: var(--text-dark);
      font-size: 1rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .field textarea { resize: vertical; min-height: 140px; }
    .field input:focus, .field textarea:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
      outline: none;
    }
    .field .invalid { border-color: #ef4444; }
    .error { color: #ef4444; font-size: 0.8rem; margin-top: 0.35rem; }

    .actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      min-height: 44px;
      font-size: 0.95rem;
      transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .btn.primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: #fff;
    }
    .btn.primary:disabled { opacity: 0.7; cursor: not-allowed; }
    .btn.primary:hover:not(:disabled) { transform: translateY(-2px); }
    .btn.outline { color: var(--primary-color); border-color: var(--primary-color); background: var(--bg-primary); }
    .btn.outline:hover { background: var(--primary-color); color: #fff; }
    .btn.ghost { background: var(--bg-secondary); color: var(--text-medium); border-color: var(--border-light); }
    .btn.ghost:hover { background: var(--bg-tertiary); }

    /* FAQ */
    .faq { background: var(--bg-primary); }
    .faq-grid { display: grid; gap: 0.75rem; max-width: 760px; margin: 0 auto; }
    .faq-item {
      background: var(--bg-secondary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 0 1.25rem;
      transition: box-shadow 0.2s ease;
    }
    .faq-item[open] { box-shadow: var(--shadow-sm); }
    .faq-item summary {
      list-style: none;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      padding: 1.25rem 0;
    }
    .faq-item summary::-webkit-details-marker { display: none; }
    .faq-item summary i {
      transition: transform 0.25s ease;
      color: var(--primary-color);
    }
    .faq-item[open] summary i { transform: rotate(180deg); }
    .faq-item p { padding: 0 0 1.25rem; color: var(--text-light); margin: 0; }

    @media (max-width: 900px) {
      .content-grid { grid-template-columns: 1fr; }
      .row { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .socials { grid-template-columns: 1fr; }
      .btn { width: 100%; justify-content: center; }
    }
  `]
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly resume = inject(ResumeService);
  private readonly fb = inject(FormBuilder);
  private readonly messages = inject(MessageService);

  submitting = signal(false);
  copied = signal<string | null>(null);

  form: FormGroup = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  faqs = [
    { question: 'What kind of work are you looking for?',
      answer: 'Frontend or full-stack roles, ideally with Angular, TypeScript, and a backend stack like NestJS or Node.js. Fintech and other domains with reliability requirements are a strong fit.' },
    { question: 'Are you open to remote work?',
      answer: 'Yes — fully remote, hybrid, or relocation for the right opportunity. I\'m based in India and comfortable working across time zones.' },
    { question: 'How quickly do you respond?',
      answer: 'Usually within one working day. Email is the most reliable channel; LinkedIn is good for short intros.' },
    { question: 'Can I see code samples?',
      answer: 'My GitHub has personal work, and InCred\'s engineering org hosts the projects I\'ve owned. The InCred repos are private but I\'m happy to walk you through architecture on a call.' },
    { question: 'Do you take on freelance work?',
      answer: 'Selectively, around my main role. Let me know the scope and timeline and I\'ll be honest about fit.' }
  ];

  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({ severity: 'warn', summary: 'Check the form', detail: 'Please fix the highlighted fields.' });
      return;
    }
    this.submitting.set(true);
    // No backend wired up — fall back to opening the user's mail client with the form pre-filled.
    setTimeout(() => {
      window.location.href = this.mailtoUrl();
      this.submitting.set(false);
      this.messages.add({
        severity: 'success',
        summary: 'Mail app opened',
        detail: 'I\'ve drafted the message in your default mail client. Press send when you\'re ready.'
      });
    }, 400);
  }

  reset(): void {
    this.form.reset();
  }

  async copy(text: string, label: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(label);
      this.messages.add({ severity: 'success', summary: `${label} copied`, detail: text });
      setTimeout(() => this.copied.set(null), 1800);
    } catch {
      this.messages.add({ severity: 'error', summary: 'Copy failed', detail: 'Your browser blocked clipboard access.' });
    }
  }

  mailtoUrl(): string {
    const v = this.form.value;
    const subject = encodeURIComponent(v.subject || 'Hello Ankaj');
    const body = encodeURIComponent(
      `Hi Ankaj,\n\n${v.message || ''}\n\n— ${v.name || ''}${v.email ? ' (' + v.email + ')' : ''}`
    );
    return `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }
}
