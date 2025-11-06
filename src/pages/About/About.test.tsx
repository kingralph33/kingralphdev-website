import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders the main heading', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'About Me', level: 1 })).toBeInTheDocument();
  });

  it('renders the profile image with correct attributes', () => {
    render(<About />);
    const img = screen.getByAltText('Ralph King Jr');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/profile2.webp');
    expect(img).toHaveAttribute('width', '150');
    expect(img).toHaveAttribute('height', '150');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('renders career transition section', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'From Banking to Building Government Systems' })).toBeInTheDocument();
    expect(screen.getByText(/My journey into tech wasn't typical/i)).toBeInTheDocument();
    expect(screen.getByText(/I started in retail banking/i)).toBeInTheDocument();
  });

  it('renders professional summary paragraphs', () => {
    render(<About />);
    expect(screen.getByText(/Today, I'm a software engineer with 5\+ years of experience/i)).toBeInTheDocument();
    expect(screen.getByText(/I currently architect and operate OpenShift infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/While platform infrastructure is my specialty/i)).toBeInTheDocument();
  });

  it('renders personal life section', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'Beyond the Code' })).toBeInTheDocument();
    expect(screen.getByText(/Above all, I'm a husband and a father/i)).toBeInTheDocument();
    expect(screen.getByText(/Ghost of Tsushima/i)).toBeInTheDocument();
  });

  it('renders technical interests column', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'Technical Interests' })).toBeInTheDocument();
    expect(screen.getByText('Platform Engineering')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure as Code')).toBeInTheDocument();
    expect(screen.getByText(/Developer Experience & Tooling/i)).toBeInTheDocument();
  });

  it('renders current focus column', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'Current Focus' })).toBeInTheDocument();
    expect(screen.getByText(/Kubernetes\/OpenShift Optimization/i)).toBeInTheDocument();
    expect(screen.getByText('CI/CD Architecture')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure Automation')).toBeInTheDocument();
  });

  it('renders professional interests column', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'Professional Interests' })).toBeInTheDocument();
    expect(screen.getByText('Developer Productivity')).toBeInTheDocument();
    expect(screen.getByText('Platform Reliability')).toBeInTheDocument();
    expect(screen.getByText('Self-Service Infrastructure')).toBeInTheDocument();
  });

  it('has correct styling classes for responsive layout', () => {
    const { container } = render(<About />);
    const mainContainer = container.querySelector('.max-w-4xl');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('mx-auto');
  });

  it('has divider between sections', () => {
    const { container } = render(<About />);
    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('border-green-600');
    expect(divider).toHaveClass('dark:border-gray-200');
  });
});
