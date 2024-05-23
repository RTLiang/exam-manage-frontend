<template>
    <Banner />
    <ToolBar />
    <AdditionalProcedure type="edu" :userid="this.$route.query.userId"  :studentNumber="stuNumber"
        :examid="this.$route.query.examId" />
</template>

<script>

import api from '../../axios';
export default {
    data() {
        return {
            institution: {
                name: '',
                user_id: '',
            },
            stuNumber:this.$route.query.stuNumber,
            examinfo: {},
        }
    },
    method: {
        async fetchInfo() {
            const res = await api.get('/eduApply/examinfo', {
                params: {
                    userId: this.$route.query.userId,
                    examId: this.$route.query.examId,  // Add this line

                }
            });
            if (res.data.organizationName) {
                this.institution.name = res.data.organizationName;
                this.examinfo = res.data.examInfoList.find(item => item.examId === this.$route.query.examId);

            }
            else {
                this.institution.name = "未知机构";
            }
        },
    },
}





</script>