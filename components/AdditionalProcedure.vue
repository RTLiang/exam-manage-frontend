<template>
    <br>
    <div class="info_page">
        <el-container>
            <el-header>
                <h2 v-if="type === 'individual'"> 考生 {{ this.examinee.examineeName }} ，您已成功报名 {{ exam.examName }}</h2>
                <h2 v-else-if="type === 'edu'">机构 {{ name }} 已成功为 {{ studentNumber }} 人报考 {{ exam.examName }}</h2>
                <div class="print_prompt" style="font-size: 24px;">
                    请于 <b style="color: #0066CC;">{{ parseTime(exam.endAppllyTime) }}</b> 到 <b
                        style=" color: #0066CC;">{{ parseTime(exam.startExamTime) }}</b> 打印准考证
                </div>
                <h3>
                    考试时间：{{ parseTime(exam.startExamTime) }} 
                </h3>
                <hr>
            </el-header>
            <br>
            <br>
            <br>
            <br>
            <br>
            <el-main>

                <el-button size="large" type="primary" :disabled="!isPrintAvaliable">准考证打印</el-button>
                <el-button size="large" type="danger" @click="$router.push('/')">安全退出</el-button>
                <el-button v-if="type === 'individual'" size="large"
                    @click="tospecial"
                    plain>特殊考生申请</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn'; // for Chinese locale
import api from '../axios';

export default {
    props: {
        type: {
            type: String,
            required: true
        },
        studentNumber: {
            type: Number,
            default: 1,
        },
        examid: {
            type: String,
            required: true
        },
        userid:{
            type: String,
            required: true
        }
    },
    data() {
        return {
            exam: {
                examName: '',
                startExamTime: '',
                endAppllyTime: '',
                examId: '',
            },
            examinee: {
                examineeName: '',
                userId: '',
            },
            isPrintAvaliable: false,
        };
    },
   async mounted() {
        await  this.fetchexaminfo();
        this.checkPrintAvailability();
        
    },
    methods: {
        checkPrintAvailability() {
            const currentTime = moment();
            const deadline = moment(this.exam.endAppllyTime);
            const examStartTime = moment(this.exam.startExamTime);

            if (currentTime.isSameOrAfter(deadline) && currentTime.isSameOrBefore(examStartTime)) {
                this.isPrintAvaliable = true;
            } else {
                this.isPrintAvaliable = false;
            }
            console.log("checked"+this.isPrintAvaliable);
        },
        async fetchexaminfo() {
            const res = await api.post(`/apply/pay?examId=${this.examid}&userId=${this.$route.query.userId}`);
            console.log(res);
            if (res.data.exam) {
                this.exam.examName = res.data.exam.examName;
                this.exam.startExamTime = res.data.exam.startExamTime;
                this.exam.endAppllyTime = res.data.exam.endAppllyTime;
                this.exam.examId = res.data.exam.examId;
                this.examinee.userId = res.data.examinee.userId;
                this.examinee.examineeName = res.data.examinee.examineeName;
                this.checkPrintAvailability();

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
        tospecial() {
            this.$router.push({
                path: './special',
                query: {
                    userId: this.examinee.userId,
                    examId: this.exam.examId,
                }
            });
        }
    },
};

</script>

<style scoped>
.info_page {
    padding: 20px;
    margin: auto 7%;
    background-color: rgb(221, 221, 221);
    border-radius: 5px;
}

.el-header {
    text-align: center;
}

.print_prompt {
    font-size: 24px;
}

.el-main {
    text-align: center;
}

.el-main .el-button {
    margin: 0 30px;
}
</style>
