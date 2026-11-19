<script setup>
import { ref, computed, onMounted } from 'vue'
import ticketService from '../services/ticketService'
import { classeBadge } from '../badges'

const tickets = ref([])
const chargement = ref(true)
const erreur = ref('')

// Recherche et filtres (TP 1)
const recherche = ref('')
const filtreStatut = ref('')
const filtrePriorite = ref('')

// Statut suivant pour le changement rapide
const suivant = {
  'Ouvert': 'En cours',
  'En cours': 'Résolu',
  'Résolu': 'Fermé',
}

async function charger() {
  chargement.value = true
  erreur.value = ''
  try {
    tickets.value = await ticketService.getTickets()
  } catch (e) {
    erreur.value = "Impossible de charger les tickets. Vérifiez que JSON Server est démarré (port 3000)."
  } finally {
    chargement.value = false
  }
}

onMounted(charger)

const ticketsFiltres = computed(() => {
  return tickets.value.filter((t) => {
    const okTitre = t.titre.toLowerCase().includes(recherche.value.toLowerCase())
    const okStatut = filtreStatut.value === '' || t.statut === filtreStatut.value
    const okPriorite = filtrePriorite.value === '' || t.priorite === filtrePriorite.value
    return okTitre && okStatut && okPriorite
  })
})

async function avancerStatut(ticket) {
  try {
    await ticketService.updateTicket(ticket.id, { statut: suivant[ticket.statut] })
    await charger() // on recharge la liste sans recharger la page
  } catch (e) {
    erreur.value = "Le changement de statut a échoué. Vérifiez que JSON Server est démarré."
  }
}

async function supprimer(ticket) {
  const ok = confirm('Voulez-vous vraiment supprimer le ticket « ' + ticket.titre + ' » ?')
  if (!ok) return
  try {
    await ticketService.deleteTicket(ticket.id)
    await charger()
  } catch (e) {
    erreur.value = "La suppression a échoué. Vérifiez que JSON Server est démarré."
  }
}
</script>

<template>
  <section>
    <div class="barre-titre">
      <h2>Liste des tickets</h2>
      <RouterLink to="/tickets/nouveau" class="btn btn-principal">Nouveau ticket</RouterLink>
    </div>

    <div class="filtres">
      <input v-model="recherche" type="text" placeholder="Rechercher par titre..." />
      <select v-model="filtreStatut">
        <option value="">Tous les statuts</option>
        <option>Ouvert</option>
        <option>En cours</option>
        <option>Résolu</option>
        <option>Fermé</option>
      </select>
      <select v-model="filtrePriorite">
        <option value="">Toutes les priorités</option>
        <option>Basse</option>
        <option>Moyenne</option>
        <option>Haute</option>
      </select>
    </div>

    <p v-if="chargement">Chargement…</p>

    <div v-else-if="erreur">
      <p class="message-erreur" role="alert">{{ erreur }}</p>
      <button class="btn" @click="charger">Réessayer</button>
    </div>

    <div v-else>
      <p>{{ ticketsFiltres.length }} ticket(s) affiché(s) sur {{ tickets.length }}</p>

      <p v-if="ticketsFiltres.length === 0">Aucun ticket ne correspond à votre recherche.</p>

      <table v-else>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Demandeur</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in ticketsFiltres" :key="t.id">
            <td><RouterLink :to="'/tickets/' + t.id">{{ t.titre }}</RouterLink></td>
            <td>{{ t.demandeur }}</td>
            <td><span :class="classeBadge(t.priorite)">{{ t.priorite }}</span></td>
            <td><span :class="classeBadge(t.statut)">{{ t.statut }}</span></td>
            <td>{{ t.dateCreation }}</td>
            <td>
              <button v-if="suivant[t.statut]" class="btn" @click="avancerStatut(t)">
                → {{ suivant[t.statut] }}
              </button>
              <RouterLink :to="'/tickets/' + t.id" class="btn">Modifier</RouterLink>
              <button class="btn btn-danger" @click="supprimer(t)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>