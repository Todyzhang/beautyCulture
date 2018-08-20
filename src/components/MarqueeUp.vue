<!--
文本向上滚动组件
@attr muData    object,必传。格式为：
                {
                  data:[{"text":"some text",tag:"前缀标签"}...],
                  speed:3   //滚动时间，默认3秒
                }

e.g.
  html:
    <marquee-up :mu-data="newsData"></marquee-up>
  js:
    data(){
      newsData:{
          data:[
          {"text":"我们也有着很棒的教练来指导各年龄段的小球员我们也有着很棒的教练来指导各年龄段的小球员",tag:"有料"}
          ]
        }
    }
-->
<template>
  <div class="bc-news-marquee">
    <div class="news-list" :style="marquee" :class="{'animate':readyAnimate}" >
      <a v-for="(news,index) in marqueeData" :key="index" :data-tag="news.tag"><span v-bind:style="{width:newsWidth}" class="mui-ellipsis">{{news.text}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "marquee-up",
    props: {
      muData:{
        type:Object,
        required:true
      }
    },
    data(){
      return {
        translate:0,
        newsHeight:23,
        readyAnimate:1,
        currentNews:0,
        newsWidth:'84%'
      }
    },
    computed:{
      marquee(){
        return {
          "-webkit-transform":"translateY(-"+this.translate+"px)",
          "transform":"translateY(-"+this.translate+"px)"
        }
      },
      newsData(){
        return this.muData.data;
      },
      newsSize(){
        return this.newsData.length||0;
      },
      marqueeData(){
        let data=this.newsData,size=this.newsSize,underFlag=0;
        // if(data.length===1){
        //   data.push(this.newsData[0],this.newsData[0],this.newsData[0],this.newsData[0]);
        // }else if(data.length===2){
        //   data.push(this.newsData[0],this.newsData[1]);
        // }if(data.length===3){
        //   data.push(this.newsData[0]);
        // }

        for(let i=size;i<4;i++){
          data.push(data[underFlag]);
          if(underFlag+1 > size) underFlag = 0;
        }

        data.push(this.newsData[0],this.newsData[1]);
        return data;
      },
      speed(){
        return (this.muData.speed||3)*1000;
      }
    },
    methods:{
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
        },vm.speed);
      }

    },
    mounted(){
      let p=mui(".news-list > a")[0],w;
      this.newsHeight=parseInt(mui.getStyles(p,"height"));
      try{
        w=parseInt(mui.getStyles(p,"width"))-parseInt(window.getComputedStyle(p,'::before').getPropertyValue('width'))-15;
        this.newsWidth=w+"px";
      }catch(e){
        this.newsWidth="84%";
      }
      this.marqueeUp();
    }
  }
</script>

<style scoped lang="less">
  @import "../common/css/variable.less";

  @path_imgs: "../../static/imgs/";

  .bc-news-marquee {
    background: url("@{path_imgs}/icon_headline.png") no-repeat left center;
    background-size: 2.5em;
    margin: 10px;
    overflow: hidden;
    height: 2.75em;

    .news-list {
      padding-left: 2.5em;
      display: block;
      text-align: left;

      a {
        display: block;
        color: @color_normal;
        font-size:14px;
        margin: 0;
        white-space: nowrap;

        &:before{
          content: attr(data-tag);
          display: inline-block;
          border: 1px solid @color_main;
          color: @color_main;
          font-size: 12px;
          vertical-align: middle;
          transform: scale(0.8);
          padding: 0 4px;
          border-radius: 3px;
          margin-right: 5px;
        }

        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }

    .news-list.animate {
      transition: all 2s;
    }

  }

</style>
