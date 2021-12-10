<template>
  <div class="section-body container">
    <h2 class="section-title">Hi, {{ $auth.user.full_name }}!</h2>
    <p class="section-lead">Change information about yourself on this page.</p>

    <div class="row mt-sm-4">
      <div class="col-12 col-md-12 col-lg-5">
        <div class="card profile-widget">
          <div class="profile-widget-header">
            <img
              alt="image"
              src="../../static/assets/img/avatar/avatar-1.png"
              class="rounded-circle profile-widget-picture"
            />
          </div>
          <div class="profile-widget-description">
            <div class="profile-widget-name">
              {{ $auth.user.full_name }}
              <div class="text-muted d-inline font-weight-normal">
                <div class="slash"></div>
                {{ $auth.user.rule }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-7">
        <div class="card">
          <form
            method="post"
            class="needs-validation"
            novalidate=""
            @submit.prevent="updateProfile"
          >
            <div class="card-header">
              <h4>Edit Profile</h4>
            </div>
            <div class="card-body">
              <div class="form-group">
                <!-- <label>Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  :value="user.full_name"
                  required=""
                /> -->
                <input-text
                  :val="user.full_name"
                  :name="'Full Name'"
                  @get="(val) => (user.full_name = val)"
                />
                <div class="invalid-feedback">
                  Please fill in the first name
                </div>
              </div>
              <div class="form-group">
                <!-- <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  :value="user.email"
                  required=""
                /> -->
                <input-text
                  :val="user.email"
                  :name="'Email'"
                  @get="(val) => (user.email = val)"
                />
                <div class="invalid-feedback">Please fill in the email</div>
              </div>
              <div class="form-group">
                <!-- <label>Phone</label>
                <input type="tel" class="form-control" :value="user.phone" /> -->
                <input-text
                  :val="user.place_birth"
                  :name="'Place Birth'"
                  @get="(val) => (user.place_birth = val)"
                />
              </div>
              <div class="form-group">
                <!-- <label>Province</label>
                <input
                  type="text"
                  class="form-control"
                  :value="user.province"
                /> -->
                <input-text
                  :val="user.province"
                  :name="'Province'"
                  @get="(val) => (user.province = val)"
                />
              </div>
              <div class="form-group">
                <!-- <label>City</label>
                <input type="text" class="form-control" :value="user.city" /> -->
                <input-text
                  :val="user.city"
                  :name="'City'"
                  @get="(val) => (user.city = val)"
                />
              </div>

              <div class="form-group">
                <!-- <label>Address</label>
                <input type="text" class="form-control" :value="user.address" /> -->
                <input-text
                  :val="user.address"
                  :name="'Address'"
                  @get="(val) => (user.address = val)"
                />
              </div>
              <div class="form-group">
                <!-- <label>Last Study</label>
                <input
                  type="text"
                  class="form-control"
                  :value="user.last_study"
                /> -->
                <input-text
                  :val="user.last_study"
                  :name="'Last Study'"
                  @get="(val) => (user.last_study = val)"
                />
              </div>
              <div class="form-group">
                <!-- <label>Current Job</label>
                <input
                  type="text"
                  class="form-control"
                  :value="user.current_job"
                /> -->
                <input-text
                  :val="user.current_job"
                  :name="'Current Job'"
                  @get="(val) => (user.current_job = val)"
                />
              </div>
            </div>
            <div class="card-footer text-right">
              <button class="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        full_name: '',
        email: '',
        place_birth: '',
        birthday: '',
        address: '',
        province: '',
        city: '',
        last_study: '',
        current_job: '',
      },
    }
  },
  methods: {
    async getUser() {
      try {
        let response = await this.$axios.get(`user`)

        console.log(response)
        for (let user of response.data.data) {
          if (user.id == this.$auth.user.id) {
            this.user = user
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updateProfile() {
      try {
        let response = await this.$axios.put(`user/${this.$auth.user.id}`, {
          full_name: this.user.full_name,
          email: this.user.email,
          place_birth: this.user.place_birth,
          birthday: this.user.birthday,
          address: this.user.address,
          province: this.user.province,
          city: this.user.city,
          last_study: this.user.last_study,
          current_job: this.user.current_job,
        })

        this.$swal({
          title: 'Success',
          text: 'Update profile success',
          icon: 'success',
          type: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        this.getUser()
      } catch (error) {
        this.$swal({
          title: 'Error',
          text: 'Update profile failed',
          icon: 'error',
          type: 'error',
          showConfirmButton: false,
        })
      }
    },
  },
  mounted() {
    this.getUser()
  },
}
</script>

<style></style>
