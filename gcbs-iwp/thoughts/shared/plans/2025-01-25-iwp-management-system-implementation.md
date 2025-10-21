# Individual Work Plan Management System Implementation Plan

## Overview

Building a comprehensive web application for university performance management that supports IWP creation, review processes, and administrative oversight. The system will serve Lecturers, Supervisors, and Administrators with role-based access control and document management capabilities.

## Current State Analysis

### Existing Foundation
- **Authentication**: WorkOS AuthKit configured (`apps/web/middleware.ts:3`)
- **UI System**: shadcn/ui with Tailwind CSS v4 (`packages/ui/src/components/button.tsx`)
- **Architecture**: Next.js 15 monorepo with Turborepo and pnpm workspaces
- **Styling**: Dark/light theme support with OKLCH color system

### Key Discoveries:
- Basic authentication protects `/protected` and `/home-page` routes (`apps/web/middleware.ts:7`)
- User object accessible with `user.firstName` property (`apps/web/app/protected/page.tsx:9`)
- Monorepo transpiles UI components via Next.js config (`apps/web/next.config.mjs`)
- Only Button component currently available, need Form/Table/Dashboard components

## Desired End State

A complete IWP Management System where:
- **Lecturers** create and submit IWPs with document uploads
- **Supervisors** review departmental staff with structured feedback
- **Administrators** manage users, review cycles, and generate reports
- **All users** have role-appropriate dashboards with real-time notifications

### Verification Criteria:
- User can complete full IWP workflow: create → submit → review → feedback
- Role-based access prevents unauthorized data access
- Document uploads work with Firebase Storage
- Performance metrics meet requirements (< 3s page loads, 99.5% uptime)

## What We're NOT Doing

- Integration with existing university systems (phase 1)
- Mobile app development (web-responsive only)
- Advanced analytics/AI features
- Multi-language support (English only initially)
- Real-time collaboration features within IWP editing

## Implementation Approach

**Database-First Strategy**: Start with MongoDB + Prisma schema to establish data relationships, then build UI components to match data models. Focus on role-based architecture from day one.

## Phase 1: Database Schema & User Management (Months 1-2)

### Overview
Establish core data models, authentication system, and user management foundation with role-based access control.

### Changes Required:

#### 1. Database Setup & Schema
**Files**: New Prisma configuration and schema files

```prisma
// prisma/schema.prisma
model User {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  workosId    String   @unique
  email       String   @unique
  firstName   String
  lastName    String
  role        UserRole
  department  String?
  college     String?
  supervisorId String? @db.ObjectId
  supervisor   User?   @relation("SupervisorStaff", fields: [supervisorId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  staff        User[]  @relation("SupervisorStaff")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  iwps              IWP[]
  reviews           Review[]
  iwpActivities     IWPActivity[]
  createdTemplates  IWPTemplate[]
  createdCriteria   IWPCriteria[]
}

// Templates that define the structure for IWPs
model IWPTemplate {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  category    String        // e.g., "Academic Staff", "Technical Staff", "Administrative Staff"
  isActive    Boolean       @default(true)
  createdBy   String        @db.ObjectId
  creator     User          @relation(fields: [createdBy], references: [id])

  // Template contains multiple criteria for evaluation
  criteria    IWPCriteria[]

  // IWPs created from this template
  iwps        IWP[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Criteria that make up a template - these define what gets evaluated
model IWPCriteria {
  id              String @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  description     String
  weight          Float           // Percentage weight in overall evaluation
  maxScore        Float           @default(5.0)

  // Belongs to a template
  templateId      String          @db.ObjectId
  template        IWPTemplate     @relation(fields: [templateId], references: [id], onDelete: Cascade)

  createdBy       String          @db.ObjectId
  creator         User            @relation(fields: [createdBy], references: [id])

  // Activities are evaluated against this criteria
  evaluations     ActivityEvaluation[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// User's actual IWP instance created from a template
model IWP {
  id              String @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  academicYear    String
  status          IWPStatus

  // References the template this IWP was created from
  templateId      String          @db.ObjectId
  template        IWPTemplate     @relation(fields: [templateId], references: [id])

  // Belongs to a user
  userId          String          @db.ObjectId
  user            User            @relation(fields: [userId], references: [id])

  // Contains user's activities
  activities      IWPActivity[]

  // Review and documents
  reviews         Review[]
  documents       Document[]

  submittedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// User's activities within their IWP (what they actually did/plan to do)
model IWPActivity {
  id              String @id @default(auto()) @map("_id") @db.ObjectId
  title           String
  description     String
  targetOutcome   String
  actualOutcome   String?

  // Belongs to an IWP
  iwpId           String          @db.ObjectId
  iwp             IWP             @relation(fields: [iwpId], references: [id], onDelete: Cascade)

  // Created by user
  createdBy       String          @db.ObjectId
  creator         User            @relation(fields: [createdBy], references: [id])

  // Activities get evaluated against multiple criteria
  evaluations     ActivityEvaluation[]

  // Evidence files for this activity
  evidenceFiles   ActivityEvidence[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Junction table: How activities are evaluated against criteria
model ActivityEvaluation {
  id              String @id @default(auto()) @map("_id") @db.ObjectId

  // The activity being evaluated
  activityId      String          @db.ObjectId
  activity        IWPActivity     @relation(fields: [activityId], references: [id], onDelete: Cascade)

  // The criteria it's being evaluated against
  criteriaId      String          @db.ObjectId
  criteria        IWPCriteria     @relation(fields: [criteriaId], references: [id], onDelete: Cascade)

  // Evaluation scores and feedback
  selfScore       Float?          // User's self-assessment
  supervisorScore Float?          // Supervisor's score
  supervisorFeedback String?      // Supervisor's comments

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([activityId, criteriaId])
}

// Evidence files uploaded for specific activities
model ActivityEvidence {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  filename    String
  fileUrl     String
  fileType    String
  fileSize    Int
  description String?        // Optional description of what this evidence shows

  // Belongs to an activity
  activityId  String          @db.ObjectId
  activity    IWPActivity     @relation(fields: [activityId], references: [id], onDelete: Cascade)

  // Uploaded by user
  uploadedBy  String          @db.ObjectId
  uploader    User            @relation(fields: [uploadedBy], references: [id])

  createdAt   DateTime @default(now())
}

enum UserRole {
  LECTURER
  SUPERVISOR
  ADMINISTRATOR
}

enum IWPStatus {
  DRAFT
  SUBMITTED
  UNDER_REVIEW
  COMPLETED
}
```

#### 2. User Management Module
**File**: `apps/web/app/admin/users/page.tsx`
**Changes**: Create comprehensive user management interface

```tsx
// User management dashboard with:
// - User creation/editing forms
// - Role assignment interface
// - Department hierarchy management
// - Supervisor-staff assignment tools
```

**File**: `apps/web/lib/auth.ts`
**Changes**: Extended authentication utilities

```typescript
// Enhanced auth functions:
// - Role-based access control hooks
// - Department-based data filtering
// - User profile synchronization with WorkOS
```

#### 3. Enhanced Authentication Middleware
**File**: `apps/web/middleware.ts`
**Changes**: Role-based route protection

```typescript
import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Role-based route protection logic
  // /admin/* routes for ADMINISTRATOR only
  // /supervisor/* routes for SUPERVISOR+ roles
  return authkitMiddleware()(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/supervisor/:path*",
    "/iwp/:path*",
    "/profile/:path*"
  ]
};
```

#### 4. Database Configuration
**File**: `apps/web/.env`
**Changes**: Add MongoDB connection

```env
# Existing WorkOS config...
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/iwp-system"
```

#### 5. IWP Template Management Module
**File**: `apps/web/app/admin/templates/page.tsx`
**Changes**: Template management interface

```tsx
// IWP Template management with:
// - Create/edit IWP templates by staff category
// - Define evaluation criteria with weights and max scores
// - Template activation/deactivation
// - Preview template structure
// - Assign templates to specific user roles/departments
```

**File**: `apps/web/app/admin/criteria/page.tsx`
**Changes**: Criteria management interface

```tsx
// Criteria management features:
// - Create reusable evaluation criteria
// - Set weighting and scoring systems
// - Organize criteria by categories
// - Link criteria to multiple templates
```

### Success Criteria:

#### Automated Verification:
- [ ] Database migrations apply cleanly: `pnpm db:migrate`
- [ ] Prisma client generates without errors: `pnpm db:generate`
- [ ] All unit tests pass: `pnpm test`
- [ ] Type checking passes: `pnpm typecheck`
- [ ] Linting passes: `pnpm lint`
- [ ] User can sign in and receive appropriate role: `curl /api/auth/me`

#### Manual Verification:
- [ ] Admin can create users and assign roles via UI
- [ ] Supervisor-staff relationships display correctly in dashboard
- [ ] Role-based navigation shows appropriate menu items
- [ ] IWP activities and criteria can be created and categorized
- [ ] User profile syncs correctly with WorkOS data
- [ ] Unauthorized users redirected from protected routes

---

## Phase 2: IWP Creation & Document Management (Months 3-4)

### Overview
Build core IWP creation interface with document upload capabilities using Firebase Storage.

### Changes Required:

#### 1. Firebase Storage Integration
**File**: `apps/web/lib/firebase.ts`
**Changes**: Firebase configuration and upload utilities

```typescript
// Firebase Storage setup:
// - File upload with progress tracking
// - File type validation and security
// - Storage quota management
// - Document URL generation
```

#### 2. IWP Data Models
**File**: `prisma/schema.prisma` (Extension)
**Changes**: Add IWP and document models

```prisma
model IWP {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  userId      String @db.ObjectId
  user        User   @relation(fields: [userId], references: [id])
  title       String
  academicYear String
  status      IWPStatus
  submittedAt DateTime?
  goals       IWPGoal[]
  documents   Document[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Document {
  id        String @id @default(auto()) @map("_id") @db.ObjectId
  filename  String
  fileUrl   String
  fileType  String
  fileSize  Int
  uploadedBy String @db.ObjectId
  iwpId     String @db.ObjectId
  iwp       IWP    @relation(fields: [iwpId], references: [id])
  createdAt DateTime @default(now())
}

enum IWPStatus {
  DRAFT
  SUBMITTED
  UNDER_REVIEW
  COMPLETED
}
```

#### 3. IWP Creation Interface
**File**: `apps/web/app/iwp/create/page.tsx`
**Changes**: Multi-step IWP creation form

```tsx
// Comprehensive IWP form with:
// - Goal setting with activities and criteria
// - Document upload with drag-and-drop
// - Auto-save functionality
// - Progress tracking
// - Template-based generation
```

#### 4. Document Upload Component
**File**: `packages/ui/src/components/file-upload.tsx`
**Changes**: Reusable file upload component

```tsx
// File upload features:
// - Drag and drop interface
// - Progress indicators
// - File type validation
// - Multiple file selection
// - Integration with Firebase Storage
```

### Success Criteria:

#### Automated Verification:
- [ ] Firebase Storage connection successful: `pnpm test:firebase`
- [ ] File upload API endpoints respond correctly: `curl -F "file=@test.pdf" /api/upload`
- [ ] IWP creation API validates data properly: `pnpm test:iwp-api`
- [ ] Database constraints enforced: `pnpm test:db`
- [ ] All form validations work: `pnpm test:forms`

#### Manual Verification:
- [ ] User can create IWP with goals and activities
- [ ] Document upload works with progress indicator
- [ ] Auto-save prevents data loss during editing
- [ ] Template selection pre-populates appropriate fields
- [ ] File size and type restrictions enforced
- [ ] IWP status updates correctly through workflow

---

## Phase 3: Review System & Notifications (Months 5-6)

### Overview
Implement supervisor review workflows, structured feedback systems, and real-time notifications.

### Changes Required:

#### 1. Review System Models
**File**: `prisma/schema.prisma` (Extension)
**Changes**: Add review and feedback models

```prisma
model Review {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  iwpId       String @db.ObjectId
  reviewerId  String @db.ObjectId
  iwp         IWP    @relation(fields: [iwpId], references: [id])
  reviewer    User   @relation(fields: [reviewerId], references: [id])
  overallRating Float
  feedback    ReviewFeedback[]
  status      ReviewStatus
  completedAt DateTime?
  createdAt   DateTime @default(now())
}

model ReviewFeedback {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  reviewId String @db.ObjectId
  review   Review @relation(fields: [reviewId], references: [id])
  goalId   String @db.ObjectId
  rating   Float
  comments String
}

enum ReviewStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}
```

#### 2. Supervisor Dashboard
**File**: `apps/web/app/supervisor/dashboard/page.tsx`
**Changes**: Comprehensive supervisor interface

```tsx
// Supervisor dashboard featuring:
// - Department staff overview
// - Review queue with priorities
// - Performance metrics at-a-glance
// - Workload distribution analytics
```

#### 3. Review Interface
**File**: `apps/web/app/supervisor/review/[iwpId]/page.tsx`
**Changes**: Structured feedback form

```tsx
// Review interface with:
// - Goal-by-goal rating system
// - Rich text feedback areas
// - Document review integration
// - Historical performance comparison
```

#### 4. Notification System
**File**: `apps/web/lib/notifications.ts`
**Changes**: Real-time notification service

```typescript
// Notification features:
// - WebSocket-based real-time updates
// - Email integration for deadlines
// - Role-based notification preferences
// - Escalation for overdue reviews
```

### Success Criteria:

#### Automated Verification:
- [ ] Review workflow API endpoints functional: `pnpm test:review-api`
- [ ] Notification service sends test messages: `pnpm test:notifications`
- [ ] Email templates render correctly: `pnpm test:emails`
- [ ] WebSocket connections establish: `pnpm test:websockets`
- [ ] Review permissions enforced: `pnpm test:review-access`

#### Manual Verification:
- [ ] Supervisor sees only their department's staff IWPs
- [ ] Review form saves feedback and ratings correctly
- [ ] Real-time notifications appear for status changes
- [ ] Email notifications sent for review deadlines
- [ ] Historical performance data displays accurately
- [ ] Review status updates reflect in staff dashboards

---

## Phase 4: Advanced Features & Analytics (Months 7-8)

### Overview
Implement comprehensive reporting, analytics dashboards, and system optimization for production deployment.

### Changes Required:

#### 1. Analytics Dashboard
**File**: `apps/web/app/admin/analytics/page.tsx`
**Changes**: Data visualization and reporting

```tsx
// Analytics features:
// - Departmental performance trends
// - Review cycle completion rates
// - User engagement metrics
// - Export functionality (PDF, Excel, CSV)
```

#### 2. Historical Performance Tracking
**File**: `apps/web/app/performance/history/page.tsx`
**Changes**: Multi-year performance analysis

```tsx
// Performance tracking:
// - Timeline visualization
// - Goal achievement trends
// - Career progression tracking
// - Comparative analysis tools
```

#### 3. Advanced Search & Filtering
**File**: `packages/ui/src/components/advanced-search.tsx`
**Changes**: Comprehensive search interface

```tsx
// Search capabilities:
// - Full-text search across IWPs
// - Advanced filtering by multiple criteria
// - Saved search presets
// - Export filtered results
```

#### 4. Performance Optimization
**File**: `apps/web/next.config.mjs`
**Changes**: Production optimization

```javascript
// Performance enhancements:
// - Image optimization configuration
// - Bundle analysis and splitting
// - CDN integration setup
// - Caching strategies
```

### Success Criteria:

#### Automated Verification:
- [ ] Performance tests pass load requirements: `pnpm test:performance`
- [ ] Bundle size within acceptable limits: `pnpm build:analyze`
- [ ] Database queries optimized: `pnpm test:db-performance`
- [ ] All integration tests pass: `pnpm test:integration`
- [ ] Security audit passes: `pnpm audit`
- [ ] Accessibility tests pass: `pnpm test:a11y`

#### Manual Verification:
- [ ] Page load times consistently under 3 seconds
- [ ] Analytics dashboard loads with 1000+ records
- [ ] Export functionality generates correct reports
- [ ] Search returns accurate results within 2 seconds
- [ ] System supports 100+ concurrent users
- [ ] All user roles have appropriate dashboard experience

---

## Testing Strategy

### Unit Tests:
- Database model validation and relationships
- Authentication and authorization logic
- File upload and validation utilities
- Form validation and data transformation

### Integration Tests:
- Complete IWP creation → submission → review workflow
- Role-based access control across all endpoints
- Document upload → storage → retrieval process
- Notification system end-to-end functionality

### Manual Testing Steps:
1. Create test users for all three roles (Lecturer, Supervisor, Administrator)
2. Complete full IWP lifecycle: create → populate → submit → review → feedback
3. Test role-based access by attempting unauthorized actions
4. Verify document upload works with various file types and sizes
5. Test notification system with real email addresses
6. Load test with multiple concurrent users creating IWPs

## Performance Considerations

- **Database Indexing**: Index on user roles, department hierarchies, and IWP status
- **File Storage**: Implement CDN for document delivery and thumbnail generation
- **Caching Strategy**: Redis for session management and frequent queries
- **Search Optimization**: Full-text search indexes for IWP content
- **Bundle Optimization**: Code splitting for role-specific functionality

## Migration Notes

- **User Import**: Script to import existing staff data if available
- **Document Migration**: Bulk upload tool for existing IWP documents
- **Role Assignment**: Administrative interface for initial role setup
- **Department Setup**: Configuration wizard for university hierarchy

## References

- Original requirements: `PROJECT_REQUIREMENT.md`
- Current authentication: `apps/web/middleware.ts:3`
- UI component system: `packages/ui/src/components/button.tsx`
- WorkOS integration: `apps/web/app/layout.tsx:29`