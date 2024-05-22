<template>
    <div>
        <el-container class="form-container">
            <el-header>
                <h2 v-if="type === 'individual'">考生登录</h2>
                <h2 v-else-if="type === 'edu'">机构登录</h2>
                <h2 v-else-if="type === 'admin'">管理员登录</h2>
            </el-header>
            <br>
            <el-main>
                <el-form :model="form" @submit.prevent="handleSubmit" label-width="240px">

                    <!-- 个人登录 -->
                    <el-form-item v-if="type === 'individual'" label="考生身份证号/手机号/电子邮箱">
                        <el-input v-model="form.username" required></el-input>
                    </el-form-item>

                    <!-- 机构登录 -->
                    <el-form-item v-else-if="type === 'edu'" label="机构账号">
                        <el-input v-model="form.username" required></el-input>
                    </el-form-item>

                    <!-- 管理员登录 -->
                    <el-form-item v-else-if="type === 'admin'" label="管理员账号">
                        <el-input v-model="form.username" required></el-input>
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password" required></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" native-type="submit">登录</el-button>
                        <el-button @click="$router.push('/')">返回首页</el-button>

                    </el-form-item>

                    <div v-if="type === 'individual'">
                        <hr>
                        <h3>没有账户？</h3>
                        <el-button @click="$router.push('/signup')">去注册</el-button>
                    </div>
                </el-form>
            </el-main>
        </el-container>

    </div>

</template>

<script>
import api from '../axios'; // Import the Axios instance


export default {
    props: {
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const data = {
                    identifier: this.form.username,
                    password: this.form.password,
                    usertype: this.type.trim().toLowerCase()
                };

                const response = await api.post('/login', data);
                console.log(response);
                if (response.data.success) {
                    console.log('Login successful!    ' + response.data.userId);
                    // Redirect to dashboard or whatever
                    if (this.type === 'individual') {
                        this.$router.push({
                            path: '/individual/select_exam',
                            query: { userId: response.data.userId }
                        });
                    } else if (this.type === 'edu') {
                        this.$router.push({
                            path: '/institution/select_exam',
                            query: { userId: response.data.userId }
                        });
                    } else if (this.type === 'admin') {
                        this.$router.push({
                            path: '/admin/main',
                            query: { userId: response.data.userId }
                        });
                    }
                } else {
                    console.error('Login failed:', response.data.error);
                }
            } catch (error) {
                console.error('Error sending request:', error);
            }
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
</style>