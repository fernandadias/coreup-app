// Profile screen

function ProfileScreen() {
  return (
    <div className="phone-content screen-scroll">
      <div style={{ padding: '64px 20px 16px' }}>
        <div className="mono-label">SUA CONTA</div>
        <h1 className="display-italic" style={{
          fontSize: 56, fontWeight: 600, margin: '6px 0 0',
          lineHeight: 0.85, letterSpacing: '-0.04em',
        }}>
          Perfil
        </h1>
      </div>

      {/* Identity card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 9999,
              border: '1px solid var(--line)',
              backgroundImage: `url(${USER.avatar})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {USER.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', marginTop: 4 }}>
                Aluna desde {USER.startDate}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <span className="pill pill-accent" style={{ fontSize: 9 }}>PREMIUM</span>
                <span className="pill" style={{ fontSize: 9 }}>Nível 12</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 0, marginTop: 20,
            padding: '16px 0 0', borderTop: '1px solid var(--line)',
          }}>
            <MiniStat value="184" label="TREINOS" />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <MiniStat value="18" label="OBJETIVOS" accent />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <MiniStat value="6" label="MESES" />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <MiniStat value="6" label="MEDALHAS" />
          </div>
        </div>
      </div>

      {/* Coach card */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="mono-label" style={{ marginBottom: 12 }}>SUA COACH</div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 9999,
              border: '1px solid var(--line)',
              backgroundImage: `url(${USER.coachAvatar})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{USER.coach}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
                CBMF 048279 · Emagrecimento & Hipertrofia
              </div>
            </div>
            <button className="btn" style={{
              height: 40, padding: '0 16px',
              background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-0)',
            }}>
              <IconMessage size={14} /> Chat
            </button>
          </div>
        </div>
      </div>

      {/* Settings lists */}
      <div style={{ padding: '8px 20px 10px' }}>
        <div className="mono-label">OBJETIVOS E TREINO</div>
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <SettingRow icon={<IconTarget size={18} />} label="Objetivo atual" value="Reduzir % gordura" />
          <SettingRow icon={<IconDumbbell size={18} />} label="Divisão" value="ABCD" />
          <SettingRow icon={<IconCalendar size={18} />} label="Meta semanal" value="5 treinos" />
          <SettingRow icon={<IconScale size={18} />} label="Meta de peso" value="65 kg" last />
        </div>
      </div>

      <div style={{ padding: '8px 20px 10px' }}>
        <div className="mono-label">APLICATIVO</div>
      </div>
      <div style={{ padding: '0 16px 40px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <SettingRow icon={<IconBell size={18} />} label="Notificações" value="Ativas" />
          <SettingRow icon={<IconClock size={18} />} label="Lembrete de treino" value="07:30" />
          <SettingRow icon={<IconSettings size={18} />} label="Preferências" />
          <SettingRow icon={<IconShare size={18} />} label="Indicar amigo" value="ganhe 1 mês" accent last />
        </div>
      </div>

      <div style={{ padding: '0 20px 40px', textAlign: 'center' }}>
        <button style={{
          fontSize: 12, color: 'var(--fg-2)',
          background: 'none', border: 'none', cursor: 'pointer',
          letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
        }}>sair da conta</button>
        <div style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 24, opacity: 0.6 }}>
          CoreUp v2.4.0
        </div>
      </div>
    </div>
  );
}

function MiniStat({ value, label, accent }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div className="display" style={{
        fontSize: 24, fontWeight: 600, lineHeight: 1,
        color: accent ? 'var(--accent)' : 'var(--fg-0)',
      }}>{value}</div>
      <div className="mono-label" style={{ marginTop: 4, fontSize: 9 }}>{label}</div>
    </div>
  );
}

function SettingRow({ icon, label, value, last, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid var(--line)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'var(--bg-2)', color: 'var(--fg-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1, fontSize: 14, color: 'var(--fg-0)' }}>{label}</div>
      {value && (
        <div style={{
          fontSize: 13, color: accent ? 'var(--accent)' : 'var(--fg-1)',
          fontWeight: accent ? 500 : 400,
        }}>{value}</div>
      )}
      <IconChevronRight size={14} style={{ color: 'var(--fg-2)' }} />
    </div>
  );
}

Object.assign(window, { ProfileScreen });
