<template>
  <TriangleGame :state="[True, False]" /> 
</template>

<script>
import TriangleGame from './components/TriangleGame.vue';

export default {
  name: 'App',
  components: {
    TriangleGame
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
