<template>
  <div class="container">
    <div class="mt-5">
      <form @submit.prevent="updateMaterial">
        <input-text
          :val="material.name"
          @get="(val) => (material.name = val)"
          name="Materi"
          placeholder="Materi 1"
        />
        <input-options
          :val="material.type"
          @get="(val) => (material.type = val)"
          name="type"
          :options="list"
        />
        <input-text
          :val="material.file"
          @get="(val) => (material.file = val)"
          name="File"
          placeholder="URL File"
        />
        <div class="text-right mt-5">
          <button
            class="btn btn-secondary mr-3"
            @click="$router.go(-1)"
            type="button"
          >
            Batal
          </button>
          <button class="btn btn-primary" type="submit">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      material: { title: '', file: '', type: '' },
      list: [
        { id: 'material', value: 'material' },
        { id: 'recording', value: 'recording' },
      ],
    }
  },
  methods: {
    async getMaterial() {
      const response = await this.$axios.get(
        `material/${this.$route.params.jadwalId}`
      )
      console.log(response.data)
      this.material = {
        name: response.data[0].name,
        type: response.data[0].type,
        file: response.data[0].file,
      }
    },
    async updateMaterial() {
      const response = await this.$axios.put(
        `material/${this.$route.params.id}`,
        this.material
      )
      console.log(response)
      this.$swal({
        title: 'Berhasil!',
        icon: 'success',
        text: 'Material berhasil diubah',
        type: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      this.$emit('refresh')
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/jadwal`
      )
    },
  },

  mounted() {
    if (this.$route.params.jadwalId) {
      this.getMaterial()
    }
  },
}
</script>
