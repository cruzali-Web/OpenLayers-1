<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/mapas/mapa1">Mapa 1 Points</RouterLink> |
      <RouterLink to="/mapas/mapa2">Mapa 2 Points 2 Capas</RouterLink> |
      <RouterLink to="/mapas/mapa3">Mapa 3 Poligonos</RouterLink>

    </nav>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: blue;
}

nav a:hover {
  text-decoration: underline;
}
</style>
