<template>
  <div @tap.stop="clickFn()" class="sn-radio">
    <selecter-icon :selected="radioData.selected"/>
    <span class="text">{{radioData.text}}</span>
  </div>
</template>

<script>
  import SelecterIcon from "./SelecterIcon"

  export default {
    name: "radio",
    components: {
      SelecterIcon
    },
    props: {
      radioData:{
        type:Object,
        require:true
      }
    },
    methods: {
      clickFn() {
        if(typeof (this.radioData.clickFn)==="function"){
          this.radioData.clickFn(this.radioData.value);
        }else{
          this.radioData.selected = !this.radioData.selected;
        }
      }
    }
  }
</script>

<style scoped>
  .sn-radio > span {
    display: inline-block;
    vertical-align: middle;
  }

  .sn-radio > span.text {
    margin-left: 5px;
    color:#333;
  }
</style>
