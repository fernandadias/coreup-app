// Achievements screen — bold, striking medals with tier treatments

function AchievementsScreen() {
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked);
  const locked = ACHIEVEMENTS.filter(a => !a.unlocked);
  const filtered = filter === 'unlocked' ? unlocked : filter === 'locked' ? locked : ACHIEVEMENTS;

  // Featured = most recent unlocked + most almost
  const featured = unlocked[unlocked.length - 1];
  const almost = locked.find(a => a.almost) || locked[0];

  return (
    <div className="phone-content screen-scroll">
      <div style={{ padding: '64px 20px 16px' }}>
        <div className="mono-label">SUA JORNADA</div>
        <h1 className="display-italic" style={{
          fontSize: 56, fontWeight: 600, margin: '6px 0 0',
          lineHeight: 0.85, letterSpacing: '-0.04em',
        }}>
          Medalhas
        </h1>
      </div>

      {/* Big score with trophy */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: '18px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: 'radial-gradient(circle at 30% 30%, rgba(212,255,58,0.25), rgba(212,255,58,0.05))',
            border: '1px solid rgba(212,255,58,0.35)',
            color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px 0 rgba(212,255,58,0.2)',
          }}>
            <IconTrophy size={30} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="display-italic" style={{
                fontSize: 56, fontWeight: 600, lineHeight: 0.8,
                color: 'var(--accent)', letterSpacing: '-0.05em',
              }}>{unlocked.length}</span>
              <span className="display" style={{
                fontSize: 32, fontWeight: 400, lineHeight: 0.8,
                color: 'var(--fg-2)', letterSpacing: '-0.04em',
              }}>/{ACHIEVEMENTS.length}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-1)', marginTop: 4 }}>
              medalhas conquistadas
            </div>
          </div>
        </div>
      </div>

      {/* Featured unlock — hero card */}
      {featured && (
        <div style={{ padding: '4px 16px 16px' }}>
          <button
            onClick={() => setSelected(featured)}
            style={{
              width: '100%', padding: 0, background: 'none', border: 'none',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div className="card" style={{
              padding: 0, overflow: 'hidden', position: 'relative',
              border: '1px solid rgba(212,255,58,0.3)',
              background: 'linear-gradient(180deg, rgba(212,255,58,0.08), rgba(17,17,20,0.95))',
            }}>
              {/* Glow backdrop */}
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 240, height: 240, borderRadius: 9999,
                background: 'radial-gradient(circle, rgba(212,255,58,0.18), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', padding: 20, display: 'flex', gap: 18, alignItems: 'center' }}>
                <MedalHero achievement={featured} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono-label" style={{ color: 'var(--accent)' }}>
                    ÚLTIMA MEDALHA
                  </div>
                  <div className="display" style={{
                    fontSize: 24, fontWeight: 500, lineHeight: 1.05,
                    letterSpacing: '-0.02em', marginTop: 4,
                  }}>
                    {featured.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 6 }}>
                    {featured.desc} · {featured.date}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Next up — progress card */}
      {almost && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, padding: '0 4px' }}>
            <h3 className="display" style={{ fontSize: 18, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
              Próxima na mira
            </h3>
          </div>
          <button
            onClick={() => setSelected(almost)}
            style={{ width: '100%', padding: 0, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div className="card" style={{ padding: 18, display: 'flex', gap: 16, alignItems: 'center' }}>
              <MedalCompact achievement={almost} size={54} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg-0)' }}>{almost.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 3 }}>
                  {almost.progress}/{almost.total} · {Math.round((almost.progress/almost.total)*100)}% completo
                </div>
                <div style={{
                  height: 4, borderRadius: 2, background: 'var(--bg-2)', marginTop: 8,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${Math.min((almost.progress/almost.total)*100, 100)}%`,
                    background: 'var(--accent)',
                    boxShadow: '0 0 10px 0 var(--accent-glow)',
                  }} />
                </div>
              </div>
              <IconChevronRight size={16} style={{ color: 'var(--fg-2)' }} />
            </div>
          </button>
        </div>
      )}

      {/* Tier summary */}
      <div style={{ padding: '8px 20px 12px' }}>
        <h3 className="display" style={{ fontSize: 18, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Por nível
        </h3>
      </div>
      <div style={{ padding: '0 16px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <TierCard tier="bronze" count={unlocked.filter(a => a.tier==='bronze').length} total={ACHIEVEMENTS.filter(a => a.tier==='bronze').length} />
        <TierCard tier="silver" count={unlocked.filter(a => a.tier==='silver').length} total={ACHIEVEMENTS.filter(a => a.tier==='silver').length} />
        <TierCard tier="gold" count={unlocked.filter(a => a.tier==='gold').length} total={ACHIEVEMENTS.filter(a => a.tier==='gold').length} />
      </div>

      {/* All medals header + filter */}
      <div style={{ padding: '8px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="display" style={{ fontSize: 18, fontWeight: 500, margin: 0, letterSpacing: '-0.03em' }}>
          Todas as medalhas
        </h3>
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <div style={{
          display: 'flex', gap: 4, padding: 4,
          background: 'var(--bg-1)', borderRadius: 12, border: '1px solid var(--line)',
        }}>
          {[
            { id: 'all', label: 'Todas' },
            { id: 'unlocked', label: `Desbloq. · ${unlocked.length}` },
            { id: 'locked', label: `Em progr. · ${locked.length}` },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              style={{
                flex: 1, height: 34, borderRadius: 8,
                background: filter === t.id ? 'var(--bg-2)' : 'transparent',
                border: filter === t.id ? '1px solid var(--line)' : '1px solid transparent',
                color: filter === t.id ? 'var(--fg-0)' : 'var(--fg-2)',
                cursor: 'pointer', fontSize: 11, fontWeight: 500,
                transition: 'all 200ms var(--ease)',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        padding: '0 16px 40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {filtered.map(a => (
          <AchievementCard key={a.id} achievement={a} onClick={() => setSelected(a)} />
        ))}
      </div>

      {selected && (
        <AchievementDetail achievement={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// Tier → visual treatment
const TIER_STYLES = {
  bronze: {
    name: 'BRONZE',
    ringColor: 'rgba(212, 140, 80, 0.5)',
    glowColor: 'rgba(212, 140, 80, 0.3)',
    badgeBg: 'radial-gradient(circle at 30% 30%, #c07a4a, #7a4a2a)',
    badgeColor: '#ffe0c0',
    labelColor: '#d08a5a',
  },
  silver: {
    name: 'PRATA',
    ringColor: 'rgba(200, 205, 215, 0.5)',
    glowColor: 'rgba(200, 205, 215, 0.25)',
    badgeBg: 'radial-gradient(circle at 30% 30%, #c8cdd7, #6a6e78)',
    badgeColor: '#1a1a1f',
    labelColor: '#b8bdc7',
  },
  gold: {
    name: 'OURO',
    ringColor: 'rgba(212, 255, 58, 0.6)',
    glowColor: 'rgba(212, 255, 58, 0.4)',
    badgeBg: 'radial-gradient(circle at 30% 30%, #e4ff5a, #9dbf20)',
    badgeColor: '#1a1a1f',
    labelColor: '#d4ff3a',
  },
};

function BadgeIcon({ type, size = 28 }) {
  const icons = {
    flame: <IconFlame size={size} strokeWidth={1.5} />,
    bolt: <IconBolt size={size} />,
    target: <IconTarget size={size} strokeWidth={1.5} />,
    medal: <IconMedal size={size} strokeWidth={1.5} />,
    calendar: <IconCalendar size={size} strokeWidth={1.5} />,
  };
  return icons[type] || <IconMedal size={size} strokeWidth={1.5} />;
}

// Big hero medal — for featured card
function MedalHero({ achievement }) {
  const t = TIER_STYLES[achievement.tier];
  return (
    <div style={{
      position: 'relative',
      width: 90, height: 108,
      flexShrink: 0,
    }}>
      {/* Ribbons */}
      <div style={{
        position: 'absolute', top: 52, left: 18,
        width: 18, height: 52,
        background: 'linear-gradient(180deg, #d4ff3a, #9dbf20)',
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
        opacity: 0.9,
      }} />
      <div style={{
        position: 'absolute', top: 52, right: 18,
        width: 18, height: 52,
        background: 'linear-gradient(180deg, #9dbf20, #6a8b10)',
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
        opacity: 0.7,
      }} />
      {/* Medal disc */}
      <div style={{
        position: 'absolute', top: 0, left: 5,
        width: 80, height: 80, borderRadius: 9999,
        background: t.badgeBg,
        border: `2px solid ${t.ringColor}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: t.badgeColor,
        boxShadow: `0 0 32px 0 ${t.glowColor}, inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -3px 8px rgba(0,0,0,0.2)`,
      }}>
        <BadgeIcon type={achievement.icon} size={38} />
      </div>
      {/* Tier label at bottom */}
      <div style={{
        position: 'absolute', bottom: -2, left: 0, right: 0,
        textAlign: 'center',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
        color: t.labelColor,
        fontFamily: 'var(--font-display)',
      }}>{t.name}</div>
    </div>
  );
}

// Small medal for compact cards / tier summary
function MedalCompact({ achievement, size = 56, locked = false, progress = 0 }) {
  const t = TIER_STYLES[achievement?.tier || 'gold'];
  if (locked) {
    const pct = progress;
    return (
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <div style={{
          width: size, height: size, borderRadius: 9999,
          background: 'var(--bg-2)',
          border: '1px dashed rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--fg-2)',
        }}>
          <BadgeIcon type={achievement.icon} size={size * 0.45} />
        </div>
        {pct > 0 && (
          <svg width={size + 6} height={size + 6}
            style={{ position: 'absolute', inset: -3, transform: 'rotate(-90deg)' }}>
            <circle cx={(size + 6) / 2} cy={(size + 6) / 2} r={size / 2 + 1}
              fill="none" stroke="var(--accent)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * (size / 2 + 1)}
              strokeDashoffset={2 * Math.PI * (size / 2 + 1) * (1 - pct / 100)}
              style={{ filter: 'drop-shadow(0 0 4px rgba(212,255,58,0.5))' }}
            />
          </svg>
        )}
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: 9999,
      background: t.badgeBg,
      border: `2px solid ${t.ringColor}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: t.badgeColor,
      boxShadow: `0 0 20px 0 ${t.glowColor}, inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -2px 6px rgba(0,0,0,0.2)`,
      flexShrink: 0,
    }}>
      <BadgeIcon type={achievement.icon} size={size * 0.45} />
    </div>
  );
}

function TierCard({ tier, count, total }) {
  const t = TIER_STYLES[tier];
  const pct = (count / total) * 100;
  const has = count > 0;
  return (
    <div className="card-tight" style={{
      padding: 14, textAlign: 'center',
      border: has ? `1px solid ${t.ringColor}` : '1px solid var(--line)',
      position: 'relative', overflow: 'hidden',
    }}>
      {has && (
        <div style={{
          position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
          width: 80, height: 80,
          background: `radial-gradient(circle, ${t.glowColor}, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9999, margin: '2px auto 8px',
          background: has ? t.badgeBg : 'var(--bg-2)',
          border: has ? `1.5px solid ${t.ringColor}` : '1px dashed rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: has ? t.badgeColor : 'var(--fg-2)',
          boxShadow: has ? `0 0 12px ${t.glowColor}` : 'none',
        }}>
          <IconMedal size={18} strokeWidth={1.5} />
        </div>
        <div className="mono-label" style={{
          fontSize: 9, color: has ? t.labelColor : 'var(--fg-2)',
        }}>{t.name}</div>
        <div className="display" style={{
          fontSize: 20, fontWeight: 600, lineHeight: 1, marginTop: 4,
          color: has ? 'var(--fg-0)' : 'var(--fg-2)',
        }}>
          {count}<span style={{ color: 'var(--fg-2)', fontWeight: 400 }}>/{total}</span>
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ achievement, onClick }) {
  const { unlocked, name, tier, progress, total, almost, date } = achievement;
  const pct = progress && total ? Math.min((progress / total) * 100, 100) : 0;
  const t = TIER_STYLES[tier];

  return (
    <button
      onClick={onClick}
      style={{
        background: unlocked
          ? 'linear-gradient(180deg, rgba(255,255,255,0.02), var(--bg-1))'
          : 'var(--bg-1)',
        border: almost
          ? '1px solid rgba(212,255,58,0.35)'
          : unlocked
            ? `1px solid ${t.ringColor}`
            : '1px dashed rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 16,
        display: 'flex', gap: 14, alignItems: 'center',
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 300ms var(--ease)',
      }}
    >
      {unlocked && (
        <div style={{
          position: 'absolute', top: -20, right: -20,
          width: 80, height: 80,
          background: `radial-gradient(circle, ${t.glowColor}, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <MedalCompact achievement={achievement} locked={!unlocked} progress={pct} size={52} />
      </div>
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <div className="mono-label" style={{
          fontSize: 9, color: unlocked ? t.labelColor : 'var(--fg-2)',
          marginBottom: 2,
        }}>
          {unlocked ? t.name : (almost ? 'QUASE LÁ' : 'BLOQUEADA')}
        </div>
        <div style={{
          fontSize: 13, fontWeight: 500, lineHeight: 1.2,
          color: unlocked ? 'var(--fg-0)' : 'var(--fg-1)',
        }}>{name}</div>
        <div style={{
          fontSize: 10, color: almost ? 'var(--accent)' : 'var(--fg-2)',
          marginTop: 4, fontVariantNumeric: 'tabular-nums',
        }}>
          {unlocked ? date : `${progress}/${total}`}
        </div>
      </div>
    </button>
  );
}

function AchievementDetail({ achievement, onClose }) {
  const { unlocked, name, desc, tier, progress, total, date } = achievement;
  const pct = progress && total ? Math.min((progress / total) * 100, 100) : 100;
  const t = TIER_STYLES[tier];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: 24 }}>
      <div
        onClick={e => e.stopPropagation()}
        className={unlocked ? 'unlock-pop' : 'fade-up'}
        style={{
          width: '100%', maxWidth: 320,
          background: 'var(--bg-1)',
          border: unlocked ? `1px solid ${t.ringColor}` : '1px solid var(--line)',
          borderRadius: 24,
          padding: '32px 28px 28px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: unlocked ? `0 0 80px 0 ${t.glowColor}` : 'none',
        }}
      >
        {unlocked && (
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 320, height: 240,
            background: `radial-gradient(ellipse, ${t.glowColor}, transparent 60%)`,
            pointerEvents: 'none',
          }} />
        )}

        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 2,
            width: 32, height: 32, borderRadius: 9999,
            background: 'var(--bg-2)', border: 'none',
            color: 'var(--fg-1)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        ><IconX size={16} /></button>

        <div style={{ position: 'relative' }}>
          {unlocked ? (
            <div style={{ margin: '8px auto 20px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 140, height: 160 }}>
                {/* ribbons */}
                <div style={{
                  position: 'absolute', top: 88, left: 38,
                  width: 24, height: 72,
                  background: 'linear-gradient(180deg, #d4ff3a, #9dbf20)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
                }} />
                <div style={{
                  position: 'absolute', top: 88, right: 38,
                  width: 24, height: 72,
                  background: 'linear-gradient(180deg, #9dbf20, #6a8b10)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
                }} />
                {/* big medal */}
                <div style={{
                  position: 'absolute', top: 0, left: 10,
                  width: 120, height: 120, borderRadius: 9999,
                  background: t.badgeBg,
                  border: `3px solid ${t.ringColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.badgeColor,
                  boxShadow: `0 0 48px 0 ${t.glowColor}, inset 0 4px 12px rgba(255,255,255,0.35), inset 0 -4px 12px rgba(0,0,0,0.25)`,
                }}>
                  <BadgeIcon type={achievement.icon} size={54} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              width: 120, height: 120, borderRadius: 9999, margin: '12px auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-2)',
              border: '1px dashed rgba(255,255,255,0.15)',
              color: 'var(--fg-2)',
              position: 'relative',
            }}>
              <BadgeIcon type={achievement.icon} size={52} />
              {progress > 0 && (
                <svg width={126} height={126}
                  style={{ position: 'absolute', inset: -3, transform: 'rotate(-90deg)' }}>
                  <circle cx={63} cy={63} r={61}
                    fill="none" stroke="var(--accent)" strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 61}
                    strokeDashoffset={2 * Math.PI * 61 * (1 - pct / 100)}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(212,255,58,0.5))' }}
                  />
                </svg>
              )}
            </div>
          )}

          <div className="mono-label" style={{ color: unlocked ? t.labelColor : 'var(--fg-2)', fontSize: 10 }}>
            {unlocked ? `DESBLOQUEADA · ${t.name}` : `EM PROGRESSO · ${t.name}`}
          </div>
          <div className="display" style={{ fontSize: 28, fontWeight: 500, marginTop: 6, letterSpacing: '-0.02em' }}>
            {name}
          </div>
          <div style={{ fontSize: 14, color: 'var(--fg-1)', marginTop: 6, lineHeight: 1.5 }}>
            {desc}
          </div>

          {unlocked ? (
            <div style={{
              marginTop: 20, padding: '12px 16px',
              background: 'rgba(212,255,58,0.06)',
              border: '1px solid rgba(212,255,58,0.2)',
              borderRadius: 10,
              fontSize: 12, color: 'var(--fg-1)',
            }}>
              Conquistada em <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{date}</span>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: 'var(--fg-1)' }}>progresso</span>
                <span style={{ color: 'var(--fg-0)', fontWeight: 500 }}>{progress}/{total}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${pct}%`,
                  background: 'var(--accent)',
                  boxShadow: '0 0 12px 0 var(--accent-glow)',
                }} />
              </div>
            </div>
          )}

          {unlocked && (
            <button className="btn" style={{
              marginTop: 20, width: '100%', height: 44,
              background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-0)',
            }}>
              <IconShare size={14} /> Compartilhar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AchievementsScreen });
