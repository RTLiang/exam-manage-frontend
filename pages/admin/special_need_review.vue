<template>
    <Banner />
    <Admin /><br>
    <div class="special-need-review-box">
        <br>
        <h2 style="text-align: center;">特殊需求审核</h2>
        <div class="special-need-review">
            <el-table :data="specialNeeds" border>
                <el-table-column prop="examNumber" label="准考证号"></el-table-column>
                <el-table-column prop="demandInfo" label="需求信息"></el-table-column>
                <el-table-column prop="resolved" label="是否解决">
                    <template v-slot="scope">
                        <el-button v-if="!scope.row.resolved" type="primary"
                            @click="markResolved(scope.row)" plain>未解决</el-button>
                        <el-button v-else type="success" disabled plain>已解决</el-button>
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
            specialNeeds: [
                { examNumber: '898876590', demandInfo: '行动不便人士，需要特殊照顾', resolved: false },
                { examNumber: '714659566', demandInfo: '听力受损人士，需要会手语的志愿者', resolved: true },
                { examNumber: '766026701', demandInfo: '未成年考生单独考试，需要特殊照顾', resolved: false },
            ]
        };
    },
    methods: {
        markResolved(row) {
            row.resolved = true;
        }
    }
};
</script>
<style>
.special-need-review {
    width: 95%;
    margin: 0 auto;

}

.special-need-review-box {
    background-color: #f3f3f3;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
}
</style>