<template>
    <Banner />
    <el-container>
        <el-header>
            <div style="font-size: x-large; margin-top: 10px;">
                {{ user.name }}：请选择报考 <b>{{ subject.name }}</b> 的考生
            </div>
            <div style="margin-top: 20;">报名截止时间：{{ subject.registrationDeadline }}</div>
        </el-header>
        <el-main>
            <div class="search-bar">
                <el-input v-model="searchQuery" placeholder="搜索考生姓名或号码" />
            </div>
            <div class="table-container">
                <el-table ref="table" :data="filteredStudentsData" stripe border
                    @selection-change="handleSelectionChange" @filter-change="handleFilterChange">
                    <el-table-column type="selection" :selectable="selectableRow" />
                    <el-table-column prop="userId" label="考生号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="phone" label="手机号码" />
                    <el-table-column prop="applyStatus" label="是否已报考本科目" sortable :formatter="ShiFouType"
                        :filter-method="filterIsApply" />
                </el-table>
            </div>
        </el-main>
        <el-footer>
            <el-button type="primary" plain :disabled="!hasSelected" @click="confirmSignup">
                确认报考以上考生
            </el-button>
        </el-footer>
    </el-container>
</template>

<script>
import api from '../../axios';
export default {
    data() {
        return {
            userId: this.$route.query.userId,
            examId: this.$route.query.examId,
            studentsData: [],
            searchQuery: '',
            selectedRows: [],
            subject: {
                id: "111",
                name: "科目一",
                registrationDeadline: '11:59PM Jul 2, 2024',
            },
            user: {
                name: "",
            },
        }
    },
    computed: {
        filteredStudentsData() {
            return this.studentsData.filter(data => {
                return Object.keys(data).some(key => {
                    return String(data[key]).toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            })
        },
        hasSelected() {
            return this.selectedRows.length > 0;
        },
    },
    methods: {
        selectableRow(row) {
            return !row.isApply;
        },
        handleSelectionChange(selection) {
            this.selectedRows = selection;
        },
        handleFilterChange(filters) {
            console.log(filters);
        },
        filterIsApply(value, row) {
            return row.isApply === value;
        },
        ShiFouType(row, column, cellValue) {
            return cellValue ? "是" : "否";
        },
        fetchStudentData() {
            api.get('/eduApply/examineeList', {
                params: {
                    userId: this.userId,
                    examId: this.examId
                }
            })
                .then(response => {
                    this.studentsData = response.data.examineeInfoList;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchExamandOrgInfo() {
            api.get('/eduApply/examInfo', {
                params: {
                    userId: this.userId
                }
            })
                .then(response => {
                    this.subject.name = response.data.examInfoList.find(subject => subject.examId === this.examId).examName;
                    this.subject.id = this.examId;
                    this.subject.registrationDeadline = this.parseTime(response.data.examInfoList.find(subject => subject.examId === this.examId).endApplyTime);
                    this.user.name = response.data.organizationName;
                })
                .catch(error => {
                    console.error(error);
                });
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
        confirmSignup() {
            const selectedUserIds = this.selectedRows.map(row => row.userId);
            api.post('/eduApply/exam', {
                examId: this.examId,
                userIdList : selectedUserIds  // Include the selected user IDs in the payload
            })
                .then(response => {
                    this.$router.push({
                        path: '/institution/confirm_exam',
                        query: {
                            examId: this.examId,
                            userIdList:selectedUserIds
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.$message({
                        message: '报名失败',
                        type: 'error'
                    });
                });
        }
    },
    mounted() {
        this.fetchStudentData();
        this.fetchExamandOrgInfo();
    }
}
</script>

<style>
.el-header {
    text-align: center;
    background-color: #f9f9f9;
    display: block;
    justify-content: center;
    align-items: center;
    height: 80px;
}

.search-bar {
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 20px;
}

.table-container {
    display: flex;
    justify-content: center;
    margin: 40px auto;
    background-color: white;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 15%;
}

.el-footer {
    text-align: center;
}
</style>
