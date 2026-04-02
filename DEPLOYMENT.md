# 🚀 Deployment Guide

This guide will help you deploy the AI Filmmaker Suite to various platforms.

## 📋 Prerequisites

- Node.js 18+ 
- Bun package manager
- Git
- Domain name (for production)
- SSL certificate (recommended)

## 🗄️ Database Setup

### SQLite (Development)
```bash
# Database is automatically created
bun run db:push
bun run db:generate
```

### PostgreSQL (Production)
1. Create a PostgreSQL database
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Update environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/aifilmmaker"
   ```
4. Run migrations:
   ```bash
   bun run db:migrate
   ```

## 🔧 Environment Configuration

Create `.env.local`:
```env
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"

# AI Services
Z_AI_API_KEY="your-pollinations-api-key"

# Application
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL="https://yourdomain.com/api"
```

## 🌐 Deployment Options

### 1. Vercel (Recommended)

#### Automatic Deployment
1. Push your code to GitHub
2. Connect your GitHub repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "DATABASE_URL": "@database-url"
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### 2. Docker Deployment

#### Build Docker Image
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

#### Deploy with Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/aifilmmaker
      - NEXTAUTH_SECRET=your-secret-here
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=aifilmmaker
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Run Docker
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### 3. Railway

#### Deploy to Railway
1. Connect your GitHub repository to [Railway](https://railway.app)
2. Configure environment variables
3. Railway will automatically detect Next.js and deploy

#### Railway Service Configuration
```toml
[build]
builder = "NIXPACKS"

[deploy]
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### 4. DigitalOcean App Platform

#### Create App
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `bun run build`
   - Run Command: `bun run start`
   - HTTP Port: 3000

#### Environment Variables
Add all required environment variables in the App Platform settings.

### 5. AWS Amplify

#### Deploy with Amplify
1. Install Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Initialize Amplify:
   ```bash
   amplify init
   ```

3. Add hosting:
   ```bash
   amplify add hosting
   ```

4. Deploy:
   ```bash
   amplify publish
   ```

## 🔒 SSL and Security

### Automatic SSL (Vercel, Railway, DigitalOcean)
These platforms provide automatic SSL certificates.

### Manual SSL (Custom Server)
```bash
# Using Certbot
sudo certbot --nginx -d yourdomain.com
```

### Security Headers
Add to `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## 📊 Monitoring and Logging

### Vercel Analytics
```bash
# Install
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

### Custom Logging
Create `src/lib/logger.ts`:
```typescript
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data)
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Bun
      uses: oven-sh/setup-bun@v1
      with:
        bun-version: latest
    
    - name: Install dependencies
      run: bun install
    
    - name: Run tests
      run: bun test
    
    - name: Build
      run: bun run build
      env:
        NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🎯 Production Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Performance optimization completed

### Post-Deployment
- [ ] Test all user flows
- [ ] Verify authentication works
- [ ] Check AI integrations
- [ ] Monitor error logs
- [ ] Test file uploads
- [ ] Verify email notifications
- [ ] Check mobile responsiveness

## 🔧 Performance Optimization

### Next.js Optimizations
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons']
  },
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif']
  }
}
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_projects_user_id ON "Project"(userId);
CREATE INDEX idx_scenes_project_id ON "Scene"(projectId);
CREATE INDEX idx_storyboards_project_id ON "Storyboard"(projectId);
```

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules bun.lockb
bun install

# Regenerate Prisma client
bun run db:generate
```

#### Database Connection Issues
```bash
# Check database URL
echo $DATABASE_URL

# Test database connection
bun run db:push
```

#### Authentication Issues
```bash
# Clear NextAuth session
rm -rf .next/cache

# Check NEXTAUTH_SECRET
echo $NEXTAUTH_SECRET
```

#### API Rate Limiting
```typescript
// Add rate limiting middleware
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

## 📈 Scaling Considerations

### Database Scaling
- Move from SQLite to PostgreSQL
- Implement read replicas
- Add connection pooling
- Consider database caching

### Application Scaling
- Use CDN for static assets
- Implement horizontal scaling
- Add load balancer
- Consider serverless functions

### AI Service Scaling
- Implement request queuing
- Add fallback AI providers
- Cache AI responses
- Monitor API usage and costs

## 🆘 Support

### Monitoring Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance
- **LogRocket**: Session replay and debugging
- **Datadog**: Infrastructure monitoring

### Getting Help
- Check the [GitHub Issues](https://github.com/jitenkr2030/AI-Filmmaker-Suite/issues)
- Join our [Discord Community](https://discord.gg/aifilmmaker)
- Review the [Documentation](https://github.com/jitenkr2030/AI-Filmmaker-Suite/blob/main/README.md)

---

**🎉 Your AI Filmmaker Suite is now ready for production!**