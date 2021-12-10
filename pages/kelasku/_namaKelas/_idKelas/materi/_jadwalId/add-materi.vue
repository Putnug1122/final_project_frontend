<template>
  <div class="container-fluid">
    <h3 class="text-primary">Add Materi</h3>
    <hr class="mb-4" />
    <form action="POST" method="POST" @submit.prevent="createMaterial">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          name="judul"
          id="name"
          placeholder="Nama Materi"
          v-model="material.name"
        />
      </div>
      <div class="form-group">
        <label for="file">File</label>
        <input
          type="text"
          class="form-control"
          name="file"
          id="file"
          placeholder="File URL"
          v-model="material.file"
        />
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <select
          name="type_file"
          id="type"
          v-model="material.type"
          class="form-control"
        >
          <option value="material">Material</option>
          <option value="recording">Recording</option>
        </select>
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-secondary" @click="$router.go(-1)">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      material: {
        name: '',
        file: '',
        type: '',
      },
    }
  },
  methods: {
    async createMaterial() {
      try {
        const response = await this.$axios.post(`material`, {
          name: this.material.name,
          file: this.material.file,
          type: this.material.type,
          schedule_id: this.$route.params.jadwalId,
        })
        console.log(response)
        this.$swal.fire({
          title: 'Success',
          text: 'Materi berhasil ditambahkan',
          type: 'success',
          icon: 'success',
        })
        this.$router.push(
          '/kelasku/' +
            this.$route.params.namaKelas +
            '/' +
            this.$route.params.idKelas +
            '/materi' +
            '/' +
            this.$route.params.jadwalId
        )
      } catch (error) {
        console.log(error)
        this.$swal.fire({
          title: 'Error',
          text: 'Gagal menambahkan materi',
          type: 'error',
          icon: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
