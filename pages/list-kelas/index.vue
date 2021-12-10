<template>
  <!-- <div class="container-fluid">
    <div class="row">
      <item-button @click.native="addClass" />
      <div class="col-md-3" v-for="kelas in semuaKelas" :key="kelas.id">
        <card-class
          :id="kelas.id"
          :title="kelas.name"
          :desc="kelas.description"
          :start_date="kelas.start_date"
          :end_date="kelas.end_date"
        />
      </div>
    </div>
  </div> -->
  <!-- only appear when user login -->

  <div class="container-fluid">
    <div class="row">
      <item-button
        @click.native="addClass"
        v-if="$auth.loggedIn && $auth.user.rule == 'admin'"
      />
      <div class="col-md-3" v-for="kelas in semuaKelas" :key="kelas.id">
        <card-class
          @refresh="getClass"
          :id="kelas.id"
          :title="kelas.name"
          :desc="kelas.description"
          :start_date="moment(kelas.start_date).format('DD MMMM YYYY')"
          :end_date="moment(kelas.end_date).format('DD MMMM YYYY')"
          :img="kelas.img"
          :code_kelas="kelas.code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  auth: false,
  data() {
    return {
      semuaKelas: [],
      moment: moment,
    }
  },
  mounted() {
    this.getClass()
  },
  methods: {
    async getClass() {
      let response = await this.$axios.get('class')
      this.semuaKelas = response.data
    },
    addClass() {
      this.$router.push(`list-kelas/add`)
    },
  },
}
</script>
