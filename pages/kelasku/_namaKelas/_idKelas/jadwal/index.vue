<template>
  <div class="container mt-3">
    <div
      class="dropdown d-inline"
      v-if="$auth.loggedIn && $auth.user.rule == 'admin'"
    >
      <button
        class="btn btn-primary rounded-pill"
        type="button"
        @click="addJadwal"
      >
        <i class="fas fa-plus"></i> Create
      </button>
    </div>
    <div class="row mt-3">
      <div class="col-lg-3">
        <div class="card card-primary">
          <div class="card-header text-primary">
            <h4>All Topics</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Materi</li>
            <li class="list-group-item">Jadwal</li>
          </ul>
        </div>
      </div>
      <div class="col-lg-9">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="jadwal in jadwal" :key="jadwal.id">
            <div id="accordion">
              <div class="accordion">
                <div
                  class="accordion-header"
                  role="button"
                  data-toggle="collapse"
                  :data-target="`#panel-body-${jadwal.id}`"
                  aria-expanded="true"
                >
                  <h5>
                    <i
                      class="fas fa-file-alt"
                      style="font-size: 1.2em; padding-right: 1.2em"
                    ></i>
                    {{ jadwal.name }}
                  </h5>
                </div>
                <div
                  class="accordion-body collapse show"
                  :id="`panel-body-${jadwal.id}`"
                  data-parent="#accordion"
                >
                  <div class="mb-2">
                    <p>
                      Mulai : {{ moment(jadwal.start).format('DD MMMM YYYY') }}
                    </p>
                    <p>
                      Selesai : {{ moment(jadwal.end).format('DD MMMM YYYY') }}
                    </p>
                  </div>
                  <nuxt-link
                    class="btn btn-link"
                    :to="`/kelasku/${$route.params.namaKelas}/${$route.params.idKelas}/materi/${jadwal.id}`"
                    >View Material
                  </nuxt-link>
                  <div
                    class="text-right"
                    v-if="$auth.loggedIn && $auth.user.rule == 'admin'"
                  >
                    <button
                      class="btn btn-primary"
                      @click="editJadwal(jadwal.id)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-danger"
                      @click="deleteJadwal(jadwal.id)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-center" v-if="jadwal.length == 0">
          <img
            src="../../../../../static/assets/img/Empty Inbox _Two Color.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      moment: moment,
      jadwal: [],
      materi: [],
      jadwal_join: [],
    }
  },
  mounted() {
    this.getSchedule()
    this.getJadwalJoin()
  },
  methods: {
    async getSchedule() {
      try {
        const response = await this.$axios.get(
          `schedule/${this.$route.params.idKelas}`
        )
        console.log(response)
        this.jadwal = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async getJadwalJoin() {
      try {
        let response = await this.$axios.get(
          `join/${this.$route.params.idKelas}`
        )
        console.log(response.data.data)
        this.jadwal_join = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    addJadwal() {
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/jadwal/add-jadwal`
      )
    },
    editJadwal(id) {
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/jadwal/${id}`
      )
    },
    async deleteJadwal(id) {
      try {
        const { value } = await this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        })
        if (value) {
          const response = await this.$axios.delete(`schedule/${id}`)
          console.log(response)
          this.$swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          })
          this.getSchedule()
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    jadwalJoin() {
      return this.jadwal_join.filter((kelas) => kelas.schedules)
    },
  },
}
</script>

<style></style>
