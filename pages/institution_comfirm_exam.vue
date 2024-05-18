<template>

    <Banner />
    <br>
    <div class="exam-page">
        <h1 style="text-align: center;">核对信息后确认报考</h1>
        <el-row :gutter="24">
            <el-col :span="8">
                <div class="students-info">
                    <h3>请核对考生信息</h3>
                    <el-table :data="studentsData" border height=400 style="width: 100%">
                        <el-table-column prop="name" label="姓名" width="80" />
                        <el-table-column prop="phoneNumber" label="电话号码" width="120" />
                        <el-table-column prop="idNumber" label="身份证号码" width="150" />
                    </el-table>
                    <br>
                    <div v-if="!confirmed">
                        <el-button type="primary" class="button-confirm" @click="confirmInfo">确认信息无误</el-button>
                        <br>
                        <br>
                        <el-button type="danger" class="button-confirm"
                            @click="$router.push('/login')">信息有误，重新登录</el-button>
                    </div>
                    <div v-else>
                        <p style="color:green">已确认信息</p>
                    </div>
                </div>

            </el-col>
            <el-col :span="16">
                <div class="exam-info">
                    <h3>考试信息</h3>
                    <p>考试科目：{{ exam.subject }}</p>
                    <p>考试时间：{{ exam.examTime }}</p>
                    <p>截止报名时间：{{ exam.deadline }}</p>
                    <p>报名人数：<b>{{ studentsData.length }}</b> 人</p>
                    <p>总计费用：<b>{{ exam.fee * studentsData.length }} </b> 人民币</p>
                </div>
                <div class="exam-location">
                    <h3>选择考点</h3>
                    <el-form :model="location">
                        <el-row :gutter="20">
                            <el-col :span="7.5">
                                <el-form-item label="市（州）级地区">
                                    <el-select v-model="location.city" placeholder="请选择市（州）级地区">
                                        <el-option v-for="city in cities" :key="city.value" :label="city.label"
                                            :value="city.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7.5">
                                <el-form-item label="区（县）级地区">
                                    <el-select v-model="location.district" placeholder="请选择区（县）级地区">
                                        <el-option v-for="district in districts" :key="district.value"
                                            :label="district.label" :value="district.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="考点名">
                                    <el-select v-model="location.name" placeholder="请选择考点名">
                                        <el-option v-for="examPoint in examPoints" :key="examPoint.value"
                                            :label="examPoint.label" :value="examPoint.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <p>此考点剩余考位：{{ location.seats }}</p>
                        <el-form-item>
                            <el-button type="primary" :disabled="!confirmed">确认报考</el-button>
                        </el-form-item>

                    </el-form>
                </div>

            </el-col>
        </el-row>
    </div>
</template>


<script lang="ts">

export default {

    data() {
        return {
            exam: {
                subject: '科目三',
                examTime: '2024年5月1日 15:00-17:00',
                deadline: '2024年4月30日 23:00',
                fee: 648
            },
            location: {
                city: '',
                district: '',
                name: '',
                seats: 114514
            },
            cities: [
                { value: 'city1', label: 'City 1' },
                { value: 'city2', label: 'City 2' },
                // ...
            ],
            districts: [
                { value: 'district1', label: 'District 1' },
                { value: 'district2', label: 'District 2' },
                // ...
            ],
            examPoints: [
                { value: 'examPoint1', label: 'Exam Point 1' },
                { value: 'examPoint2', label: 'Exam Point 2' },
                // ...
            ],
            studentsData: [
                {
                    name: '张三',
                    phoneNumber: '13812345678',
                    idNumber: '123456789012345678',
                },
                {
                    name: '李四',
                    phoneNumber: '13898765432',
                    idNumber: '178930012345678',
                },
                {
                    name: '王五',
                    phoneNumber: '13678901234',
                    idNumber: '2345678901234567',
                },
                {
                    name: '赵六',
                    phoneNumber: '13798765432',
                    idNumber: '3456789012345678',
                },
                {
                    name: '孙七',
                    phoneNumber: '13876543210',
                    idNumber: '4567890123456789',
                },
                {
                    name: '周八',
                    phoneNumber: '13987654321',
                    idNumber: '5678901234567890',
                },
                {
                    name: '吴九',
                    phoneNumber: '13012345678',
                    idNumber: '6789012345678901',
                },
                {
                    name: '郑十',
                    phoneNumber: '13198765432',
                    idNumber: '7890123456789012',
                },
                {
                    name: '杨十一',
                    phoneNumber: '13276543210',
                    idNumber: '8901234567890123',
                },
                {
                    name: '徐十二',
                    phoneNumber: '13387654321',
                    idNumber: '9012345678901234',
                },
            ],
            confirmed: false,

        }
    },
    methods: {

        confirmInfo() {
            this.confirmed = true;
        },
    }
};

</script>


<style scoped>
.exam-page {
    padding: 20px;
    margin: auto 5%;
    background-color: #f9f9f9;
    border-radius: 5px;
    border: 1px solid #ccc;
    /* text-color */
}

.button-confirm {

    width: 100%;
    text-align: center;

}


.exam-location .el-select {
    width: 150px;
}

.students-info {
    border: 1px solid #ccc;
    ;
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
