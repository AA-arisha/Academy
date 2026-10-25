import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CONFIG, NAV, FAQS, type Tutor, type Service } from './content';

export function Head({ title, desc }: { title: string; desc: string }) {
  useEffect(() => {
    document.title = `${title} | ${CONFIG.name}`;
    document.querySelector('meta[name=description]')?.setAttribute('content', desc);
  }, [title, desc]);
  return null;
}
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="wrap site-nav">
        <Link className="logo" to="/" onClick={() => setOpen(false)}>
          <i aria-hidden="true" />
          {CONFIG.name}
        </Link>
        <nav className="site-navigation" aria-label="Main navigation">
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <ul id="site-menu" className={`site-nav-links${open ? ' is-open' : ''}`}>
            {NAV.map(([to, label]) => (
              <li key={to}>
                <NavLink className="site-nav-link" to={to} end>
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="site-nav-cta">
              <Link className="btn" to="/contact">Enquire About Classes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer><div className="wrap">
      <div className="grid">
        <div><div className="logo" style={{ marginBottom: '.6rem' }}><i aria-hidden="true" />{CONFIG.name}</div><p className="muted">Personalised tutoring from subject-specific tutors.</p></div>
        <div><h3>Explore</h3><ul>{NAV.map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>
        <div><h3>Contact</h3><ul>
          <li>Email: <span className="ph">{CONFIG.email}</span></li>
          <li>WhatsApp: <span className="ph">{CONFIG.whatsapp}</span></li>
          <li>Instagram: <span className="ph">{CONFIG.instagram}</span></li></ul></div>
      </div>
      <p className="muted" style={{ maxWidth: 'none' }}><strong>Privacy:</strong> Details you submit are used only to respond to your enquiry. [Privacy policy placeholder – to be confirmed.] © {CONFIG.name}</p>
    </div></footer>
  );
}
export const PageHead = ({ h, p }: { h: string; p: string }) => (
  <section className="hero" style={{ paddingBlock: 'clamp(2.5rem,6vw,4.5rem)' }}><div className="wrap" style={{ display: 'block' }}>
    <h1 style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}>{h}</h1><p>{p}</p></div></section>
);
export const FormatTag = ({ f }: { f: string }) => <span className={`tag ${f === 'Online' ? '' : 'in'}`}>{f}</span>;
export function TutorCard({ t, full }: { t: Tutor; full?: boolean }) {
  return (
    <article className="card">
      <div className={`av tint-${t.tint}`} aria-hidden="true">{t.name[0]}</div>
      <h3>{t.name}</h3>
      <p style={{ margin: 0 }}><FormatTag f={t.format} /></p>
      <p className="muted" style={{ margin: '.3rem 0 0', fontSize: '.92rem' }}>{t.curricula}</p>
      <ul>{t.subjects.map(s => <li key={s}>{s}</li>)}</ul>
      {full ? (<>
        <p className="ph" style={{ fontSize: '.88rem' }}>Photo, bio, qualifications and experience: [to be added]</p>
        <Link className="btn" to={`/contact?tutor=${t.name}`}>Enquire about {t.name}’s classes</Link></>
      ) : <Link className="btn ghost" to="/tutors">View profile</Link>}
    </article>
  );
}
export const ServiceCard = ({ s }: { s: Service }) => (
  <article className="card">
    <div className={`ico tint-${s.tint}`} aria-hidden="true">{s.icon}</div>
    <h3>{s.title}</h3><p className="muted" style={{ margin: 0 }}>{s.desc}</p>
    <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
    <Link className="btn ghost" to="/services">View details</Link>
  </article>
);
export const FAQAccordion = () => <>{FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</>;
export const CTASection = ({ h, p, label }: { h: string; p: string; label: string }) => (
  <section><div className="wrap"><div className="cta"><h2>{h}</h2><p>{p}</p><Link className="btn" to="/contact">{label}</Link></div></div></section>
);
export const Section = ({ cls = '', children }: { cls?: string; children: ReactNode }) => <section className={cls}><div className="wrap">{children}</div></section>;
export const HeroArt = () => (
  <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of stacked books, a pencil and a star">
    <circle cx="210" cy="200" r="170" fill="var(--lav)" /><circle cx="310" cy="95" r="46" fill="var(--pink)" /><circle cx="85" cy="310" r="38" fill="var(--blue)" />
    <g className="float"><rect x="90" y="250" width="230" height="44" rx="8" fill="var(--prime)" /><rect x="110" y="206" width="200" height="44" rx="8" fill="var(--violet)" /><rect x="100" y="162" width="215" height="44" rx="8" fill="var(--pink)" /></g>
    <g transform="rotate(35 300 140)"><rect x="285" y="60" width="26" height="140" rx="4" fill="var(--blue)" /><polygon points="285,200 311,200 298,232" fill="var(--pink)" /><rect x="285" y="60" width="26" height="22" rx="4" fill="var(--navy)" /></g>
    <path d="M105 110l9 22 24 2-18 16 6 24-21-13-21 13 6-24-18-16 24-2z" fill="var(--prime)" />
  </svg>
);
