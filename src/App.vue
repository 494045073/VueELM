<template>
  <div id="app">
     <!-- <SellerTabs /> -->
    <EleHeader :seller="seller" :supportsClassMap="supportsClassMap" :index="index" />
    <seller-tabs></seller-tabs>
    <router-view :seller="seller" :supportsClassMap="supportsClassMap"></router-view>
  </div>
</template>
<script>
import SellerTabs from "./components/sellerTabs/SellerTabs.vue";
import EleHeader from "./components/EleHeader/EleHeader"
export default {
  name:"App",
  data:() =>({
    index:0,
    timer:null,
    seller:{},
    supportsClassMap:['decrease','discount','special','invoice','guarantee']
  }),
  methods: {
    //ES7要有async
    async getSellerData() {
      //getSellerData(){
      //一：常用写法
      //   this.axios.get('/api/seller')
      //             .then(function(res){
      //                 console.log(res)
      //             })
      //             .catch(function (error) {
      //                 // handle error
      //                 console.log(error);
      //             })
      //             .finally(function () {
      //                 // always executed
      //             });
      //  this.axios.get('/api/seller')
      //             .then(res =>{
      //                 console.log(res)
      //             })
      //二：ES6箭头函数写法
      // this.axios.get('/api/seller')
      //             .then(res =>{
      //                 console.log(res)
      //             })
      //}
      //三：ES7写法
      try {
        let res = await this.axios("/api/seller");
        this.seller=res.data
        // console.log(res);
        this.$nextTick(()=>{
          this.startSlider(this.seller.supports)
        })       
      } catch (e) {
        console.error(e);
      }
    },
    //轮播逻辑
    startSlider(arr){
      if(arr && arr.length>1){
        this.timer=setInterval(()=>{
          this.index++
          if(this.index >= arr.length){
            this.index=0
          }
        },1500)
      }
    }
  },
  created() {
    this.getSellerData();
  },
  components: {
    EleHeader,
    SellerTabs
  }
};
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
