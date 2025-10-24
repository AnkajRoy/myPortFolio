import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChipModule, TagModule, DialogModule, GalleriaModule],
  template: `
    <div class="projects-container">
      <div class="container">
        <!-- Projects Header -->
        <section class="projects-header">
          <h1 class="page-title">Featured Projects</h1>
          <p class="page-subtitle">
            A showcase of my recent work and side projects, highlighting my expertise in 
            Angular, JavaScript, PrimeNG, and modern web technologies.
          </p>
        </section>

        <!-- Project Categories -->
        <section class="project-categories">
          <div class="category-filters">
            <p-button 
              *ngFor="let category of categories" 
              [label]="category.name" 
              [outlined]="selectedCategory !== category.value"
              [class]="selectedCategory === category.value ? 'p-button-primary' : ''"
              (onClick)="filterProjects(category.value)"
              class="filter-btn">
            </p-button>
          </div>
        </section>

        <!-- Projects Grid -->
        <section class="projects-grid">
          <div class="project-card" *ngFor="let project of filteredProjects">
            <p-card class="project-card-content">
              <ng-template pTemplate="header">
                <div class="project-image">
                  <i [class]="project.icon" class="project-icon"></i>
                  <div class="project-overlay">
                    <p-button 
                      icon="pi pi-eye" 
                      [rounded]="true" 
                      [outlined]="true"
                      (onClick)="showProjectDetails(project)"
                      class="view-btn">
                    </p-button>
                  </div>
                </div>
              </ng-template>
              <ng-template pTemplate="content">
                <div class="project-content">
                  <div class="project-header">
                    <h3 class="project-title">{{ project.title }}</h3>
                    <p-tag 
                      [value]="project.status" 
                      [severity]="project.status === 'Live' ? 'success' : project.status === 'In Progress' ? 'warn' : 'info'">
                    </p-tag>
                  </div>
                  
                  <p class="project-description">{{ project.description }}</p>
                  
                  <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      <li *ngFor="let feature of project.features">{{ feature }}</li>
                    </ul>
                  </div>
                  
                  <div class="project-technologies">
                    <p-chip 
                      *ngFor="let tech of project.technologies" 
                      [label]="tech" 
                      [style]="getTechStyle(tech)">
                    </p-chip>
                  </div>
                  
                  <div class="project-actions">
                    <p-button 
                      *ngIf="project.liveUrl" 
                      [label]="'Live Demo'" 
                      icon="pi pi-external-link" 
                      [outlined]="true"
                      size="small"
                      (onClick)="openUrl(project.liveUrl)"
                      class="action-btn">
                    </p-button>
                    <p-button 
                      *ngIf="project.githubUrl" 
                      [label]="'GitHub'" 
                      icon="pi pi-github" 
                      [outlined]="true"
                      size="small"
                      (onClick)="openUrl(project.githubUrl)"
                      class="action-btn">
                    </p-button>
                    <p-button 
                      [label]="'View Details'" 
                      icon="pi pi-info-circle" 
                      [outlined]="true"
                      size="small"
                      (onClick)="showProjectDetails(project)"
                      class="action-btn">
                    </p-button>
                  </div>
                </div>
              </ng-template>
            </p-card>
          </div>
        </section>

        <!-- Project Details Dialog -->
        <p-dialog 
          [(visible)]="showDetailsDialog" 
          [modal]="true" 
          [style]="{width: '90vw', maxWidth: '800px'}"
          [closable]="true"
          header="Project Details">
          <div class="project-details" *ngIf="selectedProject">
            <div class="details-header">
              <div class="project-info">
                <h2>{{ selectedProject.title }}</h2>
                <p class="project-category">{{ selectedProject.category }}</p>
                <p-tag 
                  [value]="selectedProject.status" 
                  [severity]="selectedProject.status === 'Live' ? 'success' : selectedProject.status === 'In Progress' ? 'warn' : 'info'">
                </p-tag>
              </div>
            </div>
            
            <div class="details-content">
              <div class="details-section">
                <h3>Project Overview</h3>
                <p>{{ selectedProject.fullDescription }}</p>
              </div>
              
              <div class="details-section">
                <h3>Technologies Used</h3>
                <div class="tech-list">
                  <p-chip 
                    *ngFor="let tech of selectedProject.technologies" 
                    [label]="tech" 
                    [style]="getTechStyle(tech)">
                  </p-chip>
                </div>
              </div>
              
              <div class="details-section">
                <h3>Key Features</h3>
                <ul class="features-list">
                  <li *ngFor="let feature of selectedProject.features">{{ feature }}</li>
                </ul>
              </div>
              
              <div class="details-section" *ngIf="selectedProject.challenges">
                <h3>Challenges & Solutions</h3>
                <div class="challenges">
                  <div class="challenge-item" *ngFor="let challenge of selectedProject.challenges">
                    <h4>{{ challenge.challenge }}</h4>
                    <p>{{ challenge.solution }}</p>
                  </div>
                </div>
              </div>
              
              <div class="details-section">
                <h3>Project Links</h3>
                <div class="project-links">
                  <p-button 
                    *ngIf="selectedProject.liveUrl" 
                    [label]="'Live Demo'" 
                    icon="pi pi-external-link" 
                    [outlined]="true"
                    (onClick)="openUrl(selectedProject.liveUrl)"
                    class="link-btn">
                  </p-button>
                  <p-button 
                    *ngIf="selectedProject.githubUrl" 
                    [label]="'GitHub Repository'" 
                    icon="pi pi-github" 
                    [outlined]="true"
                    (onClick)="openUrl(selectedProject.githubUrl)"
                    class="link-btn">
                  </p-button>
                </div>
              </div>
            </div>
          </div>
        </p-dialog>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 2rem 0;
    }
    
    .projects-header {
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
    
    .project-categories {
      padding: 2rem 0;
      background: var(--bg-light);
    }
    
    .category-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      border-radius: 20px;
      padding: 0.5rem 1.5rem;
    }
    
    .projects-grid {
      padding: 4rem 0;
      background: var(--bg-white);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }
    
    .project-card-content {
      border-radius: 12px;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
    }
    
    .project-card-content:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .project-image {
      position: relative;
      height: 200px;
      background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px 12px 0 0;
    }
    
    .project-icon {
      font-size: 4rem;
      color: white;
    }
    
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px 12px 0 0;
    }
    
    .project-card-content:hover .project-overlay {
      opacity: 1;
    }
    
    .view-btn {
      background: white;
      color: var(--primary-color);
    }
    
    .project-content {
      padding: 1.5rem;
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0;
    }
    
    .project-description {
      color: var(--text-light);
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    .project-features {
      margin-bottom: 1.5rem;
    }
    
    .project-features h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-dark);
    }
    
    .project-features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .project-features li {
      padding: 0.25rem 0;
      color: var(--text-light);
      position: relative;
      padding-left: 1rem;
      font-size: 0.875rem;
    }
    
    .project-features li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary-color);
    }
    
    .project-technologies {
      margin-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .project-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .action-btn {
      font-size: 0.875rem;
    }
    
    .project-details {
      padding: 1rem;
    }
    
    .details-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .details-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }
    
    .project-category {
      color: var(--text-light);
      margin-bottom: 1rem;
    }
    
    .details-section {
      margin-bottom: 2rem;
    }
    
    .details-section h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }
    
    .details-section p {
      color: var(--text-light);
      line-height: 1.6;
    }
    
    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .features-list {
      list-style: none;
      padding: 0;
    }
    
    .features-list li {
      padding: 0.5rem 0;
      color: var(--text-light);
      position: relative;
      padding-left: 1.5rem;
    }
    
    .features-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
    
    .challenges {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .challenge-item {
      background: var(--bg-light);
      padding: 1rem;
      border-radius: 8px;
    }
    
    .challenge-item h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }
    
    .challenge-item p {
      color: var(--text-light);
      margin: 0;
    }
    
    .project-links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .link-btn {
      font-size: 0.875rem;
    }
    
    @media (max-width: 1024px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      
      .project-card {
        margin-bottom: 2rem;
      }
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.25rem;
      }
      
      .page-subtitle {
        font-size: 1rem;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .category-filters {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 1rem;
        gap: 0.75rem;
      }
      
      .category-btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        white-space: nowrap;
      }
      
      .project-card {
        margin-bottom: 1.5rem;
        padding: 1.5rem;
      }
      
      .project-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .project-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
      }
      
      .project-title {
        font-size: 1.25rem;
      }
      
      .project-description {
        font-size: 0.9rem;
      }
      
      .project-tech {
        justify-content: center;
        gap: 0.5rem;
      }
      
      .project-actions {
        flex-direction: column;
        gap: 1rem;
      }
      
      .project-links {
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .view-btn, .link-btn {
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
      
      .projects-grid {
        gap: 1rem;
      }
      
      .project-card {
        padding: 1.25rem;
      }
      
      .project-icon {
        width: 45px;
        height: 45px;
        font-size: 1.125rem;
      }
      
      .project-title {
        font-size: 1.125rem;
      }
      
      .project-description {
        font-size: 0.85rem;
      }
      
      .project-tech {
        gap: 0.4rem;
      }
      
      .view-btn, .link-btn {
        padding: 0.625rem 0.875rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class ProjectsComponent {
  selectedCategory = 'all';
  showDetailsDialog = false;
  selectedProject: any = null;

  categories = [
    { name: 'All Projects', value: 'all' },
    { name: 'Angular', value: 'angular' },
    { name: 'React', value: 'react' },
    { name: 'Node.js', value: 'nodejs' },
    { name: 'Full Stack', value: 'fullstack' }
  ];

  projects = [
    {
      title: 'Connector Onboarding Portal',
      category: 'angular',
      status: 'Live',
      description: 'Comprehensive onboarding solution for financial services with integrated authentication systems.',
      fullDescription: 'A sophisticated onboarding portal that streamlines the process of connecting new users to financial services. The application integrates multiple third-party services including DigiLocker, Digio, and eSign to provide a seamless user experience.',
      icon: 'pi pi-users',
      features: [
        'SSO Authentication Integration',
        'DigiLocker Document Verification',
        'Digio Digital Signature',
        'eSign Integration',
        'OTP-based Login System',
        'Real-time Status Updates'
      ],
      technologies: ['Angular', 'PrimeNG', 'TypeScript', 'RxJS', 'REST API', 'SSO'],
      liveUrl: 'https://example.com/onboarding',
      githubUrl: null,
      challenges: [
        {
          challenge: 'Integrating multiple third-party services',
          solution: 'Created a unified service layer to handle all external API calls with proper error handling and retry mechanisms.'
        },
        {
          challenge: 'Managing complex authentication flows',
          solution: 'Implemented a state machine pattern to handle different authentication states and user journeys.'
        }
      ]
    },
    {
      title: 'Wealth Transaction Portal',
      category: 'angular',
      status: 'Live',
      description: 'Financial transaction management system with UAM portal integration and real-time processing.',
      fullDescription: 'A comprehensive wealth management platform that handles various financial transactions with integrated UAM (User Access Management) portal for secure access control and transaction monitoring.',
      icon: 'pi pi-chart-line',
      features: [
        'Real-time Transaction Processing',
        'UAM Portal Integration',
        'Transaction History & Analytics',
        'Secure Payment Gateway',
        'Multi-currency Support',
        'Audit Trail & Compliance'
      ],
      technologies: ['Angular', 'JavaScript', 'PrimeNG', 'Node.js', 'MongoDB', 'WebSocket'],
      liveUrl: 'https://example.com/wealth-portal',
      githubUrl: null,
      challenges: [
        {
          challenge: 'Real-time data synchronization',
          solution: 'Implemented WebSocket connections with fallback to polling for reliable real-time updates.'
        },
        {
          challenge: 'Complex transaction workflows',
          solution: 'Created a workflow engine using state machines to handle different transaction types and approval processes.'
        }
      ]
    },
    {
      title: 'Private NPM Package - Auth Library',
      category: 'nodejs',
      status: 'Live',
      description: 'Custom authentication and authorization package for SSO integration across multiple applications.',
      fullDescription: 'A comprehensive authentication library built as a private NPM package that provides SSO capabilities, JWT token management, and role-based access control for multiple applications within the organization.',
      icon: 'pi pi-shield',
      features: [
        'SSO Authentication',
        'JWT Token Management',
        'Role-based Access Control',
        'Multi-tenant Support',
        'Session Management',
        'Security Middleware'
      ],
      technologies: ['Node.js', 'TypeScript', 'JWT', 'Express', 'NPM', 'OAuth2'],
      liveUrl: null,
      githubUrl: 'https://github.com/ankajkumar/auth-library',
      challenges: [
        {
          challenge: 'Cross-application compatibility',
          solution: 'Designed a flexible API that works with different frontend frameworks and backend technologies.'
        },
        {
          challenge: 'Security and token management',
          solution: 'Implemented secure token storage, automatic refresh, and proper token validation mechanisms.'
        }
      ]
    },
    {
      title: 'E-commerce Dashboard',
      category: 'react',
      status: 'In Progress',
      description: 'Modern e-commerce analytics dashboard built with React and modern data visualization libraries.',
      fullDescription: 'A comprehensive analytics dashboard for e-commerce businesses featuring real-time sales data, customer analytics, inventory management, and predictive insights using machine learning algorithms.',
      icon: 'pi pi-shopping-cart',
      features: [
        'Real-time Analytics',
        'Sales Performance Tracking',
        'Customer Behavior Analysis',
        'Inventory Management',
        'Predictive Insights',
        'Custom Reports'
      ],
      technologies: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'PostgreSQL', 'Redis'],
      liveUrl: null,
      githubUrl: 'https://github.com/ankajkumar/ecommerce-dashboard',
      challenges: [
        {
          challenge: 'Large dataset performance',
          solution: 'Implemented data virtualization and pagination to handle millions of records efficiently.'
        },
        {
          challenge: 'Real-time data updates',
          solution: 'Used WebSocket connections with Redis pub/sub for real-time data synchronization.'
        }
      ]
    },
    {
      title: 'Task Management API',
      category: 'nodejs',
      status: 'Live',
      description: 'RESTful API for task management with advanced features like collaboration and time tracking.',
      fullDescription: 'A robust RESTful API built with Node.js and Express that provides comprehensive task management capabilities including team collaboration, time tracking, file attachments, and advanced filtering options.',
      icon: 'pi pi-check-square',
      features: [
        'Task CRUD Operations',
        'Team Collaboration',
        'Time Tracking',
        'File Attachments',
        'Advanced Filtering',
        'Email Notifications'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Multer', 'Nodemailer'],
      liveUrl: 'https://api.example.com/tasks',
      githubUrl: 'https://github.com/ankajkumar/task-api',
      challenges: [
        {
          challenge: 'File upload handling',
          solution: 'Implemented secure file upload with virus scanning and size limits using Multer and ClamAV.'
        },
        {
          challenge: 'Real-time notifications',
          solution: 'Used Socket.io for real-time updates and email notifications for important events.'
        }
      ]
    },
    {
      title: 'Portfolio Website',
      category: 'angular',
      status: 'Live',
      description: 'Personal portfolio website showcasing projects and skills, built with Angular and PrimeNG.',
      fullDescription: 'A modern, responsive portfolio website built with Angular 18 and PrimeNG that showcases my professional experience, projects, and skills. Features include smooth animations, responsive design, and optimized performance.',
      icon: 'pi pi-user',
      features: [
        'Responsive Design',
        'Smooth Animations',
        'Project Showcase',
        'Contact Form',
        'SEO Optimized',
        'Performance Optimized'
      ],
      technologies: ['Angular', 'PrimeNG', 'TypeScript', 'SCSS', 'RxJS', 'Angular CLI'],
      liveUrl: 'https://ankajkumar.dev',
      githubUrl: 'https://github.com/ankajkumar/portfolio',
      challenges: [
        {
          challenge: 'Performance optimization',
          solution: 'Implemented lazy loading, OnPush change detection, and optimized bundle size for fast loading.'
        },
        {
          challenge: 'SEO and accessibility',
          solution: 'Added proper meta tags, semantic HTML, and ARIA attributes for better SEO and accessibility.'
        }
      ]
    }
  ];

  get filteredProjects() {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  showProjectDetails(project: any) {
    this.selectedProject = project;
    this.showDetailsDialog = true;
  }

  openUrl(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getTechStyle(tech: string): any {
    const techColors: { [key: string]: string } = {
      'Angular': '#dd0031',
      'React': '#61dafb',
      'Node.js': '#339933',
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'PrimeNG': '#007ad9',
      'Python': '#3776ab',
      'Java': '#007396',
      'MongoDB': '#47a248',
      'PostgreSQL': '#336791',
      'Redis': '#dc382d',
      'JWT': '#000000',
      'REST API': '#6f42c1',
      'SSO': '#28a745',
      'WebSocket': '#ff6b6b',
      'Express': '#000000',
      'RxJS': '#b7178c',
      'SCSS': '#cf649a',
      'HTML': '#e34f26',
      'CSS': '#1572b6'
    };

    const color = techColors[tech] || '#64748b';
    return {
      'background-color': color,
      'color': color === '#f7df1e' || color === '#61dafb' ? 'black' : 'white'
    };
  }
}
