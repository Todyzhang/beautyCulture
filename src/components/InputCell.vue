<!--
input cell组件
样式：
------------------------
label input
------------------------

@attr icList Array   cell参数，包含以下字段：label-标题、limit-文本限制输入位数、placeholder-文本框提示语、model-用户输入后保存在该值

e.g.
html:
<input-cell :ic-list="icList"/>
js:
data:icList [{label: '留言备注', placeholder: '选填（50字以内）', model: this.remark, limit: 50}]

注：针对input开发的自定义指令，如果不是绑定在当前作用域的Model,其指令update函数不会触发

-->
<template>
  <div class="mui-table-view">
    <div class="mui-table-view-cell" v-for="(li,index) in icList" :key="index">
      <div class="mui-input-row">
        <label>{{li.label}}</label>
        <input type="text" class="mui-input-clear" v-enter-length="li.limit" :placeholder="li.placeholder"
               v-model="vModel[index]" @input="updateValue(vModel[index],li)">
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "input-cell",
    props: {
      icList:{
        type:Array,
        require:true
      }
    },
    data(){
      return {
        vModel:{}
      }
    },
    create(){
      //动态生成model
      this.icList.forEach((i)=>{
        this.vModel[i]="";
      })
    },
    methods: {
      updateValue(value,target) {
        // 通过 input 事件更新父组件的信息
        target.model=value;
      }
    },
    mounted(){
      //点击清除输入框时需同时置空vue model
      mui(".mui-input-row").on("tap", ".mui-icon-clear", (e) => {
        let input = e.target.previousSibling;
        input.dispatchEvent(new Event("input"));
      });
    },
    beforeDestroy(){
      mui(".mui-input-row").off("tap");
    }
  }
</script>

<style scoped>
  .mui-input-row label {
    float: initial;
    width: 5em;
    position: absolute;
    left: 0;
    top: 2px;
    padding: 6px 0;
    text-align: left;
    font-size: 16px;
    line-height: 1;
    color: #333;
  }

  .mui-input-row label ~ input {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 1.5em 6px 5em;
    height: auto;
    line-height: 1;
  }
</style>
<style>
  .mui-input-row .mui-input-clear ~ .mui-icon-clear {
    top: 6px;
  }
</style>
