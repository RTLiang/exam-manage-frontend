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
                <el-table-column label="操作" width="100">
                    <template v-slot="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" size="small">修改</el-button>
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
            individuals: [
                {
                    id: 1,
                    name: '李明',
                    phone_number: '13812345678',
                    email: 'liming@example.com',
                    Id_number: '420101199001011234',
                    whitelisted: false,
                },
                {
                    id: 2,
                    name: '王晓红',
                    phone_number: '13698765432',
                    email: 'wangxiaohong@example.com',
                    Id_number: '420102199002021234',
                    institution: '清华大学',
                    whitelisted: false,
                },
                {
                    id: 3,
                    name: '赵伟',
                    phone_number: '15888888888',
                    email: 'zhaowei@example.com',
                    Id_number: '420103199003031234',
                    institution: '中国人民大学',
                    whitelisted: false,
                },
                {
                    id: 4,
                    name: '李丽',
                    phone_number: '15111111111',
                    email: 'lili@example.com',
                    Id_number: '420104199004041234',
                    institution: '北京交通大学',
                    whitelisted: true,
                },
                {
                    id: 5,
                    name: '张伟',
                    phone_number: '13999999999',
                    email: 'zhangwei@example.com',
                    Id_number: '420105199005051234',
                    whitelisted: true,

                },
                {
                    id: 6,
                    name: '吴琼',
                    phone_number: '13888889999',
                    email: 'wuqiong@example.com',
                    Id_number: '420106199006061234',
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