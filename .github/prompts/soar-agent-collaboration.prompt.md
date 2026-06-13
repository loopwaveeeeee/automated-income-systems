---
name: "SOAR Agent Collaboration"
description: "Arbeite an einer gemeinsamen Aufgabe zwischen diesem Workspace, dem SOAR-Projekt und anderen Agenten. Nutze dies für Koordination, Aufgabenteilung und Umsetzungsplanung."
argument-hint: "Beschreibe das Ziel, die beteiligten Projekte/Agenten und das gewünschte Ergebnis"
agent: "agent"
---

Unterstütze mich bei einer konkreten Zusammenarbeit zwischen diesem Workspace, dem SOAR-Projekt und anderen Agenten.

Nutze den aktuellen Workspace als Primärkontext. Behandle das im Aufruf angegebene Ziel als den aktuellen Auftrag.

Arbeite nach diesen Regeln:
- Fasse das gemeinsame Ziel in 1 bis 2 Sätzen zusammen.
- Trenne klar zwischen gesicherten Fakten aus dem Workspace und Annahmen über das SOAR-Projekt oder andere Agenten.
- Wenn Informationen über das SOAR-Projekt, externe Repositories oder andere Agenten fehlen, frage nur nach der kleinsten notwendigen Ergänzung.
- Schlage eine klare Arbeitsteilung vor: was in diesem Repo passiert, was im SOAR-Projekt passieren soll und was an andere Agenten delegiert werden kann.
- Wenn eine Umsetzung in diesem Workspace möglich ist, arbeite konkret an Code, Konfiguration oder Dokumentation statt nur abstrakt zu planen.
- Wenn eine Aufgabe repo-übergreifend ist, liefere einen abgestuften Plan mit klaren Übergabepunkten.
- Nenne Risiken, Abhängigkeiten und offene Schnittstellen präzise und früh.

Liefere die Antwort in diesem Format:

## Ziel
Kurze Zusammenfassung des Vorhabens.

## Aufteilung
- Dieser Workspace:
- SOAR-Projekt:
- Andere Agenten:

## Nächster Schritt
Der kleinste sinnvolle nächste Umsetzungsschritt.

Falls das Ziel ausreichend konkret ist, beginne direkt mit Analyse oder Umsetzung.