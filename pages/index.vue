<template>
    <Banner />
    <ToolBar />
    <NuxtPage />
    <br>
    <div class="carousel ">
        <el-carousel height="150px">
            <el-carousel-item v-for="item in imageData" :key="item.id">
                <img class="carousel-image" :src="item.url" alt="Carousel Image" style="max-width: 100%; max-height: 100%; height: auto; margin: 0 auto; display: block;"/>
            </el-carousel-item>
        </el-carousel>
    </div>
    <br>
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
    </div>

</template>


<script>
export default {
    data() {
        return {
            imageData: [
                { id: 1, url: 'https://ielts.neea.cn/project/ielts/v2/image/new-ad13.jpg' },
                { id: 2, url: 'https://ielts.neea.cn/project/ielts/v2/image/new-ad12.jpg' },
                { id: 3, url: 'https://ielts.neea.cn/project/ielts/v2/image/new-ad14.jpg' },
                { id: 4, url: 'https://ielts.neea.cn/project/ielts/v2/image/new-ad4.png' },
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
.lowerbox{
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