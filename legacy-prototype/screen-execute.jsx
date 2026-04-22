// Workout execution screen — set-by-set with rest timer

const { useState: useStateExec, useEffect: useEffectExec, useRef: useRefExec } = React;

function ExecuteScreen({ onExit }) {
  const [exerciseIdx, setExerciseIdx] = useStateExec(2); // start mid-workout for demo
  const [setStates, setSetStates] = useStateExec(() => {
    // pre-fill first 2 exercises as complete
    const init = {};
    TODAY_WORKOUT.exercises.forEach((ex, i) => {
      init[ex.id] = Array.from({ length: ex.series }, (_, s) => ({
        done: i < 2,
        load: ex.load,
        reps: ex.reps.split('-')[0],
      }));
    });
    return init;
  });
  const [expanded, setExpanded] = useStateExec(TODAY_WORKOUT.exercises[2].id);
  const [timer, setTimer] = useStateExec(null); // { remaining, total, running }
  const [unlockToast, setUnlockToast] = useStateExec(null);

  // Calculate progress
  const totalSets = TODAY_WORKOUT.exercises.reduce((s, e) => s + e.series, 0);
  const doneSets = Object.values(setStates).flat().filter(s => s.done).length;
  const pct = (doneSets / totalSets) * 100;

  // Elapsed time counter
  const [elapsed, setElapsed] = useStateExec(1420); // 23:40 for demo
  useEffectExec(() => {
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Rest timer
  useEffectExec(() => {
    if (!timer || !timer.running) return;
    if (timer.remaining <= 0) {
      // ding
      setTimer(t => ({ ...t, running: false, done: true }));
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      return;
    }
    const id = setTimeout(() => {
      setTimer(t => ({ ...t, remaining: t.remaining - 1 }));
    }, 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const toggleSet = (exId, setIdx) => {
    const exercise = TODAY_WORKOUT.exercises.find(e => e.id === exId);
    const wasDone = setStates[exId][setIdx].done;
    setSetStates(prev => ({
      ...prev,
      [exId]: prev[exId].map((s, i) => i === setIdx ? { ...s, done: !s.done } : s),
    }));
    if (!wasDone) {
      // start rest timer
      setTimer({ remaining: exercise.rest, total: exercise.rest, running: true });
      // occasionally trigger PR toast
      if (exercise.pr && setIdx === 0) {
        setUnlockToast({ type: 'pr', name: exercise.name, load: exercise.load });
        setTimeout(() => setUnlockToast(null), 3500);
      }
    }
  };

  const formatElapsed = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="phone-content screen-scroll" style={{ paddingBottom: 20 }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--line)',
        padding: '58px 16px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
            onClick={onExit}
            style={{
              width: 40, height: 40, borderRadius: 9999,
              background: 'var(--bg-1)', border: '1px solid var(--line)',
              color: 'var(--fg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          ><IconX size={18} /></button>

          <div style={{ flex: 1 }}>
            <div className="mono-label">TREINO {TODAY_WORKOUT.letter} · EM ANDAMENTO</div>
            <div className="display" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.1, marginTop: 2, letterSpacing: '-0.02em' }}>
              Costas + Bíceps
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="mono-label">TEMPO</div>
            <div className="display" style={{
              fontSize: 22, fontWeight: 600, lineHeight: 1, marginTop: 2,
              color: 'var(--accent)',
              fontVariantNumeric: 'tabular-nums',
            }}>{formatElapsed(elapsed)}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 6, borderRadius: 3,
          background: 'var(--bg-2)', overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: 'var(--accent)',
            boxShadow: '0 0 12px 0 var(--accent-glow)',
            transition: 'width 300ms var(--ease)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--fg-2)' }}>
            <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{doneSets}</span> de {totalSets} séries
          </span>
          <span style={{ fontSize: 11, color: 'var(--fg-2)' }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>

      {/* Exercise list */}
      <div style={{ padding: '16px 16px 80px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TODAY_WORKOUT.exercises.map((ex, i) => {
          const states = setStates[ex.id];
          const allDone = states.every(s => s.done);
          const isExpanded = expanded === ex.id;
          const isCurrent = !allDone && states.some(s => s.done) || (i === exerciseIdx && !allDone);

          return (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              index={i}
              states={states}
              isExpanded={isExpanded}
              isDone={allDone}
              isCurrent={isCurrent && !allDone}
              onToggleExpand={() => setExpanded(isExpanded ? null : ex.id)}
              onToggleSet={(setIdx) => toggleSet(ex.id, setIdx)}
            />
          );
        })}
      </div>

      {/* Rest timer modal */}
      {timer && (
        <RestTimer
          timer={timer}
          onClose={() => setTimer(null)}
          onSkip={() => setTimer(null)}
          onAdjust={(delta) => setTimer(t => ({ ...t, remaining: Math.max(0, t.remaining + delta) }))}
          onToggle={() => setTimer(t => ({ ...t, running: !t.running }))}
        />
      )}

      {/* PR toast */}
      {unlockToast && (
        <div className="toast-unlock card" style={{
          padding: 16,
          border: '1px solid rgba(212,255,58,0.4)',
          background: 'linear-gradient(135deg, rgba(212,255,58,0.12), var(--bg-1))',
          display: 'flex', gap: 12, alignItems: 'center',
          boxShadow: '0 0 80px 0 var(--accent-glow)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'var(--accent)', color: 'var(--bg-0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <IconBolt size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono-label" style={{ color: 'var(--accent)' }}>NOVO RECORDE PESSOAL</div>
            <div className="display" style={{ fontSize: 18, fontWeight: 500, marginTop: 2 }}>
              {unlockToast.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 2 }}>
              {unlockToast.load} · +2.5kg vs sessão anterior
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({ exercise, index, states, isExpanded, isDone, isCurrent, onToggleExpand, onToggleSet }) {
  const doneCount = states.filter(s => s.done).length;

  return (
    <div className="card" style={{
      padding: 0, overflow: 'hidden',
      border: isCurrent
        ? '1px solid rgba(212,255,58,0.35)'
        : isDone
          ? '1px solid var(--line)'
          : '1px solid var(--line)',
      background: isCurrent
        ? 'linear-gradient(180deg, rgba(212,255,58,0.05), var(--bg-1))'
        : 'var(--bg-1)',
      opacity: isDone ? 0.65 : 1,
      transition: 'all 300ms var(--ease)',
    }}>
      <button
        onClick={onToggleExpand}
        style={{
          width: '100%', padding: 16, background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        }}
      >
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: isDone ? 'var(--accent)' : 'var(--bg-2)',
          color: isDone ? 'var(--bg-0)' : 'var(--fg-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600,
          fontFamily: 'var(--font-display)',
          flexShrink: 0,
        }}>{isDone ? <IconCheck size={16} strokeWidth={3} /> : index + 1}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              fontSize: 15, fontWeight: 500, color: 'var(--fg-0)',
              textDecoration: isDone ? 'line-through' : 'none',
              textDecorationColor: 'var(--fg-2)',
            }}>{exercise.name}</div>
            {exercise.pr && (
              <span className="pill pill-accent" style={{ fontSize: 9, padding: '2px 6px', gap: 2 }}>
                <IconBolt size={9} /> PR
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
            {exercise.series}×{exercise.reps} · {exercise.load}
            {' · '}
            <span style={{ color: isDone ? 'var(--accent)' : 'var(--fg-1)' }}>
              {doneCount}/{exercise.series} séries
            </span>
          </div>
        </div>

        <IconChevronDown size={16} style={{
          color: 'var(--fg-2)',
          transform: isExpanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 300ms var(--ease)',
          flexShrink: 0,
        }} />
      </button>

      {isExpanded && (
        <div style={{ padding: '0 16px 16px' }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '32px 1fr 1fr 1fr 40px',
            gap: 8, padding: '8px 0', borderTop: '1px solid var(--line)',
            fontSize: 10, color: 'var(--fg-2)', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <div>SET</div>
            <div>ANTERIOR</div>
            <div>CARGA</div>
            <div>REPS</div>
            <div></div>
          </div>

          {states.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '32px 1fr 1fr 1fr 40px',
              gap: 8, padding: '8px 0', alignItems: 'center',
              borderTop: '1px dashed var(--line)',
            }}>
              <div className="display" style={{
                fontSize: 18, fontWeight: 600,
                color: s.done ? 'var(--accent)' : 'var(--fg-1)',
              }}>{i + 1}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                {exercise.prev} × {exercise.reps.split('-')[0]}
              </div>
              <div style={{
                fontSize: 13, color: 'var(--fg-0)',
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}>
                <span style={{
                  background: 'var(--bg-2)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--line)',
                  display: 'inline-block',
                  minWidth: 60,
                }}>{s.load}</span>
              </div>
              <div style={{
                fontSize: 13, color: 'var(--fg-0)',
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
              }}>
                <span style={{
                  background: 'var(--bg-2)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--line)',
                  display: 'inline-block',
                  minWidth: 40,
                }}>{s.reps}</span>
              </div>
              <div
                onClick={(e) => { e.stopPropagation(); onToggleSet(i); }}
                className={`check-box ${s.done ? 'checked' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {s.done && <IconCheck size={14} strokeWidth={3} style={{ color: 'var(--bg-0)' }} />}
              </div>
            </div>
          ))}

          {/* Rest + note */}
          <div style={{
            marginTop: 12, padding: '10px 12px',
            background: 'var(--bg-0)', borderRadius: 10,
            display: 'flex', gap: 12, alignItems: 'center',
            border: '1px solid var(--line)',
            fontSize: 12,
          }}>
            <IconClock size={14} style={{ color: 'var(--fg-2)' }} />
            <span style={{ color: 'var(--fg-1)' }}>
              Descanso <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{exercise.rest}s</span> entre séries
            </span>
            <span style={{ marginLeft: 'auto', color: 'var(--fg-2)' }}>{exercise.muscle}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function RestTimer({ timer, onClose, onSkip, onAdjust, onToggle }) {
  const pct = timer.remaining / timer.total;
  const mm = Math.floor(timer.remaining / 60);
  const ss = timer.remaining % 60;
  const circ = 2 * Math.PI * 110;

  return (
    <div className="modal-overlay">
      <button
        onClick={onSkip}
        style={{
          position: 'absolute', top: 60, right: 16,
          width: 44, height: 44, borderRadius: 9999,
          background: 'var(--bg-1)', border: '1px solid var(--line)',
          color: 'var(--fg-1)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      ><IconX size={20} /></button>

      <div className="mono-label" style={{ marginBottom: 20 }}>DESCANSO</div>

      <div style={{ position: 'relative', width: 260, height: 260 }}>
        <svg width="260" height="260" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="130" cy="130" r="110" fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
          <circle cx="130" cy="130" r="110" fill="none"
            stroke="#D4FF3A" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 10px rgba(212,255,58,0.5))' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div className="display" style={{
            fontSize: 88, fontWeight: 600, lineHeight: 0.9,
            color: timer.remaining === 0 ? 'var(--accent)' : 'var(--fg-0)',
            fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.04em',
          }}>
            {mm}:{ss.toString().padStart(2, '0')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 6 }}>
            {timer.remaining === 0 ? 'pronto para próxima série' : 'respirando fundo'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <button
          onClick={() => onAdjust(-15)}
          style={{
            height: 44, padding: '0 18px', borderRadius: 9999,
            background: 'var(--bg-1)', border: '1px solid var(--line)',
            color: 'var(--fg-0)', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500,
          }}
        >−15s</button>
        <button
          onClick={onToggle}
          style={{
            width: 56, height: 56, borderRadius: 9999,
            background: 'var(--accent)', color: 'var(--bg-0)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px 0 var(--accent-glow)',
          }}
        >
          {timer.running ? <IconPause size={20} /> : <IconPlay size={20} />}
        </button>
        <button
          onClick={() => onAdjust(15)}
          style={{
            height: 44, padding: '0 18px', borderRadius: 9999,
            background: 'var(--bg-1)', border: '1px solid var(--line)',
            color: 'var(--fg-0)', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500,
          }}
        >+15s</button>
      </div>

      <button
        onClick={onSkip}
        style={{
          marginTop: 20,
          background: 'none', border: 'none',
          color: 'var(--fg-2)', fontSize: 13, cursor: 'pointer',
          padding: 12,
        }}
      >pular descanso</button>
    </div>
  );
}

Object.assign(window, { ExecuteScreen });
