import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONFIG } from './content';

type Key = 'name' | 'email' | 'phone' | 'country' | 'board' | 'grade' | 'subject' | 'format' | 'schedule' | 'message';
type Values = Record<Key, string>;
const REQUIRED: Key[] = ['name', 'email', 'phone', 'country', 'board', 'subject', 'format'];
const BOARDS = ['Cambridge IGCSE / O Level', 'AKU Board', 'Sindh Board', 'School admission', 'Primary'];

export default function EnquiryForm({ defaultFormat = '' }: { defaultFormat?: string }) {
  const [params] = useSearchParams();
  const tutor = params.get('tutor');
  const [v, setV] = useState<Values>({ name: '', email: '', phone: '', country: '', board: '', grade: '', subject: '', format: defaultFormat, schedule: '', message: tutor ? `I'd like to enquire about ${tutor}'s classes.` : '' });
  const [err, setErr] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail' | 'unconfigured'>('idle');
  const set = (k: Key) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const next: Partial<Record<Key, string>> = {};
    REQUIRED.forEach(k => { if (!v[k].trim()) next[k] = 'Please fill in this field.'; });
    if (!next.email && !/^\S+@\S+\.\S+$/.test(v.email)) next.email = 'Enter a valid email address.';
    setErr(next);
    const first = Object.keys(next)[0];
    if (first) { document.getElementById(first)?.focus(); return; }
    if (!CONFIG.formEndpoint) { setStatus('unconfigured'); return; }
    setStatus('sending');
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) });
      if (!r.ok) throw new Error();
      setStatus('ok');
    } catch { setStatus('fail'); }
  }
  const field = (k: Key, label: string, opts: { type?: string; options?: string[]; area?: boolean; full?: boolean } = {}) => {
    const req = REQUIRED.includes(k);
    const common = { id: k, value: v[k], onChange: set(k), required: req, 'aria-invalid': !!err[k], 'aria-describedby': `${k}-e` };
    return (
      <div className={opts.full ? 'full' : ''}>
        <label htmlFor={k}>{label}{req ? ' *' : ''}</label>
        {opts.options ? <select {...common}><option value="">Select</option>{opts.options.map(o => <option key={o}>{o}</option>)}</select>
          : opts.area ? <textarea {...common} rows={4} /> : <input {...common} type={opts.type ?? 'text'} />}
        <p className="err" id={`${k}-e`} role="alert">{err[k]}</p>
      </div>
    );
  };
  if (status === 'ok') return <div className="note ok" role="status">Thank you. We will be in touch soon.</div>;
  return (
    <form className="form" onSubmit={submit} noValidate>
      {field('name', 'Parent or student name')}{field('email', 'Email address', { type: 'email' })}
      {field('phone', 'WhatsApp or phone number', { type: 'tel' })}{field('country', 'Country')}
      {field('board', 'Curriculum or board', { options: BOARDS })}{field('grade', 'Grade or year')}
      {field('subject', 'Subject or service')}{field('format', 'Preferred format', { options: ['Online', 'In person'] })}
      {field('schedule', 'Preferred schedule', { full: true })}{field('message', 'Additional message', { area: true, full: true })}
      <div className="full">
        <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
        <div role="status" aria-live="polite">
          {status === 'unconfigured' && <div className="note">This form is not connected to an email service yet, so nothing was sent. Please use the contact details on this page.</div>}
          {status === 'fail' && <div className="note">Something went wrong sending your enquiry. Please try again or use the contact details.</div>}
        </div>
      </div>
    </form>
  );
}
