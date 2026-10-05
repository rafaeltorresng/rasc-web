import { useEffect, useState } from 'react';

// The owner's macOS locale is en_BR, with native patterns EEEE, d MMMM / HH:mm.
// Resolve time in the visitor's local zone instead of freezing the demo date.
// en-GB preserves those native patterns across browsers; en-BR may fall back to US.
const fullDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const compactDate = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const localTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

function dateLabel(formatter: Intl.DateTimeFormat, date: Date) {
  const parts = formatter.formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value;
  return `${value('weekday')}, ${value('day')} ${value('month')}`;
}

export default function MacClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      if (document.visibilityState !== 'visible') return;
      setNow(new Date());
      timer = window.setTimeout(refresh, 60_000 - (Date.now() % 60_000));
    };
    document.addEventListener('visibilitychange', refresh);
    refresh();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return <time className="mac-menu__clock" dateTime={now.toISOString()}>
    <span className="mac-menu__date">{dateLabel(fullDate, now)}</span>
    <span className="mac-menu__date-compact">{dateLabel(compactDate, now)}</span>
    <span>{localTime.format(now)}</span>
  </time>;
}
