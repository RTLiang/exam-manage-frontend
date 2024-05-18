<template>
  <Banner />
  <br>
  <div class="exam-page">
    <h1 style="text-align: center;">核对信息后确认报考</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="student-info">
          <h3>请核对考生信息</h3>
          <el-form :model="student" label-width="90px">
            <el-form-item label="姓名">
              <el-input v-model="student.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="student.phone" readonly></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
              <el-input v-model="student.id" readonly></el-input>
            </el-form-item>


            <div v-if="!confirmed">
              <el-button type="primary" class="button-confirm" @click="confirmInfo">确认信息无误</el-button>
              <br>
              <br>
              <el-button type="danger" class="button-confirm" @click="$router.push('/login')">信息有误，重新登录</el-button>
            </div>
            <div v-else>
              <p style="color:green">已确认信息</p>
            </div>
          </el-form>
        </div>

      </el-col>
      <el-col :span="18">
        <div class="exam-info">
          <h3>考试信息</h3>
          <p>考试科目：{{ exam.subject }}</p>
          <p>考试时间：{{ exam.examTime }}</p>
          <p>截止报名时间：{{ exam.deadline }}</p>
          <p>考试费用：<b>{{ exam.fee }}</b> 人民币</p>
        </div>
        <div class="exam-location">
          <h3>选择考点</h3>
          <el-form :model="location">
            <el-row :gutter="20">
              <el-col :span="7.5">
                <el-form-item label="市（州）级地区">
                  <el-select v-model="location.city" placeholder="请选择市（州）级地区">
                    <el-option v-for="city in cities" :key="city.value" :label="city.label" :value="city.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7.5">
                <el-form-item label="区（县）级地区">
                  <el-select v-model="location.district" placeholder="请选择区（县）级地区">
                    <el-option v-for="district in districts" :key="district.value" :label="district.label"
                      :value="district.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="考点名">
                  <el-select v-model="location.name" placeholder="请选择考点名">
                    <el-option v-for="examPoint in examPoints" :key="examPoint.value" :label="examPoint.label"
                      :value="examPoint.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <p>此考点剩余考位：{{ location.seats }}</p>
            <el-form-item>
              <el-button type="primary" @click="showExamRules" :disabled="!confirmed">确认报考</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-col>
    </el-row>
    <!-- 考试须知 -->
    <el-dialog v-model="examRules" title="考试须知" width="500">
      <span>这是一条又臭又长的考试须知，现在的内容肯定要改，不过就先这样吧，点击“我已阅读并了解”。</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="examRules = false">
            我已阅读并了解
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">


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
      cities: [
        { value: 'city1', label: 'City 1' },
        { value: 'city2', label: 'City 2' },
        // ...
      ],
      districts: [
        { value: 'district1', label: 'District 1' },
        { value: 'district2', label: 'District 2' },
        // ...
      ],
      examPoints: [
        { value: 'examPoint1', label: 'Exam Point 1' },
        { value: 'examPoint2', label: 'Exam Point 2' },
        // ...
      ],
      confirmed: false,
      examRules: false,
    };
  },
  methods: {

    confirmInfo() {
      this.confirmed = true;
    },
    showExamRules() {
      this.examRules = true;
    },
  }
};
</script>


<style scoped>
.exam-page {
  padding: 20px;
  margin: auto 7%;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ccc;
  /* text-color */
}

.button-confirm {

  width: 100%;
  text-align: center;

}


.exam-location .el-select {
  width: 150px;
}

.student-info {
  background-color: #d7bdbd;
  padding: 20px;
  border-radius: 5px;
}

.exam-info,
.exam-location {
  background-color: #b4e0a3;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.exam-info {
  background-color: #80b3d1;
}
</style>
