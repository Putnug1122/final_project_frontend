<template>
  <div>
    <!-- create class form  -->
    <form action="POST" @submit.prevent="createClass">
      <div class="form-group">
        <label for="id">Class Id</label>
        <input
          type="text"
          class="form-control"
          id="id"
          placeholder="Enter Class Id"
          name="id"
          v-model="kelas.id"
        />
      </div>
      <div class="form-group">
        <label for="class_name">Class Name</label>
        <input
          type="text"
          class="form-control"
          id="class_name"
          name="class_name"
          placeholder="Enter Class Name"
          v-model="kelas.name"
        />
      </div>
      <div class="form-group">
        <label for="class_code">Class Code</label>
        <input
          type="text"
          class="form-control"
          id="class_code"
          name="class_code"
          placeholder="Enter Class Code"
          v-model="kelas.code"
        />
      </div>
      <div class="form-group">
        <label for="class_img">Class Image</label>
        <input
          type="text"
          class="form-control"
          id="class_img"
          name="class_img"
          placeholder="Enter Class Image URL"
          v-model="kelas.img"
        />
      </div>
      <div class="form-group">
        <label for="class_description">Class Description</label>
        <input
          type="text"
          class="form-control"
          id="class_description"
          name="class_description"
          placeholder="Enter Class Description"
          v-model="kelas.description"
        />
      </div>
      <div class="form-group">
        <label for="class_start_date">Class Start Date</label>
        <input
          type="date"
          class="form-control"
          id="class_start_date"
          name="class_start_date"
          placeholder="Enter Class Start Date"
          v-model="kelas.start_date"
        />
      </div>
      <div class="form-group">
        <label for="class_end_date">Class End Date</label>
        <input
          type="date"
          class="form-control"
          id="class_end_date"
          name="class_end_date"
          placeholder="Enter Class End Date"
          v-model="kelas.end_date"
        />
      </div>
      <div class="text-right">
        <button class="btn btn-secondary" type="button" @click="$router.go(-1)">
          Back
        </button>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kelas: {
        id: '',
        name: '',
        code: '',
        description: '',
        start_date: '',
        end_date: '',
        img: '',
      },
    }
  },
  methods: {
    async createClass() {
      try {
        const response = await this.$axios.post('class', this.kelas)
        console.log(response)
        this.$swal({
          title: 'Success',
          text: 'Class Created Successfully',
          icon: 'success',
          button: 'OK',
        })
        this.$router.push('/list-kelas')
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Error',
          text: error.response.data.msg,
          icon: 'error',
          button: 'OK',
        })
      }
    },
    async editClass() {
      try {
        const response = await this.$axios.put(
          `class/${this.kelas.id}`,
          this.kelas
        )
        console.log(response)
        this.$swal({
          title: 'Success',
          text: 'Class Edited Successfully',
          icon: 'success',
          button: 'OK',
        })
        this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Error',
          text: error.response.data.msg,
          icon: 'error',
          button: 'OK',
        })
      }
    },
  },
}
</script>

<style></style>
