<template>
    <Checkout type="edu" :studentNumbers="this.studentNumbers" />
</template>

<script>
export default {
    data() {
        return {
            studentNumbers:this.$route.query.userIdList.length,
        }
    },
}


</script>