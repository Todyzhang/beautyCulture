<!--
页面顶部导航条，分为左、中、右三部分，其中左、右各为一个按钮，中间为标题
@attr nbTitle   中间标题，必传
@attr nbType    "default"（不传默认）或"transparent"（透明导航条）
@attr nbLeft    {icon:"icon图标class"}或{icon:"icon图标class",text:"文字"}，左侧图标/图标+文字
@attr nbRight   {icon:"icon图标class"}或{text:"文字"}，，右侧图标/文字

e.g.
  html:
    <nva-bar nb-title="导航条"></nva-bar>
    <nva-bar :nb-title="title" :nb-left="nbLeft" :nb-right="nbRight"></nva-bar>
  js:
    data(){
      title:"导航条",
      nbLeft:{icon:"mui-icon-left-nav",text:"返回"},
      nbRight:{icon:"mui-icon-bars"}
    }
-->

<template>
  <header class="mui-bar" :class="cpType" data-scrollby=".mui-content">
    <a v-if="hasLeft" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @tap.stop="cpLeftClickFn">
      <span v-if="nbLeft.icon" class="mui-icon" :class="cpIcon('Left')"></span>{{nbLeft.text}}</a>
    <h1 v-if="nbTitle" class="mui-title">{{nbTitle}}</h1>
    <slot></slot>
    <a v-if="hasRight" class="mui-btn mui-btn-link mui-btn-nav mui-pull-right" @tap.stop="cpRightClickFn">
      <span v-if="nbRight.icon" class="mui-icon" :class="cpIcon('Right')"></span>{{nbRight.text}}</a>
  </header>
</template>

<script>
  //在mui中a标签只响应tap事件，故须把click事件改为tap事件

  export default {
    name: "nav-bar",
    //属性
    props: {
      "nbTitle": {
        type: String
      },
      "nbType": {
        type: String,
        default(){
          return "default"
        }
      },
      "nbLeft": {
        type: Object,
        default(){
          return {}
        }
      },
      "nbRight": {
        type: Object,
        default(){
          return {
            clickFn(){}
          }
        }
      }
    },
    //计算属性
    computed: {
      cpType() {
        return this.nbType === 'transparent' ? 'mui-bar-transparent' : 'mui-bar-nav';
      },
      cpLeftClickFn() {
        return this.nbLeft.clickFn || this.emptyFn
      },
      cpRightClickFn() {
        return this.nbRight.clickFn || this.emptyFn
      },
      hasLeft() {
        return this.nbLeft.icon || this.nbLeft.text;
      },
      hasRight() {
        return this.nbRight.icon || this.nbRight.text;
      },
    },

    //计算方法
    methods:{
      cpIcon(directive){
        let icon=this["nb"+directive].icon,icons=icon;
        if(icon==="mui-icon-left-nav"){
          icons="mui-icon-left-nav mui-action-back"
        }else if(icon==="mui-icon-bars"){
          icons="mui-icon-bars mui-action-menu"
        }
        return icons;
      },
      emptyFn(){
        console.info("empty function")
      }
    }
  }
</script>

<style>
  .mui-bar{
    background-color: #fff;
  }
  .mui-bar.mui-bar-transparent{
    background-color: rgba(255,255,255,.2);
  }
</style>
