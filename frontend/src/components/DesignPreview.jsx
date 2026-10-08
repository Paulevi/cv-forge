import { useState } from 'react'

/* ─────────────────────────────────────────────────────────
   3 templates DESIGN — visuels, différenciés
   Template 1 : Élégant   (header sombre, 2 colonnes)
   Template 2 : Créatif   (header coloré dégradé, timeline)
   Template 3 : Minimaliste premium (ligne or, épuré luxe)
───────────────────────────────────────────────────────── */

function getName(s) { return typeof s==='object' ? s.name : s }
function getLevel(s) { return typeof s==='object' ? (s.level||3) : 3 }

/* ── Template 1 : Élégant bicolonne ── */
function Design1({ d }) {
  const { header, about, highlights, skills, experiences, education, languages } = d.sections
  const DARK = '#1e3a5f', ACC = '#2563eb'
  return (
    <div id="preview-design" style={{ background:'#fff', maxWidth:794, margin:'0 auto', fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:'10pt', color:'#111', lineHeight:1.55, boxShadow:'0 4px 24px rgba(0,0,0,0.13)', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ background:DARK, padding:'32px 44px 26px', color:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
        <h1 style={{ fontSize:'26pt', fontWeight:800, margin:'0 0 4px', letterSpacing:'-0.5px' }}>{header?.name}</h1>
        <p style={{ fontSize:'13pt', color:'#93c5fd', fontWeight:600, margin:'0 0 4px' }}>{header?.title}</p>
        {header?.tagline && <p style={{ fontSize:'10pt', color:'rgba(255,255,255,0.6)', margin:'0 0 14px', fontStyle:'italic' }}>"{header.tagline}"</p>}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'3px 18px', fontSize:'9pt', color:'rgba(255,255,255,0.7)' }}>
          {[header?.contact?.email, header?.contact?.phone, header?.contact?.location].filter(Boolean).map((v,i)=><span key={i}>{v}</span>)}
          {header?.contact?.linkedin && <span style={{ color:'#93c5fd' }}>in {header.contact.linkedin}</span>}
          {header?.contact?.github   && <span style={{ color:'#93c5fd' }}>⌥ {header.contact.github}</span>}
        </div>
      </div>
      {/* Highlights */}
      {highlights?.length>0 && (
        <div style={{ background:'#1d4ed8', padding:'12px 44px', display:'flex', justifyContent:'space-around' }}>
          {highlights.map((h,i)=>(
            <div key={i} style={{ textAlign:'center' }}>
              <p style={{ fontSize:'15pt', fontWeight:800, color:'#fbbf24', margin:0, lineHeight:1.1 }}>{h.metric}</p>
              <p style={{ fontSize:'8.5pt', color:'rgba(255,255,255,0.8)', margin:'2px 0 0', textTransform:'uppercase', letterSpacing:'0.4px' }}>{h.label}</p>
            </div>
          ))}
        </div>
      )}
      {/* Body 2 cols */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 210px' }}>
        <div style={{ padding:'24px 32px 24px 44px' }}>
          {about && <D1Blk t="À PROPOS" acc={ACC}><p style={{ color:'#374151', lineHeight:1.7, fontSize:'10.5pt' }}>{about}</p></D1Blk>}
          {experiences?.length>0 && <D1Blk t="EXPÉRIENCES" acc={ACC}>
            {experiences.map((e,i)=>(
              <div key={i} style={{ marginBottom:15, paddingLeft:12, borderLeft:`3px solid ${i===0?'#fbbf24':'#dbeafe'}` }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <b style={{ fontSize:'11pt' }}>{e.title}</b>
                    <p style={{ color:ACC, fontWeight:600, fontSize:'9.5pt', margin:'1px 0 3px' }}>{e.company}</p>
                  </div>
                  <span style={{ fontSize:'9pt', color:'#9ca3af', whiteSpace:'nowrap', marginLeft:8 }}>{e.duration}</span>
                </div>
                {e.achievement && <p style={{ fontSize:'10pt', color:'#374151', background:'#fef9ec', padding:'4px 9px', borderRadius:5, borderLeft:'3px solid #fbbf24', margin:'4px 0', fontStyle:'italic' }}>★ {e.achievement}</p>}
                <ul style={{ margin:'3px 0 0 12px', padding:0, color:'#4b5563', fontSize:'9.5pt' }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:2 }}>{b}</li>)}</ul>
              </div>
            ))}
          </D1Blk>}
          {education?.length>0 && <D1Blk t="FORMATION" acc={ACC}>
            {education.map((e,i)=>(
              <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
                <div><b style={{ fontSize:'10.5pt' }}>{e.degree}</b><p style={{ color:'#6b7280', margin:'1px 0 0', fontSize:'9.5pt' }}>{e.school}</p></div>
                <span style={{ fontSize:'9.5pt', color:'#fbbf24', fontWeight:700 }}>{e.year}</span>
              </div>
            ))}
          </D1Blk>}
        </div>
        <div style={{ background:'#f8fafc', borderLeft:'1px solid #e5e7eb', padding:'24px 18px' }}>
          {skills?.technical?.length>0 && <SideBlkD t="COMPÉTENCES">
            {skills.technical.map((s,i)=>(
              <div key={i} style={{ marginBottom:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                  <span style={{ fontSize:'9.5pt', color:'#374151', fontWeight:500 }}>{getName(s)}</span>
                  <span style={{ fontSize:'8.5pt', color:'#9ca3af' }}>{getLevel(s)}/5</span>
                </div>
                <div style={{ height:4, background:'#e5e7eb', borderRadius:2 }}>
                  <div style={{ height:'100%', borderRadius:2, background:`linear-gradient(90deg,${DARK},${ACC})`, width:`${(getLevel(s)/5)*100}%` }}/>
                </div>
              </div>
            ))}
          </SideBlkD>}
          {skills?.soft?.length>0 && <SideBlkD t="SAVOIR-ÊTRE">
            <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
              {skills.soft.map((s,i)=><span key={i} style={{ fontSize:'8.5pt', padding:'2px 8px', background:'#fff', border:'1px solid #e5e7eb', borderRadius:20, color:'#374151' }}>{s}</span>)}
            </div>
          </SideBlkD>}
          {languages?.length>0 && <SideBlkD t="LANGUES">
            {languages.map((l,i)=>(
              <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'9.5pt', marginBottom:4 }}>
                <span style={{ fontWeight:500 }}>{typeof l==='object'?l.name:l}</span>
                <span style={{ color:'#9ca3af', fontSize:'8.5pt' }}>{typeof l==='object'?l.level:''}</span>
              </div>
            ))}
          </SideBlkD>}
        </div>
      </div>
    </div>
  )
}
function D1Blk({ t, acc, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontSize:'9pt', fontWeight:700, color:acc, letterSpacing:'1.5px', textTransform:'uppercase', borderBottom:`2px solid ${acc}`, paddingBottom:3, marginBottom:10 }}>{t}</h2>
      {children}
    </div>
  )
}
function SideBlkD({ t, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontSize:'8.5pt', fontWeight:700, color:'#6b7280', letterSpacing:'1px', textTransform:'uppercase', borderBottom:'1px solid #e5e7eb', paddingBottom:3, marginBottom:9 }}>{t}</h2>
      {children}
    </div>
  )
}

/* ── Template 2 : Créatif dégradé ── */
function Design2({ d }) {
  const { header, about, highlights, skills, experiences, education, languages } = d.sections
  const G1='#7c3aed', G2='#db2777'
  return (
    <div id="preview-design" style={{ background:'#fff', maxWidth:794, margin:'0 auto', fontFamily:"'Segoe UI',system-ui,sans-serif", fontSize:'10pt', color:'#111', lineHeight:1.55, boxShadow:'0 4px 24px rgba(0,0,0,0.13)', overflow:'hidden' }}>
      {/* Header dégradé */}
      <div style={{ background:`linear-gradient(135deg,${G1},${G2})`, padding:'34px 44px 28px', color:'#fff' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
          <div>
            <h1 style={{ fontSize:'27pt', fontWeight:800, margin:'0 0 4px', letterSpacing:'-0.5px', textShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>{header?.name}</h1>
            <p style={{ fontSize:'13pt', color:'rgba(255,255,255,0.9)', fontWeight:600, margin:'0 0 4px' }}>{header?.title}</p>
            {header?.tagline && <p style={{ fontSize:'10pt', color:'rgba(255,255,255,0.7)', margin:0, fontStyle:'italic' }}>{header.tagline}</p>}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:3, fontSize:'9pt', color:'rgba(255,255,255,0.85)', textAlign:'right' }}>
            {[header?.contact?.email, header?.contact?.phone, header?.contact?.location, header?.contact?.linkedin, header?.contact?.github].filter(Boolean).map((v,i)=><span key={i}>{v}</span>)}
          </div>
        </div>
      </div>
      {/* Highlights */}
      {highlights?.length>0 && (
        <div style={{ background:'#fdf4ff', borderBottom:'2px solid #f3e8ff', padding:'14px 44px', display:'flex', justifyContent:'space-around' }}>
          {highlights.map((h,i)=>(
            <div key={i} style={{ textAlign:'center' }}>
              <p style={{ fontSize:'16pt', fontWeight:800, color:G1, margin:0 }}>{h.metric}</p>
              <p style={{ fontSize:'8.5pt', color:'#9333ea', margin:'2px 0 0', textTransform:'uppercase', letterSpacing:'0.4px' }}>{h.label}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ padding:'24px 44px' }}>
        {about && (
          <div style={{ marginBottom:20, padding:'14px 18px', background:'#fdf4ff', border:'1.5px solid #e9d5ff', borderRadius:10 }}>
            <p style={{ color:'#4c1d95', fontSize:'10.5pt', lineHeight:1.7, fontStyle:'italic' }}>"{about}"</p>
          </div>
        )}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          {/* Left */}
          <div>
            {experiences?.length>0 && (
              <div style={{ marginBottom:20 }}>
                <h2 style={{ fontSize:'10pt', fontWeight:700, color:G1, letterSpacing:'1px', textTransform:'uppercase', marginBottom:12, paddingLeft:10, borderLeft:`4px solid ${G1}` }}>Expériences</h2>
                {experiences.map((e,i)=>(
                  <div key={i} style={{ marginBottom:14, position:'relative', paddingLeft:16 }}>
                    <div style={{ position:'absolute', left:0, top:5, width:8, height:8, borderRadius:'50%', background:i===0?G2:G1, border:'2px solid #fff', boxShadow:`0 0 0 2px ${i===0?G2:G1}` }}/>
                    <b style={{ fontSize:'10.5pt', color:'#111' }}>{e.title}</b>
                    <p style={{ color:G1, fontWeight:600, fontSize:'9.5pt', margin:'1px 0 3px' }}>{e.company} · {e.duration}</p>
                    {e.achievement && <p style={{ fontSize:'9.5pt', color:'#6d28d9', fontStyle:'italic', margin:'2px 0 4px' }}>→ {e.achievement}</p>}
                    <ul style={{ margin:'0 0 0 12px', padding:0, color:'#555', fontSize:'9.5pt' }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:1 }}>{b}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Right */}
          <div>
            {skills?.technical?.length>0 && (
              <div style={{ marginBottom:18 }}>
                <h2 style={{ fontSize:'10pt', fontWeight:700, color:G2, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10, paddingLeft:10, borderLeft:`4px solid ${G2}` }}>Compétences</h2>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {skills.technical.map((s,i)=>(
                    <span key={i} style={{ fontSize:'9.5pt', padding:'4px 10px', borderRadius:20, background:`linear-gradient(135deg,${G1}18,${G2}18)`, border:`1px solid ${G1}40`, color:G1, fontWeight:500 }}>{getName(s)}</span>
                  ))}
                </div>
              </div>
            )}
            {education?.length>0 && (
              <div style={{ marginBottom:18 }}>
                <h2 style={{ fontSize:'10pt', fontWeight:700, color:G1, letterSpacing:'1px', textTransform:'uppercase', marginBottom:10, paddingLeft:10, borderLeft:`4px solid ${G1}` }}>Formation</h2>
                {education.map((e,i)=>(
                  <div key={i} style={{ marginBottom:9 }}>
                    <b style={{ fontSize:'10pt' }}>{e.degree}</b>
                    <p style={{ color:'#6b7280', fontSize:'9.5pt', margin:'1px 0 0' }}>{e.school} · {e.year}</p>
                  </div>
                ))}
              </div>
            )}
            {languages?.length>0 && (
              <div>
                <h2 style={{ fontSize:'10pt', fontWeight:700, color:G2, letterSpacing:'1px', textTransform:'uppercase', marginBottom:8, paddingLeft:10, borderLeft:`4px solid ${G2}` }}>Langues</h2>
                {languages.map((l,i)=>(
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'9.5pt', marginBottom:3 }}>
                    <span>{typeof l==='object'?l.name:l}</span>
                    <span style={{ color:'#9ca3af' }}>{typeof l==='object'?l.level:''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Template 3 : Minimaliste premium or ── */
function Design3({ d }) {
  const { header, about, highlights, skills, experiences, education, languages } = d.sections
  const GOLD='#b7791f', GOLD2='#f6e05e', DARK='#1a202c'
  return (
    <div id="preview-design" style={{ background:'#fff', maxWidth:794, margin:'0 auto', fontFamily:"Georgia,'Times New Roman',serif", fontSize:'10.5pt', color:'#1a202c', lineHeight:1.6, boxShadow:'0 4px 24px rgba(0,0,0,0.13)' }}>
      {/* Top gold bar */}
      <div style={{ height:5, background:`linear-gradient(90deg,${GOLD},${GOLD2},${GOLD})` }}/>
      <div style={{ padding:'36px 52px' }}>
        {/* Name centered */}
        <div style={{ textAlign:'center', marginBottom:24, paddingBottom:20, borderBottom:`1px solid #e2d9c8` }}>
          <h1 style={{ fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:'28pt', fontWeight:800, margin:'0 0 5px', letterSpacing:'-0.5px', color:DARK }}>{header?.name}</h1>
          <p style={{ fontSize:'13pt', color:GOLD, fontWeight:600, fontFamily:"'Segoe UI',sans-serif", margin:'0 0 10px' }}>{header?.title}</p>
          {header?.tagline && <p style={{ fontSize:'10pt', color:'#718096', fontStyle:'italic', margin:'0 0 12px' }}>{header.tagline}</p>}
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'4px 20px', fontSize:'9pt', color:'#718096', fontFamily:"'Segoe UI',sans-serif" }}>
            {[header?.contact?.email, header?.contact?.phone, header?.contact?.location, header?.contact?.linkedin, header?.contact?.github].filter(Boolean).map((v,i)=><span key={i}>{v}</span>)}
          </div>
        </div>
        {/* Highlights */}
        {highlights?.length>0 && (
          <div style={{ display:'flex', justifyContent:'space-around', marginBottom:24, padding:'16px 0', borderBottom:'1px solid #e2d9c8' }}>
            {highlights.map((h,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <p style={{ fontSize:'18pt', fontWeight:700, color:GOLD, margin:0, lineHeight:1, fontFamily:"'Segoe UI',sans-serif" }}>{h.metric}</p>
                <p style={{ fontSize:'8.5pt', color:'#a0896a', margin:'3px 0 0', textTransform:'uppercase', letterSpacing:'0.8px', fontFamily:"'Segoe UI',sans-serif" }}>{h.label}</p>
              </div>
            ))}
          </div>
        )}
        {about && <D3Blk t="À PROPOS" gold={GOLD}><p style={{ color:'#4a5568', textAlign:'justify', lineHeight:1.75 }}>{about}</p></D3Blk>}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 200px', gap:28 }}>
          <div>
            {experiences?.length>0 && <D3Blk t="PARCOURS PROFESSIONNEL" gold={GOLD}>
              {experiences.map((e,i)=>(
                <div key={i} style={{ marginBottom:16, paddingLeft:14, borderLeft:`2px solid ${i===0?GOLD:'#e2d9c8'}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                    <b style={{ fontSize:'11pt', color:DARK, fontFamily:"'Segoe UI',sans-serif" }}>{e.title}</b>
                    <span style={{ fontSize:'9pt', color:'#a0aec0', fontFamily:"'Segoe UI',sans-serif", whiteSpace:'nowrap', marginLeft:8 }}>{e.duration}</span>
                  </div>
                  <p style={{ color:GOLD, fontWeight:600, fontSize:'9.5pt', margin:'0 0 4px', fontFamily:"'Segoe UI',sans-serif" }}>{e.company}</p>
                  {e.achievement && <p style={{ fontSize:'10pt', color:'#4a5568', fontStyle:'italic', margin:'4px 0' }}>« {e.achievement} »</p>}
                  <ul style={{ margin:'4px 0 0 12px', padding:0, color:'#4a5568', fontSize:'9.5pt', fontFamily:"'Segoe UI',sans-serif" }}>{(e.bullets||[]).map((b,j)=><li key={j} style={{ marginBottom:2 }}>{b}</li>)}</ul>
                </div>
              ))}
            </D3Blk>}
            {education?.length>0 && <D3Blk t="FORMATION" gold={GOLD}>
              {education.map((e,i)=>(
                <div key={i} style={{ marginBottom:10, display:'flex', justifyContent:'space-between' }}>
                  <div><b style={{ fontFamily:"'Segoe UI',sans-serif" }}>{e.degree}</b><p style={{ color:'#718096', margin:'1px 0 0', fontSize:'9.5pt', fontFamily:"'Segoe UI',sans-serif" }}>{e.school}</p></div>
                  <span style={{ color:GOLD, fontWeight:700, fontSize:'10pt', fontFamily:"'Segoe UI',sans-serif", whiteSpace:'nowrap', marginLeft:8 }}>{e.year}</span>
                </div>
              ))}
            </D3Blk>}
          </div>
          <div>
            {skills?.technical?.length>0 && <D3Blk t="COMPÉTENCES" gold={GOLD}>
              {skills.technical.map((s,i)=>(
                <div key={i} style={{ marginBottom:7 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3, fontFamily:"'Segoe UI',sans-serif", fontSize:'9.5pt' }}>
                    <span style={{ color:'#2d3748', fontWeight:500 }}>{getName(s)}</span>
                    <span style={{ color:'#a0aec0', fontSize:'8.5pt' }}>{getLevel(s)}/5</span>
                  </div>
                  <div style={{ height:3, background:'#edf2f7', borderRadius:2 }}>
                    <div style={{ height:'100%', borderRadius:2, background:`linear-gradient(90deg,${GOLD},${GOLD2})`, width:`${(getLevel(s)/5)*100}%` }}/>
                  </div>
                </div>
              ))}
            </D3Blk>}
            {languages?.length>0 && <D3Blk t="LANGUES" gold={GOLD}>
              {languages.map((l,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'9.5pt', marginBottom:4, fontFamily:"'Segoe UI',sans-serif" }}>
                  <span style={{ color:'#2d3748', fontWeight:500 }}>{typeof l==='object'?l.name:l}</span>
                  <span style={{ color:'#a0aec0', fontSize:'8.5pt' }}>{typeof l==='object'?l.level:''}</span>
                </div>
              ))}
            </D3Blk>}
            {skills?.soft?.length>0 && <D3Blk t="SAVOIR-ÊTRE" gold={GOLD}>
              {skills.soft.map((s,i)=><p key={i} style={{ fontSize:'9.5pt', color:'#4a5568', margin:'0 0 3px', fontFamily:"'Segoe UI',sans-serif" }}>• {s}</p>)}
            </D3Blk>}
          </div>
        </div>
      </div>
      <div style={{ height:3, background:`linear-gradient(90deg,${GOLD},${GOLD2},${GOLD})` }}/>
    </div>
  )
}
function D3Blk({ t, gold, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:'8.5pt', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:gold, marginBottom:9, paddingBottom:4, borderBottom:`1px solid #e2d9c8` }}>{t}</h2>
      {children}
    </div>
  )
}

/* ── Selector wrapper ── */
const DESIGN_TPLS = [
  { id:1, label:'Élégant',       desc:'Bicolonne, bandeau sombre' },
  { id:2, label:'Créatif',       desc:'Dégradé violet-rose, timeline' },
  { id:3, label:'Premium',       desc:'Centré, touches dorées' },
]

export default function DesignPreview({ data }) {
  const [tpl, setTpl] = useState(1)
  if (!data?.sections) return <p style={{ textAlign:'center', color:'#666', padding:40 }}>Données manquantes</p>

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:16, justifyContent:'center' }}>
        {DESIGN_TPLS.map(t => (
          <button key={t.id} onClick={()=>setTpl(t.id)} style={{
            padding:'8px 16px', borderRadius:8, cursor:'pointer', fontSize:12, fontWeight:600,
            border:`2px solid ${tpl===t.id ? '#7c3aed' : '#d0d5dd'}`,
            background: tpl===t.id ? '#f5f3ff' : '#fff',
            color: tpl===t.id ? '#7c3aed' : '#667085',
            transition:'all 0.15s',
          }}>
            {t.label}
            <span style={{ display:'block', fontSize:10, fontWeight:400, color: tpl===t.id?'#a78bfa':'#9ca3af' }}>{t.desc}</span>
          </button>
        ))}
      </div>
      {tpl===1 && <Design1 d={data}/>}
      {tpl===2 && <Design2 d={data}/>}
      {tpl===3 && <Design3 d={data}/>}
    </div>
  )
}
