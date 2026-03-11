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
    <div class="button-bar">
        <button class="navbutton" v-if="solution.length != 0" v-on:click="previousMove">Previous</button>
        <button class="navbutton primary" v-if="solution.length == 0" v-on:click="getSolution($event)">Solve</button>
        <button class="navbutton hint" v-if="solution.length != 0" disabled>Click board to reset</button>
        <button class="navbutton" v-if="solution.length != 0" v-on:click="nextMove">Next</button>
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
      let index = this.getIndex(a,b);
      let filename = this.state[index] ? "red-circle" : "white-circle";
      return new URL(`../assets/${filename}.png`, import.meta.url).href;
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

.button-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.navbutton {
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 10px 24px;
  border: 2px solid #33cccc;
  border-radius: 8px;
  background: white;
  color: #33cccc;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.navbutton:hover {
  background: #e0f7f7;
}

.navbutton:active {
  background: #b2ebeb;
}

.navbutton.primary {
  background: #33cccc;
  color: white;
}

.navbutton.primary:hover {
  background: #2db8b8;
}

.navbutton.primary:active {
  background: #28a6a6;
}

.navbutton.hint {
  border-color: #ccc;
  color: #999;
  cursor: default;
  font-style: italic;
}

.navbutton.hint:hover {
  background: white;
}
</style>
