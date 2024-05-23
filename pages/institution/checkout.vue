<template>
    <Checkout type="edu" :studentNumbers="this.studentNumbers" />
</template>

<script>
import api from '../../axios';
export default {
    data() {
        return {
            studentNumbers:this.$route.query.userIdList.length,
        }
    },
}


</script>