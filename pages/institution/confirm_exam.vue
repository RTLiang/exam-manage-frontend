<template>
    <Banner />
    <br>
    <div class="exam-page">
        <h1 style="text-align: center;">核对信息后确认报考</h1>
        <el-row :gutter="24">
            <el-col :span="8">
                <div class="students-info">
                    <h3>请核对考生信息</h3>
                    <el-table :data="studentsData" border height=400 style="width: 100%">
                        <el-table-column prop="examineeName" label="姓名" width="80" />
                        <el-table-column prop="examineePhone" label="电话号码" width="120" />
                        <el-table-column prop="examineeIDNumber" label="身份证号码" />
                    </el-table>
                    <br>
                    <div v-if="!confirmed">
                        <el-button type="primary" class="button-confirm" @click="confirmInfo">确认信息无误</el-button>
                        <br>
                        <br>
                        <el-button type="danger" class="button-confirm"
                            @click="$router.push('/institution/select_individuals')">信息有误，重新选择考生</el-button>
                    </div>
                    <div v-else>
                        <p style="color:green">已确认信息</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="exam-info">
                    <h3>考试信息</h3>
                    <p>考试科目：{{ exam.examName }}</p>
                    <p>考试时间：{{ parseTime(exam.startExamTime) }}</p>
                    <p>截止报名时间：{{ parseTime(exam.endApplyTime) }}</p>
                    <p>报名人数：<b>{{ studentsData.length }}</b> 人</p>
                    <p>总计费用：<b>{{ exam.examPayment * studentsData.length }} </b> 人民币</p>
                </div>
                <div class="exam-location">
                    <h3>选择考点</h3>
                    <el-form :model="location">
                        <el-row :gutter="20">
                            <el-col :span="7.5">
                                <el-form-item label="市（州）级地区">
                                    <el-select v-model="location.city" placeholder="请选择市（州）级地区">
                                        <el-option v-for="city in cities" :key="city" :label="city" :value="city">
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
                                    <el-select v-model="location.id" placeholder="请选择考点名" :disabled="!location.district" @change="updateLocationName">
                                        <el-option v-for="(examCenter, index) in examCenters" :key="index" :label="examCenter.examCenterName" :value="examCenter.examCenterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <p>此考点剩余考位：{{ location.seats }}</p>
                        <el-form-item>
                            <el-button type="primary" :disabled="!confirmed" @click="showExamRules">确认报考</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
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
                <el-button type="primary" @click="confirmExam">
                    我已阅读并了解
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import api from '../../axios';
export default {
    data() {
        return {
            exam: {},
            location: {
                city: '',
                district: '',
                name: '',
                seats: 0,
                id: ''
            },
            cities: [],
            districts: [],
            examCenters: [],
            studentsData: [],
            confirmed: false,
            examRules: false
        }
    },
    watch: {
        'location.city'(newCity) {
            this.getDistrictsForCity(newCity);
        },
        'location.district'(newDistrict) {
            this.getExamPointsForDistrict(newDistrict);
        },
        'location.id'(newCenterid) {
            this.getSeatsForExamPoint(newCenterid);
        },
    },
    methods: {
        confirmInfo() {
            this.confirmed = true;
        },
        async Signup() {
            try {
                const response = await api.post('/eduApply/exam', {
                    examId: this.$route.query.examId,
                    userIdList: this.$route.query.userIdList,
                });
                this.studentsData = response.data.examinee;
                this.cities = response.data.cityNames;
                this.exam = response.data.exam;
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
        },
        showExamRules() {
            this.examRules = true;
        },
        async confirmExam() {
            try {
                await api.post('/eduApply/commit', {
                    userIdList: this.$route.query.userIdList,
                    examId: this.$route.query.examId,
                    centerId: this.location.id,
                    userId:this.$route.query.userId,
                });
                this.$router.push({
                    path: './checkout',
                    query: {
                        examId: this.$route.query.examId,
                        userIdList: this.$route.query.userIdList,
                        examCenterId: this.location.id
                    }
                });
            } catch (error) {
                console.error(error);
            }
        },
        async getDistrictsForCity(city) {
            try {
                const response = await api.get('/apply/districts', {
                    params: { examId: this.$route.query.examId, cityName: city }
                });
                this.districts = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getExamPointsForDistrict(district) {
            try {
                const response = await api.get('/apply/examCenter', {
                    params: { examId: this.$route.query.examId, districtName: district }
                });
                this.examCenters = response.data.examCenters;
            } catch (error) {
                console.error(error);
            }
        },
        async getSeatsForExamPoint(examCenterId) {
            try {
                const response = await api.get('/apply/remainNumber', {
                    params: { examId: this.$route.query.examId, centerId: examCenterId }
                });
                this.location.seats = response.data;
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
    },
    mounted() {
        this.Signup();
    }
};
</script>

<style scoped>
.exam-page {
    padding: 20px;
    margin: auto 3%;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.button-confirm {
    width: 100%;
    text-align: center;
}

.exam-location .el-select {
    width: 150px;
}

.students-info {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}

.exam-info {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    margin-bottom: 20px;
}

.exam-location {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}
</style>
