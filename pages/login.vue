<template>
    <ToolBar />
    <br>
    <div>
        <el-container class="form-container">
            <el-header>

                <h2>考生登录</h2>

            </el-header>
            <br>
            <el-main>
                <el-form :model="form" @submit.prevent="handleSubmit" label-width="240px">
                    <el-form-item label="考生身份证号/手机号/电子邮箱">
                        <el-input v-model="form.username" required></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" required></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>
                        <el-button @click="$router.push('/')">返回首页</el-button>
                    </el-form-item>
                    <hr>
                    <h3>没有账户？</h3>
                    <el-button @click="$router.push('/signup')">去注册</el-button>
                </el-form></el-main>
        </el-container>

    </div>

</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            event.preventDefault(); // prevent form submission
            console.log('Form submitted:', this.form);
            // your form submission logic here
        }
    }
}
</script>


<style>
.form-container {
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-container .el-input {
    width: 400px;
}
</style>