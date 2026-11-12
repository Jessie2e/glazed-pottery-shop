import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';

import { useEffect, useMemo, useRef, useState } from 'react';
import { submitBooking } from '../services/booking';

const classes = [
  {
    name: 'Beginner Wheel Workshop',
    meta: 'Hands-on · beginner friendly',
    seats: 6,
  },
  {
    name: 'Hang + Create',
    meta: 'One-time class · make, create, have fun',
    seats: 8,
  },
];

const memberships = [
  {
    name: 'Co-op Member',
    note: 'Ongoing access for local ceramic artists.',
    perks: ['Studio access', 'Member kiln rate', 'Community connection'],
  },
  {
    name: 'Open Studio Pass',
    note: 'Flexible studio access without a full co-op commitment.',
    perks: ['Open studio sessions', 'Tool access', 'Early booking'],
    featured: true,
  },
  {
    name: 'Master Class Subscriber',
    note: 'Technique-focused learning for experienced makers.',
    perks: ['Advanced classes', 'Studio notes', 'Class archive'],
  },
];

/*
  MARKET DATES
  ------------
  Mandy has not supplied confirmed dates / location / times yet, so none are
  invented here.

  When she sends them, add them like this:

  {
    id: 'oct-04',
    dateLabel: 'OCT 04',
    title: 'Market name',
    location: 'Market venue · Town, CO',
    timeLabel: '10 AM — 2 PM',
    start: '2026-10-04T10:00:00',
    end: '2026-10-04T14:00:00',
  },

  Once start + end exist, the ADD TO CALENDAR button works automatically.
*/
const marketDates = [];

// Keep the original service panels available for a later launch once their
// dates, pricing, and booking actions are connected to real systems.
const SHOW_SERVICE_PROTOTYPES = false;

function downloadCalendarEvent(event) {
  if (!event.start || !event.end) return;

  const formatICSDate = (value) =>
    new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Glazed Pottery Shop//Market Schedule//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@glazedpotteryshop.com`,
    `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
    `DTSTART:${formatICSDate(event.start)}`,
    `DTEND:${formatICSDate(event.end)}`,
    `SUMMARY:Glazed Pottery Shop — ${event.title}`,
    `LOCATION:${event.location}`,
    'DESCRIPTION:Shop Glazed Pottery in person.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `glazed-${event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function RakuFestCallout({ onToast }) {
  return (
    <article className="raku-fest-card">
      <div className="raku-fest-icon" aria-hidden="true">
        <Flame size={20} />
      </div>

      <div className="raku-fest-copy">
<p className="eyebrow">SPECIAL EVENT · TWICE A YEAR</p>
        <h3>
          Raku Fest
          <span> · Spring firing event</span>
        </h3>
      </div>

      <button
        className="text-link"
        onClick={() =>
          onToast(
            'You’re on the Raku Fest interest list — dates will be shared when spring firing conditions allow.'
          )
        }
      >
        GET UPDATES →
      </button>
    </article>
  );
}

function BookingPanel({ onToast }) {
  const [selected, setSelected] = useState(classes[0]);
  const [date, setDate] = useState('');

  const minDate = useMemo(
    () => new Date().toISOString().split('T')[0],
    []
  );

  const book = async () => {
    if (!date) {
      return onToast('Choose a date first — then we’ll hold your seat.');
    }

    const result = await submitBooking({
      type: 'class',
      selected,
      date,
    });

    onToast(`Seat request saved · ${result.reference}`);
  };

  return (
    <div className="experience-panel-grid">
      <div className="booking-list">
        {classes.map((item) => (
          <button
            key={item.name}
            className={`booking-option ${
              selected.name === item.name ? 'is-selected' : ''
            }`}
            onClick={() => setSelected(item)}
          >
            <div>
              <strong>{item.name}</strong>
              <span>{item.meta}</span>
            </div>

            <span>{item.seats} sample seats</span>
          </button>
        ))}
      </div>

      <div className="booking-card">
        <CalendarDays size={20} />

        <p className="eyebrow">BOOK A CLASS</p>

        <h3>{selected.name}</h3>

        <label>
          SELECT A DATE
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        <button
          className="button button-accent button-full"
          onClick={book}
        >
          RESERVE A SEAT
        </button>

        <small>
          Final dates, pricing and availability will come from Mandy’s booking
          system.
        </small>
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

        <h3>
          Pick the space.
          <br />
          Pick the time.
        </h3>

        <p>
          A simple reservation flow for local ceramic artists who need wheel,
          electric kiln or glaze-bench access.
        </p>

        <div className="studio-feature-list">
          <span>
            <Clock3 size={16} /> Availability in one place
          </span>

          <span>
            <Sparkles size={16} /> Wheel + studio resources
          </span>

          <span>
            <Users size={16} /> Member-priority booking
          </span>
        </div>
      </div>

      <div className="studio-form-card">
        <label>
          RESOURCE
          <select
            value={resource}
            onChange={(event) => setResource(event.target.value)}
          >
            <option>Wheel station</option>
            <option>Electric kiln shelf</option>
            <option>Glaze bench</option>
          </select>
        </label>

        <label>
          DATE
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        <label>
          HOURS
          <input
            type="range"
            min="1"
            max="6"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          />

          <span className="range-value">
            {hours} HOUR{hours > 1 ? 'S' : ''}
          </span>
        </label>

        <button
          className="button button-accent button-full"
          onClick={() =>
            onToast(
              date
                ? `${resource} request saved for ${date}.`
                : 'Choose a studio date first.'
            )
          }
        >
          REQUEST STUDIO TIME
        </button>
      </div>
    </div>
  );
}

function MembershipPanel({ onToast }) {
  return (
    <div className="membership-grid" id="membership">
      {memberships.map((tier) => (
        <article
          key={tier.name}
          className={`membership-card ${
            tier.featured ? 'is-featured' : ''
          }`}
        >
          {tier.featured && (
            <span className="membership-featured-label">
              MOST FLEXIBLE
            </span>
          )}

          <h3>{tier.name}</h3>

          <p>{tier.note}</p>

          <ul>
            {tier.perks.map((perk) => (
              <li key={perk}>
                <Check size={15} /> {perk}
              </li>
            ))}
          </ul>

          <strong className="membership-price">PRICING TBD</strong>

          <button
            className="text-link"
            onClick={() => onToast(`${tier.name} inquiry started.`)}
          >
            JOIN THE WAITLIST →
          </button>
        </article>
      ))}
    </div>
  );
}

function MarketSchedulePanel({ onToast }) {
  return (
    <div className="market-tab-panel">

      <div className="market-date-list">
        {marketDates.length > 0 ? (
          marketDates.map((event) => (
            <article className="market-date-row" key={event.id}>
              <div className="market-date-day">{event.dateLabel}</div>

              <div className="market-date-details">
                <strong>{event.title}</strong>
                <span>
                  <MapPin size={15} />
                  {event.location}
                </span>
              </div>

              <div className="market-date-time">
                <Clock3 size={15} />
                {event.timeLabel}
              </div>

              <button
                className="market-calendar-button"
                onClick={() => downloadCalendarEvent(event)}
              >
                <CalendarDays size={16} />
                ADD TO CALENDAR
              </button>
            </article>
          ))
        ) : (
          <div className="market-coming-soon">
            <div className="market-coming-soon-date">
              <CalendarDays size={22} />
              <span>NEW DATES</span>
            </div>

            <div>
              <strong>Coming soon</strong>
              <p>
                Mandy is wrapping up her current Sunday market season. Fresh
                dates, locations and times will be added here as soon as they
                are confirmed.
              </p>
            </div>

            <span className="market-calendar-placeholder">
              ADD TO CALENDAR AVAILABLE WITH CONFIRMED DATES
            </span>
          </div>
        )}
      </div>

      <div className="market-tab-bottom">
        <div>
          <span>RAKU FEST</span>
          <strong>Twice yearly · spring</strong>
          <p>
            Scheduled only when local conditions allow and there are no fire
            bans.
          </p>
        </div>

        <button
          className="text-link"
          onClick={() =>
            onToast(
              'Market update signup is ready — add your email in Let’s Be Friends below.'
            )
          }
        >
          GET MARKET UPDATES →
        </button>
      </div>
    </div>
  );
}

export default function ExperienceHub({ onToast }) {
  const [tab, setTab] = useState('class');

  const clayOrbitRef = useRef(null);
  const sectionRef = useRef(null);
  const createRef = useRef(null);

  useEffect(() => {
    let frame;

    const updateOrbit = () => {
      if (!sectionRef.current || !clayOrbitRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) /
            (viewportHeight + rect.height)
        )
      );

      const rotation = -25 + progress * 110;

      clayOrbitRef.current.style.transform =
        `rotate(${rotation}deg)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateOrbit);
    };

    updateOrbit();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = createRef.current;

    if (!element) return;

    let hasPlayed = false;
    let previousTop = element.getBoundingClientRect().top;

    const handleScroll = () => {
      if (hasPlayed) return;

      const rect = element.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.78;

      const crossedIntoView =
        previousTop > triggerLine &&
        rect.top <= triggerLine;

      if (crossedIntoView) {
        hasPlayed = true;

        const letters = element.querySelectorAll('.create-letter');

        letters.forEach((letter, index) => {
          letter.animate(
            [
              { transform: 'translateY(0) rotate(0deg)' },
              { transform: 'translateY(-16px) rotate(-3deg)', offset: 0.32 },
              { transform: 'translateY(5px) rotate(2deg)', offset: 0.62 },
              { transform: 'translateY(-3px) rotate(-1deg)', offset: 0.8 },
              { transform: 'translateY(0) rotate(0deg)' },
            ],
            {
              duration: 1450,
              delay: index * 110,
              easing: 'cubic-bezier(.22, 1, .36, 1)',
              fill: 'both',
            }
          );
        });

        window.removeEventListener('scroll', handleScroll);
      }

      previousTop = rect.top;
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="experience-section"
      id="experiences"
    >
      <div
        ref={clayOrbitRef}
        className="experience-clay-orbit"
        aria-hidden="true"
      />

      <div className="experience-heading">
  <p className="eyebrow">MAKE SOMETHING HERE</p>

  <h2>
    Come hang.
    <br />
    Come{' '}
    <span
      ref={createRef}
      className="create-emphasis"
      aria-label="create."
    >
      {'create.'.split('').map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="create-letter"
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
    </span>
  </h2>

  <div className="experience-heading-copy">
    <p>
      A little more room to make, learn and create together is on the way.
      We’ll share class details when dates are ready.
    </p>

    {SHOW_SERVICE_PROTOTYPES && <button
      className="experience-raku-note"
      onClick={() =>
        onToast(
          'You’re on the Raku Fest interest list — dates will be shared when spring firing conditions allow.'
        )
      }
    >
      <Flame size={15} />
      <span>
        <strong>RAKU FEST</strong>
        Twice yearly · spring
      </span>
      <span>GET UPDATES →</span>
    </button>}
  </div>
</div>

      {SHOW_SERVICE_PROTOTYPES ? <><div
        className="experience-tabs"
        role="tablist"
        aria-label="Experience options"
      >
        <button
          className={tab === 'class' ? 'is-active' : ''}
          onClick={() => setTab('class')}
        >
          BOOK A CLASS
        </button>

        <button
          className={tab === 'studio' ? 'is-active' : ''}
          onClick={() => setTab('studio')}
        >
          RESERVE STUDIO TIME
        </button>

        <button
          className={tab === 'member' ? 'is-active' : ''}
          onClick={() => setTab('member')}
        >
          MEMBERSHIP
        </button>

        <button
          className={tab === 'markets' ? 'is-active' : ''}
          onClick={() => setTab('markets')}
        >
          MARKET SCHEDULE
        </button>
      </div>

      <div className="experience-content">
        {tab === 'class' && (
          <BookingPanel onToast={onToast} />
        )}

        {tab === 'studio' && (
          <StudioPanel onToast={onToast} />
        )}

        {tab === 'member' && (
          <MembershipPanel onToast={onToast} />
        )}

        {tab === 'markets' && (
          <MarketSchedulePanel onToast={onToast} />
        )}
      </div>
      </> : (
        <div className="experience-content">
          <div className="classes-coming-soon">
            <span className="classes-coming-soon__icon" aria-hidden="true">
              <CalendarDays size={28} strokeWidth={1.5} />
            </span>
            <div>
              <p className="eyebrow">AT THE GLAZED STUDIO</p>
              <h3>Classes coming soon.</h3>
              <p>
                We’re getting the next round of classes ready. Have a question
                or want to hear what’s coming? Mandy would love to hear from you.
              </p>
            </div>
            <a
              className="button button-accent"
              href="mailto:glazedpotteryshop@gmail.com?subject=Upcoming%20Glazed%20classes"
            >
              ASK MANDY ABOUT CLASSES <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
