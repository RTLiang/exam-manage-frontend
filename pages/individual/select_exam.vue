<template>
    <Banner />
    <Welcome :user="user" />

    <div class="exam-list">
        <h2>考试列表</h2>
        <div class="exam-cards">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(exams, index) in examInfo" :key="index">
                    <el-card>
                        <h3>考试科目：{{ examInfo[index].examName }}</h3>
                        <h4>考试时间 :</h4>
                        <p> {{ moment(examInfo[index].startExamTime).format('YYYY年M月D日HH:mm:ss') }}</p>到<p>{{
                            moment(examInfo[index].endExamTime).format('YYYY年M月D日HH:mm:ss') }}</p>
                        <h4>报名截止时间:</h4>
                        <p> {{ moment(examInfo[index].endApplyTime).format('YYYY年M月D日HH:mm:ss') }}</p>
                        <el-button type="primary" @click="handleButtonClick(subject)">{{
                            getButtonText(examInfo[index].status)
                        }}
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import api from '../axios'; // Import the Axios instance
import { useRouter } from 'vue-router';
export default {
    data() {
        return {

            examineeName: '',
            // user: {
            //     name: this.examineeName,
            //     usr_type: "individual",
            // },
            examInfo: [],
            moment: moment,
        }
    },
    methods: {
        getButtonText(status) {
            switch (status) {
                case 'not_selected':
                    return '选择科目';
                case 'selected':
                    return '去缴费';
                case 'completed':
                    return '查看报考信息';
                default:
                    return '操作';
            }
        },
        handleButtonClick(subject) {
            switch (subject.status) {
                case 'not_selected':
                    this.selectSubject(subject);
                    this.$router.push('./confirm_exam');
                    break;
                case 'selected':
                    this.payForSubject(subject);
                    this.$router.push('./checkout');
                    break;
                case 'completed':
                    this.viewExamInfo(subject);
                    this.$router.push('./additional_procedure');
                    break;
                default:
                    break;
            }
        },
        selectSubject(subject) {
            // 更新状态逻辑
            subject.status = 'selected';
        },
        payForSubject(subject) {
            // 更新状态逻辑
            subject.status = 'paid';
        },
        viewExamInfo(subject) {

            // 更新状态逻辑
            subject.status = 'completed';
        },
        async fetchExams(userId) {
            // Make API call to fetch exams for the given user ID
            api.get(`/examinee/exam/${userId}`)
                .then(response => {
                    this.examInfo = response.data.examInfoList;
                    this.examineeName = response.data.examineeName;
                    // 打印调试信息
                    // console.log(response.data);
                    // console.log(this.examInfo[0].endApplyTime);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        const userId = this.$route.query.userId;
        this.fetchExams(userId);
    },
    computed: {
        user() {
            return {
                name: this.examineeName,
                usr_type: "individual",
            }
        }


    },
};
</script>
<style scoped>
.exam-list {
    padding: 20px;
}

.exam-list h2 {
    text-align: center;
    margin-bottom: 20px;
}

.exam-cards {
    background-color: #f3f3f3;
    border-radius: 5px;
}

.el-card {
    margin: 20px 20px;
    text-align: center;
}

.el-card h3 {
    margin-bottom: 10px;
}
</style>
