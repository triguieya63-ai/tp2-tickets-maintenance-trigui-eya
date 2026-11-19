<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TicketForm from './TicketForm.vue'
import ticketService from '../services/ticketService'
import { classeBadge } from '../badges'

const route = useRoute()

const ticket = ref(null)
const chargement = ref(true)
const introuvable = ref(false)
const erreur = ref('')
const message = ref('')
const enCours = ref(false)

async function charger() {
  try {
    // route.params.id : l'identifiant présent dans l'URL
    ticket.value = await ticketService.getTicket(route.params.id)
  } catch (e) {
    if (e.response && e.response.status === 404) {
      introuvable.value = true
    } else {
      erreur.value = "Impossible de charger le ticket. Vérifiez que JSON Server est démarré."
    }
  } finally {
    chargement.value = false
  }
}

onMounted(charger)

async function enregistrer(donnees) {
  enCours.value = true
  erreur.value = ''
  message.value = ''
  try {
    ticket.value = await ticketService.updateTicket(ticket.value.id, donnees)
    message.value = 'Ticket mis à jour avec succès.'
  } catch (e) {
    erreur.value = "La modification a échoué. Vérifiez que JSON Server est démarré."
  } finally {
    enCours.value = false
  }
}
</script>

<template>
  <section>
    <RouterLink to="/tickets">← Retour à la liste</RouterLink>

    <p v-if="chargement">Chargement…</p>

    <p v-else-if="introuvable" class="message-erreur" role="alert">
      Erreur 404 : ce ticket n'existe pas.
    </p>

    <div v-else>
      <p v-if="erreur" class="message-erreur" role="alert">{{ erreur }}</p>

      <div v-if="ticket">
        <h2>Ticket n°{{ ticket.id }} : {{ ticket.titre }}</h2>

        <div class="carte">
          <p><strong>Description :</strong> {{ ticket.description }}</p>
          <p><strong>Demandeur :</strong> {{ ticket.demandeur }}</p>
          <p><strong>Priorité :</strong> <span :class="classeBadge(ticket.priorite)">{{ ticket.priorite }}</span></p>
          <p><strong>Statut :</strong> <span :class="classeBadge(ticket.statut)">{{ ticket.statut }}</span></p>
          <p><strong>Date de création :</strong> {{ ticket.dateCreation }}</p>
        </div>

        <h3>Modifier le ticket</h3>
        <p v-if="message" class="message-succes">{{ message }}</p>
        <div class="carte">
          <TicketForm :ticket="ticket" :en-cours="enCours" @enregistrer="enregistrer" />
        </div>
      </div>
    </div>
  </section>
</template>