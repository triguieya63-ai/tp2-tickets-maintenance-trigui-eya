# TP 1 : Découverte des API REST et consultation des tickets (Vue.js 3)

**Réalisé par :** Eya Trigui  
**Filière / Classe :** Informatique  

---

## Prérequis
* **Node.js** (version 18 ou supérieure) et **npm**
* Un navigateur web moderne

---

## Installation et lancement du projet

1. **Cloner le dépôt et installer les dépendances :**
   ```bash
   npm install
   ## Difficultés rencontrées

* **Mauvais dossier dans le terminal** : au début, j'ai lancé `npm install` et `npx json-server db.json` dans le mauvais dossier, ce qui a donné l'erreur « File db.json not found ». J'ai compris qu'il faut ouvrir le terminal directement dans le dossier du projet.
* **Deux serveurs à garder actifs** : il faut laisser JSON Server (port 3000) et Vite (`npm run dev`) ouverts en même temps, dans deux terminaux différents.
* **Vue Router** : j'ai eu du mal à comprendre l'ordre des routes. La route `/tickets/nouveau` doit être déclarée avant `/tickets/:id`, sinon « nouveau » est pris pour un identifiant de ticket.
* **Gestion des erreurs** : j'ai dû distinguer l'erreur 404 (ticket inexistant) de l'erreur réseau (serveur arrêté) pour afficher le bon message.
* **Validation du formulaire** : j'ai appris à vérifier les champs obligatoires avant d'envoyer les données à l'API et à désactiver le bouton pendant l'enregistrement pour éviter les doubles clics.