<template>
  <top-content :scroll-style="{background:'#fff'}" :is-init-scroll="0">
    <nav-bar :nb-type="'transparent'" :nb-right="{icon:'bc-icon-qc'}" slot="page-header"><searcher style="width:90%;display:inline-block" :readonly="true"/></nav-bar>
    <slider :s-imgs="sliderImgs" :s-delay="5" />
    <div class="bc-news-marquee">
      <a class="news-list" :style="marquee" :class="{'animate':readyAnimate}" @tap="print()">
        <p v-for="(news,index) in marqueeData" :key="index" :data-flag="news.flag"><span class="mui-ellipsis">{{news.text}}</span></p>
      </a>
    </div>
    <div class="bc-bar"></div>
    <div class="recommend-warp">
      <div class="mui-table" style="padding-bottom:15px;border-bottom:1px solid #f2f2f2;">
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-1"><span>急聘职位</span></a>
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-2"><span>高薪职位</span></a>
        <a href="#" class="mui-table-cell mui-col-sm-4 recommend-item recommend-item-3"><span>附近职位</span></a>
      </div>
      <div class="mui-table" style="padding-top:20px;">
        <a href="#" class="mui-table-cell" style="padding-right:10px;"><img src="./imgs/recommand-1.jpg" /></a>
        <div class="mui-table-cell" style="vertical-align: bottom;">
          <a href="#" class="recommend-2-top" style="padding-bottom:10px;"><img src="./imgs/recommand-2.png" /> </a>
          <div class="recommend-2-bottom mui-row">
            <a href="#" class="mui-col-xs-6"><img src="./imgs/recommand-3.png" /> </a>
            <a href="#" class="mui-col-xs-6"><img src="./imgs/recommand-4.png" /> </a>
          </div>
        </div>
      </div>
    </div>

    <goods-list :g-list="gList" :g-bgc="'#efefef'"/>
    <div class="sn-hot-goods">
      <h3><span class="bar-before"></span>热销产品<span class="bar-after"></span></h3>
      <goods-list :g-list="hotList" :g-bgc="'#f3eee8'"/>
    </div>
  </top-content>
</template>

<script>

  import Slider from "../../components/Slider";
  import TopContent from "../../containers/topContent";
  import Searcher from "../../components/Seacher";
  import GoodsList from "../../components/GoodsList";
  import NavBar from "../../components/NavBar";

  export default {
    components: {
      NavBar,
      GoodsList,
      Searcher,
      TopContent,
      Slider
    },
    name: "app",
    data(){
      return {
        sliderImgs:[
          {img:require("./imgs/slider-img-1.jpg")},
          {img:require("./imgs/slider-img-2.jpg")}
        ],
        gList: [
          {id:1,img:require("./imgs/sy-icon-1.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"人气",price:"48000"},
          {id:2,img:require("./imgs/sy-icon-2.png"),info:"超级大芒果",icon:"清仓",price:"4800"},
          {id:3,img:require("./imgs/sy-icon-3.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:4,img:require("./imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"}
        ],
        hotList: [
          {id:5,img:require("./imgs/sy-icon-5.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",price:"48000"},
          {id:6,img:require("./imgs/sy-icon-6.png"),info:"超级大芒果",price:"4800"},
          {id:7,img:require("./imgs/sy-icon-7.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",price:"48"},
          {id:8,img:require("./imgs/sy-icon-8.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",price:"48"}
        ],
        newsData:[
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",flag:"有料"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",flag:"必看"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",flag:"头条"},
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",flag:"行业"},
        ],
        translate:0,
        newsHeight:23,
        readyAnimate:1,
        currentNews:0,
        newsSize:6
      }
    },
    computed:{
      marquee(){
        return {
          "transform":"translateY(-"+this.translate+"px)",
          "-webkit-transform":"translateY(-"+this.translate+"px)"
        }
      },
      marqueeData(){
        let data=this.newsData;
        if(data.length===1){
          data.push(this.newsData[0],this.newsData[0],this.newsData[0],this.newsData[0]);
        }else if(data.length===2){
          data.push(this.newsData[0],this.newsData[1]);
        }if(data.length===3){
          data.push(this.newsData[0]);
        }
        data.push(this.newsData[0],this.newsData[1]);
        return data;
      }
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
        vm.newsHeight=parseInt(mui.getStyles(mui(".news-list > p")[0],"height"));
      });
      this.marqueeUp();
    },
    methods:{
      pulldownRefresh(){
        console.info("pull down refresh");
        //可ajax更新页面
        setTimeout(()=>{
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        },1500);
      },
      marqueeUp(){
        let vm=this;
        setTimeout(()=>{
          vm.currentNews+=2;
          vm.translate=vm.newsHeight*vm.currentNews;
          if(vm.currentNews===vm.newsSize){
            vm.readyAnimate=0;
            vm.translate=0;
            vm.currentNews=0;
            setTimeout(()=>{
              vm.readyAnimate=1;
            },100);
          }

          vm.marqueeUp();
        },3000);
      },
      print(){
        console.log("tap")
      }
    }
  }
</script>

<style scoped>
  .sn-hot-goods{
    background-color:#f3eee8;
  }
  .sn-hot-goods > h3{
    color:#000;
    margin:0;
    padding: 5.32% 2.66% 2.66% 2.66%;
    position:relative;
  }
  .sn-hot-goods > h3 .bar-before,
  .sn-hot-goods > h3 .bar-after{
    display: inline-block;
    vertical-align: middle;
    position:relative;
    width:2em;
    height:1px;
    margin:0 10px;
    background-color:#cdcdcd;
  }
  .sn-hot-goods > h3 .bar-before:after,
  .sn-hot-goods > h3 .bar-after:before{
    content:"";
    display: inline-block;
    position:absolute;
    width:0.5em;
    height:2px;
    background-color:#000;
  }
  .sn-hot-goods > h3 .bar-before:after{
    right:0
  }
  .sn-hot-goods > h3 .bar-after:before{
    left:0;
  }
  .mui-active[style*="rgb("] .mui-search input[type=search] {
    background-color:#ccc;
  }
  .bc-news-marquee{
    background:url("../../assets/icon_headline.png") no-repeat left center;
    background-size: 2.5em;
    margin:10px;
    overflow:hidden;
    height:2.618em;
  }
  .bc-news-marquee .news-list{
    padding-left:2.5em;
    display: block;
    text-align:left;
  }
  .bc-news-marquee .news-list.animate{
    transition:all 2s;
  }
  .bc-news-marquee .news-list > p{
    display: block;
    color:#333;
    margin:0;
  }
  .bc-news-marquee .news-list > p:before{
    content:attr(data-flag);
    display: inline-block;
    border:1px solid #00ae84;
    color:#00ae84;
    font-size:12px;
    vertical-align: middle;
    transform: scale(0.8);
    padding: 0 4px;
    border-radius: 3px;
    margin-right:5px;
  }
  .bc-news-marquee .news-list > p>span{
    display: inline-block;
    vertical-align: middle;
    width:84%;
  }
  .recommend-warp{
    padding:15px 3%;
    border-bottom:2px solid #c7c7cc;
  }
  .recommend-warp .mui-table>.recommend-item{
    font-size:14px;
    position: relative;
  }
  .recommend-warp img{
    width:100%;
  }
  .recommend-warp .recommend-item>span{
    display: inline-block;
    vertical-align: middle;
  }
  .recommend-warp .recommend-item:before{
    content: "";
    width:1.5em;
    height:1.5em;
    display: inline-block;
    vertical-align: middle;
    background: #fff no-repeat center;
    background-size:cover ;
  }
  .recommend-warp .recommend-item-1:before{
    background-image: url("../../../src/assets/bolt.png");
  }
  .recommend-warp .recommend-item-2:before{
    background-image: url("../../../src/assets/crown.png");
  }
  .recommend-warp .recommend-item-3:before{
    background-image: url("../../../src/assets/nearby.png");
  }
  .recommend-warp .recommend-item-1:after,
  .recommend-warp .recommend-item-2:after{
    content:"";
    height:1em;
    width:1px;
    display: inline-block;
    background: #f2f2f2;
    position: absolute;
    right:0;
    top:0.3125em;
  }

</style>
<style>
  .bc-icon-qc{
    background:url("./imgs/icon_scan_code_white.png") no-repeat center ;
    background-size: contain;
    width:24px;
    height:38px;
  }
  .mui-active .bc-icon-qc {
    background-image: url("./imgs/icon_scan_code_black.png");
  }
</style>
