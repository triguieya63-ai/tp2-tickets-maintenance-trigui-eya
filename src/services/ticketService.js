import axios from 'axios'

// Axios avec l'URL de base de JSON Server
const api = axios.create({
  baseURL: 'http://localhost:3000',
})

const ticketService = {
  // GET /tickets : lire la liste
  async getTickets() {
    const reponse = await api.get('/tickets')
    return reponse.data
  },

  // GET /tickets/:id : lire un ticket
  async getTicket(id) {
    const reponse = await api.get('/tickets/' + id)
    return reponse.data
  },

  // POST /tickets : créer un ticket
  async createTicket(data) {
    const reponse = await api.post('/tickets', data)
    return reponse.data
  },

  // PATCH /tickets/:id : modifier seulement les champs envoyés
  async updateTicket(id, data) {
    const reponse = await api.patch('/tickets/' + id, data)
    return reponse.data
  },

  // DELETE /tickets/:id : supprimer un ticket
  async deleteTicket(id) {
    await api.delete('/tickets/' + id)
  },
}

export default ticketService