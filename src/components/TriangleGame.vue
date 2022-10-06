<template>
    <div 
        v-for="index in Array.from({length:5},(v,k)=>k+1)" 
        :key="index"
         >
        <img 
            v-for="index in Array.from({length:index},(v,k)=>k+1)" 
            :key="index"  
            class="peg" 
            alt="RedCircle" 
            src="../assets/red-circle.png">
    </div>
    <div> 
        <button color="blue-grey" > Block Button </button>
        <button color="blue-grey" > Block Button </button>
        <button color="blue-grey" > Block Button </button>
    </div>
</template>

<script>

export default {
  name: 'TriangleGame',
  props: {
    state : Array
  },
  components: {  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.peg {
    /* display: inline-flex; */
    align-items: center;
    margin-right: 10px;
    padding: 6px 10px;
    height : 10%; 
    width: 10%;
}
</style>
