<template>
  <Banner />
  <div class="main_panel">
    <el-table border :data="examData" style="width: 100%">
      <el-table-column prop="subject" label="考试科目"></el-table-column>
      <el-table-column prop="startRegistration" label="开始报名时间">
        <template #default="{ row }">
          {{ formatDateTime(row.startRegistrationDate, row.startRegistrationTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endRegistration" label="截止报名时间">
        <template #default="{ row }">
          {{ formatDateTime(row.endRegistrationDate, row.endRegistrationTime) }}
          <el-button v-if="isExtendable(row)" size="mini" type="primary" plain @click="openDialog(row)">延长</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="startExam" label="考试开始时间">
        <template #default="{ row }">
          {{ formatDateTime(row.startExamDate, row.startExamTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endExam" label="考试结束时间">
        <template #default="{ row }">
          {{ formatDateTime(row.endExamDate, row.endExamTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="examType" label="考试类型"></el-table-column>
      <el-table-column label="考点信息">
        <template #default="{ row }">
          <ul>
            <li v-for="point in row.examPoints" :key="point.id">
              {{ point.location }} (容量: {{ point.capacity }})
            </li>
          </ul>
          <strong>总容量: {{ calculateTotalCapacity(row.examPoints) }}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="fee" label="考试费用"></el-table-column>
    </el-table>

    <el-dialog title="延长报名截止日期和时间" :model-value="dialogVisible" width="30%" @close="closeDialog">
      <el-date-picker v-model="newEndDate" type="date" placeholder="选择新的截止日期"
        :picker-options="pickerOptions"></el-date-picker>
      <el-time-picker v-model="newEndTime" type="time" placeholder="选择新的截止时间"></el-time-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExtend">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const examData = ref([
  {
    subject: '数学',
    startRegistrationDate: '2024-05-01',
    startRegistrationTime: '00:00',
    endRegistrationDate: '2024-06-01',
    endRegistrationTime: '23:59',
    startExamDate: '2024-06-15',
    startExamTime: '19:00',
    endExamDate: '2024-06-16',
    endExamTime: '21:00',
    examType: '笔试',
    examPoints: [
      { id: 1, location: '考点A', capacity: 50 },
      { id: 2, location: '考点B', capacity: 30 }
    ],
    fee: 200
  },
]);

const dialogVisible = ref(false);
const selectedExam = ref(null);
const newEndDate = ref(null);
const newEndTime = ref(null);


const pickerOptions = {
  disabledDate(time) {
    const startExamDate = selectedExam.value ? new Date(selectedExam.value.startExamDate + ' ' + selectedExam.value.startExamTime) : null;
    const endRegistrationDate = selectedExam.value ? moment(selectedExam.value.endRegistrationDate + ' ' + selectedExam.value.endRegistrationTime).toDate() : null;
    const endTime = selectedExam.value ? new Date(selectedExam.value.endRegistrationDate + ' ' + selectedExam.value.endRegistrationTime) : null;
    return (startExamDate && time.getTime() < startExamDate.getTime()) || (endRegistrationDate && time.getTime() > endRegistrationDate.getTime()) || (endTime && time.getTime() <= endTime.getTime());
  }
};

const openDialog = (exam) => {
  selectedExam.value = exam;
  newEndDate.value = null;
  newEndTime.value = null;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const confirmExtend = () => {
  if (newEndDate.value && newEndTime.value && selectedExam.value) {
    const newDate = new Date(newEndDate.value);
    const newTime = newEndTime.value;
    const endRegistrationDate = new Date(selectedExam.value.endRegistrationDate);
    const endRegistrationTime = selectedExam.value.endRegistrationTime;
    const startExamDate = new Date(selectedExam.value.startExamDate);
    const startExamTime = selectedExam.value.startExamTime;

    if (newDate > endRegistrationDate && newDate < startExamDate) {
      selectedExam.value.endRegistrationDate = newEndDate.value;
      selectedExam.value.endRegistrationTime = newEndTime.value;
      ElMessage.success('报名截止日期和时间已延长');
      dialogVisible.value = false;
    }
    else if (newDate == endRegistrationDate) {
      if (newTime > endRegistrationTime) {
        selectedExam.value.endRegistrationDate = newEndDate.value;
        selectedExam.value.endRegistrationTime = newEndTime.value;
        ElMessage.success('报名截止日期和时间已延长');
        dialogVisible.value = false;
      } else {
        ElMessage.error('请选择有效的截止时间');
      }
    }
    else if (newDate == startExamTime) {
      if (newTime < startExamTime) {
        selectedExam.value.endRegistrationDate = newEndDate.value;
        selectedExam.value.endRegistrationTime = newEndTime.value;
        ElMessage.success('报名截止日期和时间已延长');
        dialogVisible.value = false;
      } else {
        ElMessage.error('请选择有效的截止时间');
      }
    }
    else {
      ElMessage.error('请选择有效的截止日期');
    }
  } else {
    ElMessage.error('请选择新的截止日期和时间');
  }
}



const isExtendable = (exam) => {
  const currentDate = new Date();
  const startExamDate = new Date(exam.startExamDate + ' ' + exam.startExamTime);
  return currentDate < startExamDate;
};

const calculateTotalCapacity = (examPoints) => {
  return examPoints.reduce((total, point) => total + point.capacity, 0);
};

const formatDateTime = (date, time) => {
  const dateTime = new Date(`${date} ${time}`);
  return dateTime.toLocaleString();
};
</script>

<style scoped>
.main_panel {
  width: 80%;
  margin: 10px auto;
}

.el-button {
  margin-left: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
