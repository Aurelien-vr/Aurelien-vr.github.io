const panels = {
  overview: { number: "00", tag: "Point de départ", title: "Comprendre avant de comparer", content: `<p class="lead">La culture se construit dans les interactions. Cette carte met en regard mon portrait culturel et les outils du module pour mieux comprendre les rencontres interculturelles.</p><div class="stat-grid"><div><strong>10</strong><span>points de portrait culturel</span></div><div><strong>03</strong><span>compétences travaillées</span></div><div><strong>100%</strong><span>évaluation par exercices</span></div></div><p class="panel-note">Repérer l’ethnocentrisme, dépasser les stéréotypes et adapter sa communication : le module part de soi pour mieux aller vers l’autre.</p>` },
  religion: { number: "01", tag: "Portrait culturel · 2 points", title: "Famille — religion", content: `<div class="fact"><span>Pratiques</span><strong>Baptême et quelques fêtes, sans pratique régulière.</strong></div><div class="fact"><span>Norme</span><strong>Respecter les traditions sans obligation de les pratiquer.</strong></div><div class="value"><span>Valeur</span><p>Appartenance, liberté de croire ou non.</p></div><p class="reflection">La religion a été présente dans mon histoire familiale, mais elle s’est effacée assez vite et n’a jamais été imposée.</p>` },
  ecology: { number: "02", tag: "Portrait culturel · 2 points", title: "Famille — écologie", content: `<div class="fact"><span>Pratiques</span><strong>Un mode de vie cohérent ; un parent et un frère végétariens.</strong></div><div class="fact"><span>Norme</span><strong>Limiter son impact et ne pas gaspiller.</strong></div><div class="value"><span>Valeur</span><p>Responsabilité envers l’environnement.</p></div><p class="reflection">Rester conscient de l’impact environnemental des éléments consommés.</p>` },
  diversity: { number: "03", tag: "Portrait culturel · 2 points", title: "Famille — diversité", content: `<div class="fact"><span>Expérience</span><strong>Tensions brèves, puis acceptation d’un membre queer.</strong></div><div class="fact"><span>Norme</span><strong>Accepter ses proches tels qu’ils sont après discussion.</strong></div><div class="value"><span>Valeur</span><p>Tolérance et priorité du lien familial sur les désaccords.</p></div>` },
  social: { number: "04", tag: "Portrait culturel · 2 points", title: "Milieu social", content: `<div class="fact"><span>Pratiques</span><strong>Voyages peu fréquents et vacances simples.</strong></div><div class="fact"><span>Norme</span><strong>À préciser</strong></div><div class="value"><span>Valeur</span><p>À préciser</p></div><p class="reflection">Un espace ouvert à enrichir par une réflexion sur les habitudes, les ressources et les représentations liées au milieu social.</p>` },
  school: { number: "05", tag: "Portrait culturel · 2 points", title: "Catéchisme & lycée catholique", content: `<div class="fact"><span>Pratiques</span><strong>Cours, fêtes et vocabulaire religieux.</strong></div><div class="fact"><span>Norme</span><strong>Respecter le cadre de l’institution.</strong></div><div class="value"><span>Valeur</span><p>Respect d’autrui et discipline.</p></div>` },
  course: { number: "06", tag: "Fiche ECTS · 10,5 h CM", title: "Le module — objectifs & évaluation", content: `<p class="lead">Développer une communication ouverte et adaptée en contexte interculturel, en mobilité comme dans le monde professionnel.</p><div class="course-columns"><div><h4>Objectifs</h4><ul><li>Comprendre sa propre identité culturelle.</li><li>Contextualiser les rencontres.</li><li>Repérer ethnocentrisme, préjugés et stéréotypes.</li><li>S’initier au management interculturel.</li></ul></div><div><h4>Compétences</h4><ul><li><b>C2</b> — conduire un projet</li><li><b>C3</b> — communiquer et collaborer</li><li><b>C5</b> — apprendre à apprendre</li></ul></div></div><div class="module-links"><button data-panel="themes">Thèmes détaillés <span>↗</span></button><button data-panel="assessment">Grille critériée <span>↗</span></button></div>` },
  themes: { number: "06a", tag: "Fiche ECTS · programme", title: "Thèmes détaillés", content: `<div class="topic-list"><span>Définition de la culture</span><span>Intelligence interculturelle</span><span>Ethnocentrisme & stéréotypage</span><span>Théories de la communication</span><span>Management interculturel</span></div><p class="panel-note">Pré-requis : Communication et Expression, initiation aux SHS et ouverture culturelle. Post-requis : AIC, stages, projets et matières professionnelles en ING3.</p>` },
  assessment: { number: "06b", tag: "Fiche ECTS · contrôle continu", title: "Évaluation — 100%", content: `<div class="assessment-row"><strong>30%</strong><span>Identifier sa propre culture avec la théorie de la socialisation</span></div><div class="assessment-row"><strong>20%</strong><span>Analyser ses comportements sur l’échelle de Bennett</span></div><div class="assessment-row"><strong>50%</strong><span>Appliquer le management interculturel à un cas d’étude</span></div><p class="panel-note">Exercices individuels, en binôme ou en trinôme. Ateliers et mises en pratique en groupes.</p>` },
};

const detail = document.querySelector(".detail-section");
const title = document.querySelector("#panel-title");
const number = document.querySelector("#detail-number");
const tag = document.querySelector("#detail-tag");
const content = document.querySelector("#panel-content");
const nodes = document.querySelectorAll("[data-panel]");

function showPanel(id, shouldScroll = true) {
  const selected = panels[id] || panels.overview;
  number.textContent = selected.number;
  tag.textContent = selected.tag;
  title.textContent = selected.title;
  content.innerHTML = selected.content;
  detail.classList.add("is-visible");
  nodes.forEach((node) => node.classList.toggle("is-active", node.dataset.panel === id));
  content.querySelectorAll("[data-panel]").forEach((link) => link.addEventListener("click", () => showPanel(link.dataset.panel)));
  if (shouldScroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

nodes.forEach((node) => node.addEventListener("click", () => showPanel(node.dataset.panel)));
document.querySelector(".close-panel").addEventListener("click", () => {
  detail.classList.remove("is-visible");
  nodes.forEach((node) => node.classList.remove("is-active"));
});
showPanel("overview", false);
