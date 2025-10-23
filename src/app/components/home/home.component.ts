import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, TagModule, ChipModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                Hi, I'm <span class="highlight">Ankaj Kumar</span>
              </h1>
              <h2 class="hero-subtitle">
                Frontend Developer with 3.5 Years Experience
              </h2>
              <p class="hero-description">
                Passionate about creating exceptional user experiences with Angular, JavaScript, PrimeNG, 
                and modern web technologies. Currently working at Incred Financial Services on innovative 
                financial solutions.
              </p>
              <div class="hero-actions">
                <p-button 
                  label="View My Work" 
                  icon="pi pi-arrow-right" 
                  (onClick)="scrollToProjects()"
                  class="hero-btn primary">
                </p-button>
                <p-button 
                  label="Download Resume" 
                  icon="pi pi-download" 
                  [outlined]="true"
                  (onClick)="downloadResume()"
                  class="hero-btn">
                </p-button>
                <p-button 
                  label="Get In Touch" 
                  icon="pi pi-envelope" 
                  [outlined]="true"
                  routerLink="/contact"
                  class="hero-btn">
                </p-button>
              </div>
              <div class="hero-stats">
                <div class="stat">
                  <span class="stat-number">3.5+</span>
                  <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat">
                  <span class="stat-number">10+</span>
                  <span class="stat-label">Projects Completed</span>
                </div>
                <div class="stat">
                  <span class="stat-number">5+</span>
                  <span class="stat-label">Technologies</span>
                </div>
              </div>
            </div>
            <div class="hero-image">
              <div class="profile-card">
                <div class="profile-avatar">
                  <img src="assets/images/profile-image.jpg" alt="Ankaj Kumar" class="profile-image">
                </div>
                <div class="profile-info">
                  <h3>Ankaj Kumar</h3>
                  <p>Frontend Developer</p>
                  <div class="status-indicator">
                    <span class="status-dot"></span>
                    <span>Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills-section">
        <div class="container">
          <h2 class="section-title">Core Technologies</h2>
          <div class="skills-grid">
            <div class="skill-card" *ngFor="let skill of skills">
              <div class="skill-icon">
                <i [class]="skill.icon"></i>
              </div>
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-level">
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
                <span class="skill-percentage">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Projects Preview -->
      <section class="projects-preview">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Projects</h2>
            <p-button 
              label="View All Projects" 
              icon="pi pi-arrow-right" 
              [outlined]="true"
              routerLink="/projects"
              class="view-all-btn">
            </p-button>
          </div>
          <div class="projects-grid">
            <div class="project-card" *ngFor="let project of featuredProjects">
              <div class="project-image">
                <i [class]="project.icon" class="project-icon"></i>
              </div>
              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  <p-chip 
                    *ngFor="let tech of project.technologies" 
                    [label]="tech" 
                    [style]="{'background-color': '#e0f2fe', 'color': '#0369a1'}">
                  </p-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }
    
    .hero-section {
      padding: 8rem 0;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      position: relative;
      overflow: hidden;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23e2e8f0" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23e2e8f0" opacity="0.3"/><circle cx="50" cy="10" r="0.5" fill="%23e2e8f0" opacity="0.2"/><circle cx="10" cy="60" r="0.5" fill="%23e2e8f0" opacity="0.2"/><circle cx="90" cy="40" r="0.5" fill="%23e2e8f0" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      opacity: 0.4;
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    
    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--text-dark);
      letter-spacing: -0.02em;
    }
    
    .highlight {
      color: var(--primary-color);
      position: relative;
    }
    
    .highlight::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      border-radius: 2px;
    }
    
    .hero-subtitle {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-medium);
      margin-bottom: 2rem;
      letter-spacing: -0.01em;
    }
    
    .hero-description {
      font-size: 1.25rem;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 2.5rem;
      max-width: 90%;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
    }
    
    .hero-btn {
      padding: 0.75rem 2rem;
      font-weight: 500;
    }
    
    .hero-stats {
      display: flex;
      gap: 2rem;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-light);
    }
    
    .profile-card {
      background: var(--bg-primary);
      border-radius: var(--radius-2xl);
      padding: 3rem 2rem;
      box-shadow: var(--shadow-xl);
      text-align: center;
      border: 1px solid var(--border-light);
      position: relative;
      overflow: hidden;
    }
    
    .profile-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    }
    
    .profile-avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
      border: 4px solid var(--primary-color);
    }
    
    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
    
    .profile-avatar:hover .profile-image {
      transform: scale(1.05);
    }
    
    .profile-info h3 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .profile-info p {
      color: var(--text-medium);
      margin-bottom: 1.5rem;
      font-size: 1.125rem;
      font-weight: 500;
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      font-size: 1rem;
      color: var(--text-light);
      background: var(--bg-secondary);
      padding: 0.75rem 1.5rem;
      border-radius: var(--radius-2xl);
      font-weight: 500;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      background: #10b981;
      border-radius: 50%;
      animation: pulse 2s infinite;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .skills-section {
      padding: 6rem 0;
      background: var(--bg-secondary);
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
    }
    
    .skill-card {
      background: var(--bg-primary);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .skill-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .skill-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }
    
    .skill-card:hover::before {
      transform: scaleX(1);
    }
    
    .skill-icon {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-md);
      position: relative;
    }
    
    .skill-icon::before {
      content: '';
      position: absolute;
      inset: 2px;
      background: var(--bg-primary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .skill-icon i {
      font-size: 1.75rem;
      color: var(--primary-color);
      position: relative;
      z-index: 1;
    }
    
    .skill-name {
      font-size: 1.375rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--text-dark);
    }
    
    .skill-description {
      color: var(--text-light);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .skill-level {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .skill-bar {
      flex: 1;
      height: 10px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      position: relative;
    }
    
    .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      border-radius: var(--radius-2xl);
      transition: width 1.5s ease;
      position: relative;
    }
    
    .skill-progress::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    }
    
    .skill-percentage {
      font-weight: 700;
      color: var(--primary-color);
      font-size: 1.125rem;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .projects-preview {
      padding: 6rem 0;
      background: var(--bg-primary);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 2.5rem;
    }
    
    .project-card {
      background: var(--bg-primary);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-light);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }
    
    .project-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
    }
    
    .project-card:hover::before {
      transform: scaleX(1);
    }
    
    .project-image {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-md);
    }
    
    .project-icon {
      font-size: 1.75rem;
      color: white;
    }
    
    .project-title {
      font-size: 1.375rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: var(--text-dark);
    }
    
    .project-description {
      color: var(--text-light);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: 3rem;
      }
      
      .hero-description {
        max-width: 100%;
        font-size: 1.125rem;
      }
      
      .hero-actions {
        justify-content: center;
      }
      
      .hero-stats {
        justify-content: center;
        gap: 3rem;
      }
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 2rem 0;
      }
      
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.25rem;
        line-height: 1.2;
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
      }
      
      .hero-description {
        font-size: 1rem;
        max-width: 100%;
        margin-bottom: 2rem;
      }
      
      .hero-actions {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      }
      
      .hero-btn {
        width: 100%;
        max-width: 280px;
        padding: 0.875rem 1.5rem;
      }
      
      .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
      }
      
      .stat {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .stat-number {
        font-size: 1.75rem;
      }
      
      .stat-label {
        font-size: 0.9rem;
      }
      
      .profile-card {
        padding: 2rem 1.5rem;
      }
      
      .profile-avatar {
        width: 120px;
        height: 120px;
      }
      
      .profile-image {
        width: 100%;
        height: 100%;
      }
      
      .profile-info h3 {
        font-size: 1.5rem;
      }
      
      .profile-info p {
        font-size: 1rem;
      }
      
      .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        text-align: left;
      }
      
      .skills-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero-section {
        padding: 1.5rem 0;
      }
      
      .hero-title {
        font-size: 1.875rem;
      }
      
      .hero-subtitle {
        font-size: 1.125rem;
      }
      
      .hero-description {
        font-size: 0.9rem;
      }
      
      .hero-btn {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
      }
      
      .profile-card {
        padding: 1.5rem 1rem;
      }
      
      .profile-avatar {
        width: 100px;
        height: 100px;
      }
      
      .profile-image {
        width: 100%;
        height: 100%;
      }
      
      .profile-info h3 {
        font-size: 1.25rem;
      }
      
      .profile-info p {
        font-size: 0.9rem;
      }
      
      .skill-card {
        padding: 1.5rem 1rem;
      }
      
      .skill-name {
        font-size: 1.125rem;
      }
      
      .skill-description {
        font-size: 0.875rem;
      }
      
      .project-card {
        padding: 1.5rem 1rem;
      }
      
      .project-title {
        font-size: 1.125rem;
      }
      
      .project-description {
        font-size: 0.875rem;
      }
    }
  `]
})
export class HomeComponent {
  skills = [
    {
      name: 'Angular',
      description: 'Expert in Angular framework with 3.5+ years experience',
      icon: 'pi pi-angular',
      level: 95
    },
    {
      name: 'JavaScript',
      description: 'Proficient in modern JavaScript ES6+ and TypeScript',
      icon: 'pi pi-code',
      level: 90
    },
    {
      name: 'PrimeNG',
      description: 'Extensive experience with PrimeNG component library',
      icon: 'pi pi-palette',
      level: 85
    },
    {
      name: 'React',
      description: 'Working knowledge of React and modern frontend patterns',
      icon: 'pi pi-mobile',
      level: 75
    },
    {
      name: 'Node.js',
      description: 'Backend development with Node.js and Express',
      icon: 'pi pi-server',
      level: 70
    },
    {
      name: 'Python',
      description: 'Scripting and automation with Python',
      icon: 'pi pi-cog',
      level: 65
    }
  ];

  featuredProjects = [
    {
      title: 'Connector Onboarding Portal',
      description: 'Comprehensive onboarding solution with DigiLocker, Digio, eSign integration',
      icon: 'pi pi-users',
      technologies: ['Angular', 'PrimeNG', 'SSO', 'OTP']
    },
    {
      title: 'Wealth Transaction Portal',
      description: 'Financial transaction management system with UAM integration',
      icon: 'pi pi-chart-line',
      technologies: ['Angular', 'JavaScript', 'PrimeNG', 'REST API']
    },
    {
      title: 'Private NPM Package',
      description: 'Custom authentication and authorization package for SSO',
      icon: 'pi pi-shield',
      technologies: ['Node.js', 'TypeScript', 'JWT', 'NPM']
    }
  ];

  scrollToProjects() {
    const element = document.querySelector('.projects-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
