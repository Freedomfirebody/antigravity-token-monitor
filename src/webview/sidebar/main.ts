import { mount } from 'svelte';
import type { ExtensionToSidebarMessage } from '../../types';
import SidebarApp from './SidebarApp.svelte';
import { dashboardState } from '../lib/dashboardStore';
import { sidebarApi } from './sidebarApi';

const appContainer = document.getElementById('sidebar-app');

if (!appContainer) {
  throw new Error('Sidebar app container not found.');
}

window.addEventListener('message', (event: MessageEvent<ExtensionToSidebarMessage>) => {
  const message = event.data;
  if (message.type === 'sidebar/state') {
    dashboardState.set(message.payload);
  }
});

mount(SidebarApp, {
  target: appContainer
});

sidebarApi.postMessage({ type: 'sidebar/ready' });
