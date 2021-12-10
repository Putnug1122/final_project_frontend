<template>
  <div class="card-body shadow-sm">
    <div class="row border-black border-bottom">
      <div class="col">
        <h6 class="p-0 m-0 text-primary">{{ title }} : {{ type }}</h6>
        <p class="p-0 m-0 text-primary">
          {{ $moment(schedule).format('DD MMMM') }}
        </p>
      </div>
      <div
        class="col-1 d-flex align-items-center"
        v-if="$auth.loggedIn && $auth.user.rule == 'admin'"
      >
        <i
          class="fas fa-ellipsis-v dropdown-toggle pointer"
          data-toggle="dropdown"
          style="font-size: 1.4em"
        ></i>
        <div class="dropdown-menu">
          <a class="dropdown-item" @click="editMaterial" href="#">Sunting</a>
          <a class="dropdown-item" @click="deleteMaterial" href="#">Hapus</a>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <a :href="file" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-file-download" style="font-size: 3em"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, default: 'materi-id' },
    type: { type: String, default: 'Materi' },
    title: { type: String, default: 'Judul Jadwal' },
    schedule: { type: String, default: '2021-12-24' },
    file: String,
    img: String,
  },
  methods: {
    async deleteMaterial() {
      const { value } = await this.$swal({
        title: 'Hapus Jadwal',
        text: 'Apakah anda yakin ingin menghapus materi ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6777ef',
        cancelButtonColor: '#fc544b',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Tidak, Batalkan!',
      })
      if (value) {
        try {
          const { data } = await this.$axios.delete(`material/${this.id}`)
          this.$swal({
            title: 'Berhasil!',
            text: 'Jadwal berhasil dihapus',
            icon: 'success',
            timer: 1500,
          })
          this.$emit('delete')
        } catch (error) {
          this.$swal({
            title: 'Gagal!',
            text: 'Jadwal gagal dihapus',
            icon: 'error',
            timer: 1500,
          })
        }
      }
    },
    editMaterial() {
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/materi/${this.$route.params.jadwalId}/${this.id}`
      )
    },
  },
}
</script>
