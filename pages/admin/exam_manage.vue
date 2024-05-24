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
      </el-table>
      <div style="text-align: center;">
        <br>
        <el-button type="primary" @click="newExamClick">添加考试</el-button>
      </div>
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
  <el-dialog v-model="isnewExam" title="新建考试">
    <div class="exam-submit">
      <el-form ref="examForm" :model="newExam" label-width="120px" style="max-width: 70%;">
        <el-form-item label="考试号码">
          <el-input v-model="newExam.examId" />
        </el-form-item>
        <el-form-item label="考试科目">
          <el-input v-model="newExam.examName" />
        </el-form-item>
        <el-form-item label="开始报名时间">
          <el-date-picker v-model="newExam.startApplyTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="截止报名时间">
          <el-date-picker v-model="newExam.endApplyTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="考试开始时间">
          <el-date-picker v-model="newExam.startExamTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="考试结束时间">
          <el-date-picker v-model="newExam.endExamTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
        </el-form-item>
        <el-form-item label="考试类型">
          <el-radio-group v-model="newExam.examForm">
            <el-radio value="SHENGKAO">省考</el-radio>
            <el-radio value="TONGKAO">统考</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="考试费用">
          <el-input v-model="newExam.examPayment" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirm">确认</el-button>
        </el-form-item>
      </el-form>
      <br>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import api from "../../axios";
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      searchQuery: '',
      exam_info: [],
      extendRegistrationDialogVisible: false,
      newEndRegisterTime: '',
      examToExtend: null,
      isnewExam: false,
      newExam: {
        examId: "",
        examForm: "",
        startApplyTime: "",
        endApplyTime: "",
        startExamTime: "",
        endExamTime: "",
        examPayment: 0,
        examName: "",
      },
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
      return new Date(dateString).toLocaleDateString('zh-CN', options);
    },
    newExamClick() {
      this.isnewExam = true;
      console.log('add exam');
    },
    formatDateTimeToISO(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
    async onConfirm() {
      // Format the datetime fields to ISO format
      this.newExam.startApplyTime = this.formatDateTimeToISO(this.newExam.startApplyTime);
      this.newExam.endApplyTime = this.formatDateTimeToISO(this.newExam.endApplyTime);
      this.newExam.startExamTime = this.formatDateTimeToISO(this.newExam.startExamTime);
      this.newExam.endExamTime = this.formatDateTimeToISO(this.newExam.endExamTime);

      try {
        const response = await api.post('/exam', this.newExam);
        ElMessage.success("考试添加成功！");
        this.isnewExam = false;
        this.fetchExams();
      } catch (error) {
        ElMessage.error("考试添加失败：" + error.message);
      }
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
