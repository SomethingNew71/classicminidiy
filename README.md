<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/somethingnew71/classicminidiy">
    <img src="https://classicminidiy.s3.us-east-1.amazonaws.com/misc/CMDIY-Green.jpg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Classic Mini DIY</h3>

  <p align="center">
    The most comprehensive digital archive and technical resource for Classic Mini enthusiasts worldwide. This project provides an extensive collection of tools, documentation, and interactive features for Classic Mini owners, mechanics, and enthusiasts. All resources are free, open source, and designed to be permanently accessible.
    <br />
    <br />
    <a href="https://classicminidiy.com"><strong>Explore the website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/somethingnew71/classicminidiy/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/somethingnew71/classicminidiy/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
    ·
    <a href="https://patreon.com/classicminidiy">Support Server Costs</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-features">Key Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-setup">Environment Setup</a></li>
      </ul>
    </li>
    <li><a href="#features-overview">Features Overview</a></li>
    <li><a href="#technical-toolbox">Technical Toolbox</a></li>
    <li><a href="#archive-system">Archive System</a></li>
    <li><a href="#ai-powered-features">AI-Powered Features</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#internationalization">Internationalization</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#support">Support</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://classicminidiy.com)

**Classic Mini DIY** is a comprehensive web application serving as both a toolkit and permanent archive for Classic Mini enthusiasts. The project combines technical calculators, historical documentation, user-generated content systems, and AI-powered assistance to create the most complete digital resource for Classic Mini owners worldwide.

### Current Version: 3.5.4

The platform is designed to be both a real-time working tool for mechanics and enthusiasts, and a permanent digital archive ensuring Classic Mini knowledge is preserved for future generations. All content is backed up across multiple cloud locations and designed to remain accessible indefinitely.

### Built With

This project leverages modern web technologies for optimal performance, accessibility, and maintainability:

[![Nuxt][Nuxt.js]][Nuxt-url] [![Vue][Vue.js]][Vue-url] [![TypeScript][TypeScript]][TypeScript-url] [![TailwindCSS][TailwindCSS]][TailwindCSS-url] [![AWS][AWS]][AWS-url] [![Vercel][Vercel]][Vercel-url]

**Core Technologies:**
- **Nuxt 4.1.2** - Vue.js framework with server-side rendering
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Strict type checking and enhanced development experience
- **TailwindCSS 4.1.13** - Utility-first CSS framework with custom DaisyUI theme
- **AWS Services** - S3 storage, DynamoDB database, intelligent tiering
- **LangGraph SDK** - AI-powered conversational assistance
- **Highcharts** - Interactive data visualization and charts
- **Fuse.js** - Advanced fuzzy search functionality

**Infrastructure:**
- **Vercel** - Serverless hosting with global edge deployment
- **AWS S3** - Intelligent tiering storage with versioning
- **DynamoDB** - NoSQL database for user-generated content
- **PostgreSQL** - Content management database
- **CDN** - Global content delivery network

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

- 🔧 **8 Interactive Technical Calculators** - Compression ratio, gearbox, SU carburetors, and more
- 📚 **Comprehensive Digital Archive** - Workshop manuals, wiring diagrams, historical documents
- 🤖 **AI-Powered Assistant** - LangGraph-based conversational AI with technical expertise
- 🌍 **Multi-Language Support** - Full internationalization across 10 languages
- 📱 **Progressive Web App** - Offline functionality and mobile-optimized experience
- 🎨 **User-Generated Content** - Registry system, wheel library, color database
- 🔍 **Advanced Search** - Fuse.js powered fuzzy search across all content
- 🛒 **ECU Maps Store** - Multi-platform tuning maps with GitHub integration
- 🔐 **Admin Panel** - Content review and approval workflows
- ⚡ **High Performance** - Optimized builds, caching, and CDN delivery

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- **Node.js** v22.12.0 or higher
- **npm** (comes with Node.js)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/somethingnew71/classicminidiy.git
   cd classicminidiy
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
   Navigate to `http://localhost:3000` to see the application

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# AWS Credentials
dynamo_id=your_dynamodb_access_key
dynamo_key=your_dynamodb_secret_key
s3_id=your_s3_access_key
s3_key=your_s3_secret_key

# External APIs
githubAPIKey=your_github_api_key
youtubeAPIKey=your_youtube_api_key
validation_key=your_validation_key

# AI Services
NUXT_LANGGRAPH_API_URL=your_langgraph_api_url
NUXT_LANGSMITH_API_KEY=your_langsmith_api_key

# Database
POSTGRES_URL=your_postgresql_connection_string

# Public URLs
NUXT_PUBLIC_SITE_URL=https://classicminidiy.com
s3Base=https://classicminidiy.s3.us-east-1.amazonaws.com

# Admin Authentication (for admin panel)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
SESSION_PASSWORD=your_session_password
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Preview production build
npm run format       # Format code with Prettier
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES OVERVIEW -->
## Features Overview

### Technical Toolbox

The technical toolbox provides interactive calculators and reference tools essential for Classic Mini maintenance and modification:

#### Calculators & Tools
- **🔧 Compression Ratio Calculator** (`/technical/compression`)
  - Engine compression calculations with piston, crankshaft, head gasket configurations
  - Real-time calculations with visual feedback
  - Support for custom measurements and part specifications

- **⚙️ Gearbox Calculator** (`/technical/gearing`)
  - Gear ratio calculations and speed computations
  - Multiple gearbox configurations
  - RPM and speed analysis tools

- **📊 SU Carb Needle Configurator** (`/technical/needles`)
  - Interactive needle comparison with Highcharts visualization
  - Comprehensive needle database
  - Performance curve analysis

- **🔍 Chassis Number Decoder** (`/technical/chassis-decoder`)
  - Historical chassis number database and identification
  - Year and model identification
  - Production date estimation

- **🏷️ Engine Number Decoder** (`/technical/engine-decoder`)
  - Engine code interpretation and specifications
  - Performance data and compatibility information
  - Historical engine database

#### Reference Materials
- **📏 Common Clearances Reference** (`/technical/clearance`)
  - Comprehensive clearance specifications by system
  - Tolerance ranges and recommended values
  - Searchable database of technical specifications

- **🔗 Parts Equivalency Database** (`/technical/parts`)
  - Cross-reference part numbers between brands
  - Alternative part identification
  - Compatibility matrices

- **🔩 Torque Specifications Chart** (`/technical/torque`)
  - Complete torque specification database
  - Organized by system and component
  - Imperial and metric measurements

### Archive System

The archive system preserves and organizes historical Classic Mini documentation:

#### Historical Documentation
- **📖 Workshop Manuals** (`/archive/manuals`)
  - Complete digitized workshop manuals with full-text search
  - High-resolution scanned pages
  - Organized by year and model

- **⚡ Electrical Wiring Diagrams** (`/archive/electrical`)
  - Positive and negative ground systems by year and model
  - Color-coded wiring diagrams
  - Interactive diagram viewer

- **📰 Historical Advertisements** (`/archive/adverts`)
  - Period advertising materials and brochures
  - Marketing materials from different eras
  - Searchable archive with metadata

- **📚 Vendor Catalogues** (`/archive/catalogues`)
  - Historical parts catalogs and documentation
  - Vendor-specific information
  - Product evolution tracking

- **🏁 Tuning & Modifications** (`/archive/tuning`)
  - Performance modification guides and specifications
  - Historical tuning documentation
  - Competition and racing modifications

#### User-Generated Content
- **🏆 Registry System** (`/archive/registry`)
  - User-submitted Classic Mini registrations with admin approval
  - Photo galleries and specifications
  - Historical ownership tracking

- **🎯 Wheel Fitment Library** (`/archive/wheels`)
  - Comprehensive wheel database with user photos
  - Fitment data and compatibility information
  - Size and offset calculations

- **🎨 Color Database** (`/archive/colors`)
  - Historical paint colors with hex values and user contributions
  - Color matching and identification
  - Period-correct color schemes

- **🚗 Engine Specifications** (`/archive/engines`)
  - Complete engine database with performance specifications
  - Power and torque curves
  - Modification potential analysis

- **⚖️ Vehicle Weights Reference** (`/archive/weights`)
  - Weight specifications by model and year
  - Distribution data and balance points
  - Performance impact calculations

### AI-Powered Features

#### CMDIY Assistant (`/chat`)
- **🤖 Conversational AI** - LangGraph-powered assistant with Classic Mini expertise
- **📋 Model Context Protocol (MCP) Server** - Integration with calculators and tools
- **💬 Streaming Responses** - Real-time AI chat with persistent conversation threads
- **🧠 Context Awareness** - Understanding of Classic Mini technical specifications
- **🔧 Tool Integration** - Direct access to calculators and reference materials

### Administrative Features

#### Content Management (`/admin`)
- **✅ Registry Review System** (`/admin/registry/review`)
  - Approve/reject user submissions
  - Content moderation and quality control
  - Batch processing capabilities

- **🛞 Wheel Review System** (`/admin/wheels/review`)
  - Review user-submitted wheel data
  - Image processing and validation
  - Data quality assurance

- **🔐 Authentication System**
  - Secure admin login and session management
  - Role-based access control
  - Session persistence and security

### E-commerce Integration

#### ECU Maps Store (`/maps`)
- **🖥️ Multi-ECU Support** - Haltech, Speeduino, MegaSquirt, and more
- **🔄 GitHub Integration** - Real-time repository updates and release management
- **📊 Feature Matrix** - Ignition maps, fuel maps, VE tables, target AFR configurations
- **💾 Download Management** - Secure file delivery and version control

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API DOCUMENTATION -->
## API Documentation

The Classic Mini DIY platform exposes over 50 REST API endpoints for various functionalities:

### Technical Tools APIs
- `GET /api/decoders/chassis` - Chassis number decoding by year ranges
- `GET /api/decoders/engine` - Engine code interpretation and identification
- `POST /api/mcp/compression` - MCP integration for compression calculator
- `POST /api/mcp/gearbox` - MCP integration for gearbox calculator
- `POST /api/mcp/chassis` - MCP integration for chassis decoding

### Database APIs
- `GET /api/wheels/` - Wheel fitment database with image handling
- `GET /api/registry/` - User registration system with approval workflow
- `GET /api/colors/` - Paint color database with user contributions
- `GET /api/engines/` - Engine specifications and performance data
- `GET /api/weights/` - Vehicle weight specifications

### AI & Chat APIs
- `POST /api/langgraph/` - AI chat integration with streaming responses
- `GET/POST /api/mcp/` - Model Context Protocol server for tool integration

### Administrative APIs
- `GET /api/admin/registry/review` - Registry submission review and approval
- `GET /api/admin/wheels/review` - Wheel submission review and management
- `POST /api/admin/auth` - Authentication and session management

### Content & Media APIs
- `GET /api/github/` - Repository statistics, commits, and release data
- `GET /api/youtube/` - Channel statistics and video integration
- `GET /api/maps/` - ECU maps store with GitHub integration

### External Integrations
- **GitHub API** - Repository statistics, commits, releases, automated content updates
- **YouTube API** - Channel statistics, video feeds, content synchronization
- **AWS Services** - S3 storage operations, DynamoDB queries and transactions

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INTERNATIONALIZATION -->
## Internationalization

Classic Mini DIY supports 10 languages with comprehensive internationalization:

### Supported Languages
- **🇺🇸 English** (en) - Primary language
- **🇪🇸 Spanish** (es) - Comprehensive coverage
- **🇫🇷 French** (fr) - Full translation
- **🇩🇪 German** (de) - Most complete translations
- **🇮🇹 Italian** (it) - Complete coverage
- **🇵🇹 Portuguese** (pt) - Full translation
- **🇷🇺 Russian** (ru) - Complete coverage
- **🇯🇵 Japanese** (ja) - Full translation
- **🇨🇳 Chinese** (zh) - Complete coverage
- **🇰🇷 Korean** (ko) - Full translation

### Features
- **🌐 Browser Detection** - Automatic language detection
- **🍪 Persistent Preferences** - Cookie-based language memory
- **🔄 Dynamic Switching** - Real-time language changes
- **🚀 SEO Optimization** - Language-specific meta tags and URLs

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/somethingnew71/classicminidiy.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Follow the existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm run build
   npm run format
   ```

5. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to Your Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**

### Contribution Guidelines

- **🎯 Focus on Classic Mini Content** - Ensure contributions are relevant to Classic Mini enthusiasts
- **📝 Document Changes** - Update relevant documentation and comments
- **🧪 Test Thoroughly** - Verify functionality across different devices and browsers
- **🎨 Follow Design Patterns** - Maintain consistency with existing UI/UX patterns
- **🌍 Consider Internationalization** - Add translation keys for new text content

### Top Contributors

<a href="https://github.com/somethingnew71/classicminidiy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=somethingnew71/classicminidiy" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

### Production Deployment

The application is optimized for deployment on Vercel with the following configuration:

```bash
# Build the application
npm run build

# Preview the production build locally
npm run start
```

### Environment Requirements

- **Node.js** v22.12.0+
- **Build Command**: `nuxi build`
- **Output Directory**: `.nuxt/dist`
- **Environment Variables**: See [Environment Setup](#environment-setup)

### Performance Optimizations

- **🚀 Server-Side Rendering** - Pre-rendered pages for optimal SEO
- **📦 Code Splitting** - Optimized bundle sizes with manual chunks
- **🖼️ Image Optimization** - WebP and AVIF formats with responsive sizing
- **💾 Caching Strategies** - CDN and service worker caching
- **⚡ Edge Functions** - Global distribution for API routes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->
## Support

### Community Support

- **🐛 Bug Reports** - [GitHub Issues](https://github.com/somethingnew71/classicminidiy/issues)
- **💡 Feature Requests** - [GitHub Discussions](https://github.com/somethingnew71/classicminidiy/discussions)
- **📖 Documentation** - [GitHub Wiki](https://github.com/somethingnew71/classicminidiy/wiki)

### Financial Support

Help keep the servers running and the project growing:

<a href="https://www.patreon.com/classicminidiy" target="_blank">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="150">
</a>

Your support helps cover:
- 🖥️ Server hosting costs
- 🗄️ Database and storage fees
- 🔄 CDN and bandwidth costs
- 🛠️ Development tools and services

### Related Projects

- **📺 [Classic Mini DIY YouTube](https://youtube.com/c/classicminidiy)** - Video tutorials and builds
- **🛒 [Classic Mini DIY Store](https://store.classicminidiy.com)** - Merchandise and parts
- **💬 [Classic Mini Chat](https://github.com/somethingnew71/classic-mini-chat)** - AI-powered chat interface

## Credits & Acknowledgments

This software uses and builds upon information from the following sources:

### Technical Information Sources
- **[Seven Mini Parts](https://7ent.com)** - SU needle charts and technical specifications
- **[MintyLamb](http://www.mintylamb.co.uk/suneedle/)** - Original needle configurator inspiration
- **[MiniColours.co.uk](http://mini-colours.co.uk/)** - Color reference database
- **miniweights.co.uk** - Vehicle weight specifications (archived)
- **mk1-performance.com** - Historical archive content (archived)

### Community Contributions
- **Classic Mini Forums** - Technical knowledge and specifications
- **User Submissions** - Registry entries, wheel photos, and color contributions
- **Community Feedback** - Bug reports, feature requests, and improvements

### Open Source Libraries
- **Nuxt.js** - Vue.js framework
- **TailwindCSS** - Utility-first CSS framework
- **Highcharts** - Data visualization
- **Fuse.js** - Fuzzy search functionality
- **LangChain/LangGraph** - AI integration

## License

Distributed under the **GNU General Public License v3.0**.

This ensures that:
- ✅ The project remains free and open source
- ✅ Modifications must also be open source
- ✅ Commercial use is permitted
- ✅ The project can be freely distributed

See `LICENSE` file for more information.

---

<div align="center">

**Classic Mini DIY** - Preserving Classic Mini knowledge for future generations

Made with ❤️ by the Classic Mini community

[⬆ Back to top](#readme-top)

</div>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/somethingnew71/classicminidiy?style=for-the-badge
[contributors-url]: https://github.com/somethingnew71/classicminidiy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/somethingnew71/classicminidiy?style=for-the-badge
[forks-url]: https://github.com/somethingnew71/classicminidiy/network/members
[stars-shield]: https://img.shields.io/github/stars/somethingnew71/classicminidiy?style=for-the-badge
[stars-url]: https://github.com/somethingnew71/classicminidiy/stargazers
[issues-shield]: https://img.shields.io/github/issues/somethingnew71/classicminidiy?style=for-the-badge
[issues-url]: https://github.com/somethingnew71/classicminidiy/issues
[license-shield]: https://img.shields.io/github/license/somethingnew71/classicminidiy?style=for-the-badge
[license-url]: https://github.com/somethingnew71/classicminidiy/blob/main/LICENSE
[product-screenshot]: https://classicminidiy.s3.us-east-1.amazonaws.com/misc/product-preview.png

<!-- Technology Badges -->
[Nuxt.js]: https://img.shields.io/badge/nuxt.js-020421?style=for-the-badge&logo=nuxt&logoColor=00dc82
[Nuxt-url]: https://nuxt.com/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[AWS]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/