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
                <el-table-column fixed prop="name" label="姓名" required />
                <el-table-column prop="phone_number" label="电话号码" required />
                <el-table-column prop="email" label="电子邮箱" required />
                <el-table-column prop="Id_number" label="身份证号" required />
                <el-table-column prop="institution" label="所属机构" />
                <el-table-column prop="whitelisted" label="是否是白名单" sortable :formatter="ShiFouType"
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
export default {
    data() {
        return {
            searchQuery: '',
            individuals: [
                {
                    id: 14,
                    name: '张三',
                    phone_number: '12345678',
                    email: '12346@163.com',
                    Id_number: '1234567890',
                    institution:'hqyj',
                    whitelisted: true,
                },
                {
                    id: 18,
                    name: '李四',
                    phone_number: '15384026795',
                    email: '12395@163.com',
                    Id_number: '18536479524',
                    institution: 'hqyj',
                    whitelisted: true,
                },
                {
                    id: 20,
                    name: '王五',
                    phone_number: '15384021548',
                    email: '1546@163.com',
                    Id_number: '1853647852',
                    institution: 'hqyj',
                    whitelisted: true,
                },
                {
                    id: 22,
                    name: '徐六',
                    phone_number: '15236487523',
                    email: '482648@qq.com',
                    Id_number: '151394475',
                    institution: 'hqyj',
                    whitelisted: true,
                },
                {
                    id: 23,
                    name: '胡七',
                    phone_number: '1536948203',
                    email: '153248@gmail.com',
                    Id_number: '2687485245',
                    institutionL:'hqyj',
                    whitelisted: true,

                }
                
            ]
        }
    },
    computed: {
        filteredIndividuals() {
            const searchQuery = this.searchQuery.toLowerCase();
            return this.individuals.filter(individual => {
                const nameMatch = individual.name.toLowerCase().includes(searchQuery);
                const phoneNumberMatch = individual.phone_number.includes(searchQuery);
                const emailMatch = individual.email.toLowerCase().includes(searchQuery);
                const idNumberMatch = individual.Id_number.includes(searchQuery);
                const institutionMatch = individual.institution ? individual.institution.toLowerCase().includes(searchQuery) : false;
                return (
                    nameMatch ||
                    phoneNumberMatch ||
                    emailMatch ||
                    idNumberMatch ||
                    institutionMatch
                );
            });
        }
    },


    methods: {
        handleEdit(row) {
            console.log(`Edit button clicked for row ${row.name}`)
        }, 
        filterIsWhitelisted(value, row) {
            return row.IsWhitelisted === value;
        },
        ShiFouType(row, column,cellValue) {
            if (row, column, cellValue) {
                return ("是");
            }
            else {
                return ("否");
            }
        },

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