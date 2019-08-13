<template>
  <div class="about">
    <div style="margin-bottom: 20px">
      <div class="container" style="padding: 10px 20px;">
        <!-- <span class="breadcrumb-item active">FAQ</span> -->
      </div>
    </div>
    <div class="centre" style="max-width: 1264px;width: 100%;">
      <h4 style="text-align: centre">Frequently Asked Questions</h4>
      <br />
      <h6 style="margin-bottom: 10px">1. When are you open?</h6>We are open Monday through Friday, from 9 am to 4:45 pm. We are closed on all University holidays. You can also view the full list of library hours to check if we’re open.
      <br />
      <br />

      <h6 style="margin-bottom: 10px">2. Do you have Wi-Fi?</h6>
We do! If you are a student who bring your laptop, you can connect to Library Wireless.
      <br />
      <br />

      <h6 style="margin-bottom: 10px">3. Why can't I sign in?</h6>Make sure you’re trying to sign in with correct credential.
      <br />Email to library@library-system.com if you need help.
    </div>
  </div>
</template>

<script>
export default {
  name: "faq",
  created() {
    this.$store.commit("startLoading");
    this.$store.commit("changePage", [
      { text: "Frequent questions & answers", disabled: false, to: "/faq" }
    ]);
  },
  mounted() {
    this.$store.commit("stopLoading");
  }
};
</script>

<style scoped>
div.centre {
  text-align: justify;
  width: 50%;
  margin: auto;
  margin-bottom: 20px;
}
</style>

