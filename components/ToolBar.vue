<template>
    <div class="tool-bar">
        <div class="button-container">
            <!-- <b>常驻功能区</b> -->
            <el-button @click="$router.push('/')" plain>主页</el-button>
            <el-button plain></el-button>
            <el-button @click="$router.push('/institution_login')" plain> 机构入口 </el-button>
            <el-button @click="$router.push('/admin')" plain>管理员入口</el-button>
        </div>
    </div>

</template>
<style scoped>

.tool-bar {
    background-color: #f0f0f0;

    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-container {
    max-width: 80%;
    /* Take up 70% of the screen width */
    margin: 0 auto;
    /* Center horizontally */
}
</style>