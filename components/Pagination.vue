<template>
  <ul v-if="count > 1" class="pagination justify-content-center" style="margin: 1em 0">
    <li class="page-item">
    <a class="page-link" @click="onPageClick(current-1)" href="#">&laquo;</a>
    </li>
    <li v-for="page in count" class="page-item" :class="{active: (page-1)==current}">
      <a href="#" class="page-link" @click="onPageClick(page-1)">{{page-1}}</a>
    </li>
    <li class="page-item">
      <a class="page-link" @click="onPageClick(current+1)" href="#">&raquo;</a>
    </li>
  </ul>
</template>

<script>
  export default {
    props:{
      count: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        default: 0
      }
    },
    mounted(){
      this.current = this.$route.query.page || 0;
    },
    methods:{
      onPageClick(page){
        if(page>=0 && page<this.count)
          this.$emit('change', page);
      }
    }
  }
</script>

<style>
</style>
