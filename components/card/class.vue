<template>
  <div>
    <div class="card kartu-kelas">
      <img
        :src="img"
        class="card-img-top pointer"
        alt="..."
        data-toggle="modal"
        :data-target="`#${namaKelas}`"
      />
      <div class="card-body">
        <h5 class="card-title text-primary">{{ title }}</h5>
        <p class="card-text">
          {{ desc }}
        </p>
        <div class="text-right">
          <div v-if="$auth.loggedIn && $auth.user.rule == 'admin'">
            <button class="btn btn-outline-secondary" @click="editClass()">
              <i class="fas fa-cog"></i>
            </button>
            <button class="btn btn-danger" @click="deleteClass()">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div v-if="$auth.loggedIn && $auth.user.rule == 'user'">
            <button
              class="btn btn-info"
              @click="canIJoin()"
              v-if="$auth.loggedIn && $auth.user.rule == 'user' && !unjoined"
            >
              <i class="fas fa-sign-in-alt"></i> Join
            </button>
            <button class="btn btn-outline-danger" @click="canILeave()" v-else>
              <i class="fas fa-exclamation-circle"></i> Leave
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="`${namaKelas}`"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active"
                    id="pills-home-tab"
                    data-toggle="pill"
                    :href="`#pills-home${namaKelas}`"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    ><i class="fas fa-tags"></i> Deskripsi</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    :href="`#pills-profile${namaKelas}`"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    ><i class="fas fa-calendar-week"></i> Jadwal</a
                  >
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  :id="`pills-home${namaKelas}`"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div class="row d-flex align-items-center">
                    <div class="col-md-6">
                      <img :src="img" alt="" width="300px" />
                    </div>
                    <div class="col-md-6">
                      <p>
                        {{ desc }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  :id="`pills-profile${namaKelas}`"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div class="row d-flex align-items-center">
                    <div class="col-md-6">
                      <img :src="img" alt="" width="300px" />
                    </div>
                    <div class="col-md-6">
                      <p>Mulai : {{ start_date }}</p>
                      <p>Selesai : {{ end_date }}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Tutup
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="redirectToClass()"
              v-if="($auth.loggedIn && $auth.user.rule == 'admin') || unjoined"
            >
              Lihat Kelas
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    id: Number,
    title: String,
    desc: String,
    img: {
      type: String,
      default: '../../static/assets/img/631.jpg',
    },
    unjoined: {
      type: Boolean,
      default: false,
    },
    start_date: '',
    end_date: '',
    code_kelas: String,
    join_id: String,
  },
  computed: {
    namaKelas() {
      return this.title.toLowerCase().replace(/ /g, '-')
    },
    async alreadyJoined() {
      try {
        const { data } = await this.$axios.get('join/' + this.id)
        if (data.length > 0) {
          this.unjoined = false
        } else {
          this.unjoined = true
        }
      } catch (error) {
        console.log(error)
      }
    },
  },

  methods: {
    async canIJoin() {
      const { value } = await this.$swal({
        title: 'Ingin bergabung dengan role apa?',
        input: 'select',
        inputOptions: {
          student: 'student',
          tutor: 'tutor',
          facilitator: 'facilitator',
        },
        inputPlaceholder: 'Select role',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('You need to select a role')
            }
          })
        },
      })
      // if role is facilitator or tutor enter the class code
      if (value == 'facilitator' || value == 'tutor') {
        const code = await this.$swal({
          title: 'Masukkan kode kelas',
          input: 'text',
          inputPlaceholder: 'Kode kelas',
          showCancelButton: true,
          inputValidator: (code) => {
            return new Promise((resolve) => {
              if (code) {
                resolve()
              } else {
                resolve('You need to enter a code')
              }
            })
          },
        })
        console.log(code.value)
        if (code.value == this.code_kelas) {
          await this.$axios.post('join', {
            class_id: this.id,
            role: value,
            user_id: this.$auth.user.id,
          })
          this.$swal({
            title: 'Berhasil',
            text: `Selamat datang ${value} di kelas ${this.title}`,
            icon: 'success',
          })
          this.$router.push('/kelasku')
        } else if (code != this.code_kelas) {
          this.$swal({
            type: 'error',
            icon: 'error',
            title: 'Kode kelas salah',
          })
        }
      } else {
        let response = await this.$axios.post('join', {
          class_id: this.id,
          role: 'student',
          user_id: this.$auth.user.id,
        })
        this.$swal({
          title: 'Berhasil',
          text: `Kamu telah bergabung pada kelas ${this.title}`,
          icon: 'success',
        })
        this.$router.push('/kelasku')
      }
    },

    async canILeave() {
      const { value } = await this.$swal({
        title: 'Apakah Kamu yakin?',
        text: `Keluar dari kelas ${this.title}`,
        icon: 'question',
        showCancelButton: true,
      })
      if (value) {
        await this.$axios.delete('join/' + this.join_id)
        this.$swal({
          icon: 'success',
          title: 'Selamat...',
          text: 'Kamu sudah keluar dari kelas ' + this.title,
        })
        this.$emit('un-join')
      }
    },
    redirectToClass() {
      $('body').removeClass('modal-open')
      this.$router.push(`kelasku/${this.namaKelas}/${this.id}`)
    },
    editClass() {
      this.$router.push(`/list-kelas/${this.id}`)
    },
    async deleteClass() {
      const { value } = await this.$swal({
        title: 'Apakah Kamu yakin?',
        text: `Kelas ${this.title} akan dihapus`,
        icon: 'question',
        showCancelButton: true,
      })
      if (value) {
        await this.$axios.delete(`class/${this.id}`)
        this.$swal({
          icon: 'success',
          title: 'Yaaah...',
          text: 'Kelas ' + this.title + ' telah dihapus',
        })
        this.$emit('refresh')
      }
    },
  },
}
</script>

<style>
.kartu-kelas {
  transition: transform 0.2s ease;

  border: 0;
  margin-bottom: 1.5em;
}
.kartu-kelas:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18);
}
</style>
