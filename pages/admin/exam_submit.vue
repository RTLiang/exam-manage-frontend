<template>
    <Banner />
    <Admin />
    <div class="exam-submit-box">
        <br>
        <h2>新建考试</h2>
        <div class="exam-submit">
            <el-form ref="examForm" :model="exam" label-width="120px" style="max-width: 70%;">
                <el-form-item label="考试科目">
                    <el-input v-model="exam.subject" />
                </el-form-item>
                <el-form-item label="开始报名时间">
                    <el-date-picker v-model="exam.signUpStartTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
                </el-form-item>
                <el-form-item label="截止报名时间">
                    <el-date-picker v-model="exam.signUpEndTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
                </el-form-item>
                <el-form-item label="考试开始时间">
                    <el-date-picker v-model="exam.examStartTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
                </el-form-item>
                <el-form-item label="考试结束时间">
                    <el-date-picker v-model="exam.examEndTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间" />
                </el-form-item>
                <el-form-item label="考试类型">
                    <el-radio-group v-model="exam.type">
                        <el-radio value="省考">省考</el-radio>
                        <el-radio value="统考">统考</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="考点选择">
                    <el-select v-model="exam.venues" multiple placeholder="请选择">
                        <el-option v-for="venue in venues" :key="venue.id" :label="venue.name" :value="venue.id">
                            <span style="float: left">{{ venue.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{
                                venue.capacity
                            }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="考试费用">
                    <el-input v-model="exam.fee" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onConfirm">确认</el-button>
                </el-form-item>
            </el-form>
            <br>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            exam: {
                subject: '',
                signUpStartTime: '',
                signUpEndTime: '',
                examStartTime: '',
                examEndTime: '',
                type: '省考',
                venue: '',
                fee: ''
            },
            venues: [
                {
                    id: 1,
                    name: '考点1',
                    capacity: 100
                },
                {
                    id: 2,
                    name: '考点2',
                    capacity: 200
                }
            ]
        }
    },
    methods: {
        onConfirm() {
            if (this.exam.signUpStartTime > this.exam.signUpEndTime) {
                ElMessage.error("报名开始时间不能晚于报名截止时间");
                return;
            }

            if (this.exam.examStartTime > this.exam.examEndTime) {
                ElMessage.error("考试开始时间不能晚于考试结束时间");
                return;
            }

            if (this.exam.signUpEndTime > this.exam.examStartTime) {
                ElMessage.error("报名截止时间不能晚于考试开始时间");
                return;
            }
            // handle confirm logic here
        }
    }
}
</script>
<style>
.exam-submit-box {
    margin: 20px auto;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 70%;
}

.exam-submit {
    margin: 40px 20px;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 30%;
}

.el-form-item,
.el-date-picker {
    width: 400px;
}
</style>