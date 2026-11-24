// Line icons that draw themselves when their row scrolls into view (class .is-in on the row).
const paths = {
  oil: <><path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10z" /><path d="M9 14a3 3 0 0 0 3 3" /></>,
  brakes: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
  diag: <><path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l4-6" /><circle cx="12" cy="16" r="1.4" /></>,
  maint: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4M9 15l2 2 4-4" /></>,
  safety: <><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5L16 9.5" /></>,
}

export default function ServiceIcon({ id }) {
  return (
    <svg className="s-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[id]}
    </svg>
  )
}
