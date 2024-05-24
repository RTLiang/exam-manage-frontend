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
export default {
    data() {
        return {
            searchQuery: '',
            examCenters: [
                {
                    id: 22,
                    center_name: '成都理工大学',
                    center_loc: '二仙桥街道',
                    center_city: '成都',
                    center_dis: '成华区',
                },
                {
                    id: 1,
                    center_name: '电子科技大学',
                    center_loc: '建设路',
                    center_city: '成都',
                    center_dis: '成华区',
                },
                {
                    id: 2,
                    center_name: '锦江区',
                    center_loc: '锦江区',
                    center_city: '成华区',
                    center_dis: '成都',
                },
                {
                    id: 3,
                    center_name: '武侯区',
                    center_loc: '武侯区',
                    center_city: '成都',
                    center_dis: '成华区',
                },
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