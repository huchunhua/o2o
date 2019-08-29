<template>
    <div class="WidgetL1R2-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <div class="widget-header" v-if="source.setting && source.setting.columnTitle != ''">
            <span>{{source.setting && source.setting.columnTitle != '' ? source.setting.columnTitle : '无标题'}}</span>
            <a v-if="source.setting && source.setting.moreUrl != ''" :href="source.setting && source.setting.moreUrl != '' ? source.setting.moreUrl : '#'">更多<van-icon name="arrow" /></a>
        </div>
        <van-grid :column-num="2">
            <van-grid-item>
                <img :src="source.upload[0].imageUrl" @click="onItemClick(source.upload[0].urlText)"/>
            </van-grid-item>
            <van-grid-item class="item-s2">
                <img :src="source.upload[1].imageUrl" @click="onItemClick(source.upload[1].urlText)"/>
                <img :src="source.upload[2].imageUrl" @click="onItemClick(source.upload[2].urlText)"/>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "WidgetL1R2",
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