<template>
    <div class="WidgetNavigation-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <van-grid :column-num="4">
            <van-grid-item v-for="(item,index) in source.upload" :key="index" :text="item.urlTitle" @click="onItemClick(item.urlText)">
                <img slot="icon" :src="item.imageUrl"/>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "WidgetNavigation",
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