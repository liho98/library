<template>
  <div>sss</div>
</template>

<script>
export default {
  name: "dashboard",
  created() {
    this.$store.commit("changePage", [
      { text: "Dashboard", disabled: false, to: "/dashboard" }
    ]);
  }
};
</script>
