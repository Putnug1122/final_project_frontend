<template>
  <div id="app">
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div
            class="
              col-12 col-sm-10
              offset-sm-1
              col-md-8
              offset-md-2
              col-lg-8
              offset-lg-2
              col-xl-8
              offset-xl-2
            "
          >
            <div class="login-brand">
              <img
                src="../../static/assets/img/stisla-fill.svg"
                alt="logo"
                width="100"
                class="shadow-light rounded-circle"
              />
            </div>

            <div class="card card-primary">
              <div class="card-header"><h4>Register</h4></div>

              <div class="card-body">
                <form @submit.prevent="registerUser" method="POST">
                  <label for="full_name">Full Name</label>
                  <input
                    id="full_name"
                    type="text"
                    class="form-control"
                    name="full_name"
                    autofocus
                    v-model="register.full_name"
                  />
                  <!-- username -->
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      class="form-control"
                      name="username"
                      autofocus
                      v-model="register.username"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      name="email"
                      v-model="register.email"
                    />
                    <div class="invalid-feedback"></div>
                  </div>

                  <div class="form-group">
                    <label for="password" class="d-block">Password</label>
                    <input
                      id="password"
                      type="password"
                      class="form-control pwstrength"
                      data-indicator="pwindicator"
                      name="password"
                      v-model="register.password"
                    />
                    <div id="pwindicator" class="pwindicator">
                      <div class="bar"></div>
                      <div class="label"></div>
                    </div>
                  </div>

                  <div class="form-group">
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="simple-footer">Copyright &copy; Kelompok 3</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'clean',
  auth: false,
  data() {
    return {
      register: {
        full_name: '',
        username: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await this.$axios.post('register', this.register)
        this.$swal({
          icon: 'success',
          title: 'Success',
          text: 'Register Success',
        })
        this.$router.push('/login')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message,
        })
      }
    },
  },
}
</script>

<style></style>
