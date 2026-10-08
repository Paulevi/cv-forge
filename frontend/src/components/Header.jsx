import { Sun, Moon } from 'lucide-react'

export default function Header({ dark, onToggle }) {
  return (
    <header style={{
      background: 'var(--surface)',
      borderBottom: '2px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #1570ef, #6941c6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(21,112,239,0.35)',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: 'Bricolage Grotesque, sans-serif' }}>CV</span>
          </div>
          <div>
            <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)', letterSpacing: '-0.3px' }}>CVForge</span>
            <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 8, fontWeight: 400 }}>Powered by Mistral AI</span>
          </div>
        </div>
        <button onClick={onToggle} title="Changer le thème" style={{
          background: 'var(--surface2)', border: '1.5px solid var(--border)',
          borderRadius: 8, padding: '7px 10px', cursor: 'pointer',
          color: 'var(--text2)', display: 'flex', alignItems: 'center',
          boxShadow: 'var(--shadow-sm)', transition: 'all 0.15s',
        }}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  )
}
