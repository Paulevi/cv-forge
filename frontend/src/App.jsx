import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import StepBar from './components/StepBar.jsx'
import FormStep from './components/FormStep.jsx'
import JobStep from './components/JobStep.jsx'
import GenerateStep from './components/GenerateStep.jsx'
import ResultsStep from './components/ResultsStep.jsx'

export default function App() {
  const [dark, setDark] = useState(false)
  const [step, setStep] = useState(1)
  const [candidate, setCandidate] = useState({ firstName:'', lastName:'', email:'', phone:'', location:'', linkedin:'', github:'', summary:'', experiences:[], education:[], skills:[], languages:[] })
  const [jobDesc, setJobDesc] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'var(--bg)' }}>
      <Header dark={dark} onToggle={()=>setDark(d=>!d)}/>
      <main style={{ flex:1, maxWidth:1040, margin:'0 auto', width:'100%', padding:'28px 20px' }}>
        <StepBar current={step}/>
        {step===1 && <FormStep     data={candidate}  onChange={setCandidate} onNext={()=>setStep(2)}/>}
        {step===2 && <JobStep      value={jobDesc}   onChange={setJobDesc}   onNext={()=>setStep(3)} onBack={()=>setStep(1)}/>}
        {step===3 && <GenerateStep candidate={candidate} jobDesc={jobDesc}   onDone={r=>{setResults(r);setStep(4)}} onBack={()=>setStep(2)}/>}
        {step===4 && results && <ResultsStep results={results} candidate={candidate} onBack={()=>setStep(3)} onReset={()=>{setResults(null);setStep(1)}}/>}
      </main>
    </div>
  )
}
