// Evolution screen — weight/bodyfat/measurements charts + frequency

function EvolutionScreen() {
  const [tab, setTab] = React.useState('peso');

  return (
    <div className="phone-content screen-scroll">
      <div style={{ padding: '64px 20px 16px' }}>
        <div className="mono-label">VOCÊ EM 6 MESES</div>
        <h1 className="display-italic" style={{
          fontSize: 56, fontWeight: 600, margin: '6px 0 0',
          lineHeight: 0.85, letterSpacing: '-0.04em',
        }}>
          Evolução
        </h1>
      </div>

      {/* Goal banner */}
      <div style={{ padding: '0 16px 12px' }}>
        <div className="card" style={{
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid rgba(212,255,58,0.25)',
          background: 'linear-gradient(90deg, rgba(212,255,58,0.08), rgba(17,17,20,0.6))',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'rgba(212,255,58,0.1)', color: 'var(--accent)',
            border: '1px solid rgba(212,255,58,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><IconTarget size={16} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mono-label" style={{ fontSize: 9, color: 'var(--accent)' }}>SEU OBJETIVO</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-0)', marginTop: 1 }}>
              {USER.goal}
            </div>
          </div>
        </div>
      </div>

      {/* Big delta headline */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 10,
          padding: '20px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        }}>
          <span className="display-italic" style={{
            fontSize: 76, fontWeight: 600, lineHeight: 0.8,
            color: 'var(--accent)', letterSpacing: '-0.05em',
          }}>−3.9</span>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
              pontos de gordura
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>
              desde {USER.startDate} · +2kg de massa magra estimada
            </div>
          </div>
        </div>
      </div>

      {/* Tab selector */}
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          display: 'flex', gap: 4, padding: 4,
          background: 'var(--bg-1)', borderRadius: 12, border: '1px solid var(--line)',
        }}>
          {[
            { id: 'peso', label: 'Peso' },
            { id: 'gordura', label: '% Gordura' },
            { id: 'freq', label: 'Frequência' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, height: 34, borderRadius: 8,
                background: tab === t.id ? 'var(--bg-2)' : 'transparent',
                border: tab === t.id ? '1px solid var(--line)' : '1px solid transparent',
                color: tab === t.id ? 'var(--fg-0)' : 'var(--fg-2)',
                cursor: 'pointer',
                fontSize: 13, fontWeight: 500,
                transition: 'all 200ms var(--ease)',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Chart card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="mono-label" style={{ marginBottom: 8 }}>
            {tab === 'peso' && 'PESO CORPORAL · 6 MESES'}
            {tab === 'gordura' && '% DE GORDURA · 6 MESES'}
            {tab === 'freq' && 'TREINOS POR SEMANA · 8 SEM'}
          </div>
          {tab === 'peso' && <LineChart data={WEIGHT_DATA} unit="kg" lowerIsBetter />}
          {tab === 'gordura' && <LineChart data={BODYFAT_DATA} unit="%" lowerIsBetter />}
          {tab === 'freq' && <BarChart data={FREQUENCY_DATA} target={5} />}
        </div>
      </div>

      {/* Measurements */}
      <div style={{ padding: '8px 20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Medidas
        </h3>
        <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>atualizado há 4 dias</span>
      </div>

      <div style={{ padding: '0 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {MEASUREMENTS.map(m => (
          <MeasurementCard key={m.label} {...m} />
        ))}
      </div>

      {/* Frequency constancy */}
      <div style={{ padding: '8px 20px 10px' }}>
        <h3 className="display" style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Constância
        </h3>
      </div>

      <div style={{ padding: '0 16px 40px' }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div className="mono-label">MAIOR STREAK</div>
              <div className="display-italic" style={{ fontSize: 42, fontWeight: 600, color: 'var(--accent)', lineHeight: 0.9, marginTop: 4 }}>
                47<span style={{ fontSize: 16, color: 'var(--fg-2)', fontStyle: 'normal', fontWeight: 400, marginLeft: 4 }}>dias</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="mono-label">MÉDIA SEMANAL</div>
              <div className="display" style={{ fontSize: 42, fontWeight: 600, lineHeight: 0.9, marginTop: 4 }}>
                4.5<span style={{ fontSize: 16, color: 'var(--fg-2)', fontWeight: 400, marginLeft: 4 }}>/sem</span>
              </div>
            </div>
          </div>

          {/* Mini 30-day dot grid */}
          <div className="mono-label" style={{ marginBottom: 8 }}>ÚLTIMOS 30 DIAS</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)',
            gap: 4,
          }}>
            {Array.from({ length: 30 }).map((_, i) => {
              // deterministic pattern: ~70% done
              const done = (i % 7) !== 1 && (i % 7) !== 3;
              const today = i === 29;
              return (
                <div key={i} style={{
                  aspectRatio: '1',
                  borderRadius: 3,
                  background: done ? 'var(--accent)' : 'var(--bg-2)',
                  border: today ? '1.5px solid var(--fg-0)' : '1px solid var(--line)',
                  opacity: done ? (0.4 + (i / 30) * 0.6) : 1,
                }} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MeasurementCard({ label, value, unit, delta }) {
  const positive = delta > 0;
  const isWaist = label === 'Cintura';
  // for waist, lower is positive
  const goodDelta = isWaist ? delta < 0 : delta > 0;

  return (
    <div className="card-tight" style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span className="mono-label">{label.toUpperCase()}</span>
        <span style={{
          fontSize: 10, fontWeight: 500,
          color: goodDelta ? 'var(--accent)' : 'var(--fg-1)',
          display: 'inline-flex', alignItems: 'center', gap: 2,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {positive ? <IconArrowUp size={10} strokeWidth={3}/> : <IconArrowDown size={10} strokeWidth={3}/>}
          {Math.abs(delta).toFixed(1)}cm
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="display" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>
          {value.toFixed(1)}
        </span>
        <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>{unit}</span>
      </div>
    </div>
  );
}

Object.assign(window, { EvolutionScreen });
