<template>
  <form @submit.prevent="submitDate">
    <input-type
      name="Nama Kelas"
      :value="detailClass.name"
      @get="(val) => (detailClass.name = val)"
    />
    <input-type
      name="Deskripsi kelas"
      :value="detailClass.description"
      @get="(val) => (detailClass.description = val)"
    />
    <input-type
      name="Gambar kelas"
      :value="detailClass.img"
      @get="(val) => (detailClass.img = val)"
    />
    <input-type
      type="date"
      name="Tanggal Mulai"
      :value="detailClass.start_date"
      @get="(val) => (detailClass.start_date = val)"
    />
    <input-type
      type="date"
      name="Tanggal Selesai"
      :value="detailClass.end_date"
      @get="(val) => (detailClass.end_date = val)"
    />
    <div class="text-right">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="$router.go(-1)"
      >
        Back
      </button>
      <button class="btn btn-outline-primary" type="submit">Save</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      detailClass: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        img: '',
      },
    }
  },
  mounted() {
    if (this.$route.params.id) this.GET_DATA()
  },
  methods: {
    async GET_DATA() {
      const DETAIL = await this.$axios.$get(`class/${this.$route.params.id}`)
      console.log(DETAIL)

      this.detailClass = {
        name: DETAIL[0].name,
        description: DETAIL[0].description,
        start_date: DETAIL[0].start_date,
        end_date: DETAIL[0].end_date,
        img: DETAIL[0].img,
      }
    },
    async UPDATE_DATA(payload) {
      payload.id = this.$route.params.id
      const updateClass = await this.$axios.$put(
        `class/${this.$route.params.id}`,
        payload
      )

      return updateClass
    },
    async CREATE_DATA(payload) {
      const createClass = await this.$axios.$post('class', payload)
      return createClass
    },
    async submitDate() {
      try {
        const payload = this.detailClass
        let request = null
        if (this.$route.params.id) {
          // UPDATE
          request = await this.UPDATE_DATA(payload)
        } else {
          // CREATE
          request = await this.CREATE_DATA(payload)
        }
        if (request) {
          this.$router.push('/list-kelas')
        }
        this.$swal.fire({
          type: 'success',
          icon: 'success',
          title: 'Success',
          text: 'Data berhasil diupdate',
        })
      } catch (error) {
        this.$swal({
          icon: 'warning',
          title: 'BAHAYA!!!',
          text: error.toString(),
        })
      }
    },
  },
}
</script>
