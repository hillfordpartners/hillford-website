// Shared icon paths keyed by service slug, used by ServiceCard and the service detail page.
export const serviceIcons: Record<string, string> = {
  accounting:
    'M9 17H7m2-4H7m2-4H7m10 8h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2m0 0h6m-6 0v-4m6 4v-4',
  bookkeeping:
    'M4 6h16M4 10h16M4 14h10M4 18h6m8-2l-3 3-1.5-1.5',
  'audit-support':
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'business-advisory':
    'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
  payroll:
    'M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  invoicing:
    'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
  'software-solutions':
    'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
};

export const defaultServiceIcon = 'M4 19h16M7 16V8m5 8V5m5 11v-6';

export function iconFor(slug: string): string {
  return serviceIcons[slug] ?? defaultServiceIcon;
}

// Icon paths for the trust-stats grid shown on service page heroes.
export const statIcons = [
  'M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m6-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 0a4 4 0 1 0-3.75-5.5',
  'M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07-1.41 1.41M6.34 17.66l-1.41 1.41m12.14 0-1.41-1.41M6.34 6.34 4.93 4.93',
  'M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  'M9 12l2 2 4-4m5 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
];
