<template>
    <Banner />
    <br>
    <div class="exam_info_page">
        <h1 v-if="type === 'individual'" style="text-align: center;">考生缴费</h1>
        <h1 v-if="type === 'edu'" style="text-align: center;">机构缴费</h1>

        <el-row :gutter="20">
            <el-col :span="6">
                <div v-if="type === 'individual'">
                    <ExamInfo type="individual" />
                </div>
                <div v-if="type === 'edu'">
                    <ExamInfo type="edu" :studentNumbers=studentNumbers />
                </div>
            </el-col>
            <el-col :span="18">
                <div class="exam_pay">
                    <h2 style="text-align: center;">考试费用： {{ exam.fee * studentNumbers }} 人民币</h2>
                    <h3 style="text-align: center;">请选择支付方式</h3>
                    <el-divider />
                    <el-image src="https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png"
                        class="payment_methods_image" @click="$router.push('/')" alt="支付宝" />
                    <el-image src="https://wx.gtimg.com/pay_en/img/common/logo.svg" class="payment_methods_image"
                        @click="$router.push('/')" alt="微信支付" />
                    <el-image src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
                        class="payment_methods_image" @click="$router.push('/')" alt="VISA" />
                </div>

            </el-col>
        </el-row>

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


<style scoped>
.exam_info_page {
    padding: 20px;
    margin: auto 7%;
    background-color: rgb(221, 221, 221);
    border-radius: 5px;
    /* text-color */
}


.payment_methods_image {
    width: 200px;
    /* set the width to a fixed value */
    height: 60px;
    /* set the height to a fixed value */
    margin: 0 20px;
    cursor: pointer;
    background-color: #eaeaea;
    /* add a white background color */
    border-radius: 10px;
    /* add a rounded corner effect */
    border: none;
    /* remove the border */
    padding: 6px 10px;
    /* add 16px padding top/bottom and 20px padding left/right */
    display: inline-block;
    /* make the element inline-block to contain the padding */

}



.exam_pay {

    background-color: #a6d1e8;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;

}
</style>
