import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Ankaj Kumar</h3>
            <p class="footer-description">
              Frontend Developer with 3.5 years of experience in Angular, JavaScript, PrimeNG, and modern web technologies.
            </p>
            <div class="social-links">
              <a href="https://linkedin.com/in/ankajkumar" target="_blank" class="social-link">
                <i class="pi pi-linkedin"></i>
              </a>
              <a href="https://github.com/ankajkumar" target="_blank" class="social-link">
                <i class="pi pi-github"></i>
              </a>
              <a href="mailto:ankajkumar@email.com" class="social-link">
                <i class="pi pi-envelope"></i>
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">Quick Links</h4>
            <ul class="footer-links">
              <li><a routerLink="/about" class="footer-link">About</a></li>
              <li><a routerLink="/experience" class="footer-link">Experience</a></li>
              <li><a routerLink="/projects" class="footer-link">Projects</a></li>
              <li><a routerLink="/contact" class="footer-link">Contact</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-subtitle">Skills</h4>
            <div class="skills-tags">
              <span class="skill-tag">Angular</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">PrimeNG</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">TypeScript</span>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">
            © {{ currentYear }} Ankaj Kumar. All rights reserved.
          </p>
          <p class="built-with">
            Built with Angular & PrimeNG
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--text-dark);
      color: var(--bg-white);
      padding: 3rem 0 1rem;
      margin-top: 4rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 2rem;
    }
    
    .footer-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    .footer-description {
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: var(--accent-color);
      transform: translateY(-2px);
    }
    
    .footer-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--bg-white);
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
    }
    
    .footer-links li {
      margin-bottom: 0.5rem;
    }
    
    .footer-link {
      color: var(--text-light);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-link:hover {
      color: var(--primary-color);
    }
    
    .skills-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skill-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .footer-bottom {
      border-top: 1px solid #374151;
      padding-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .copyright {
      color: var(--text-light);
      margin: 0;
    }
    
    .built-with {
      color: var(--text-light);
      margin: 0;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
