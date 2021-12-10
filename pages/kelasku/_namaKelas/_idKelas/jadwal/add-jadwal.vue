<template>
  <div class="container-fluid">
    <h3 class="text-primary">Add Jadwal</h3>
    <hr />
    <form action="POST" @submit.prevent="createJadwal" class="mt-4">
      <!-- <div class="form-group">
        <label for="class_id">Id Kelas</label>
        <input type="text" class="form-control" v-model="jadwal.class_id" />
      </div> -->
      <div class="form-group">
        <label for="class_id">Kode Jadwal</label>
        <input type="text" class="form-control" v-model="jadwal.code" />
      </div>
      <div class="form-group">
        <label for="schedule_name">Nama jadwal</label>
        <input type="text" class="form-control" v-model="jadwal.name" />
      </div>
      <div class="form-group">
        <label for="schedule_date">Start</label>
        <input
          type="datetime-local"
          class="form-control"
          v-model="jadwal.start"
        />
      </div>
      <div class="form-group">
        <label for="schedule_time">End</label>
        <input
          type="datetime-local"
          class="form-control"
          v-model="jadwal.end"
        />
      </div>
      <div class="text-right">
        <button type="button" class="btn btn-secondary" @click="$router.go(-1)">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jadwal: {
        class_id: this.$route.params.idKelas,
        name: '',
        start: '',
        end: '',
        code: '',
      },
    }
  },
  methods: {
    async createJadwal() {
      try {
        const response = await this.$axios.post('schedule', this.jadwal)
        this.$router.push(
          '/kelasku/' +
            this.$route.params.namaKelas +
            '/' +
            this.$route.params.idKelas +
            '/jadwal'
        )
        this.$swal.fire({
          title: 'Success',
          text: 'Jadwal berhasil ditambahkan',
          type: 'success',
          icon: 'success',
        })
      } catch (error) {
        console.log(error)
        this.$swal.fire({
          title: 'Error',
          text: 'Jadwal gagal ditambahkan',
          type: 'error',
          icon: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
