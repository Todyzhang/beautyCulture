<template>
  <ul class="sn-goods-list mui-clearfix" :style="{backgroundColor: gBgc}">
    <li v-for="(li,index) in gList" @tap="goodsDetail(li.id)">
      <div class="g-img">
        <img :src="li.img"/>
      </div>
      <p class="mui-ellipsis-2">
        <span class="g-label" v-show="li.icon">{{li.icon}}</span>
        {{li.info}}
      </p>
      <div class="g-footer">
        <span>￥{{li.price | keep2Decimal}}</span>
        <button type="button" class="mui-btn sn-btn-default" @tap.stop="buyNow(li.id)">购买</button>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "goods-list",
    props: {
      gList: {
        type: Array,
        require: true
      },
      gBgc: {
        type: String,
        default: "#fff"
      }
    },
    methods: {
      goodsDetail(goodsId) {
        //打开详情页
        console.log("商品详情页：", goodsId);
      },
      buyNow(goodsId) {
        //购买
        console.log("购买商品：", goodsId);
      }
    }
  }
</script>

<style scoped>
  .sn-goods-list {
    padding: 2.66%;
    margin: 0;
    text-align: left;
    font-size:0;
  }

  .sn-goods-list > li {
    padding: 4%;
    border: 1px solid transparent;
    width: 50%;
    background-color: #fff;
    font-size: 16px;
    border-bottom-color: #e1e1e1;
    display:inline-block;
  }

  .sn-goods-list > li:nth-child(even) {
    border-left-color: #e1e1e1;
  }

  .sn-goods-list > li:nth-last-child(1),
  .sn-goods-list > li:nth-last-child(2) {
    border-bottom-color: transparent;
  }

  .g-img {
    padding: 15%;
  }

  .mui-ellipsis-2 {
    height: 3em;
    text-align: left;
  }

  .g-label {
    color: #f90101;
    border: 1px solid #f90101;
    transform: scale(0.9);
    display: inline-block;
    padding: 0 8px;
    border-radius: 3px;
  }

  .g-img > img {
    display: block;
    width: 100%;
    border-radius: 50%;
    border: 1px solid #000;
  }

  .g-footer {
    color: #f90101;
    text-align: left;
    position: relative;
  }

  .g-footer > span {
    display: inline-block;
    padding-top: 2px;
  }

  .sn-btn-default {
    background: #f90101;
    color: #fff;
    border: 0;
    padding: 3px 12px;
    position: absolute;
    right: 0;
  }
</style>
