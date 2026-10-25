import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG, TUTORS, SERVICES, COMMITMENTS } from '../content';
import { Head, PageHead, Section, TutorCard, ServiceCard, FAQAccordion, CTASection, HeroArt, FormatTag } from '../components';
import EnquiryForm from '../EnquiryForm';

const ONLINE_SUBJECTS = ['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Chemistry', 'Business', 'Accounting', 'Economics'];

export function Home() {
  return (<>
    <Head title="Personalised tutoring" desc="Personalised tutoring for Cambridge, AKU Board, Sindh Board, school admissions and primary education." />
    <section className="hero"><div className="wrap">
      <div>
        <h1>Learning That Makes Sense. Progress That Lasts.</h1>
        <p style={{ fontSize: '1.15rem' }}>Personalised tutoring for Cambridge, AKU Board, Sindh Board, school admissions, and primary education. Learn with dedicated tutors who understand your goals.</p>
        <div className="acts"><Link className="btn" to="/services">Explore Our Classes</Link><Link className="btn ghost" to="/tutors">Meet Our Tutors</Link></div>
        <div className="strip">{['Cambridge IGCSE & O Level', 'AKU Board', 'Sindh Board', 'Admission Preparation', 'Primary Education'].map(c => <span className="chip" key={c}>{c}</span>)}<span className="chip on">Online</span><span className="chip on">In person</span></div>
        <p className="muted" style={{ fontSize: '.88rem', marginTop: '.8rem' }}>Formats depend on the tutor and service.</p>
      </div>
      <div className="art"><HeroArt /></div>
    </div></section>
    <Section><h2>Explore our services</h2><div className="grid">{SERVICES.map(s => <ServiceCard key={s.key} s={s} />)}</div></Section>
    <Section cls="band"><h2>Why choose {CONFIG.name}?</h2><div className="grid">{COMMITMENTS.map(([i, t, d]) => <div className="card" key={t}><div className="ico tint-v" aria-hidden="true">{i}</div><h3>{t}</h3><p className="muted" style={{ margin: 0 }}>{d}</p></div>)}</div></Section>
    <Section><h2>Meet our tutors</h2><div className="grid">{TUTORS.map(t => <TutorCard key={t.id} t={t} />)}</div></Section>
    <Section cls="band2"><h2>How it works</h2>
      <ol className="steps"><li><h3>Tell us your goals</h3><p className="muted">Share the subject, grade and format you need.</p></li><li><h3>Get matched</h3><p className="muted">We suggest a suitable tutor for your needs.</p></li><li><h3>Begin personalised classes</h3><p className="muted">Class arrangements are confirmed with the relevant tutor.</p></li></ol>
      <p className="muted" style={{ marginTop: '1rem' }}>{CONFIG.name} coordinates enquiries. Schedules and payments are arranged with the tutor.</p></Section>
    <section className="band"><div className="wrap split">
      <div><h2>Online tutoring for international students</h2><p>Cambridge IGCSE and O Level subject support online, with personalised lessons. Scheduling across time zones is subject to tutor availability.</p><Link className="btn" to="/international">Enquire About Online Classes</Link></div>
      <div className="card tint-b"><h3>Online subjects</h3><p style={{ margin: 0 }}>{ONLINE_SUBJECTS.join(', ')}.</p></div></div></section>
    <section><div className="wrap" style={{ maxWidth: 820 }}><h2>Frequently asked questions</h2><FAQAccordion /></div></section>
    <CTASection h="Ready to start?" p="Tell us what you need and we will help you find the right tutor." label="Enquire About Classes" />
  </>);
}
export function Services() {
  const [cur, setCur] = useState(''); const [fmt, setFmt] = useState(''); const [q, setQ] = useState('');
  const rows = useMemo(() => TUTORS.flatMap(t => t.subjects.map(s => ({ t, s }))), []);
  const match = (r: typeof rows[number]) =>
    (!cur || r.t.curricula.includes(cur) || (cur === 'Admission' && /admission/i.test(r.s)) || (cur === 'Primary' && r.t.curricula === 'Primary years')) &&
    (!fmt || r.t.format === fmt) && r.s.toLowerCase().includes(q.toLowerCase());
  const list = rows.filter(match);
  return (<>
    <Head title="Subjects & Services" desc="Browse tutoring by curriculum, subject, grade and format, with the tutor for each." />
    <PageHead h="Subjects & Services" p="Browse by curriculum, subject and format. Each service shows who teaches it." />
    <section style={{ paddingTop: 0 }}><div className="wrap">
      <div className="filters">
        <label>Curriculum<select value={cur} onChange={e => setCur(e.target.value)}><option value="">All</option><option value="Cambridge">Cambridge</option><option value="AKU">AKU Board</option><option value="Sindh">Sindh Board</option><option value="Admission">Admission preparation</option><option value="Primary">Primary</option></select></label>
        <label>Format<select value={fmt} onChange={e => setFmt(e.target.value)}><option value="">All</option><option>Online</option><option>In person</option></select></label>
        <label>Subject<input type="search" placeholder="e.g. Physics" value={q} onChange={e => setQ(e.target.value)} /></label>
      </div>
      <div className="grid">{list.length ? list.map(({ t, s }) => <article className="card" key={t.id + s}><h3>{s}</h3><p className="muted" style={{ margin: 0 }}>{t.curricula}</p><p style={{ margin: '.4rem 0 0' }}><FormatTag f={t.format} /> with {t.name}</p></article>)
        : <p>No matching services. Clear a filter or <Link to="/contact">send an enquiry</Link>.</p>}</div>
    </div></section>
    <CTASection h="Not sure which class fits?" p="Send an enquiry and we will point you to the right tutor." label="Enquire About Classes" />
  </>);
}
export const Tutors = () => (<>
  <Head title="Meet Our Tutors" desc="Meet the six tutors, their subjects, curricula and teaching formats." />
  <PageHead h="Meet Our Tutors" p="Six tutors, each with their own subjects and teaching format." />
  <section style={{ paddingTop: 0 }}><div className="wrap"><div className="grid">{TUTORS.map(t => <TutorCard key={t.id} t={t} full />)}</div></div></section>
</>);
export const About = () => (<>
  <Head title="About Us" desc={`${CONFIG.name} offers personalised, curriculum-specific tutoring from subject specialists.`} />
  <PageHead h={`About ${CONFIG.name}`} p="Quality, personalised academic support, through a team of tutors with different subject specialisations." />
  <section style={{ paddingTop: 0 }}><div className="wrap grid">
    {[['Personalised learning', 'Lessons start from the student’s goals.'], ['Subject expertise', 'Each tutor teaches their own specialist subjects.'], ['Curriculum-specific support', 'Cambridge, AKU Board and Sindh Board are taught with their requirements in mind.'], ['Clear communication with parents', 'Parents know who teaches what, and in which format.'], ['Online for international students', 'Cambridge tutoring available online.']]
      .map(([t, d], i) => <div key={t} className={`card tint-${'pblvb'[i]}`}><h3>{t}</h3><p style={{ margin: 0 }}>{d}</p></div>)}
  </div></section>
  <CTASection h="Talk to us" p="Ask about subjects, tutors and formats." label="Enquire About Classes" />
</>);
export const International = () => (<>
  <Head title="International Students" desc="Online Cambridge IGCSE and O Level tutoring for students outside Pakistan." />
  <PageHead h="International Students" p="Online Cambridge IGCSE and O Level tutoring for students outside Pakistan." />
  <section style={{ paddingTop: 0 }}><div className="wrap">
    <h2>Subjects available online</h2><div className="strip" style={{ margin: '0 0 2rem' }}>{ONLINE_SUBJECTS.map(s => <span className="chip" key={s}>{s}</span>)}</div>
    <h2>Online tutors</h2><div className="grid">{TUTORS.filter(t => t.format === 'Online').map(t => <TutorCard key={t.id} t={t} />)}</div>
    <h2 style={{ marginTop: '3rem' }}>How online classes work</h2>
    <ol className="steps"><li><h3>Send an enquiry</h3><p className="muted">Include your country and time zone.</p></li><li><h3>Agree a schedule</h3><p className="muted">Times are coordinated with the tutor, subject to availability.</p></li><li><h3>Learn online</h3><p className="muted">Platform and payment details: [to be confirmed].</p></li></ol>
    <h2 style={{ marginTop: '3rem' }}>Enquire for online classes</h2><div style={{ maxWidth: 760 }}><EnquiryForm defaultFormat="Online" /></div>
  </div></section>
</>);
export const Contact = () => (<>
  <Head title="Enquire About Classes" desc="Send an enquiry about classes, tutors, fees and schedules." />
  <PageHead h="Enquire About Classes" p="Tell us what you need. Fees and schedules are confirmed with the tutor." />
  <section style={{ paddingTop: 0 }}><div className="wrap split" style={{ alignItems: 'start' }}>
    <EnquiryForm />
    <aside className="card tint-l"><h3>Contact details</h3><p>Email: <span className="ph">{CONFIG.email}</span></p><p>WhatsApp: <span className="ph">{CONFIG.whatsapp}</span></p><p>Instagram: <span className="ph">{CONFIG.instagram}</span></p><p className="muted">In-person venue: [to be confirmed].</p></aside>
  </div></section>
</>);
