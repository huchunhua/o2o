<template>
    <div class="page-content">
        <div class="widget-item" v-for="(widgetItem,widgetIndex) in source" :key="widgetIndex">
            <component :ref="widgetItem.type" :is="widgetItem.type" :source="widgetItem.data"/>
        </div>
    </div>
</template>

<script>
    import widgets from '@/components/pageMaker/widget'
    export default {
        name: "page-maker",
        components: widgets,
        props: {
            source: {
                type: Array | Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>