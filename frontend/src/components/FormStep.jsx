import { useState } from 'react'
import { Plus, Trash2, X, ChevronRight, User, Briefcase, GraduationCap, Wrench, Globe } from 'lucide-react'

/* ─── Shared style tokens ─── */
const T = {
  card: {
    background: 'var(--surface)',
    border: '1.5px solid var(--border)',
    borderRadius: 12,
    padding: 24,
    boxShadow: 'var(--shadow-sm)',
  },
  input: {
    width: '100%', padding: '10px 14px',
    borderRadius: 8, border: '1.5px solid var(--border)',
    background: 'var(--surface)', color: 'var(--text)',
    fontSize: 14, outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  label: {
    display: 'block', fontSize: 13, fontWeight: 600,
    color: 'var(--text2)', marginBottom: 6,
  },
  btnPrimary: {
    background: 'var(--blue)', color: '#fff',
    border: '1.5px solid var(--blue)', borderRadius: 8,
    padding: '10px 20px', fontWeight: 600, fontSize: 14,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: '0 1px 4px rgba(21,112,239,0.25)', transition: 'all 0.15s',
  },
  btnOutline: {
    background: 'var(--surface)', color: 'var(--text2)',
    border: '1.5px solid var(--border)', borderRadius: 8,
    padding: '8px 14px', fontWeight: 500, fontSize: 13,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: 'var(--shadow-sm)', transition: 'all 0.15s',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  sectionTitle: {
    fontFamily: 'Bricolage Grotesque, sans-serif',
    fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 20,
  },
  badge: (color, bg, bd) => ({
    display: 'inline-flex', alignItems: 'center',
    fontSize: 12, fontWeight: 600, color,
    background: bg, border: `1.5px solid ${bd}`,
    borderRadius: 20, padding: '3px 12px',
  }),
}

const focus = e => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(21,112,239,0.12)' }
const blur  = e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }

/* ─── DateField ─── */
function DateField({ label, value, onChange }) {
  const ongoing = value === 'en cours'
  return (
    <div>
      <span style={T.label}>{label}</span>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <button type="button"
          onClick={() => onChange('')}
          style={{ ...T.btnOutline, padding: '6px 12px', fontSize: 12,
            background: !ongoing ? 'var(--blue-lt)' : 'var(--surface)',
            color: !ongoing ? 'var(--blue)' : 'var(--text3)',
            border: `1.5px solid ${!ongoing ? 'var(--blue-bd)' : 'var(--border)'}`,
          }}>📅 Date</button>
        <button type="button"
          onClick={() => onChange('en cours')}
          style={{ ...T.btnOutline, padding: '6px 12px', fontSize: 12,
            background: ongoing ? 'var(--green-lt)' : 'var(--surface)',
            color: ongoing ? 'var(--green)' : 'var(--text3)',
            border: `1.5px solid ${ongoing ? 'var(--green-bd)' : 'var(--border)'}`,
          }}>▶ En cours</button>
      </div>
      {!ongoing
        ? <input type="month" style={T.input} value={value} onChange={e => onChange(e.target.value)} onFocus={focus} onBlur={blur} />
        : <div style={{ padding: '9px 14px', background: 'var(--green-lt)', border: '1.5px solid var(--green-bd)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>En cours actuellement</div>
      }
    </div>
  )
}

/* ─── Tag ─── */
function Tag({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: 'var(--blue-lt)', border: '1.5px solid var(--blue-bd)',
      borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 500, color: 'var(--blue)',
    }}>
      {label}
      <button type="button" onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blue)', padding: 0, display: 'flex', lineHeight: 1 }}>
        <X size={12} />
      </button>
    </span>
  )
}

/* ─── Divider ─── */
const Div = () => <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

/* ─── SECTIONS ─── */
const SECS = [
  { id: 'personal', label: 'Informations', icon: User },
  { id: 'exp',      label: 'Expériences',  icon: Briefcase },
  { id: 'edu',      label: 'Formation',    icon: GraduationCap },
  { id: 'skills',   label: 'Compétences',  icon: Wrench },
  { id: 'langs',    label: 'Langues',      icon: Globe },
]

export default function FormStep({ data, onChange, onNext }) {
  const [sec, setSec] = useState('personal')
  const [techIn, setTechIn] = useState({})
  const [skillIn, setSkillIn] = useState('')
  const [langIn, setLangIn]   = useState('')

  const set = (f, v) => onChange({ ...data, [f]: v })

  /* exp */
  const addExp = () => set('experiences', [...data.experiences, { company:'', title:'', startDate:'', endDate:'', description:'', technologies:[] }])
  const delExp = i => set('experiences', data.experiences.filter((_,j)=>j!==i))
  const setExp = (i,f,v) => { const a=[...data.experiences]; a[i]={...a[i],[f]:v}; set('experiences',a) }
  const addTech=(i,t)=>{ const a=[...data.experiences]; a[i].technologies=[...a[i].technologies,t]; set('experiences',a) }
  const delTech=(i,j)=>{ const a=[...data.experiences]; a[i].technologies=a[i].technologies.filter((_,k)=>k!==j); set('experiences',a) }

  /* edu */
  const addEdu = () => set('education', [...data.education, { school:'', degree:'', startDate:'', endDate:'', description:'' }])
  const delEdu = i => set('education', data.education.filter((_,j)=>j!==i))
  const setEdu = (i,f,v) => { const a=[...data.education]; a[i]={...a[i],[f]:v}; set('education',a) }

  /* skills */
  const addSkill = n => { if(n.trim()){ set('skills',[...data.skills,{name:n.trim(),level:3}]); setSkillIn('') } }
  const delSkill = i => set('skills', data.skills.filter((_,j)=>j!==i))
  const setLevel = (i,v) => { const a=[...data.skills]; a[i]={...a[i],level:v}; set('skills',a) }

  /* langs */
  const addLang = n => { if(n.trim()){ set('languages',[...data.languages,{name:n.trim(),level:'Intermédiaire'}]); setLangIn('') } }
  const delLang = i => set('languages', data.languages.filter((_,j)=>j!==i))
  const setLangLv=(i,v)=>{ const a=[...data.languages]; a[i]={...a[i],level:v}; set('languages',a) }

  const valid = data.firstName && data.lastName && data.email

  const navBtn = (id) => ({
    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 9,
    padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
    fontWeight: sec===id ? 600 : 400,
    background: sec===id ? 'var(--blue-lt)' : 'transparent',
    color: sec===id ? 'var(--blue)' : 'var(--text2)',
    borderLeft: `3px solid ${sec===id ? 'var(--blue)' : 'transparent'}`,
    transition: 'all 0.15s',
  })

  const levelLabels = ['','Débutant','Basique','Intermédiaire','Avancé','Expert']

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 20, alignItems: 'start' }}>

      {/* ── Sidebar ── */}
      <div style={{ ...T.card, padding: 14, position: 'sticky', top: 76 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', padding: '2px 8px 10px' }}>Sections</p>
        {SECS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" style={navBtn(id)} onClick={() => setSec(id)}>
            <Icon size={15} />{label}
          </button>
        ))}

      </div>

      {/* ── Content ── */}
      <div>

        {/* PERSONAL */}
        {sec === 'personal' && (
          <div style={T.card}>
            <p style={T.sectionTitle}>Informations personnelles</p>
            <div style={T.grid2}>
              {[
                {f:'firstName',l:'Prénom *',ph:'Jean'},
                {f:'lastName', l:'Nom *',   ph:'Dupont'},
                {f:'email',    l:'Email *', ph:'jean@email.com'},
                {f:'phone',    l:'Téléphone',ph:'+33 6 00 00 00 00'},
                {f:'location', l:'Ville / Pays',ph:'Paris, France'},
                {f:'linkedin', l:'LinkedIn',ph:'linkedin.com/in/jean'},
                {f:'github',   l:'GitHub',  ph:'github.com/jean'},
              ].map(({f,l,ph}) => (
                <div key={f}>
                  <label style={T.label}>{l}</label>
                  <input style={T.input} value={data[f]} placeholder={ph}
                    onChange={e=>set(f,e.target.value)} onFocus={focus} onBlur={blur} />
                </div>
              ))}
              <div style={{ gridColumn:'1/-1' }}>
                <label style={T.label}>Résumé professionnel</label>
                <textarea style={{ ...T.input, resize:'vertical', lineHeight:1.65 }} rows={4}
                  value={data.summary} placeholder="Décrivez votre profil, vos points forts, ce qui vous démarque..."
                  onChange={e=>set('summary',e.target.value)} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCES */}
        {sec === 'exp' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <p style={{ ...T.sectionTitle, marginBottom:0 }}>Expériences professionnelles</p>
              <button type="button" style={T.btnOutline} onClick={addExp}><Plus size={14}/> Ajouter</button>
            </div>

            {data.experiences.length === 0 && (
              <div style={{ ...T.card, textAlign:'center', padding:48 }}>
                <div style={{ fontSize:32, marginBottom:10 }}>💼</div>
                <p style={{ color:'var(--text3)', marginBottom:14, fontSize:14 }}>Aucune expérience ajoutée pour l'instant</p>
                <button type="button" style={T.btnOutline} onClick={addExp}><Plus size={14}/> Ajouter une expérience</button>
              </div>
            )}

            {data.experiences.map((exp, i) => (
              <div key={i} style={{ ...T.card, marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                  <span style={T.badge('var(--blue)','var(--blue-lt)','var(--blue-bd)')}>Expérience #{i+1}</span>
                  <button type="button" onClick={()=>delExp(i)} style={{ background:'var(--red-lt)', border:'1.5px solid var(--red-bd)', color:'var(--red)', borderRadius:7, padding:'5px 8px', cursor:'pointer', display:'flex' }}>
                    <Trash2 size={14}/>
                  </button>
                </div>
                <div style={T.grid2}>
                  <div>
                    <label style={T.label}>Titre du poste</label>
                    <input style={T.input} value={exp.title} placeholder="Développeur Fullstack"
                      onChange={e=>setExp(i,'title',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                  <div>
                    <label style={T.label}>Entreprise</label>
                    <input style={T.input} value={exp.company} placeholder="Nom de l'entreprise"
                      onChange={e=>setExp(i,'company',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                  <DateField label="Date de début" value={exp.startDate} onChange={v=>setExp(i,'startDate',v)}/>
                  <DateField label="Date de fin" value={exp.endDate} onChange={v=>setExp(i,'endDate',v)}/>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={T.label}>Description des missions</label>
                    <textarea style={{ ...T.input, resize:'vertical', lineHeight:1.65 }} rows={3}
                      value={exp.description} placeholder="Décrivez vos principales missions, réalisations et responsabilités..."
                      onChange={e=>setExp(i,'description',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={T.label}>Technologies & Outils utilisés</label>
                    {exp.technologies.length > 0 && (
                      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                        {exp.technologies.map((t,j)=>(
                          <Tag key={j} label={t} onRemove={()=>delTech(i,j)}/>
                        ))}
                      </div>
                    )}
                    <div style={{ display:'flex', gap:8 }}>
                      <input style={{ ...T.input, flex:1 }}
                        value={techIn[i]||''}
                        placeholder="Ex: React.js — appuyez Entrée pour ajouter"
                        onChange={e=>setTechIn(t=>({...t,[i]:e.target.value}))}
                        onKeyDown={e=>{ if(e.key==='Enter'&&techIn[i]?.trim()){ e.preventDefault(); addTech(i,techIn[i].trim()); setTechIn(t=>({...t,[i]:''})) }}}
                        onFocus={focus} onBlur={blur}/>
                      <button type="button" style={T.btnOutline} onClick={()=>{ if(techIn[i]?.trim()){ addTech(i,techIn[i].trim()); setTechIn(t=>({...t,[i]:''})) }}}>
                        <Plus size={14}/> Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {sec === 'edu' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <p style={{ ...T.sectionTitle, marginBottom:0 }}>Formation</p>
              <button type="button" style={T.btnOutline} onClick={addEdu}><Plus size={14}/> Ajouter</button>
            </div>

            {data.education.length === 0 && (
              <div style={{ ...T.card, textAlign:'center', padding:48 }}>
                <div style={{ fontSize:32, marginBottom:10 }}>🎓</div>
                <p style={{ color:'var(--text3)', marginBottom:14 }}>Aucune formation ajoutée</p>
                <button type="button" style={T.btnOutline} onClick={addEdu}><Plus size={14}/> Ajouter une formation</button>
              </div>
            )}

            {data.education.map((edu,i)=>(
              <div key={i} style={{ ...T.card, marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                  <span style={T.badge('var(--purple)','var(--purple-lt)','var(--purple-bd)')}>Formation #{i+1}</span>
                  <button type="button" onClick={()=>delEdu(i)} style={{ background:'var(--red-lt)', border:'1.5px solid var(--red-bd)', color:'var(--red)', borderRadius:7, padding:'5px 8px', cursor:'pointer', display:'flex' }}>
                    <Trash2 size={14}/>
                  </button>
                </div>
                <div style={T.grid2}>
                  <div>
                    <label style={T.label}>Diplôme / Titre</label>
                    <input style={T.input} value={edu.degree} placeholder="Master Informatique"
                      onChange={e=>setEdu(i,'degree',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                  <div>
                    <label style={T.label}>École / Université</label>
                    <input style={T.input} value={edu.school} placeholder="Nom de l'établissement"
                      onChange={e=>setEdu(i,'school',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                  <DateField label="Date de début" value={edu.startDate} onChange={v=>setEdu(i,'startDate',v)}/>
                  <DateField label="Date de fin / Obtention" value={edu.endDate} onChange={v=>setEdu(i,'endDate',v)}/>
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={T.label}>Détails (mention, spécialisation...)</label>
                    <input style={T.input} value={edu.description} placeholder="Ex: Mention Bien — Spécialisation Intelligence Artificielle"
                      onChange={e=>setEdu(i,'description',e.target.value)} onFocus={focus} onBlur={blur}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {sec === 'skills' && (
          <div style={T.card}>
            <p style={T.sectionTitle}>Compétences techniques</p>
            <p style={{ fontSize:13, color:'var(--text3)', marginBottom:20, marginTop:-12 }}>
              Ajoutez chaque compétence séparément et définissez votre niveau avec le curseur.
            </p>

            {data.skills.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                {data.skills.map((s,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--surface2)', border:'1.5px solid var(--border)', borderRadius:9, padding:'10px 14px' }}>
                    <span style={{ flex:1, fontSize:14, fontWeight:500, color:'var(--text)' }}>{s.name}</span>
                    <span style={{ fontSize:11, color:'var(--text3)', minWidth:70, textAlign:'right' }}>{levelLabels[s.level]}</span>
                    <input type="range" min={1} max={5} value={s.level}
                      onChange={e=>setLevel(i,+e.target.value)}
                      style={{ width:90, accentColor:'var(--blue)', cursor:'pointer' }}/>
                    <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)', minWidth:24 }}>{s.level}/5</span>
                    <button type="button" onClick={()=>delSkill(i)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex', padding:2 }}>
                      <X size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display:'flex', gap:8 }}>
              <input style={{ ...T.input, flex:1 }} value={skillIn} placeholder="Ex: React.js — appuyez Entrée pour ajouter"
                onChange={e=>setSkillIn(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addSkill(skillIn))}
                onFocus={focus} onBlur={blur}/>
              <button type="button" style={T.btnOutline} onClick={()=>addSkill(skillIn)}>
                <Plus size={14}/> Ajouter
              </button>
            </div>
            <p style={{ fontSize:12, color:'var(--text3)', marginTop:8 }}>{data.skills.length} compétence(s)</p>
          </div>
        )}

        {/* LANGUAGES */}
        {sec === 'langs' && (
          <div style={T.card}>
            <p style={T.sectionTitle}>Langues</p>
            <p style={{ fontSize:13, color:'var(--text3)', marginBottom:20, marginTop:-12 }}>
              Ajoutez vos langues et précisez votre niveau.
            </p>

            {data.languages.length > 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                {data.languages.map((l,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:'var(--surface2)', border:'1.5px solid var(--border)', borderRadius:9, padding:'10px 14px' }}>
                    <span style={{ flex:1, fontSize:14, fontWeight:500, color:'var(--text)' }}>{l.name}</span>
                    <select value={l.level} onChange={e=>setLangLv(i,e.target.value)}
                      style={{ background:'var(--surface)', border:'1.5px solid var(--border)', borderRadius:7, padding:'6px 12px', fontSize:13, color:'var(--text)', cursor:'pointer', outline:'none' }}>
                      {['Notions','Débutant','Intermédiaire','Avancé','Courant','Bilingue','Natif'].map(lv=>(
                        <option key={lv}>{lv}</option>
                      ))}
                    </select>
                    <button type="button" onClick={()=>delLang(i)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text3)', display:'flex', padding:2 }}>
                      <X size={14}/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display:'flex', gap:8 }}>
              <input style={{ ...T.input, flex:1 }} value={langIn} placeholder="Ex: Français, Anglais, Arabe..."
                onChange={e=>setLangIn(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addLang(langIn))}
                onFocus={focus} onBlur={blur}/>
              <button type="button" style={T.btnOutline} onClick={()=>addLang(langIn)}>
                <Plus size={14}/> Ajouter
              </button>
            </div>
            <p style={{ fontSize:12, color:'var(--text3)', marginTop:8 }}>{data.languages.length} langue(s)</p>
          </div>
        )}

        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:16 }}>
          <button type="button" style={{ ...T.btnPrimary, opacity: valid?1:0.45, paddingLeft:24, paddingRight:20 }}
            onClick={onNext} disabled={!valid}>
            Continuer vers la description du poste <ChevronRight size={15}/>
          </button>
        </div>

      </div>
    </div>
  )
}
