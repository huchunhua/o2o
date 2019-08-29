<template>
    <div class="WidgetBanner-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <div class="widget-header" v-if="source.setting && source.setting.columnTitle != ''">
            <span>{{source.setting && source.setting.columnTitle != '' ? source.setting.columnTitle : '无标题'}}</span>
            <a v-if="source.setting && source.setting.moreUrl != ''" :href="source.setting && source.setting.moreUrl != '' ? source.setting.moreUrl : '#'">更多<van-icon name="arrow" /></a>
        </div>
        <img :src="source.upload[0].imageUrl" width="100%" @click="onItemClick(source.upload[0].urlText)"/>
    </div>
</template>

<script>
    export default {
        name: "WidgetBanner",
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