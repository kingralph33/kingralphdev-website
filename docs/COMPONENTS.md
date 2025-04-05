# Component Documentation

This document provides an overview of the key components used in the kingralphdev-react project.

## Layout Components

### MainLayout

`src/layouts/MainLayout/MainLayout.tsx`

The main layout wrapper that provides consistent page structure including the navbar and footer.

**Props:**
- `children`: React nodes to be rendered within the layout

**Usage:**
```tsx
<MainLayout>
  <YourPageContent />
</MainLayout>
```

## Common Components

### Navbar

`src/components/common/Navbar/Navbar.tsx`

The primary navigation component that appears at the top of every page.

**Features:**
- Responsive design with mobile hamburger menu
- Active link highlighting
- Smooth animations

### Footer

`src/components/common/Footer/Footer.tsx`

Footer component that appears at the bottom of every page.

**Features:**
- Social media links
- Copyright information
- Secondary navigation links

## Resume Components

### ResumeHeader

`src/components/resume/ResumeHeader.tsx`

The header section of the resume page with personal information.

**Props:**
- `name`: String
- `title`: String
- `contactInfo`: Contact information object

### ResumeJobEntry

`src/components/resume/ResumeJobEntry.tsx`

Component to display a single job entry in the work experience section.

**Props:**
- `company`: String
- `position`: String
- `startDate`: String
- `endDate`: String
- `description`: String or JSX
- `achievements`: Array of strings or JSX elements

### ResumeSummary

`src/components/resume/ResumeSummary.tsx`

Professional summary section for the resume.

**Props:**
- `summary`: String or JSX content

### ResumeTechnicalSkills

`src/components/resume/ResumeTechnicalSkills.tsx`

Component to display technical skills, grouped by category.

**Props:**
- `skills`: Array of skill objects with categories

### ResumeEducation

`src/components/resume/ResumeEducation.tsx`

Educational history section of the resume.

**Props:**
- `education`: Array of education entries

### ResumeExperience

`src/components/resume/ResumeExperience.tsx`

Work experience section of the resume that renders multiple job entries.

**Props:**
- `experience`: Array of job experience objects

## Page Components

### About

`src/pages/About/About.tsx`

The About page component with personal and professional information.

### Resume

`src/pages/Resume/Resume.tsx`

The Resume page component that integrates all resume-related components.

## Best Practices

1. Keep components small and focused on a single responsibility
2. Use TypeScript interfaces for all props
3. Include comprehensive tests for each component
4. Use semantic HTML elements for better accessibility
5. Keep presentation logic in CSS/Tailwind and behavioral logic in the component