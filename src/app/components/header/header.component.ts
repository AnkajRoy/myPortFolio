import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <span class="logo-text">Ankaj Kumar</span>
              <span class="logo-subtitle">Frontend Developer</span>
            </a>
          </div>
          
          <nav class="nav-desktop">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">Home</a>
            <a routerLink="/about" routerLinkActive="active" class="nav-link">About</a>
            <a routerLink="/experience" routerLinkActive="active" class="nav-link">Experience</a>
            <a routerLink="/projects" routerLinkActive="active" class="nav-link">Projects</a>
            <a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a>
          </nav>
          
          <div class="header-actions">
            <p-button 
              label="Download CV" 
              icon="pi pi-download" 
              [outlined]="true"
              size="small"
              class="download-btn">
            </p-button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--bg-white);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }
    
    .logo-link {
      text-decoration: none;
      color: var(--text-dark);
      display: flex;
      flex-direction: column;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .logo-subtitle {
      font-size: 0.875rem;
      color: var(--text-light);
      font-weight: 400;
    }
    
    .nav-desktop {
      display: flex;
      gap: 2rem;
    }
    
    .nav-link {
      text-decoration: none;
      color: var(--text-dark);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .nav-link:hover {
      background: var(--bg-light);
      color: var(--primary-color);
    }
    
    .nav-link.active {
      color: var(--primary-color);
      background: var(--bg-light);
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .download-btn {
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .nav-desktop {
        display: none;
      }
      
      .header-content {
        padding: 0.75rem 0;
      }
    }
  `]
})
export class HeaderComponent {
}
