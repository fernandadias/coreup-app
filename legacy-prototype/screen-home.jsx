// Home screen — streak hero + today's workout + weekly progress

const { useState: useStateHome } = React;

function HomeScreen({ onStartWorkout, onNavigate }) {
  return (
    <div className="phone-content screen-scroll">
      {/* Hero glow backdrop */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div style={{
          position: 'absolute', top: -160, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 400,
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(212,255,58,0.18), transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <div style={{
          padding: '64px 20px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div className="mono-label">Sábado · 21 Abr</div>
            <div style={{ fontSize: 15, color: 'var(--fg-1)', marginTop: 4 }}>
              Bom dia, <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{USER.firstName}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              width: 40, height: 40, borderRadius: 9999,
              background: 'var(--bg-1)', border: '1px solid var(--line)',
              color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative',
            }}>
              <IconBell size={18} />
              <span style={{
                position: 'absolute', top: 8, right: 9,
                width: 6, height: 6, borderRadius: 3,
                background: 'var(--accent)',
              }} />
            </button>
            <div style={{
              width: 40, height: 40, borderRadius: 9999,
              border: '1px solid var(--line)',
              overflow: 'hidden',
              backgroundImage: `url(${USER.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          </div>
        </div>

        {/* Streak hero */}
        <div style={{ padding: '32px 20px 24px', textAlign: 'center' }}>
          <div className="mono-label" style={{ marginBottom: 12 }}>SUA JORNADA ATÉ AQUI</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}>
            <span className="display-italic" style={{
              fontSize: 160, fontWeight: 600, lineHeight: 0.75,
              color: 'var(--accent)',
              textShadow: '0 0 60px rgba(212,255,58,0.4)',
            }}>{USER.streak}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500,
            color: 'var(--fg-0)', marginTop: 8, letterSpacing: '-0.03em',
          }}>dias consecutivos</div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 4 }}>
            faltam <span style={{ color: 'var(--accent)', fontWeight: 500 }}>3 dias</span> pra próxima medalha
          </div>
        </div>

        {/* Today's workout card */}
        <div style={{ padding: '0 16px 16px' }}>
          <div className="card pulse-glow" style={{
            padding: 0, overflow: 'hidden',
            border: '1px solid rgba(212,255,58,0.3)',
            background: 'linear-gradient(180deg, rgba(212,255,58,0.06), rgba(17,17,20,0.9))',
          }}>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span className="pill pill-accent" style={{ fontSize: 10, padding: '4px 10px' }}>TREINO DE HOJE</span>
                  </div>
                  <div className="display" style={{ fontSize: 38, fontWeight: 600, lineHeight: 0.95 }}>
                    Treino {TODAY_WORKOUT.letter}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--fg-1)', marginTop: 4 }}>
                    Costas + Bíceps
                  </div>
                </div>
                <div className="display" style={{
                  fontSize: 80, fontWeight: 700, lineHeight: 0.8,
                  color: 'var(--bg-2)', letterSpacing: '-0.06em',
                }}>{TODAY_WORKOUT.letter}</div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
                <div>
                  <div className="mono-label">EXERCÍCIOS</div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 500, marginTop: 2 }}>
                    {TODAY_WORKOUT.exercises.length}
                  </div>
                </div>
                <div style={{ width: 1, background: 'var(--line)' }} />
                <div>
                  <div className="mono-label">DURAÇÃO</div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 500, marginTop: 2 }}>
                    ~{TODAY_WORKOUT.duration}<span style={{ fontSize: 16, color: 'var(--fg-2)' }}>min</span>
                  </div>
                </div>
                <div style={{ width: 1, background: 'var(--line)' }} />
                <div>
                  <div className="mono-label">OBJETIVOS</div>
                  <div className="display" style={{ fontSize: 28, fontWeight: 500, marginTop: 2, color: 'var(--accent)' }}>
                    {TODAY_WORKOUT.objetivos.length}
                  </div>
                </div>
              </div>

              <button
                onClick={onStartWorkout}
                className="btn btn-primary"
                style={{ width: '100%', height: 52, fontSize: 15, fontWeight: 600 }}
              >
                <IconPlay size={14} /> Iniciar treino
              </button>
            </div>
          </div>
        </div>

        {/* Week progress */}
        <div style={{ padding: '8px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
            <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
              Esta semana
            </h3>
            <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{USER.weekDone}</span>/{USER.weekGoal} treinos
            </span>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
              {WEEK.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 10, color: d.today ? 'var(--accent)' : 'var(--fg-2)', fontWeight: 600, letterSpacing: '0.1em' }}>
                    {d.day.toUpperCase()}
                  </div>
                  <div style={{
                    width: 36, height: 44, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: d.done ? 'var(--accent)' : d.today ? 'rgba(212,255,58,0.1)' : 'var(--bg-2)',
                    border: d.today ? '1px dashed rgba(212,255,58,0.5)' : '1px solid var(--line)',
                    color: d.done ? 'var(--bg-0)' : d.today ? 'var(--accent)' : 'var(--fg-2)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 18, fontWeight: 600,
                    boxShadow: d.done ? '0 0 16px 0 rgba(212,255,58,0.2)' : 'none',
                  }}>
                    {d.done ? <IconCheck size={16} strokeWidth={2.5} /> : d.letter || '·'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StatMini
            label="OBJETIVOS ESTE MÊS"
            value="4"
            accent
            icon={<IconTarget size={14} />}
          />
          <StatMini
            label="% DE GORDURA"
            value="20.2"
            unit="%"
            delta="-3.9"
            icon={<IconDroplet size={14} />}
          />
        </div>

        {/* Recent achievement */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
            <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
              Última conquista
            </h3>
            <button
              onClick={() => onNavigate('achievements')}
              style={{ fontSize: 12, color: 'var(--fg-1)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              ver todas →
            </button>
          </div>
          <div className="card" style={{
            padding: 18,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              border: '1px solid rgba(212,255,58,0.3)',
              background: 'rgba(212,255,58,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}>
              <IconMedal size={28} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg-0)' }}>100 treinos</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
                desbloqueado em Mar 19 · nível prata
              </div>
            </div>
            <IconChevronRight size={16} style={{ color: 'var(--fg-2)' }} />
          </div>
        </div>

        {/* Coach note */}
        <div style={{ padding: '0 16px 32px' }}>
          <div className="card" style={{
            padding: 16,
            background: 'var(--bg-1)',
            display: 'flex', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 9999,
              border: '1px solid var(--line)', flexShrink: 0,
              overflow: 'hidden',
              backgroundImage: `url(${USER.coachAvatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span className="mono-label" style={{ fontSize: 9 }}>FEEDBACK DA COACH</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{USER.coach}:</span> Joaquina, hoje foco em unilateral. Busca sentir bem o alongamento na remada com halter.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, unit, delta, accent, icon }) {
  return (
    <div className="card-tight" style={{ padding: 14 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        color: accent ? 'var(--accent)' : 'var(--fg-2)',
        marginBottom: 6,
      }}>
        {icon}
        <span className="mono-label" style={{ color: 'inherit' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="display" style={{
          fontSize: 32, fontWeight: 600, lineHeight: 1,
          color: accent ? 'var(--accent)' : 'var(--fg-0)',
        }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{unit}</span>}
        {delta && (
          <span style={{
            marginLeft: 'auto', fontSize: 11, fontWeight: 500,
            color: 'var(--accent)',
          }}>{delta}kg</span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
