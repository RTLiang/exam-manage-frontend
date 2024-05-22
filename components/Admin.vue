<template>
    <div class="tool-bar">
        
        <div class="button-container">
            <!-- <b>常驻功能区</b> -->
            <el-button @click="$router.push('/admin/main')" plain>管理员主页</el-button>
            <el-button @click="$router.push('/admin/exam_manage')" plain> 考试管理 </el-button>
            <el-button @click="$router.push('/admin/exam_submit')" plain> 新建考试 </el-button>
            <el-button @click="$router.push('/admin/exam_center_manage')" plain>管理考点</el-button>
            <el-button @click="$router.push('/admin/individual_account')" plain>个人账号管理</el-button>
            <el-button @click="$router.push('/admin/institution_account')" plain>机构账号管理</el-button>
            <el-button @click="$router.push('/admin/examiner_manage')" plain>监考员管理</el-button>

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