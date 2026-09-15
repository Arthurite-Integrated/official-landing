import {useState} from "react";
import {Clock, User} from "lucide-react";

import {EVENT_AGENDA, type AgendaDay, type AgendaSession} from "#/components/events/events-data.ts";

function SessionCard({session}: {readonly session: AgendaSession}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all hover:border-teal-500/30">
      <div>
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-[#006759] dark:text-teal-400">
            <Clock className="h-3.5 w-3.5" />
            {session.time}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {session.track}
          </span>
        </div>
        <h4 className="mb-3 text-lg font-bold tracking-tight text-foreground">{session.title}</h4>
      </div>
      <div className="flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
        <User className="h-3.5 w-3.5 text-[#006759] dark:text-teal-400" />
        <span>{session.speaker}</span>
      </div>
    </div>
  );
}

function DayTabs({
  days,
  activeDay,
  onSelectDay,
}: {
  readonly days: readonly AgendaDay[];
  readonly activeDay: number;
  readonly onSelectDay: (dayNum: number) => void;
}) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3">
      {days.map((day) => (
        <button
          key={day.dayNumber}
          type="button"
          onClick={() => onSelectDay(day.dayNumber)}
          className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all ${
            activeDay === day.dayNumber ? "bg-[#006759] text-white shadow-lg" : "bg-card text-muted-foreground hover:bg-muted"
          }`}
        >
          Day {day.dayNumber} ({day.date})
        </button>
      ))}
    </div>
  );
}

export function EventsAgenda() {
  const [activeDayNum, setActiveDayNum] = useState(1);
  const activeDay = EVENT_AGENDA.find((d) => d.dayNumber === activeDayNum) ?? EVENT_AGENDA[0];

  if (!activeDay) return null;

  return (
    <section className="bg-sand/40 py-20 text-foreground sm:py-24 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#006759] sm:text-4xl dark:text-emerald-400">Event Schedule & Agenda</h2>
          <p className="mt-2 text-sm text-muted-foreground">Explore keynote speeches, technical breakouts, and hands-on workshops.</p>
        </div>

        <DayTabs days={EVENT_AGENDA} activeDay={activeDayNum} onSelectDay={setActiveDayNum} />

        <div className="mb-6 text-center">
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{activeDay.title}</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {activeDay.sessions.map((session) => (
            <SessionCard key={session.title} session={session} />
          ))}
        </div>
      </div>
    </section>
  );
}
