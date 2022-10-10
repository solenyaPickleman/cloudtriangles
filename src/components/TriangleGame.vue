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
        <button color="blue-grey" > {{displayText}}  </button>
        <button color="blue-grey" > {{displayText}}  </button>
        <button color="blue-grey" > {{displayText}}  </button>
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
      state : []
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
    width: 7.5%;
}

.redpeg { 
  content: url("../assets/red-circle.png")
}
</style>
