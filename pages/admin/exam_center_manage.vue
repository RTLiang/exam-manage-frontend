<template>
    <Banner />
    <Admin />
    <br>
    <div class="center-list-box">
        <br>
        <h2 style="text-align: center;">考点信息</h2>
        <div class="center-list">
            <el-input v-model="searchQuery" placeholder="搜索" />
            <el-table :data="filteredExams" border style="width: 100%">
                <el-table-column fixed prop="examCenterName" label="考点名称" />
                <el-table-column prop="examCenterLocation" label="考点位置" />
                <el-table-column prop="cityName" label="考点所属市" />
                <el-table-column prop="districtsName" label="考点所属区" />
                <el-table-column prop="examRemainNumber" label="考点容量" />
                <!-- <el-table-column fixed="right" label="操作">
                    <template #default>
                        <el-button link type="primary" size="small"
                            @click="handleEdit($event, props.row)">编辑</el-button>
                    </template>
</el-table-column> -->
            </el-table>
        </div>
        <br>
    </div>
</template>

<script>
import api from '../../axios';
export default {
    data() {
        return {
            searchQuery: '',
            examCenters: [
            ]
        }
    },
    computed: {
        filteredExams() {
            return this.examCenters.filter(center => {
                return (
                    center.examCenterName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.examCenterLocation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.cityName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.districtsName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.examRemainNumber.toString().includes(this.searchQuery)
                )
            })
        }
    },
    methods: {
        async fetchExamCenters() {
            try {
                const response = await api.get('/manage/examCenter');
                this.examCenters = response.data;
            } catch (error) {
                console.error(error);
            }
            console.log(this.examCenters);
        },
        handleEdit(event, row) {
            console.log(`Editing ${row.center_name}`)
            // add your edit logic here
        }
    },
    mounted() {
        this.fetchExamCenters();
    }
}
</script>
<style>
.center-list {
    width: 95%;
    margin: 0 auto;

}

.center-list-box {
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
}
</style>