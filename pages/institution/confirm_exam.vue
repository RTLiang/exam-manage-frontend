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
                                    <el-select v-model="location.district" placeholder="请选择区（县）级地区">
                                        <el-option v-for="district in districts" :key="district" :label="district"
                                            :value="district">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="考点名">
                                    <el-select v-model="location.name" placeholder="请选择考点名">
                                        <el-option v-for="examPoint in examPoints" :key="examPoint" :label="examPoint"
                                            :value="examPoint">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <p>此考点剩余考位：{{ location.seats }}</p>
                        <el-form-item>
                            <el-button type="primary" :disabled="!confirmed" @click="Signup">确认报考</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '../../axios';
export default {
    data() {
        return {
            exam: {

            },
            location: {
                city: '',
                district: '',
                name: '',
                seats: 0,
            },
            cities: [],
            districts: [],
            examCenters: [],
            studentsData: [

            ],
            confirmed: false,
        }
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
        Signup() {
            api.post('/eduApply/exam', {
                examId: this.$route.query.examId,
                userIdList: this.$route.query.userIdList,  // Include the selected user IDs in the payload
            })
                .then(response => {
                    console.log(this.$route.query.userIdList);
                    this.studentsData = response.data.examinee;
                    this.cities = response.data.cityNames;
                    this.exam = response.data.exam;
                    console.log("response");
                    console.log(response);
                    console.log("this.studentsData");
                    console.log(this.studentsData);
                    console.log("this.cities");
                    console.log(this.cities);
                    console.log(this.exam);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        parseTime(timeString) {
            let dateTime = new Date(timeString);
            let year = dateTime.getFullYear();
            let month = dateTime.getMonth() + 1;
            let day = dateTime.getDate();
            let hour = dateTime.getHours();
            let minute = dateTime.getMinutes();

            return `${year}年${month}月${day}日${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
    },
    mounted() {
        // fetch data if necessary
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
