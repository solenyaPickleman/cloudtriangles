<template>
    <div class="pegrow"
        v-for="index in Array.from({length:5},(v,k)=>k+1)" 
        :key="index"
         >
        <img 
            v-for="element in Array.from({length:index},(v,k)=>k+1)" 
            v-on:click="circleClick($event)"
            :id="getIndex(index, element)"
            :key="element"
            class="peg" 
            alt="RedCircle" 
            width="512"
            :src= "getSource(index, element)"
            >
    </div>
    <div> 
        <button class = 'navbutton' v-if="solution.length != 0 " v-on:click="previousMove" > Previous Move </button>
        <button class = 'navbutton' v-if="solution.length == 0" v-on:click="getSolution($event)" > Click to find solution  </button>
        <button class = 'navbutton' v-if="solution.length != 0" disabled='true'> Click the game board to reset  </button>
        <button class = 'navbutton' v-if="solution.length != 0 " v-on:click="nextMove" > Next Move </button>
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
  name: 'TriangleGame',
  props: {
    initializeGameState : Function
  },
  components: {  },
  data() {
    return {
      displayText : '',
      state : [],
      solution : [] ,
      solution_index : 0
    }
  },
  methods: {
    async getText() { 
      const response = await axios.get('/hello-world');
      this.displayText = ( response.data || "error in calling!" ) ; 
    },
     getIndex(strRow,strCol ) { 
      let row = parseInt(strRow)-1 ;
      let col = parseInt(strCol)-1;
      if  (row == 2 ){ 
          row = 2 + 1 ;
      } else if ( row == 3 ) {
          row = 3 + 2 + 1 ;
      } else if  (row == 4 )  {
          row = 4 + 3 + 2 + 1;
      }
      return row + col;
    },
    async circleClick(event ) {
      let index = event.target.id ; 
      this.state = this.initializeGameState(index);
      this.solution = [] ; 
      this.solution_index = 0;
    },
    async reset() {
      this.state = this.initializeGameState(4);
      this.solution = [] ; 
      this.solution_index = 0;
    },
    async getSolution() {
      let solution  = await  axios.post('/api/solver',  { 'game' : this.state} )
        .then(function (response) {
          let {solution} = response.data ;
          return solution
        });
      this.solution = solution;
      this.solution_index = 0; 
      this.state = solution[0];
    },
    async nextMove() { 
      this.solution_index = this.solution_index +1 < this.solution.length  ?  this.solution_index + 1 : this.solution_index  ; 
      this.state= this.solution[this.solution_index] ; 
    },
    async previousMove() { 
      this.solution_index = this.solution_index -1 < 0 ? 0 :   this.solution_index -1  ; 
      this.state= this.solution[this.solution_index] ; 
    },
    getSource(a,b ) { 
      var images = require.context('../assets/', false, /\.png$/);
      let index = this.getIndex(a,b);
      return   images( "./" + ( this.state[index] ? "red-circle" : "white-circle" ) + ".png") ;
    }
  },
  async mounted() { 
    this.state = this.initializeGameState(4); 
    await this.getText();    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.peg {
    /* display: inline-flex; */
    align-items: center;
    margin-right: 10px;
    padding: 6px 10px;
    width: 6%;
}

.redpeg { 
  content: url("../assets/red-circle.png")
}
.navbutton {
  background-color :honeydew
}
</style>
