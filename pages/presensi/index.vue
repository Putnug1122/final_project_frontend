<template>
  <div class="container">
    <h3 class="text-primary">Prensensi Kelas</h3>
    <div class="card mt-5" v-for="kelas in list_data" :key="kelas.id">
      <div class="card-header bg-info">
        <h5 class="card-title text-white">{{ kelas.name }}</h5>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead v-if="kelas.join_classes.role == 'student'">
            <tr>
              <th>Nama Jadwal</th>
              <th>
                <center>
                  <td>Presensi</td>
                </center>
              </th>
              <th>
                <center>
                  <td>Keterangan</td>
                </center>
              </th>
            </tr>
          </thead>
          <thead v-else>
            <tr>
              <th>Nama Jadwal</th>
              <th>
                <center>
                  <td>Code</td>
                </center>
              </th>
            </tr>
          </thead>
          <tbody v-if="kelas.join_classes.role == 'student'">
            <tr v-for="item in kelas.schedules" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <center>
                  <button
                    class="btn btn-primary"
                    data-toggle="modal"
                    :data-target="'#presensi' + item.id"
                    v-if="item.absen == 'Not Yet'"
                  >
                    Presensi
                  </button>
                  <button
                    class="btn btn-light"
                    disabled
                    v-if="item.absen != 'Not Yet'"
                  >
                    Sudah Presensi
                  </button>
                  <div
                    class="modal fade"
                    :id="'presensi' + item.id"
                    data-backdrop="false"
                    modal-dialog-centered
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">Presensi</h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </div>
                        <div class="modal-body">
                          <form
                            @submit.prevent="
                              () => submitPresence(item.code, kelas.code)
                            "
                          >
                            <div class="form-group">
                              <label for="">Nama Jadwal</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="item.name"
                                readonly
                              />
                            </div>
                            <div class="form-group">
                              <label for="code">Code Jadwal</label>
                              <input
                                type="text"
                                id="code"
                                class="form-control"
                                v-model="schedule_code"
                              />
                            </div>
                            <div class="text-right">
                              <button type="submit" class="btn btn-primary">
                                Absen
                              </button>
                              <button
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
              <td>
                <center>
                  <div class="badge">
                    <span
                      v-if="item.absen == 'Done'"
                      class="badge badge-success"
                      >Done</span
                    >
                    <span v-else class="badge badge-danger">Not Yet</span>
                  </div>
                </center>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="item in kelas.schedules" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <center>
                  <button
                    class="btn btn-primary"
                    data-toggle="modal"
                    :data-target="'#presensi' + item.id"
                    v-if="item.absen == 'Not Yet'"
                  >
                    Code Jadwal
                  </button>
                  <div
                    class="modal fade"
                    :id="'presensi' + item.id"
                    data-backdrop="false"
                    modal-dialog-centered
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">Presensi Siswa</h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="">Nama Jadwal</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="item.name"
                                readonly
                              />
                            </div>
                            <div class="form-group">
                              <label for="code">Code Jadwal</label>
                              <input
                                type="text"
                                id="code"
                                class="form-control"
                                v-model="item.code"
                                readonly
                              />
                            </div>
                            <div class="text-right">
                              <button
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedule_code: '',
      list_data: [],
      list_join: [],
      role: '',
    }
  },
  mounted() {
    this.getPresences()
    this.getJoinClasses()
  },
  methods: {
    async getPresences() {
      try {
        let response = await this.$axios.get('/presence')
        console.log(response.data)
        this.list_data = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async submitPresence(code, kelas) {
      try {
        if (this.schedule_code == code) {
          const data = {
            schedule_code: this.schedule_code,
            class_code: kelas,
          }
          const response = await this.$axios.post('presence', data)
          console.log(response)
          this.$swal({
            title: 'Success',
            text: 'Presensi berhasil',
            icon: 'success',
            timer: 2000,
            buttons: false,
          }).then(() => {
            this.getPresences()
          })
        }
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Error',
          text: 'Presensi gagal',
          icon: 'error',
          timer: 2000,
          buttons: false,
        })
      }
    },
    async getJoinClasses() {
      try {
        let response = await this.$axios.get(`join`)
        this.list_join = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    studentRole() {
      return this.list_join.filter((item) => item.role == 'student')
    },
  },
}
</script>

<style></style>
