<template>
  <top-content :scroll-style="{background:'#fff'}" :is-init-scroll="0">
    <nav-bar :nb-type="'transparent'" :nb-right="{icon:'bc-icon-qc'}" slot="page-header"><searcher style="width:90%;display:inline-block" :readonly="true"/></nav-bar>
    <slider :s-imgs="sliderImgs" :s-delay="5" />
    <marquee-up :mu-data="newsData"></marquee-up>
    <div class="bc-bar"></div>
    <div class="recommend-warp">
      <div class="mui-table recommend-list" style="padding-bottom:15px;border-bottom:1px solid #f2f2f2;">
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-1"><span>急聘职位</span></a>
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-2"><span>高薪职位</span></a>
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-3"><span>附近职位</span></a>
      </div>
      <div class="mui-table" style="padding-top:20px;">
        <a href="#" class="mui-table-cell" style="padding-right:10px;"><img src="../../../static/imgs/recommand-1.jpg" /></a>
        <div class="mui-table-cell" style="vertical-align: bottom;">
          <a href="#" class="recommend-2-top" style="padding-bottom:10px;"><img src="../../../static/imgs/recommand-2.png" /> </a>
          <div class="recommend-2-bottom mui-row">
            <a href="#" class="mui-col-xs-6"><img src="../../../static/imgs/recommand-3.png" /> </a>
            <a href="#" class="mui-col-xs-6"><img src="../../../static/imgs/recommand-4.png" /> </a>
          </div>
        </div>
      </div>
    </div>


  </top-content>
</template>

<script>

  import Slider from "../../components/Slider";
  import TopContent from "../../containers/topContent";
  import Searcher from "../../components/Seacher";
  import NavBar from "../../components/NavBar";
  import MarqueeUp from "../../components/MarqueeUp";

  export default {
    components: {
      MarqueeUp,
      NavBar,
      Searcher,
      TopContent,
      Slider
    },
    name: "app",
    data(){
      return {
        sliderImgs:[
          {img:require("imgs/slider-img-1.jpg")},
          {img:require("imgs/slider-img-2.jpg")}
        ],
        gList: [
        ],
        hotList: [
        ],
        newsData:{
          data:[
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",tag:"有料"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",tag:"必看"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",tag:"头条"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",tag:"行业"},
          ]
        }

      }
    },
    computed:{

    },
    mounted(){
      let vm = this;
      this.$nextTick(function(){
        mui.init({
          swipeBack: false,
          pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
              style: 'circle',
              callback: vm.pulldownRefresh
            }
          }
        });
      });

    },
    methods:{
      pulldownRefresh(){
        console.info("pull down refresh");
        //可ajax更新页面
        setTimeout(()=>{
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        },1500);
      },

      print(){
        console.log("tap")
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/variable.less";

  .recommend-warp{
    padding:15px 3%;
    border-bottom:2px solid #c7c7cc;

    .recommend-item{
      font-size:14px;
      color:#333;
      position: relative;

      span{
        display: inline-block;
        vertical-align: middle;
      }

      &:before{
        content: "";
        width:1.5em;
        height:1.5em;
        display: inline-block;
        vertical-align: middle;
        background: #fff no-repeat center;
        background-size:cover ;
      }
    }

    img{
      width:100%;
    }

    .recommend-item-1{

      &:before{
        background-image: url("@{path_imgs}/bolt.png");
      }
      &:after{
        content:"";
        height:1em;
        width:1px;
        display: inline-block;
        background: #f2f2f2;
        position: absolute;
        right:0;
        top:0.3125em;
      }

    }
    .recommend-item-2{

      &:before{
        background-image: url("@{path_imgs}/crown.png");
      }
      &:after{
        &:extend(.recommend-warp .recommend-item-1:after);
      }

    }
    .recommend-item-3{
      &:before{
        background-image: url("@{path_imgs}/nearby.png");
      }

    }
  }

</style>
<style>
  .mui-active[style*="rgb("] .mui-search input[type=search] {
    background-color:#ccc;
  }
  .bc-icon-qc{
    background:url("../../../static/imgs/icon_scan_code_white.png") no-repeat center ;
    background-size: contain;
    width:24px;
    height:38px;
  }
  .mui-active .bc-icon-qc {
    background-image: url("../../../static/imgs/icon_scan_code_black.png");
  }
</style>
