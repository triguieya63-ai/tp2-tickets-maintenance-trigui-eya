<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TicketForm from './TicketForm.vue'
import ticketService from '../services/ticketService'

const router = useRouter()
const enCours = ref(false)
const erreur = ref('')

async function enregistrer(donnees) {
  enCours.value = true
  erreur.value = ''
  try {
    // statut "Ouvert" et date du jour ajoutés automatiquement
    const aujourdhui = new Date().toISOString().slice(0, 10)
    await ticketService.createTicket({
      ...donnees,
      statut: 'Ouvert',
      dateCreation: aujourdhui,
    })
    router.push('/tickets') // retour à la liste
  } catch (e) {
    erreur.value = "Impossible d'enregistrer le ticket. Vérifiez que JSON Server est démarré."
  } finally {
    enCours.value = false
  }
}
</script>

<template>
  <section>
    <RouterLink to="/tickets">← Retour à la liste</RouterLink>
    <h2>Nouveau ticket</h2>

    <p v-if="erreur" class="message-erreur" role="alert">{{ erreur }}</p>

    <div class="carte">
      <TicketForm :en-cours="enCours" @enregistrer="enregistrer" />
    </div>
  </section>
</template>