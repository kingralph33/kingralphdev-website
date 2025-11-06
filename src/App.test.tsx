import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the MainLayout wrapper', () => {
    render(<App />);
    // MainLayout includes the main element
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeInTheDocument();
  });
});

describe('Home Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders intro section with name and title', () => {
    expect(screen.getByRole('heading', { name: 'Ralph King Jr', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Software Engineer', level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Building cloud-native infrastructure and developer tooling/i)).toBeInTheDocument();
  });

  it('renders technology expertise section', () => {
    expect(screen.getByRole('heading', { name: 'Technology Expertise' })).toBeInTheDocument();
  });

  it('renders platform & infrastructure technologies', () => {
    expect(screen.getByRole('heading', { name: 'Platform & Infrastructure' })).toBeInTheDocument();
    expect(screen.getByText('Kubernetes/OpenShift')).toBeInTheDocument();
    expect(screen.getByText('CI/CD Automation')).toBeInTheDocument();
    // Infrastructure as Code appears multiple times
    expect(screen.getAllByText('Infrastructure as Code')[0]).toBeInTheDocument();
  });

  it('renders cloud & devops technologies', () => {
    expect(screen.getByRole('heading', { name: 'Cloud & DevOps' })).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Azure')).toBeInTheDocument();
    expect(screen.getByText('Terraform')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    // Azure DevOps appears multiple times
    expect(screen.getAllByText('Azure DevOps')[0]).toBeInTheDocument();
  });

  it('renders development & tooling technologies', () => {
    expect(screen.getByRole('heading', { name: 'Development & Tooling' })).toBeInTheDocument();
    // These technologies appear multiple times, so use getAllByText
    expect(screen.getAllByText('Python')[0]).toBeInTheDocument();
    expect(screen.getAllByText('TypeScript')[0]).toBeInTheDocument();
    expect(screen.getAllByText('JavaScript')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Node.js')[0]).toBeInTheDocument();
    expect(screen.getByText('Developer Tooling')).toBeInTheDocument();
  });

  it('renders recent impact section', () => {
    expect(screen.getByRole('heading', { name: 'Recent Impact' })).toBeInTheDocument();
  });

  it('renders OpenShift platform infrastructure project', () => {
    expect(screen.getByRole('heading', { name: 'OpenShift Platform Infrastructure' })).toBeInTheDocument();
    expect(screen.getByText(/Architected and operate container platform serving 7,500\+ users/i)).toBeInTheDocument();
  });

  it('renders Enterprise DevOps Migration project', () => {
    expect(screen.getByRole('heading', { name: 'Enterprise DevOps Migration' })).toBeInTheDocument();
    expect(screen.getByText(/Led platform migration from TFS to Azure DevOps/i)).toBeInTheDocument();
    expect(screen.getByText(/reduced release cycles by 70%/i)).toBeInTheDocument();
  });

  it('displays technology badges with correct styling', () => {
    const badge = screen.getByText('Kubernetes/OpenShift');
    expect(badge).toHaveClass('px-3');
    expect(badge).toHaveClass('py-1.5');
    expect(badge).toHaveClass('rounded-full');
  });

  it('displays project cards with hover effects', () => {
    const projectCard = screen.getByText('OpenShift Platform Infrastructure').closest('div');
    expect(projectCard).toHaveClass('p-5');
    expect(projectCard).toHaveClass('border-2');
    expect(projectCard).toHaveClass('rounded-lg');
    expect(projectCard).toHaveClass('hover:shadow-lg');
  });
});
