import { useState } from 'react'
import { ChevronLeft, Download, RefreshCw, Zap, Palette, FileText } from 'lucide-react'
import ATSPreview from './ATSPreview.jsx'
import DesignPreview from './DesignPreview.jsx'
import LetterPreview from './LetterPreview.jsx'
import { exportToPDF } from '../utils/exportPDF.js'

const T = {
  btnPrimary: { background:'var(--blue)', color:'#fff', border:'1.5px solid var(--blue)', borderRadius:8, padding:'9px 18px', fontWeight:600, fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, boxShadow:'0 1px 4px rgba(21,112,239,0.25)' },
  btnOutline: { background:'var(--surface)', color:'var(--text2)', border:'1.5px solid var(--border)', borderRadius:8, padding:'8px 14px', fontWeight:500, fontSize:13, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, boxShadow:'var(--shadow-sm)' },
  btnGhost: { background:'none', color:'var(--text2)', border:'none', borderRadius:8, padding:'8px 12px', fontWeight:500, fontSize:14, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5 },
}

export default function ResultsStep({ results, candidate, onBack, onReset }) {
  const tabs = [
    results.ats    && { id:'ats',    label:'CV ATS',    icon:Zap,      color:'var(--blue)',   bd:'var(--blue-bd)',   bg:'var(--blue-lt)' },
    results.design && { id:'design', label:'CV Design', icon:Palette,  color:'var(--purple)', bd:'var(--purple-bd)', bg:'var(--purple-lt)' },
    results.cover  && { id:'cover',  label:'Lettre',    icon:FileText, color:'var(--orange)', bd:'var(--orange-bd)', bg:'var(--orange-lt)' },
  ].filter(Boolean)

  const [active, setActive] = useState(tabs[0]?.id)
  const [exporting, setExporting] = useState(false)

  const doExport = async () => {
    setExporting(true)
    const ids   = { ats:'preview-ats', design:'preview-design', cover:'preview-cover' }
    const names = { ats:`CV_ATS_${candidate.firstName}_${candidate.lastName}`, design:`CV_Design_${candidate.firstName}_${candidate.lastName}`, cover:`Lettre_${candidate.firstName}_${candidate.lastName}` }
    try { await exportToPDF(ids[active], names[active]) } finally { setExporting(false) }
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:12, padding:'16px 20px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'var(--shadow-sm)', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontFamily:'Bricolage Grotesque, sans-serif', fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:2 }}>Documents générés ✨</h2>
          <p style={{ fontSize:13, color:'var(--text3)' }}>{tabs.length} document(s) · Cliquez sur un onglet pour prévisualiser</p>
        </div>
        <button style={{ ...T.btnPrimary, opacity: exporting?0.7:1 }} onClick={doExport} disabled={exporting}>
          {exporting
            ? <span style={{ width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.7s linear infinite' }}/>
            : <Download size={14}/>}
          {exporting ? 'Export en cours...' : 'Exporter en PDF'}
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:6, marginBottom:16 }}>
        {tabs.map(({ id, label, icon:Icon, color, bg, bd }) => (
          <button key={id} onClick={()=>setActive(id)} style={{
            display:'flex', alignItems:'center', gap:7, padding:'10px 18px',
            borderRadius:9, border: `1.5px solid ${active===id ? bd : 'var(--border)'}`,
            cursor:'pointer', fontSize:13, fontWeight: active===id ? 600 : 500,
            background: active===id ? bg : 'var(--surface)',
            color: active===id ? color : 'var(--text3)',
            boxShadow: active===id ? 'var(--shadow-sm)' : 'none',
            transition:'all 0.15s',
          }}>
            <Icon size={14}/> {label}
          </button>
        ))}
      </div>

      {/* Preview container */}
      <div style={{ background:'#dde1e7', border:'1.5px solid var(--border)', borderRadius:12, padding:24, overflowX:'auto', boxShadow:'inset 0 2px 8px rgba(0,0,0,0.06)' }}>
        {active==='ats'    && results.ats    && <ATSPreview    data={results.ats}/>}
        {active==='design' && results.design && <DesignPreview data={results.design}/>}
        {active==='cover'  && results.cover  && <LetterPreview data={results.cover} candidate={candidate}/>}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', marginTop:16 }}>
        <button style={T.btnGhost} onClick={onBack}><ChevronLeft size={15}/> Modifier</button>
        <button style={T.btnOutline} onClick={onReset}><RefreshCw size={14}/> Recommencer</button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
