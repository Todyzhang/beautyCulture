<template>
  <form>
    <div class="mui-input-row mui-search">
      <input type="search" class="mui-input-clear" placeholder="搜索职位/公司/商区" :readonly="readonly">
    </div>
  </form>
</template>

<script>
  export default {
    name: "searcher",
    props:{
      readonly:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
  .mui-search .mui-placeholder .mui-icon {
    color: #ccc;
  }
  .mui-search input[type=search]{
    background-color:#fff;
    border-radius:17px;
  }
  .mui-active[style*="rgb("] .mui-search input[type=search]{
    background-color:#ccc!important;
  }

</style>
