<template>
    <Banner />
    <AdditionalProcedure type="individual" :userid = this.$route.query.userId :studentNumber=1 :examid=this.$route.query.examId />
</template>

<script>
import api from '../axios';
export default {
    data() {
        return {
            examinee: {
                examineeName: '',
                user_id: '',
            },
        }
    },
    methods: {
        async fetchexamineeinfo() {
            const res = await api.get('/examinee/info', {
                params: {
                    userId: this.$route.query.userId,
                    // examineeName: this.examinee.examineeName,
                }
            });
            if (res.data.examinee) {
                console.log("fetchexamineeinfo");
                console.log(res.data);
                this.examinee.examineeName = res.data.examinee.name;
            }
        },
    },
    created() {
        console.log(this.$route.query.userId);
        this.examinee.user_id = this.$route.query.userId;
        this.fetchexamineeinfo();
        console.log(this.examinee);
    },
}
</script>