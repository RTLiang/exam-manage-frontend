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
                        <el-button type="primary" @click="handleButtonClick(examInfo[index])">{{
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
import api from '../../axios'; // Import the Axios instance
export default {
    data() {
        return {

            examineeName: '',
            user: {},
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
        async handleButtonClick(info) {


            switch (info.status) {
                case 'not_selected':
                    // console.log(this.user);
                    try {
                        const data = {
                            params: {
                                examId: info.examId,
                                userId: this.user.user_id
                            }
                        };
                        console.log(data);
                        console.log("================================");
                        const response = await api.get('/apply/info', data);
                        if (response.data.endApplyTime) {
                            this.$router.push({
                                path: './confirm_exam',
                                query: {
                                    examId: response.data.examId,
                                    userId: this.$route.query.userId,
                                }
                            });
                        } else {
                            console.error('Failed to fetch exam info:', response.data.error);
                        }
                        // this.selectSubject(info);
                        // this.$router.push({
                        //     path: './confirm_exam',
                        //     query: {
                        //         examId: info.examId,
                        //         userId: this.$route.query.userId
                        //     }
                        // });
                    } catch (error) {
                        console.error(error);
                    }
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
            // // 更新状态逻辑
            // subject.status = 'selected';
            // // console.log("===========================");
            // // Make API call to update the subject status
            // api.post(`/examinee/select_subject/${subject.examId}`, { status: 'selected' })
            //     .then(response => {
            //         // Handle the response
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
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
                    this.user = response.data.userInfoList;
                    // 打印调试信息
                    console.log(this.user);
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
    // computed: {


    // },
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
