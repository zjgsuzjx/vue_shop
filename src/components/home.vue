<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
          this.$message.success("退出成功~");
        })
        .catch(() => {
          this.$message.info("已取消退出~");
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>