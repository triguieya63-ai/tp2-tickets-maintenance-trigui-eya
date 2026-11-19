import { createRouter, createWebHistory } from 'vue-router'
import TicketList from './components/TicketList.vue'
import TicketCreate from './components/TicketCreate.vue'
import TicketDetail from './components/TicketDetail.vue'

const routes = [
  { path: '/', redirect: '/tickets' },
  { path: '/tickets', component: TicketList },
  // "nouveau" doit être avant ":id", sinon "nouveau" serait pris pour un id
  { path: '/tickets/nouveau', component: TicketCreate },
  { path: '/tickets/:id', component: TicketDetail },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})