import {
  CalendarDays,
  Check,
  Clock3,
  Flame,
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

function RakuFestCallout({ onToast }) {
  return (
    <article className="raku-fest-card">
      <div className="raku-fest-icon" aria-hidden="true">
        <Flame size={24} />
      </div>

      <div className="raku-fest-copy">
        <p className="eyebrow">SPECIAL EVENT · TWICE A YEAR</p>
        <h3>Raku Fest</h3>
        <p>
          Purchase a bisque piece, choose your finish, then stay for the magic
          and watch Mandy fire it live. Raku Fest is offered on select spring
          dates when local conditions allow and there are no fire bans.
        </p>
      </div>

      <button
        className="button button-accent"
        onClick={() =>
          onToast(
            'You’re on the Raku Fest interest list — dates will be shared when spring firing conditions allow.'
          )
        }
      >
        GET RAKU FEST UPDATES
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

      /*
        Small movement only:
        starts around -25 degrees
        ends around 85 degrees
      */
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

  // Where the word is when the page first loads.
  // We DO NOT animate here.
  let previousTop = element.getBoundingClientRect().top;

  const handleScroll = () => {
    if (hasPlayed) return;

    const rect = element.getBoundingClientRect();

    // Animation fires when "create." crosses
    // this point while moving UP the screen.
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
      {
        transform: 'translateY(0) rotate(0deg)',
      },
      {
        transform: 'translateY(-16px) rotate(-3deg)',
        offset: 0.32,
      },
      {
        transform: 'translateY(5px) rotate(2deg)',
        offset: 0.62,
      },
      {
        transform: 'translateY(-3px) rotate(-1deg)',
        offset: 0.8,
      },
      {
        transform: 'translateY(0) rotate(0deg)',
      },
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

        <p>
          Take a class, reserve studio time or join the local maker community —
          all in one place.
        </p>
      </div>

      <RakuFestCallout onToast={onToast} />

      <div
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
      </div>
    </section>
  );
}