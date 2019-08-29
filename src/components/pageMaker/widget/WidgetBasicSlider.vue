<template>
    <div class="WidgetBasicSlider-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in source.upload" :key="index" @click="onItemClick(item.urlText)">
                <img :src="item.imageUrl" width="100%"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name: "WidgetBasicSlider",
        props: {
            source: {
                type: Array | Object,
                required: true
            }
        },
        methods: {
            onItemClick(url) {
                window.location.href = url;
            }
        }
    }
</script>