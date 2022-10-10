<template>
  <section class="banner">
      <h1>Solve the Cracker Barrel Peg Game</h1>
  </section>
  <TriangleGame :initializeGameState="initializeGameState" /> 
</template>

<script>
import TriangleGame from './components/TriangleGame.vue';

export default {
  name: 'App',
  components: {
    TriangleGame
  },
  methods : {
    initializeGameState(index, size=15 ) { 
      return Array.from({length:size },(v,k)=>k != index )
    }
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
}

.banner {
  width: 100%;
  padding:20px 0;
  text-align: center;
  background: #33cccc;
  color: white;
}
.btn-bgstroke {
  font-size: 20px;
  display: inline-block;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 300;
  margin-top: 30px; 
}

.btn-bgstroke:hover {
  background-color: white;
  color: #33cccc;
}

h1,
p,
a{
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 5vw;
  padding: 10px 0;
  font-weight: 600;
}

p {
  font-size: 1vw;
  font-weight: 50;
  letter-spacing: 2px;
}
</style>
