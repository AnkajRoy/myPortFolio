# Ankaj Kumar - Portfolio Website

A modern, responsive portfolio website built with Angular 18 and PrimeNG showcasing my professional experience, projects, and skills as a Frontend Developer.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Fast Performance**: Optimized for speed and SEO
- **Interactive**: Engaging user experience with PrimeNG components
- **Accessible**: Built with accessibility best practices

## 🛠️ Technologies Used

- **Angular 18**: Latest version with standalone components
- **PrimeNG**: UI component library for Angular
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Advanced CSS with variables and mixins
- **RxJS**: Reactive programming
- **Angular Router**: Client-side routing

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation header
│   │   ├── footer/          # Site footer
│   │   ├── home/            # Homepage with hero section
│   │   ├── about/           # About page
│   │   ├── experience/      # Professional experience
│   │   ├── projects/        # Project showcase
│   │   └── contact/         # Contact form and info
│   ├── app.component.ts     # Main app component
│   └── app.routes.ts        # Application routes
├── styles.scss              # Global styles
└── index.html              # Main HTML file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.13 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ankajkumar/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## 📱 Pages

- **Home**: Hero section with skills overview and featured projects
- **About**: Personal information, education, and technical skills
- **Experience**: Professional experience timeline and achievements
- **Projects**: Detailed project showcase with filtering
- **Contact**: Contact form and social links

## 🎨 Customization

### Colors
Update the CSS variables in `src/styles.scss`:
```scss
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  // ... other variables
}
```

### Content
Update the component data in each component file to match your information.

## 🚀 Deployment

### Build for Production
```bash
npm run build:prod
```

### Deploy to GitHub Pages
```bash
ng build --prod --base-href="https://yourusername.github.io/portfolio/"
npx angular-cli-ghpages --dir=dist/portfolio-website
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📞 Contact

- **Email**: ankajkumar@email.com
- **LinkedIn**: [linkedin.com/in/ankajkumar](https://linkedin.com/in/ankajkumar)
- **GitHub**: [github.com/ankajkumar](https://github.com/ankajkumar)

---

Built with ❤️ by Ankaj Kumar