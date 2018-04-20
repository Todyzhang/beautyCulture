<!--
数字输入选择框，左边-1按钮，中间input框（只能输入数字），右边+1按钮。
@attr v-model   input框双向绑定的model值

e.g.
  html:
    <number-box v-model="some"/>
  js:
    data(){
      some:"some value"
    }
-->
<template>
  <p class="goods-edit-num">
    <button class="minus-num" @tap.stop="minusNum()"></button>
    <input type="tel" ref="input" :value="value" @input="updateValue($event.target.value)" v-enter-number="7"
           :style="{'width':(value.toString().length*0.5+0.5)+'em'}"/>
    <button class="add-num" @tap.stop="addNum()"></button>
  </p>
</template>

<script>

  export default {
    name: "number-box",
    props: ["value"],
    methods: {
      minusNum() {
        let num=+this.value-1;
        num>0&&this.updateValue(num);
      },
      addNum() {
        let num=+this.value+1;
        this.updateValue(num);
      },
      updateValue(value) {
        // 通过 input 事件带出数值
        this.$emit('input', value);
      }
    }
  }
</script>

<style scoped>
  .goods-edit-num {
    margin-top: 15px;
    height: 3em;
    line-height: 3em;
  }

  .goods-edit-num > button {
    display: inline-block;
    width: 3em;
    height: 3em;
    background: url("../assets/minus.png") no-repeat center;
    background-size: 2.25em;
    vertical-align: top;
    border: none;
    padding: 0;
  }

  .goods-edit-num > button.add-num {
    background-image: url("../assets/add.png");
  }

  .goods-edit-num > input {
    margin: 0;
    padding: 0;
    border: none;
    height: 1em;
    display: inline-block;
    color: #333;
  }
</style>
