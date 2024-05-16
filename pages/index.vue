<template>
    <ToolBar />
    <NuxtPage />
    aaa
</template>



<script>
export default {
    components: {
        ToolBar: () => import('~/components/ToolBar.vue')
    }
}
</script>