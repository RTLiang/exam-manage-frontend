<template>
  <Banner />
  <br>
  <div class="exam-page">
    <h1 style="text-align: center;">核对信息后确认报考</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="student-info">
          <h3>请核对考生信息</h3>
          <el-form label-width="90px">
            <el-form-item label="姓名">
              <el-input v-model="examineeName" readonly></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="examineePhone" readonly></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
              <el-input v-model="examineeIDNumber" readonly></el-input>
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
          <p>考试科目：{{ examName }}</p>
          <p>考试时间：{{ moment(startExamTime).format('YYYY年M月D日HH:mm:ss') }}</p>
          <p>截止报名时间：{{ moment(endApplyTime).format('YYYY年M月D日HH:mm:ss') }}</p>
          <p>考试费用：<b>{{ examPayment }}</b> 人民币</p>
        </div>
        <div class="exam-location">
          <h3>选择考点</h3>
          <el-form :model="location">
            <el-row :gutter="20">
              <el-col :span="7.5">
                <el-form-item label="市（州）级地区">
                  <el-select v-model="location.city" placeholder="请选择市（州）级地区">
                    <el-option v-for="city in cityNames" :key="city" :label="city" :value="city">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7.5">
                <el-form-item label="区（县）级地区">
                  <el-select v-model="location.district" placeholder="请选择区（县）级地区" :disabled="!location.city">
                    <el-option v-for="district in districts" :key="district" :label="district" :value="district">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="考点名">
                  <el-select v-model="location.id" placeholder="请选择考点名" :disabled="!location.district"
                    @change="updateLocationName">
                    <el-option v-for="(examCenter, index) in examCenters" :key="index"
                      :label="examCenter.examCenterName" :value="examCenter.examCenterId">
                    </el-option>
                  </el-select>

                </el-form-item>
              </el-col>
            </el-row>
            <p>此考点剩余考位：{{ location.seats }}</p>
            <el-form-item>
              <el-button type="primary" @click="showExamRules" :disabled="!confirmed&&location.seats>0">确认报考</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-col>
    </el-row>
    <!-- 考试须知 -->
    <el-dialog v-model="examRules" title="考试须知" width="500">
      <div>
        <h4>考试须知：</h4>
        <ul>
          <li>请务必准时参加考试。</li>
          <li>考试过程中请保持安静，不要交头接耳。</li>
          <li>禁止携带任何通讯工具进入考场。</li>
          <li>考试结束后，请将试卷和答题卡交给监考人员。</li>
          <li>违反考场纪律的行为将被取消考试资格。</li>
        </ul>
        <p>点击“我已阅读并了解”按钮确认。</p>
      </div>
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
import api from '../../axios'; // Import the Axios instance
import moment from 'moment';

export default {


  data() {
    return {
      info: {
        params: {
          examId: this.$route.query.examId,
          userId: this.$route.query.userId,
        }
      },
      moment: moment,
      endApplyTime: "",
      examineeIDNumber: "",
      examineePhone: "",
      examName: "",
      examineeName: "",
      endExamTime: "",
      startExamTime: "",
      examPayment: -1,
      location: {
        city: '',
        district: '',
        name: '',
        seats: 0,
        id: ''
      },
      cityNames: [
      ],
      districts: [
      ] as Array<string>,
      examCenters: [
      ] as Array<{ examCenterId: string, examCenterName: string, regionId: string, examCenterLocation: string }>,
      confirmed: false,
      examRules: false,
    };
  },
  watch: {
    'location.city'(newCity) {
      // Update districts based on the selected city
      this.districts = this.getDistrictsForCity(newCity);
    },
    'location.district'(newDistrict) {
      // Update examPoints based on the selected district
      this.examCenters = this.getExamPointsForDistrict(newDistrict);
    },
    'location.id'(newCenterid) {
      // Update the number of seats available
      this.location.seats = this.getSeatsForExamPoint(newCenterid);
    },
  },
  methods: {

    confirmInfo() {
      this.confirmed = true;
    },
    showExamRules() {
      this.examRules = true;
    },
    async getDistrictsForCity(city: string) {
      // Implement this method to return the districts for the given city
      const data = {
        params: {
          examId: this.info.params.examId, // replace this with actual examId
          cityName: city
        }
        // examId: this.info.params.examId, // replace this with actual examId
        // cityName: city
      };
      console.log(data);
      try {
        const response = await api.get('/apply/districts', data);
        console.log(response.data);
        this.districts = response.data;
        console.log(this.districts);
      }
      catch (error) {
        console.error(error);
        // handle error
      }

    },
    async getExamPointsForDistrict(district: string) {
      console.log(district);
      const data = {
        params: {
          examId: this.info.params.examId, // replace this with actual examId
          districtName: district
        }
      };
      try {
        const response = await api.get('/apply/examCenter', data);
        // replace '/apply/examPoints' with your actual endpoint
        console.log(response.data);
        this.examCenters = response.data.examCenters;
        console.log(this.examCenters[0]);
      }
      catch (error) {
        console.error(error);
        // handle error
      }
    },
    async getSeatsForExamPoint(examCenterId: string) {
      const data = {
        params: {
          examId: this.info.params.examId, // replace this with actual examId
          centerId: examCenterId
        }
      };
      try {
        const response = await api.get('/apply/remainNumber', data);
        // replace '/apply/seats' with your actual endpoint
        console.log(response.data);
        this.location.seats = response.data;
        console.log(this.location.seats);
      }
      catch (error) {
        console.error(error);
        // handle error
      }
    },
    // async fetchExamloc(userId) {
    //   // Make API call to fetch exams for the given user ID
    //   api.get(`/apply//${userId}`)
    //     .then(response => {
    //       // this.examInfo = response.data.examInfoList;
    //       this.examineeName = response.data.examineeName;
    //       // 打印调试信息
    //       // console.log(response.data);
    //       // console.log(this.examInfo[0].endApplyTime);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },
    async fetchExams() {
      // Make API call to fetch exams for the given user ID
      try {
        console.log(this.info);
        const response = await api.get('/apply/info', this.info);
        if (response.data.endApplyTime) {
          this.endApplyTime = response.data.endApplyTime;
          this.examineeIDNumber = response.data.examineeIDNumber;
          this.examineePhone = response.data.examineePhone;
          this.examName = response.data.examName;
          this.examineeName = response.data.examineeName;
          this.endExamTime = response.data.endExamTime;
          this.startExamTime = response.data.startExamTime;
          this.examPayment = response.data.examPayment;
          this.cityNames = response.data.cityNames;
          // console.log(this.cityNames);
          this.districts = response.data.districts;
          this.examCenters = response.data.examCenters;
        } else {
          console.error('Failed to fetch exam info:', response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateLocationName(value) {
      const selectedExamCenter = this.examCenters.find(examCenter => examCenter.examCenterId === value);
      if (selectedExamCenter) {
        this.location.name = selectedExamCenter.examCenterName;
      }
    },
  }, mounted() {
    this.fetchExams();
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
