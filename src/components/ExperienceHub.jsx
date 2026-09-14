import { CalendarDays, Check, Clock3, Flame, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { submitBooking } from '../services/booking';

const classes = [
  { name: 'Beginner Wheel Workshop', meta: 'Hands-on · beginner friendly', seats: 6 },
  { name: 'Raku Firing Session', meta: 'Fire + smoke · small group', seats: 4 },
  { name: 'Glaze Chemistry Lab', meta: 'Mix + test · technique focused', seats: 5 },
];

const memberships = [
  { name: 'Co-op Member', note: 'Ongoing access for local ceramic artists.', perks: ['Studio access', 'Member kiln rate', 'Community connection'] },
  { name: 'Open Studio Pass', note: 'Flexible studio access without a full co-op commitment.', perks: ['Open studio sessions', 'Tool access', 'Early booking'], featured: true },
  { name: 'Master Class Subscriber', note: 'Technique-focused learning for experienced makers.', perks: ['Advanced classes', 'Glaze notes', 'Class archive'] },
];

function BookingPanel({ onToast }) {
  const [selected, setSelected] = useState(classes[0]);
  const [date, setDate] = useState('');
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const book = async () => {
    if (!date) return onToast('Choose a date first — then we’ll hold your seat.');
    const result = await submitBooking({ type: 'class', selected, date });
    onToast(`Seat request saved · ${result.reference}`);
  };

  return (
    <div className="experience-panel-grid">
      <div className="booking-list">
        {classes.map((item) => (
          <button key={item.name} className={`booking-option ${selected.name === item.name ? 'is-selected' : ''}`} onClick={() => setSelected(item)}>
            <div><strong>{item.name}</strong><span>{item.meta}</span></div>
            <span>{item.seats} sample seats</span>
          </button>
        ))}
      </div>
      <div className="booking-card">
        <CalendarDays size={20} />
        <p className="eyebrow">BOOKING PROTOTYPE</p>
        <h3>{selected.name}</h3>
        <label>SELECT A DATE<input type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <button className="button button-accent button-full" onClick={book}>RESERVE A SEAT</button>
        <small>Final dates, pricing and availability will come from Mandy’s booking system.</small>
      </div>
    </div>
  );
}

function StudioPanel({ onToast }) {
  const [resource, setResource] = useState('Wheel station');
  const [hours, setHours] = useState(2);
  const [date, setDate] = useState('');

  return (
    <div className="studio-booking-layout">
      <div className="studio-copy-block">
        <p className="eyebrow">RESERVE STUDIO TIME</p>
        <h3>Pick the space.<br />Pick the time.</h3>
        <p>A simple reservation flow for local ceramic artists who need wheel, kiln or glaze-bench access.</p>
        <div className="studio-feature-list">
          <span><Clock3 size={16} /> Availability in one place</span>
          <span><Flame size={16} /> Wheel + kiln resources</span>
          <span><Users size={16} /> Member-priority booking</span>
        </div>
      </div>
      <div className="studio-form-card">
        <label>RESOURCE<select value={resource} onChange={(event) => setResource(event.target.value)}><option>Wheel station</option><option>Electric kiln shelf</option><option>Glaze bench</option><option>Raku firing bay</option></select></label>
        <label>DATE<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <label>HOURS<input type="range" min="1" max="6" value={hours} onChange={(event) => setHours(Number(event.target.value))} /><span className="range-value">{hours} HOUR{hours > 1 ? 'S' : ''}</span></label>
        <button className="button button-accent button-full" onClick={() => onToast(date ? `${resource} request saved for ${date}.` : 'Choose a studio date first.')}>REQUEST STUDIO TIME</button>
      </div>
    </div>
  );
}

function MembershipPanel({ onToast }) {
  return (
    <div className="membership-grid" id="membership">
      {memberships.map((tier) => (
        <article key={tier.name} className={`membership-card ${tier.featured ? 'is-featured' : ''}`}>
          {tier.featured && <span className="membership-featured-label">MOST FLEXIBLE</span>}
          <h3>{tier.name}</h3>
          <p>{tier.note}</p>
          <ul>{tier.perks.map((perk) => <li key={perk}><Check size={15} /> {perk}</li>)}</ul>
          <strong className="membership-price">PRICING TBD</strong>
          <button className="text-link" onClick={() => onToast(`${tier.name} inquiry started.`)}>JOIN THE WAITLIST →</button>
        </article>
      ))}
    </div>
  );
}

export default function ExperienceHub({ onToast }) {
  const [tab, setTab] = useState('class');
  return (
    <section className="experience-section" id="experiences">
      <div className="experience-heading">
        <p className="eyebrow">THE STUDIO, ONLINE</p>
        <h2>Shop it. Learn it.<br />Make it here.</h2>
        <p>Classes, studio reservations and membership can live beside the shop instead of sending customers through separate systems.</p>
      </div>

      <div className="experience-tabs" role="tablist" aria-label="Experience options">
        <button className={tab === 'class' ? 'is-active' : ''} onClick={() => setTab('class')}>BOOK A CLASS</button>
        <button className={tab === 'studio' ? 'is-active' : ''} onClick={() => setTab('studio')}>RESERVE STUDIO TIME</button>
        <button className={tab === 'member' ? 'is-active' : ''} onClick={() => setTab('member')}>MEMBERSHIP</button>
      </div>

      <div className="experience-content">
        {tab === 'class' && <BookingPanel onToast={onToast} />}
        {tab === 'studio' && <StudioPanel onToast={onToast} />}
        {tab === 'member' && <MembershipPanel onToast={onToast} />}
      </div>
    </section>
  );
}
