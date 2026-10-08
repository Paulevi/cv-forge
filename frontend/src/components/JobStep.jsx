import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Upload, FileText } from 'lucide-react'

const T = {
  card: { background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:12, padding:28, boxShadow:'var(--shadow-sm)' },
  input: { width:'100%', padding:'10px 14px', borderRadius:8, border:'1.5px solid var(--border)', background:'var(--surface)', color:'var(--text)', fontSize:14, outline:'none', transition:'border-color 0.15s, box-shadow 0.15s' },
  label: { display:'block', fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:6 },
  btnPrimary: { background:'var(--blue)', color:'#fff', border:'1.5px solid var(--blue)', borderRadius:8, padding:'10px 20px', fontWeight:600, fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, boxShadow:'0 1px 4px rgba(21,112,239,0.25)' },
  btnOutline: { background:'var(--surface)', color:'var(--text2)', border:'1.5px solid var(--border)', borderRadius:8, padding:'8px 14px', fontWeight:500, fontSize:13, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, boxShadow:'var(--shadow-sm)' },
  btnGhost: { background:'none', color:'var(--text2)', border:'none', borderRadius:8, padding:'8px 12px', fontWeight:500, fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 },
}
const focus = e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(21,112,239,0.12)' }
const blur  = e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }

export default function JobStep({ value, onChange, onNext, onBack }) {
  const fileRef = useRef()
  const valid = value.trim().length > 30

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.name.endsWith('.pdf')) {
      const text = await file.text().catch(() => '')
      onChange(text.trim() || '[PDF importé — contenu non extractible, collez le texte manuellement]')
    } else {
      const reader = new FileReader()
      reader.onload = ev => onChange(ev.target.result)
      reader.readAsText(file)
    }
    e.target.value = ''
  }

  return (
    <div style={{ maxWidth: 740, margin: '0 auto' }}>
      <div style={T.card}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24, paddingBottom:20, borderBottom:'1.5px solid var(--border)' }}>
          <div style={{ width:44, height:44, borderRadius:11, background:'var(--orange-lt)', border:'1.5px solid var(--orange-bd)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <FileText size={20} style={{ color:'var(--orange)' }}/>
          </div>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:'Bricolage Grotesque, sans-serif', fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:2 }}>Description du poste</h2>
            <p style={{ fontSize:13, color:'var(--text3)' }}>Collez ou importez la fiche de poste ciblée — plus elle est complète, meilleur sera le résultat.</p>
          </div>
          <div>
            <button type="button" style={T.btnOutline} onClick={()=>fileRef.current.click()}>
              <Upload size={14}/> Importer (.txt / .pdf)
            </button>
            <input ref={fileRef} type="file" accept=".txt,.md,.pdf" onChange={handleFile} style={{ display:'none' }}/>
          </div>
        </div>

        {/* Textarea */}
        <label style={T.label}>Contenu de l'offre *</label>
        <textarea
          style={{ ...T.input, resize:'vertical', lineHeight:1.7, minHeight:280 }}
          rows={14}
          value={value}
          placeholder={"Collez ici la description complète du poste...\n\nExemple :\n• Titre du poste\n• Responsabilités et missions\n• Compétences requises\n• Stack technique\n• Profil recherché"}
          onChange={e=>onChange(e.target.value)}
          onFocus={focus} onBlur={blur}
        />

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10 }}>
          <span style={{ fontSize:12, color: valid ? 'var(--green)' : 'var(--text3)', fontWeight: valid ? 500 : 400 }}>
            {valid ? `✓ ${value.length} caractères — prêt` : `Minimum 30 caractères (${value.length} actuellement)`}
          </span>
        </div>

        {/* Tip */}
        <div style={{ marginTop:16, padding:'12px 16px', background:'var(--blue-lt)', border:'1.5px solid var(--blue-bd)', borderRadius:9 }}>
          <p style={{ fontSize:13, color:'var(--blue)', lineHeight:1.55 }}>
            <strong>💡 Conseil :</strong> Incluez le titre du poste, la stack technique et les compétences requises pour maximiser la pertinence des mots-clés ATS générés.
          </p>
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:16 }}>
        <button style={T.btnGhost} onClick={onBack}><ChevronLeft size={15}/> Retour au profil</button>
        <button style={{ ...T.btnPrimary, opacity: valid?1:0.45 }} onClick={onNext} disabled={!valid}>
          Continuer <ChevronRight size={15}/>
        </button>
      </div>
    </div>
  )
}
