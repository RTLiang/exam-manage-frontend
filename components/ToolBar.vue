<template>
<div class="banner">
    <h1>省考系统</h1>
    <p>省着点考</p>
</div>

<div class="tool-bar">
    <div class="button-container">
        <b>常驻功能区</b>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
    </div>
</div>

</template>
<style scoped>
.banner {
    background-color: #333;
    color: #fff;
    padding: 5px;
    text-align: center;
}


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