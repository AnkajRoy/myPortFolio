export const PROFILE = {
  name: 'Ankaj Kumar',
  role: 'Frontend Engineer',
  tagline: 'Fintech Frontend Engineer | Angular · TypeScript · NestJS',
  location: 'India',
  phone: '+91-9064748813',
  phoneTel: '+919064748813',
  email: 'ankajkuray@gmail.com',
  workEmail: 'ankaj.kumar@incred.com',
  linkedin: 'https://www.linkedin.com/in/ankaj-ray/',
  github: 'https://github.com/AnkajRoy',
  leetcode: 'https://leetcode.com/u/ankajkuray/',
  resumeUrl: 'https://drive.google.com/file/d/1qK2AMZEpe5Jw-v-Yh-lj9DTm4ytTJceI/view?usp=sharing',
  yearsExperience: 4,
  startedAt: 'Aug 2022',
  rotatingRoles: [
    'Frontend Engineer',
    'Angular 18 Specialist',
    'NestJS BFF Developer',
    'Authentication Architect',
    'TypeScript Engineer'
  ],
  summary:
    `Frontend Engineer with 4 years of experience designing and delivering high-quality, ` +
    `production-grade web applications in the fintech domain. Proficient in JavaScript, ` +
    `TypeScript, Angular 18, and React with hands-on expertise in Node.js, NestJS, and ` +
    `BFF (Backend-for-Frontend) patterns.`
};

export const STATS = [
  { label: 'Years of Experience', value: 4, suffix: '+' },
  { label: 'Production Projects', value: 4, suffix: '' },
  { label: 'Cross-functional Teams', value: 4, suffix: '+' },
  { label: 'DSA Problems Solved', value: 500, suffix: '+' }
];

export const CORE_SKILLS = [
  { name: 'Angular 18', level: 'Expert',     icon: 'pi pi-prime',    blurb: 'Standalone components, lazy loading, interceptors, route guards.' },
  { name: 'TypeScript', level: 'Expert',     icon: 'pi pi-code',     blurb: 'Strict types, generics, modern ES features across the stack.' },
  { name: 'JavaScript', level: 'Expert',     icon: 'pi pi-bolt',     blurb: 'ES6+, async/await, modules, tooling with Webpack 5.' },
  { name: 'NestJS',     level: 'Proficient', blurb: 'BFF services with JWT, Swagger, DTO validation, interceptors.', icon: 'pi pi-server' },
  { name: 'PrimeNG',    level: 'Expert',     icon: 'pi pi-palette',  blurb: 'Component library customization and design-system patterns.' },
  { name: 'Keycloak / OAuth 2.0', level: 'Proficient', icon: 'pi pi-shield', blurb: 'SSO, OTP login, RBAC, API gateway, role-based guards.' }
];

export const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SCSS/Sass', 'SQL', 'Python', 'Java', 'C++']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Angular 18', 'NestJS', 'React', 'Node.js', 'RxJS', 'PrimeNG', 'Bootstrap', 'Webpack']
  },
  {
    title: 'Architecture & Patterns',
    skills: ['SPA', 'BFF', 'Standalone Components', 'Lazy Loading', 'RBAC', 'Interceptor Pattern', 'RESTful API', 'Microservices', 'Agile/Scrum']
  },
  {
    title: 'Auth & Security',
    skills: ['Keycloak', 'SSO', 'OAuth 2.0', 'OTP', 'JWT', 'RBAC', 'API Gateway', 'npm Package Development']
  },
  {
    title: 'Testing & Tooling',
    skills: ['Karma', 'Jasmine', 'Jest', 'Git', 'GitHub', 'CI/CD', 'Swagger/OpenAPI', 'MySQL', 'JIRA', 'Code Review']
  }
];

export const EXPERIENCE = [
  {
    company: 'InCred Financial Services',
    role: 'Software Engineer',
    duration: 'Aug 2022 – Present',
    current: true,
    location: 'India',
    summary:
      `Leading frontend development for critical fintech applications with deep expertise in ` +
      `Angular 18, BFF services with NestJS, and authentication infrastructure built on Keycloak.`,
    sections: [
      {
        title: 'Frontend Development & Architecture',
        items: [
          'Architected and delivered 2 production-ready Angular 18 SPAs (InCred Ops Portal, InCred File Tracker) using standalone components, lazy loading, RxJS, SCSS, and PrimeNG — serving 4+ internal teams across loan processing workflows.',
          'Engineered robust Angular project structures with feature-based modules, centralized HTTP interceptors (auth, error, loader), environment-specific build pipelines (dev, QA, UAT, prod), and functional route guards for secure, zero-downtime deployments.',
          'Collaborated with 4+ cross-functional product teams in an Agile/Scrum environment, translating complex fintech business requirements into clean, maintainable, and unit-tested frontend systems.',
          'Established reusable component libraries, coding standards, and architectural best practices — adopted by multiple engineering teams organization-wide.'
        ]
      },
      {
        title: 'Authentication, Authorization & Access Control',
        items: [
          'Designed and published a private npm library (auth-login) — a framework-agnostic JS package (Webpack 5, UMD) providing complete OTP login, SSO, OAuth 2.0, and Keycloak integration via API Gateway — fully replacing Auth0 and eliminating substantial annual licensing costs.',
          'Owned the User Access Management system end-to-end: defined the RBAC model, built the Angular 18 frontend, integrated Keycloak roles and permissions, and delivered enterprise-grade access control with audit logs, activity tracking, and multi-environment support.',
          'Implemented role-based route guards, permission-driven UI rendering, and admin dashboards for user, role, and group management across all company portals.'
        ]
      },
      {
        title: 'Backend-for-Frontend (BFF) & Full-Stack Development',
        items: [
          'Designed and maintained RESTful BFF services in NestJS 11 (Node.js, TypeScript) orchestrating microservices with modular design, JWT authentication middleware, Swagger/OpenAPI documentation, DTO validation, and custom interceptors.',
          'Contributed to backend Node.js API design, database queries, and third-party service integration — demonstrating full-stack engineering capabilities beyond core frontend responsibilities.'
        ]
      }
    ]
  }
];

export const PROJECTS = [
  {
    title: 'InCred Ops Portal + File Tracker',
    category: 'angular',
    status: 'Production',
    role: 'Owner & Architect, End-to-End',
    description:
      'Two production-grade Angular 18 SPAs orchestrating loan processing workflows across 4+ internal teams, backed by a NestJS BFF.',
    fullDescription:
      `Architected and delivered the InCred Ops Portal and File Tracker — Angular 18 single-page applications ` +
      `using standalone components, lazy loading, RxJS state, SCSS theming, and PrimeNG. Engineered feature-based ` +
      `module organization, centralized HTTP interceptors (auth/error/loader), functional route guards, and ` +
      `environment-specific build pipelines for dev/QA/UAT/prod.`,
    icon: 'pi pi-briefcase',
    features: [
      'Angular 18 standalone components with lazy-loaded feature modules',
      'Centralized HTTP interceptors: auth, global error, and loader',
      'Functional route guards with role-based access control',
      'Environment-specific build pipelines (dev / QA / UAT / prod)',
      'Reusable component library adopted org-wide',
      'BFF integration via NestJS for orchestrating microservices'
    ],
    technologies: ['Angular 18', 'TypeScript', 'SCSS', 'PrimeNG', 'RxJS', 'BFF', 'NestJS'],
    githubUrl: 'https://github.com/Incred-Engineers/incred-dms-fe',
    liveUrl: null
  },
  {
    title: 'auth-login — Private npm Authentication Package',
    category: 'library',
    status: 'Production',
    role: 'Owner & Architect',
    description:
      'Framework-agnostic JS library (Webpack 5, UMD) providing OTP, SSO, OAuth 2.0, and Keycloak integration — replaced Auth0 org-wide.',
    fullDescription:
      `Designed and published a private npm package that delivers complete authentication: OTP login, SSO, ` +
      `OAuth 2.0, and Keycloak integration via API Gateway. The UMD build runs on any frontend stack. Adopted ` +
      `as the standard auth solution across all InCred portals, fully replacing Auth0 and eliminating ` +
      `substantial annual licensing costs.`,
    icon: 'pi pi-shield',
    features: [
      'OTP login flow with API Gateway',
      'SSO + OAuth 2.0 + Keycloak integration',
      'Framework-agnostic UMD bundle (works with Angular / React / vanilla JS)',
      'Webpack 5 build optimized for tree-shaking',
      'Replaced Auth0 → eliminated annual licensing costs',
      'Versioned, published to private npm registry'
    ],
    technologies: ['JavaScript', 'Webpack 5', 'UMD', 'Keycloak', 'SSO', 'OTP', 'OAuth 2.0', 'npm'],
    githubUrl: 'https://github.com/Incred-Engineers/auth-login',
    liveUrl: null
  },
  {
    title: 'User Access Management (UAM)',
    category: 'angular',
    status: 'Production',
    role: 'Owner, End-to-End',
    description:
      'Enterprise RBAC system for users, roles, groups, and permissions — Angular 18 frontend with Keycloak roles and full audit logging.',
    fullDescription:
      `Owned the User Access Management system from design to deployment: defined the RBAC data model, built ` +
      `the Angular 18 frontend, integrated Keycloak roles and permissions, and delivered audit logs, activity ` +
      `tracking, and multi-environment support. Powers role-based route guards and permission-driven UI rendering ` +
      `across all company portals.`,
    icon: 'pi pi-users',
    features: [
      'RBAC model: users, roles, groups, permissions',
      'Keycloak roles + permissions integration',
      'Audit logs and activity tracking',
      'Permission-driven UI rendering across portals',
      'Admin dashboards for user/role/group management',
      'Multi-environment support (dev / QA / UAT / prod)'
    ],
    technologies: ['Angular 18', 'TypeScript', 'RBAC', 'Keycloak', 'Audit Logs', 'PrimeNG'],
    githubUrl: 'https://github.com/Incred-Engineers/user-access-management',
    liveUrl: null
  },
  {
    title: 'BFF Ops Services',
    category: 'backend',
    status: 'Production',
    role: 'Owner & Developer',
    description:
      'RESTful BFF in NestJS 11 orchestrating microservices with JWT auth, Swagger docs, DTO validation, and custom interceptors.',
    fullDescription:
      `Designed and maintained RESTful BFF services in NestJS 11 (Node.js, TypeScript) orchestrating various ` +
      `microservices with a modular design, JWT authentication middleware, Swagger/OpenAPI documentation, DTO ` +
      `validation, and custom interceptors.`,
    icon: 'pi pi-server',
    features: [
      'Modular NestJS 11 architecture',
      'JWT authentication middleware',
      'Swagger / OpenAPI auto-generated documentation',
      'DTO-level validation with class-validator',
      'Custom interceptors for logging and error transformation',
      'Microservice orchestration via REST APIs'
    ],
    technologies: ['NestJS 11', 'Node.js', 'TypeScript', 'REST API', 'Swagger', 'JWT'],
    githubUrl: 'https://github.com/Incred-Engineers/bff-ops',
    liveUrl: null
  }
];

export const PROJECT_CATEGORIES = [
  { name: 'All',      value: 'all' },
  { name: 'Angular',  value: 'angular' },
  { name: 'Library',  value: 'library' },
  { name: 'Backend',  value: 'backend' }
];

export const EDUCATION = {
  degree: 'Bachelor of Engineering (B.E.)',
  institute: 'University Institute of Technology, Burdwan',
  year: '2022',
  cgpa: '7.85 / 10'
};

export const ACHIEVEMENTS = [
  {
    title: 'Replaced Auth0 org-wide',
    description:
      'Built an in-house npm authentication package adopted as the standard across all InCred portals — eliminating substantial annual licensing costs.',
    icon: 'pi pi-trophy'
  },
  {
    title: '500+ DSA problems solved',
    description:
      'Solved 500+ data structures and algorithms problems on LeetCode, GeeksforGeeks, and CodeChef.',
    icon: 'pi pi-bolt'
  },
  {
    title: 'Global Rank 440 — Newton Coding Contest',
    description:
      'Ranked 440 globally in the Newton Coding Contest (April 2022) among thousands of competitive programmers.',
    icon: 'pi pi-star-fill'
  },
  {
    title: 'Community contributor',
    description:
      'Active contributor through hackathons, coding contests, and internal technical knowledge-sharing sessions.',
    icon: 'pi pi-users'
  }
];
