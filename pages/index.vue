<template>
  <div>
    <div v-if="$auth.loggedIn && $auth.user.rule == 'admin'">
      <h3 class="text-primary">Dashboard</h3>
      <div class="row mt-4">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-primary">
              <i class="fas fa-users-cog"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Total Admin</h4>
              </div>
              <div class="card-body">{{ adminList.length }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-danger">
              <i class="far fa-newspaper"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Jumlah Kelas</h4>
              </div>
              <div class="card-body">{{ allClasses.length }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-warning">
              <i class="far fa-file"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Jumlah Materi</h4>
              </div>
              <div class="card-body">{{ allMaterials.length }}</div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
          <div class="card card-statistic-1">
            <div class="card-icon bg-success">
              <i class="fas fa-users"></i>
            </div>
            <div class="card-wrap">
              <div class="card-header">
                <h4>Jumlah Users</h4>
              </div>
              <div class="card-body">{{ allUsers.length }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 col-md-12 col-12 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4>Semua Kelas</h4>
              <div class="card-header-action">
                <nuxt-link to="/list-kelas" class="btn btn-primary"
                  >View All</nuxt-link
                >
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Pembuat</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="kelas in allClasses" :key="kelas.id">
                      <td>
                        {{ kelas.name }}
                        <div class="table-links">
                          in <a href="#">Web Development</a>
                          <div class="bullet"></div>
                          <a href="#">View</a>
                        </div>
                      </td>
                      <td>
                        <a href="#" class="font-weight-600"
                          ><img
                            src="../static/assets/img/avatar/avatar-1.png"
                            alt="avatar"
                            width="30"
                            class="rounded-circle mr-1"
                          />
                          Admin Classroom</a
                        >
                      </td>
                      <td>
                        <a
                          class="btn btn-primary btn-action mr-1"
                          data-toggle="tooltip"
                          title="Edit"
                          @click="editClass(kelas.id)"
                          ><i class="fas fa-pencil-alt"></i
                        ></a>
                        <a
                          class="btn btn-danger btn-action"
                          data-toggle="tooltip"
                          title="Delete"
                          @click="deleteClass(kelas.id)"
                          ><i class="fas fa-trash"></i
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-12 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4>Semua User</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled list-unstyled-border">
                <li class="media" v-for="user in allUsers" :key="user.id">
                  <img
                    class="mr-3 rounded-circle"
                    width="50"
                    src="../static/assets/img/avatar/avatar-1.png"
                    alt="avatar"
                  />
                  <div class="media-body">
                    <div class="media-title">{{ user.full_name }}</div>
                    <span class="text-small text-muted">{{ user.rule }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="$auth.loggedIn && $auth.user.rule == 'user'"
        class="text-primary"
      >
        <div class="col-12 mb-4">
          <div class="hero align-items-center bg-primary text-white">
            <div class="hero-inner text-center">
              <h2>Selamat Datang, {{ $auth.user.full_name }}</h2>
              <p class="lead">
                Silahkan pilih kelas yang ingin Anda ikuti untuk melanjutkan
              </p>
              <div class="mt-4">
                <nuxt-link
                  to="/list-kelas"
                  class="btn btn-outline-white btn-lg btn-icon icon-left"
                  ><i class="fas fa-sign-in-alt"></i> Class</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allClasses: [],
      allUsers: [],
      allMaterials: [],
    }
  },
  mounted() {
    this.getAllClasses()
    this.getAllUsers()
    this.getMaterial()
  },
  methods: {
    async getAllClasses() {
      try {
        const response = await this.$axios.get(`class`)
        this.allClasses = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async getAllUsers() {
      try {
        const response = await this.$axios.get(`user`)
        console.log(response.data)
        this.allUsers = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getMaterial() {
      try {
        const response = await this.$axios.get(`material`)
        this.allMaterials = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteClass(id) {
      const { value } = await this.$swal({
        title: 'Apakah Kamu yakin?',
        text: `Kelas ini akan dihapus`,
        icon: 'question',
        showCancelButton: true,
      })
      if (value) {
        await this.$axios.delete(`class/${id}`)
        this.$swal({
          icon: 'success',
          title: 'Yaaah...',
          text: 'Kelas telah dihapus',
        })
        this.$emit('refresh')
      }
    },
    editClass(id) {
      this.$router.push(`/list-kelas/${id}`)
    },
  },
  computed: {
    adminList() {
      return this.allUsers.filter((user) => user.rule == 'admin')
    },
  },
}
</script>

<style></style>
