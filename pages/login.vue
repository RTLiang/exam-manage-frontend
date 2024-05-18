<template>
    <Banner />
    <ToolBar />
    <br>
    <LoginForm :type="type" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const type = ref('individual')


</script>


<style></style>