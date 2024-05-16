<template>
    <ToolBar />
    <NuxtPage />
    <br>
    <div class="exam-procedure-box">
        <div class="exam-procedure">
            <b>考试报名流程</b>
            <br>
            <img src="https://resource.neea.edu.cn/project/CET/images/bz1.png" alt="考试流程">
            <!-- TODO：alt text write detailed content -->
        </div>
        <br>
        <div class="login-signup">
            <div class="button-container">
                <el-button class="login" @click="$router.push('/login')">登录</el-button>
                <el-button class="button" @click="$router.push('/signup')">注册新账户</el-button>
            </div>
        </div>
    </div>


</template>



<script>
export default {
    components: {
        ToolBar: () => import('~/components/ToolBar.vue')
    },
    methods: {
        Login() {
            // your login logic here
            console.log("Login button clicked!");
            // call API, authenticate user, etc.
        }
    }

}

</script>


<style>
.exam-procedure-box {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 15%;
}

.exam-procedure-box img {
    width: 100%;
    /* make the image width fit the parent container */
    height: auto;
    /* maintain the image's aspect ratio */
    display: block;
    /* remove any extra space below the image */
    margin: 0 auto;
    /* center the image horizontally */
}

.exam-procedure {
    font-size: 28pt;
    /* added font size */
    align-items: center;
    text-align: center;
    display: block;
    margin: 0 auto;
}

.login-signup {
    text-align: center;
    background-color: #333;
    height: 80px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.login-signup .el-button {
    font-size: 18px;
    padding: 12px 20px;
    height: 40px;
    width: 120px;
    margin: 0% 60px;
}
</style>