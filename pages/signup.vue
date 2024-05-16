<template>
    <ToolBar />
    <br>
    <div>
        <el-container class="form-container">
            <el-header>

                <h2>填写注册信息</h2>
                <hr>

            </el-header>
            <br>
            <el-main>
                <el-form :model="form" @submit.prevent="handleSubmit" label-width="120px">
                    <el-form-item label="考生姓名">
                        <el-input v-model="form.name" required></el-input>
                    </el-form-item>
                    <el-form-item label="考生身份证号">
                        <el-input v-model="form.idNumber" required></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone" required></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.email" required></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" required></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="form.confirmPassword" required></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit">提交</el-button>
                        <el-button @click="$router.push('/')">返回首页</el-button>
                    </el-form-item>
                </el-form></el-main>
        </el-container>

    </div>

</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                idNumber: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            if (!this.validateForm()) {
                return; // prevent form submission if passwords don't match
            }
            // If passwords match, continue with form submission or other logic
            console.log('Form submitted:', this.form);
            // Add your form submission logic here
        },
        validateForm() {
            if (this.form.password !== this.form.confirmPassword) {
                alert('两次输入的密码不一致，请重新输入！')
                return false
            }
            return true
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