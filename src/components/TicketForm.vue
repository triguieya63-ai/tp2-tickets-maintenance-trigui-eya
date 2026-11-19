<script setup>
import { reactive } from 'vue'

// ticket : le ticket à modifier (absent pour une création)
// enCours : true pendant l'enregistrement (bouton désactivé)
const props = defineProps({
  ticket: Object,
  enCours: Boolean,
})

const emit = defineEmits(['enregistrer'])

const form = reactive({
  titre: props.ticket ? props.ticket.titre : '',
  description: props.ticket ? props.ticket.description : '',
  demandeur: props.ticket ? props.ticket.demandeur : '',
  priorite: props.ticket ? props.ticket.priorite : 'Moyenne',
  statut: props.ticket ? props.ticket.statut : 'Ouvert',
})

const erreurs = reactive({ titre: '', description: '', demandeur: '' })

// Vérifie les champs obligatoires, retourne true si tout est correct
function valider() {
  erreurs.titre = form.titre.trim() === '' ? 'Le titre est obligatoire.' : ''
  erreurs.description = form.description.trim() === '' ? 'La description est obligatoire.' : ''
  erreurs.demandeur = form.demandeur.trim() === '' ? 'Le demandeur est obligatoire.' : ''
  return !erreurs.titre && !erreurs.description && !erreurs.demandeur
}

function envoyer() {
  if (!valider()) return // formulaire invalide : on n'envoie rien
  emit('enregistrer', {
    titre: form.titre.trim(),
    description: form.description.trim(),
    demandeur: form.demandeur.trim(),
    priorite: form.priorite,
    statut: form.statut,
  })
}
</script>

<template>
  <form class="formulaire" @submit.prevent="envoyer" novalidate>
    <label for="titre">Titre *</label>
    <input id="titre" v-model="form.titre" type="text" />
    <p v-if="erreurs.titre" class="erreur-champ" role="alert">{{ erreurs.titre }}</p>

    <label for="description">Description *</label>
    <textarea id="description" v-model="form.description" rows="3"></textarea>
    <p v-if="erreurs.description" class="erreur-champ" role="alert">{{ erreurs.description }}</p>

    <label for="demandeur">Demandeur *</label>
    <input id="demandeur" v-model="form.demandeur" type="text" />
    <p v-if="erreurs.demandeur" class="erreur-champ" role="alert">{{ erreurs.demandeur }}</p>

    <label for="priorite">Priorité</label>
    <select id="priorite" v-model="form.priorite">
      <option>Basse</option>
      <option>Moyenne</option>
      <option>Haute</option>
    </select>

    <!-- Le statut ne se choisit qu'en modification (en création il vaut "Ouvert") -->
    <template v-if="ticket">
      <label for="statut">Statut</label>
      <select id="statut" v-model="form.statut">
        <option>Ouvert</option>
        <option>En cours</option>
        <option>Résolu</option>
        <option>Fermé</option>
      </select>
    </template>

    <p>
      <button type="submit" class="btn btn-principal" :disabled="enCours">
        {{ enCours ? 'Enregistrement…' : 'Enregistrer' }}
      </button>
    </p>
  </form>
</template>