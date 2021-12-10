<template>
  <div>
    <div class="container">
      <form @submit.prevent="updateJadwal">
        <input-text
          :val="jadwal.name"
          @get="(val) => (jadwal.name = val)"
          name="Nama Jadwal"
          placeholder="Sesi 1"
        />
        <input-text
          :val="jadwal.start"
          @get="(val) => (jadwal.start = val)"
          name="Waktu Mulai"
          type="datetime-local"
          placeholder="Sesi 1"
        />
        <input-text
          :val="jadwal.end"
          @get="(val) => (jadwal.end = val)"
          name="Waktu Selesai"
          type="datetime-local"
          placeholder="Sesi 1"
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
      jadwal: {
        name: '',
        start: '',
        end: '',
      },
    }
  },

  methods: {
    async getJadwal() {
      const response = await this.$axios.get(
        `schedule/${this.$route.params.idKelas}`
      )
      console.log(response.data)
      this.jadwal = {
        name: response.data[0].name,
        start: response.data[0].start,
        end: response.data[0].end,
      }
    },
    async updateJadwal() {
      const response = await this.$axios.put(
        `schedule/${this.$route.params.id}`,
        this.jadwal
      )
      console.log(response)
      this.$swal({
        title: 'Berhasil!',
        icon: 'success',
        text: 'Jadwal berhasil diubah',
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
  computed: {
    getNameClass() {
      return this.$route.params.namaKelas.replace(/-/g, ' ').toLowerCase()
    },
  },
  mounted() {
    if (this.$route.params.idKelas) {
      this.getJadwal()
    }
  },
}
</script>
