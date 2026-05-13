declare function acquireVsCodeApi(): { postMessage(message: unknown): void };

// acquireVsCodeApi() can only be called ONCE per webview.
// Cache the result so both dashboard and sidebar wrappers share it.
let cachedApi: { postMessage(message: unknown): void } | undefined;

function getApi(): { postMessage(message: unknown): void } | undefined {
  if (cachedApi) {
    return cachedApi;
  }
  if (typeof acquireVsCodeApi === 'function') {
    cachedApi = acquireVsCodeApi();
  }
  return cachedApi;
}

class VsCodeApiWrapper<TMessage> {
  postMessage(message: TMessage) {
    const api = getApi();
    if (api) {
      api.postMessage(message);
    } else {
      console.log('Mock postMessage:', message);
    }
  }
}

export function createVsCodeApi<TMessage>(): VsCodeApiWrapper<TMessage> {
  return new VsCodeApiWrapper<TMessage>();
}

// Backwards-compatible default export for the dashboard webview
import type { WebviewToExtensionMessage } from '../../types';
export const vscodeApi = createVsCodeApi<WebviewToExtensionMessage>();
