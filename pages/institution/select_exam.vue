<template>
  <Banner />
  <Welcome :user="user" />




  <div class="exam-list">
    <h2>考试列表</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(subject, index) in subjects" :key="index">
        <el-card>
          <h3>{{ subject.examName }}</h3>
          <p>考试时间: {{ parseTime(subject.startExamTime) }}</p>
          <p>报名截止时间: {{ parseTime(subject.endApplyTime) }}</p>
          <el-button type="primary" @click="gotoSignup(subject)">选择科目</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>




</template>





<script>
import api from '../../axios';

export default {
  data() {
    return {
      user: {
        id: '', name: '', user_type: 'edu',
      },

      subjects: [],
    }
  },

  mounted() {
    this.user.id = this.$route.query.userId;
    this.fetchExamInfo();
  },
  methods: {
    async fetchExamInfo() {
      try {
        console.log(this.user.id);
        const response = await api.get(`/eduApply/examInfo?userId=${this.user.id}`);
        this.subjects = response.data.examInfoList;
        console.log(response.data.examInfoList);
        this.user.name = response.data.organizationName;
        console.log(response);
        this.user.user_type = 'edu';
        this.user.id = response.data.userId;
        console.log(this.user);
        console.log(this.subjects)
      } catch (error) {
        console.error(error);
      }
    },
    parseTime(timeString) {
      let dateTime = new Date(timeString);
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1;
      let day = dateTime.getDate();
      let hour = dateTime.getHours();
      let minute = dateTime.getMinutes();

      return `${year}年${month}月${day}日${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }, gotoSignup(subject) {
      this.$router.push({
        path: '/institution/select_individuals', query: { userId: this.user.id, examId: subject.examId }
      });
    }
  }

}

</script>
<style scoped>
.exam-list {
  padding: 20px;
}

.exam-list h2 {
  text-align: center;
  margin-bottom: 20px;
}

.el-card {
  text-align: center;
}

.el-card h3 {
  margin-bottom: 10px;
}
</style>