<template>
  <div class="container">
    <h3 class="text-primary mb-3">Teachers</h3>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(teacher, i) in adminList" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ teacher.full_name }}</td>
          <td>{{ teacher.classes[0].join_classes.role }}</td>
          <td>
            <div class="badge">
              <span class="badge badge-success">Active</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="text-primary float-left mb-3">Classmates</h3>
    <h6 class="float-right text-primary">{{ studentList.length }} orang</h6>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, i) in studentList" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ student.full_name }}</td>
          <td>{{ student.classes[0].join_classes.role }}</td>
          <td>
            <div class="badge">
              <span class="badge badge-success">Active</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      member: [],
      loading: true,
      error: null,
    }
  },
  methods: {
    async getAnggota() {
      try {
        let response = await this.$axios.get(
          `join/${this.$route.params.idKelas}`
        )
        console.log(response)
        this.member = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getAnggota()
  },
  computed: {
    studentList() {
      return this.member.filter(
        (member) => member.classes[0].join_classes.role === 'student'
      )
    },
    adminList() {
      return this.member.filter(
        (member) => member.classes[0].join_classes.role !== 'student'
      )
    },
  },
}
</script>

<style></style>
