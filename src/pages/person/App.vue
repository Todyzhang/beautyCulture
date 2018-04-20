<template>
  <top-content :scroll-style="{background:'#fff'}">
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
    <p>person center</p>
  </top-content>
</template>

<script>

  import TopContent from "../../containers/topContent";

  export default {
    components: {
      TopContent
    },
    name: "app",
    data(){
      return {
        gList: [
          {id:1,img:require("../index/imgs/sy-icon-1.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"人气",price:"48000"},
          {id:2,img:require("../index/imgs/sy-icon-2.png"),info:"超级大芒果",icon:"清仓",price:"4800"},
          {id:3,img:require("../index/imgs/sy-icon-3.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:4,img:require("../index/imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:5,img:require("../index/imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:6,img:require("../index/imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:7,img:require("../index/imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"},
          {id:8,img:require("../index/imgs/sy-icon-4.png"),info:"攀枝花凯特超级大芒果2kg/2-4个青芒果 大芒果2kg/2-4个青芒果",icon:"",price:"48"}
        ]
      }
    },
    mounted(){
      mui.init();
    }
  }
</script>

<style scoped>


</style>
