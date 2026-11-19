// Couleur du badge selon la valeur (priorité ou statut)
const couleurs = {
  Haute: 'rouge',
  Moyenne: 'orange',
  Basse: 'vert',
  Ouvert: 'bleu',
  'En cours': 'orange',
  'Résolu': 'vert',
  'Fermé': 'gris',
}

export function classeBadge(valeur) {
  return 'badge badge-' + (couleurs[valeur] || 'gris')
}