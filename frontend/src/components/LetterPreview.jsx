export default function LetterPreview({ data, candidate }) {
  if (!data) return <p style={{textAlign:'center',color:'#666',padding:40}}>Données manquantes</p>
  const { subject, date, recipient, opening, body_paragraphs, closing, signature } = data
  return (
    <div id="preview-cover" style={{
      background:'#fff', maxWidth:680, margin:'0 auto',
      fontFamily:'Georgia,"Times New Roman",serif', fontSize:'11pt', lineHeight:1.85,
      padding:'52px 58px', boxShadow:'0 4px 24px rgba(0,0,0,.13)', color:'#1a1a1a',
    }}>
      <div style={{borderBottom:'2.5px solid #0a0a0a',paddingBottom:16,marginBottom:28}}>
        <p style={{fontSize:'14pt',fontWeight:700,fontFamily:'Helvetica Neue,Arial,sans-serif',margin:'0 0 3px',letterSpacing:'-.3px'}}>
          {candidate?.firstName} {candidate?.lastName}
        </p>
        <div style={{display:'flex',gap:18,fontSize:'9.5pt',color:'#555',fontFamily:'Helvetica Neue,Arial,sans-serif',marginTop:4}}>
          {candidate?.email    && <span>{candidate.email}</span>}
          {candidate?.phone    && <span>{candidate.phone}</span>}
          {candidate?.location && <span>{candidate.location}</span>}
        </div>
      </div>
      <p style={{fontSize:'10pt',color:'#777',fontFamily:'Helvetica Neue,Arial,sans-serif',marginBottom:20}}>{date}</p>
      <p style={{fontFamily:'Helvetica Neue,Arial,sans-serif',fontSize:'11pt',fontWeight:600,marginBottom:24,color:'#333'}}>{recipient}</p>
      {subject && (
        <p style={{fontFamily:'Helvetica Neue,Arial,sans-serif',fontWeight:700,marginBottom:24,textDecoration:'underline',color:'#111'}}>
          Objet : {subject}
        </p>
      )}
      <div style={{color:'#222',textAlign:'justify'}}>
        {opening && <p style={{marginBottom:18}}>{opening}</p>}
        {(body_paragraphs||[]).map((p,i)=><p key={i} style={{marginBottom:18}}>{p}</p>)}
        {closing && <p style={{marginBottom:38}}>{closing}</p>}
      </div>
      <div>
        <p style={{fontFamily:'Helvetica Neue,Arial,sans-serif',fontSize:'10.5pt',color:'#333',marginBottom:42}}>{signature}</p>
        <div style={{borderTop:'1px solid #e5e7eb',paddingTop:13}}>
          <p style={{fontFamily:'Helvetica Neue,Arial,sans-serif',fontWeight:700,fontSize:'13pt',margin:'0 0 3px',color:'#0a0a0a'}}>
            {candidate?.firstName} {candidate?.lastName}
          </p>
          {candidate?.linkedin && <p style={{fontFamily:'Helvetica Neue,Arial,sans-serif',fontSize:'9.5pt',color:'#888',margin:0}}>{candidate.linkedin}</p>}
        </div>
      </div>
    </div>
  )
}
