# CVForge

CVForge est une application web permettant de générer un CV et une lettre de motivation personnalisés à partir du profil d'un candidat et de la description d'un poste.

Le projet combine :
- un backend FastAPI pour orchestrer la génération IA,
- un frontend React + Vite pour l'expérience utilisateur,
- l'API Mistral pour produire des contenus optimisés pour le recrutement.

## Fonctionnalités

- Saisie du profil candidat : informations personnelles, expériences, formation, compétences, langues
- Saisie de la description du poste
- Génération d'un CV selon deux formats :
  - ATS (Applicant Tracking System)
  - Design / visuel
- Génération d'une lettre de motivation
- Prévisualisation des résultats dans l'interface
- Export PDF des contenus générés

## Stack technique

- Backend : Python, FastAPI, Pydantic, httpx
- Frontend : React, Vite
- IA : Mistral AI
- Export : jsPDF, html2canvas

## Structure du projet

```text
cvforge-v3/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── components/
│       └── utils/
└── README.md
```

## Prérequis

Avant de démarrer le projet, assurez-vous d'avoir installé :

- Python 3.10+
- Node.js 18+
- npm
- Un compte Mistral AI avec une clé API valide

