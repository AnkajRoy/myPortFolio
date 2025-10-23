import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, TimelineModule, ChipModule],
  template: `
    <div class="about-container">
      <div class="container">
        <!-- About Hero -->
        <section class="about-hero">
          <div class="about-content">
            <div class="about-text">
              <h1 class="about-title">About Me</h1>
              <p class="about-description">
                I'm a passionate Frontend Developer with 3.5 years of experience creating 
                exceptional user experiences. Currently working at Incred Financial Services, 
                I specialize in Angular, JavaScript, PrimeNG, and modern web technologies.
              </p>
              <p class="about-description">
                I graduated with a Bachelor of Engineering in Information Technology from 
                University Institute of Technology, Burdwan (2018-2022). My journey in web 
                development has evolved to include expertise in Angular framework, React, Node.js, 
                and various frontend libraries. I'm passionate about clean code, user experience, 
                and staying up-to-date with the latest web technologies.
              </p>
              <div class="about-actions">
                <button class="download-btn" (click)="downloadResume()">
                  <i class="pi pi-download"></i>
                  Download Resume
                </button>
              </div>
            </div>
            <div class="about-image">
              <div class="profile-image">
                <img src="assets/images/profile-image.jpg" alt="Ankaj Kumar" class="about-profile-img">
              </div>
            </div>
          </div>
        </section>

        <!-- Education & Certifications -->
        <section class="education-section">
          <h2 class="section-title">Education & Certifications</h2>
          <div class="education-grid">
            <p-card class="education-card">
              <ng-template pTemplate="header">
                <div class="education-header">
                  <i class="pi pi-graduation-cap education-icon"></i>
                  <h3>Bachelor of Engineering</h3>
                </div>
              </ng-template>
              <ng-template pTemplate="content">
                <p class="education-description">
                  Information Technology from University Institute of Technology, Burdwan. 
                  Focus on software engineering, web technologies, and system design.
                </p>
                <p class="education-year">2018 - 2022</p>
              </ng-template>
            </p-card>

            <p-card class="education-card">
              <ng-template pTemplate="header">
                <div class="education-header">
                  <i class="pi pi-certificate education-icon"></i>
                  <h3>Angular Certification</h3>
                </div>
              </ng-template>
              <ng-template pTemplate="content">
                <p class="education-description">
                  Certified Angular Developer with expertise in Angular framework, 
                  TypeScript, and modern frontend development practices.
                </p>
                <p class="education-year">2023</p>
              </ng-template>
            </p-card>

            <p-card class="education-card">
              <ng-template pTemplate="header">
                <div class="education-header">
                  <i class="pi pi-code education-icon"></i>
                  <h3>JavaScript Mastery</h3>
                </div>
              </ng-template>
              <ng-template pTemplate="content">
                <p class="education-description">
                  Advanced JavaScript and ES6+ features, modern development patterns, 
                  and best practices for scalable applications.
                </p>
                <p class="education-year">2022</p>
              </ng-template>
            </p-card>
          </div>
        </section>

        <!-- Skills & Technologies -->
        <section class="skills-section">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills-categories">
            <div class="skill-category">
              <h3 class="category-title">Frontend Technologies</h3>
              <div class="skills-list">
                <p-chip 
                  *ngFor="let skill of frontendSkills" 
                  [label]="skill.name" 
                  [style]="{'background-color': skill.color, 'color': 'white'}">
                </p-chip>
              </div>
            </div>

            <div class="skill-category">
              <h3 class="category-title">Backend & Tools</h3>
              <div class="skills-list">
                <p-chip 
                  *ngFor="let skill of backendSkills" 
                  [label]="skill.name" 
                  [style]="{'background-color': skill.color, 'color': 'white'}">
                </p-chip>
              </div>
            </div>

            <div class="skill-category">
              <h3 class="category-title">Libraries & Frameworks</h3>
              <div class="skills-list">
                <p-chip 
                  *ngFor="let skill of frameworkSkills" 
                  [label]="skill.name" 
                  [style]="{'background-color': skill.color, 'color': 'white'}">
                </p-chip>
              </div>
            </div>
          </div>
        </section>

        <!-- Current Role -->
        <section class="current-role">
          <h2 class="section-title">Current Role</h2>
          <p-card class="role-card">
            <ng-template pTemplate="header">
              <div class="role-header">
                <div class="company-info">
                  <h3>Incred Financial Services</h3>
                  <p class="role-title">Frontend Software Engineer</p>
                  <p class="role-duration">2023 - Present</p>
                </div>
                <div class="company-logo">
                  <i class="pi pi-building" style="font-size: 2rem; color: var(--primary-color);"></i>
                </div>
              </div>
            </ng-template>
            <ng-template pTemplate="content">
              <div class="role-description">
                <p>
                  Leading frontend development for critical financial applications including 
                  connector onboarding portal and wealth transaction systems. Integrated advanced 
                  features like DigiLocker, Digio, eSign, and UAM portal authentication.
                </p>
                <div class="role-achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    <li>Developed private NPM package for SSO authentication</li>
                    <li>Integrated multiple third-party services (DigiLocker, Digio, eSign)</li>
                    <li>Implemented OTP-based login and authorization systems</li>
                    <li>Optimized application performance and user experience</li>
                  </ul>
                </div>
              </div>
            </ng-template>
          </p-card>
        </section>

        <!-- Personal Interests -->
        <section class="interests-section">
          <h2 class="section-title">Beyond Code</h2>
          <div class="interests-grid">
            <div class="interest-item" *ngFor="let interest of interests">
              <div class="interest-icon">
                <i [class]="interest.icon"></i>
              </div>
              <h4 class="interest-title">{{ interest.title }}</h4>
              <p class="interest-description">{{ interest.description }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 2rem 0;
    }
    
    .about-hero {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    
    .about-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
    }
    
    .about-description {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 1.5rem;
    }

    .about-actions {
      margin-top: 2rem;
    }

    .download-btn {
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

    .download-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .download-btn:hover::before {
      left: 100%;
    }

    .download-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
    }

    .download-btn i {
      font-size: 1.125rem;
    }
    
    .profile-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      border: 4px solid var(--primary-color);
      position: relative;
    }
    
    .about-profile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.3s ease;
    }
    
    .profile-image:hover .about-profile-img {
      transform: scale(1.05);
    }
    
    .education-section {
      padding: 4rem 0;
      background: var(--bg-light);
    }
    
    .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .education-card {
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }
    
    .education-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--primary-color);
      color: white;
    }
    
    .education-icon {
      font-size: 1.5rem;
    }
    
    .education-header h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .education-description {
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    .education-year {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .skills-section {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .skills-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .skill-category {
      background: var(--bg-white);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-color);
    }
    
    .category-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--text-dark);
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .current-role {
      padding: 4rem 0;
      background: var(--bg-light);
    }
    
    .role-card {
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
    }
    
    .role-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      background: var(--primary-color);
      color: white;
    }
    
    .company-info h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .role-title {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }
    
    .role-duration {
      font-size: 0.875rem;
      opacity: 0.8;
    }
    
    .role-description {
      padding: 2rem;
    }
    
    .role-description p {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 1.5rem;
    }
    
    .role-achievements h4 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }
    
    .role-achievements ul {
      list-style: none;
      padding: 0;
    }
    
    .role-achievements li {
      padding: 0.5rem 0;
      color: var(--text-light);
      position: relative;
      padding-left: 1.5rem;
    }
    
    .role-achievements li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
    
    .interests-section {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .interest-item {
      text-align: center;
      padding: 2rem;
      background: var(--bg-light);
      border-radius: 12px;
      transition: transform 0.3s ease;
    }
    
    .interest-item:hover {
      transform: translateY(-4px);
    }
    
    .interest-icon {
      width: 60px;
      height: 60px;
      background: var(--accent-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .interest-icon i {
      font-size: 1.5rem;
      color: white;
    }
    
    .interest-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .interest-description {
      color: var(--text-light);
      font-size: 0.875rem;
    }
    
    @media (max-width: 1024px) {
      .about-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }
      
      .about-image {
        order: -1;
      }
      
      .profile-image {
        width: 180px;
        height: 180px;
      }
    }
    
    @media (max-width: 768px) {
      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .about-title {
        font-size: 2.25rem;
      }
      
      .about-description {
        font-size: 1rem;
      }
      
      .profile-image {
        width: 160px;
        height: 160px;
      }
      
      .about-profile-img {
        width: 100%;
        height: 100%;
      }
      
      .role-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
    
    @media (max-width: 480px) {
      .about-title {
        font-size: 1.875rem;
      }
      
      .about-description {
        font-size: 0.9rem;
      }
      
      .profile-image {
        width: 140px;
        height: 140px;
      }
      
      .about-profile-img {
        width: 100%;
        height: 100%;
      }
    }
  `]
})
export class AboutComponent {
  frontendSkills = [
    { name: 'Angular', color: '#dd0031' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'HTML5', color: '#e34f26' },
    { name: 'CSS3', color: '#1572b6' },
    { name: 'SCSS', color: '#cf649a' },
    { name: 'PrimeNG', color: '#007ad9' },
    { name: 'React', color: '#61dafb' }
  ];

  backendSkills = [
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#3776ab' },
    { name: 'Java', color: '#007396' },
    { name: 'REST APIs', color: '#ff6b6b' },
    { name: 'Git', color: '#f05032' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'NPM', color: '#cb3837' }
  ];

  frameworkSkills = [
    { name: 'Angular Material', color: '#ff4081' },
    { name: 'Bootstrap', color: '#7952b3' },
    { name: 'RxJS', color: '#b7178c' },
    { name: 'Webpack', color: '#8dd6f9' },
    { name: 'Jest', color: '#c21325' },
    { name: 'Karma', color: '#0c9d58' }
  ];

  interests = [
    {
      title: 'Open Source',
      description: 'Contributing to open source projects and sharing knowledge',
      icon: 'pi pi-github'
    },
    {
      title: 'Tech Blogging',
      description: 'Writing about web development and sharing experiences',
      icon: 'pi pi-book'
    },
    {
      title: 'Mentoring',
      description: 'Helping junior developers grow their skills',
      icon: 'pi pi-users'
    },
    {
      title: 'Learning',
      description: 'Always exploring new technologies and frameworks',
      icon: 'pi pi-lightbulb'
    }
  ];

  downloadResume() {
    // Try multiple approaches for downloading resume
    const fileId = '1qK2AMZEpe5Jw-v-Yh-lj9DTm4ytTJceI';
    
    // First try: Direct download link
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Ankaj_Kumar_Resume.pdf';
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Try to trigger download
    link.click();
    
    // If download doesn't work, open in new tab after a short delay
    setTimeout(() => {
      const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
      window.open(viewUrl, '_blank');
    }, 1000);
    
    // Clean up
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 2000);
  }
}
