"use client";

import { useState } from "react";

const examples = [
  {
    label: "Relation client",
    source: "Un message voyageur",
    message: "Bonjour, pouvons-nous arriver après 20 h ?",
    context: "Consignes d’arrivée · Disponibilités",
    draft:
      "Bonjour ! Je prépare les informations utiles pour votre arrivée tardive, à partir des consignes de votre hébergement.",
  },
  {
    label: "Équipe",
    source: "Une question interne",
    message: "Où retrouver la procédure d’accueil ?",
    context: "Documents internes · Procédures",
    draft:
      "Voici la procédure d’accueil retrouvée dans vos documents. Je vous prépare les étapes essentielles et le lien vers la source.",
  },
  {
    label: "Organisation",
    source: "Des informations dispersées",
    message: "Quels sont les points à suivre aujourd’hui ?",
    context: "Agenda · Messages · Suivi des tâches",
    draft:
      "Je rassemble les informations disponibles et prépare une synthèse des points à suivre, que vous pouvez relire et compléter.",
  },
];

export default function WorkflowDemo() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return (
    <div className="workflow-shell">
      <div className="flex items-center justify-between border-b border-ligne px-5 py-4">
        <span className="text-xs font-semibold tracking-wider">
          INTER <span className="text-menthe">IA</span>
        </span>
        <span className="text-[10px] uppercase tracking-widest text-brume-60">
          Exemple illustratif
        </span>
      </div>
      <div
        className="workflow-tabs"
        role="group"
        aria-label="Choisir un exemple d’usage de l’IA"
      >
        {examples.map((item, i) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="px-5 pb-5 sm:px-7 sm:pb-7"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="workflow-source">
          <span className="micro-label">01 / {example.source}</span>
          <p className="mt-3 text-sm leading-relaxed">{example.message}</p>
        </div>
        <div className="flow-conduit" aria-hidden="true">
          <span />
        </div>
        <div className="assistant-node">
          <div className="orbital-mark" aria-hidden="true">
            <span />
            <span />
            <b>✳</b>
          </div>
          <div>
            <p className="font-display text-lg font-medium">
              Votre assistant métier
            </p>
            <p className="mt-1 text-xs text-brume-60">{example.context}</p>
          </div>
          <span className="status-dot ml-auto" aria-hidden="true" />
        </div>
        <div className="flow-conduit" aria-hidden="true">
          <span />
        </div>
        <div className="workflow-result" key={selected}>
          <span className="micro-label text-menthe">
            02 / Proposition de réponse
          </span>
          <p className="mt-3 text-sm leading-relaxed text-brume/90">
            {example.draft}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-menthe/15 pt-3">
            <span className="text-[11px] text-brume-60">
              Vous relisez. Vous décidez.
            </span>
            <span className="validation-tag">À valider par l’équipe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
