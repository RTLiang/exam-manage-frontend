<template>
    <Banner />
    <br>
    <div class="special_need_page">
        <h1 style="text-align: center;">特殊考生需求</h1>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="exam_info">
                    <h2>考试信息</h2>
                    <p v-if="type === 'individual'"><b>考生姓名：</b>{{ student.name }}</p>
                    <p v-if="type === 'edu'"><b>考试人数：</b>{{ studentNumbers }}</p>
                    <p><b>考试科目：</b>{{ exam.examName }}</p>
                    <p><b>考试时间：</b>{{ formatTime(exam.startExamTime) }}</p>
                    <p><b>考试地点：</b>{{ exam.centerName }}</p>
                </div>


            </el-col>
            <el-col :span="18">
                <div class="special_need">
                    <h3>请填写特殊考生需求</h3>
                    <el-input v-model="input" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
                        style="max-width: 600px" />
                    <div style="text-align: center; margin-top: 10px">
                        <el-button type="primary" @click="submit_need">提交</el-button>
                    </div>
                </div>

            </el-col>
        </el-row>

    </div>
</template>



<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

var input = ref('')
var message = ref('')
var messageType = ref('')

const succesful_message = () => {
    ElMessage({
        message: '提交成功，正在返回主页',
        type: 'success',
    })
}

const submit_need = async () => {
    if (input.value) {
        try {
            // Send input to backend
            // For demonstration purposes, we'll assume the input is sent successfully
            message.value = '提交成功'
            messageType.value = 'success'
            succesful_message()
            setTimeout(() => {
                router.push('/')
            }, 2000)
        } catch (error) {
            message.value = 'Error submitting need'
            messageType.value = 'error'
        }
    }
    else {
        ElMessage.error('请填写特殊考生需求')
    }
}
</script>


<script>
import api from '../../axios';

export default {
    data() {
        return {
            examinee: {
                userId: '',
            },
            exam: {
                examName: '',
                startExamTime: '',
                endAppllyTime: '',
                examId: '',
                centerName: '',
            },
            examExamineeNumber: '',
            input: '',
        };
    },
    methods: {
        async fetchinfo() {
            {
                const examId = this.$route.query.examId;
                const userId = this.$route.query.userId;

                const res = await api.get(`/apply/necessary?examId=${examId}&userId=${userId}`);
                console.log("=============res================");
                console.log(res);
                if (res.data.exam) {
                    this.exam.examName = res.data.exam.name;
                    this.exam.startExamTime = res.data.exam.startExamTime;
                    this.exam.endAppllyTime = res.data.exam.endAppllyTime;
                    this.exam.centerName = res.data.examCenter.centerName;
                    this.examinee.userId = res.data.userId;
                    this.examExamineeNumber = res.data.examExamineeNumber;
                    console.log(this.exam);
                    console.log(this.examinee);
                }


            }
        },
        formatTime(startTime) {
            const start = new Date(startTime);
            const year = start.getFullYear();
            const month = start.getMonth() + 1; // Months are 0-based in JavaScript
            const date = start.getDate();
            const startHour = start.getHours();
            const startMinute = start.getMinutes();
            const startSecond = start.getSeconds();
            return `${year}年${month}月${date}日${startHour}:${startMinute}:${startSecond}`;
        },
        async submit_need() {
            console.log('submit need');
            if (input.value) {
                try {
                    const res = await api.get(`/apply/necessary?examExamineeNum=${this.examExamineeNumber}&demand=${this.input}`);
                    console.log(res);
                    message.value = '提交成功';
                    messageType.value = 'success';
                    succesful_message();
                    setTimeout(() => {
                        router.push('/')
                    }, 2000)
                } catch (error) {
                    message.value = 'Error submitting need'
                    messageType.value = 'error'
                }
            }
            else {
                ElMessage.error('请填写特殊考生需求')
            }
        },
    },
        mounted() {
        console.log('Special need page mounted');
        this.fetchinfo();

    },

};
</script>

<style scoped>
.exam_info {
    background-color: #d7bdbd;
    border-radius: 5px;
    padding: 20px;
}


.special_need_page {
    padding: 20px;
    margin: auto 15%;
    background-color: rgb(221, 221, 221);
    border-radius: 5px;
    /* text-color */
}



.special_need {

    background-color: #a6d1e8;
    border-radius: 5px;
    /* margin-bottom: 20px; */

    padding-left: 15px;
    padding-bottom: 20px;
    margin: 0 5%;
}

.special_need h3 {
    padding-top: 15px;

}
</style>
