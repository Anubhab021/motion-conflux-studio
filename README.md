# 🎨 Motion Conflux Studio Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features include dark mode, search functionality, interactive animations, and a fully responsive design.

## ✨ Features

### 🎯 Core Features
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark/Light Mode** - Toggle with system preference detection
- **Interactive Search** - Client-side search with MiniSearch
- **Smooth Animations** - Framer Motion page transitions and micro-interactions
- **Lightbox Gallery** - Modal viewing for project media
- **Contact Form** - Animated form with validation
- **SEO Optimized** - Comprehensive metadata and Open Graph tags

### 🚀 Advanced Features
- **Custom Cursor** - Interactive cursor effects
- **Parallax Scrolling** - Depth and visual interest
- **Loading Screen** - Animated loading experience
- **Scroll to Top** - Smooth scroll navigation
- **Analytics Ready** - Google Analytics integration
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Search**: MiniSearch
- **Icons**: React Icons (Tabler)
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anubhab021/motion-conflux-studio.git
   cd motion-conflux-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
motion-conflux-studio/
├── public/
│   ├── assets/           # Media assets by category
│   │   ├── video/        # Video project thumbnails
│   │   ├── 3d/           # 3D project images
│   │   ├── graphics/     # Graphics project images
│   │   ├── vfx/          # VFX project images
│   │   └── web/          # Web project images
│   └── data/
│       └── projects.json # Project data
├── src/
│   ├── app/
│   │   ├── [lang]/       # Internationalized routes
│   │   │   ├── about/    # About page
│   │   │   ├── projects/ # Projects gallery
│   │   │   ├── services/ # Services page
│   │   │   └── contact/  # Contact page
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable components
│   ├── lib/             # Utilities and configs
│   └── types/           # TypeScript definitions
└── README.md
```

## 🎨 Customization

### 1. Update Site Information
Edit `src/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
  name: "your-studio-name",
  description: "Your description",
  url: "https://your-domain.com",
  links: {
    email: "your@email.com",
    phone: "+1 (234) 567-890",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};
```

### 2. Add Your Projects
Update `public/data/projects.json`:
```json
{
  "id": "project-1",
  "title": "Your Project",
  "category": "Video",
  "description": "Project description",
  "thumbnail": "/assets/video/your-image.jpg",
  "tags": ["motion", "design"]
}
```

### 3. Customize Colors
Edit `tailwind.config.ts`:
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### 4. Add Your Images
- Replace placeholder images in `public/assets/`
- Use WebP format for better performance
- Optimize images before adding

## 📱 Pages Overview

### Home (`/en`)
- Hero section with animated intro
- Call-to-action buttons
- Smooth scroll animations

### About (`/en/about`)
- Skills and tools showcase
- Professional background
- Technology stack

### Projects (`/en/projects`)
- Filterable project gallery
- Search functionality
- Lightbox modal viewing
- Category-based filtering

### Services (`/en/services`)
- Service offerings
- Technology expertise
- Process overview

### Contact (`/en/contact`)
- Interactive contact form
- Contact information
- Social media links
- Form validation and feedback

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Analysis
npm run analyze      # Bundle analysis (requires @next/bundle-analyzer)
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command `npm run build`, publish directory `.next`
- **Railway**: Automatic Next.js detection
- **Custom Server**: `npm run build && npm run start`

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized
- **Bundle Size**: Minimized with tree shaking
- **Images**: Next.js automatic optimization

## 🔍 SEO Features

- Meta tags for all pages
- Open Graph and Twitter Cards
- Structured data markup
- XML sitemap
- robots.txt
- Language attributes
- Canonical URLs

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Color contrast compliance
- Screen reader support

## 🌐 Internationalization

- English and Hindi support
- Language-specific routes
- Proper lang attributes
- Localized content structure

## 📈 Analytics

Google Analytics 4 integration:
1. Add `NEXT_PUBLIC_GA_ID` to environment variables
2. Analytics will automatically track:
   - Page views
   - Project interactions
   - Search queries
   - Form submissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or support:
- Create an issue on GitHub
- Email: hello@motion-conflux-studio.com
- LinkedIn: [Your Profile]

---

**Built with ❤️ by Motion Conflux Studio**