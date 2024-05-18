<template>
    <Banner />
    <ToolBar />
    <br>
    <div>
        <Welcome :username="username" :usertype="usertype" />
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: '张金亮',
      usertype: 'admin'
    }
  }
}
</script>
