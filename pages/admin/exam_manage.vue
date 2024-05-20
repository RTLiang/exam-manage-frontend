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
        <el-table-column label="考试人数">
          <template #default="scope">
            {{ scope.row.exam_centers.reduce((acc, center) => acc + center.number, 0) }}
          </template>
        </el-table-column>

        <el-table-column label="考点信息" width="fit-content">
          <template #default="scope">
            <div v-for="(center, index) in scope.row.exam_centers" :key="index">
              {{ center.center }} ({{ center.number }})
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="extendRegistration(scope.row)">延长报考时间</el-button>
            <el-button link type="primary" size="small" @click="handleClick">查看违规信息</el-button>
          </template>
        </el-table-column>
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
export default {
  data() {
    return {
      searchQuery: '',
      exam_info: [
        {
          exam_name: "Mathematics",
          start_register: "2022-01-01 09:00:00",
          end_register: "2022-01-10 18:00:00",
          start_exam: "2022-01-15 09:00:00",
          end_exam: "2022-01-15 11:00:00",
          exam_type: "Written",
          exam_centers: [
            { center: "Room 101", number: 20 },
            { center: "Room 102", number: 30 },
          ],
          fee: 50.0,
        },
        {
          exam_name: "Science",
          start_register: "2022-02-01 09:00:00",
          end_register: "2022-02-10 18:00:00",
          start_exam: "2022-02-15 09:00:00",
          end_exam: "2022-02-15 11:00:00",
          exam_type: "Practical",
          exam_centers: [
            { center: "Room 202", number: 20 },
            { center: "Room 203", number: 10 },
          ],
          fee: 30.0,
        },
        {
          exam_name: "English",
          start_register: "2022-03-01 09:00:00",
          end_register: "2022-03-10 18:00:00",
          start_exam: "2022-03-15 09:00:00",
          end_exam: "2022-03-15 11:00:00",
          exam_type: "Oral",
          exam_centers: [
            { center: "Room 303", number: 15 },
            { center: "Room 304", number: 10 },
          ],
          fee: 20.0,
        },
        // Add more data as needed...
      ],
      extendRegistrationDialogVisible: false,
      newEndRegisterTime: '',
      examToExtend: null, // <--- Add this
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
    confirmExtendRegistration() {
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

      this.examToExtend.end_register = this.newEndRegisterTime;
      this.extendRegistrationDialogVisible = false;
      this.newEndRegisterTime = '';
    },
  },
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