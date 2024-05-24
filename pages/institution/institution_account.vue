<template>
    <Banner />
    <Admin />
    <br>
    <div class="institution_list_box">
        <br>
        <h2 style="text-align: center;">机构账号</h2>
        <div class="institution_list">
            <el-input v-model="searchQuery" placeholder="搜索" />
            <el-table :data="filteredInstitutions" border style="width: 100%">
                <el-table-column fixed prop="id" label="账号" required />
                <el-table-column prop="name" label="机构名称" required />
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
export default {
    data() {
        return {
            searchQuery: '',
            institutions: [
                {
                    id: 19,
                    name: 'hqyj',
                },
               
            ]

        }
    },
    computed: {
        filteredInstitutions() {
            const searchQuery = this.searchQuery.toLowerCase();
            return this.institutions.filter(institution => {
                const nameMatch = institution.name.toLowerCase().includes(searchQuery);
                return (
                    nameMatch 
                );
            });
        }
    },


    methods: {
        handleEdit(row) {
            console.log(`Edit button clicked for row ${row.name}`)
        }
    }
}
</script>
<style>
.institution_list {
    width: 95%;
    margin: 0 auto;

}

.institution_list_box {
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
}
</style>