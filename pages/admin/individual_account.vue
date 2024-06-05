<template>
    <Banner />
    <Admin />
    <br>

    <div class="individual_list_box">
        <br>
        <h2 style="text-align: center;">个人账号</h2>
        <div class="individual_list">
            <el-input v-model="searchQuery" placeholder="搜索" />
            <el-table :data="filteredIndividuals" border style="width: 100%">
                <el-table-column fixed prop="examineeName" label="姓名" required />
                <el-table-column prop="examineePhone" label="电话号码" required />
                <el-table-column prop="examineeEmail" label="电子邮箱" required />
                <el-table-column prop="examineeIDNumber" label="身份证号" required />
                <el-table-column prop="organizationName" label="所属机构" />
                <el-table-column prop="whiteListed" label="是否是白名单" sortable :formatter="ShiFouType"
                    :filter-method="filterIsWhitelisted" />
                <!-- <el-table-column label="操作" width="100">
                    <template v-slot="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" size="small">修改</el-button>
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
            individuals: [
            ],
        }
    },
    computed: {
        filteredIndividuals() {
            const searchQuery = this.searchQuery.toLowerCase();
            return this.individuals.filter(individual => {
                const examineeNameMatch = individual.examineeName.toLowerCase().includes(searchQuery);
                const phoneNumberMatch = individual.examineePhone.includes(searchQuery);
                const examineeEmailMatch = individual.examineeEmail.toLowerCase().includes(searchQuery);
                const idNumberMatch = individual.examineeIDNumber.includes(searchQuery);
                const organizationNameMatch = individual.organizationName ? individual.organizationName.toLowerCase().includes(searchQuery) : false;
                return (
                    examineeNameMatch ||
                    phoneNumberMatch ||
                    examineeEmailMatch ||
                    idNumberMatch ||
                    organizationNameMatch
                );
            });
        }
    },


    methods: {
        async fetchExaminees() {
            try {
                const response = await api.get('/manager/examinee');
                this.individuals = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        handleEdit(row) {
            console.log(`Edit button clicked for row ${row.examineeName}`)
        },
        filterIsWhitelisted(value, row) {
            return row.IsWhitelisted === value;
        },
        ShiFouType(row, column, cellValue) {
            if (row, column, cellValue) {
                return ("是");
            }
            else {
                return ("否");
            }
        },

    },
    mounted() {
    this.fetchExaminees();
}
}
</script>
<style>
.individual_list {
    width: 95%;
    margin: 0 auto;

}

.individual_list_box {
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
}
</style>