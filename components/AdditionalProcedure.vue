<template>
    <br>
    <div class="info_page">
        <el-container>
            <el-header>
                <h2 v-if="type === 'individual'"> 考生 {{ this.examinee.examineeName }} ，您已成功报名 {{ exam.examName }}</h2>
                <h2 v-else-if="type === 'edu'">机构 {{ this.institution.name }} 已成功为 {{ studentNumber }} 人报考 {{
                    exam.examName }}</h2>
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

                <el-button v-if="type === 'individual'" size="large" type="primary" :disabled="!isPrintAvaliable"
                    @click="admissionTicket">准考证打印</el-button>
                <el-button size="large" type="danger" @click="$router.push('/')">安全退出</el-button>
                <!-- <el-button v-if="type === 'individual'" size="large" @click="tospecial" plain>特殊考生申请</el-button> -->
            </el-main>
            <br>
            <div style="text-align: center;">请发送邮件到 <a href="mailto: admin@example.com">admin@example.com</a> 以申请特殊考生
            </div>
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
        userid: {
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
            institution: {
                name: '',
                userId: '',
            },
            isPrintAvaliable: false,
        };
    },
    async mounted() {
        await this.fetchexaminfo();
        if (this.type === 'insititution') this.getinsititutionname();
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
            console.log("checked" + this.isPrintAvaliable);
        },
        async fetchexaminfo() {
            let res;
            if (this.type === 'individual') {
                res = await api.post(`/apply/pay?examId=${this.examid}&userId=${this.userid}`);
            } else {
                res = await api.post(`/apply/pay?examId=${this.examid}&userId=18`);
            }
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
        },
        async getinsititutionname() {
            const res = await api.get('/eduApply/examInfo', {
                params: {
                    userId: this.userid,
                }
            });
            if (res.data.organizationName) {
                this.institution.name = res.data.organizationName;
                console.log(this.institution.name);
            }
        },
        async admissionTicket() {
            try {
                const response = await api.get('/downloadAdmissionTicket', {
                    params: {
                        userId: this.userid,  // 替换为实际的userId
                        examId: this.examid   // 替换为实际的examId
                    },
                    responseType: 'blob' // 确保返回的是Blob对象
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'admission_ticket.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('下载失败', error);
            }
        },
    }
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
