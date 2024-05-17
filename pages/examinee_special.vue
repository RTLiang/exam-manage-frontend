<template>
    <Banner />
    <br>
    <div class="special_need_page">
        <h1 style="text-align: center;">特殊考生需求</h1>
        <el-row :gutter="20">
            <el-col :span="6">
                <ExamInfo />

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



<script lang="ts" setup>

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


<script lang="ts">

export default {
    data() {
        return {
            student: {
                name: '张三',
                id: '123456789012345678',
                phone: '13800138000'
            },
            exam: {
                subject: '科目三',
                examTime: '2024年5月1日 15:00-17:00',
                deadline: '2024年4月30日 23:00',
                fee: 648,
                location: '北京市海淀区中关村大街1号',
            },
        };
    }
};
</script>

<style scoped>
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
