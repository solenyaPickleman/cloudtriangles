<template>
    <div class="pegrow"
        v-for="index in Array.from({length:5},(v,k)=>k+1)" 
        :key="index"
         >
        <img 
            v-for="index in Array.from({length:index},(v,k)=>k+1)" 
            :key="index"  
            class="peg" 
            alt="RedCircle" 
            width="512"
            src="../assets/red-circle.png">
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
    state : Array
  },
  components: {  },
  data() {
    return {
      displayText : ''
    }
  },
  methods: {
    async getText() { 
      const response = await axios.get('/hello-world');
      this.displayText = ( response.data || "error in calling!" ) ; 
    }
  },
  async mounted() { 
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
</style>
