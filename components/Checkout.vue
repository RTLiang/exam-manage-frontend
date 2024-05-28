<template>
  <Banner />
  <br>
  <div class="exam_info_page">
    <h1 v-if="type === 'individual'" style="text-align: center;">考生缴费</h1>
    <h1 v-if="type === 'edu'" style="text-align: center;">机构缴费</h1>
    <el-row :gutter="20">
      <el-col :span="6">

        <div class="exam_info">
          <h2>考试信息</h2>
          <p v-if="type === 'individual'"><b>考生姓名：</b>{{ student.name }}</p>
          <p v-if="type === 'edu'"><b>考试人数：</b>{{ studentNumbers }}</p>
          <p><b>考试科目：</b>{{ exam.examName }}</p>
          <p><b>考试时间：</b>{{ formatTime(exam.startExamTime, exam.endExamTime) }}</p>
          <p><b>考试地点：</b>{{ exam.examcenterlocation }}</p>
        </div>


      </el-col>
      <el-col :span="18">
        <div class="exam_pay">
          <h2 style="text-align: center;">考试费用： {{ exam.examPayment * studentNumbers }} 人民币</h2>
          <h3 style="text-align: center;">请选择支付方式</h3>
          <el-divider />
          <el-image src="https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png" class="payment_methods_image"
            @click="handlePaymentMethodClick()" alt="支付宝" />
          <el-image src="https://wx.gtimg.com/pay_en/img/common/logo.svg" class="payment_methods_image"
            @click="handlePaymentMethodClick()" alt="微信支付" />
          <el-image src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" class="payment_methods_image"
            @click="handlePaymentMethodClick()" alt="VISA" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import api from '../axios';

import { useRouter } from 'vue-router';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    studentNumbers: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      student: {
        name: '',
        idNumber: '',
        phone: '',
      },
      exam: {
        examCenterId: '',
        centerName: '',
        cityName: '',
        districtName: '',
        examId: '',
        examName: '',
        startExamTime: '',
        endExamTime: '',
        examPayment: -1,
        examcenterlocation: '',
      },
      userId: '',
      userIdList: [],
    };
  },
  methods: {
    handlePaymentMethodClick() {
      ElMessage({
        message: `缴费成功！`,
        type: 'success',
      });
      setTimeout(() => {
        console.log('Redirecting to additional procedure page...');
        if (this.type === 'edu') {
          window.location.href = `./additional_procedure?examId=${this.exam.examId}&userId=${this.userId}&stuNumber=${this.studentNumbers}`;
        } else {
          window.location.href = `./additional_procedure?examId=${this.exam.examId}&userId=${this.userId}`;
        }
      }, 1000); // wait for 2 seconds before redirecting and reloading
    },
    async fetchexaminfo() {
      console.log("fetchexaminfo");
      const examId = this.$route.query.examId;
      var userId = this.$route.query.userId;
      const centerId = this.$route.query.centerId;
      try {
        if (this.type === 'edu') {
          userId = this.userIdList[0];
        }
        console.log(this.userIdList);
        console.log("userid"+userId);
        const res = await api.post(`/apply/exam?examId=${examId}&userId=${userId}&centerId=${centerId}`);
        console.log(res);
        const data = res.data;
        this.exam.examCenterId = data.examCenterId;
        this.exam.centerName = data.centerName;
        this.exam.cityName = data.cityName;
        this.exam.districtName = data.districtName;
        this.exam.examId = data.examId;
        this.exam.examName = data.examName;
        this.exam.startExamTime = data.startExamTime;
        this.exam.endExamTime = data.endExamTime;
        this.exam.examPayment = data.examPayment;
        this.exam.examcenterlocation = data.centerLocation;
        this.userId = data.userId;
        console.log("this.exam");
        console.log(this.exam);
      } catch (error) {
        console.log(error);
      };

      try {
        const res = await api.get(`/examinee/info?userId=${userId}`);
        const examinee = res.data.examinee;
        this.student.name = examinee.name;
        this.student.idNumber = examinee.IDNumber;
        this.student.phone = examinee.phone;
        console.log("============");
        console.log(res);
        console.log(this.student);
      } catch (error) {
        console.log(error);
      };
      console.log('Student Name:', this.student.name);
      console.log('Exam Name:', this.exam.examName);
      console.log('Start Time:', this.exam.startExamTime);
      console.log('End Time:', this.exam.endExamTime);
      console.log('Location:', this.exam.examcenterlocation);

    },
    formatTime(startTime, endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const year = start.getFullYear();
      const month = start.getMonth() + 1; // Months are 0-based in JavaScript
      const date = start.getDate();
      const startHour = start.getHours();
      const startMinute = start.getMinutes();
      const startSecond = start.getSeconds();

      const endHour = end.getHours();
      const endMinute = end.getMinutes();
      const endSecond = end.getSeconds();

      return `${year}年${month}月${date}日${startHour}:${startMinute}:${startSecond}到${endHour}:${endMinute}:${endSecond}`;
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.userIdList=this.$route.query.userIdList;
    this.fetchexaminfo();
    console.log();
  }
};
</script>

<style scoped>
.exam_info_page {
  padding: 20px;
  margin: auto 7%;
  background-color: rgb(221, 221, 221);
  border-radius: 5px;
}

.payment_methods_image {
  width: 200px;
  height: 60px;
  margin: 0 20px;
  cursor: pointer;
  background-color: #eaeaea;
  border-radius: 10px;
  border: none;
  padding: 6px 10px;
  display: inline-block;
}

.exam_pay {
  background-color: #a6d1e8;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.exam_info {
  background-color: #d7bdbd;
  border-radius: 5px;
  padding: 20px;
}
</style>