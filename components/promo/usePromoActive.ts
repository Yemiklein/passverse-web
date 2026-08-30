'use client';

import { useSyncExternalStore } from 'react';
import { isSeptemberPromoActive } from '@/lib/promo';

// Promo state never changes within a page view, so there is nothing to
// subscribe to — the empty subscribe keeps useSyncExternalStore happy.
const subscribe = () => () => {};

/**
 * Returns whether the September promo is live, evaluated against the visitor's
 * own clock. The server snapshot is always `false`, so first paint matches on
 * server and client (no hydration mismatch); the client snapshot then reflects
 * the real date, so the promo appears on its own once in range — no redeploy.
 */
export function usePromoActive(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isSeptemberPromoActive(), // client
    () => false,                    // server
  );
}
