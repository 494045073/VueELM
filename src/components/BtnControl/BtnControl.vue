<template>
  <div class="btn-control">
    <span class="btn icon-remove_circle_outline" v-show="num>0" @click="dec"></span>
    <span class="count" v-show="num>0">{{num}}</span>
    <span class="btn icon-add_circle" @click="add"></span>
  </div>
</template>
<script>
export default {
    props:["count","name"],
    methods:{
        add(){
            this.$emit('add',{num:this.num+1,name:this.name})
        },
        dec(){
            this.$emit('dec',{num:this.num-1,name:this.name})
        }
    },
    computed:{
        num(){
            if(this.count){
                return this.count
            }
            return 0
        }
    }
};
</script>
<style lang="scss" scoped>
.btn-control {
  .btn {
    display: inline-block;
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    vertical-align: top;
  }
  .count{
      display: inline-block;
      width: 24px;
      font-size: $xs-size;
      line-height: 24px;
      color: rgb(147, 153, 159);
      text-align: center;
  }
}
</style>