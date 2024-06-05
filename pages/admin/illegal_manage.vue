<template>
    <Banner />
    <Admin />
    <br>
    <div class="examiner-list-box">
        <br>
        <h2 style="text-align: center;">违规信息管理</h2>
        <div class="examiner-list">
            <el-input v-model="searchQuery" placeholder="搜索" />
            <el-table :data="filteredExaminers" border style="width: 100%">
                <el-table-column fixed prop="exam_name" label="考试名" />
                <el-table-column fixed prop="exam_center_name" label="考点名" />
                <el-table-column prop="illegal_time" label="违规时间" />
                <el-table-column prop="illegal_information" label="违规信息" />

            </el-table>
            <!-- <div style="text-align: center; margin-top: 20px;">
                <el-button type="primary" @click="handleAddExaminer">添加违规信息</el-button>
            </div> -->
        </div>
        <br>
    </div>
</template>

<script>
import api from '../../axios';
export default defineComponent({
    data() {
        return {
            searchQuery: '',
            examiners: [
            ]
        };
    },
    computed: {
        filteredExaminers() {
            if (this.searchQuery) {
                return this.examiners.filter(exam => {
                    return exam.exam_name.includes(this.searchQuery) || exam.exam_center_name.includes(this.searchQuery);
                });
            } else {
                return this.examiners;
            }
        }
    },
    methods: {
        async fetchIllegalExams() {
            try {
                const response = await api.get('/manage/illeg');
                this.examiners = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        handleEdit(row) {
            // Handle edit logic here
            console.log('Editing exam:', row);
        },
        handleAddExaminer() {
            console.log('add examiner   ')
            // Your code to add an examiner goes here
        }
    },
    mounted() {
        this.fetchIllegalExams();
    },
});
</script>
<style>
.examiner-list {
    width: 95%;
    margin: 0 auto;

}

.examiner-list-box {
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
}
</style>
