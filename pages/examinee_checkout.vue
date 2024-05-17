<template>
    <Banner />
    <br>
    <div class="exam-page">
        核对信息后报名
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="student-info">
                    <h3>考试信息</h3>
                    <p><b>考试科目：</b>{{ exam.subject }}</p>
                    <p><b>考试时间：</b>{{ exam.examTime }}</p>
                    <p><b>考试地点：</b>{{ exam.location }}</p>


                </div>

            </el-col>
            <el-col :span="18">
                <div class="exam-info">
                    <h2 style="text-align: center;">考试费用： {{ exam.fee }} 人民币</h2>
                    <h3 style="text-align: center;">请选择支付方式</h3>
                </div>
                <el-image src="https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png" class="payment_methods_image" @click="$router.push('/')"/>
                <el-image src="https://wx.gtimg.com/pay_en/img/common/logo.svg" class="payment_methods_image" @click="$router.push('/')"/>
                <el-image src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" class="payment_methods_image" @click="$router.push('/')"/>


            </el-col>
        </el-row>

    </div>
</template>

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
                location: '这是考试地点示例，还不知道写什么',
            },
        };
    },

};
</script>


<style scoped>
.exam-page {
    padding: 20px;
    margin: auto 7%;
    background-color: rgb(221, 221, 221);
    border-radius: 5px;
    /* text-color */
}

.button-confirm {

    width: 100%;
    text-align: center;

}

.payment_methods_image {
    width: 200px;
    /* set the width to a fixed value */
    height: 60px;
    /* set the height to a fixed value */
    margin: 0 20px;
    cursor: pointer;

}

.exam-location .el-select {
    width: 150px;
}

.student-info {
    background-color: #d7bdbd;
    padding: 20px;
    border-radius: 5px;
}

.exam-info,
.exam-location {
    background-color: #b4e0a3;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.exam-info {
    background-color: #80b3d1;
}
</style>
