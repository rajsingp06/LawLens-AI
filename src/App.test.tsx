import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

describe('Application UI Tests', () => {
  it('renders the Landing Page correctly', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Understand Your Legal Documents/i)).toBeInTheDocument();
  });

  it('renders the Dashboard overview correctly', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Good morning/i)).toBeInTheDocument();
  });
});
