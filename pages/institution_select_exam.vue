<template>
<Banner />
<Welcome :user="user"/>

</template>





<script>
export default {
  data() {
    return {
      user: {
        name: "史坦杜大学",
        usr_type: "edu"
      }
    };
  }}
</script>
