<!--
页面基础布局
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
  <div class="mui-pager">
    <slot name="page-header"></slot>
    <slot name="page-footer"></slot>
    <div :id="scrollId" class="mui-content mui-scroll-wrapper" :style="scrollStyle">
      <div class="mui-scroll" :style="scrollType">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "top-content",
    props: {
      scrollType: {
        type: Object
      },
      scrollStyle: {
        type: Object
      },
      isInitScroll: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        scrollId: "scroll" + (+new Date)
      }
    },
    mounted() {
      if (this.isInitScroll) mui("#" + this.scrollId).scroll();
    }
  }
</script>

<style scoped>
  .mui-scroll {
    min-height: 80%;
  }
  .mui-bar.mui-table {
    bottom: 0;
    padding: 0;
    height: 50px;
  }
  .mui-table-view>li.mui-table-view-cell{
    display: block;
  }
  .mui-bar.mui-table ~ .mui-content{
    padding-bottom:50px;
  }
</style>
