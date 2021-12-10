<template>
  <div class="container">
    <div class="mb-4">
      <div class="jumbotron jumbotron-fluid banner-kelas">
        <div class="container">
          <h2 class="display-5 mt-5 text-center">{{ bannerClass }}</h2>
          <br class="mb-5" />
          <p class="lead">
            {{ randomSubtitle }}
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 d-none d-sm-none d-md-block d-lg-block">
        <div class="card card-info">
          <div class="card-header">
            <h4>Upcoming</h4>
          </div>
          <div class="card-body">
            <ul>
              <li v-for="item in jadwal" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <schedule
          @delete="getJadwal"
          @refresh="getJadwal"
          v-for="item in jadwal"
          :id="item.id"
          :key="item.id"
          :title="item.name"
          :schedule="item.start"
          :to="item.id"
          @click="toDetail"
        />
        <div class="d-flex justify-content-center" v-if="jadwal.length == 0">
          <img
            src="../../../../static/assets/img/Empty Inbox _Flatline.png"
            alt=""
            class="img-fluid"
          />
          <h5 class="text-primary text-center">Belum Terdapat Materi</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jadwal: [],
      subtitle: '',
    }
  },
  mounted() {
    this.getJadwal()
  },
  methods: {
    async getJadwal() {
      try {
        const response = await this.$axios.get(
          `schedule/${this.$route.params.idKelas}`
        )
        this.jadwal = response.data
      } catch (error) {
        console.log(error)
      }
    },
    toDetail() {
      this.$router.push(
        `/kelasku/${this.$route.params.namaKelas}/${this.$route.params.idKelas}/materi`
      )
    },
  },
  computed: {
    bannerClass() {
      return this.$route.params.namaKelas.toUpperCase().replace(/-/g, ' ')
    },
    randomSubtitle() {
      const quotes = [
        "I'm not a great programmer; I'm just a good programmer with great habits.",
        'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        'Programming today is a mesh between art and science. We write programs to make computers do our bidding.',
      ]
      const random = quotes[Math.floor(Math.random() * quotes.length)]
      return random
    },
  },
}
</script>

<style>
.banner-kelas {
  background-image: url('/assets/img/comfy-home.png');
  font-family: 'Pacifico', cursive;
  background-size: cover;
  color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
  border-radius: 15px;
}
</style>
