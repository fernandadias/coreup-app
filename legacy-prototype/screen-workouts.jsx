// Workouts list screen — A/B/C/D cards

function WorkoutsScreen({ onStartWorkout }) {
  return (
    <div className="phone-content screen-scroll">
      <div style={{ padding: '64px 20px 16px' }}>
        <div className="mono-label">SEU PLANO</div>
        <h1 className="display-italic" style={{
          fontSize: 56, fontWeight: 600, margin: '6px 0 0',
          lineHeight: 0.85, letterSpacing: '-0.04em',
        }}>
          Treinos
        </h1>
        <div style={{ fontSize: 14, color: 'var(--fg-1)', marginTop: 10 }}>
          {USER.plan} · prescrito por {USER.coach}
        </div>
      </div>

      {/* Week stats banner */}
      <div style={{ padding: '0 16px 20px' }}>
        <div className="card" style={{
          padding: 16, display: 'flex', gap: 0,
          background: 'var(--bg-1)',
        }}>
          <StatCell label="ESTA SEMANA" value={`${USER.weekDone}/${USER.weekGoal}`} />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <StatCell label="ESTE MÊS" value="16" />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <StatCell label="TOTAL" value="184" accent />
        </div>
      </div>

      {/* Section header */}
      <div style={{ padding: '4px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Divisão ABCD
        </h3>
        <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>4 treinos</span>
      </div>

      {/* Workout cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {WORKOUTS.map((w) => (
          <WorkoutCard key={w.id} workout={w} onStart={() => onStartWorkout()} />
        ))}
      </div>

      {/* Past workouts section */}
      <div style={{ padding: '32px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Histórico recente
        </h3>
        <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>últimos 7 dias</span>
      </div>

      <div style={{ padding: '0 16px 40px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <HistoryRow letter="A" name="Peito + Tríceps" date="Sex · 19 Abr" duration="52 min" />
        <HistoryRow letter="C" name="Pernas + Ombros" date="Qua · 17 Abr" duration="67 min" pr />
        <HistoryRow letter="A" name="Peito + Tríceps" date="Seg · 15 Abr" duration="58 min" />
      </div>
    </div>
  );
}

function StatCell({ label, value, accent }) {
  return (
    <div style={{ flex: 1, padding: '4px 12px' }}>
      <div className="mono-label">{label}</div>
      <div className="display" style={{
        fontSize: 30, fontWeight: 600, marginTop: 4, lineHeight: 1,
        color: accent ? 'var(--accent)' : 'var(--fg-0)',
      }}>{value}</div>
    </div>
  );
}

function WorkoutCard({ workout, onStart }) {
  const isToday = workout.isToday;
  return (
    <div
      className="card"
      style={{
        padding: 0, overflow: 'hidden',
        border: isToday ? '1px solid rgba(212,255,58,0.3)' : '1px solid var(--line)',
        background: isToday
          ? 'linear-gradient(180deg, rgba(212,255,58,0.06), var(--bg-1))'
          : 'var(--bg-1)',
      }}
    >
      <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Big letter */}
        <div style={{
          width: 68, height: 68, borderRadius: 16,
          background: isToday ? 'var(--accent)' : 'var(--bg-2)',
          color: isToday ? 'var(--bg-0)' : 'var(--fg-0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 48, fontWeight: 700,
          letterSpacing: '-0.05em',
          flexShrink: 0,
          boxShadow: isToday ? '0 0 24px 0 var(--accent-glow)' : 'none',
        }}>
          {workout.letter}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            {isToday && <span className="pill pill-accent" style={{ fontSize: 9, padding: '3px 8px' }}>HOJE</span>}
            {!isToday && (
              <span className="mono-label" style={{ fontSize: 9 }}>
                {workout.lastDone.toUpperCase()}
              </span>
            )}
          </div>
          <div className="display" style={{
            fontSize: 22, fontWeight: 500, lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>{workout.name}</div>
          <div style={{
            display: 'flex', gap: 12, marginTop: 6,
            fontSize: 12, color: 'var(--fg-1)',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconDumbbell size={13} /> {workout.exercises} ex.
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IconClock size={13} /> {workout.duration} min
            </span>
          </div>
        </div>

        {isToday ? (
          <button
            onClick={onStart}
            style={{
              width: 44, height: 44, borderRadius: 9999,
              background: 'var(--accent)', color: 'var(--bg-0)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 24px 0 var(--accent-glow)',
            }}
          >
            <IconPlay size={14} />
          </button>
        ) : (
          <IconChevronRight size={18} style={{ color: 'var(--fg-2)' }} />
        )}
      </div>
    </div>
  );
}

function HistoryRow({ letter, name, date, duration, pr }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '12px 14px',
      background: 'var(--bg-1)',
      border: '1px solid var(--line)',
      borderRadius: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'var(--bg-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 22, fontWeight: 600,
        color: 'var(--fg-1)',
        flexShrink: 0,
      }}>{letter}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-0)' }}>{name}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{date} · {duration}</div>
      </div>
      {pr && (
        <span className="pill pill-accent" style={{ fontSize: 9, padding: '3px 8px', gap: 3 }}>
          <IconBolt size={10} /> PR
        </span>
      )}
      <IconCheck size={14} style={{ color: 'var(--accent)' }} strokeWidth={2.5} />
    </div>
  );
}

Object.assign(window, { WorkoutsScreen });
