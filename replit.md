# BADII | بديع - AI-Powered Creative Solutions Platform

## Overview

BADII (بديع) is a creative platform that uses generative AI to transform ordinary product photos into professional-grade marketing content. The application targets shop owners, restaurants, and cafes in Arabic-speaking markets, offering AI-powered product photography, copywriting services, and video reel creation. Built as a full-stack web application with a React frontend and Express backend, the platform features a booking system for customers to request creative services across three pricing tiers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, chosen for fast HMR and optimized production builds
- React Router (wouter) for lightweight client-side routing

**UI Component Library**
- Shadcn/ui component system with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom theme configuration
- RTL (Right-to-Left) support built into the HTML structure for Arabic language support
- Cairo and Tajawal fonts for Arabic typography

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management with configured caching strategies
- React Hook Form with Zod resolvers for type-safe form validation
- Custom query client with 401 unauthorized handling and infinite stale time to reduce unnecessary refetches

**Design Patterns**
- Component composition using Radix UI's slot pattern for flexible, composable components
- Custom hooks (use-mobile, use-toast) for reusable logic
- TypeScript path aliases (@/, @shared/, @assets/) for clean imports

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript for type safety
- HTTP server creation with createServer for future WebSocket support potential
- Custom logging middleware tracking request duration and API response payloads

**API Design**
- RESTful API endpoints under `/api` namespace
- Three core booking endpoints: POST /api/bookings (create), GET /api/bookings (list all), GET /api/bookings/:id (get single)
- JSON request/response format with Zod schema validation
- Error handling with appropriate HTTP status codes (400 for validation errors, 404 for not found, 500 for server errors)

**Storage Layer**
- Repository pattern with IStorage interface for data access abstraction
- DatabaseStorage implementation for PostgreSQL operations
- Drizzle ORM for type-safe database queries and migrations

### Data Storage

**Database**
- PostgreSQL via Neon's serverless driver with WebSocket support for low-latency connections
- Drizzle ORM chosen for lightweight, TypeScript-first ORM with excellent type inference
- Schema-first approach with Zod integration for runtime validation matching database schema

**Schema Design**
- Single `bookings` table with auto-incrementing integer primary key
- Fields: name, phone, projectType, description, budget, timeline, audience, goal, mood
- Timestamps with automatic createdAt default
- Validation enforced at both database and application layers via drizzle-zod

**Migration Strategy**
- Drizzle Kit for schema migrations stored in `/migrations` directory
- `db:push` command for direct schema synchronization during development

### External Dependencies

**Third-Party Services**
- Neon Database for serverless PostgreSQL hosting
- Botpress chatbot integration (referenced in HTML with custom styling for customer support)
- Google Fonts CDN for Arabic font families (Cairo, Tajawal)

**Development Tools**
- Replit-specific plugins: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- Custom vite-plugin-meta-images for dynamic OpenGraph image URL generation based on Replit deployment domain
- ESBuild for server-side code bundling with selective dependency bundling to optimize cold start times

**Build & Deployment**
- Separate build processes: Vite for client, ESBuild for server
- Production bundle outputs to `dist/` directory (client to dist/public, server to dist/index.cjs)
- Static file serving in production via Express
- Development mode uses Vite middleware for HMR

**Key Architectural Decisions**
- Monorepo structure with shared types between client and server via `@shared` namespace
- TypeScript across the entire stack for end-to-end type safety
- Drizzle schema as single source of truth with Zod validation derived from it
- Client-side form validation with server-side validation as fallback
- Optimistic UI updates via React Query for responsive user experience