<template>
  <Banner />
  <div>
    <Welcome :user="user" />
  </div>

  <div class="function-list">
    <h2>管理列表</h2>
    <div class="function-cards">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(entry, index) in entries" :key="index">
          <el-card class="function-card">
            <h3>{{ entry.entryname }}</h3>
            <el-button type="primary" @click="$router.push(entry.path)">进入</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "张金亮",
        usr_type: "admin"
      },
      entries: [
        {
          entryname: '考试管理',
          path: '/admin/exam_manage'
        },
        {
          entryname: '考点管理',
          path: '/',
        },
        {
          entryname: '账号管理',
          path: '/',
        },
        {
          entryname: '报表统计',
          path: '/',
        }
      ],
    }
  }
}
</script>

<style scoped>
.function-list {
  padding: 20px;
}

.function-list h2 {
  text-align: center;
  margin-bottom: 20px;
}

.function-cards {
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
  width: 70%;
  margin: 0 auto;
}

.function-card {
  margin: 10px 0;
  text-align: center;
}

.function-card h3 {
  margin-bottom: 10px;
}
</style>
