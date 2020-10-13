<template>
    <div class="ele-header" >
        <div class="container">
            <img class="avatar" :src="seller.avatar" alt="商家头像">
            <div class="content">
                <div class="title">
                    <span class="ele-brand"></span>
                    <span>{{seller.name}}</span>
                </div>
                <div class="desc">{{seller.description}}·{{seller.deliveryTime}}分钟送达</div>
                <ul class="supports">
                    <li v-show="i===index" class="supports-item" v-for="(support,i) in seller.supports" :key="i">
                        <span class="supports-icon" :class="supportsClassMap[support.type]"></span>
                        {{support.description}}
                    </li>
                </ul>
            </div>
            <div class="supports-count" @click="openCover">
                {{isSupport || 0}}
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin">
            <span class="bulletin-icon"></span>
                {{seller.bulletin}}
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <!-- 遮罩层 -->
        <DescCover v-show="show" @close-cover="closeCover" :seller="seller" :supportsClassMap="supportsClassMap" isSupport="isSupport"/>
        <div class="bg-header">
            <img :src="seller.avatar" width="100%" height="120%" alt="">
        </div>
    </div>
</template>
<script>
import DescCover from "./DescCover"
export default {
    name:"EleHeader",
    props:["seller","supportsClassMap","index"],
    data:()=>({
        show:false,
    }),
    computed:{
        isSupport(){
            return this.seller.supports &&this.seller.supports.length
        }
    },
    methods:{
        openCover(){
            this.show=true
        },
        closeCover(){
            this.show=false
        }
    },
    components:{
        DescCover
    }
}
</script>
<style lang="scss" scoped>
    .ele-header{
        position: relative;
        color: $e-white;
        background: eleblack(0.5);
        .bg-header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            filter: blur(10px);
        }
    }
    .container{
        position: relative;
        display: flex;
        padding: 24px 12px 18px 24px;
        .avatar{
            flex: 0 0 64px;
            width: 64px;
            height: 64px;
            margin-right: 16px;
            border-radius: 2px;
        }
        .content{
            // flex: 1;
            padding: 2px 0;
            .title{
                font-size: $lg-size;
                font-weight: bold;
                line-height: 18px;
                margin-bottom: 8px;
            }
            .ele-brand{
                display: inline-block;
                width: 30px;
                height: 18px;
                vertical-align: top;
                margin-right: 6px;
                @include bg-img('/image/brand',30px 18px)
            }
            .desc{                
                font-size: $md-size;
                font-weight: 200;
                line-height: 12px;
            }
            .supports{               
                margin-top: 9px;
                height: 12px;  
                width: 80%;             
            }
            .supports-item{
                font-size: $sm-size;
                line-height: 12px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .supports-icon{
                display: inline-block;
                width: 14px;
                height: 12.5px;
                vertical-align: top;
                @include supports(1,14px 14px)
            }
        }
        .supports-count{
            background: rgb(0,0,0,0.2);
            position: absolute;
            right: 12px;
            bottom: 18px;
            padding: 7px 8px;
            border-radius: 13px;
            font-size: $sm-size;
            font-weight: 200;
            .icon-keyboard_arrow_right{
                display: inline-block;
                vertical-align: bottom;
            }
        }
    }
    .bulletin{
        position: relative;
        padding: 0 12px;
        height: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 28px;
        font-weight: 200;
        font-size: 10px;
        background: eleblack(0.2);
        .bulletin-icon{
            width: 22px;
            height: 12px;
            margin-right: 4px;
            display: inline-block;
            vertical-align: middle;
            @include bg-img("/image/bulletin",22px 12px)
        }
        .icon-keyboard_arrow_right{
            position: absolute;
            right: 6px;
            top: 11px;
        }
    }
</style>