<template>
    <Banner />
    <el-container>
        <el-header>
            <div style="font-size: x-large;margin-top: 10px;">{{ user.name }}：请选择报考 <b>{{ subject.name }}</b> 的考生</div>
            <div style="margin-top: 20;">报名截止时间：{{ subject.registrationDeadline }}</div>
        </el-header>
        <el-main>
            <div class="table-container">
                <el-table ref="table" :data="studentsData" stripe border @selection-change="handleSelectionChange"
                    @filter-change="handleFilterChange">
                    <el-table-column type="selection" :selectable="selectableRow" />
                    <el-table-column prop="studentId" label="考生号" />
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="phoneNumber" label="手机号码" />
                    <el-table-column prop="idNumber" label="身份证号码" />
                    <el-table-column prop="isApply" label="是否已报考本科目" sortable
                        :filters="[{ text: '是', value: true }, { text: '否', value: false }]"
                        :filter-method="filterIsApply" />
                </el-table>

            </div>
        </el-main>
        <el-footer>

            <el-button type="primary" plain :disabled="!hasSelected">
                确认报考以上考生
            </el-button>

        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            studentsData: [
                {
                    studentId: '2022001',
                    name: '张三',
                    phoneNumber: '13812345678',
                    isApply: true,
                    idNumber: '123456789012345678',
                },
                {
                    studentId: '2022002',
                    name: '李四',
                    phoneNumber: '13898765432',
                    isApply: false,
                    idNumber: '178930012345678',
                },
                // ...
            ],
            selectedRows: [],
            subject: {
                id: "111",
                name: "科目一",
                registrationDeadline: '11:59PM Jul 2, 2024',
            },
            user: {
                name: "史坦杜大学",
                usr_type: "edu"
            },
        }
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
        }
    },
    computed: {
        hasSelected() {
            return this.selectedRows.length > 0;
        }
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
    /* adjust the height to your liking */
}


.table-container {
    display: flex;
    justify-content: center;
    margin: 40px auto;
    /* add some margin top and bottom */

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