<script lang="ts">
  import type { ActivityHeatmapBin } from '../../../types';
  import { formatCompact, formatUsd } from '../../lib/formatters';

  export let heatmap: ActivityHeatmapBin[];

  const DAYS_TO_SHOW = 30;

  $: recentBins = heatmap.slice(-DAYS_TO_SHOW);
  $: maxTokens = Math.max(...recentBins.map(b => b.totalTokens), 1);

  function getIntensity(tokens: number): number {
    if (tokens === 0) return 0;
    return Math.max(0.15, Math.min(1, Math.log(tokens + 1) / Math.log(maxTokens + 1)));
  }

  function formatDateLabel(dateStr: string): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  let hoveredBin: ActivityHeatmapBin | null = null;
</script>

<section class="mini-heatmap">
  <h3 class="section-label">Last 30 Days</h3>

  <div class="heatmap-grid">
    {#each recentBins as bin}
      <div
        class="cell"
        class:cell--empty={bin.totalTokens === 0}
        style="background-color: {bin.totalTokens > 0 ? `rgba(42, 157, 244, ${getIntensity(bin.totalTokens)})` : 'rgba(255, 255, 255, 0.03)'}"
        title="{formatDateLabel(bin.date)}: {formatCompact(bin.totalTokens)} tokens"
        on:mouseenter={() => hoveredBin = bin}
        on:mouseleave={() => hoveredBin = null}
        role="button"
        tabindex="0"
      ></div>
    {/each}
  </div>

  {#if hoveredBin && hoveredBin.totalTokens > 0}
    <div class="heatmap-detail">
      <span class="detail-date">{formatDateLabel(hoveredBin.date)}</span>
      <span class="detail-tokens">{formatCompact(hoveredBin.totalTokens)} tokens</span>
      {#if hoveredBin.costUsd > 0}
        <span class="detail-cost">{formatUsd(hoveredBin.costUsd)}</span>
      {/if}
      <span class="detail-sessions">{hoveredBin.sessionCount} session{hoveredBin.sessionCount !== 1 ? 's' : ''}</span>
    </div>
  {/if}
</section>

<style>
  .mini-heatmap {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .section-label {
    margin: 0;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
  }
  .heatmap-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2px;
  }
  .cell {
    aspect-ratio: 1;
    border-radius: 2px;
    border: 1px solid transparent;
    transition: transform 0.15s, border-color 0.15s;
    cursor: default;
    min-width: 0;
  }
  .cell:not(.cell--empty):hover {
    transform: scale(1.3);
    border-color: var(--accent-strong);
    z-index: 5;
    position: relative;
    cursor: pointer;
  }
  .cell--empty {
    border-color: var(--surface-line);
  }
  .heatmap-detail {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    align-items: baseline;
    font-size: 10px;
    color: var(--muted);
    padding: var(--spacing-xs) 0;
    animation: detail-in 120ms ease;
  }
  .detail-date {
    font-weight: 600;
    color: var(--text);
  }
  .detail-tokens {
    font-family: var(--code-font);
    color: var(--accent-strong);
    font-weight: 500;
  }
  .detail-cost {
    font-family: var(--code-font);
  }
  @keyframes detail-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
