<template>
    <Banner />
    <ToolBar />
    <NuxtPage />
    <br>
    <div class="carousel " >
        <el-carousel height="70px" arrow="never">
            <el-carousel-item v-for="item in imageData" :key="item.id">
                <div class="carousel-text" style="text-align: center;font-size: larger;">
                    {{ item.text }}
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
    <!-- <br> -->
    <div class="lowerbox">
        <br>
        <div class="exam-procedure-box">

            <div class="exam-procedure">
                <h2>考试报名流程</h2>
                <br>
                <img src="./assets/exam_procedure.png" alt="考试流程">
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
        <br>
        <br>
        <br>
        <div class="imgbox" style="text-align: center;">
            <img src="http://hrss.shandong.gov.cn/resource/rsks/201811/299450e5-10d8-4f6c-a564-67cc59c5c397.jpg">
            <img src="http://hrss.shandong.gov.cn/resource/rsks/201811/3273c3a8-446a-40ec-9ebd-0d85a8774d4c.gif">
            <img src="http://hrss.shandong.gov.cn/resource/rsks/201811/01280c11-837f-4386-b193-93bae4adde17.gif">
            <img src="http://hrss.shandong.gov.cn/resource/rsks/202004/54c21699-d713-4257-b043-a29d4f64126c.jpg">
            <img src="http://hrss.shandong.gov.cn/resource/rsks/201811/cd062018-16c3-4285-84e0-24803a5fe46d.gif">

        </div>
    </div>


</template>


<script>
export default {
    data() {
        return {
            imageData: [
                { id: 1, text: '2024年考试录用公务员公告' },
                { id: 2, text: '关于调整省属事业单位初级综合类岗位公开招聘笔试科目的公告' },
                { id: 3, text: '人力资源和社会保障部人事考试中心2024年公开招聘工作公告' },
                { id: 4, text: '2024年考试录用公务员（含选调生）笔试成绩查询 ' },
            ],
        }
    },
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
.carousel {
    margin: 0 15%;
}

.lowerbox {
    background-color: #ebeff0;
}

.exam-procedure-box {
    background-color: white;
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