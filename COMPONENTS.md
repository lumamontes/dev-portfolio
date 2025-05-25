# Portfolio Components Structure

This document outlines the componentized structure of the portfolio after refactoring the large index, projects, contact, and about files.

## Shared Components

### 1. **PageBackground.astro**
- **Location**: `src/components/shared/PageBackground.astro`
- **Purpose**: Unified background component with variant support for different pages
- **Props**: `variant?: 'default' | 'projects' | 'contact' | 'about'`
- **Features**:
  - Animated scanlines for retro terminal effect
  - Page-specific gradient colors
  - Reduced motion support
  - Consistent base styling across all pages

### 2. **PageHeader.astro**
- **Location**: `src/components/shared/PageHeader.astro`
- **Purpose**: Reusable page header component with flexible layout options
- **Props**: `title`, `description`, `emoji?`, `centered?`, `children?`
- **Features**:
  - Flexible layout (left-aligned or centered)
  - Optional emoji support
  - Slot for additional content
  - Consistent typography and spacing

### 3. **GlobalStyles.astro**
- **Location**: `src/components/GlobalStyles.astro`
- **Purpose**: Contains global styles that apply across the entire application
- **Features**:
  - Custom scrollbar styling
  - Pulse animations
  - Focus improvements for accessibility
  - Mobile responsive styles
  - Reduced motion preferences

### 4. **BentoGrid.astro** (Enhanced)
- **Location**: `src/components/BentoGrid.astro`
- **Purpose**: Renders the bento box grid layout with support for component-based items
- **Features**:
  - Support for custom components via `component` property
  - Fallback to `customContent` or basic description
  - Radio player integration
  - Responsive grid layout

## Bento Item Components

### 5. **HeroBentoItem.astro**
- **Location**: `src/components/bento/HeroBentoItem.astro`
- **Purpose**: Main hero section with developer image and current time
- **Props**: `title`, `description`, `currentTime`

### 6. **AboutMeBentoItem.astro**
- **Location**: `src/components/bento/AboutMeBentoItem.astro`
- **Purpose**: About me section with animated GIF
- **Props**: `description`

### 7. **CoffeeBentoItem.astro**
- **Location**: `src/components/bento/CoffeeBentoItem.astro`
- **Purpose**: Coffee break visual with GIF
- **Props**: None (static content)

### 8. **LearningBentoItem.astro**
- **Location**: `src/components/bento/LearningBentoItem.astro`
- **Purpose**: Currently learning technologies list
- **Props**: None (static content)

## Projects Page Components

### 9. **ProjectCard.astro**
- **Location**: `src/components/projects/ProjectCard.astro`
- **Purpose**: Individual project card component
- **Props**: `project`, `lang`
- **Features**:
  - Hover effects and animations
  - Technology tags display
  - Responsive image handling
  - External link icon

### 10. **ProjectsGrid.astro**
- **Location**: `src/components/projects/ProjectsGrid.astro`
- **Purpose**: Grid container for projects with section header
- **Props**: `projects`, `lang`, `allProjectsText`, `totalProjects`
- **Features**:
  - Responsive grid layout
  - Project count display
  - Integration with filtering system

### 11. **ProjectsStyles.astro**
- **Location**: `src/components/projects/ProjectsStyles.astro`
- **Purpose**: Styles and scripts specific to the projects page
- **Features**:
  - Filter button styling
  - Featured card enhancements
  - Client-side filtering functionality
  - Keyboard navigation support
  - Smooth scrolling

## Contact Page Components

### 12. **ContactInfo.astro**
- **Location**: `src/components/contact/ContactInfo.astro`
- **Purpose**: Contact information badges (response time, availability)
- **Props**: `responseTimeLabel`, `responseTime`, `remoteWorldwideLabel`

### 13. **SocialLinksSection.astro**
- **Location**: `src/components/contact/SocialLinksSection.astro`
- **Purpose**: Social media links section
- **Props**: `title`, `socialLinks`
- **Features**:
  - Integration with existing SocialLinkCard component
  - Dynamic social link mapping

### 14. **QuickInfoCard.astro**
- **Location**: `src/components/contact/QuickInfoCard.astro`
- **Purpose**: Quick contact information card
- **Props**: Multiple labels and values for location, response time, languages, availability
- **Features**:
  - Structured information display
  - Color-coded status indicators

### 15. **ContactStyles.astro**
- **Location**: `src/components/contact/ContactStyles.astro`
- **Purpose**: Styles specific to the contact page
- **Features**:
  - Form validation styling
  - Custom scrollbar
  - Mobile optimizations
  - Reduced motion support

## About Page Components

### 16. **AboutHeader.astro**
- **Location**: `src/components/about/AboutHeader.astro`
- **Purpose**: Custom header for about page with location and experience info
- **Props**: `title`, `description`, `location`, `experience`
- **Features**:
  - Specialized layout for about page
  - Location and experience badges
  - Consistent typography

### 17. **SkillCard.astro**
- **Location**: `src/components/about/SkillCard.astro`
- **Purpose**: Individual skill category card (frontend/backend)
- **Props**: `title`, `emoji`, `skills`, `color`
- **Features**:
  - Color-coded themes (emerald/blue)
  - Skill rating dots
  - Hover effects
  - Responsive design

### 18. **SkillsSection.astro**
- **Location**: `src/components/about/SkillsSection.astro`
- **Purpose**: Skills section container with grid layout
- **Props**: `title`, `frontendTitle`, `backendTitle`, `frontendSkills`, `backendSkills`
- **Features**:
  - Responsive grid layout
  - Section header with gradient line
  - Integration with SkillCard components

### 19. **ExperienceSection.astro**
- **Location**: `src/components/about/ExperienceSection.astro`
- **Purpose**: Experience timeline section
- **Props**: `title`, `subtitle`, `experiences`
- **Features**:
  - Timeline visualization
  - Integration with existing ExperienceCard
  - Gradient timeline line

### 20. **AboutStyles.astro**
- **Location**: `src/components/about/AboutStyles.astro`
- **Purpose**: Styles specific to the about page
- **Features**:
  - Timeline enhancements
  - Skill rating animations
  - Custom scrollbar
  - Mobile optimizations
  - Reduced motion support

## Data Layer

### 21. **bentoItems.ts**
- **Location**: `src/data/bentoItems.ts`
- **Purpose**: Centralized configuration for all bento box items
- **Features**:
  - Type-safe interface for bento items
  - Function that generates items based on translations
  - Support for both component-based and content-based items
  - Easy to maintain and extend

### 22. **projects.ts**
- **Location**: `src/data/projects.ts`
- **Purpose**: Project data with type definitions
- **Features**:
  - Type-safe Project interface
  - Multilingual descriptions
  - Image URLs and metadata
  - Technology stack information

## Refactored Pages

### 23. **index.astro** (Simplified)
- **Location**: `src/pages/[lang]/index.astro`
- **Purpose**: Main page entry point, now much cleaner and focused
- **Features**:
  - Uses shared BackgroundEffects and GlobalStyles
  - Imports and orchestrates bento components
  - Minimal logic - just translation setup and time generation

### 24. **projects.astro** (Simplified)
- **Location**: `src/pages/[lang]/projects.astro`
- **Purpose**: Projects page entry point, componentized
- **Features**:
  - Uses shared PageBackground and PageHeader
  - Clean component orchestration
  - Minimal logic - just data preparation

### 25. **contact.astro** (Simplified)
- **Location**: `src/pages/[lang]/contact.astro`
- **Purpose**: Contact page entry point, componentized
- **Features**:
  - Uses shared PageBackground and PageHeader
  - Modular contact-specific components
  - Clean separation of concerns

### 26. **about.astro** (Simplified)
- **Location**: `src/pages/[lang]/about.astro`
- **Purpose**: About page entry point, fully componentized
- **Features**:
  - Uses shared PageBackground
  - Custom AboutHeader for specialized layout
  - Modular skills and experience sections
  - Clean component orchestration

## Usage Examples

### Index Page
```astro
<Layout>
  <BackgroundEffects />
  <GlobalStyles />
  <BentoGrid items={bentoItems} currentTime={currentTime} />
</Layout>
```

### Projects Page
```astro
<Layout>
  <PageBackground variant="projects" />
  <div class="relative z-10">
    <PageHeader title={t('nav.projects')} description={t('projects.description')} emoji="🤓" />
    <ProjectsGrid projects={projects} lang={lang} allProjectsText={t('projects.all')} totalProjects={projects.length} />
  </div>
  <ProjectsStyles />
</Layout>
```

### Contact Page
```astro
<Layout>
  <PageBackground variant="contact" />
  <div class="relative z-10">
    <PageHeader title={t('nav.contact')} description={t('contact.description')} emoji="🤝" centered={true}>
      <ContactInfo responseTimeLabel={t('contact.responseTime')} responseTime={responseTime} remoteWorldwideLabel={t('contact.remoteWorldwide')} />
    </PageHeader>
    <SocialLinksSection title={t('contact.social.title')} socialLinks={socialLinks} />
    <QuickInfoCard title={t('contact.quickInfo')} ... />
  </div>
  <ContactStyles />
</Layout>
```

### About Page
```astro
<Layout>
  <PageBackground variant="about" />
  <div class="relative z-10">
    <AboutHeader title={t('about.title')} description={t('about.description')} location={t('presentation.location')} experience={t('presentation.experience')} />
    <section class="py-12 space-y-16">
      <SkillsSection title={a('skills.title')} frontendTitle={t('about.skills.frontend')} backendTitle={t('about.skills.backend')} frontendSkills={about[lang]['frontend.skills']} backendSkills={about[lang]['backend.skills']} />
      <ExperienceSection title={t('experience.title')} subtitle={t('experience.subtitle')} experiences={experiences[lang].items} />
    </section>
  </div>
  <AboutStyles />
</Layout>
```

## Benefits of This Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Shared components reduce code duplication across all pages
3. **Consistency**: Unified styling and behavior patterns throughout the portfolio
4. **Testability**: Smaller components are easier to test and debug
5. **Performance**: Better code splitting and loading optimization
6. **Developer Experience**: Easier to find and modify specific functionality
7. **Type Safety**: Better TypeScript support with defined interfaces
8. **Scalability**: Easy to add new pages following established patterns
9. **Modularity**: Each page section can be developed and maintained independently
10. **Code Reduction**: Significant reduction in page file sizes (Index: 360→30 lines, Projects: 321→37 lines, Contact: 186→67 lines, About: 208→47 lines)

## Adding New Components

### For Shared Components:
1. Create components in `src/components/shared/`
2. Design with reusability in mind
3. Use props for customization
4. Add proper TypeScript interfaces
5. Update existing pages to use shared components

### For Page-Specific Components:
1. Create page-specific folders in `src/components/`
2. Follow the pattern: Background, Header, Content, Styles
3. Import and use in the respective page
4. Keep the main page file minimal and focused on orchestration

### For New Pages:
1. Use shared PageBackground and PageHeader components
2. Create page-specific components as needed
3. Follow the established patterns for consistency
4. Add translation keys and data structures as required

This structure makes the codebase much more maintainable, consistent, and easier to extend with new features while reducing code duplication across pages. 