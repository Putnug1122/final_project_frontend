<template>
  <div class="container">
    <div v-if="$auth.loggedIn && $auth.user.rule == 'admin'">
      <nuxt-link
        class="btn btn-primary rounded-pill mb-5"
        :to="`/kelasku/${$route.params.namaKelas}/${$route.params.idKelas}/materi/${$route.params.jadwalId}/add-materi`"
      >
        <i class="fas fa-plus mr-2"></i> Material</nuxt-link
      >
    </div>
    <h3 class="text-primary mb-3">Materi</h3>

    <div class="row">
      <div class="col-md-4" v-for="(material, i) in materials" :key="i">
        <materials-item
          @delete="getMateri"
          :id="material.id"
          :title="material.name"
          :type="material.type"
          :file="material.file"
          :schedule="material.schedule.start"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: '',
    }
  },
  methods: {
    async getMateri() {
      try {
        const response = await this.$axios.get(
          `material/${this.$route.params.jadwalId}`
        )
        console.log(response.data)
        this.materials = response.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getMateri()
  },
}
</script>

<style></style>
