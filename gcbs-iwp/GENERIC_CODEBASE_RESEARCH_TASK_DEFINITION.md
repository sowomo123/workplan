# Generic Codebase Research Task Definition for IWP Management System

## Task Overview
**Mode**: Agent  
**Primary Objective**: Conduct comprehensive, systematic research and analysis of the IWP Management System codebase to understand architecture patterns, identify implementation strategies, document code relationships, and provide actionable insights for development, maintenance, and enhancement activities.

## Specific Requirements

### 1. Architectural Analysis and Documentation
- **Requirement**: Comprehensive analysis of monorepo structure and architectural patterns
- **Components**:
  - **Monorepo Organization**: Turborepo and pnpm workspace structure analysis
  - **Package Dependencies**: Inter-package relationships and dependency graphs
  - **Build System**: Turbo.json task configuration and build pipeline analysis
  - **Configuration Management**: Environment, TypeScript, ESLint, and tool configurations
  - **Code Organization**: File structure patterns and naming conventions

### 2. Technology Stack Deep Dive
- **Requirement**: Detailed analysis of technology implementation and integration patterns
- **Technology Areas**:
  - **Next.js 15**: App Router implementation, middleware, and SSR patterns
  - **TypeScript 5.7.3**: Type definitions, interfaces, and strict mode usage
  - **WorkOS AuthKit**: Authentication integration and user management
  - **Tailwind CSS v4**: Styling architecture and component design system
  - **shadcn/ui**: Component library usage and customization patterns

### 3. Code Pattern Identification and Analysis
- **Requirement**: Systematic identification and documentation of recurring code patterns
- **Pattern Categories**:
  - **Component Patterns**: React component structure, props, hooks usage
  - **API Patterns**: Route handlers, middleware, error handling
  - **Data Flow Patterns**: State management, context usage, data fetching
  - **Security Patterns**: Authentication, authorization, data validation
  - **Performance Patterns**: Optimization strategies, caching, lazy loading

### 4. Business Domain Logic Research
- **Requirement**: Analysis of IWP-specific business logic and university domain patterns
- **Domain Areas**:
  - **Role-Based Access Control**: Lecturer, Supervisor, Administrator implementations
  - **Performance Management**: IWP creation, review, evaluation workflows
  - **Document Management**: File handling, storage, and organization patterns
  - **Notification Systems**: Real-time updates, email integration patterns
  - **Data Models**: University hierarchy, performance metrics, audit trails

## Technical Constraints

### Research Scope Constraints
- **Codebase Boundary**: Focus on active code in apps/ and packages/ directories
- **Historical Context**: Include insights from thoughts/ directory when relevant
- **Documentation Coverage**: Prioritize working code over configuration files
- **Pattern Recognition**: Focus on reusable, maintainable patterns over one-off implementations
- **Domain Specificity**: Balance generic patterns with IWP-specific requirements

### Analysis Methodology Constraints
- **Tool Integration**: Use existing development tools and workflows for analysis
- **Documentation Format**: Structured, searchable, and maintainable documentation format
- **Code Examples**: Include working code snippets with full context
- **Cross-References**: Maintain clear links between related components and patterns
- **Accuracy**: Ensure all findings are based on actual codebase analysis

### Output Quality Constraints
- **Actionable Insights**: Research must provide practical development guidance
- **Maintainability**: Documentation must be easy to update as code evolves
- **Searchability**: Organized for easy discovery of relevant patterns and solutions
- **Completeness**: Cover all major architectural and implementation aspects
- **Clarity**: Accessible to developers with varying familiarity with the codebase

## Success Criteria

### Immediate Success Metrics (Phase 1)
1. **Architecture Coverage**: Complete documentation of monorepo structure and build system
2. **Pattern Identification**: Catalog of 50+ reusable code patterns across all categories
3. **Technology Integration**: Detailed analysis of all major technology stack components
4. **Code Relationships**: Comprehensive mapping of inter-component dependencies

### Long-term Success Metrics (Phase 2)
1. **Developer Productivity**: 40% faster onboarding for new team members
2. **Code Quality**: Improved consistency through documented patterns and standards
3. **Maintenance Efficiency**: Reduced time to locate and understand existing implementations
4. **Technical Debt Reduction**: Identification and documentation of improvement opportunities

### Quality Assurance Metrics
1. **Research Accuracy**: 95% accuracy of documented patterns and relationships
2. **Coverage Completeness**: Documentation of all major system components and patterns
3. **Update Currency**: Research documentation stays current with codebase evolution
4. **Usability**: High developer satisfaction with research accessibility and usefulness

## Research Implementation Framework

### Phase 1: Foundational Architecture Research

#### 1. Monorepo Structure Analysis
**Research Areas**:
```
IWP-Management-System/
├── apps/
│   └── web/                    # Next.js 15 application
│       ├── app/               # App Router structure
│       ├── components/        # Application-specific components
│       ├── lib/              # Utilities and configurations
│       └── middleware.ts     # Authentication and routing middleware
├── packages/
│   ├── ui/                   # Shared UI component library
│   ├── eslint-config/       # Shared ESLint configurations
│   └── typescript-config/   # Shared TypeScript configurations
├── prisma/                  # Database schema and migrations
└── thoughts/               # Documentation and planning
```

**Key Analysis Points**:
- Package dependency relationships and workspace configuration
- Build system orchestration through Turbo.json
- Shared tooling and configuration management
- Inter-package communication and type safety

#### 2. Technology Stack Integration Patterns
**Research Focus**:

##### Next.js 15 App Router Implementation
```typescript
// Pattern: App Router structure and middleware integration
// Found in: apps/web/app/layout.tsx, apps/web/middleware.ts

// Root layout with provider pattern
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <Providers>
          <AuthKitProvider>{children}</AuthKitProvider>
        </Providers>
      </body>
    </html>
  );
}

// Middleware pattern for authentication
import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
export default authkitMiddleware();
export const config = { 
  matcher: ["/protected", "/home-page"] 
};
```

##### Component Library Integration
```typescript
// Pattern: Workspace package consumption
// Found in: apps/web/app/page.tsx, apps/web/next.config.mjs

// Cross-package component import
import { Button } from "@workspace/ui/components/button"

// Transpilation configuration
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
}
```

### Phase 2: Code Pattern Documentation

#### 1. Component Architecture Patterns
**Pattern Category: UI Components**

```typescript
// Pattern: shadcn/ui Component Structure
// Found in: packages/ui/src/components/button.tsx

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Variant-based component pattern
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Component with forwardRef and variant props
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & 
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
```

#### 2. Authentication and Security Patterns
**Pattern Category: WorkOS Integration**

```typescript
// Pattern: Authentication middleware integration
// Found in: apps/web/middleware.ts, apps/web/app/layout.tsx

// Middleware pattern for route protection
import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({
  // Configuration options for role-based access
  redirectUri: process.env.WORKOS_REDIRECT_URI,
  postLogoutRedirectUri: process.env.WORKOS_POST_LOGOUT_REDIRECT_URI,
});

// Provider pattern for authentication context
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";

// Nested provider structure for authentication + theming
<Providers>
  <AuthKitProvider>{children}</AuthKitProvider>
</Providers>
```

#### 3. Styling and Theme Patterns
**Pattern Category: Tailwind CSS v4 + Theme System**

```typescript
// Pattern: Theme provider integration
// Found in: apps/web/components/providers.tsx

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
```

### Phase 3: Business Domain Analysis

#### 1. IWP Management Domain Patterns
**Research Areas**:
- Role-based access control implementation patterns
- Performance review workflow patterns
- Document management and file upload patterns
- Notification and communication patterns
- Data validation and security patterns

#### 2. University-Specific Business Logic
**Domain Analysis**:
- Academic hierarchy modeling (departments, colleges, roles)
- Performance evaluation criteria and scoring systems
- Document evidence management and audit trails
- Review cycle management and deadline tracking
- Reporting and analytics requirements

### Phase 4: Development Workflow Research

#### 1. Build and Development Patterns
**Workflow Analysis**:
```json
// Pattern: Turbo.json task orchestration
// Found in: turbo.json

{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

#### 2. Code Quality and Testing Patterns
**Quality Assurance Research**:
- ESLint configuration patterns across packages
- TypeScript strict mode implementation
- Testing strategies and patterns (when implemented)
- Git workflow and commit patterns

## Research Output Framework

### 1. Architecture Documentation Structure
```markdown
# IWP Management System - Architecture Research

## Monorepo Structure
- Package organization and dependencies
- Build system configuration and task orchestration
- Shared tooling and configuration management

## Technology Stack Integration
- Next.js 15 App Router implementation patterns
- WorkOS AuthKit authentication flows
- Tailwind CSS v4 + shadcn/ui design system
- TypeScript type safety and configuration

## Code Patterns Library
- Component architecture and reusability patterns
- Authentication and security implementation patterns  
- Styling and theming patterns
- Business logic and domain-specific patterns

## Development Workflow
- Build and deployment processes
- Code quality and testing approaches
- Git workflow and contribution patterns
```

### 2. Pattern Documentation Template
```markdown
## Pattern: [Pattern Name]

### Pattern Category
[UI Component | Authentication | Data Flow | Business Logic | etc.]

### Found In
- `path/to/file.ts:line-range` - Primary implementation
- `path/to/related.ts:line` - Related usage

### Description
[Clear explanation of what this pattern does and when to use it]

### Code Example
```typescript
// Working code example with full context
// Including imports, types, and usage
```

### Key Aspects
- [Aspect 1]: [Description]
- [Aspect 2]: [Description]
- [Best Practices]: [Recommendations]

### Related Patterns
- [Pattern Name] - [Relationship description]
- [Pattern Name] - [Relationship description]

### Usage Guidelines
- When to use this pattern
- When to avoid this pattern
- Common pitfalls and how to avoid them
```

### 3. Continuous Research Integration
**Maintenance Strategy**:
- Automated detection of new patterns through static analysis
- Regular research updates aligned with codebase evolution
- Integration with code review process to capture new patterns
- Developer feedback loop for pattern effectiveness and usability

## Risk Mitigation and Quality Assurance

### Research Quality Risks
1. **Pattern Accuracy**: Regular validation against actual codebase implementation
2. **Documentation Drift**: Automated checks for research currency with code changes
3. **Completeness**: Systematic coverage verification across all major components
4. **Usability**: Regular developer feedback and research effectiveness measurement

### Implementation Risks
1. **Research Overhead**: Balanced approach between thoroughness and development velocity
2. **Tool Dependencies**: Research methods independent of specific analysis tools
3. **Knowledge Transfer**: Clear documentation and onboarding materials for research usage
4. **Evolution Management**: Scalable research framework that grows with the codebase

This comprehensive codebase research task definition ensures systematic, thorough analysis of the IWP Management System, providing developers with deep insights into architectural patterns, implementation strategies, and best practices for efficient development and maintenance of university performance management software.