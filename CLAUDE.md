# CLAUDE.md

This file provides guidance to Claude Code when working with the Classic Mini DIY project.

## Project Overview

**Classic Mini DIY** is a comprehensive web application serving as both a toolkit and permanent archive for Classic Mini enthusiasts. It provides technical information, calculators, historical documents, and interactive tools for Classic Mini owners and mechanics.

- **Framework**: Nuxt 3 (Vue.js) with TypeScript
- **Purpose**: Classic Mini car enthusiast website and knowledgebase
- **URL**: https://classicminidiy.com
- **Repository**: https://github.com/somethingnew71/classicminidiy
- **License**: GPL-3.0

## Architecture

### Frontend

- **Framework**: Nuxt 3 with TypeScript
- **Styling**: TailwindCSS + DaisyUI custom theme
- **Charts**: Highcharts for data visualization
- **PWA**: Configured with @vite-pwa/nuxt for offline functionality
- **SEO**: Comprehensive meta tags, structured data, sitemap generation

### Backend & Infrastructure

- **Hosting**: Vercel with serverless deployment
- **Database**:
  - DynamoDB for primary data storage
  - PostgreSQL for Nuxt Content
- **Storage**: AWS S3 with intelligent tiering and versioning
- **CDN**: S3 static assets with custom domain
- **Analytics**: Google Analytics, Vercel Analytics & Speed Insights

### AI Integration

- **LangGraph SDK**: AI-powered chat functionality
- **Nuxt-LLMs**: Content integration for AI responses
- **MCP Server**: Model Context Protocol server for structured data access

## Development Environment

### Package Management

- **Primary**: npm (Node.js v22.12.0+)
- **Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run start` - Preview production build
  - `npm run format` - Format code with Prettier

### Key Technologies

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **TailwindCSS** for styling with custom DaisyUI theme
- **Nuxt Content** for content management
- **AWS SDK v3** for cloud services
- **LangChain/LangGraph** for AI functionality
- **Highcharts** for interactive data visualization

## Project Structure

### Core Directories

- `app/` - Main application code
  - `components/` - Vue components organized by feature
  - `pages/` - File-based routing structure
  - `composables/` - Reusable composition functions
  - `middleware/` - Route middleware
  - `plugins/` - Nuxt plugins
- `server/` - API routes and server utilities
- `data/` - Static data files and TypeScript models
- `public/` - Static assets

### Key Features

- **Archive Section**: Historical documents, manuals, advertisements
- **Technical Toolbox**: Calculators, specifications, reference data `app/technical`
- **Registry System**: User-submitted Classic Mini registrations `app/archive/registry`
- **Wheel Database**: Comprehensive wheel fitment information `app/archive/wheels`
- **AI Chat**: LangGraph-powered technical assistance `app/chat`
- **Color Database**: Historical Classic Mini paint colors `app/archive/colors`
- **Parts Reference**: Technical specifications and torque values `app/archive/parts`
- **Archive**: Historical documents, manuals, advertisements `app/archive`

## API Structure

### Core APIs

- `/api/decoders/` - Chassis and engine number decoding
- `/api/wheels/` - Wheel fitment database
- `/api/registry/` - User registration system
- `/api/colors/` - Paint color database
- `/api/langgraph/` - AI chat integration
- `/api/mcp/` - Model Context Protocol server

### External Integrations

- **GitHub API**: Repository statistics and releases
- **YouTube API**: Channel video integration
- **AWS Services**: S3 storage, DynamoDB queries

## Development Guidelines

### Code Standards

- **TypeScript**: Strict type checking enabled
- **Vue 3**: Composition API preferred over Options API
- **Prettier**: Code formatting with 2-space indentation
- **ESLint**: Linting rules for code quality

### Component Patterns

- **Single File Components**: .vue files with `<script setup>` syntax
- **Composables**: Reusable logic in `/composables/` directory
- **Type Safety**: All components properly typed with TypeScript interfaces
- **CSS**: TailwindCSS classes preferred, custom DaisyUI theme

### Performance Optimizations

- **SSR/ISR**: Strategic prerendering for static content
- **Image Optimization**: Multiple formats (WebP, AVIF) with responsive sizes
- **Code Splitting**: Manual chunks for better caching
- **Service Worker**: PWA caching strategies for offline functionality

## Environment Variables

### Required Runtime Config

```env
# AWS Credentials
dynamo_id=
dynamo_key=
s3_id=
s3_key=

# External APIs
githubAPIKey=
youtubeAPIKey=
validation_key=

# AI Services
NUXT_LANGGRAPH_API_URL=
NUXT_LANGSMITH_API_KEY=

# Database
POSTGRES_URL=

# Public URLs
NUXT_PUBLIC_SITE_URL=
s3Base=
```

## Content Management

### Static Data

- JSON files in `/data/` directory for reference information
- TypeScript models for data structure validation
- Automated data processing for consistency

### Dynamic Content

- **Nuxt Content**: Markdown-based content with frontmatter
- **DynamoDB**: User-generated content (registry, wheels)
- **S3**: File storage for images and documents

## Deployment

### Vercel Configuration

- **Build Command**: `nuxi build`
- **Output Directory**: `.nuxt/dist`
- **Node Version**: 22.x
- **Environment**: Production optimizations enabled

### Performance Features

- **Prerendering**: Static pages cached at build time
- **Edge Functions**: API routes optimized for global distribution
- **Asset Optimization**: Compression, minification, tree shaking
- **Monitoring**: Vercel Analytics and Speed Insights integration

## Testing & Quality

### Code Quality

- **TypeScript**: Compile-time type checking
- **Prettier**: Consistent code formatting
- **Build Validation**: Production build testing required

### Performance

- **Lighthouse**: Regular performance auditing
- **Core Web Vitals**: Monitoring via Vercel Speed Insights
- **PWA**: Progressive web app functionality testing

## Common Tasks

### Adding New Features

1. Create TypeScript interfaces in `/data/models/`
2. Add API routes in `/server/api/`
3. Create Vue components with proper typing
4. Update navigation and routing as needed
5. Test build process: `npm run build`

### Content Updates

- Static data: Update JSON files in `/data/`
- Dynamic content: Use admin interfaces or direct API calls
- Images: Upload to S3 bucket with appropriate paths

### Performance Optimization

- Run `npm run build` to test production build
- Check bundle analysis for large dependencies
- Verify image optimization is working correctly
- Test PWA functionality and caching strategies

## Support Resources

- **Documentation**: Comprehensive README.md with setup instructions
- **Community**: GitHub Issues for bug reports and feature requests
- **Support**: Patreon for server costs and development
- **Related Projects**: YouTube channel and merchandise store
