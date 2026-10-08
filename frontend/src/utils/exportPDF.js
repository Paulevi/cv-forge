import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(elementId, filename = 'document') {
  const el = document.getElementById(elementId)
  if (!el) throw new Error(`Élément #${elementId} introuvable`)
  const canvas = await html2canvas(el, { scale:2, useCORS:true, backgroundColor:'#ffffff', logging:false })
  const img = canvas.toDataURL('image/png')
  const W = 210, H = W / canvas.width * canvas.height
  const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' })
  if (H <= 297) {
    pdf.addImage(img,'PNG',0,0,W,H)
  } else {
    const ph = (297 * canvas.width) / W
    let y=0, p=0
    while (y < canvas.height) {
      if (p>0) pdf.addPage()
      const h = Math.min(ph, canvas.height-y)
      const pc = document.createElement('canvas')
      pc.width=canvas.width; pc.height=h
      const ctx=pc.getContext('2d')
      ctx.fillStyle='#fff'; ctx.fillRect(0,0,pc.width,pc.height)
      ctx.drawImage(canvas,0,-y)
      pdf.addImage(pc.toDataURL('image/png'),'PNG',0,0,W,(h/canvas.width)*W)
      y+=ph; p++
    }
  }
  pdf.save(`${filename}.pdf`)
}
