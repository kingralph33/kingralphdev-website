import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the footer element with correct aria-label', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('aria-label', 'Footer');
  });

  it('displays the copyright text with current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    
    expect(screen.getByText(/Ralph King. All rights reserved./i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`© 2020 - ${currentYear}`))).toBeInTheDocument();
  });

  it('displays copyright text with correct styling classes', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Ralph King. All rights reserved./i);
    expect(copyrightText).toHaveClass('text-center');
    expect(copyrightText).toHaveClass('text-xs');
    expect(copyrightText).toHaveClass('lg:text-sm');
  });

  it('has the correct background and backdrop classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('shadow-lg');
    expect(footer).toHaveClass('mt-auto');
    expect(footer).toHaveClass('bg-white/80');
    expect(footer).toHaveClass('backdrop-blur-sm');
    expect(footer).toHaveClass('footer-dark-gradient');
  });

  it('updates year dynamically', () => {
    // Mock the date to a specific year
    const mockDate = new Date('2024-01-01');
    vi.setSystemTime(mockDate);
    
    render(<Footer />);
    expect(screen.getByText(/© 2020 - 2024 Ralph King. All rights reserved./i)).toBeInTheDocument();
    
    // Restore real timers
    vi.useRealTimers();
  });
});
