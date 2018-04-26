<template>
  <div>
    <nav-tab />
  </div>
</template>

<script>

  import NavTab from "../../components/NavTab";

  export default {
    components: {
      NavTab
    },
    name: "app",
    mounted() {
      mui.init();
    }
  }
</script>

<style>
  .mui-pull-top-pocket {
    top: 45px;
  }
</style>
