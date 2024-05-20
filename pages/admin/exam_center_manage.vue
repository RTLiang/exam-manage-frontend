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
                <el-table-column fixed prop="center_name" label="考点名称" />
                <el-table-column prop="center_loc" label="考点位置" />
                <el-table-column prop="center_city" label="考点所属市" />
                <el-table-column prop="center_dis" label="考点所属区" />
                <el-table-column prop="center_capacity" label="考点容量" />
                <el-table-column fixed="right" label="操作">
                    <template #default>
                        <el-button link type="primary" size="small"
                            @click="handleEdit($event, props.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <br>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            examCenters: [
                {
                    id: 1,
                    center_name: 'Beijing Exam Center',
                    center_loc: 'No. 1, Beijing Road',
                    center_city: 'Beijing',
                    center_dis: 'Dongcheng District',
                    center_capacity: 500
                },
                {
                    id: 2,
                    center_name: 'Shanghai Exam Center',
                    center_loc: 'No. 2, Shanghai Road',
                    center_city: 'Shanghai',
                    center_dis: 'Pudong District',
                    center_capacity: 800
                },
                {
                    id: 3,
                    center_name: 'Guangzhou Exam Center',
                    center_loc: 'No. 3, Guangzhou Road',
                    center_city: 'Guangzhou',
                    center_dis: 'Tianhe District',
                    center_capacity: 300
                },
                {
                    id: 4,
                    center_name: 'Shenzhen Exam Center',
                    center_loc: 'No. 4, Shenzhen Road',
                    center_city: 'Shenzhen',
                    center_dis: 'Futian District',
                    center_capacity: 600
                },
                {
                    id: 5,
                    center_name: 'Chengdu Exam Center',
                    center_loc: 'No. 5, Chengdu Road',
                    center_city: 'Chengdu',
                    center_dis: 'Jinjiang District',
                    center_capacity: 400
                },
                {
                    id: 6,
                    center_name: 'Hangzhou Exam Center',
                    center_loc: 'No. 6, Hangzhou Road',
                    center_city: 'Hangzhou',
                    center_dis: 'Xi Hu District',
                    center_capacity: 700
                }
            ]
        }
    },
    computed: {
        filteredExams() {
            return this.examCenters.filter(center => {
                return (
                    center.center_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.center_loc.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.center_city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.center_dis.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    center.center_capacity.toString().includes(this.searchQuery)
                )
            })
        }
    },
    methods: {
        handleEdit(event, row) {
            console.log(`Editing ${row.center_name}`)
            // add your edit logic here
        }
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