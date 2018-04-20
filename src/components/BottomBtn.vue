<template>
  <div class="mui-bar mui-table">
    <a class="mui-block mui-btn mui-btn-default" @tap.stop="clickFn()">{{bbName}}</a>
  </div>
</template>

<script>
  export default {
    name: "bottom-btn",
    props: {
      bbName: {
        type: String,
        require: true
      }
    },
    methods: {
      clickFn() {
        this.$emit("active");
      }
    }
  }
</script>

<style scoped>
  .mui-bar.mui-table{
    background:none;
    border:none;
  }

  .mui-bar.mui-table > .mui-btn-default{
    padding:0;
    top:0;
    height: 50px;
    line-height: 50px;
    font-size:17px;
    letter-spacing: 5px;
    border-radius:initial;
  }
</style>
