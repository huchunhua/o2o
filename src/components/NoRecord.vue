<template>
    <div class="norecord">
        <div class="norecord-icon">
            <img :src="scenes[icon]"/>
        </div>
        <div class="norecord-label">
            {{label}}
        </div>
        <div class="norecord-label sublabel" v-if="sublabel">
            {{sublabel}}
        </div>
        <div class="norecord-action">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "no-record",
        props: {
            icon: {  // 必须提供字段
                required: true
            },
            label: {   // 可选字段，有默认值
                default: ''
            },
            sublabel: {   // 可选字段，有默认值
                default: ''
            }
        },
        data() {
            return {
                scenes: {
                    'empty': require('../assets/images/icon.data.empty.png'),
                }
            }
        }
    }
</script>

<style scoped>
    .norecord {
        text-align: center;
        padding: 5rem 0;
        position: absolute;
        width: 100%;
    }

    .norecord .norecord-icon img {
        width: 10rem;
    }

    .norecord .norecord-label {
        font-size: 1rem;
        padding: 1rem 0;
        color: #999;
    }

    .norecord .norecord-label.sublabel {
        padding: 0;
    }
</style>
