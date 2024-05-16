<template>
    <ToolBar />
    <el-container class="form-container">
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
          <el-button @click="returnHome">返回首页</el-button>
        </el-form-item>
      </el-form>
    </el-container>
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
        // Handle form submission logic
        console.log('Form submitted:', this.form);
      },
      returnHome() {
        // Navigate back to the home page
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
  