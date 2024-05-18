<template>
    <Banner />
    <div>
        <Welcome  :user="user"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "张金亮",
        usr_type: "admin"
      },
    }
  }
}
</script>
