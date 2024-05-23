<template>
  <Banner />
  <Admin />
  <Welcome :user="user" />

  <div class="function-list">
    <h2>管理列表</h2>
    <div class="function-cards">
      <el-row :gutter="20" justify="center">
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
          entryname: '新建考试',
          path: '/admin/exam_submit'
        },
        {
          entryname: '考点管理',
          path: '/admin/exam_center_manage',
        },
        {
          entryname: '个人账号管理',
          path: '/admin/individual_account',
        },
        {
          entryname: '机构账号管理',
          path: '/admin/institution_account',
        }, {
          entryname: '监考员管理',
          path: '/admin/examiner_manage'
        },
        {
          entryname: '特殊需求审核',
          path: '/admin/special_need_review'
        },
        {
          entryname: '违规情况管理',
          path:'/admin/illegal_manage'
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
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
}

.function-card {
  margin: 10px 0;
  text-align: center;
  max-width: 200px; /* Adjust this value as needed */
  width: 80%; /* This will make the card take up the full width of its container, up to the max-width */
}

.function-card h3 {
  margin-bottom: 10px;
}
</style>
