# Local Code Review Task Definition for IWP Management System

## Task Overview
**Mode**: Agent  
**Primary Objective**: Establish comprehensive local code review processes and tools for the Individual Work Plan (IWP) Management System that ensure code quality, maintain architectural consistency, and facilitate efficient development workflows before remote collaboration and pull request submission.

## Specific Requirements

### 1. Pre-Commit Code Review Process
- **Requirement**: Systematic local code review before any commits or push operations
- **Components**:
  - **Self-Review Checklist**: Comprehensive developer self-assessment process
  - **Automated Quality Gates**: Pre-commit hooks with linting, testing, and formatting
  - **Code Standards Validation**: TypeScript, ESLint, Prettier compliance checks
  - **Architecture Compliance**: Adherence to monorepo structure and design patterns
  - **Security Review**: Local security scanning and vulnerability assessment

### 2. Monorepo-Specific Review Protocols
- **Requirement**: Review processes tailored to Turborepo and pnpm workspace structure
- **Focus Areas**:
  - **Cross-Package Dependencies**: Validate dependencies between apps/web and packages/ui
  - **Shared Component Changes**: Impact assessment on reusable UI components
  - **Configuration Changes**: Review of turbo.json, package.json, and workspace configs
  - **Build System Impact**: Changes affecting build processes and development workflows
  - **Type Safety Consistency**: Ensure TypeScript types are consistent across packages

### 3. IWP Domain-Specific Review Criteria
- **Requirement**: Review criteria specific to university performance management requirements
- **Domain Areas**:
  - **Role-Based Access Control**: Verify RBAC implementation for Lecturer/Supervisor/Admin roles
  - **Data Privacy Compliance**: Ensure IWP data handling meets privacy requirements
  - **Authentication Integration**: WorkOS AuthKit integration and middleware validation
  - **Document Management**: Firebase Storage integration and file handling security
  - **Performance Management**: University-specific workflow and business logic validation

### 4. Local Development Environment Validation
- **Requirement**: Comprehensive local environment setup and validation procedures
- **Validation Components**:
  - **Development Server Health**: Next.js 15 app router and hot reload functionality
  - **Database Connectivity**: MongoDB connection and Prisma schema validation
  - **Package Dependencies**: pnpm workspace resolution and dependency integrity
  - **Build Process Verification**: Turborepo build pipeline execution and optimization
  - **Testing Environment**: Unit, integration, and E2E test execution capabilities

## Technical Constraints

### Development Environment Constraints
- **Monorepo Structure**: Must work within Turborepo and pnpm workspace architecture
- **Technology Stack**: Compatible with Next.js 15, TypeScript 5.7.3, Tailwind CSS v4
- **Build System**: Integration with existing Turborepo build and development pipelines
- **Package Management**: pnpm workspace dependency management and resolution
- **Development Tools**: VS Code integration with proper debugging and IntelliSense

### Code Quality Constraints
- **Type Safety**: Strict TypeScript implementation with zero `any` usage tolerance
- **Code Style**: ESLint and Prettier enforcement with consistent formatting
- **Performance**: Bundle size optimization and runtime performance considerations
- **Security**: No hardcoded credentials, proper error handling, secure data practices
- **Accessibility**: WCAG 2.1 AA compliance for all UI components and interfaces

### Review Process Constraints
- **Time Efficiency**: Local review should not exceed 15 minutes for typical changes
- **Automation**: Maximum automation of routine checks while preserving human judgment
- **Documentation**: Clear guidelines and checklists for consistent review quality
- **Tool Integration**: Seamless integration with existing development workflow and tools
- **Scalability**: Review process should scale with team size and codebase growth

## Success Criteria

### Immediate Success Metrics (Phase 1)
1. **Review Adoption**: 100% of developers use local review checklist before commits
2. **Quality Gate Compliance**: 95% of commits pass all automated quality checks
3. **Error Reduction**: 60% reduction in post-commit issues and rework
4. **Review Time**: Average local review time under 15 minutes per changeset

### Long-term Success Metrics (Phase 2)
1. **Code Quality**: Measurable improvement in code quality metrics and maintainability
2. **Bug Prevention**: 80% reduction in bugs caught during remote code review
3. **Development Velocity**: Faster development cycles due to early issue detection
4. **Team Consistency**: Uniform code quality and architecture compliance across team

### Quality Assurance Metrics
1. **Automated Coverage**: 90% of quality checks performed automatically
2. **Manual Review Quality**: High-value focus areas identified for human review
3. **Process Compliance**: Adherence to established review protocols and standards
4. **Continuous Improvement**: Regular refinement of review criteria and processes

## Local Review Implementation

### Phase 1: Development Environment Setup and Validation

#### 1. Development Environment Health Check
**Script**: `scripts/dev-health-check.ps1`
```powershell
# Development environment validation script
# Check Node.js, pnpm, and development dependencies
Write-Host "🔍 IWP Management System - Development Environment Health Check"

# Node.js version validation
$nodeVersion = node --version
if ($nodeVersion -match "v(\d+)\.") {
    $majorVersion = [int]$matches[1]
    if ($majorVersion -ge 20) {
        Write-Host "✅ Node.js version: $nodeVersion (>=20 required)"
    } else {
        Write-Host "❌ Node.js version: $nodeVersion (>=20 required)"
        exit 1
    }
}

# pnpm validation
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm version: $pnpmVersion"
} catch {
    Write-Host "❌ pnpm not installed or not accessible"
    exit 1
}

# Dependencies integrity check
Write-Host "🔍 Checking workspace dependencies..."
pnpm install --frozen-lockfile
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Dependency installation failed"
    exit 1
}

# TypeScript compilation check
Write-Host "🔍 TypeScript compilation check..."
pnpm turbo typecheck
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript compilation failed"
    exit 1
}

# Build system validation
Write-Host "🔍 Build system validation..."
pnpm turbo build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build process failed"
    exit 1
}

Write-Host "✅ Development environment health check passed!"
```

#### 2. Pre-Commit Hook Configuration
**File**: `.husky/pre-commit`
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks for IWP Management System..."

# Run type checking
echo "📝 TypeScript type checking..."
pnpm turbo typecheck
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found. Please fix before committing."
  exit 1
fi

# Run linting
echo "🔧 Running ESLint..."
pnpm turbo lint
if [ $? -ne 0 ]; then
  echo "❌ Linting errors found. Please fix before committing."
  exit 1
fi

# Run formatting check
echo "✨ Checking code formatting..."
pnpm prettier --check "**/*.{ts,tsx,md}"
if [ $? -ne 0 ]; then
  echo "❌ Code formatting issues found. Run 'pnpm format' to fix."
  exit 1
fi

# Run unit tests
echo "🧪 Running unit tests..."
pnpm turbo test
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed. Please fix before committing."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
```

### Phase 2: Local Code Review Checklist

#### 1. Self-Review Checklist Template
**File**: `.github/templates/SELF_REVIEW_CHECKLIST.md`
```markdown
# Local Code Review Checklist - IWP Management System

## Pre-Commit Self-Review

### 📋 General Code Quality
- [ ] Code is well-structured and follows established patterns
- [ ] Functions and variables have descriptive, meaningful names
- [ ] Complex logic is adequately commented
- [ ] No debugging code (console.log, debugger statements) left in
- [ ] No hardcoded values that should be configurable
- [ ] Error handling is appropriate and comprehensive

### 🔒 Security Review
- [ ] No hardcoded credentials, API keys, or sensitive data
- [ ] User input is properly validated and sanitized
- [ ] Authentication and authorization checks are correct
- [ ] File uploads (if any) have proper validation and size limits
- [ ] Database queries use parameterized queries (Prisma)
- [ ] No SQL injection vulnerabilities in raw queries

### 🏗️ Architecture & Design
- [ ] Code follows established monorepo structure patterns
- [ ] Dependencies between packages (apps/web ↔ packages/ui) are appropriate
- [ ] Changes maintain separation of concerns
- [ ] No circular dependencies introduced
- [ ] Shared components are properly abstracted and reusable
- [ ] API routes follow RESTful conventions where applicable

### 🎭 Role-Based Access Control (RBAC)
- [ ] New routes/components properly implement role-based access
- [ ] User permissions are checked at appropriate levels
- [ ] Lecturer/Supervisor/Administrator roles are correctly enforced
- [ ] No unauthorized access to IWP data across roles
- [ ] Middleware correctly protects sensitive endpoints

### 📊 IWP Domain Logic
- [ ] IWP creation, editing, and submission logic is correct
- [ ] Document upload and management follows established patterns
- [ ] Review workflows maintain data integrity
- [ ] Performance evaluation logic is accurate and fair
- [ ] Notification systems trigger at appropriate times
- [ ] Audit trails are maintained for sensitive operations

### 🎨 UI/UX Implementation
- [ ] Components follow shadcn/ui design system patterns
- [ ] Responsive design works on mobile and desktop
- [ ] Accessibility (WCAG 2.1 AA) considerations implemented
- [ ] Dark/light theme support maintained
- [ ] Loading states and error boundaries implemented
- [ ] User feedback (success/error messages) is clear and helpful

### ⚡ Performance Considerations
- [ ] Database queries are optimized and indexed appropriately
- [ ] Large datasets use pagination or infinite scroll
- [ ] Images and files are optimized for web delivery
- [ ] Bundle size impact is minimal (check with bundle analyzer)
- [ ] No unnecessary re-renders in React components
- [ ] Expensive operations are debounced or throttled

### 🧪 Testing Coverage
- [ ] Unit tests cover new functionality
- [ ] Integration tests cover API endpoints
- [ ] Edge cases and error conditions are tested
- [ ] Test names clearly describe what they're testing
- [ ] Mocks and fixtures are realistic and maintainable
- [ ] Tests are deterministic (no flaky tests)

### 📚 Documentation
- [ ] README files updated for significant changes
- [ ] API documentation updated for new endpoints
- [ ] Inline comments explain complex business logic
- [ ] Type definitions are comprehensive and accurate
- [ ] Component props are properly documented
- [ ] Database schema changes are documented

### 🔧 Development Experience
- [ ] TypeScript strict mode compliance (no 'any' types)
- [ ] ESLint rules pass without warnings
- [ ] Prettier formatting is consistent
- [ ] Hot reload works correctly in development
- [ ] Build process completes without errors
- [ ] Development server starts without issues
```

#### 2. Automated Local Review Script
**Script**: `scripts/local-review.ps1`
```powershell
# Local Code Review Automation Script
param(
    [string]$scope = "all",  # all, changed, staged
    [switch]$verbose = $false
)

Write-Host "🔍 IWP Management System - Local Code Review" -ForegroundColor Cyan
Write-Host "Scope: $scope" -ForegroundColor Gray

# Function to run command and check exit code
function Invoke-CheckCommand {
    param([string]$command, [string]$description)
    
    if ($verbose) { Write-Host "Running: $command" -ForegroundColor Gray }
    Write-Host "📋 $description..." -ForegroundColor Yellow
    
    Invoke-Expression $command
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ $description failed" -ForegroundColor Red
        return $false
    } else {
        Write-Host "✅ $description passed" -ForegroundColor Green
        return $true
    }
}

$allPassed = $true

# 1. TypeScript Type Checking
if (!(Invoke-CheckCommand "pnpm turbo typecheck" "TypeScript type checking")) {
    $allPassed = $false
}

# 2. ESLint Validation
if (!(Invoke-CheckCommand "pnpm turbo lint" "ESLint validation")) {
    $allPassed = $false
}

# 3. Prettier Formatting Check
if (!(Invoke-CheckCommand "pnpm prettier --check '**/*.{ts,tsx,md}'" "Code formatting check")) {
    $allPassed = $false
}

# 4. Unit Tests
if (!(Invoke-CheckCommand "pnpm turbo test" "Unit tests execution")) {
    $allPassed = $false
}

# 5. Build Verification
if (!(Invoke-CheckCommand "pnpm turbo build" "Build verification")) {
    $allPassed = $false
}

# 6. Bundle Size Analysis (if changed files include significant changes)
if ($scope -eq "all" -or $scope -eq "changed") {
    Write-Host "📦 Bundle size analysis..." -ForegroundColor Yellow
    try {
        # Check if bundle analyzer is available and run
        $bundleStats = pnpm --prefix apps/web run analyze 2>&1
        Write-Host "✅ Bundle analysis completed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Bundle analysis skipped (analyzer not configured)" -ForegroundColor Yellow
    }
}

# 7. Security Scan (basic checks)
Write-Host "🔒 Security validation..." -ForegroundColor Yellow
$securityIssues = @()

# Check for common security issues
$sensitivePatterns = @(
    "password\s*=\s*['\"`][^'`\"]+['\"`]",
    "api_?key\s*=\s*['\"`][^'`\"]+['\"`]",
    "secret\s*=\s*['\"`][^'`\"]+['\"`]",
    "token\s*=\s*['\"`][^'`\"]+['\"`]",
    "console\.log\(",
    "debugger;?"
)

foreach ($pattern in $sensitivePatterns) {
    $matches = Select-String -Path "apps/**/*.{ts,tsx}" -Pattern $pattern -AllMatches
    if ($matches) {
        $securityIssues += $matches
    }
}

if ($securityIssues.Count -gt 0) {
    Write-Host "❌ Security issues found:" -ForegroundColor Red
    $securityIssues | ForEach-Object { Write-Host "  $($_.Line)" -ForegroundColor Red }
    $allPassed = $false
} else {
    Write-Host "✅ Security validation passed" -ForegroundColor Green
}

# 8. Database Schema Validation (if Prisma schema changed)
if (git diff --name-only HEAD | Select-String "prisma/schema.prisma") {
    Write-Host "🗄️  Database schema validation..." -ForegroundColor Yellow
    if (!(Invoke-CheckCommand "pnpm --prefix . prisma validate" "Prisma schema validation")) {
        $allPassed = $false
    }
    
    # Check if migration is needed
    try {
        $migrationStatus = pnpm --prefix . prisma migrate status 2>&1
        if ($migrationStatus -match "Database schema is up to date") {
            Write-Host "✅ Database schema is up to date" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Database migration may be required" -ForegroundColor Yellow
            Write-Host "Run 'pnpm prisma migrate dev' to create migration" -ForegroundColor Gray
        }
    } catch {
        Write-Host "⚠️  Could not check migration status" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n" -NoNewline
if ($allPassed) {
    Write-Host "🎉 Local code review passed! Ready for commit." -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Review the self-review checklist: .github/templates/SELF_REVIEW_CHECKLIST.md" -ForegroundColor Gray
    Write-Host "  2. Commit your changes: git commit -m 'your message'" -ForegroundColor Gray
    Write-Host "  3. Push and create pull request when ready" -ForegroundColor Gray
} else {
    Write-Host "❌ Local code review failed. Please address the issues above." -ForegroundColor Red
    exit 1
}
```

### Phase 3: VS Code Integration and Development Tools

#### 1. VS Code Settings for IWP Development
**File**: `.vscode/settings.json`
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "eslint.workingDirectories": [
    "apps/web",
    "packages/ui",
    "packages/eslint-config",
    "packages/typescript-config"
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true,
    "**/pnpm-lock.yaml": true
  },
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.next/**": true,
    "**/dist/**": true
  }
}
```

#### 2. VS Code Tasks for IWP Development
**File**: `.vscode/tasks.json`
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "IWP: Local Review",
      "type": "shell",
      "command": "powershell",
      "args": ["-ExecutionPolicy", "Bypass", "-File", "scripts/local-review.ps1"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "IWP: Dev Health Check",
      "type": "shell",
      "command": "powershell",
      "args": ["-ExecutionPolicy", "Bypass", "-File", "scripts/dev-health-check.ps1"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "IWP: Start Development",
      "type": "shell",
      "command": "pnpm",
      "args": ["turbo", "dev"],
      "group": "build",
      "isBackground": true,
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "IWP: Run Tests",
      "type": "shell",
      "command": "pnpm",
      "args": ["turbo", "test"],
      "group": "test",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "IWP: Format Code",
      "type": "shell",
      "command": "pnpm",
      "args": ["format"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    }
  ]
}
```

### Phase 4: Continuous Improvement and Metrics

#### 1. Review Metrics Collection
**Script**: `scripts/review-metrics.ps1`
```powershell
# Collect local review metrics and generate reports
param(
    [int]$days = 30,  # Number of days to analyze
    [switch]$export = $false
)

Write-Host "📊 IWP Local Review Metrics Analysis (Last $days days)" -ForegroundColor Cyan

# Git statistics for the specified period
$sinceDate = (Get-Date).AddDays(-$days).ToString("yyyy-MM-dd")
$commits = git log --since="$sinceDate" --pretty=format:"%h|%an|%ad|%s" --date=short

if (-not $commits) {
    Write-Host "No commits found in the last $days days." -ForegroundColor Yellow
    exit 0
}

$commitData = $commits | ForEach-Object {
    $parts = $_ -split '\|'
    [PSCustomObject]@{
        Hash = $parts[0]
        Author = $parts[1]
        Date = $parts[2]
        Message = $parts[3]
    }
}

# Analysis
Write-Host "`n📈 Commit Statistics:" -ForegroundColor Green
Write-Host "Total commits: $($commitData.Count)"
Write-Host "Unique authors: $(($commitData.Author | Sort-Object -Unique).Count)"
Write-Host "Average commits per day: $([math]::Round($commitData.Count / $days, 2))"

# Most active contributors
Write-Host "`n👥 Most Active Contributors:" -ForegroundColor Green
$commitData | Group-Object Author | Sort-Object Count -Descending | Select-Object -First 5 | ForEach-Object {
    Write-Host "  $($_.Name): $($_.Count) commits"
}

# Commit message analysis (basic quality indicators)
Write-Host "`n📝 Commit Message Quality:" -ForegroundColor Green
$conventionalCommits = $commitData | Where-Object { $_.Message -match "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+" }
$conventionalPercentage = [math]::Round(($conventionalCommits.Count / $commitData.Count) * 100, 1)
Write-Host "Conventional commits: $($conventionalCommits.Count)/$($commitData.Count) ($conventionalPercentage%)"

# Recent build status (if available)
Write-Host "`n🏗️  Recent Build Health:" -ForegroundColor Green
try {
    $lastBuildResult = pnpm turbo build 2>&1 | Select-String -Pattern "(ERROR|WARN|SUCCESS)"
    if ($lastBuildResult -match "SUCCESS") {
        Write-Host "✅ Last build: Successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Last build: Failed" -ForegroundColor Red
    }
} catch {
    Write-Host "⚠️  Could not determine build status" -ForegroundColor Yellow
}

# Export data if requested
if ($export) {
    $reportPath = "review-metrics-$(Get-Date -Format 'yyyy-MM-dd').csv"
    $commitData | Export-Csv -Path $reportPath -NoTypeInformation
    Write-Host "`n📁 Metrics exported to: $reportPath" -ForegroundColor Cyan
}

Write-Host "`n✨ Analysis complete!" -ForegroundColor Green
```

## Risk Mitigation and Quality Assurance

### Technical Risk Mitigation
1. **Automation Reliability**: Comprehensive error handling and fallback procedures
2. **Tool Compatibility**: Regular validation of development tool integration
3. **Performance Impact**: Lightweight review processes with minimal overhead
4. **False Positives**: Tuned automated checks to minimize false positives

### Process Risk Mitigation
1. **Developer Adoption**: Clear documentation and training materials
2. **Review Fatigue**: Balanced automation and human review requirements
3. **Time Investment**: Efficient review processes optimized for developer productivity
4. **Consistency**: Standardized checklists and automated validation

### Quality Assurance Framework
1. **Continuous Monitoring**: Regular assessment of review process effectiveness
2. **Feedback Integration**: Developer feedback incorporation for process improvement
3. **Metrics Tracking**: Quantitative measurement of review impact and efficiency
4. **Best Practice Evolution**: Regular updates to review criteria and standards

This comprehensive local code review task definition ensures systematic, high-quality code review processes for the IWP Management System, supporting efficient development workflows while maintaining architectural integrity and domain-specific requirements for university performance management software.