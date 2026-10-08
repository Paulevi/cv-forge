const STEPS = [
  { n: 1, label: 'Profil', desc: 'Vos informations' },
  { n: 2, label: 'Poste', desc: 'Description du poste' },
  { n: 3, label: 'Générer', desc: 'Choix des documents' },
  { n: 4, label: 'Résultats', desc: 'Prévisualisation' },
]

export default function StepBar({ current }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1.5px solid var(--border)',
      borderRadius: 14, padding: '20px 32px', marginBottom: 28,
      boxShadow: 'var(--shadow-sm)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {STEPS.map((s, i) => {
        const done = s.n < current
        const active = s.n === current
        return (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: done ? 'var(--green-lt)' : active ? 'var(--blue)' : 'var(--surface2)',
                color: done ? 'var(--green)' : active ? '#fff' : 'var(--text3)',
                border: `2px solid ${done ? 'var(--green-bd)' : active ? 'var(--blue)' : 'var(--border)'}`,
                boxShadow: active ? '0 0 0 4px rgba(21,112,239,0.15)' : 'none',
                transition: 'all 0.25s',
              }}>
                {done ? '✓' : s.n}
              </div>
              <div style={{ display: 'none', flexDirection: 'column' }} className="step-label">
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? 'var(--text)' : done ? 'var(--green)' : 'var(--text3)' }}>{s.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{s.desc}</span>
              </div>
              <div style={{ flexDirection: 'column' }}>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? 'var(--text)' : done ? 'var(--green)' : 'var(--text3)' }}>{s.label}</span>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: '0 16px', background: done ? 'var(--green)' : 'var(--border)', borderRadius: 2, transition: 'background 0.3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
