<template>
    <div class="download-index">
    </div>
</template>

<script>
    export default {
        name: "download",
        created() {
            if(this.$utoo.env.isAndroid()) {
                window.location.href = 'https://www.pgyer.com/V3kt';
            }
            if(this.$utoo.env.isIOS()) {
                window.location.href = 'https://www.pgyer.com/VOxJ';
            }
        }
    }
</script>