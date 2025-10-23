import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TimelineModule, CardModule, TagModule, ChipModule, ButtonModule],
  template: `
    <div class="experience-container">
      <div class="container">
        <!-- Experience Header -->
        <section class="experience-header">
          <h1 class="page-title">Professional Experience</h1>
          <p class="page-subtitle">
            3.5+ years of experience building scalable web applications and leading frontend development teams
          </p>
        </section>

        <!-- Current Role -->
        <section class="current-experience">
          <h2 class="section-title">Current Position</h2>
          <p-card class="experience-card current">
            <ng-template pTemplate="header">
              <div class="experience-header-card">
                <div class="company-info">
                  <div class="company-logo">
                    <i class="pi pi-building"></i>
                  </div>
                  <div class="company-details">
                    <h3>Incred Financial Services</h3>
                    <p class="role-title">Frontend Software Engineer</p>
                    <p class="duration">2023 - Present</p>
                  </div>
                </div>
                <p-tag value="Current" severity="success"></p-tag>
              </div>
            </ng-template>
            <ng-template pTemplate="content">
              <div class="experience-content">
                <div class="role-description">
                  <p>
                    Leading frontend development for critical financial applications with deep expertise 
                    in Keycloak authentication and authorization. Developed and owned multiple major 
                    projects including Connector Onboarding, User Access Management, and private NPM 
                    libraries. Implemented advanced authentication systems with SSO, OTP login, and 
                    integrated multiple technologies like DigiLocker, Digio, and eSign for customer 
                    KYC processes.
                  </p>
                </div>
                
                <div class="key-projects">
                  <h4>Key Projects & Achievements:</h4>
                  <div class="project-list">
                    <div class="project-item">
                      <h5>Connector Onboarding Portal</h5>
                      <p>Developed and owned comprehensive onboarding solution integrating DigiLocker, Digio, and eSign services for customer KYC processes</p>
                      <div class="project-tech">
                        <p-chip label="Angular" [style]="{'background-color': '#dd0031', 'color': 'white'}"></p-chip>
                        <p-chip label="PrimeNG" [style]="{'background-color': '#007ad9', 'color': 'white'}"></p-chip>
                        <p-chip label="DigiLocker" [style]="{'background-color': '#28a745', 'color': 'white'}"></p-chip>
                        <p-chip label="Digio" [style]="{'background-color': '#17a2b8', 'color': 'white'}"></p-chip>
                        <p-chip label="eSign" [style]="{'background-color': '#6f42c1', 'color': 'white'}"></p-chip>
                      </div>
                    </div>
                    
                    <div class="project-item">
                      <h5>User Access Management (UAM)</h5>
                      <p>Developed and managed user access control system with advanced authentication and authorization features</p>
                      <div class="project-tech">
                        <p-chip label="Keycloak" [style]="{'background-color': '#ff6b35', 'color': 'white'}"></p-chip>
                        <p-chip label="SSO" [style]="{'background-color': '#28a745', 'color': 'white'}"></p-chip>
                        <p-chip label="OTP" [style]="{'background-color': '#ffc107', 'color': 'black'}"></p-chip>
                        <p-chip label="Angular" [style]="{'background-color': '#dd0031', 'color': 'white'}"></p-chip>
                      </div>
                    </div>
                    
                    <div class="project-item">
                      <h5>Private NPM Library</h5>
                      <p>Created and maintained private NPM package providing OTP login and SSO authentication with Keycloak integration</p>
                      <div class="project-tech">
                        <p-chip label="NPM" [style]="{'background-color': '#cb3837', 'color': 'white'}"></p-chip>
                        <p-chip label="Keycloak" [style]="{'background-color': '#ff6b35', 'color': 'white'}"></p-chip>
                        <p-chip label="JavaScript" [style]="{'background-color': '#f7df1e', 'color': 'black'}"></p-chip>
                        <p-chip label="Authentication" [style]="{'background-color': '#6f42c1', 'color': 'white'}"></p-chip>
                      </div>
                    </div>
                    
                    <div class="project-item">
                      <h5>SCF Supply Chain Finance</h5>
                      <p>Developed supply chain finance solutions and upgraded multiple legacy portals for improved performance</p>
                      <div class="project-tech">
                        <p-chip label="Angular" [style]="{'background-color': '#dd0031', 'color': 'white'}"></p-chip>
                        <p-chip label="JavaScript" [style]="{'background-color': '#f7df1e', 'color': 'black'}"></p-chip>
                        <p-chip label="PrimeNG" [style]="{'background-color': '#007ad9', 'color': 'white'}"></p-chip>
                        <p-chip label="Legacy Upgrade" [style]="{'background-color': '#17a2b8', 'color': 'white'}"></p-chip>
                      </div>
                    </div>
                    
                    <div class="project-item">
                      <h5>Private NPM Package</h5>
                      <p>Custom authentication and authorization package for SSO integration</p>
                      <div class="project-tech">
                        <p-chip label="Node.js" [style]="{'background-color': '#339933', 'color': 'white'}"></p-chip>
                        <p-chip label="TypeScript" [style]="{'background-color': '#3178c6', 'color': 'white'}"></p-chip>
                        <p-chip label="JWT" [style]="{'background-color': '#000000', 'color': 'white'}"></p-chip>
                        <p-chip label="NPM" [style]="{'background-color': '#cb3837', 'color': 'white'}"></p-chip>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="responsibilities">
                  <h4>Key Responsibilities:</h4>
                  <ul class="responsibility-list">
                    <li>Develop and maintain scalable Angular applications with PrimeNG components</li>
                    <li>Integrate third-party services (DigiLocker, Digio, eSign, UAM portal)</li>
                    <li>Implement SSO authentication and OTP-based login systems</li>
                    <li>Optimize application performance and user experience</li>
                    <li>Collaborate with backend teams for API integration</li>
                    <li>Mentor junior developers and conduct code reviews</li>
                  </ul>
                </div>
              </div>
            </ng-template>
          </p-card>
        </section>

        <!-- Previous Experience -->
        <section class="previous-experience">
          <h2 class="section-title">Previous Experience</h2>
          <div class="experience-timeline">
            <p-timeline [value]="previousExperiences" align="alternate">
              <ng-template let-experience pTemplate="content">
                <p-card class="timeline-card">
                  <ng-template pTemplate="header">
                    <div class="timeline-header">
                      <div class="company-info">
                        <h4>{{ experience.company }}</h4>
                        <p class="role">{{ experience.role }}</p>
                        <p class="duration">{{ experience.duration }}</p>
                      </div>
                    </div>
                  </ng-template>
                  <ng-template pTemplate="content">
                    <div class="timeline-content">
                      <p class="description">{{ experience.description }}</p>
                      <div class="achievements">
                        <h5>Key Achievements:</h5>
                        <ul>
                          <li *ngFor="let achievement of experience.achievements">{{ achievement }}</li>
                        </ul>
                      </div>
                      <div class="technologies">
                        <p-chip 
                          *ngFor="let tech of experience.technologies" 
                          [label]="tech" 
                          [style]="{'background-color': '#e0f2fe', 'color': '#0369a1'}">
                        </p-chip>
                      </div>
                    </div>
                  </ng-template>
                </p-card>
              </ng-template>
            </p-timeline>
          </div>
        </section>

        <!-- Skills & Expertise -->
        <section class="skills-expertise">
          <h2 class="section-title">Technical Expertise</h2>
          <div class="expertise-grid">
            <div class="expertise-category" *ngFor="let category of expertiseCategories">
              <h3 class="category-title">{{ category.name }}</h3>
              <div class="skill-levels">
                <div class="skill-level" *ngFor="let skill of category.skills">
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-percentage">{{ skill.level }}%</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" [style.width.%]="skill.level"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section class="certifications">
          <h2 class="section-title">Certifications & Learning</h2>
          <div class="certifications-grid">
            <p-card *ngFor="let cert of certifications" class="cert-card">
              <ng-template pTemplate="header">
                <div class="cert-header">
                  <i [class]="cert.icon" class="cert-icon"></i>
                  <h4>{{ cert.title }}</h4>
                </div>
              </ng-template>
              <ng-template pTemplate="content">
                <p class="cert-description">{{ cert.description }}</p>
                <p class="cert-year">{{ cert.year }}</p>
                <p-button 
                  *ngIf="cert.credential" 
                  [label]="'View Credential'" 
                  [outlined]="true" 
                  size="small"
                  class="credential-btn">
                </p-button>
              </ng-template>
            </p-card>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .experience-container {
      padding: 2rem 0;
    }
    
    .experience-header {
      text-align: center;
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }
    
    .page-subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .current-experience {
      padding: 4rem 0;
      background: var(--bg-light);
    }
    
    .experience-card {
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
    }
    
    .experience-card.current {
      border-left: 4px solid var(--primary-color);
    }
    
    .experience-header-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      background: var(--primary-color);
      color: white;
    }
    
    .company-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .company-logo {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .company-logo i {
      font-size: 1.5rem;
    }
    
    .company-details h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .role-title {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 0.25rem;
    }
    
    .duration {
      font-size: 0.875rem;
      opacity: 0.8;
    }
    
    .experience-content {
      padding: 2rem;
    }
    
    .role-description p {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 2rem;
    }
    
    .key-projects h4,
    .responsibilities h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }
    
    .project-list {
      margin-bottom: 2rem;
    }
    
    .project-item {
      background: var(--bg-light);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .project-item h5 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .project-item p {
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .responsibility-list {
      list-style: none;
      padding: 0;
    }
    
    .responsibility-list li {
      padding: 0.5rem 0;
      color: var(--text-light);
      position: relative;
      padding-left: 1.5rem;
    }
    
    .responsibility-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
    
    .previous-experience {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .timeline-card {
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }
    
    .timeline-header {
      padding: 1.5rem;
      background: var(--bg-light);
    }
    
    .timeline-header h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .timeline-header .role {
      font-weight: 500;
      color: var(--primary-color);
      margin-bottom: 0.25rem;
    }
    
    .timeline-header .duration {
      font-size: 0.875rem;
      color: var(--text-light);
    }
    
    .timeline-content {
      padding: 1.5rem;
    }
    
    .description {
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    .achievements h5 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .achievements ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
    }
    
    .achievements li {
      padding: 0.25rem 0;
      color: var(--text-light);
      position: relative;
      padding-left: 1rem;
    }
    
    .achievements li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary-color);
    }
    
    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skills-expertise {
      padding: 4rem 0;
      background: var(--bg-light);
    }
    
    .expertise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .expertise-category {
      background: var(--bg-white);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow-md);
    }
    
    .category-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text-dark);
    }
    
    .skill-level {
      margin-bottom: 1.5rem;
    }
    
    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .skill-name {
      font-weight: 500;
      color: var(--text-dark);
    }
    
    .skill-percentage {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .skill-bar {
      height: 8px;
      background: var(--bg-light);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: var(--primary-color);
      border-radius: 4px;
      transition: width 1s ease;
    }
    
    .certifications {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .cert-card {
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }
    
    .cert-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--accent-color);
      color: white;
    }
    
    .cert-icon {
      font-size: 1.5rem;
    }
    
    .cert-header h4 {
      margin: 0;
      font-size: 1.125rem;
    }
    
    .cert-description {
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    .cert-year {
      font-weight: 600;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    .credential-btn {
      font-size: 0.875rem;
    }
    
    @media (max-width: 1024px) {
      .experience-header-card {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
      }
      
      .company-info {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .expertise-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .certifications-grid {
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
      
      .experience-header-card {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        padding: 2rem 1.5rem;
      }
      
      .company-info {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }
      
      .company-name {
        font-size: 1.5rem;
      }
      
      .company-role {
        font-size: 1.125rem;
      }
      
      .company-duration {
        font-size: 0.9rem;
      }
      
      .current-badge {
        font-size: 0.75rem;
        padding: 0.25rem 0.75rem;
      }
      
      .company-description {
        font-size: 0.9rem;
        text-align: left;
      }
      
      .achievements {
        margin-top: 1.5rem;
      }
      
      .achievements li {
        font-size: 0.875rem;
        padding: 0.2rem 0;
      }
      
      .technologies {
        justify-content: center;
        gap: 0.4rem;
      }
      
      .expertise-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .expertise-category {
        padding: 1.5rem;
      }
      
      .category-title {
        font-size: 1.125rem;
        margin-bottom: 1rem;
      }
      
      .skill-level {
        margin-bottom: 1rem;
      }
      
      .skill-name {
        font-size: 0.9rem;
      }
      
      .skill-percentage {
        font-size: 0.85rem;
      }
      
      .certifications-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .cert-card {
        margin-bottom: 1rem;
      }
      
      .cert-header {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
        padding: 1.5rem;
      }
      
      .cert-title {
        font-size: 1.125rem;
      }
      
      .cert-year {
        font-size: 0.875rem;
      }
      
      .cert-body {
        padding: 1.5rem;
      }
      
      .cert-description {
        font-size: 0.9rem;
      }
      
      .cert-actions {
        margin-top: 1rem;
      }
      
      .cert-btn {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }
    }
    
    @media (max-width: 480px) {
      .page-title {
        font-size: 1.875rem;
      }
      
      .page-subtitle {
        font-size: 0.9rem;
      }
      
      .experience-header-card {
        padding: 1.5rem 1rem;
      }
      
      .company-name {
        font-size: 1.25rem;
      }
      
      .company-role {
        font-size: 1rem;
      }
      
      .company-duration {
        font-size: 0.8rem;
      }
      
      .company-description {
        font-size: 0.85rem;
      }
      
      .achievements li {
        font-size: 0.8rem;
      }
      
      .expertise-category {
        padding: 1rem;
      }
      
      .category-title {
        font-size: 1rem;
      }
      
      .skill-name {
        font-size: 0.85rem;
      }
      
      .skill-percentage {
        font-size: 0.8rem;
      }
      
      .cert-header {
        padding: 1rem;
      }
      
      .cert-title {
        font-size: 1rem;
      }
      
      .cert-year {
        font-size: 0.8rem;
      }
      
      .cert-body {
        padding: 1rem;
      }
      
      .cert-description {
        font-size: 0.85rem;
      }
      
      .cert-btn {
        padding: 0.625rem 0.875rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ExperienceComponent {
  previousExperiences = [
    {
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      duration: '2021 - 2023',
      description: 'Developed responsive web applications using Angular and modern JavaScript frameworks.',
      achievements: [
        'Improved application performance by 40%',
        'Led team of 3 junior developers',
        'Implemented CI/CD pipeline for frontend deployments'
      ],
      technologies: ['Angular', 'JavaScript', 'TypeScript', 'PrimeNG', 'Git']
    },
    {
      company: 'Digital Agency',
      role: 'Junior Frontend Developer',
      duration: '2020 - 2021',
      description: 'Started career in frontend development, working on various client projects.',
      achievements: [
        'Completed 15+ client projects',
        'Learned modern JavaScript and Angular',
        'Contributed to open source projects'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Angular', 'Bootstrap']
    }
  ];

  expertiseCategories = [
    {
      name: 'Frontend Technologies',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'PrimeNG', level: 90 },
        { name: 'HTML/CSS', level: 95 }
      ]
    },
    {
      name: 'Authentication & Security',
      skills: [
        { name: 'Keycloak', level: 90 },
        { name: 'SSO', level: 85 },
        { name: 'OTP', level: 80 },
        { name: 'Authentication', level: 90 },
        { name: 'Authorization', level: 85 }
      ]
    },
    {
      name: 'Integration & APIs',
      skills: [
        { name: 'DigiLocker', level: 80 },
        { name: 'Digio', level: 75 },
        { name: 'eSign', level: 75 },
        { name: 'NPM', level: 85 },
        { name: 'REST API', level: 80 }
      ]
    }
  ];

  certifications = [
    {
      title: 'Angular Developer Certification',
      description: 'Official Angular certification demonstrating expertise in Angular framework and best practices.',
      year: '2023',
      icon: 'pi pi-certificate',
      credential: 'https://example.com/certificate'
    },
    {
      title: 'JavaScript Advanced Concepts',
      description: 'Advanced JavaScript and ES6+ features certification from a leading online platform.',
      year: '2022',
      icon: 'pi pi-code',
      credential: null
    },
    {
      title: 'Frontend Development Mastery',
      description: 'Comprehensive frontend development course covering modern web technologies.',
      year: '2021',
      icon: 'pi pi-graduation-cap',
      credential: null
    }
  ];
}
