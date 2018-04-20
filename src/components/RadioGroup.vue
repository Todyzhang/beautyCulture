<template>
  <div>
    <radio v-for="(radio,index) in radios" :key="index" :radio-data="radio"  />
  </div>
</template>

<script>
    import Radio from "./Radio";

    export default {
      components: {Radio},
      name: "radio-group",
      props:{
        rgData:{
          type:Array,
          require:true
        }
      },
      data(){
        return {selected:""}
      },
      computed:{
        radios(){
          let that=this;
          mui.each(this.rgData,function(i,v){
            v.clickFn=that.clickFn;
            v.selected=that.selected===this.value;
          });
          return this.rgData;
        }
      },
      methods:{
        clickFn:function (value) {
          this.selected=value
        }
      },
      mounted(){
        this.selected=this.rgData[0].value;
      }
    }
</script>

<style scoped>

</style>
