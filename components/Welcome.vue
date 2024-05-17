<template>
  <div class="welcome">
    <span class="welcome-text">{{ user.name }}考生，欢迎登录考试系统！</span>
    <el-button type="danger" plain class="logout-btn" @click="$router.push('/')">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "赖世文"
      }
    };
  }
}
</script>

<style scoped>
.welcome {
  background-color: #e3e2e2;
  /* grey background */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-text {
  font-size: 18px;
  color: #333;
}

.logout-btn {
  margin-left: auto;
}
</style>