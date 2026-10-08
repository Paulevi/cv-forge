import { useState } from 'react'

/* ─────────────────────────────────────────────────────────
   3 templates ATS — tous lisibles, structurés, sans image
   Template 1 : Classique   (Times-like, 2 traits noirs)
   Template 2 : Moderne     (Inter, accent bleu marine)
   Template 3 : Compact     (colonne de gauche colorée)
───────────────────────────────────────────────────────── */

/* ── Template 1 : Classique ── */
function ATS1({ d }) {
  const { header, summary, skills, experiences, education, languages, keywords } = d.sections
  const S = { fontFamily:'Georgia, "Times New Roman", serif', fontSize:'10.5pt', color:'#111', lineHeight:1.55 }
  return (
    <div id="preview-ats" style={{ ...S, background:'#fff', maxWidth:794, margin:'0 auto', padding:'42px 52px', boxShadow:'0 4px 24px rgba(0,0,0,0.13)' }}>
      <div style={{ borderBottom:'2.5px solid #111', paddingBottom:12, marginBottom:6 }}>
        <h1 style={{ fontSize:'22pt', fontWeight:700, margin:'0 0 3px', letterSpacing:'-0.3px' }}>{header?.name}</h1>
        <p style={{ fontSize:'12pt', color:'#1a1a8c', fontWeight:600, margin:'0 0 8px' }}>{header?.title}</p>
        <div style={{ borderTop:'1px solid #bbb', paddingTop:8, display:'flex', flexWrap:'wrap', gap:'4px 20px', fontSize:'9pt', color:'#444' }}>
          {[header?.contact?.email, header?.contact?.phone, header?.contact?.location, header?.contact?.linkedin, header?.contact?.github].filter(Boolean).map((v,i)=><span key={i}>{v}</span>)}
        </div>
      </div>
      {summary && <Blk1 t="PROFIL"><p style={{ textAlign:'justify', color:'#222' }}>{summary}</p></Blk1>}
      {skills && <Blk1 t="COMPÉTENCES">
        {skills.technical?.length>0 && <p style={{ marginBottom:3 }}><b>Techniques :</b> {skills.technical.join(' · ')}</p>}
        {skills.soft?.length>0      && <p><b>Savoir-être :</b> {skills.soft.join(' · ')}</p>}
      </Blk1>}
      {experiences?.length>0 && <Blk1 t="EXPÉRIENCES PROFESSIONNELLES">
        {experiences.map((e,i)=>(
          <div key={i} style={{ marginBottom:13 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span><b>{e.title}</b> — {e.company}{e.location?`, ${e.location}`:''}</span>
              <span style={{ fontSize:'9pt', color:'#666', whiteSpace:'nowrap', marginLeft:10 }}>{e.duration}</span>
            </div>
            <ul style={{ margin:'4px 0 0 18px', padding:0, color:'#333' }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:2 }}>{b}</li>)}</ul>
          </div>
        ))}
      </Blk1>}
      {education?.length>0 && <Blk1 t="FORMATION">
        {education.map((e,i)=>(
          <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
            <span><b>{e.degree}</b> — {e.school}{e.details?` · ${e.details}`:''}</span>
            <span style={{ fontSize:'9pt', color:'#666', whiteSpace:'nowrap', marginLeft:10 }}>{e.year}</span>
          </div>
        ))}
      </Blk1>}
      {languages?.length>0 && <Blk1 t="LANGUES"><p>{languages.join(' · ')}</p></Blk1>}
      {keywords?.length>0 && <KwBadge kw={keywords}/>}
    </div>
  )
}
function Blk1({ t, children }) {
  return (
    <div style={{ marginBottom:15 }}>
      <h2 style={{ fontSize:'9.5pt', fontWeight:700, letterSpacing:'1.3px', textTransform:'uppercase', borderBottom:'1px solid #ccc', paddingBottom:3, marginBottom:8, color:'#111' }}>{t}</h2>
      {children}
    </div>
  )
}

/* ── Template 2 : Moderne bleu marine ── */
function ATS2({ d }) {
  const { header, summary, skills, experiences, education, languages, keywords } = d.sections
  const NAVY = '#0f2d5c'
  return (
    <div id="preview-ats" style={{ background:'#fff', maxWidth:794, margin:'0 auto', fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:'10.5pt', color:'#1a1a1a', lineHeight:1.55, boxShadow:'0 4px 24px rgba(0,0,0,0.13)', overflow:'hidden' }}>
      {/* Header band */}
      <div style={{ background:NAVY, padding:'28px 44px 22px', color:'#fff' }}>
        <h1 style={{ fontSize:'24pt', fontWeight:700, margin:'0 0 4px', letterSpacing:'-0.4px' }}>{header?.name}</h1>
        <p style={{ fontSize:'12.5pt', color:'#93c5fd', fontWeight:600, margin:'0 0 12px' }}>{header?.title}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'3px 20px', fontSize:'9pt', color:'rgba(255,255,255,0.75)' }}>
          {[header?.contact?.email, header?.contact?.phone, header?.contact?.location, header?.contact?.linkedin, header?.contact?.github].filter(Boolean).map((v,i)=><span key={i}>{v}</span>)}
        </div>
      </div>
      <div style={{ padding:'24px 44px' }}>
        {summary && <Blk2 t="PROFIL" navy={NAVY}><p style={{ color:'#333', textAlign:'justify' }}>{summary}</p></Blk2>}
        {skills && <Blk2 t="COMPÉTENCES" navy={NAVY}>
          {skills.technical?.length>0 && <p style={{ marginBottom:4 }}><b style={{ color:NAVY }}>Techniques :</b> {skills.technical.join(' · ')}</p>}
          {skills.soft?.length>0      && <p><b style={{ color:NAVY }}>Savoir-être :</b> {skills.soft.join(' · ')}</p>}
        </Blk2>}
        {experiences?.length>0 && <Blk2 t="EXPÉRIENCES" navy={NAVY}>
          {experiences.map((e,i)=>(
            <div key={i} style={{ marginBottom:14, paddingLeft:12, borderLeft:`3px solid ${i===0?'#f59e0b':'#dbeafe'}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <span><b style={{ fontSize:'11pt' }}>{e.title}</b> <span style={{ color:'#2563eb' }}>@ {e.company}</span></span>
                <span style={{ fontSize:'9pt', color:'#888', whiteSpace:'nowrap', marginLeft:10 }}>{e.duration}</span>
              </div>
              <ul style={{ margin:'4px 0 0 14px', padding:0, color:'#444' }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:2 }}>{b}</li>)}</ul>
            </div>
          ))}
        </Blk2>}
        {education?.length>0 && <Blk2 t="FORMATION" navy={NAVY}>
          {education.map((e,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
              <span><b>{e.degree}</b> — <span style={{ color:'#555' }}>{e.school}</span>{e.details?` · ${e.details}`:''}</span>
              <span style={{ fontSize:'9pt', color:'#888', whiteSpace:'nowrap', marginLeft:10 }}>{e.year}</span>
            </div>
          ))}
        </Blk2>}
        {languages?.length>0 && <Blk2 t="LANGUES" navy={NAVY}><p>{languages.join(' · ')}</p></Blk2>}
        {keywords?.length>0 && <KwBadge kw={keywords}/>}
      </div>
    </div>
  )
}
function Blk2({ t, children, navy }) {
  return (
    <div style={{ marginBottom:16 }}>
      <h2 style={{ fontSize:'9pt', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:navy, borderBottom:`2px solid ${navy}`, paddingBottom:4, marginBottom:9 }}>{t}</h2>
      {children}
    </div>
  )
}

/* ── Template 3 : Compact colonne gauche ── */
function ATS3({ d }) {
  const { header, summary, skills, experiences, education, languages, keywords } = d.sections
  const TEAL = '#0d7377'
  return (
    <div id="preview-ats" style={{ background:'#fff', maxWidth:794, margin:'0 auto', fontFamily:"Arial,Helvetica,sans-serif", fontSize:'10pt', color:'#111', lineHeight:1.5, boxShadow:'0 4px 24px rgba(0,0,0,0.13)', display:'grid', gridTemplateColumns:'220px 1fr', overflow:'hidden' }}>
      {/* Left column */}
      <div style={{ background:'#f0fafa', borderRight:`3px solid ${TEAL}`, padding:'32px 20px' }}>
        <div style={{ marginBottom:20, paddingBottom:16, borderBottom:`1px solid #b2dfdb` }}>
          <h1 style={{ fontSize:'16pt', fontWeight:700, color:TEAL, margin:'0 0 4px', lineHeight:1.2 }}>{header?.name}</h1>
          <p style={{ fontSize:'10pt', color:'#555', fontWeight:600, margin:0 }}>{header?.title}</p>
        </div>
        <SideBlk3 t="CONTACT" teal={TEAL}>
          <div style={{ display:'flex', flexDirection:'column', gap:4, fontSize:'9pt', color:'#333' }}>
            {[header?.contact?.email, header?.contact?.phone, header?.contact?.location, header?.contact?.linkedin, header?.contact?.github].filter(Boolean).map((v,i)=><span key={i} style={{ wordBreak:'break-all' }}>{v}</span>)}
          </div>
        </SideBlk3>
        {skills?.technical?.length>0 && <SideBlk3 t="COMPÉTENCES" teal={TEAL}>
          {skills.technical.map((s,i)=>(
            <div key={i} style={{ fontSize:'9.5pt', color:'#222', padding:'2px 0', borderBottom:'1px dotted #b2dfdb' }}>{s}</div>
          ))}
        </SideBlk3>}
        {skills?.soft?.length>0 && <SideBlk3 t="SAVOIR-ÊTRE" teal={TEAL}>
          {skills.soft.map((s,i)=><div key={i} style={{ fontSize:'9.5pt', color:'#444', padding:'2px 0' }}>• {s}</div>)}
        </SideBlk3>}
        {languages?.length>0 && <SideBlk3 t="LANGUES" teal={TEAL}>
          {languages.map((l,i)=><div key={i} style={{ fontSize:'9.5pt', color:'#333', padding:'2px 0' }}>{l}</div>)}
        </SideBlk3>}
      </div>
      {/* Right column */}
      <div style={{ padding:'32px 28px' }}>
        {summary && <MainBlk3 t="PROFIL" teal={TEAL}><p style={{ color:'#333', textAlign:'justify' }}>{summary}</p></MainBlk3>}
        {experiences?.length>0 && <MainBlk3 t="EXPÉRIENCES" teal={TEAL}>
          {experiences.map((e,i)=>(
            <div key={i} style={{ marginBottom:13 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <b style={{ color:'#111', fontSize:'10.5pt' }}>{e.title}</b>
                <span style={{ fontSize:'9pt', color:'#777', whiteSpace:'nowrap', marginLeft:8 }}>{e.duration}</span>
              </div>
              <p style={{ fontSize:'9.5pt', color:TEAL, fontWeight:600, margin:'1px 0 4px' }}>{e.company}</p>
              <ul style={{ margin:'0 0 0 14px', padding:0, color:'#444', fontSize:'9.5pt' }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:2 }}>{b}</li>)}</ul>
            </div>
          ))}
        </MainBlk3>}
        {education?.length>0 && <MainBlk3 t="FORMATION" teal={TEAL}>
          {education.map((e,i)=>(
            <div key={i} style={{ marginBottom:9 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <b>{e.degree}</b>
                <span style={{ fontSize:'9pt', color:'#777', whiteSpace:'nowrap', marginLeft:8 }}>{e.year}</span>
              </div>
              <p style={{ fontSize:'9.5pt', color:'#555', margin:'1px 0 0' }}>{e.school}{e.details?` · ${e.details}`:''}</p>
            </div>
          ))}
        </MainBlk3>}
        {keywords?.length>0 && <KwBadge kw={keywords}/>}
      </div>
    </div>
  )
}
function SideBlk3({ t, children, teal }) {
  return (
    <div style={{ marginBottom:18 }}>
      <h2 style={{ fontSize:'8.5pt', fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase', color:teal, marginBottom:7, paddingBottom:3, borderBottom:`1px solid #b2dfdb` }}>{t}</h2>
      {children}
    </div>
  )
}
function MainBlk3({ t, children, teal }) {
  return (
    <div style={{ marginBottom:18 }}>
      <h2 style={{ fontSize:'9.5pt', fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase', color:teal, borderBottom:`2px solid ${teal}`, paddingBottom:3, marginBottom:9 }}>{t}</h2>
      {children}
    </div>
  )
}

/* ── Shared keywords badge ── */
function KwBadge({ kw }) {
  return (
    <div style={{ marginTop:18, padding:'9px 14px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:7 }}>
      <p style={{ fontSize:'8pt', fontWeight:700, color:'#1d4ed8', marginBottom:5 }}>🎯 Mots-clés ATS intégrés ({kw.length})</p>
      <p style={{ fontSize:'9pt', color:'#2563eb' }}>{kw.join(', ')}</p>
    </div>
  )
}

/* ── Selector wrapper ── */
const ATS_TEMPLATES = [
  { id:1, label:'Classique',  desc:'Style sobre, typographie serif' },
  { id:2, label:'Moderne',    desc:'Bandeau bleu marine, accent coloré' },
  { id:3, label:'Compact',    desc:'Colonne latérale, bicolore vert' },
]

export default function ATSPreview({ data }) {
  const [tpl, setTpl] = useState(1)
  if (!data?.sections) return <p style={{ textAlign:'center', color:'#666', padding:40 }}>Données manquantes</p>

  return (
    <div>
      {/* Template picker */}
      <div style={{ display:'flex', gap:8, marginBottom:16, justifyContent:'center' }}>
        {ATS_TEMPLATES.map(t => (
          <button key={t.id} onClick={()=>setTpl(t.id)} style={{
            padding:'8px 16px', borderRadius:8, cursor:'pointer', fontSize:12, fontWeight:600,
            border:`2px solid ${tpl===t.id ? '#1570ef' : '#d0d5dd'}`,
            background: tpl===t.id ? '#eff4ff' : '#fff',
            color: tpl===t.id ? '#1570ef' : '#667085',
            transition:'all 0.15s',
          }}>
            {t.label}
            <span style={{ display:'block', fontSize:10, fontWeight:400, color: tpl===t.id?'#4d9ff8':'#9ca3af' }}>{t.desc}</span>
          </button>
        ))}
      </div>
      {tpl===1 && <ATS1 d={data}/>}
      {tpl===2 && <ATS2 d={data}/>}
      {tpl===3 && <ATS3 d={data}/>}
    </div>
  )
}
