import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LandingAtlas from './LandingAtlas';

describe('LandingAtlas', () => {
  test.each([
    ['volcano', 'Volcano / Offensive security', 'Pentesting experience shaped by mapping attack surfaces, validating risk, and explaining practical remediation.'],
    ['fjord', 'Fjord / ICT engineering', 'ICT engineering work that connects reliable systems, clear interfaces, and the people who depend on them.'],
    ['homelab', 'Homelab / Infrastructure lab', 'Experimentation with self-hosted infrastructure, networking, automation, and the operational habits behind resilient services.'],
  ])('opens the %s narrative and returns to the overview', (id, title, narrative) => {
    render(<LandingAtlas />);

    fireEvent.click(screen.getByRole('button', { name: new RegExp(`Enter ${id}`, 'i') }));

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByText(narrative)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /return to atlas/i }));

    expect(screen.getByRole('heading', { name: /field atlas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(`Enter ${id}`, 'i') })).toBeInTheDocument();
  });

  test('renders readable fallback controls when WebGL is unavailable', () => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

    render(<LandingAtlas />);

    expect(screen.getByText(/interactive 3D view is unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter volcano/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter fjord/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter homelab/i })).toBeInTheDocument();

    HTMLCanvasElement.prototype.getContext = getContext;
  });

  test('renders readable fallback controls when reduced motion is requested', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    render(<LandingAtlas />);

    expect(screen.getByText(/motion is reduced/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter volcano/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter fjord/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enter homelab/i })).toBeInTheDocument();
  });
});
