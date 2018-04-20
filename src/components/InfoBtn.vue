<template>
  <div class="mui-table">
    <p class="mui-table-cell mui-col-xs-8 info" :class="ibInfoClass">
      <slot></slot>
    </p>
    <a class="mui-table-cell mui-col-xs-4 btn" :class="{'disabled':ibBtn.disabled}" @tap.stop="btnClickFn">{{ibBtn.name}}</a>
  </div>
</template>

<script>
  export default {
    name: "info-btn",
    props: {
      ibBtn: {
        type: Object,
        require: true
      },
      ibInfoClass: {
        type: Object
      }
    },
    methods: {
      btnClickFn() {
        this.$emit("ib-active");
      }
    }
  }
</script>

<style scoped>
  .btn {
    background: #f90101;
    color: #fff;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
  }

  .btn:active {
    background: #e00000;
  }

  .btn.disabled,
  .btn.disabled:active {
    background: #999;
  }

  .info {
    color: #000;
    font-size: 16px;
    vertical-align: middle;
    padding: 0 10px;
  }

</style>
