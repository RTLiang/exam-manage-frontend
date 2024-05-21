
<template>
    <br>
    <div class="info_page">
        <el-container>
            <el-header>
                <h2 v-if="type === 'individual'"> 考生 {{ name }} ，您已成功报名 {{ exam.subject }}</h2>
                <h2 v-else-if="type === 'edu'">机构 {{ name }} 已成功为 {{ studentNumber }} 人报考 {{ exam.subject }}</h2>
                <div class="print_prompt" style="font-size: 24px;">
                    请于 <b style="color: #0066CC;">{{ exam.deadline }}</b> 到 <b style=" color: #0066CC;">{{
                        exam.examStartTime }}</b> 打印准考证
                </div>
                <h3>
                    考试时间：{{ exam.examStartTime }} 到 {{ exam.exameEndTime }}
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
                <el-button v-if="type === 'individual'" size="large" @click="$router.push('/individual/special')" plain>特殊考生申请</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import moment from 'moment';
import 'moment/locale/zh-cn'; // for Chinese locale


export default {
    props: {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        studentNumber: {
            type: Number,
        }
    },
    data() {
        return {
            exam: {
                subject: '科目三',
                examStartTime: '2024年7月1日 15:00',
                exameEndTime:'2024年7月1日 16:00',
                deadline: '2024年4月30日 23:00',
                fee: 648,
                location: '北京市海淀区中关村大街1号',
            },
            isPrintAvaliable: false,
        };
    }, mounted() {
        this.checkPrintAvailability();
    },
    methods: {
        checkPrintAvailability() {
            const currentTime = moment();
            const deadline = moment(this.exam.deadline, 'YYYY年M月D日 HH:mm'); // parse deadline
            const examStartTime = moment(this.exam.examStartTime, 'YYYY年M月D日 HH:mm'); // parse exam start time


            if (currentTime >= deadline && currentTime <= examStartTime) {
                this.isPrintAvaliable = true;
            } else {
                this.isPrintAvaliable = false;
            }
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
