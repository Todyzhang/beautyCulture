<!--
  组件cell有以下样式，默认oneRow
  -------------------------------
  type         left        right
   oneRow    icon+title   info+>
   twoRow    title         >
             info
  -------------------------------

  @attr cl-list  Array   cell参数，包含以下字段：
                           type-种类（单行；上下行）、title-左侧标题、titleClass-标题样式、info-右侧或低部说明、infoClass-说明样式、
                           icon-左侧图标、arrow-右侧箭头

  e.g.
  html:
  <cell-list class="mt-15" :cl-list="[{title:'新增配送地址',icon:'add-address',arrow:true}]" />

  <cell-list class="mt-15" :cl-list="clList" />

  js:
  clList:[
          {
            title:"商品总额",
            info:"￥"+keep2Decimal(this.goodsTotal),
            infoClass:"default-color"
          },
          {
            title:"运费",
            info:"￥"+keep2Decimal(this.freight),
            infoClass:"default-color"
          }
        ]
-->
<template>
  <div class="mui-table-view">
    <div class="mui-table-view-cell" v-for="(li,index) in clList" :key="index">
      <div class="mui-text-left" :class="[li.arrow?'mui-navigate-right':'',li.icon]" @tap.stop="li.active||emptyFn">
        <template v-if="li.type==='twoRow'">
          <p class="title" :class="li.titleClass" v-html="li.title"></p>
          <p class="info" :class="li.infoClass">{{li.info}}</p>
        </template>
        <p v-else class="one-row" :class="li.titleClass">{{li.title}}<span :class="li.infoClass">{{li.info}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cell-list",
    props: {
      clList: {
        type: Array,
        require: true
      }
    },
    data() {
      return {}
    },
    methods: {
      emptyFn() {
      }
    }
  }
</script>

<style scoped>
  .mui-navigate-right:after {
    font-size: 30px;
    color: #999;
    right: 6px;
    padding-bottom: 2px;
  }

  .one-row {
    line-height: 2;
    font-size: 16px;
    position:relative;
    color: #333;
  }

  .one-row > span {
    position: absolute;
    right:0;
    top:50%;
    transform: translateY(-50%);
  }
  .mui-navigate-right >.one-row >span{
    right:15px;
  }
  .title,.info{
    font-size:16px;
  }
</style>
