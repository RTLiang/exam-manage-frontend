<template>
    <div class="exam-page">
      <div class="student-info">
        <h3>请核对考生信息</h3>
        <el-form :model="student" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="student.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="student.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="student.phone" readonly></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmInfo">确认信息无误</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="retryLogin">信息有误，重新登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="exam-info">
        <h3>考试信息</h3>
        <p>考试科目：{{ exam.subject }}</p>
        <p>考试时间：{{ exam.examTime }}</p>
        <p>截止报名时间：{{ exam.deadline }}</p>
        <p>考试费用：{{ exam.fee }} 人民币</p>
      </div>
      <div class="exam-location">
        <h3>选择考点</h3>
        <el-form :model="location" label-width="100px">
          <el-form-item label="市（州）级地区">
            <el-input v-model="location.city"></el-input>
          </el-form-item>
          <el-form-item label="区（县）级地区">
            <el-input v-model="location.district"></el-input>
          </el-form-item>
          <el-form-item label="考点名">
            <el-input v-model="location.name"></el-input>
          </el-form-item>
          <p>此考点剩余考位：{{ location.seats }}</p>
          <el-form-item>
            <el-button type="primary" @click="handleAction">{{ getButtonText(userStatus) }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        student: {
          name: '张三',
          id: '123456789012345678',
          phone: '13800138000'
        },
        exam: {
          subject: '科目三',
          examTime: '2024年5月1日 15:00-17:00',
          deadline: '2024年4月30日 23:00',
          fee: 648
        },
        location: {
          city: '',
          district: '',
          name: '',
          seats: 114514
        },
        userStatus: 'not_selected' // not_selected, selected, paid, printed, completed
      };
    },
    methods: {
      getButtonText(status) {
        switch (status) {
          case 'not_selected':
            return '选择科目';
          case 'selected':
            return '去缴费';
          case 'paid':
            return '打印准考证';
          case 'printed':
          case 'completed':
            return '查看报考信息';
          default:
            return '操作';
        }
      },
      handleAction() {
        switch (this.userStatus) {
          case 'not_selected':
            this.selectSubject();
            break;
          case 'selected':
            this.payForExam();
            break;
          case 'paid':
            this.printTicket();
            break;
          case 'printed':
          case 'completed':
            this.viewInfo();
            break;
          default:
            break;
        }
      },
      selectSubject() {
        this.$message({
          message: `选择了科目 ${this.exam.subject}`,
          type: 'info'
        });
        this.userStatus = 'selected';
      },
      payForExam() {
        this.$message({
          message: `去缴费 ${this.exam.subject}`,
          type: 'info'
        });
        this.userStatus = 'paid';
      },
      printTicket() {
        this.$message({
          message: `打印准考证 ${this.exam.subject}`,
          type: 'info'
        });
        this.userStatus = 'printed';
      },
      viewInfo() {
        this.$message({
          message: `查看 ${this.exam.subject} 的报名信息`,
          type: 'info'
        });
        this.userStatus = 'completed';
      },
      confirmInfo() {
        this.$message({
          message: '信息已确认无误',
          type: 'success'
        });
      },
      retryLogin() {
        this.$message({
          message: '请重新登录',
          type: 'warning'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .exam-page {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .student-info, .exam-info, .exam-location {
    width: 30%;
  }
  
  .student-info {
    background-color: #d7bdbd;
    padding: 20px;
    border-radius: 5px;
  }
  
  .exam-info {
    background-color: #80b3d1;
    padding: 20px;
    border-radius: 5px;
  }
  
  .exam-location {
    background-color: #a4d194;
    padding: 20px;
    border-radius: 5px;
  }
  </style>
  