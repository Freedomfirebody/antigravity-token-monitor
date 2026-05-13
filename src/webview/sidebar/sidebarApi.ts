import { createVsCodeApi } from '../lib/vscodeApi';
import type { SidebarToExtensionMessage } from '../../types';

export const sidebarApi = createVsCodeApi<SidebarToExtensionMessage>();
