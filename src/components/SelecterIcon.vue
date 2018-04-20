<!--
选择框组件。
@attr  selected   Boolean  是否选中状态
@event active     Function 点击后的回调函数

e.g.
  html:
    <selecter-icon :selected="some" @active="doSomething()"/>
  js:
    data(){
      some:"some value"
    },
    methods{
      doSomething(){
        ...
      }
    }
-->
<template>
    <span class="mui-icon cart-list-select-icon"
          :class="{'selected':choose}" @tap="selectFn()"></span>
</template>

<script>
  export default {
    name: "selecter-icon",
    props: ["selected"],
    computed: {
      choose() {
        return this.selected;
      }
    },
    methods: {
      selectFn() {
        this.$emit("active")
      }
    }
  }
</script>

<style scoped>
  .cart-list-select-icon {
    background: url("../assets/checkbox.png") no-repeat center;
    width: 1em;
    height: 1em;
    background-size: 1em;
    vertical-align: sub;
  }

  .cart-list-select-icon.selected {
    background-image: url("../assets/checkbox_on.png");
  }
</style>
