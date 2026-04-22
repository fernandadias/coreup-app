// Chart components — minimal, dark, accent neon
// LineChart with area fill, BarChart for frequency

// use React.useState etc directly to avoid scope collisions

function LineChart({ data, height = 120, unit = '', lowerIsBetter = false }) {
  const [hoverIdx, setHoverIdx] = React.useState(data.length - 1);
  const svgRef = React.useRef(null);

  const width = 320;
  const pad = { t: 12, r: 16, b: 28, l: 16 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;

  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const range = max - min || 1;

  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - ((v - min) / range) * h;

  const points = data.map((d, i) => `${x(i)},${y(d.value)}`).join(' ');
  const areaPath = `M ${x(0)},${pad.t + h} L ${points.split(' ').join(' L ')} L ${x(data.length - 1)},${pad.t + h} Z`;

  const current = data[hoverIdx];
  const first = data[0];
  const totalDelta = current.value - first.value;
  const isPositive = lowerIsBetter ? totalDelta < 0 : totalDelta > 0;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0 }}>
          <span className="display" style={{
            fontSize: 44, fontWeight: 600, color: 'var(--fg-0)',
            lineHeight: 1, letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {current.value.toFixed(1)}
          </span>
          <span style={{
            fontSize: 14, color: 'var(--fg-2)',
            fontFamily: 'var(--font-sans)', fontWeight: 500,
          }}>{unit}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500,
          color: isPositive ? 'var(--accent)' : 'var(--fg-1)',
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
          paddingBottom: 4,
        }}>
          {totalDelta > 0 ? '+' : ''}{totalDelta.toFixed(1)}{unit} total
        </span>
      </div>

      <svg
        ref={svgRef}
        width="100%" height={height} viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', overflow: 'visible' }}
        onMouseMove={(e) => {
          const rect = svgRef.current.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * width;
          const idx = Math.round(((px - pad.l) / w) * (data.length - 1));
          setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
        }}
        onTouchMove={(e) => {
          const rect = svgRef.current.getBoundingClientRect();
          const px = ((e.touches[0].clientX - rect.left) / rect.width) * width;
          const idx = Math.round(((px - pad.l) / w) * (data.length - 1));
          setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
        }}
      >
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4FF3A" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#D4FF3A" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* horizontal guides */}
        {[0, 0.5, 1].map((f, i) => (
          <line key={i} x1={pad.l} x2={pad.l + w} y1={pad.t + h * f} y2={pad.t + h * f}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* area */}
        <path d={areaPath} fill="url(#area-grad)" />
        {/* line */}
        <polyline points={points} fill="none" stroke="#D4FF3A" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* hover guide */}
        <line
          x1={x(hoverIdx)} x2={x(hoverIdx)} y1={pad.t} y2={pad.t + h}
          stroke="rgba(212,255,58,0.3)" strokeDasharray="3 3" strokeWidth="1"
        />
        {/* dots */}
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.value)} r={i === hoverIdx ? 5 : 2.5}
            fill={i === hoverIdx ? '#D4FF3A' : '#D4FF3A'}
            stroke={i === hoverIdx ? '#09090B' : 'none'}
            strokeWidth={i === hoverIdx ? 2 : 0}
          />
        ))}
        {/* x-axis labels */}
        {data.map((d, i) => (
          <text key={i} x={x(i)} y={height - 6} textAnchor="middle"
            fontSize="10" fill={i === hoverIdx ? '#D4FF3A' : 'rgba(161,161,170,0.6)'}
            fontFamily="Inter" fontWeight={i === hoverIdx ? 600 : 400}
            style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >{d.week}</text>
        ))}
      </svg>
    </div>
  );
}

function BarChart({ data, height = 120, target = 5, unit = 'treinos' }) {
  const max = Math.max(target, ...data.map(d => d.value)) + 1;
  const avg = (data.reduce((s, d) => s + d.value, 0) / data.length).toFixed(1);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
        <span className="display" style={{ fontSize: 44, fontWeight: 600, color: 'var(--fg-0)', lineHeight: 1 }}>
          {avg}
        </span>
        <span style={{ fontSize: 14, color: 'var(--fg-2)' }}>{unit}/semana</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-2)', fontWeight: 500 }}>
          meta {target}
        </span>
      </div>
      <div style={{ position: 'relative', height, display: 'flex', alignItems: 'flex-end', gap: 6, paddingBottom: 22 }}>
        {/* target line */}
        <div style={{
          position: 'absolute', left: 0, right: 0,
          bottom: 22 + ((target / max) * (height - 22)),
          height: 1, borderTop: '1px dashed rgba(212,255,58,0.3)',
          zIndex: 1,
        }} />
        {data.map((d, i) => {
          const hit = d.value >= target;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: '100%',
                height: `${(d.value / max) * (height - 22)}px`,
                borderRadius: 4,
                background: hit ? 'var(--accent)' : 'rgba(212,255,58,0.2)',
                border: hit ? 'none' : '1px solid rgba(212,255,58,0.35)',
                boxShadow: hit ? '0 0 12px 0 rgba(212,255,58,0.25)' : 'none',
                transition: 'all 400ms var(--ease)',
              }} />
              <div style={{ fontSize: 9, color: 'var(--fg-2)', fontWeight: 500, letterSpacing: '0.1em' }}>
                {d.week}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Ring progress (for streak circle)
function RingProgress({ value, total, size = 120, stroke = 8, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / total, 1);
  const offset = c * (1 - pct);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="#D4FF3A" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 800ms var(--ease)', filter: 'drop-shadow(0 0 6px rgba(212,255,58,0.4))' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      }}>{children}</div>
    </div>
  );
}

Object.assign(window, { LineChart, BarChart, RingProgress });
