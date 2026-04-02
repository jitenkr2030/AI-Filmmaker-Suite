# 🎬 AI Filmmaker Suite

> **Transform your scripts into complete visual productions with AI-powered filmmaking**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24-black?style=flat-square&logo=next.js)](https://next-auth.js/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

AI Filmmaker Suite is a comprehensive SaaS platform that empowers filmmakers, indie creators, and content creators to go from **script → storyboard → character design → poster → teaser** entirely using artificial intelligence.

## ✨ **🎉 FULLY IMPLEMENTED & PRODUCTION-READY** ✨

### 🚀 **What's Included**

✅ **Complete Authentication System**
- NextAuth.js integration with secure login/signup
- User profiles with subscription management
- Credit-based usage tracking
- Multi-tier subscription plans (Free, Starter, Pro, Enterprise)

✅ **All Core Features**
- **Script Input & Analysis**: Multi-format support with AI-powered scene extraction
- **Storyboard Generator**: Multiple artistic styles with customizable frames
- **Character Designer**: Complete character creation with expressions and angles
- **Poster Generator**: Professional movie posters with various styles
- **Teaser Generator**: Video creation with music and voiceover options
- **Project Dashboard**: Comprehensive project management with progress tracking

✅ **Production Infrastructure**
- Complete database schema with Prisma ORM
- Secure API routes for all features
- Responsive design with mobile-first approach
- Professional UI/UX with dark cinematic theme
- Error handling and loading states
- File upload capabilities

✅ **Business Features**
- Freemium subscription model
- Credit-based AI usage system
- User registration and authentication
- Plan upgrade prompts
- Professional landing page with pricing

## 🎯 **Live Demo**

**GitHub Repository**: https://github.com/jitenkr2030/AI-Filmmaker-Suite

**Try it yourself**:
1. Clone the repository
2. Run `bun install && bun run db:push && bun run dev`
3. Visit `http://localhost:3000`
4. Sign up with any email/password (demo mode)

## 🚀 **Quick Start**

```bash
# Clone the repository
git clone https://github.com/jitenkr2030/AI-Filmmaker-Suite.git
cd AI-Filmmaker-Suite

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local

# Initialize database
bun run db:push
bun run db:generate

# Start development server
bun run dev

# Visit http://localhost:3000
```

## 💰 **Subscription Plans**

| Plan | Price | Features | AI Credits |
|------|-------|----------|------------|
| **Free** | $0/month | 1 project, basic features | 10/month |
| **Starter** | $10/month | 5 projects, HD assets | 100/month |
| **Pro** | $30/month | 20 projects, video generation | 500/month |
| **Enterprise** | Custom | Unlimited projects, API access | Unlimited |

## 🏗️ **Technology Stack**

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Authentication**: NextAuth.js with credentials provider
- **Database**: SQLite + Prisma ORM (easily switchable to PostgreSQL)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **AI Integration**: z-ai-web-dev-sdk (Pollinations AI)
- **State Management**: React Hooks + Context API

## 📁 **Project Structure**

```
AI-Filmmaker-Suite/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 api/               # API routes
│   │   │   ├── 📁 auth/          # Authentication endpoints
│   │   │   ├── 📁 script/        # Script analysis
│   │   │   ├── 📁 character/     # Character design
│   │   │   ├── 📁 poster/        # Poster generation
│   │   │   └── 📁 teaser/        # Video generation
│   │   ├── 📁 auth/              # Auth pages
│   │   └── 📄 page.tsx           # Main application
│   ├── 📁 components/
│   │   ├── 📁 ui/               # shadcn/ui components
│   │   ├── 📄 ScriptInput.tsx   # Script upload & analysis
│   │   ├── 📄 StoryboardGenerator.tsx
│   │   ├── 📄 CharacterDesigner.tsx
│   │   ├── 📄 PosterGenerator.tsx
│   │   ├── 📄 TeaserGenerator.tsx
│   │   ├── 📄 ProjectDashboard.tsx
│   │   └── 📄 UserDashboard.tsx
│   └── 📁 lib/
│       ├── 📄 db.ts             # Database client
│       └── 📄 auth.ts           # Authentication config
├── 📁 prisma/
│   └── 📄 schema.prisma          # Complete database schema
├── 📄 README.md                  # This file
├── 📄 DEPLOYMENT.md             # Deployment guide
├── 📄 CONTRIBUTING.md            # Contributing guidelines
└── 📄 LICENSE                   # MIT License
```

## 🔐 **Security Features**

- **Secure Authentication**: NextAuth.js with session management
- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Prevention**: Parameterized queries with Prisma
- **XSS Protection**: Content Security Policy and input escaping
- **Rate Limiting**: API rate limiting to prevent abuse
- **Environment Variables**: Secure secret management

## 🚀 **Deployment Options**

✅ **Vercel** (Recommended) - One-click deployment
✅ **Docker** - Containerized deployment
✅ **Railway** - Simple PaaS deployment
✅ **DigitalOcean** - App Platform deployment
✅ **AWS Amplify** - Full-stack deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🎨 **Key Features Implemented**

### 📝 **Script Analysis**
- Upload scripts in multiple formats (.txt, .pdf, .fountain)
- AI-powered extraction of scenes, characters, and settings
- Interactive script editor with real-time analysis
- Scene breakdown with dialogue and setting identification

### 🎨 **Storyboard Generation**
- Convert script scenes into visual storyboard frames
- Multiple artistic styles: cinematic, realistic, anime, comic, noir, watercolor
- Customizable frames per scene (1-8 frames)
- Progress tracking and batch generation
- Download options for production use

### 👥 **Character Designer**
- Create and manage multiple characters per project
- AI-generated character portraits and concept art
- Multiple expressions: neutral, happy, sad, angry, surprised, determined, mysterious
- Various angles: front, profile, three-quarter, back, action pose
- Style options: realistic, cinematic, anime, comic, concept art, watercolor
- Character gallery with download and regeneration options

### 🖼️ **Poster Generator**
- Create professional movie posters with AI
- Multiple styles: cinematic, minimalist, vintage, modern, artistic, noir
- Customizable aspect ratios: portrait, landscape, square
- Color schemes: dramatic, vibrant, monochrome, warm, cool, pastel
- Title and tagline customization
- High-resolution downloads for print and digital use

### 🎥 **Teaser Generator**
- Generate AI-powered video teasers and trailers
- Multiple styles: cinematic, fast-paced, moody, action, dramatic, mysterious
- Customizable duration (15-120 seconds)
- Scene selection and sequencing
- Audio options: background music and voiceover
- Video playback with download options
- Multiple music styles and voice options

### 📊 **User Management**
- Secure registration and login system
- User profiles with avatar and account settings
- Subscription plan management with upgrade prompts
- Credit usage tracking and visualization
- Project organization and management

### 💳 **Monetization Ready**
- Complete freemium subscription model
- Credit-based AI usage system
- Plan comparison and upgrade flow
- Usage analytics and tracking
- Ready for payment processor integration

## 🧪 **Testing & Quality**

- **TypeScript**: Full type safety across the application
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Professional loading indicators and skeleton screens
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML
- **Performance**: Optimized for fast loading and smooth interactions

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **[Pollinations.ai](https://pollinations.ai)** - AI generation platform
- **[Next.js](https://nextjs.org)** - React framework
- **[NextAuth.js](https://next-auth.js)** - Authentication solution
- **[Prisma](https://www.prisma.io)** - Database toolkit
- **[shadcn/ui](https://ui.shadcn.com)** - Component library
- **[Tailwind CSS](https://tailwindcss.com)** - CSS framework

## 📞 **Support & Community**

- **📚 Documentation**: [Full documentation](./DEPLOYMENT.md)
- **🐛 Issues**: [GitHub Issues](https://github.com/jitenkr2030/AI-Filmmaker-Suite/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/jitenkr2030/AI-Filmmaker-Suite/discussions)
- **📧 Email**: support@aifilmmaker.ai

---

## 🎉 **Ready to Transform Your Creative Vision?**

**🚀 Get Started in 5 Minutes:**

```bash
git clone https://github.com/jitenkr2030/AI-Filmmaker-Suite.git
cd AI-Filmmaker-Suite
bun install && bun run db:push && bun run dev
```

**🌟 What You Can Do Today:**
1. ✅ Sign up for a free account
2. ✅ Upload your first script
3. ✅ Generate AI-powered storyboards
4. ✅ Design unique characters
5. ✅ Create professional posters
6. ✅ Produce video teasers

**🎬 From Script to Complete Visual Production - All with AI!**

---

<div align="center">

[![Star](https://img.shields.io/github/stars/jitenkr2030/AI-Filmmaker-Suite.svg?style=social&label=Star)](https://github.com/jitenkr2030/AI-Filmmaker-Suite)
[![Fork](https://img.shields.io/github/forks/jitenkr2030/AI-Filmmaker-Suite.svg?style=social&label=Fork)](https://github.com/jitenkr2030/AI-Filmmaker-Suite/fork)
[![Watch](https://img.shields.io/github/watchers/jitenkr2030/AI-Filmmaker-Suite.svg?style=social&label=Watch)](https://github.com/jitenkr2030/AI-Filmmaker-Suite)

**🎬 Transform Your Creative Vision into Reality with AI-Powered Filmmaking!**

Made with ❤️ by the AI Filmmaker Suite team

</div>