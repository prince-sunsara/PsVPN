# PSVPN - Stay Anonymous

This is a fictional VPN service web application called "PSVPN" with an immersive hacker-themed, futuristic design. The application simulates a comprehensive VPN connection dashboard with automatic server rotation, real IP detection and masking, extensive security monitoring, and authentic hacker-style visual effects. It features a dark theme with neon green accents (#00ff7f), animated Matrix-style backgrounds, falling code effects, and sophisticated UI components built with modern React technologies.

The application displays real-time VPN connection status, automatically rotates through 200+ country server locations every 60 seconds, detects and displays the user's actual IP address before "masking" it with VPN servers, provides interactive 3D globe visualization, comprehensive security monitoring with real-time threat detection, a simulated hacker terminal, and detailed implementation guides for actual VPN functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript and functional components

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useEffect) with custom hooks for VPN state management
- **Styling**: Tailwind CSS with custom design system for hacker theme
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for complex animations and transitions
- **3D Graphics**: React Three Fiber with Drei helpers for 3D globe visualization

**Design System**: Custom CSS variables for consistent theming with dark background (#0a0a0a), neon green accents (#00ff7f), and hacker-inspired typography using JetBrains Mono and Inter fonts.

## Backend Architecture

**Server Framework**: Express.js with TypeScript

- **Development Server**: Vite for development with hot module replacement
- **API Structure**: RESTful API endpoints with /api prefix
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request logging and performance monitoring

**Storage Layer**: Pluggable storage interface with in-memory implementation

- **Interface**: IStorage with CRUD operations for users
- **Implementation**: MemStorage class using Map for development/testing
- **Schema**: Drizzle ORM for type-safe database operations

## Data Management

**State Management**: Custom hooks for VPN simulation

- **Server Rotation**: Automatic country switching every 60 seconds
- **Country Data**: Static JSON file with 100+ server locations including flags, IPs, ping times, and server loads
- **Connection Status**: Simulated VPN states with real-time updates

**Data Schema**: Drizzle ORM with PostgreSQL dialect

- **Users Table**: Basic user model with UUID primary keys
- **Validation**: Zod schemas for runtime type checking

**New Features Added (Latest Update)**:

- **Real IP Detection**: Fetches user's actual IP address using multiple IP services (ipapi.co, ipinfo.io, ipify)
- **IP Masking Simulation**: Shows realistic VPN server IPs from different countries when "connected"
- **Enhanced Security Panel**: Real-time threat monitoring, encryption status, and security metrics
- **Hacker Terminal**: Simulated command execution with realistic hacking commands and responses
- **VPN Implementation Guide**: Comprehensive guide for actual VPN implementation approaches
- **Enhanced Country Coverage**: Expanded to 200+ countries across all continents
- **Advanced Intro Screen**: Multi-phase intro with falling code, hacker phrases, and enhanced branding

## External Dependencies

**UI and Styling**:

- Tailwind CSS for utility-first styling
- Radix UI for accessible component primitives
- Framer Motion for animations and transitions
- Lucide React for consistent iconography

**3D Visualization**:

- Three.js through React Three Fiber for 3D rendering
- Drei for Three.js helpers and utilities

**Development Tools**:

- Vite for fast development builds and HMR
- TypeScript for type safety
- ESBuild for production bundling

**Database and ORM**:

- Drizzle ORM for type-safe database operations
- Neon Database serverless PostgreSQL for cloud hosting
- Drizzle Kit for database migrations and schema management

**Form and Data Handling**:

- React Hook Form with Hookform Resolvers for form management
- Zod for schema validation and type inference
- TanStack React Query for server state management

**Fonts and Typography**:

- Google Fonts integration for JetBrains Mono, Inter, and specialty fonts
- Custom font loading for consistent typography across the application
