<template>
  <header class="entete">
    <h1>Suivi des tickets de maintenance</h1>
    <nav>
      <RouterLink to="/tickets">Liste des tickets</RouterLink>
      <RouterLink to="/tickets/nouveau">Nouveau ticket</RouterLink>
    </nav>
  </header>

  <main class="contenu">
    <RouterView />
  </main>
</template>

<style>
body { margin: 0; font-family: Arial, sans-serif; background: #f4f6f8; color: #222; }
.entete { background: #1f3a5f; color: white; padding: 12px 24px; }
.entete h1 { margin: 0 0 8px; font-size: 22px; }
.entete nav a { color: white; margin-right: 16px; }
.contenu { max-width: 900px; margin: 20px auto; padding: 0 16px; }
.barre-titre { display: flex; justify-content: space-between; align-items: center; }
.filtres { display: flex; gap: 10px; margin: 12px 0; }
.filtres input { flex: 1; }
input, select, textarea { padding: 8px; border: 1px solid #aaa; border-radius: 4px; font-size: 14px; }
table { width: 100%; border-collapse: collapse; background: white; }
th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }
.btn { display: inline-block; padding: 6px 12px; border: 1px solid #1f3a5f; border-radius: 4px; background: white; color: #1f3a5f; cursor: pointer; text-decoration: none; font-size: 14px; }
.btn-principal { background: #1f3a5f; color: white; }
.btn-danger { border-color: #b00020; color: #b00020; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.badge { padding: 2px 8px; border-radius: 10px; font-size: 13px; font-weight: bold; }
.badge-rouge { background: #fde0e0; color: #8a0000; }
.badge-orange { background: #ffedcc; color: #7a4a00; }
.badge-vert { background: #dff3e0; color: #1b5e20; }
.badge-bleu { background: #dcebff; color: #0b3d91; }
.badge-gris { background: #e5e5e5; color: #333; }
.message-erreur { background: #fde0e0; color: #8a0000; padding: 10px; border-radius: 4px; }
.message-succes { background: #dff3e0; color: #1b5e20; padding: 10px; border-radius: 4px; }
.carte { background: white; padding: 16px; border-radius: 6px; margin: 12px 0; }
.formulaire label { display: block; margin-top: 12px; font-weight: bold; }
.formulaire input, .formulaire select, .formulaire textarea { width: 100%; box-sizing: border-box; margin-top: 4px; }
.erreur-champ { color: #b00020; font-size: 13px; margin: 4px 0 0; }
</style>