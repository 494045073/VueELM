<template>
    <div class="recommend-wrapper">
        <span class="thumb" :class="type===0?'icon-thumb_up':'icon-thumb_down'"></span>
        <span class="recommend-item" v-for="(r,i) in recommend" :key="i">{{r}}</span>
    </div>
</template>
<script>
export default {
    name:"Recommend",
    props:["recommend","type"]
}
</script>
<style lang="scss" scoped>
.recommend-wrapper{
    line-height: 16px;
    .thumb{
        font-size: $xs-size;
        margin-right: 8px;
        &.icon-thumb_up{
            color: rgb(0,160,220);
        }
        &.icon-thumb_down{
            color: #666;
        }
    }
    .recommend-item{
        border: 1px solid eleblack(0.1);
        border-radius: 2px;
        padding: 0 6px;
        line-height: 16px;
        font-size: 9px;
        color: rgb(147, 153, 159);
        display: inline-block;
        margin-bottom: 5px;
    }
}
</style>