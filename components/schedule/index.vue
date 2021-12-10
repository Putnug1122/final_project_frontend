<template>
  <div class="card inside">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-1 border-right border-black">
          <img
            :src="img"
            alt=""
            srcset="../../static/assets/img/products/product-3-50.png"
            class="w-100 rounded-circle"
          />
        </div>

        <div class="col">
          <nuxt-link
            :to="`/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/materi/${this.$route.params.jadwalId}`"
          >
            <h6 class="p-0 m-0">{{ title }} : {{ type }}</h6>
            <p class="p-0 m-0">{{ $moment(schedule).format('DD MMMM') }}</p>
          </nuxt-link>
        </div>

        <div
          class="col-1 d-flex"
          v-if="$auth.loggedIn && $auth.user.rule == 'admin'"
          style="z-index: 999"
        >
          <Menu :canEdit="editSchedule" :canDelete="deleteSchedule" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String },
    type: { type: String, default: 'Materi' },
    title: { type: String, default: 'Judul Jadwal' },
    schedule: { type: String, default: '2021-12-24' },
    img: String,
    to: '',
  },
  methods: {
    editSchedule() {
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/jadwal/${this.id}`
      )
    },
    async deleteSchedule() {
      const { value } = await this.$swal({
        title: 'Hapus Jadwal',
        text: 'Apakah anda yakin ingin menghapus jadwal ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6777ef',
        cancelButtonColor: '#fc544b',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Tidak, Batalkan!',
      })
      if (value) {
        try {
          const { data } = await this.$axios.delete(`schedule/${this.id}`)
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
  },
}
</script>

<style>
.inside:hover {
  background-color: rgba(140, 152, 243, 0.2);
  color: #78828a;
}
</style>
