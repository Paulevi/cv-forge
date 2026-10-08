from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import httpx, json, os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

API_KEY = os.getenv("MISTRAL_API_KEY", "")
API_URL = "https://api.mistral.ai/v1/chat/completions"
MODEL   = "mistral-small-latest"


class Skill(BaseModel):
    name: str
    level: int = 3

class Language(BaseModel):
    name: str
    level: str = "Intermédiaire"

class Experience(BaseModel):
    company: str = ""
    title: str = ""
    startDate: str = ""
    endDate: str = ""
    description: str = ""
    technologies: List[str] = []

class Education(BaseModel):
    school: str = ""
    degree: str = ""
    startDate: str = ""
    endDate: str = ""
    description: str = ""

class Candidate(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str = ""
    location: str = ""
    linkedin: str = ""
    github: str = ""
    summary: str = ""
    experiences: List[Experience] = []
    education: List[Education] = []
    skills: List[Skill] = []
    languages: List[Language] = []

class CVRequest(BaseModel):
    candidate: Candidate
    jobDescription: str
    cvType: str

class LetterRequest(BaseModel):
    candidate: Candidate
    jobDescription: str


async def ai(system: str, user: str) -> str:
    if not API_KEY:
        raise HTTPException(500, "Clé API manquante dans le fichier .env")
    async with httpx.AsyncClient(timeout=90) as c:
        r = await c.post(API_URL,
            headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
            json={"model": MODEL, "temperature": 0.3, "max_tokens": 4096,
                  "messages": [{"role":"system","content":system},{"role":"user","content":user}]})
        if r.status_code != 200:
            raise HTTPException(r.status_code, "Erreur lors de la génération, réessayez")
        return r.json()["choices"][0]["message"]["content"]


def clean(raw: str) -> str:
    raw = raw.strip()
    if "```" in raw:
        for p in raw.split("```"):
            p = p.strip().lstrip("json").strip()
            if p.startswith("{"): return p
    return raw


def profile(c: Candidate) -> str:
    sk = ", ".join(f"{s.name}({s.level}/5)" for s in c.skills)
    lg = ", ".join(f"{l.name} {l.level}" for l in c.languages)
    ex = "\n".join(
        f"  - {e.title} @ {e.company} | {e.startDate} → {e.endDate or 'en cours'}\n    {e.description}\n    Outils: {', '.join(e.technologies)}"
        for e in c.experiences)
    ed = "\n".join(
        f"  - {e.degree} @ {e.school} | {e.startDate} → {e.endDate or 'en cours'} {e.description}"
        for e in c.education)
    return f"""{c.firstName} {c.lastName} | {c.email} | {c.phone} | {c.location}
LinkedIn: {c.linkedin} | GitHub: {c.github}
Résumé: {c.summary}
Expériences:\n{ex or '  Aucune'}
Formation:\n{ed or '  Aucune'}
Compétences: {sk or 'Aucune'}
Langues: {lg or 'Aucune'}"""


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/generate-cv")
async def generate_cv(req: CVRequest):
    p = profile(req.candidate)

    if req.cvType == "ats":
        sys = """Expert ATS. CV optimisé pour Applicant Tracking Systems.
JSON UNIQUEMENT, zéro texte autour, zéro backtick.
{"type":"ats","sections":{"header":{"name":"","title":"titre ciblé avec mots-clés JD","contact":{"email":"","phone":"","location":"","linkedin":"","github":""}},"summary":"résumé 3-4 lignes mots-clés JD intégrés","skills":{"technical":["compétences + mots-clés JD"],"soft":["soft skills"]},"experiences":[{"title":"","company":"","duration":"","bullets":["verbe action + résultat"]}],"education":[{"degree":"","school":"","year":"","details":""}],"languages":["langue (niveau)"],"keywords":["mots-clés ATS extraits JD"]}}"""
        usr = f"Profil:\n{p}\n\nPoste:\n{req.jobDescription}\n\nJSON uniquement, vraies données uniquement:"
    else:
        sys = """Expert CV design. CV visuel percutant.
JSON UNIQUEMENT, zéro texte autour, zéro backtick.
{"type":"design","sections":{"header":{"name":"","title":"titre accrocheur","tagline":"phrase 1 ligne percutante","contact":{"email":"","phone":"","location":"","linkedin":"","github":""}},"about":"2-3 phrases humaines basées profil réel","highlights":[{"metric":"réalisation clé du vrai profil","label":"contexte"}],"skills":{"technical":[{"name":"","level":1}],"soft":["soft skill"]},"experiences":[{"title":"","company":"","duration":"","achievement":"réalisation phare vraies missions","bullets":["bullet impactant"]}],"education":[{"degree":"","school":"","year":""}],"languages":[{"name":"","level":""}]}}"""
        usr = f"Profil:\n{p}\n\nPoste:\n{req.jobDescription}\n\nJSON uniquement, vraies données uniquement:"

    raw = clean(await ai(sys, usr))
    try:
        data = json.loads(raw)
    except Exception as e:
        raise HTTPException(500, f"Réponse invalide: {str(e)[:100]}")
    return {"success": True, "data": data}


@app.post("/api/generate-cover-letter")
async def generate_letter(req: LetterRequest):
    p = profile(req.candidate)
    sys = """Expert lettres de motivation. Professionnelle, directe, sans clichés.
JSON UNIQUEMENT, zéro texte autour, zéro backtick.
{"subject":"objet","date":"date du jour","recipient":"Madame, Monsieur,","opening":"accroche 2-3 phrases sans 'je me permets'","body_paragraphs":["§1 compétences réelles ↔ poste","§2 réalisation clé vraies expériences","§3 motivation adéquation"],"closing":"conclusion call-to-action","signature":"formule politesse"}"""
    usr = f"Profil:\n{p}\n\nPoste:\n{req.jobDescription}\n\nJSON uniquement:"
    raw = clean(await ai(sys, usr))
    try:
        data = json.loads(raw)
    except Exception as e:
        raise HTTPException(500, f"Réponse invalide: {str(e)[:100]}")
    return {"success": True, "data": data}
