<template>
    <div class="WidgetSeriesB-main" :style="{
    marginTop:source.setting ? source.setting.marginTop+'px' : '5px',
    marginBottom:source.setting ? source.setting.marginBottom+'px' : '5px',
    paddingLeft: source.setting ? source.setting.marginLeft+'px' : '5px',
    paddingRight:source.setting ? source.setting.marginRight+'px' : '5px',
    backgroundColor:source.setting ? source.setting.columnBgColor : '#FFF'}">
        <div class="widget-header" v-if="source.setting && source.setting.columnTitle != ''">
            <span>{{source.setting && source.setting.columnTitle != '' ? source.setting.columnTitle : '无标题'}}</span>
            <a v-if="source.setting && source.setting.moreUrl != ''" :href="source.setting && source.setting.moreUrl != '' ? source.setting.moreUrl : '#'">更多<van-icon name="arrow" /></a>
        </div>
        <div class="seriesb-banner">
            <img :src="source.upload[0].imageUrl" @click="onItemClick(source.upload[0].urlText)"/>
        </div>
        <ul class="seriesb-ul">
            <li class="seriesb-item">
                <img :src="source.upload[1].imageUrl" @click="onItemClick(source.upload[1].urlText)"/>
            </li>
            <li class="seriesb-item">
                <img :src="source.upload[2].imageUrl" @click="onItemClick(source.upload[2].urlText)"/>
            </li>
            <li class="seriesb-item">
                <img :src="source.upload[3].imageUrl" @click="onItemClick(source.upload[3].urlText)"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "WidgetSeriesB",
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