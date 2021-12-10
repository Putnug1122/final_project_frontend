<template>
  <div class="container-fluid">
    <div v-if="JoinClasses.length == 0">
      <h3 class="text-primary">Kamu Belum Ikut Kelas Apapun</h3>
      <img src="../../static/assets/img/5270.jpg" alt="" class="img-fluid" />
    </div>
    <div class="row">
      <div class="col-md-3" v-for="kelas in JoinClasses" :key="kelas.class.id">
        <card-class
          unjoined
          @un-join="getJoinClasses"
          :id="kelas.class.id"
          :title="kelas.class.name"
          :desc="kelas.class.description"
          :start_date="moment(kelas.class.start_date).format('DD MMMM YYYY')"
          :end_date="moment(kelas.class.end_date).format('DD MMMM YYYY')"
          :img="kelas.class.img"
          :join_id="kelas.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      JoinClasses: [],
      moment: moment,
    }
  },
  mounted() {
    this.getJoinClasses()
  },
  methods: {
    async getJoinClasses() {
      const { data } = await this.$axios.get('join')
      console.log(data)
      this.JoinClasses = data.data
    },
  },
}
</script>
