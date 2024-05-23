<template>
    <br>
    <div class="info_page">
        <el-container>
            <el-header>
                <h2 v-if="type === 'individual'"> 考生 {{ name }} ，您已成功报名 {{ exam.examName }}</h2>
                <h2 v-else-if="type === 'edu'">机构 {{ name }} 已成功为 {{ studentNumber }} 人报考 {{ exam.examName }}</h2>
                <div class="print_prompt" style="font-size: 24px;">
                    请于 <b style="color: #0066CC;">{{ exam.endAppllyTime }}</b> 到 <b style=" color: #0066CC;">{{
                        exam.startExamTime }}</b> 打印准考证
                </div>
                <h3>
                    考试时间：{{ exam.startExamTime }} 到 {{ exam.exameEndTime }}
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
                <el-button v-if="type === 'individual'" size="large" @click="$router.push('/individual/special')"
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
        name: {
            
        },
        studentNumber: {
            type: Number,
            default: 1,
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
    mounted() {
        this.checkPrintAvailability();
    },
    methods: {
        checkPrintAvailability() {
            const currentTime = moment();
            const deadline = moment(this.exam.startExamTime); // parse deadline
            const examStartTime = moment(this.exam.endAppllyTime); // parse exam start time

            if (currentTime >= deadline && currentTime <= examStartTime) {
                this.isPrintAvaliable = true;
            } else {
                this.isPrintAvaliable = false;
            }
        },
        async fetchexaminfo() {
            const res = await api.get('/apply/pay', {
                params: {
                    examId: this.$route.query.examId,
                    userId: this.$route.query.userId,
                }
            });
            this.exam = res.data.exam;
            this.examinee = res.data.examinee;
        },
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
