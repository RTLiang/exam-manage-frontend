<template>

    <div class="exam_info">
        <h2>考试信息</h2>
        <p v-if="type === 'individual'"><b>考生姓名：</b>{{ student.name }}</p>
        <p v-if="type === 'edu'"><b>考试人数</b>：{{ studentNumbers }}</p>
        <p><b>考试科目：</b>{{ exam.subject }}</p>
        <p><b>考试时间：</b>{{ exam.examTime }}</p>
        <p><b>考试地点：</b>{{ exam.location }}</p>
    </div>

</template>



<script lang="ts">


export default {
    props: {
        type: {
            type: String,
            required: true
        },
        studentNumbers: {
            type: Number,
            default: 1,
        }
    },

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
    },

};
</script>


<style>
.exam_info {
    background-color: #d7bdbd;
    border-radius: 5px;
    padding-top: 1px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}
</style>