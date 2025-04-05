# Accessibility Documentation

This document outlines the accessibility features and standards implemented in the kingralphdev-react portfolio website.

## Accessibility Standards

This website aims to conform to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA**. I follow these principles:

1. **Perceivable** - Information and user interface components must be presentable to users in ways they can perceive
2. **Operable** - User interface components and navigation must be operable
3. **Understandable** - Information and the operation of the user interface must be understandable
4. **Robust** - Content must be robust enough to be interpreted by a wide variety of user agents

## Implemented Features

### Semantic HTML
- Proper heading hierarchy (`h1` through `h6`)
- Appropriate landmark elements (`header`, `main`, `nav`, `footer`)
- Semantic elements used where appropriate (`article`, `section`, etc.)

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states are clearly visible
- Navigation follows a logical tab order
- No keyboard traps

### Color and Contrast
- Text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Color is not used as the only means of conveying information
- Dark mode provides alternative color schemes for users with different needs

### Screen Reader Support
- All images have descriptive `alt` text
- ARIA attributes used when needed
- Dynamic content changes are announced to screen readers
- Forms have proper labels and error messages

### Responsive Design
- Content is accessible at various zoom levels (up to 200%)
- Layout adapts to different screen sizes without loss of content or functionality
- Content is readable at small viewport sizes

### Reduced Motion
- Respects the `prefers-reduced-motion` setting with the CSS media query
- Essential animations are subtle and non-distracting

## Testing Methodology

I test accessibility using a combination of:

1. **Automated Testing**
   - Lighthouse Accessibility audits
   - axe DevTools
   - jest-axe for component-level testing

2. **Manual Testing**
   - Keyboard-only navigation testing
   - Screen reader testing (NVDA, VoiceOver)
   - Testing with various zoom levels and viewport sizes

## Known Issues and Roadmap

- Future implementation of skip-to-content links
- Continued improvements to focus management in complex interactive components
- Enhanced ARIA descriptions for complex visualizations

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)