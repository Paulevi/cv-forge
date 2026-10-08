import { useState } from 'react'
import { ChevronLeft, Sparkles, Zap, Palette, FileText, AlertCircle } from 'lucide-react'

const DOCS = [
  { id:'ats',    label:'CV ATS',             desc:'Structuré pour passer les filtres automatiques, mots-clés ciblés', icon:Zap,      color:'var(--blue)',   bg:'var(--blue-lt)',   bd:'var(--blue-bd)' },
  { id:'design', label:'CV Design',          desc:'Visuel et percutant, met en avant vos réalisations clés',          icon:Palette,  color:'var(--purple)', bg:'var(--purple-lt)', bd:'var(--purple-bd)' },
  { id:'cover',  label:'Lettre de motivation', desc:'Personnalisée, connecte vos vraies compétences aux besoins du poste', icon:FileText, color:'var(--orange)', bg:'var(--orange-lt)', bd:'var(--orange-bd)' },
]

const T = {
  card: { background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:12, padding:28, boxShadow:'var(--shadow-sm)' },
  btnPrimary: { background:'var(--blue)', color:'#fff', border:'1.5px solid var(--blue)', borderRadius:8, padding:'12px 24px', fontWeight:600, fontSize:15, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8, width:'100%', justifyContent:'center', boxShadow:'0 1px 4px rgba(21,112,239,0.25)' },
  btnGhost: { background:'none', color:'var(--text2)', border:'none', borderRadius:8, padding:'8px 12px', fontWeight:500, fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 },
}

function Spinner({ size=16, color='#fff' }) {
  return <div style={{ width:size, height:size, border:`2px solid ${color}30`, borderTopColor:color, borderRadius:'50%', animation:'spin 0.7s linear infinite', flexShrink:0 }}/>
}

export default function GenerateStep({ candidate, jobDesc, onDone, onBack }) {
  const [sel, setSel] = useState({ ats:true, design:true, cover:true })
  const [loading, setLoading] = useState(false)
  const [prog, setProg] = useState({})
  const [error, setError] = useState(null)

  const toggle = id => setSel(s => ({ ...s, [id]: !s[id] }))
  const any = Object.values(sel).some(Boolean)

  const run = async () => {
    setLoading(true); setError(null); setProg({})
    const res = {}
    const body = { candidate, jobDescription: jobDesc }
    try {
      if (sel.ats) {
        setProg(p=>({...p,ats:'loading'}))
        const r = await fetch('/api/generate-cv', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...body,cvType:'ats'}) })
        if (!r.ok) throw new Error((await r.json()).detail||'Erreur CV ATS')
        res.ats = (await r.json()).data
        setProg(p=>({...p,ats:'done'}))
      }
      if (sel.design) {
        setProg(p=>({...p,design:'loading'}))
        const r = await fetch('/api/generate-cv', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...body,cvType:'design'}) })
        if (!r.ok) throw new Error((await r.json()).detail||'Erreur CV Design')
        res.design = (await r.json()).data
        setProg(p=>({...p,design:'done'}))
      }
      if (sel.cover) {
        setProg(p=>({...p,cover:'loading'}))
        const r = await fetch('/api/generate-cover-letter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
        if (!r.ok) throw new Error((await r.json()).detail||'Erreur lettre')
        res.cover = (await r.json()).data
        setProg(p=>({...p,cover:'done'}))
      }
      setTimeout(()=>onDone(res), 400)
    } catch(e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth:580, margin:'0 auto' }}>
      <div style={T.card}>
        {/* Title */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:'var(--green-lt)', border:'1.5px solid var(--green-bd)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
            <Sparkles size={24} style={{ color:'var(--green)' }}/>
          </div>
          <h2 style={{ fontFamily:'Bricolage Grotesque, sans-serif', fontSize:20, fontWeight:700, color:'var(--text)', marginBottom:6 }}>
            Choisissez vos documents
          </h2>
          <p style={{ fontSize:13, color:'var(--text3)' }}>Sélectionnez ce que vous souhaitez générer avec Mistral AI</p>
        </div>

        {/* Doc cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {DOCS.map(({ id, label, desc, icon:Icon, color, bg, bd }) => {
            const active = sel[id]
            return (
              <div key={id} onClick={()=>!loading&&toggle(id)}
                style={{
                  display:'flex', alignItems:'center', gap:16, padding:'14px 18px',
                  borderRadius:10, cursor: loading?'default':'pointer',
                  border:`2px solid ${active ? bd : 'var(--border)'}`,
                  background: active ? bg : 'var(--surface2)',
                  boxShadow: active ? `0 0 0 1px ${bd}` : 'none',
                  transition:'all 0.15s',
                }}>
                <div style={{ width:40, height:40, borderRadius:10, background: active ? 'rgba(255,255,255,0.6)' : 'var(--surface)', border:`1.5px solid ${active ? bd : 'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={18} style={{ color }}/>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:2 }}>{label}</p>
                  <p style={{ fontSize:12, color:'var(--text3)', lineHeight:1.4 }}>{desc}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                  {prog[id]==='loading' && <Spinner color={color} size={16}/>}
                  {prog[id]==='done'    && <span style={{ color:'var(--green)', fontSize:18, fontWeight:700 }}>✓</span>}
                  <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${active ? color : 'var(--border)'}`, background: active ? color : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
                    {active && <span style={{ color:'#fff', fontSize:12, fontWeight:800 }}>✓</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Error */}
        {error && (
          <div style={{ display:'flex', gap:12, padding:'12px 16px', background:'var(--red-lt)', border:'1.5px solid var(--red-bd)', borderRadius:9, marginBottom:16 }}>
            <AlertCircle size={17} style={{ color:'var(--red)', flexShrink:0, marginTop:1 }}/>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:'var(--red)', marginBottom:3 }}>Erreur de génération</p>
              <p style={{ fontSize:12, color:'var(--text2)' }}>{error}</p>
              <p style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>Vérifiez que MISTRAL_API_KEY est défini dans <code>backend/.env</code></p>
            </div>
          </div>
        )}

        {/* Button */}
        {!loading ? (
          <button style={{ ...T.btnPrimary, opacity: any?1:0.45 }} onClick={run} disabled={!any}>
            <Sparkles size={18}/> Générer avec Mistral AI
          </button>
        ) : (
          <div style={{ padding:'20px 0', textAlign:'center' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-start', maxWidth:220, margin:'0 auto' }}>
              {DOCS.filter(d=>sel[d.id]).map(d=>(
                <div key={d.id} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--text2)' }}>
                  {prog[d.id]==='done' ? <span style={{ color:'var(--green)', fontWeight:700 }}>✓</span>
                   : prog[d.id]==='loading' ? <Spinner color='var(--blue)' size={14}/>
                   : <span style={{ color:'var(--text3)' }}>○</span>}
                  {d.label}
                </div>
              ))}
            </div>
            <p style={{ fontSize:12, color:'var(--text3)', marginTop:16 }}>Génération en cours, patientez 15–30 secondes...</p>
          </div>
        )}
      </div>

      {!loading && (
        <div style={{ marginTop:14 }}>
          <button style={T.btnGhost} onClick={onBack}><ChevronLeft size={15}/> Retour</button>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
