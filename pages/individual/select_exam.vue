<template>
    <Banner />
    <Welcome :user="user" />

    <div class="exam-list">
        <h2>考试列表</h2>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(subject, index) in subjects" :key="index">
                <el-card>
                    <h3>{{ subject.name }}</h3>
                    <p>考试时间: {{ subject.examTime }}</p>
                    <p>报名截止时间: {{ subject.registrationDeadline }}</p>
                    <el-button type="primary" @click="handleButtonClick(subject)">{{ getButtonText(subject.status)
                        }}</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subjects: [
                {
                    id: '1111',
                    name: '科目1',
                    examTime: '10AM-12PM Jul 3, 2024',
                    registrationDeadline: '11:59PM Jul 2, 2024',
                    status: 'not_selected' // 用户状态: not_selected, selected, paid, printed, completed
                },
                {
                    id: '2222',
                    name: '科目2',
                    examTime: '10AM-12PM Jul 3, 2024',
                    registrationDeadline: '11:59PM Jul 2, 2024',
                    status: 'selected'
                },
                {
                    id: '3333',
                    name: '科目3',
                    examTime: '10AM-12PM Jul 3, 2024',
                    registrationDeadline: '11:59PM Jul 2, 2024',
                    status: 'paid'
                },
                {
                    id: '4444',
                    name: '科目4',
                    examTime: '10AM-12PM Jul 3, 2024',
                    registrationDeadline: '11:59PM Jul 2, 2024',
                    status: 'printed'
                }
            ],
            user: {
                name: "赖世文",
                usr_type: "individual",
            }
        }
    },
    methods: {
        getButtonText(status) {
            switch (status) {
                case 'not_selected':
                    return '选择科目';
                case 'selected':
                    return '去缴费';
                case 'paid':
                    return '打印准考证';
                case 'printed':
                    return '查看报考信息';
                case 'completed':
                    return '查看报考信息';
                default:
                    return '操作';
            }
        },
        handleButtonClick(subject) {
            switch (subject.status) {
                case 'not_selected':
                    this.selectSubject(subject);
                    break;
                case 'selected':
                    this.payForSubject(subject);
                    break;
                case 'paid':
                    this.printExamTicket(subject);
                    break;
                case 'printed':
                case 'completed':
                    this.viewExamInfo(subject);
                    break;
                default:
                    break;
            }
        },
        selectSubject(subject) {
            this.$message({
                message: `选择了 ${subject.name}`,
                type: 'info'
            });
            // 更新状态逻辑
            subject.status = 'selected';
        },
        payForSubject(subject) {
            this.$message({
                message: `去缴费 ${subject.name}`,
                type: 'info'
            });
            // 更新状态逻辑
            subject.status = 'paid';
        },
        printExamTicket(subject) {
            this.$message({
                message: `打印准考证 ${subject.name}`,
                type: 'info'
            });
            // 更新状态逻辑
            subject.status = 'printed';
        },
        viewExamInfo(subject) {
            this.$message({
                message: `查看 ${subject.name} 的报名信息`,
                type: 'info'
            });
            // 更新状态逻辑
            subject.status = 'completed';
        }
    }
};
</script>
<style scoped>
.exam-list {
    padding: 20px;
}

.exam-list h2 {
    text-align: center;
    margin-bottom: 20px;
}

.el-card {
    text-align: center;
}

.el-card h3 {
    margin-bottom: 10px;
}
</style>
