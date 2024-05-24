<template>
  <Banner />
  <Admin />
  <br>
  <div class="exam-list-box">
    <br>
    <h2 style="text-align: center;">考试列表</h2>
    <div class="exam-list">
      <el-input v-model="searchQuery" placeholder="搜索" />
      <el-table :data="filteredExams" border style="width: 100%">
        <el-table-column fixed prop="exam_name" label="考试科目" />
        <el-table-column prop="start_register" label="开始报名时间" />
        <el-table-column prop="end_register" label="结束报名时间" />
        <el-table-column prop="start_exam" label="考试开始时间" />
        <el-table-column prop="end_exam" label="考试结束时间" />
        <el-table-column prop="exam_type" label="考试类型" />
        <el-table-column prop="fee" label="考试费用" />
        <!-- <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="extendRegistration(scope.row)">延长报考时间</el-button>
            <el-button link type="primary" size="small" @click="handleClick">查看违规信息</el-button> 
          </template>
        </el-table-column> -->

      </el-table>
    </div>
    <br>
  </div>
  <el-dialog v-model="extendRegistrationDialogVisible" title="延长报考时间">
    <el-date-picker v-model="newEndRegisterTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
      value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
    <template #footer>
      <el-button @click="extendRegistrationDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmExtendRegistration">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import api from "../../axios"

import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      searchQuery: '',
      exam_info: [],
      extendRegistrationDialogVisible: false,
      newEndRegisterTime: '',
      examToExtend: null,
    };
  },
  computed: {
    filteredExams() {
      const searchQuery = this.searchQuery.toLowerCase();
      return this.exam_info.filter(exam => {
        return (
          exam.exam_name.toLowerCase().includes(searchQuery) ||
          exam.start_register.toLowerCase().includes(searchQuery) ||
          exam.end_register.toLowerCase().includes(searchQuery) ||
          exam.start_exam.toLowerCase().includes(searchQuery) ||
          exam.end_exam.toLowerCase().includes(searchQuery) ||
          exam.exam_type.toLowerCase().includes(searchQuery) ||
          exam.fee.toString().includes(searchQuery)
        );
      });
    }
  },
  methods: {
    handleClick() {
      console.log('click');
    },
    extendRegistration(exam) {
      this.extendRegistrationDialogVisible = true;
      this.examToExtend = exam;
    },
    async confirmExtendRegistration() {
      const currentTime = new Date();
      const newEndTime = new Date(this.newEndRegisterTime);
      const startExamTime = new Date(this.examToExtend.start_exam);

      if (newEndTime < currentTime) {
        ElMessage.error("延长报考时间不能早于当前时间");
        return;
      }

      if (newEndTime >= startExamTime) {
        ElMessage.error("延长报考时间不能晚于考试开始时间");
        return;
      }

      this.extendRegistrationDialogVisible = false;

      // Call the API to update the endApplyTime of the exam
      await this.manageTime();
    },

    async manageTime() {
      try {
        const response = await api.post('/manage/update', {
          examid: this.examToExtend.examId,
          endApplyTime: this.newEndRegisterTime
        });
        // handle the response here
      } catch (error) {
        // handle the error here
      }
    },
    async fetchExams() {
      try {
        const response = await api.get('/manage/exam');
        this.exam_info = response.data.map(exam => ({
          exam_name: exam.examName,
          start_register: this.formatDate(exam.startApplyTime),
          end_register: this.formatDate(exam.endApplyTime),
          start_exam: this.formatDate(exam.startExamTime),
          end_exam: this.formatDate(exam.endExamTime),
          exam_type: exam.examForm,
          fee: exam.examPayment,
          exam_centers: [] // Assuming this data is missing from the API response
        }));
      } catch (error) {
        console.error('Failed to fetch exam data:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateString)
        .toLocaleDateString('zh-CN', options);
    }
  },
  created() {
    this.fetchExams();
  }
}
</script>

<style>
.exam-list {
  width: 95%;
  margin: 0 auto;
}

.exam-list-box {
  background-color: #f3f3f3;
  border-radius: 5px;
  width: 90%;
  margin: 0 auto;
}
</style>
