import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import SidebarApp from './SidebarApp.svelte';
import { dashboardState } from '../lib/dashboardStore';
import { mockDashboardState } from '../test/fixtures/dashboardState.fixture';

describe('SidebarApp', () => {
  beforeEach(() => {
    dashboardState.set(null);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders loading state initially', () => {
    const { getByText } = render(SidebarApp);
    expect(getByText('Loading token data...')).toBeTruthy();
  });

  it('renders sidebar shell with all sections when state is provided', () => {
    dashboardState.set(mockDashboardState);
    const { getByText, container } = render(SidebarApp);

    // Header
    expect(getByText('Token Overview')).toBeTruthy();

    // KPI section
    expect(getByText('Total Tokens')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Messages')).toBeTruthy();
    expect(getByText('Cost')).toBeTruthy();

    // Token Breakdown section
    expect(getByText('Token Breakdown')).toBeTruthy();
    expect(getByText('Input')).toBeTruthy();
    expect(getByText('Output')).toBeTruthy();

    // Model Usage section
    expect(getByText('Model Usage')).toBeTruthy();
    expect(getByText('mock-model')).toBeTruthy();

    // Heatmap section
    expect(getByText('Last 30 Days')).toBeTruthy();

    // Session List section
    expect(getByText('Sessions')).toBeTruthy();
    expect(getByText('Session 1')).toBeTruthy();

    // Sync Status section
    expect(getByText('Status')).toBeTruthy();

    // Verify sidebar-specific structure
    const shell = container.querySelector('.sidebar-shell');
    expect(shell).toBeTruthy();
    const header = container.querySelector('.sidebar-header');
    expect(header).toBeTruthy();
  });

  it('shows active session count in session header', () => {
    dashboardState.set(mockDashboardState);
    const { getByText } = render(SidebarApp);
    expect(getByText('1 active')).toBeTruthy();
  });

  it('displays cost when pricing is available', () => {
    dashboardState.set(mockDashboardState);
    const { getByText } = render(SidebarApp);
    // mockDashboardState has pricing.totalCostUsd = 0.0041
    expect(getByText('$0.0041')).toBeTruthy();
  });

  it('shows estimated session indicator', () => {
    dashboardState.set(mockDashboardState);
    const { getByText } = render(SidebarApp);
    // mockDashboardState has 1 estimated session
    expect(getByText(/1 estimated/)).toBeTruthy();
  });

  it('shows archived sessions info', () => {
    dashboardState.set(mockDashboardState);
    const { getByText } = render(SidebarApp);
    expect(getByText(/1 archived/)).toBeTruthy();
  });
});
