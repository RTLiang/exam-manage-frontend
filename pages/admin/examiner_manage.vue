<template>
    <Banner/>
    <Admin/>
    <br>
    <div class="examiner-list-box">
        <br>
        <h2 style="text-align: center;">监考员管理</h2>
        <div class="examiner-list">
            <el-input v-model="searchQuery" placeholder="搜索" />
            <el-table :data="filteredExaminers" border style="width: 100%">
                <el-table-column fixed prop="id_card" label="身份证号" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column fixed="right" label="操作">
                    <template #default="props">
                        <el-button link type="primary" size="small"
                            @click="handleEdit(props.row)">修改信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center; margin-top: 20px;">
            <el-button type="primary" @click="handleAddExaminer">添加监考员</el-button>
        </div>
        </div>
        <br>
    </div>
</template>

<script>


export default defineComponent({
    data() {
        return {
            searchQuery: '',
            examiners: [
                { id_card: '1234567890', name: '张三' },
                { id_card: '0987654321', name: '李四' },
                // Add more exam data here
            ]
        };
    },
    computed: {
        filteredExaminers() {
            if (this.searchQuery) {
                return this.examiners.filter(exam => {
                    return exam.id_card.includes(this.searchQuery) || exam.name.includes(this.searchQuery);
                });
            } else {
                return this.examiners;
            }
        }
    },
    methods: {
        handleEdit(row) {
            // Handle edit logic here
            console.log('Editing exam:', row);
        },
        handleAddExaminer() {
            console.log('add examiner   ')
            // Your code to add an examiner goes here
        }
    }
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