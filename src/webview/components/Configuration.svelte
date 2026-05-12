<script lang="ts">
  import type { DashboardState } from '../../types';

  export let state: DashboardState;
</script>

<article class="analytical-card">
  <div class="card-header">
    <h2 class="section-title">Configuration</h2>
    <div class="card-meta">Workspace Settings</div>
  </div>

  <div class="card-body">
    <div class="config-card">
      <div class="config-item">
        <div class="config-label">Session Root</div>
        <div class="config-value mono" title={state.rootPath}>{state.rootPath}</div>
      </div>

      <div class="config-item">
        <div class="config-label">RPC Export</div>
        <div class="config-value">{state.config.useRpcExport ? 'Enabled' : 'Disabled'}</div>
      </div>

      <div class="config-item">
        <div class="config-label">Step Export</div>
        <div class="config-value">{state.config.exportStepsJsonl ? 'Enabled' : 'Disabled'}</div>
      </div>
    </div>

    {#if !state.config.exportStepsJsonl}
      <div class="info-card" role="status" aria-live="polite">
        <div class="info-title">Step export: metadata only</div>
        <div class="info-copy">
          `exportStepsJsonl` is off — steps are exported with metadata only (role, timestamp, model). Message counts work normally. Enable to include full conversation text.
        </div>
      </div>
    {/if}
  </div>
</article>

<style>
  .analytical-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: var(--shadow-elevated);
    flex: 1;
  }
  .card-header {
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.01);
  }
  .section-title {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .card-meta {
    font-size: 11px;
    color: var(--muted);
  }
  .card-body {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .config-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--surface-line);
    border-radius: 8px;
    padding: var(--spacing-sm);
  }

  .config-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
  }
  .config-item:last-child {
    margin-bottom: 0;
  }
  .config-label {
    font-size: 10px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .config-value {
    font-size: 10px;
    color: var(--text);
    background: rgba(0, 0, 0, 0.2);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 4px;
    border: 1px solid var(--surface-line);
    word-break: break-all;
  }
  .mono {
    font-family: var(--code-font);
  }
  .info-card {
    border: 1px solid rgba(130, 170, 227, 0.3);
    background: rgba(130, 170, 227, 0.08);
    border-radius: 8px;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  .info-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .info-copy {
    font-size: 11px;
    line-height: 1.5;
    color: var(--text);
    word-break: break-word;
  }
</style>
