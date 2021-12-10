<script>
export default {
  created() {
    this.$router.push(`/${this.$route.params.classId}/detail`)
  },
}
</script>
