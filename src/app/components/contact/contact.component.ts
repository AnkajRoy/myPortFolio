import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    CardModule, 
    InputTextModule, 
    InputTextareaModule, 
    ButtonModule, 
    MessageModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="contact-container">
      <div class="container">
        <!-- Contact Header -->
        <section class="contact-header">
          <h1 class="page-title">Get In Touch</h1>
          <p class="page-subtitle">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </p>
          <div class="contact-actions">
            <button class="download-resume-btn" (click)="downloadResume()">
              <i class="pi pi-download"></i>
              Download Resume
            </button>
          </div>
        </section>

        <div class="contact-content">
          <!-- Contact Information -->
          <section class="contact-info">
            <h2 class="section-title">Contact Information</h2>
            <div class="info-cards">
              <p-card class="info-card">
                <ng-template pTemplate="header">
                  <div class="info-header">
                    <i class="pi pi-envelope info-icon"></i>
                    <h3>Email</h3>
                  </div>
                </ng-template>
                <ng-template pTemplate="content">
                  <p class="info-text">ankajkumar@email.com</p>
                  <p class="info-description">Send me an email anytime</p>
                </ng-template>
              </p-card>

              <p-card class="info-card">
                <ng-template pTemplate="header">
                  <div class="info-header">
                    <i class="pi pi-phone info-icon"></i>
                    <h3>Phone</h3>
                  </div>
                </ng-template>
                <ng-template pTemplate="content">
                  <p class="info-text">+91 9064748813</p>
                  <p class="info-description">Available for calls</p>
                </ng-template>
              </p-card>

              <p-card class="info-card">
                <ng-template pTemplate="header">
                  <div class="info-header">
                    <i class="pi pi-map-marker info-icon"></i>
                    <h3>Location</h3>
                  </div>
                </ng-template>
                <ng-template pTemplate="content">
                  <p class="info-text">Mumbai, India</p>
                  <p class="info-description">Open to remote work</p>
                </ng-template>
              </p-card>

              <p-card class="info-card">
                <ng-template pTemplate="header">
                  <div class="info-header">
                    <i class="pi pi-clock info-icon"></i>
                    <h3>Availability</h3>
                  </div>
                </ng-template>
                <ng-template pTemplate="content">
                  <p class="info-text">Monday - Friday</p>
                  <p class="info-description">9:00 AM - 6:00 PM IST</p>
                </ng-template>
              </p-card>
            </div>

            <!-- Social Links -->
            <div class="social-section">
              <h3 class="social-title">Connect With Me</h3>
              <div class="social-links">
                <a href="https://linkedin.com/in/ankajkumar" target="_blank" class="social-link linkedin">
                  <i class="pi pi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/ankajkumar" target="_blank" class="social-link github">
                  <i class="pi pi-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://twitter.com/ankajkumar" target="_blank" class="social-link twitter">
                  <i class="pi pi-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="mailto:ankajkumar@email.com" class="social-link email">
                  <i class="pi pi-envelope"></i>
                  <span>Email</span>
                </a>
                <a href="tel:+919064748813" class="social-link phone">
                  <i class="pi pi-phone"></i>
                  <span>Call</span>
                </a>
              </div>
            </div>
          </section>

          <!-- Contact Form -->
          <section class="contact-form-section">
            <h2 class="section-title">Send Me a Message</h2>
            <p-card class="form-card">
              <ng-template pTemplate="content">
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="name">Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        pInputText 
                        formControlName="name"
                        placeholder="Your full name"
                        class="form-input"
                        [class.p-invalid]="isFieldInvalid('name')">
                      <small 
                        *ngIf="isFieldInvalid('name')" 
                        class="error-message">
                        Name is required
                      </small>
                    </div>
                    
                    <div class="form-group">
                      <label for="email">Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        pInputText 
                        formControlName="email"
                        placeholder="your.email@example.com"
                        class="form-input"
                        [class.p-invalid]="isFieldInvalid('email')">
                      <small 
                        *ngIf="isFieldInvalid('email')" 
                        class="error-message">
                        Valid email is required
                      </small>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="subject">Subject *</label>
                    <input 
                      type="text" 
                      id="subject" 
                      pInputText 
                      formControlName="subject"
                      placeholder="What's this about?"
                      class="form-input"
                      [class.p-invalid]="isFieldInvalid('subject')">
                    <small 
                      *ngIf="isFieldInvalid('subject')" 
                      class="error-message">
                        Subject is required
                      </small>
                  </div>

                  <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea 
                      id="message" 
                      pInputTextarea 
                      formControlName="message"
                      placeholder="Tell me about your project or question..."
                      rows="6"
                      class="form-textarea"
                      [class.p-invalid]="isFieldInvalid('message')">
                    </textarea>
                    <small 
                      *ngIf="isFieldInvalid('message')" 
                      class="error-message">
                        Message is required
                      </small>
                  </div>

                  <div class="form-actions">
                    <p-button 
                      type="submit" 
                      label="Send Message" 
                      icon="pi pi-send"
                      [loading]="isSubmitting"
                      [disabled]="contactForm.invalid || isSubmitting"
                      class="submit-btn">
                    </p-button>
                    <p-button 
                      type="button" 
                      label="Reset" 
                      icon="pi pi-refresh"
                      [outlined]="true"
                      (onClick)="resetForm()"
                      class="reset-btn">
                    </p-button>
                  </div>
                </form>
              </ng-template>
            </p-card>
          </section>
        </div>

        <!-- FAQ Section -->
        <section class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-grid">
            <p-card class="faq-card" *ngFor="let faq of faqs">
              <ng-template pTemplate="content">
                <div class="faq-item">
                  <h3 class="faq-question">{{ faq.question }}</h3>
                  <p class="faq-answer">{{ faq.answer }}</p>
                </div>
              </ng-template>
            </p-card>
          </div>
        </section>
      </div>
    </div>

    <p-toast></p-toast>
  `,
  styles: [`
    .contact-container {
      padding: 2rem 0;
      background: var(--bg-primary);
    }
    
    .contact-header {
      text-align: center;
      padding: 6rem 0 4rem;
      background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    }
    
    .page-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }
    
    .page-subtitle {
      font-size: 1.375rem;
      color: var(--text-light);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }

    .download-resume-btn {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      position: relative;
      overflow: hidden;
    }

    .download-resume-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .download-resume-btn:hover::before {
      left: 100%;
    }

    .download-resume-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
    }

    .download-resume-btn i {
      font-size: 1.125rem;
    }
    
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      padding: 4rem 0;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      position: relative;
    }
    
    .contact-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23e2e8f0" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23e2e8f0" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.3;
      pointer-events: none;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      position: relative;
      z-index: 1;
    }
    
    .section-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 2.5rem;
      letter-spacing: -0.02em;
      position: relative;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      border-radius: 2px;
    }
    
    .info-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .info-card {
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      position: relative;
    }
    
    .info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .info-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      border-color: var(--primary-color);
    }
    
    .info-card:hover::before {
      opacity: 1;
    }
    
    .info-header {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 2rem 2rem 1.5rem 2rem;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .info-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      pointer-events: none;
    }
    
    .info-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-color), var(--primary-light));
    }
    
    .info-icon {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }
    
    .info-card:hover .info-icon {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.1);
    }
    
    .info-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    
    .info-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }
    
    .info-description {
      color: var(--text-medium);
      font-size: 1rem;
      line-height: 1.6;
      font-weight: 500;
    }
    
    .social-section {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2.5rem 2rem;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(20px);
      position: relative;
      overflow: hidden;
    }
    
    .social-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
    }
    
    .social-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .social-links {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
    
    .social-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1.5rem;
      border-radius: 16px;
      text-decoration: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      color: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .social-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .social-link:hover::before {
      opacity: 1;
    }
    
    .social-link i {
      font-size: 2.25rem;
      margin-bottom: 0.75rem;
      position: relative;
      z-index: 1;
    }
    
    .social-link span {
      font-size: 1rem;
      font-weight: 600;
      position: relative;
      z-index: 1;
    }
    
    .social-link.linkedin {
      background: linear-gradient(135deg, #0077b5, #005885);
    }
    
    .social-link.github {
      background: linear-gradient(135deg, #333, #1a1a1a);
    }
    
    .social-link.twitter {
      background: linear-gradient(135deg, #1da1f2, #0d8bd9);
    }
    
    .social-link.email {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    }
    
    .social-link.phone {
      background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .social-link:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
    }
    
    .contact-form-section {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }
    
    .form-card {
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      position: relative;
    }
    
    .form-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }
    
    .contact-form {
      padding: 3rem 3rem 2rem 3rem;
      background: transparent;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }
    
    .form-group:first-child {
      margin-top: 1rem;
    }
    
    .form-group label {
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.75rem;
      font-size: 1rem;
      letter-spacing: -0.01em;
    }
    
    .form-group label[for="name"],
    .form-group label[for="email"] {
      font-weight: 600;
    }
    
    .form-input,
    .form-textarea {
      width: 100%;
      padding: 1rem 1.25rem;
      border: 2px solid rgba(226, 232, 240, 0.8);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.9);
      color: var(--text-dark);
      backdrop-filter: blur(10px);
    }
    
    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 1);
    }
    
    .form-input.p-invalid,
    .form-textarea.p-invalid {
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }
    
    .form-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 1rem;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      border: none;
      color: white;
      font-weight: 600;
      padding: 1rem 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1rem;
      position: relative;
      overflow: hidden;
    }
    
    .submit-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .submit-btn:hover::before {
      left: 100%;
    }
    
    .submit-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
    }
    
    .reset-btn {
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      background: rgba(255, 255, 255, 0.9);
      font-weight: 600;
      padding: 1rem 2.5rem;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1rem;
      backdrop-filter: blur(10px);
    }
    
    .reset-btn:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
    }
    
    .faq-section {
      padding: 6rem 0;
      background: var(--bg-primary);
    }
    
    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
    }
    
    .faq-card {
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
      transition: all 0.3s ease;
      overflow: hidden;
    }
    
    .faq-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .faq-item {
      padding: 2.5rem;
    }
    
    .faq-question {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
    
    .faq-answer {
      color: var(--text-light);
      line-height: 1.7;
      font-size: 1rem;
    }
    
    @media (max-width: 1024px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      
      .info-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      
      .faq-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.25rem;
      }
      
      .page-subtitle {
        font-size: 1rem;
      }
      
      .contact-content {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
      
      .info-cards {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .info-card {
        padding: 1.5rem;
        text-align: center;
      }
      
      .info-header {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }
      
      .info-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
      }
      
      .info-text h4 {
        font-size: 1.125rem;
      }
      
      .info-description {
        font-size: 0.9rem;
      }
      
      .social-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        justify-items: center;
      }
      
      .social-link {
        width: 100%;
        max-width: 200px;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
      
      .contact-form {
        padding: 2rem 1.5rem 1.5rem 1.5rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .form-group label {
        font-size: 0.9rem;
      }
      
      .form-input, .form-textarea {
        font-size: 0.9rem;
        padding: 0.75rem;
      }
      
      .form-actions {
        flex-direction: column;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      
      .submit-btn, .reset-btn {
        width: 100%;
        padding: 0.875rem 1rem;
        font-size: 0.9rem;
      }
      
      .faq-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .faq-card {
        padding: 1.5rem;
      }
      
      .faq-question {
        font-size: 1rem;
      }
      
      .faq-answer {
        font-size: 0.9rem;
      }
    }
    
    @media (max-width: 480px) {
      .page-title {
        font-size: 1.875rem;
      }
      
      .page-subtitle {
        font-size: 0.9rem;
      }
      
      .contact-content {
        gap: 2rem;
      }
      
      .info-card {
        padding: 1.25rem;
      }
      
      .info-icon {
        width: 45px;
        height: 45px;
        font-size: 1.125rem;
      }
      
      .info-text h4 {
        font-size: 1rem;
      }
      
      .info-description {
        font-size: 0.85rem;
      }
      
      .social-links {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      
      .social-link {
        padding: 0.625rem 0.875rem;
        font-size: 0.85rem;
      }
      
      .contact-form {
        padding: 1.5rem 1rem 1rem 1rem;
      }
      
      .form-group label {
        font-size: 0.85rem;
      }
      
      .form-input, .form-textarea {
        font-size: 0.85rem;
        padding: 0.625rem;
      }
      
      .submit-btn, .reset-btn {
        padding: 0.75rem 0.875rem;
        font-size: 0.85rem;
      }
      
      .faq-card {
        padding: 1.25rem;
      }
      
      .faq-question {
        font-size: 0.9rem;
      }
      
      .faq-answer {
        font-size: 0.85rem;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  faqs = [
    {
      question: 'What services do you offer?',
      answer: 'I specialize in frontend development using Angular, React, JavaScript, and modern web technologies. I also provide full-stack solutions with Node.js and can help with UI/UX design using PrimeNG and other component libraries.'
    },
    {
      question: 'What is your availability?',
      answer: 'I am currently available for freelance projects and new opportunities. I can work remotely and am flexible with time zones. I typically respond to inquiries within 24 hours.'
    },
    {
      question: 'Do you work with teams?',
      answer: 'Yes, I have extensive experience working in agile teams and collaborating with designers, backend developers, and project managers. I can adapt to different team structures and communication styles.'
    },
    {
      question: 'What is your development process?',
      answer: 'I follow modern development practices including version control with Git, code reviews, testing, and continuous integration. I use agile methodologies and maintain clear communication throughout the project lifecycle.'
    },
    {
      question: 'Can you help with existing projects?',
      answer: 'Absolutely! I can help maintain, debug, and enhance existing Angular, React, or JavaScript applications. I can also assist with code refactoring and performance optimization.'
    },
    {
      question: 'What are your rates?',
      answer: 'My rates vary depending on project scope, timeline, and complexity. I offer competitive rates for quality work and am happy to discuss your specific requirements and budget.'
    }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Message Sent!',
          detail: 'Thank you for your message. I will get back to you soon.'
        });
        this.resetForm();
      }, 2000);
    } else {
      this.contactForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Form Error',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  resetForm() {
    this.contactForm.reset();
  }

  downloadResume() {
    // Show the resume link to user
    const resumeLink = 'https://drive.google.com/file/d/1qK2AMZEpe5Jw-v-Yh-lj9DTm4ytTJceI/view?usp=sharing';
    
    // Copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(resumeLink).then(() => {
        alert('Resume link copied to clipboard! Paste it in your browser to view/download.');
      }).catch(() => {
        alert('Please copy this link: ' + resumeLink);
      });
    } else {
      // Fallback for older browsers
      alert('Please copy this link: ' + resumeLink);
    }
  }
}
